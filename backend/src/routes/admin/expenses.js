const express = require('express')
const { z } = require('zod')
const prisma = require('../../lib/prisma')
const { requireAdmin, requireRole } = require('../../middleware/adminAuth')
const { recordExpenseTransaction } = require('../../services/financialAllocation')
const { audit } = require('../../services/auditService')

const router = express.Router()
router.use(requireAdmin)

const expenseSchema = z.object({
  category: z.enum(['ADVERTISING', 'SOFTWARE', 'HOSTING', 'BANKING', 'PACKAGING', 'OPERATIONS', 'PROFESSIONAL_SERVICES', 'EQUIPMENT', 'OTHER']),
  description: z.string().min(1),
  amount: z.number().positive(),
  date: z.string().datetime().or(z.string().date()),
  supplierId: z.string().optional(),
  paymentMethod: z.string().optional(),
  receiptUrl: z.string().url().optional(),
  isRecurring: z.boolean().default(false),
  recurringPeriod: z.string().optional(),
  notes: z.string().optional(),
})

const categoryToWallet = {
  ADVERTISING: 'marketing',
  SOFTWARE: 'operations',
  HOSTING: 'operations',
  BANKING: 'operations',
  PACKAGING: 'fulfillment',
  OPERATIONS: 'operations',
  PROFESSIONAL_SERVICES: 'operations',
  EQUIPMENT: 'operations',
  OTHER: 'operations',
}

// GET /api/admin/expenses
router.get('/', async (req, res) => {
  const { category, from, to, page = '1', pageSize = '20' } = req.query
  const p = parseInt(page)
  const ps = Math.min(parseInt(pageSize), 100)

  const where = {
    ...(category && { category }),
    ...(from && { date: { gte: new Date(from) } }),
    ...(to && { date: { lte: new Date(to) } }),
  }

  const [expenses, total, sum] = await Promise.all([
    prisma.expense.findMany({
      where, skip: (p - 1) * ps, take: ps,
      include: { createdBy: { select: { firstName: true, lastName: true } } },
      orderBy: { date: 'desc' },
    }),
    prisma.expense.count({ where }),
    prisma.expense.aggregate({ _sum: { amount: true }, where }),
  ])

  res.json({
    data: expenses,
    total: parseFloat(sum._sum.amount ?? 0),
    pagination: { page: p, pageSize: ps, total, totalPages: Math.ceil(total / ps) },
  })
})

// POST /api/admin/expenses
router.post('/', async (req, res) => {
  const data = expenseSchema.parse(req.body)

  const expense = await prisma.expense.create({
    data: { ...data, date: new Date(data.date), createdById: req.adminUser.id },
  })

  // Deduct from the appropriate wallet
  const walletKey = categoryToWallet[data.category] || 'operations'
  await recordExpenseTransaction({
    expenseId: expense.id,
    accountKey: walletKey,
    amount: data.amount,
    description: `${data.category}: ${data.description}`,
  })

  await audit({ userId: req.adminUser.id, action: 'CREATE_EXPENSE', entity: 'Expense', entityId: expense.id, newValue: { category: data.category, amount: data.amount }, req })
  res.status(201).json(expense)
})

// GET /api/admin/expenses/by-category — expense breakdown by category
router.get('/by-category', async (req, res) => {
  const { from, to } = req.query
  const dateFilter = { ...(from && { gte: new Date(from) }), ...(to && { lte: new Date(to) }) }
  const where = Object.keys(dateFilter).length ? { date: dateFilter } : {}

  const result = await prisma.expense.groupBy({
    by: ['category'],
    _sum: { amount: true },
    _count: { id: true },
    where,
    orderBy: { _sum: { amount: 'desc' } },
  })

  res.json(result.map((r) => ({ category: r.category, total: parseFloat(r._sum.amount ?? 0), count: r._count.id })))
})

// DELETE /api/admin/expenses/:id — soft delete
router.delete('/:id', requireRole('ADMIN', 'SUPER_ADMIN'), async (req, res) => {
  const expense = await prisma.expense.findUniqueOrThrow({ where: { id: req.params.id } })
  await prisma.expense.delete({ where: { id: req.params.id } })
  await audit({ userId: req.adminUser.id, action: 'DELETE_EXPENSE', entity: 'Expense', entityId: req.params.id, previousValue: expense, req })
  res.json({ message: 'Expense deleted' })
})

module.exports = router
