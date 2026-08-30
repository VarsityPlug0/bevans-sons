/**
 * Inventory Service
 *
 * Inventory is movement-based. Current stock is calculated from movements.
 * This gives a complete audit trail and makes discrepancies traceable.
 */

const prisma = require('../lib/prisma')

/**
 * Get current inventory for a variant.
 * Always reads from the inventory table (which is the materialized view of movements).
 */
async function getInventory(variantId) {
  const inv = await prisma.inventory.findUnique({ where: { variantId } })
  if (!inv) return { available: 0, reserved: 0, committed: 0, damaged: 0, returned: 0, total: 0 }

  return {
    available: inv.available,
    reserved: inv.reserved,
    committed: inv.committed,
    damaged: inv.damaged,
    returned: inv.returned,
    total: inv.available + inv.reserved + inv.committed,
  }
}

/**
 * Record an inventory movement and update the materialized inventory record.
 * All operations are atomic.
 */
async function recordMovement({ variantId, productId, type, quantity, reason, orderId, userId, notes }) {
  return prisma.$transaction(async (tx) => {
    // Create movement record
    await tx.inventoryMovement.create({
      data: { variantId, productId, type, quantity, reason, orderId, userId, notes },
    })

    // Get or create inventory record
    let inventory = await tx.inventory.findUnique({ where: { variantId } })
    if (!inventory) {
      inventory = await tx.inventory.create({
        data: { variantId, available: 0, reserved: 0, committed: 0, damaged: 0, returned: 0 },
      })
    }

    // Apply movement to materialized counts
    const update = {}

    switch (type) {
      case 'PURCHASE':
        update.available = { increment: quantity }
        break

      case 'SALE':
        // quantity is positive; deduct from available
        if (inventory.available < quantity) {
          throw new Error(`Insufficient stock for variant ${variantId}. Available: ${inventory.available}, requested: ${quantity}`)
        }
        update.available = { decrement: quantity }
        update.committed = { increment: quantity }
        break

      case 'RETURN':
        update.available = { increment: quantity }
        update.committed = { decrement: Math.min(quantity, inventory.committed) }
        update.returned = { increment: quantity }
        break

      case 'DAMAGED':
        update.available = { decrement: Math.min(quantity, inventory.available) }
        update.damaged = { increment: quantity }
        break

      case 'RESERVED':
        if (inventory.available < quantity) {
          throw new Error(`Cannot reserve ${quantity} units for variant ${variantId}. Available: ${inventory.available}`)
        }
        update.available = { decrement: quantity }
        update.reserved = { increment: quantity }
        break

      case 'RELEASED':
        update.reserved = { decrement: Math.min(quantity, inventory.reserved) }
        update.available = { increment: quantity }
        break

      case 'ADJUSTMENT':
        // quantity can be positive or negative
        if (quantity > 0) {
          update.available = { increment: quantity }
        } else {
          update.available = { decrement: Math.abs(quantity) }
        }
        break

      default:
        throw new Error(`Unknown inventory movement type: ${type}`)
    }

    return tx.inventory.update({ where: { variantId }, data: update })
  })
}

/**
 * Reserve stock when an order is placed (before payment confirmation).
 */
async function reserveStock({ variantId, productId, quantity, orderId }) {
  return recordMovement({ variantId, productId, type: 'RESERVED', quantity, reason: 'Order placed', orderId })
}

/**
 * Confirm sale when payment is confirmed: converts reserved → committed.
 */
async function confirmSale({ variantId, productId, quantity, orderId }) {
  return prisma.$transaction(async (tx) => {
    const inventory = await tx.inventory.findUnique({ where: { variantId } })
    if (!inventory) throw new Error(`Inventory record not found for variant ${variantId}`)

    // Move from reserved to committed (sold, awaiting fulfillment)
    await tx.inventoryMovement.create({
      data: { variantId, productId, type: 'SALE', quantity, reason: 'Payment confirmed', orderId },
    })

    return tx.inventory.update({
      where: { variantId },
      data: {
        reserved: { decrement: Math.min(quantity, inventory.reserved) },
        committed: { increment: quantity },
        available: inventory.reserved < quantity
          ? { decrement: quantity - inventory.reserved }  // wasn't reserved, deduct from available
          : undefined,
      },
    })
  })
}

/**
 * Release reservation when an order is cancelled before payment.
 */
async function releaseReservation({ variantId, productId, quantity, orderId }) {
  return recordMovement({ variantId, productId, type: 'RELEASED', quantity, reason: 'Order cancelled', orderId })
}

/**
 * Mark stock as fulfilled (committed → delivered).
 * committed stays as-is after delivery — this is accurate sold inventory.
 */
async function fulfillStock({ variantId, productId, quantity, orderId }) {
  return prisma.inventoryMovement.create({
    data: { variantId, productId, type: 'SALE', quantity: 0, reason: 'Order fulfilled', orderId },
  })
}

/**
 * Process a return — puts stock back as available.
 */
async function processReturn({ variantId, productId, quantity, orderId, notes }) {
  return recordMovement({ variantId, productId, type: 'RETURN', quantity, reason: 'Customer return', orderId, notes })
}

/**
 * Get low-stock and out-of-stock variants across all published products.
 */
async function getLowStockAlerts() {
  const variants = await prisma.productVariant.findMany({
    where: { isActive: true, product: { status: 'PUBLISHED' } },
    include: {
      product: { select: { id: true, name: true, lowStockThreshold: true } },
      inventory: true,
    },
  })

  const lowStock = []
  const outOfStock = []

  for (const v of variants) {
    const available = v.inventory?.available ?? 0
    const threshold = v.product.lowStockThreshold

    if (available === 0) {
      outOfStock.push({ variantId: v.id, productId: v.product.id, productName: v.product.name, size: v.size, color: v.color, available })
    } else if (available <= threshold) {
      lowStock.push({ variantId: v.id, productId: v.product.id, productName: v.product.name, size: v.size, color: v.color, available, threshold })
    }
  }

  return { lowStock, outOfStock }
}

/**
 * Get full inventory list for the admin inventory page.
 */
async function getInventoryList({ page = 1, pageSize = 50, search = '' } = {}) {
  const skip = (page - 1) * pageSize

  const where = search
    ? {
        OR: [
          { product: { name: { contains: search, mode: 'insensitive' } } },
          { sku: { contains: search, mode: 'insensitive' } },
        ],
      }
    : {}

  const [variants, total] = await Promise.all([
    prisma.productVariant.findMany({
      where,
      skip,
      take: pageSize,
      include: {
        product: { select: { id: true, name: true, lowStockThreshold: true, status: true, images: true, category: { select: { name: true } } } },
        inventory: true,
      },
      orderBy: { product: { name: 'asc' } },
    }),
    prisma.productVariant.count({ where }),
  ])

  return {
    data: variants.map((v) => ({
      variantId: v.id,
      sku: v.sku,
      size: v.size,
      color: v.color,
      productId: v.product.id,
      productName: v.product.name,
      productStatus: v.product.status,
      productImage: Array.isArray(v.product.images) ? v.product.images[0] ?? null : null,
      category: v.product.category?.name ?? null,
      available: v.inventory?.available ?? 0,
      reserved: v.inventory?.reserved ?? 0,
      committed: v.inventory?.committed ?? 0,
      damaged: v.inventory?.damaged ?? 0,
      returned: v.inventory?.returned ?? 0,
      lowStockThreshold: v.product.lowStockThreshold,
      isLowStock: (v.inventory?.available ?? 0) > 0 && (v.inventory?.available ?? 0) <= v.product.lowStockThreshold,
      isOutOfStock: (v.inventory?.available ?? 0) === 0,
    })),
    pagination: { page, pageSize, total, totalPages: Math.ceil(total / pageSize) },
  }
}

module.exports = {
  getInventory,
  recordMovement,
  reserveStock,
  confirmSale,
  releaseReservation,
  fulfillStock,
  processReturn,
  getLowStockAlerts,
  getInventoryList,
}
