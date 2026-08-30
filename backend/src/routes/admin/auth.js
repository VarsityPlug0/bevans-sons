const express = require('express')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { z } = require('zod')
const prisma = require('../../lib/prisma')
const config = require('../../config')
const { requireAdmin, requireRole } = require('../../middleware/adminAuth')
const { authLimiter } = require('../../middleware/rateLimiter')
const { audit } = require('../../services/auditService')

const router = express.Router()

// POST /api/admin/auth/login
router.post('/login', authLimiter, async (req, res) => {
  const schema = z.object({ email: z.string().email(), password: z.string().min(1) })
  const data = schema.parse(req.body)

  const user = await prisma.user.findUnique({ where: { email: data.email } })
  if (!user || !user.isActive) return res.status(401).json({ error: 'Invalid credentials' })

  const valid = await bcrypt.compare(data.password, user.password)
  if (!valid) return res.status(401).json({ error: 'Invalid credentials' })

  await prisma.user.update({ where: { id: user.id }, data: { lastLoginAt: new Date() } })

  const token = jwt.sign(
    { id: user.id, email: user.email, role: user.role, type: 'admin' },
    config.jwt.adminSecret,
    { expiresIn: config.jwt.adminExpiresIn }
  )

  await audit({ userId: user.id, action: 'LOGIN', entity: 'User', entityId: user.id, req })

  const { password: _, ...safeUser } = user
  res.json({ user: safeUser, token })
})

// GET /api/admin/auth/me
router.get('/me', requireAdmin, async (req, res) => {
  const user = await prisma.user.findUnique({
    where: { id: req.adminUser.id },
    select: { id: true, email: true, firstName: true, lastName: true, role: true, lastLoginAt: true },
  })
  res.json(user)
})

// POST /api/admin/auth/users — create admin user (SUPER_ADMIN only)
router.post('/users', requireAdmin, requireRole('SUPER_ADMIN'), async (req, res) => {
  const schema = z.object({
    email: z.string().email(),
    password: z.string().min(8),
    firstName: z.string().min(1),
    lastName: z.string().min(1),
    role: z.enum(['ADMIN', 'MANAGER', 'STAFF']),
  })
  const data = schema.parse(req.body)

  const exists = await prisma.user.findUnique({ where: { email: data.email } })
  if (exists) return res.status(409).json({ error: 'User already exists' })

  const hashed = await bcrypt.hash(data.password, 12)
  const user = await prisma.user.create({
    data: { ...data, password: hashed },
    select: { id: true, email: true, firstName: true, lastName: true, role: true, createdAt: true },
  })

  await audit({ userId: req.adminUser.id, action: 'CREATE_USER', entity: 'User', entityId: user.id, newValue: { email: user.email, role: user.role }, req })
  res.status(201).json(user)
})

// GET /api/admin/auth/users
router.get('/users', requireAdmin, requireRole('SUPER_ADMIN', 'ADMIN'), async (req, res) => {
  const users = await prisma.user.findMany({
    select: { id: true, email: true, firstName: true, lastName: true, role: true, isActive: true, lastLoginAt: true },
    orderBy: { createdAt: 'asc' },
  })
  res.json(users)
})

module.exports = router
