const express = require('express')
const prisma = require('../../lib/prisma')
const { requireAdmin, requireRole } = require('../../middleware/adminAuth')

const router = express.Router()
router.use(requireAdmin)
router.use(requireRole('ADMIN', 'SUPER_ADMIN'))

router.get('/', async (req, res) => {
  const { entity, userId, action, page = '1', pageSize = '50' } = req.query
  const p = parseInt(page)
  const ps = Math.min(parseInt(pageSize), 200)

  const where = {
    ...(entity && { entity }),
    ...(userId && { userId }),
    ...(action && { action: { contains: action, mode: 'insensitive' } }),
  }

  const [logs, total] = await Promise.all([
    prisma.auditLog.findMany({
      where,
      skip: (p - 1) * ps,
      take: ps,
      orderBy: { createdAt: 'desc' },
      include: { user: { select: { firstName: true, lastName: true, email: true } } },
    }),
    prisma.auditLog.count({ where }),
  ])

  res.json({ data: logs, pagination: { page: p, pageSize: ps, total, totalPages: Math.ceil(total / ps) } })
})

module.exports = router
