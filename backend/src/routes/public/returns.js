const express = require('express')
const { z } = require('zod')
const prisma = require('../../lib/prisma')
const { requireCustomer } = require('../../middleware/auth')

const router = express.Router()

const returnSchema = z.object({
  orderNumber: z.string(),
  reason: z.enum(['WRONG_SIZE', 'WRONG_ITEM', 'DAMAGED', 'NOT_AS_DESCRIBED', 'CHANGED_MIND', 'NOT_DELIVERED', 'OTHER']),
  description: z.string().min(10),
  items: z.array(z.object({ orderItemId: z.string(), quantity: z.number().int().positive() })).min(1),
  evidence: z.array(z.string().url()).optional(),
})

// POST /api/returns — submit a return/refund request
router.post('/', requireCustomer, async (req, res) => {
  const data = returnSchema.parse(req.body)

  const order = await prisma.order.findFirst({
    where: { orderNumber: data.orderNumber, customerId: req.customer.id },
    include: { items: true, refundRequests: true },
  })

  if (!order) return res.status(404).json({ error: 'Order not found' })
  if (order.paymentStatus !== 'PAID') return res.status(400).json({ error: 'Only paid orders can be returned' })

  // Check for existing pending refund request
  const existingPending = order.refundRequests.find((r) => !['REJECTED', 'COMPLETED'].includes(r.status))
  if (existingPending) return res.status(409).json({ error: 'A refund request is already pending for this order' })

  // Validate line items
  let requestedAmount = 0
  const refundItems = []

  for (const { orderItemId, quantity } of data.items) {
    const item = order.items.find((i) => i.id === orderItemId)
    if (!item) return res.status(400).json({ error: `Order item ${orderItemId} not found` })
    if (quantity > item.quantity - item.refundedQty) {
      return res.status(400).json({ error: `Cannot refund more units than purchased for item ${orderItemId}` })
    }
    const refundAmount = (parseFloat(item.unitPrice) * quantity)
    requestedAmount += refundAmount
    refundItems.push({ orderItemId, quantity, refundAmount })
  }

  const refundRequest = await prisma.refundRequest.create({
    data: {
      orderId: order.id,
      customerId: req.customer.id,
      reason: data.reason,
      description: data.description,
      evidence: data.evidence ?? [],
      requestedAmount,
      items: { create: refundItems },
    },
    include: { items: true },
  })

  await prisma.order.update({
    where: { id: order.id },
    data: { refundStatus: 'REQUESTED' },
  })

  res.status(201).json({ refundRequestId: refundRequest.id, requestedAmount, status: refundRequest.status })
})

// GET /api/returns — customer's return history
router.get('/', requireCustomer, async (req, res) => {
  const requests = await prisma.refundRequest.findMany({
    where: { customerId: req.customer.id },
    include: {
      order: { select: { orderNumber: true } },
      items: { include: { orderItem: { select: { productName: true, size: true } } } },
    },
    orderBy: { createdAt: 'desc' },
  })
  res.json(requests)
})

// GET /api/returns/:id
router.get('/:id', requireCustomer, async (req, res) => {
  const request = await prisma.refundRequest.findFirst({
    where: { id: req.params.id, customerId: req.customer.id },
    include: {
      order: { select: { orderNumber: true } },
      items: { include: { orderItem: { select: { productName: true, size: true, color: true } } } },
    },
  })
  if (!request) return res.status(404).json({ error: 'Return request not found' })
  res.json(request)
})

module.exports = router
