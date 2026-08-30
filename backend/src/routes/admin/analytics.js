const express = require('express')
const Decimal = require('decimal.js')
const prisma = require('../../lib/prisma')
const { requireAdmin } = require('../../middleware/adminAuth')

const router = express.Router()
router.use(requireAdmin)

function dateFilter(from, to) {
  const f = {}
  if (from) f.gte = new Date(from)
  if (to) f.lte = new Date(to)
  return Object.keys(f).length ? f : undefined
}

// GET /api/admin/analytics/sales
router.get('/sales', async (req, res) => {
  const { from, to } = req.query
  const df = dateFilter(from, to)
  const where = { paymentStatus: 'PAID', ...(df && { paidAt: df }) }

  const [totals, byDay] = await Promise.all([
    prisma.order.aggregate({
      _sum: { totalAmount: true, contribution: true, discountAmount: true },
      _count: { id: true },
      _avg: { totalAmount: true },
      where,
    }),
    prisma.order.groupBy({
      by: ['paidAt'],
      _sum: { totalAmount: true, contribution: true },
      _count: { id: true },
      where,
    }),
  ])

  const totalRevenue = parseFloat(totals._sum.totalAmount ?? 0)
  const totalContribution = parseFloat(totals._sum.contribution ?? 0)
  const orders = totals._count.id
  const aov = parseFloat(totals._avg.totalAmount ?? 0)

  res.json({
    revenue: totalRevenue,
    contribution: totalContribution,
    contributionMargin: totalRevenue > 0 ? new Decimal(totalContribution).div(totalRevenue).toDecimalPlaces(4).toNumber() : 0,
    orders,
    aov,
    discounts: parseFloat(totals._sum.discountAmount ?? 0),
  })
})

// GET /api/admin/analytics/products — product performance
router.get('/products', async (req, res) => {
  const { from, to, limit = '20' } = req.query
  const df = dateFilter(from, to)
  const orderWhere = { order: { paymentStatus: 'PAID', ...(df && { paidAt: df }) } }

  const items = await prisma.orderItem.groupBy({
    by: ['productId', 'productName'],
    _sum: { quantity: true, lineTotal: true, contribution: true },
    _count: { id: true },
    where: orderWhere,
    orderBy: { _sum: { lineTotal: 'desc' } },
    take: parseInt(limit),
  })

  const products = items.map((i) => ({
    productId: i.productId,
    productName: i.productName,
    unitsSold: i._sum.quantity,
    revenue: parseFloat(i._sum.lineTotal ?? 0),
    contribution: parseFloat(i._sum.contribution ?? 0),
    margin: i._sum.lineTotal > 0 ? new Decimal(i._sum.contribution ?? 0).div(i._sum.lineTotal).toDecimalPlaces(4).toNumber() : 0,
    orders: i._count.id,
  }))

  res.json({ bestSellers: products.slice(0, 10), worstPerformers: [...products].reverse().slice(0, 10), all: products })
})

// GET /api/admin/analytics/customers
router.get('/customers', async (req, res) => {
  const { from, to } = req.query
  const df = dateFilter(from, to)
  const since = df?.gte ?? new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)

  const [newCustomers, totalCustomers, repeatCount] = await Promise.all([
    prisma.customer.count({ where: { createdAt: { gte: since } } }),
    prisma.customer.count(),
    prisma.customer.count({ where: { orderCount: { gte: 2 } } }),
  ])

  const avgLTV = await prisma.customer.aggregate({ _avg: { totalSpent: true } })

  res.json({
    newCustomers,
    totalCustomers,
    repeatPurchaseRate: totalCustomers > 0 ? new Decimal(repeatCount).div(totalCustomers).toDecimalPlaces(4).toNumber() : 0,
    avgLifetimeValue: parseFloat(avgLTV._avg.totalSpent ?? 0),
  })
})

// GET /api/admin/analytics/financial
router.get('/financial', async (req, res) => {
  const { from, to } = req.query
  const df = dateFilter(from, to)
  const orderWhere = { paymentStatus: 'PAID', ...(df && { paidAt: df }) }
  const expenseWhere = df ? { date: df } : {}

  const [revenue, expenses, refunds] = await Promise.all([
    prisma.order.aggregate({ _sum: { totalAmount: true, contribution: true }, where: orderWhere }),
    prisma.expense.aggregate({ _sum: { amount: true }, where: expenseWhere }),
    prisma.refundRequest.aggregate({ _sum: { approvedAmount: true }, where: { status: 'COMPLETED', ...(df && { processedAt: df }) } }),
  ])

  const r = parseFloat(revenue._sum.totalAmount ?? 0)
  const contribution = parseFloat(revenue._sum.contribution ?? 0)
  const exp = parseFloat(expenses._sum.amount ?? 0)
  const ref = parseFloat(refunds._sum.approvedAmount ?? 0)

  res.json({
    revenue: r,
    contribution,
    contributionMargin: r > 0 ? new Decimal(contribution).div(r).toDecimalPlaces(4).toNumber() : 0,
    expenses: exp,
    refunds: ref,
    netProfit: contribution - exp,
    netMargin: r > 0 ? new Decimal(contribution - exp).div(r).toDecimalPlaces(4).toNumber() : 0,
  })
})

// GET /api/admin/analytics/inventory
router.get('/inventory', async (req, res) => {
  const result = await prisma.inventory.aggregate({
    _sum: { available: true, reserved: true, committed: true, damaged: true, returned: true },
  })

  const outOfStock = await prisma.productVariant.count({
    where: { isActive: true, product: { status: 'PUBLISHED' }, inventory: { available: { lte: 0 } } },
  })

  res.json({
    totalAvailable: result._sum.available ?? 0,
    totalReserved: result._sum.reserved ?? 0,
    totalCommitted: result._sum.committed ?? 0,
    totalDamaged: result._sum.damaged ?? 0,
    totalReturned: result._sum.returned ?? 0,
    outOfStockVariants: outOfStock,
  })
})

module.exports = router
