const express = require('express')
const prisma = require('../../lib/prisma')

const router = express.Router()

router.get('/', async (req, res) => {
  const where = { isActive: true }
  if (req.query.nav === 'true') where.showInNav = true

  const categories = await prisma.category.findMany({
    where,
    orderBy: [{ sortOrder: 'asc' }, { name: 'asc' }],
    select: { id: true, name: true, slug: true, imageUrl: true, parentId: true, showInNav: true, sortOrder: true },
  })
  res.json(categories)
})

router.get('/:slug', async (req, res) => {
  const category = await prisma.category.findFirst({
    where: { slug: req.params.slug, isActive: true },
    include: { children: { where: { isActive: true } } },
  })
  if (!category) return res.status(404).json({ error: 'Category not found' })
  res.json(category)
})

module.exports = router
