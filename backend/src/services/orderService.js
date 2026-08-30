/**
 * Order Service
 *
 * Handles order creation with a full economics snapshot.
 * Cost/pricing information is locked at order creation time — it never changes
 * after the order is placed, even if the product's supplier cost changes later.
 */

const Decimal = require('decimal.js')
const prisma = require('../lib/prisma')
const { calcMetricsAtPrice } = require('./pricingEngine')
const { allocatePayment, commitFulfillmentFunds } = require('./financialAllocation')
const { reserveStock, confirmSale, releaseReservation } = require('./inventoryService')
const { createAlert } = require('./alertService')

Decimal.set({ precision: 20, rounding: Decimal.ROUND_HALF_UP })

/**
 * Generate a unique order number.
 */
async function generateOrderNumber() {
  const date = new Date()
  const prefix = `SS${date.getFullYear()}${String(date.getMonth() + 1).padStart(2, '0')}`
  const count = await prisma.order.count()
  return `${prefix}-${String(count + 1).padStart(5, '0')}`
}

/**
 * Create a new order.
 *
 * Steps:
 * 1. Validate all items exist and are in stock
 * 2. Snapshot product costs (locked forever)
 * 3. Calculate order economics
 * 4. Reserve inventory
 * 5. Create order + items in DB
 */
async function createOrder({ customerId, addressId, items, shippingAmount = 0, discountAmount = 0, campaignId = null }) {
  // 1. Validate and load products/variants
  const loadedItems = await Promise.all(
    items.map(async ({ variantId, quantity }) => {
      const variant = await prisma.productVariant.findUnique({
        where: { id: variantId, isActive: true },
        include: {
          product: true,
          inventory: true,
        },
      })

      if (!variant) throw new Error(`Product variant ${variantId} not found or inactive`)
      if (variant.product.status !== 'PUBLISHED') throw new Error(`Product "${variant.product.name}" is not available`)
      if ((variant.inventory?.available ?? 0) < quantity) {
        throw new Error(`Insufficient stock for ${variant.product.name} (${variant.size || ''} ${variant.color || ''}). Available: ${variant.inventory?.available ?? 0}`)
      }

      return { variant, quantity }
    })
  )

  // 2. Calculate order economics
  let subtotal = new Decimal(0)
  let totalProductCost = new Decimal(0)
  let totalFulfillmentCost = new Decimal(0)
  let totalContribution = new Decimal(0)

  const itemSnapshots = loadedItems.map(({ variant, quantity }) => {
    const product = variant.product

    // Snapshot all costs at this moment — these never change
    const unitPrice = new Decimal(variant.priceOverride ?? product.sellingPrice)
    const unitCost = new Decimal(variant.costOverride ?? product.supplierCost)
    const fulfillmentCost = new Decimal(product.fulfillmentCost)
    const packagingCost = new Decimal(product.packagingCost)

    const lineTotal = unitPrice.mul(quantity)
    const lineCost = unitCost.mul(quantity)
    const lineFulfillment = fulfillmentCost.mul(quantity)
    const linePackaging = packagingCost.mul(quantity)

    // Calculate item-level contribution
    const paymentFeeAmount = lineTotal.mul(new Decimal(product.paymentFeePercent))
    const totalLineCost = lineCost.plus(lineFulfillment).plus(linePackaging).plus(paymentFeeAmount)
    const contribution = lineTotal.minus(totalLineCost)
    const margin = lineTotal.greaterThan(0) ? contribution.div(lineTotal) : new Decimal(0)

    subtotal = subtotal.plus(lineTotal)
    totalProductCost = totalProductCost.plus(lineCost)
    totalFulfillmentCost = totalFulfillmentCost.plus(lineFulfillment)
    totalContribution = totalContribution.plus(contribution)

    return {
      variantId: variant.id,
      productId: product.id,
      productName: product.name,
      variantSku: variant.sku,
      size: variant.size,
      color: variant.color,
      quantity,
      unitPrice: unitPrice.toDecimalPlaces(2).toNumber(),
      discountAmount: 0,
      lineTotal: lineTotal.toDecimalPlaces(2).toNumber(),
      unitCost: unitCost.toDecimalPlaces(2).toNumber(),
      fulfillmentCost: fulfillmentCost.toDecimalPlaces(2).toNumber(),
      packagingCost: packagingCost.toDecimalPlaces(2).toNumber(),
      contribution: contribution.toDecimalPlaces(2).toNumber(),
      margin: margin.toDecimalPlaces(4).toNumber(),
    }
  })

  const discountDec = new Decimal(discountAmount)
  const shippingDec = new Decimal(shippingAmount)
  const totalAmount = subtotal.minus(discountDec).plus(shippingDec)

  // Recalculate total contribution accounting for discount and shipping revenue
  const orderContribution = totalContribution.minus(discountDec)
  const contributionMargin = totalAmount.greaterThan(0) ? orderContribution.div(totalAmount) : new Decimal(0)

  // 3. Create order in DB and reserve inventory atomically
  const order = await prisma.$transaction(async (tx) => {
    const orderNumber = await generateOrderNumber()

    const createdOrder = await tx.order.create({
      data: {
        orderNumber,
        customerId,
        addressId,
        subtotal: subtotal.toDecimalPlaces(2).toNumber(),
        discountAmount: discountDec.toDecimalPlaces(2).toNumber(),
        shippingAmount: shippingDec.toDecimalPlaces(2).toNumber(),
        paymentFee: 0, // calculated after payment confirmation
        totalAmount: totalAmount.toDecimalPlaces(2).toNumber(),
        totalProductCost: totalProductCost.toDecimalPlaces(2).toNumber(),
        totalFulfillmentCost: totalFulfillmentCost.toDecimalPlaces(2).toNumber(),
        contribution: orderContribution.toDecimalPlaces(2).toNumber(),
        contributionMargin: contributionMargin.toDecimalPlaces(4).toNumber(),
        campaignId,
        paymentStatus: 'PENDING',
        fulfillmentStatus: 'UNFULFILLED',
        items: {
          create: itemSnapshots,
        },
      },
      include: { items: true },
    })

    // Reserve inventory for all items
    for (const { variant, quantity } of loadedItems) {
      await tx.inventoryMovement.create({
        data: {
          variantId: variant.id,
          productId: variant.productId,
          type: 'RESERVED',
          quantity,
          reason: 'Order placed',
          orderId: createdOrder.id,
        },
      })
      await tx.inventory.upsert({
        where: { variantId: variant.id },
        create: { variantId: variant.id, available: 0, reserved: quantity },
        update: { available: { decrement: quantity }, reserved: { increment: quantity } },
      })
    }

    return createdOrder
  })

  return order
}

/**
 * Confirm payment for an order.
 *
 * Steps:
 * 1. Mark order as PAID
 * 2. Convert reserved inventory to committed (sold)
 * 3. Trigger financial allocation
 * 4. Commit fulfillment funds in the wallet
 */
async function confirmPayment({ orderId, paymentMethod, paymentReference, amount }) {
  const order = await prisma.order.findUniqueOrThrow({
    where: { id: orderId },
    include: { items: { include: { variant: true } } },
  })

  if (order.paymentStatus === 'PAID') {
    throw new Error('Order is already paid')
  }

  const amountDec = new Decimal(amount)
  const expectedDec = new Decimal(order.totalAmount)

  if (!amountDec.equals(expectedDec)) {
    throw new Error(`Payment amount R${amount} does not match order total R${order.totalAmount}`)
  }

  await prisma.$transaction(async (tx) => {
    // Update order status
    await tx.order.update({
      where: { id: orderId },
      data: {
        paymentStatus: 'PAID',
        paymentMethod,
        paymentReference,
        paidAt: new Date(),
        fulfillmentStatus: 'PROCESSING',
      },
    })

    // Record payment
    await tx.payment.create({
      data: {
        orderId,
        amount: amountDec.toDecimalPlaces(2).toNumber(),
        method: paymentMethod,
        status: 'PAID',
        reference: paymentReference,
        processedAt: new Date(),
      },
    })

    // Convert inventory: reserved → committed
    for (const item of order.items) {
      await tx.inventoryMovement.create({
        data: {
          variantId: item.variantId,
          productId: item.productId,
          type: 'SALE',
          quantity: item.quantity,
          reason: 'Payment confirmed',
          orderId,
        },
      })
      await tx.inventory.update({
        where: { variantId: item.variantId },
        data: {
          reserved: { decrement: item.quantity },
          committed: { increment: item.quantity },
        },
      })
    }

    // Update customer stats
    await tx.customer.update({
      where: { id: order.customerId },
      data: {
        totalSpent: { increment: amountDec.toDecimalPlaces(2).toNumber() },
        orderCount: { increment: 1 },
        lastOrderAt: new Date(),
      },
    })
  })

  // Allocate payment to virtual wallets (outside main tx for clarity)
  await allocatePayment({
    orderId,
    amount: order.totalAmount,
    description: `Payment for order ${order.orderNumber}`,
  })

  // Commit fulfillment funds
  await commitFulfillmentFunds({
    orderId,
    fulfillmentCost: order.totalFulfillmentCost,
  })

  // Update campaign metrics if attributed
  if (order.campaignId) {
    await prisma.marketingCampaign.update({
      where: { id: order.campaignId },
      data: {
        orderCount: { increment: 1 },
        revenue: { increment: parseFloat(order.totalAmount) },
        contribution: { increment: parseFloat(order.contribution) },
      },
    })
  }

  return prisma.order.findUnique({ where: { id: orderId }, include: { items: true } })
}

/**
 * Mark order as shipped.
 */
async function shipOrder({ orderId, trackingNumber, trackingCarrier }) {
  return prisma.order.update({
    where: { id: orderId },
    data: {
      fulfillmentStatus: 'SHIPPED',
      trackingNumber,
      trackingCarrier,
      shippedAt: new Date(),
    },
  })
}

/**
 * Mark order as delivered and release committed inventory.
 */
async function deliverOrder({ orderId }) {
  const order = await prisma.order.findUniqueOrThrow({
    where: { id: orderId },
    include: { items: true },
  })

  return prisma.$transaction(async (tx) => {
    await tx.order.update({
      where: { id: orderId },
      data: {
        fulfillmentStatus: 'DELIVERED',
        deliveredAt: new Date(),
      },
    })

    // Committed inventory stays committed (it's sold)
    // Just record fulfillment events
    for (const item of order.items) {
      await tx.inventoryMovement.create({
        data: {
          variantId: item.variantId,
          productId: item.productId,
          type: 'SALE',
          quantity: 0,
          reason: 'Order delivered',
          orderId,
        },
      })
    }
  })
}

/**
 * Cancel an order (before payment).
 */
async function cancelOrder({ orderId, reason }) {
  const order = await prisma.order.findUniqueOrThrow({
    where: { id: orderId },
    include: { items: true },
  })

  if (order.paymentStatus === 'PAID') {
    throw new Error('Cannot cancel a paid order. Process a refund instead.')
  }

  return prisma.$transaction(async (tx) => {
    await tx.order.update({
      where: { id: orderId },
      data: {
        paymentStatus: 'FAILED',
        fulfillmentStatus: 'CANCELLED',
        cancelledAt: new Date(),
        cancelReason: reason,
      },
    })

    // Release inventory reservations
    for (const item of order.items) {
      await tx.inventoryMovement.create({
        data: {
          variantId: item.variantId,
          productId: item.productId,
          type: 'RELEASED',
          quantity: item.quantity,
          reason: 'Order cancelled',
          orderId,
        },
      })
      await tx.inventory.update({
        where: { variantId: item.variantId },
        data: {
          reserved: { decrement: item.quantity },
          available: { increment: item.quantity },
        },
      })
    }
  })
}

module.exports = {
  createOrder,
  confirmPayment,
  shipOrder,
  deliverOrder,
  cancelOrder,
}
