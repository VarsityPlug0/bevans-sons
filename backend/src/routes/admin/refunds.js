const express = require('express')
const { z } = require('zod')
const prisma = require('../../lib/prisma')
const { requireAdmin, requireRole } = require('../../middleware/adminAuth')
const { reverseAllocation } = require('../../services/financialAllocation')
const { processReturn } = require('../../services/inventoryService')
const { audit } = require('../../services/auditService')

const router = express.Router()
router.use(requireAdmin)

// GET /api/admin/refunds
router.get('/', async (req, res) => {
  const { status, page = '1', pageSize = '20' } = req.query
  const p = parseInt(page)
  const ps = Math.min(parseInt(pageSize), 100)

  const where = status ? { status } : {}

  const [refunds, total] = await Promise.all([
    prisma.refundRequest.findMany({
      where,
      skip: (p - 1) * ps,
      take: ps,
      orderBy: { createdAt: 'desc' },
      include: {
        order: { select: { orderNumber: true, totalAmount: true } },
        customer: { select: { email: true, firstName: true, lastName: true } },
        items: { include: { orderItem: { select: { productName: true, size: true } } } },
      },
    }),
    prisma.refundRequest.count({ where }),
  ])

  res.json({ data: refunds, pagination: { page: p, pageSize: ps, total, totalPages: Math.ceil(total / ps) } })
})

// GET /api/admin/refunds/:id
router.get('/:id', async (req, res) => {
  const refund = await prisma.refundRequest.findUniqueOrThrow({
    where: { id: req.params.id },
    include: {
      order: { include: { items: true } },
      customer: { select: { id: true, email: true, firstName: true, lastName: true } },
      items: { include: { orderItem: true } },
      approvedBy: { select: { firstName: true, lastName: true } },
      financialReversal: true,
    },
  })
  res.json(refund)
})

// POST /api/admin/refunds/:id/approve
router.post('/:id/approve', requireRole('ADMIN', 'SUPER_ADMIN'), async (req, res) => {
  const schema = z.object({
    approvedAmount: z.number().positive(),
    notes: z.string().optional(),
  })
  const data = schema.parse(req.body)

  const refund = await prisma.refundRequest.findUniqueOrThrow({ where: { id: req.params.id } })
  if (refund.status !== 'PENDING' && refund.status !== 'UNDER_REVIEW') {
    return res.status(400).json({ error: `Cannot approve a refund in status: ${refund.status}` })
  }

  if (data.approvedAmount > parseFloat(refund.requestedAmount)) {
    return res.status(400).json({ error: 'Approved amount cannot exceed requested amount' })
  }

  const updated = await prisma.refundRequest.update({
    where: { id: req.params.id },
    data: {
      status: 'APPROVED',
      approvedAmount: data.approvedAmount,
      approvedById: req.adminUser.id,
      approvedAt: new Date(),
      notes: data.notes,
    },
  })

  await audit({ userId: req.adminUser.id, action: 'APPROVE_REFUND', entity: 'RefundRequest', entityId: req.params.id, newValue: { approvedAmount: data.approvedAmount }, req })
  res.json(updated)
})

// POST /api/admin/refunds/:id/reject
router.post('/:id/reject', requireRole('ADMIN', 'SUPER_ADMIN'), async (req, res) => {
  const schema = z.object({ reason: z.string().min(5) })
  const { reason } = schema.parse(req.body)

  const updated = await prisma.refundRequest.update({
    where: { id: req.params.id },
    data: { status: 'REJECTED', rejectionReason: reason, approvedById: req.adminUser.id, approvedAt: new Date() },
  })

  await prisma.order.update({ where: { id: updated.orderId }, data: { refundStatus: 'REJECTED' } })
  await audit({ userId: req.adminUser.id, action: 'REJECT_REFUND', entity: 'RefundRequest', entityId: req.params.id, newValue: { reason }, req })
  res.json(updated)
})

// POST /api/admin/refunds/:id/process — execute the actual refund payment + inventory reversal
router.post('/:id/process', requireRole('ADMIN', 'SUPER_ADMIN'), async (req, res) => {
  const schema = z.object({
    refundMethod: z.string().min(1),
    refundReference: z.string().optional(),
    restockItems: z.boolean().default(true),
  })
  const data = schema.parse(req.body)

  const refund = await prisma.refundRequest.findUniqueOrThrow({
    where: { id: req.params.id },
    include: { items: { include: { orderItem: { include: { variant: true } } } }, order: true },
  })

  if (refund.status !== 'APPROVED') {
    return res.status(400).json({ error: 'Refund must be approved before processing' })
  }

  const approvedAmount = parseFloat(refund.approvedAmount)

  await prisma.$transaction(async (tx) => {
    // Mark refund as completed
    await tx.refundRequest.update({
      where: { id: req.params.id },
      data: { status: 'COMPLETED', refundMethod: data.refundMethod, refundReference: data.refundReference, processedAt: new Date() },
    })

    // Update order payment and refund status
    await tx.order.update({
      where: { id: refund.orderId },
      data: { paymentStatus: 'REFUNDED', refundStatus: 'REFUNDED' },
    })

    // Update order item refunded quantities
    for (const item of refund.items) {
      await tx.orderItem.update({
        where: { id: item.orderItemId },
        data: { refundedQty: { increment: item.quantity } },
      })
    }

    // Restock inventory if requested
    if (data.restockItems) {
      for (const item of refund.items) {
        await tx.inventoryMovement.create({
          data: {
            variantId: item.orderItem.variantId,
            productId: item.orderItem.productId,
            type: 'RETURN',
            quantity: item.quantity,
            reason: 'Customer refund restocked',
            orderId: refund.orderId,
          },
        })
        await tx.inventory.update({
          where: { variantId: item.orderItem.variantId },
          data: {
            available: { increment: item.quantity },
            committed: { decrement: item.quantity },
            returned: { increment: item.quantity },
          },
        })
      }
    }
  })

  // Reverse financial allocations (outside main tx to keep it cleaner)
  await reverseAllocation({
    refundRequestId: refund.id,
    orderId: refund.orderId,
    refundAmount: approvedAmount,
  })

  await audit({ userId: req.adminUser.id, action: 'PROCESS_REFUND', entity: 'RefundRequest', entityId: req.params.id, newValue: { approvedAmount, refundMethod: data.refundMethod }, req })
  res.json({ message: 'Refund processed', amount: approvedAmount })
})

module.exports = router
