const express = require('express')
const { z } = require('zod')
const prisma = require('../../lib/prisma')
const { requireAdmin, requireRole } = require('../../middleware/adminAuth')
const { shipOrder, deliverOrder, cancelOrder } = require('../../services/orderService')
const { audit } = require('../../services/auditService')

const router = express.Router()
router.use(requireAdmin)

// GET /api/admin/orders
router.get('/', async (req, res) => {
  const { status, paymentStatus, fulfillmentStatus, search, page = '1', pageSize = '20', from, to } = req.query
  const p = parseInt(page)
  const ps = Math.min(parseInt(pageSize), 100)
  const skip = (p - 1) * ps

  const where = {
    ...(paymentStatus && { paymentStatus }),
    ...(fulfillmentStatus && { fulfillmentStatus }),
    ...(search && {
      OR: [
        { orderNumber: { contains: search, mode: 'insensitive' } },
        { customer: { email: { contains: search, mode: 'insensitive' } } },
        { customer: { firstName: { contains: search, mode: 'insensitive' } } },
      ],
    }),
    ...(from && { createdAt: { gte: new Date(from) } }),
    ...(to && { createdAt: { lte: new Date(to) } }),
  }

  const [orders, total] = await Promise.all([
    prisma.order.findMany({
      where,
      skip,
      take: ps,
      orderBy: { createdAt: 'desc' },
      include: {
        customer: { select: { id: true, email: true, firstName: true, lastName: true } },
        items: { select: { productName: true, size: true, color: true, quantity: true, unitPrice: true } },
        _count: { select: { items: true } },
      },
    }),
    prisma.order.count({ where }),
  ])

  res.json({ data: orders, pagination: { page: p, pageSize: ps, total, totalPages: Math.ceil(total / ps) } })
})

// GET /api/admin/orders/:id — full order detail including economics
router.get('/:id', async (req, res) => {
  const order = await prisma.order.findUniqueOrThrow({
    where: { id: req.params.id },
    include: {
      customer: true,
      address: true,
      items: { include: { product: { select: { name: true, slug: true } } } },
      payments: true,
      refundRequests: { include: { items: { include: { orderItem: true } } } },
      financialTransactions: { include: { allocations: { include: { account: true } } } },
    },
  })

  res.json(order)
})

// POST /api/admin/orders/:id/ship
router.post('/:id/ship', requireRole('ADMIN', 'MANAGER', 'SUPER_ADMIN'), async (req, res) => {
  const schema = z.object({
    trackingNumber: z.string().min(1),
    trackingCarrier: z.string().min(1),
  })
  const data = schema.parse(req.body)
  const order = await shipOrder({ orderId: req.params.id, ...data })

  await audit({ userId: req.adminUser.id, action: 'SHIP_ORDER', entity: 'Order', entityId: req.params.id, newValue: data, req })
  res.json(order)
})

// POST /api/admin/orders/:id/deliver
router.post('/:id/deliver', requireRole('ADMIN', 'MANAGER', 'SUPER_ADMIN'), async (req, res) => {
  const order = await deliverOrder({ orderId: req.params.id })
  await audit({ userId: req.adminUser.id, action: 'DELIVER_ORDER', entity: 'Order', entityId: req.params.id, req })
  res.json(order)
})

// POST /api/admin/orders/:id/cancel
router.post('/:id/cancel', requireRole('ADMIN', 'SUPER_ADMIN'), async (req, res) => {
  const schema = z.object({ reason: z.string().min(1) })
  const { reason } = schema.parse(req.body)
  await cancelOrder({ orderId: req.params.id, reason })
  await audit({ userId: req.adminUser.id, action: 'CANCEL_ORDER', entity: 'Order', entityId: req.params.id, newValue: { reason }, req })
  res.json({ message: 'Order cancelled' })
})

// GET /api/admin/orders/:id/economics — dedicated economics summary for an order
router.get('/:id/economics', async (req, res) => {
  const order = await prisma.order.findUniqueOrThrow({
    where: { id: req.params.id },
    include: {
      items: true,
      financialTransactions: { include: { allocations: { include: { account: { select: { name: true, key: true } } } } } },
    },
  })

  const allocations = order.financialTransactions
    .filter((t) => t.type === 'SALE')
    .flatMap((t) => t.allocations)
    .map((a) => ({ wallet: a.account?.name, key: a.account?.key, amount: parseFloat(a.amount) }))

  res.json({
    orderNumber: order.orderNumber,
    totalRevenue: parseFloat(order.totalAmount),
    directCosts: {
      productCost: parseFloat(order.totalProductCost),
      fulfillmentCost: parseFloat(order.totalFulfillmentCost),
      otherCosts: parseFloat(order.totalOtherCosts),
      paymentFee: parseFloat(order.paymentFee),
    },
    contribution: parseFloat(order.contribution),
    contributionMargin: parseFloat(order.contributionMargin),
    moneyAllocated: allocations,
    items: order.items.map((i) => ({
      productName: i.productName,
      size: i.size,
      color: i.color,
      quantity: i.quantity,
      unitPrice: parseFloat(i.unitPrice),
      unitCost: parseFloat(i.unitCost),
      contribution: parseFloat(i.contribution),
      margin: parseFloat(i.margin),
    })),
  })
})

module.exports = router
