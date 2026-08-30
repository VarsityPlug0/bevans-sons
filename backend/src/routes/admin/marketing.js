const express = require('express')
const { z } = require('zod')
const Decimal = require('decimal.js')
const prisma = require('../../lib/prisma')
const { requireAdmin, requireRole } = require('../../middleware/adminAuth')
const { recordMarketingSpend } = require('../../services/financialAllocation')
const { audit } = require('../../services/auditService')

const router = express.Router()
router.use(requireAdmin)

const campaignSchema = z.object({
  name: z.string().min(1),
  platform: z.string().min(1),
  budget: z.number().positive(),
  startDate: z.string().datetime().optional(),
  endDate: z.string().datetime().optional(),
  notes: z.string().optional(),
})

// GET /api/admin/marketing/campaigns
router.get('/campaigns', async (req, res) => {
  const campaigns = await prisma.marketingCampaign.findMany({
    orderBy: { createdAt: 'desc' },
    include: { _count: { select: { orders: true } } },
  })
  res.json(campaigns)
})

// GET /api/admin/marketing/campaigns/:id
router.get('/campaigns/:id', async (req, res) => {
  const campaign = await prisma.marketingCampaign.findUniqueOrThrow({
    where: { id: req.params.id },
    include: { orders: { select: { orderNumber: true, totalAmount: true, contribution: true, paidAt: true }, take: 100 } },
  })
  res.json(campaign)
})

// POST /api/admin/marketing/campaigns
router.post('/campaigns', requireRole('ADMIN', 'MANAGER', 'SUPER_ADMIN'), async (req, res) => {
  const data = campaignSchema.parse(req.body)
  const campaign = await prisma.marketingCampaign.create({
    data: {
      ...data,
      startDate: data.startDate ? new Date(data.startDate) : null,
      endDate: data.endDate ? new Date(data.endDate) : null,
    },
  })
  await audit({ userId: req.adminUser.id, action: 'CREATE_CAMPAIGN', entity: 'MarketingCampaign', entityId: campaign.id, newValue: { name: data.name }, req })
  res.status(201).json(campaign)
})

// PUT /api/admin/marketing/campaigns/:id
router.put('/campaigns/:id', requireRole('ADMIN', 'MANAGER', 'SUPER_ADMIN'), async (req, res) => {
  const data = campaignSchema.partial().extend({ status: z.enum(['DRAFT', 'ACTIVE', 'PAUSED', 'COMPLETED', 'CANCELLED']).optional() }).parse(req.body)
  const campaign = await prisma.marketingCampaign.update({ where: { id: req.params.id }, data })
  res.json(campaign)
})

// POST /api/admin/marketing/campaigns/:id/record-spend — log actual ad spend
router.post('/campaigns/:id/record-spend', requireRole('ADMIN', 'MANAGER', 'SUPER_ADMIN'), async (req, res) => {
  const schema = z.object({ amount: z.number().positive(), description: z.string().optional() })
  const data = schema.parse(req.body)

  const campaign = await prisma.marketingCampaign.findUniqueOrThrow({ where: { id: req.params.id } })

  await prisma.marketingCampaign.update({
    where: { id: req.params.id },
    data: { spend: { increment: data.amount } },
  })

  await recordMarketingSpend({
    campaignId: req.params.id,
    amount: data.amount,
    description: data.description || `Ad spend for campaign: ${campaign.name}`,
  })

  // Recalculate ROAS and CAC
  const updated = await prisma.marketingCampaign.findUnique({ where: { id: req.params.id } })
  const newSpend = parseFloat(updated.spend)
  const revenue = parseFloat(updated.revenue)
  const customerCount = updated.customerCount

  const roas = newSpend > 0 ? new Decimal(revenue).div(newSpend).toDecimalPlaces(2).toNumber() : 0
  const cac = customerCount > 0 ? new Decimal(newSpend).div(customerCount).toDecimalPlaces(2).toNumber() : 0

  await prisma.marketingCampaign.update({ where: { id: req.params.id }, data: { roas, cac } })

  await audit({ userId: req.adminUser.id, action: 'RECORD_MARKETING_SPEND', entity: 'MarketingCampaign', entityId: req.params.id, newValue: data, req })
  res.json({ message: 'Spend recorded', newTotalSpend: newSpend + data.amount, roas, cac })
})

// GET /api/admin/marketing/overview — aggregate marketing performance
router.get('/overview', async (req, res) => {
  const { from, to } = req.query
  const dateFilter = { ...(from && { gte: new Date(from) }), ...(to && { lte: new Date(to) }) }
  const where = Object.keys(dateFilter).length ? { createdAt: dateFilter } : {}

  const campaigns = await prisma.marketingCampaign.findMany({ where })

  const totalSpend = campaigns.reduce((s, c) => s + parseFloat(c.spend), 0)
  const totalRevenue = campaigns.reduce((s, c) => s + parseFloat(c.revenue), 0)
  const totalContribution = campaigns.reduce((s, c) => s + parseFloat(c.contribution), 0)
  const totalOrders = campaigns.reduce((s, c) => s + c.orderCount, 0)
  const totalCustomers = campaigns.reduce((s, c) => s + c.customerCount, 0)

  const overallROAS = totalSpend > 0 ? new Decimal(totalRevenue).div(totalSpend).toDecimalPlaces(2).toNumber() : 0
  const overallCAC = totalCustomers > 0 ? new Decimal(totalSpend).div(totalCustomers).toDecimalPlaces(2).toNumber() : 0

  res.json({
    totalSpend,
    totalRevenue,
    totalContribution,
    totalOrders,
    totalCustomers,
    overallROAS,
    overallCAC,
    campaigns,
  })
})

module.exports = router
