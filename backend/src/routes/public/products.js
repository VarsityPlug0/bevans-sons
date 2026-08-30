const express = require('express')
const prisma = require('../../lib/prisma')

const router = express.Router()

const publicProductSelect = {
  id: true,
  name: true,
  slug: true,
  description: true,
  sellingPrice: true,
  images: true,
  tags: true,
  category: { select: { id: true, name: true, slug: true } },
  brand: { select: { id: true, name: true } },
  variants: {
    where: { isActive: true },
    select: {
      id: true,
      sku: true,
      size: true,
      color: true,
      colorHex: true,
      imageUrl: true,
      priceOverride: true,
      inventory: { select: { available: true } },
    },
  },
}

// GET /api/products — public product listing
router.get('/', async (req, res) => {
  const { category, brand, search, sort = 'name', page = '1', pageSize = '24', minPrice, maxPrice } = req.query
  const p = parseInt(page)
  const ps = Math.min(parseInt(pageSize), 100)
  const skip = (p - 1) * ps

  const where = {
    status: 'PUBLISHED',
    isActive: true,
    ...(category && { category: { slug: category } }),
    ...(brand && { brand: { slug: brand } }),
    ...(search && {
      OR: [
        { name: { contains: search, mode: 'insensitive' } },
        { description: { contains: search, mode: 'insensitive' } },
        { tags: { has: search } },
      ],
    }),
    ...(minPrice && { sellingPrice: { gte: parseFloat(minPrice) } }),
    ...(maxPrice && { sellingPrice: { lte: parseFloat(maxPrice) } }),
  }

  const sortMap = {
    name: { name: 'asc' },
    price_asc: { sellingPrice: 'asc' },
    price_desc: { sellingPrice: 'desc' },
    newest: { publishedAt: 'desc' },
  }

  const [products, total] = await Promise.all([
    prisma.product.findMany({ where, skip, take: ps, select: publicProductSelect, orderBy: sortMap[sort] || { name: 'asc' } }),
    prisma.product.count({ where }),
  ])

  res.json({ data: products, pagination: { page: p, pageSize: ps, total, totalPages: Math.ceil(total / ps) } })
})

// GET /api/products/:slug
router.get('/:slug', async (req, res) => {
  const product = await prisma.product.findFirst({
    where: { slug: req.params.slug, status: 'PUBLISHED', isActive: true },
    select: publicProductSelect,
  })
  if (!product) return res.status(404).json({ error: 'Product not found' })
  res.json(product)
})

module.exports = router
