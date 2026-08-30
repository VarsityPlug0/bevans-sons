const express = require('express')
const prisma = require('../../lib/prisma')
const { requireAdmin } = require('../../middleware/adminAuth')
const { resolveAlert, runAllAlertChecks } = require('../../services/alertService')

const router = express.Router()
router.use(requireAdmin)

router.get('/', async (req, res) => {
  const { severity, isResolved = 'false', type } = req.query
  const alerts = await prisma.alert.findMany({
    where: {
      isResolved: isResolved === 'true',
      ...(severity && { severity }),
      ...(type && { type }),
    },
    orderBy: [{ severity: 'desc' }, { createdAt: 'desc' }],
    take: 100,
  })
  res.json(alerts)
})

router.post('/:id/resolve', async (req, res) => {
  const alert = await resolveAlert(req.params.id)
  res.json(alert)
})

router.post('/:id/read', async (req, res) => {
  const alert = await prisma.alert.update({ where: { id: req.params.id }, data: { isRead: true } })
  res.json(alert)
})

// POST /api/admin/alerts/run-checks — manually trigger alert checks
router.post('/run-checks', async (req, res) => {
  await runAllAlertChecks()
  res.json({ message: 'Alert checks completed' })
})

module.exports = router
