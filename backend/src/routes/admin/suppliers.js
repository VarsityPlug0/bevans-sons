const express = require('express')
const { z } = require('zod')
const prisma = require('../../lib/prisma')
const { requireAdmin, requireRole } = require('../../middleware/adminAuth')
const { audit } = require('../../services/auditService')

const router = express.Router()
router.use(requireAdmin)

const supplierSchema = z.object({
  name: z.string().min(1),
  contactPerson: z.string().optional(),
  email: z.string().email().optional(),
  phone: z.string().optional(),
  address: z.string().optional(),
  website: z.string().url().optional(),
  paymentTerms: z.string().optional(),
  leadTimeDays: z.number().int().positive().optional(),
  defaultShippingCost: z.number().min(0).optional(),
  reliability: z.number().int().min(1).max(5).optional(),
  notes: z.string().optional(),
})

// GET /api/admin/suppliers
router.get('/', async (req, res) => {
  const suppliers = await prisma.supplier.findMany({
    where: { isActive: true },
    include: {
      supplierProducts: {
        include: { product: { select: { id: true, name: true, status: true } } },
      },
    },
    orderBy: { name: 'asc' },
  })
  res.json(suppliers)
})

// GET /api/admin/suppliers/:id
router.get('/:id', async (req, res) => {
  const supplier = await prisma.supplier.findUniqueOrThrow({
    where: { id: req.params.id },
    include: {
      supplierProducts: { include: { product: { select: { id: true, name: true, status: true, sellingPrice: true } } } },
    },
  })
  res.json(supplier)
})

// POST /api/admin/suppliers
router.post('/', requireRole('ADMIN', 'MANAGER', 'SUPER_ADMIN'), async (req, res) => {
  const data = supplierSchema.parse(req.body)
  const supplier = await prisma.supplier.create({ data })
  await audit({ userId: req.adminUser.id, action: 'CREATE_SUPPLIER', entity: 'Supplier', entityId: supplier.id, newValue: { name: data.name }, req })
  res.status(201).json(supplier)
})

// PUT /api/admin/suppliers/:id
router.put('/:id', requireRole('ADMIN', 'MANAGER', 'SUPER_ADMIN'), async (req, res) => {
  const data = supplierSchema.partial().parse(req.body)
  const prev = await prisma.supplier.findUniqueOrThrow({ where: { id: req.params.id } })
  const supplier = await prisma.supplier.update({ where: { id: req.params.id }, data })
  await audit({ userId: req.adminUser.id, action: 'UPDATE_SUPPLIER', entity: 'Supplier', entityId: req.params.id, previousValue: prev, newValue: data, req })
  res.json(supplier)
})

// POST /api/admin/suppliers/:id/link-product — link a product to this supplier
router.post('/:id/link-product', requireRole('ADMIN', 'MANAGER', 'SUPER_ADMIN'), async (req, res) => {
  const schema = z.object({
    productId: z.string(),
    supplierSku: z.string().optional(),
    costPrice: z.number().positive(),
    shippingCost: z.number().min(0).default(0),
    leadTimeDays: z.number().int().positive().optional(),
    minimumOrder: z.number().int().positive().optional(),
    isPrimary: z.boolean().default(false),
  })
  const data = schema.parse(req.body)

  if (data.isPrimary) {
    await prisma.supplierProduct.updateMany({
      where: { productId: data.productId },
      data: { isPrimary: false },
    })
  }

  const link = await prisma.supplierProduct.upsert({
    where: { supplierId_productId: { supplierId: req.params.id, productId: data.productId } },
    create: { supplierId: req.params.id, ...data },
    update: { ...data },
  })

  res.json(link)
})

// POST /api/admin/suppliers/:id/record-payment
router.post('/:id/record-payment', requireRole('ADMIN', 'MANAGER', 'SUPER_ADMIN'), async (req, res) => {
  const schema = z.object({ amount: z.number().positive(), description: z.string().optional() })
  const data = schema.parse(req.body)

  await prisma.supplier.update({
    where: { id: req.params.id },
    data: {
      totalPurchased: { increment: data.amount },
      totalOutstanding: { decrement: data.amount },
    },
  })

  await audit({ userId: req.adminUser.id, action: 'SUPPLIER_PAYMENT', entity: 'Supplier', entityId: req.params.id, newValue: data, req })
  res.json({ message: 'Payment recorded' })
})

module.exports = router
