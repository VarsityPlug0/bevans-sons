const express = require('express')
const Decimal = require('decimal.js')
const prisma = require('../../lib/prisma')
const { requireAdmin } = require('../../middleware/adminAuth')

const router = express.Router()
router.use(requireAdmin)

// GET /api/admin/customers
router.get('/', async (req, res) => {
  const { search, page = '1', pageSize = '20' } = req.query
  const p = parseInt(page)
  const ps = Math.min(parseInt(pageSize), 100)

  const where = search
    ? {
        OR: [
          { email: { contains: search, mode: 'insensitive' } },
          { firstName: { contains: search, mode: 'insensitive' } },
          { lastName: { contains: search, mode: 'insensitive' } },
          { phone: { contains: search } },
        ],
      }
    : {}

  const [customers, total] = await Promise.all([
    prisma.customer.findMany({
      where,
      skip: (p - 1) * ps,
      take: ps,
      orderBy: { createdAt: 'desc' },
      select: { id: true, email: true, firstName: true, lastName: true, phone: true, totalSpent: true, orderCount: true, lastOrderAt: true, createdAt: true, isActive: true },
    }),
    prisma.customer.count({ where }),
  ])

  res.json({ data: customers, pagination: { page: p, pageSize: ps, total, totalPages: Math.ceil(total / ps) } })
})

// GET /api/admin/customers/:id — full customer profile
router.get('/:id', async (req, res) => {
  const customer = await prisma.customer.findUniqueOrThrow({
    where: { id: req.params.id },
    include: {
      orders: {
        select: { orderNumber: true, totalAmount: true, contribution: true, paymentStatus: true, fulfillmentStatus: true, createdAt: true },
        orderBy: { createdAt: 'desc' },
        take: 50,
      },
      refundRequests: { select: { id: true, status: true, requestedAmount: true, reason: true, createdAt: true }, take: 20 },
      _count: { select: { orders: true, refundRequests: true } },
    },
  })

  const { password: _, ...safeCustomer } = customer
  const orders = safeCustomer.orders

  const avgOrderValue = orders.length > 0
    ? new Decimal(orders.reduce((s, o) => s + parseFloat(o.totalAmount), 0)).div(orders.length).toDecimalPlaces(2).toNumber()
    : 0

  const totalRefunds = safeCustomer.refundRequests
    .filter((r) => ['COMPLETED'].includes(r.status))
    .reduce((s, r) => s + parseFloat(r.requestedAmount), 0)

  res.json({
    ...safeCustomer,
    avgOrderValue,
    totalRefunds,
    status: customer.isActive ? 'ACTIVE' : 'INACTIVE',
  })
})

module.exports = router
