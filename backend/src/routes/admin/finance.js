const express = require('express')
const { z } = require('zod')
const Decimal = require('decimal.js')
const prisma = require('../../lib/prisma')
const { requireAdmin, requireRole } = require('../../middleware/adminAuth')
const { getWalletSummary, getTotalAllocated } = require('../../services/financialAllocation')
const { audit } = require('../../services/auditService')

const router = express.Router()
router.use(requireAdmin)

// GET /api/admin/finance/overview — full financial picture
router.get('/overview', async (req, res) => {
  const { from, to } = req.query
  const dateFilter = {
    ...(from && { gte: new Date(from) }),
    ...(to && { lte: new Date(to) }),
  }
  const hasDateFilter = from || to

  const [wallets, totalAllocated, revenue, totalExpenses, refundTotal] = await Promise.all([
    getWalletSummary(),
    getTotalAllocated(),
    prisma.order.aggregate({
      _sum: { totalAmount: true, contribution: true },
      where: { paymentStatus: 'PAID', ...(hasDateFilter && { paidAt: dateFilter }) },
    }),
    prisma.expense.aggregate({
      _sum: { amount: true },
      where: hasDateFilter ? { date: dateFilter } : {},
    }),
    prisma.refundRequest.aggregate({
      _sum: { approvedAmount: true },
      where: { status: 'COMPLETED', ...(hasDateFilter && { processedAt: dateFilter }) },
    }),
  ])

  const totalRevenue = parseFloat(revenue._sum.totalAmount ?? 0)
  const totalContribution = parseFloat(revenue._sum.contribution ?? 0)
  const expenses = parseFloat(totalExpenses._sum.amount ?? 0)
  const refunds = parseFloat(refundTotal._sum.approvedAmount ?? 0)
  const netProfit = totalContribution - expenses

  const profitWallet = wallets.find((w) => w.key === 'profit')
  const reserveWallet = wallets.find((w) => w.key === 'reserve')
  const taxWallet = wallets.find((w) => w.key === 'tax')
  const marketingWallet = wallets.find((w) => w.key === 'marketing')
  const fulfillmentWallet = wallets.find((w) => w.key === 'fulfillment')

  res.json({
    summary: {
      revenue: totalRevenue,
      contribution: totalContribution,
      contributionMargin: totalRevenue > 0 ? new Decimal(totalContribution).div(totalRevenue).toDecimalPlaces(4).toNumber() : 0,
      expenses,
      refunds,
      netProfit,
      netMargin: totalRevenue > 0 ? new Decimal(netProfit).div(totalRevenue).toDecimalPlaces(4).toNumber() : 0,
    },
    cash: {
      totalAllocated: totalAllocated.totalAllocated,
      totalCommitted: totalAllocated.totalCommitted,
      totalAvailable: totalAllocated.totalAllocated - totalAllocated.totalCommitted,
      availableForWithdrawal: profitWallet?.available ?? 0,
      wallets,
    },
    keyFigures: {
      businessReserve: reserveWallet?.balance ?? 0,
      taxReserved: taxWallet?.balance ?? 0,
      marketingAvailable: marketingWallet?.available ?? 0,
      fulfillmentCommitted: fulfillmentWallet?.committed ?? 0,
    },
  })
})

// GET /api/admin/finance/ledger — transaction ledger
router.get('/ledger', async (req, res) => {
  const { page = '1', pageSize = '50', type, from, to } = req.query
  const p = parseInt(page)
  const ps = Math.min(parseInt(pageSize), 200)
  const skip = (p - 1) * ps

  const where = {
    ...(type && { type }),
    ...(from && { createdAt: { gte: new Date(from) } }),
    ...(to && { createdAt: { lte: new Date(to) } }),
  }

  const [transactions, total] = await Promise.all([
    prisma.financialTransaction.findMany({
      where,
      skip,
      take: ps,
      orderBy: { createdAt: 'desc' },
      include: {
        account: { select: { name: true, key: true } },
        order: { select: { orderNumber: true } },
        allocations: { include: { account: { select: { name: true, key: true } } } },
      },
    }),
    prisma.financialTransaction.count({ where }),
  ])

  res.json({ data: transactions, pagination: { page: p, pageSize: ps, total, totalPages: Math.ceil(total / ps) } })
})

// GET /api/admin/finance/wallets — wallet details
router.get('/wallets', async (req, res) => {
  const wallets = await getWalletSummary()
  res.json(wallets)
})

// POST /api/admin/finance/wallets/:key/adjust — manual balance adjustment (SUPER_ADMIN only)
router.post('/wallets/:key/adjust', requireRole('SUPER_ADMIN'), async (req, res) => {
  const schema = z.object({ amount: z.number(), description: z.string().min(1) })
  const data = schema.parse(req.body)

  const account = await prisma.financialAccount.findUniqueOrThrow({ where: { key: req.params.key } })
  const prev = parseFloat(account.balance)

  await prisma.$transaction(async (tx) => {
    await tx.financialAccount.update({
      where: { key: req.params.key },
      data: { balance: { increment: data.amount } },
    })
    await tx.financialTransaction.create({
      data: {
        type: 'ADJUSTMENT',
        amount: Math.abs(data.amount),
        direction: data.amount >= 0 ? 'credit' : 'debit',
        accountId: account.id,
        description: data.description,
        createdBy: req.adminUser.id,
      },
    })
  })

  await audit({
    userId: req.adminUser.id,
    action: 'WALLET_ADJUSTMENT',
    entity: 'FinancialAccount',
    entityId: account.id,
    previousValue: { balance: prev },
    newValue: { adjustment: data.amount, description: data.description },
    req,
  })

  res.json({ message: 'Adjustment recorded' })
})

// POST /api/admin/finance/withdraw — record owner withdrawal from profit wallet
router.post('/withdraw', requireRole('SUPER_ADMIN'), async (req, res) => {
  const schema = z.object({ amount: z.number().positive(), description: z.string().optional() })
  const data = schema.parse(req.body)

  const profitWallet = await prisma.financialAccount.findUniqueOrThrow({ where: { key: 'profit' } })
  const available = new Decimal(profitWallet.balance).minus(new Decimal(profitWallet.committed))

  if (new Decimal(data.amount).greaterThan(available)) {
    return res.status(400).json({
      error: `Withdrawal amount R${data.amount} exceeds available profit R${available.toDecimalPlaces(2).toNumber()}`,
      available: available.toDecimalPlaces(2).toNumber(),
    })
  }

  await prisma.$transaction(async (tx) => {
    await tx.financialAccount.update({
      where: { key: 'profit' },
      data: { balance: { decrement: data.amount } },
    })
    await tx.financialTransaction.create({
      data: {
        type: 'OWNER_WITHDRAWAL',
        amount: data.amount,
        direction: 'debit',
        accountId: profitWallet.id,
        description: data.description || 'Owner withdrawal',
        createdBy: req.adminUser.id,
      },
    })
  })

  await audit({ userId: req.adminUser.id, action: 'OWNER_WITHDRAWAL', entity: 'FinancialAccount', entityId: profitWallet.id, newValue: { amount: data.amount }, req })
  res.json({ message: `Withdrawal of R${data.amount} recorded`, newBalance: parseFloat(profitWallet.balance) - data.amount })
})

// GET /api/admin/finance/allocation-rules
router.get('/allocation-rules', async (req, res) => {
  const rules = await prisma.allocationRule.findMany({ orderBy: { sortOrder: 'asc' } })
  res.json(rules)
})

// PUT /api/admin/finance/allocation-rules — update rules (must sum to 100%)
router.put('/allocation-rules', requireRole('SUPER_ADMIN'), async (req, res) => {
  const schema = z.array(z.object({
    accountKey: z.string(),
    percentage: z.number().min(0).max(1),
    name: z.string(),
    description: z.string().optional(),
  }))
  const rules = schema.parse(req.body)

  const total = rules.reduce((sum, r) => sum + r.percentage, 0)
  if (Math.abs(total - 1) > 0.0001) {
    return res.status(400).json({ error: `Allocation rules must sum to 100%. Current total: ${(total * 100).toFixed(2)}%` })
  }

  await prisma.$transaction(
    rules.map((rule, i) =>
      prisma.allocationRule.upsert({
        where: { accountKey: rule.accountKey },
        create: { ...rule, sortOrder: i },
        update: { ...rule, sortOrder: i },
      })
    )
  )

  await audit({ userId: req.adminUser.id, action: 'UPDATE_ALLOCATION_RULES', entity: 'AllocationRule', newValue: rules, req })
  res.json({ message: 'Allocation rules updated' })
})

module.exports = router
