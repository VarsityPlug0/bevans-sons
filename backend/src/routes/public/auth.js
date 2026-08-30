const express = require('express')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { z } = require('zod')
const prisma = require('../../lib/prisma')
const config = require('../../config')
const { requireCustomer } = require('../../middleware/auth')
const { authLimiter } = require('../../middleware/rateLimiter')

const router = express.Router()

const registerSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  phone: z.string().optional(),
})

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
})

// POST /api/auth/register
router.post('/register', authLimiter, async (req, res) => {
  const data = registerSchema.parse(req.body)
  const exists = await prisma.customer.findUnique({ where: { email: data.email } })
  if (exists) return res.status(409).json({ error: 'An account with this email already exists' })

  const hashed = await bcrypt.hash(data.password, 12)
  const customer = await prisma.customer.create({
    data: { ...data, password: hashed },
    select: { id: true, email: true, firstName: true, lastName: true, phone: true, createdAt: true },
  })

  const token = jwt.sign({ id: customer.id, email: customer.email }, config.jwt.secret, { expiresIn: config.jwt.expiresIn })
  res.status(201).json({ customer, token })
})

// POST /api/auth/login
router.post('/login', authLimiter, async (req, res) => {
  const data = loginSchema.parse(req.body)
  const customer = await prisma.customer.findUnique({ where: { email: data.email } })
  if (!customer || !customer.isActive) return res.status(401).json({ error: 'Invalid credentials' })

  const valid = await bcrypt.compare(data.password, customer.password)
  if (!valid) return res.status(401).json({ error: 'Invalid credentials' })

  const token = jwt.sign({ id: customer.id, email: customer.email }, config.jwt.secret, { expiresIn: config.jwt.expiresIn })

  const { password: _, ...safeCustomer } = customer
  res.json({ customer: safeCustomer, token })
})

// GET /api/auth/me
router.get('/me', requireCustomer, async (req, res) => {
  const customer = await prisma.customer.findUnique({
    where: { id: req.customer.id },
    select: { id: true, email: true, firstName: true, lastName: true, phone: true, createdAt: true, orderCount: true, totalSpent: true },
  })
  if (!customer) return res.status(404).json({ error: 'Account not found' })
  res.json(customer)
})

// PUT /api/auth/profile
router.put('/profile', requireCustomer, async (req, res) => {
  const schema = z.object({
    firstName: z.string().min(1).optional(),
    lastName: z.string().min(1).optional(),
    phone: z.string().optional(),
  })
  const data = schema.parse(req.body)
  const customer = await prisma.customer.update({
    where: { id: req.customer.id },
    data,
    select: { id: true, email: true, firstName: true, lastName: true, phone: true },
  })
  res.json(customer)
})

// PUT /api/auth/password
router.put('/password', requireCustomer, async (req, res) => {
  const schema = z.object({ currentPassword: z.string(), newPassword: z.string().min(8) })
  const data = schema.parse(req.body)
  const customer = await prisma.customer.findUniqueOrThrow({ where: { id: req.customer.id } })

  const valid = await bcrypt.compare(data.currentPassword, customer.password)
  if (!valid) return res.status(400).json({ error: 'Current password is incorrect' })

  const hashed = await bcrypt.hash(data.newPassword, 12)
  await prisma.customer.update({ where: { id: req.customer.id }, data: { password: hashed } })
  res.json({ message: 'Password updated' })
})

// GET /api/auth/addresses
router.get('/addresses', requireCustomer, async (req, res) => {
  const addresses = await prisma.customerAddress.findMany({
    where: { customerId: req.customer.id },
    orderBy: { isDefault: 'desc' },
  })
  res.json(addresses)
})

// POST /api/auth/addresses
router.post('/addresses', requireCustomer, async (req, res) => {
  const schema = z.object({
    label: z.string().optional(),
    firstName: z.string().min(1),
    lastName: z.string().min(1),
    phone: z.string().min(1),
    line1: z.string().min(1),
    line2: z.string().optional(),
    city: z.string().min(1),
    province: z.string().min(1),
    postalCode: z.string().min(1),
    isDefault: z.boolean().optional(),
  })
  const data = schema.parse(req.body)

  if (data.isDefault) {
    await prisma.customerAddress.updateMany({ where: { customerId: req.customer.id }, data: { isDefault: false } })
  }

  const address = await prisma.customerAddress.create({ data: { ...data, customerId: req.customer.id } })
  res.status(201).json(address)
})

// DELETE /api/auth/addresses/:id
router.delete('/addresses/:id', requireCustomer, async (req, res) => {
  await prisma.customerAddress.deleteMany({ where: { id: req.params.id, customerId: req.customer.id } })
  res.json({ message: 'Address removed' })
})

module.exports = router
