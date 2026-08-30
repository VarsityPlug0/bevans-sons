const express = require('express')
const prisma = require('../../lib/prisma')
const { requireAdmin } = require('../../middleware/adminAuth')

const router = express.Router()
router.use(requireAdmin)

// GET /api/admin/enquiries
router.get('/', async (req, res) => {
  const { page = '1', pageSize = '30' } = req.query
  const p = parseInt(page)
  const ps = Math.min(parseInt(pageSize), 100)

  const settings = await prisma.businessSetting.findMany({
    where: { category: 'enquiry' },
    orderBy: { updatedAt: 'desc' },
    skip: (p - 1) * ps,
    take: ps,
  })

  const total = await prisma.businessSetting.count({ where: { category: 'enquiry' } })

  const enquiries = settings.map(s => {
    try { return { id: s.key, ...JSON.parse(s.value), receivedAt: s.updatedAt } } catch { return null }
  }).filter(Boolean)

  res.json({ data: enquiries, pagination: { page: p, pageSize: ps, total, totalPages: Math.ceil(total / ps) } })
})

// DELETE /api/admin/enquiries/:id
router.delete('/:id', async (req, res) => {
  await prisma.businessSetting.deleteMany({ where: { key: req.params.id, category: 'enquiry' } })
  res.json({ message: 'Deleted' })
})

module.exports = router
