const express = require('express')
const { z } = require('zod')
const slugify = require('slugify')
const prisma = require('../../lib/prisma')
const { requireAdmin, requireRole } = require('../../middleware/adminAuth')

const router = express.Router()
router.use(requireAdmin)

const categorySchema = z.object({
  name: z.string().min(1),
  description: z.string().optional(),
  imageUrl: z.string().optional(),
  parentId: z.string().optional(),
  isActive: z.boolean().default(true),
  showInNav: z.boolean().default(false),
  sortOrder: z.number().int().default(0),
})

async function uniqueSlug(name, excludeId) {
  const base = slugify(name, { lower: true, strict: true })
  let candidate = base
  let i = 1
  while (true) {
    const exists = await prisma.category.findFirst({ where: { slug: candidate, ...(excludeId ? { NOT: { id: excludeId } } : {}) } })
    if (!exists) return candidate
    candidate = `${base}-${i++}`
  }
}

// GET /api/admin/categories
router.get('/', async (req, res) => {
  const categories = await prisma.category.findMany({
    orderBy: [{ sortOrder: 'asc' }, { name: 'asc' }],
    include: {
      _count: { select: { products: true } },
      parent: { select: { name: true } },
    },
  })
  res.json(categories)
})

// POST /api/admin/categories
router.post('/', requireRole('ADMIN', 'MANAGER', 'SUPER_ADMIN'), async (req, res) => {
  const data = categorySchema.parse(req.body)
  const slug = await uniqueSlug(data.name)

  const category = await prisma.category.create({
    data: { ...data, slug },
  })
  res.status(201).json(category)
})

// PUT /api/admin/categories/:id
router.put('/:id', requireRole('ADMIN', 'MANAGER', 'SUPER_ADMIN'), async (req, res) => {
  const data = categorySchema.partial().parse(req.body)

  let slug
  if (data.name) slug = await uniqueSlug(data.name, req.params.id)

  const category = await prisma.category.update({
    where: { id: req.params.id },
    data: { ...data, ...(slug ? { slug } : {}) },
  })
  res.json(category)
})

// DELETE /api/admin/categories/:id
router.delete('/:id', requireRole('ADMIN', 'SUPER_ADMIN'), async (req, res) => {
  const productCount = await prisma.product.count({ where: { categoryId: req.params.id } })
  if (productCount > 0) {
    return res.status(400).json({ error: `Cannot delete — ${productCount} product(s) use this category` })
  }
  await prisma.category.delete({ where: { id: req.params.id } })
  res.json({ message: 'Deleted' })
})

module.exports = router
