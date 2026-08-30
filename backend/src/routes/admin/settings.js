const express = require('express')
const { z } = require('zod')
const prisma = require('../../lib/prisma')
const { requireAdmin, requireRole } = require('../../middleware/adminAuth')
const { audit } = require('../../services/auditService')

const router = express.Router()
router.use(requireAdmin)

// GET /api/admin/settings
router.get('/', async (req, res) => {
  const settings = await prisma.businessSetting.findMany({ orderBy: [{ category: 'asc' }, { key: 'asc' }] })
  res.json(settings)
})

// PUT /api/admin/settings — update multiple settings at once
// Accepts either { key: value } record OR [{ key, value, category }] array
router.put('/', requireRole('ADMIN', 'SUPER_ADMIN'), async (req, res) => {
  let items = []

  if (Array.isArray(req.body)) {
    const schema = z.array(z.object({ key: z.string(), value: z.string(), category: z.string().optional() }))
    items = schema.parse(req.body)
  } else {
    const schema = z.record(z.string(), z.string())
    const updates = schema.parse(req.body)
    items = Object.entries(updates).map(([key, value]) => ({ key, value }))
  }

  const results = await Promise.all(
    items.map(({ key, value, category }) =>
      prisma.businessSetting.upsert({
        where: { key },
        create: { key, value, ...(category ? { category } : {}) },
        update: { value, ...(category ? { category } : {}) },
      })
    )
  )

  await audit({ userId: req.adminUser.id, action: 'UPDATE_SETTINGS', entity: 'BusinessSetting', newValue: items, req })
  res.json(results)
})

// GET /api/admin/settings/pricing-rules
router.get('/pricing-rules', async (req, res) => {
  const rules = await prisma.pricingRule.findMany({ orderBy: { key: 'asc' } })
  res.json(rules)
})

// PUT /api/admin/settings/pricing-rules
router.put('/pricing-rules', requireRole('ADMIN', 'SUPER_ADMIN'), async (req, res) => {
  const schema = z.array(z.object({
    key: z.string(),
    value: z.number(),
    name: z.string().optional(),
    description: z.string().optional(),
  }))
  const rules = schema.parse(req.body)

  const updated = await Promise.all(
    rules.map((r) =>
      prisma.pricingRule.upsert({
        where: { key: r.key },
        create: { key: r.key, value: r.value, name: r.name ?? r.key, description: r.description },
        update: { value: r.value },
      })
    )
  )

  await audit({ userId: req.adminUser.id, action: 'UPDATE_PRICING_RULES', entity: 'PricingRule', newValue: rules, req })
  res.json(updated)
})

module.exports = router
