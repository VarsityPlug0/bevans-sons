const express = require('express')
const { z } = require('zod')
const prisma = require('../../lib/prisma')
const { requireAdmin, requireRole } = require('../../middleware/adminAuth')
const { recordMovement, getInventoryList } = require('../../services/inventoryService')
const { audit } = require('../../services/auditService')

const router = express.Router()
router.use(requireAdmin)

// GET /api/admin/inventory
router.get('/', async (req, res) => {
  const { page, pageSize, search } = req.query
  const result = await getInventoryList({ page: parseInt(page ?? 1), pageSize: parseInt(pageSize ?? 50), search })
  res.json(result)
})

// GET /api/admin/inventory/:variantId/movements
router.get('/:variantId/movements', async (req, res) => {
  const movements = await prisma.inventoryMovement.findMany({
    where: { variantId: req.params.variantId },
    orderBy: { createdAt: 'desc' },
    take: 100,
    include: { order: { select: { orderNumber: true } } },
  })
  res.json(movements)
})

// POST /api/admin/inventory/:variantId/adjust — manual adjustment
router.post('/:variantId/adjust', requireRole('ADMIN', 'MANAGER', 'SUPER_ADMIN'), async (req, res) => {
  const schema = z.object({
    quantity: z.number().int(),
    reason: z.string().min(1),
    notes: z.string().optional(),
  })
  const data = schema.parse(req.body)

  const variant = await prisma.productVariant.findUniqueOrThrow({
    where: { id: req.params.variantId },
    include: { inventory: true },
  })

  const updated = await recordMovement({
    variantId: req.params.variantId,
    productId: variant.productId,
    type: 'ADJUSTMENT',
    quantity: data.quantity,
    reason: data.reason,
    userId: req.adminUser.id,
    notes: data.notes,
  })

  await audit({
    userId: req.adminUser.id,
    action: 'INVENTORY_ADJUSTMENT',
    entity: 'Inventory',
    entityId: req.params.variantId,
    previousValue: { available: variant.inventory?.available },
    newValue: { quantity: data.quantity, reason: data.reason },
    req,
  })

  res.json(updated)
})

// POST /api/admin/inventory/:variantId/receive — receive stock from supplier
router.post('/:variantId/receive', requireRole('ADMIN', 'MANAGER', 'SUPER_ADMIN'), async (req, res) => {
  const schema = z.object({
    quantity: z.number().int().positive(),
    supplierId: z.string().optional(),
    notes: z.string().optional(),
  })
  const data = schema.parse(req.body)

  const variant = await prisma.productVariant.findUniqueOrThrow({ where: { id: req.params.variantId } })

  const updated = await recordMovement({
    variantId: req.params.variantId,
    productId: variant.productId,
    type: 'PURCHASE',
    quantity: data.quantity,
    reason: `Stock received from supplier`,
    userId: req.adminUser.id,
    notes: data.notes,
  })

  await audit({ userId: req.adminUser.id, action: 'STOCK_RECEIVED', entity: 'Inventory', entityId: req.params.variantId, newValue: data, req })
  res.json(updated)
})

// GET /api/admin/inventory/alerts — low stock and out of stock
router.get('/alerts/stock', async (req, res) => {
  const { getLowStockAlerts } = require('../../services/inventoryService')
  const alerts = await getLowStockAlerts()
  res.json(alerts)
})

module.exports = router
