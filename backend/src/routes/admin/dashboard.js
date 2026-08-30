/**
 * Admin Dashboard
 *
 * All numbers come from real database queries.
 * Nothing is hardcoded or estimated.
 */

const express = require('express')
const Decimal = require('decimal.js')
const prisma = require('../../lib/prisma')
const { requireAdmin } = require('../../middleware/adminAuth')
const { getWalletSummary, getTotalAllocated } = require('../../services/financialAllocation')
const { getLowStockAlerts } = require('../../services/inventoryService')
const { loadPricingRules } = require('../../services/pricingEngine')

const router = express.Router()
router.use(requireAdmin)

// GET /api/admin/dashboard
router.get('/', async (req, res) => {
  const { period = '30' } = req.query
  const days = parseInt(period)
  const since = new Date()
  since.setDate(since.getDate() - days)

  const [
    revenue,
    orderStats,
    contribution,
    grossProfit,
    expenses,
    wallets,
    totalAllocated,
    lowStockData,
    pendingFulfillment,
    pendingRefunds,
    alerts,
    revenueChart,
  ] = await Promise.all([
    // Revenue (total of paid orders in period)
    prisma.order.aggregate({
      _sum: { totalAmount: true },
      where: { paymentStatus: 'PAID', paidAt: { gte: since } },
    }),

    // Order stats
    prisma.order.groupBy({
      by: ['paymentStatus'],
      _count: { id: true },
      where: { createdAt: { gte: since } },
    }),

    // Total contribution in period
    prisma.order.aggregate({
      _sum: { contribution: true },
      where: { paymentStatus: 'PAID', paidAt: { gte: since } },
    }),

    // Gross profit (contribution - period expenses)
    prisma.order.aggregate({
      _sum: { contribution: true },
      where: { paymentStatus: 'PAID', paidAt: { gte: since } },
    }),

    // Expenses in period
    prisma.expense.aggregate({
      _sum: { amount: true },
      where: { date: { gte: since } },
    }),

    // Virtual wallet balances
    getWalletSummary(),

    // Total allocated
    getTotalAllocated(),

    // Low stock / out of stock
    getLowStockAlerts(),

    // Orders awaiting fulfillment
    prisma.order.count({
      where: { paymentStatus: 'PAID', fulfillmentStatus: 'PROCESSING' },
    }),

    // Pending refund requests
    prisma.refundRequest.count({
      where: { status: { in: ['PENDING', 'UNDER_REVIEW'] } },
    }),

    // Unread alerts
    prisma.alert.findMany({
      where: { isResolved: false },
      orderBy: [{ severity: 'desc' }, { createdAt: 'desc' }],
      take: 20,
    }),

    // Revenue chart data (daily)
    buildRevenueChart(since, days),
  ])

  const totalRevenue = parseFloat(revenue._sum.totalAmount ?? 0)
  const totalContribution = parseFloat(contribution._sum.contribution ?? 0)
  const totalExpenses = parseFloat(expenses._sum.amount ?? 0)
  const netProfit = totalContribution - totalExpenses

  const orderCounts = {}
  orderStats.forEach((s) => { orderCounts[s.paymentStatus] = s._count.id })
  const totalOrders = Object.values(orderCounts).reduce((a, b) => a + b, 0)
  const paidOrders = orderCounts['PAID'] || 0

  // Previous period for comparison
  const prev = await getPreviousPeriodRevenue(since, days)

  const profitWallet = wallets.find((w) => w.key === 'profit')
  const reserveWallet = wallets.find((w) => w.key === 'reserve')
  const taxWallet = wallets.find((w) => w.key === 'tax')

  res.json({
    period: { days, since },
    revenue: {
      total: totalRevenue,
      vsLast: calcChange(totalRevenue, prev.revenue),
      orders: paidOrders,
      aov: paidOrders > 0 ? new Decimal(totalRevenue).div(paidOrders).toDecimalPlaces(2).toNumber() : 0,
    },
    contribution: {
      total: totalContribution,
      margin: totalRevenue > 0 ? new Decimal(totalContribution).div(totalRevenue).toDecimalPlaces(4).toNumber() : 0,
    },
    profitability: {
      grossProfit: totalContribution,
      operatingExpenses: totalExpenses,
      netProfit,
      netMargin: totalRevenue > 0 ? new Decimal(netProfit).div(totalRevenue).toDecimalPlaces(4).toNumber() : 0,
    },
    cash: {
      totalAllocated: totalAllocated.totalAllocated,
      totalCommitted: totalAllocated.totalCommitted,
      availableForWithdrawal: profitWallet ? profitWallet.available : 0,
      taxReserved: taxWallet ? taxWallet.balance : 0,
      businessReserve: reserveWallet ? reserveWallet.balance : 0,
      wallets,
    },
    operations: {
      pendingFulfillment,
      pendingRefunds,
      lowStockCount: lowStockData.lowStock.length,
      outOfStockCount: lowStockData.outOfStock.length,
      lowStockItems: lowStockData.lowStock.slice(0, 5),
      outOfStockItems: lowStockData.outOfStock.slice(0, 5),
    },
    alerts: {
      total: alerts.length,
      critical: alerts.filter((a) => a.severity === 'CRITICAL').length,
      warnings: alerts.filter((a) => a.severity === 'WARNING').length,
      items: alerts.slice(0, 10),
    },
    chart: revenueChart,
    businessHealth: calcBusinessHealth({ netProfit, totalRevenue, lowStockData, pendingFulfillment, profitWallet, reserveWallet }),
  })
})

function calcChange(current, previous) {
  if (previous === 0) return null
  return new Decimal(current - previous).div(previous).mul(100).toDecimalPlaces(1).toNumber()
}

async function getPreviousPeriodRevenue(since, days) {
  const prevStart = new Date(since)
  prevStart.setDate(prevStart.getDate() - days)

  const result = await prisma.order.aggregate({
    _sum: { totalAmount: true },
    where: { paymentStatus: 'PAID', paidAt: { gte: prevStart, lt: since } },
  })

  return { revenue: parseFloat(result._sum.totalAmount ?? 0) }
}

async function buildRevenueChart(since, days) {
  const orders = await prisma.order.findMany({
    where: { paymentStatus: 'PAID', paidAt: { gte: since } },
    select: { paidAt: true, totalAmount: true, contribution: true },
    orderBy: { paidAt: 'asc' },
  })

  // Group by day
  const byDay = {}
  for (const order of orders) {
    const day = order.paidAt.toISOString().split('T')[0]
    if (!byDay[day]) byDay[day] = { date: day, revenue: 0, contribution: 0, orders: 0 }
    byDay[day].revenue += parseFloat(order.totalAmount)
    byDay[day].contribution += parseFloat(order.contribution)
    byDay[day].orders += 1
  }

  // Fill in missing days
  const chart = []
  for (let i = 0; i <= days; i++) {
    const d = new Date(since)
    d.setDate(d.getDate() + i)
    const key = d.toISOString().split('T')[0]
    chart.push(byDay[key] ?? { date: key, revenue: 0, contribution: 0, orders: 0 })
  }

  return chart
}

function calcBusinessHealth({ netProfit, totalRevenue, lowStockData, pendingFulfillment, profitWallet, reserveWallet }) {
  const issues = []

  if (netProfit < 0) issues.push({ severity: 'CRITICAL', message: 'Business is operating at a loss' })
  if (lowStockData.outOfStock.length > 0) issues.push({ severity: 'WARNING', message: `${lowStockData.outOfStock.length} product(s) out of stock` })
  if (lowStockData.lowStock.length > 0) issues.push({ severity: 'INFO', message: `${lowStockData.lowStock.length} product(s) running low on stock` })
  if (pendingFulfillment > 5) issues.push({ severity: 'WARNING', message: `${pendingFulfillment} orders awaiting fulfillment` })
  if (reserveWallet && reserveWallet.balance < 5000) issues.push({ severity: 'WARNING', message: 'Business reserve is low' })

  let status = 'HEALTHY'
  if (issues.some((i) => i.severity === 'CRITICAL')) status = 'CRITICAL'
  else if (issues.some((i) => i.severity === 'WARNING')) status = 'NEEDS_ATTENTION'

  return { status, issues }
}

// GET /api/admin/dashboard/break-even
router.get('/break-even', async (req, res) => {
  const { period = '30' } = req.query
  const days = parseInt(period)
  const since = new Date()
  since.setDate(since.getDate() - days)

  const [expenses, contribution, orderCount] = await Promise.all([
    prisma.expense.aggregate({ _sum: { amount: true }, where: { isRecurring: true } }),
    prisma.order.aggregate({ _sum: { contribution: true }, _count: { id: true }, where: { paymentStatus: 'PAID', paidAt: { gte: since } } }),
    prisma.order.count({ where: { paymentStatus: 'PAID', paidAt: { gte: since } } }),
  ])

  const fixedCosts = parseFloat(expenses._sum.amount ?? 0)
  const totalContribution = parseFloat(contribution._sum.contribution ?? 0)
  const orders = orderCount
  const avgContribution = orders > 0 ? totalContribution / orders : 0
  const breakEvenOrders = avgContribution > 0 ? Math.ceil(fixedCosts / avgContribution) : null
  const distanceFromBreakEven = breakEvenOrders !== null ? orders - breakEvenOrders : null

  res.json({
    fixedCosts,
    avgContributionPerOrder: new Decimal(avgContribution).toDecimalPlaces(2).toNumber(),
    breakEvenOrders,
    currentOrders: orders,
    distanceFromBreakEven,
    achieved: distanceFromBreakEven !== null ? distanceFromBreakEven >= 0 : false,
  })
})

module.exports = router
