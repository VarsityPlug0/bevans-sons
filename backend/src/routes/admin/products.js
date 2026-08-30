const express = require('express')
const slugify = require('slugify')
const { customAlphabet } = require('nanoid')
const { z } = require('zod')

const nanoid6 = customAlphabet('ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789', 6)

function generateSku(productName, size, color) {
  const prefix = productName.replace(/[^a-zA-Z0-9]/g, '').toUpperCase().slice(0, 4)
  const parts = [prefix]
  if (size) parts.push(size.toString().replace(/\s/g, '').toUpperCase())
  if (color) parts.push(color.replace(/[^a-zA-Z0-9]/g, '').toUpperCase().slice(0, 3))
  parts.push(nanoid6())
  return parts.join('-')
}
const prisma = require('../../lib/prisma')
const { requireAdmin, requireRole } = require('../../middleware/adminAuth')
const { calcRecommendedPrices, calcMetricsAtPrice, validateProductPricing, recalcAndSaveProduct, evalMarketViability } = require('../../services/pricingEngine')
const { audit } = require('../../services/auditService')
const { createAlert } = require('../../services/alertService')

const router = express.Router()
router.use(requireAdmin)

const productSchema = z.object({
  name: z.string().min(1),
  description: z.string().optional(),
  categoryId: z.string(),
  brandId: z.string().optional(),
  sku: z.string().optional(),
  supplierCost: z.number().positive(),
  inboundShipping: z.number().min(0).default(0),
  fulfillmentCost: z.number().min(0).default(0),
  packagingCost: z.number().min(0).default(0),
  paymentFeePercent: z.number().min(0).max(1).default(0.029),
  otherDirectCosts: z.number().min(0).default(0),
  sellingPrice: z.number().positive(),
  lowStockThreshold: z.number().int().min(0).default(5),
  images: z.array(z.string()).default([]),
  tags: z.array(z.string()).default([]),
  variants: z.array(z.object({
    sku: z.string().optional(),
    size: z.string().optional(),
    color: z.string().optional(),
    colorHex: z.string().optional(),
    priceOverride: z.number().positive().optional(),
    costOverride: z.number().positive().optional(),
    initialStock: z.number().int().min(0).default(0),
  })).default([]),
})

// GET /api/admin/products
router.get('/', async (req, res) => {
  const { status, category, search, page = '1', pageSize = '20' } = req.query
  const p = parseInt(page)
  const ps = Math.min(parseInt(pageSize), 100)

  const where = {
    ...(status && { status }),
    ...(category && { category: { slug: category } }),
    ...(search && {
      OR: [
        { name: { contains: search, mode: 'insensitive' } },
        { sku: { contains: search, mode: 'insensitive' } },
      ],
    }),
  }

  const [products, total] = await Promise.all([
    prisma.product.findMany({
      where,
      skip: (p - 1) * ps,
      take: ps,
      include: {
        category: { select: { name: true, slug: true } },
        brand: { select: { name: true } },
        variants: { include: { inventory: true } },
        supplierProducts: { where: { isPrimary: true }, include: { supplier: { select: { name: true } } } },
      },
      orderBy: { createdAt: 'desc' },
    }),
    prisma.product.count({ where }),
  ])

  res.json({ data: products, pagination: { page: p, pageSize: ps, total, totalPages: Math.ceil(total / ps) } })
})

// GET /api/admin/products/:id
router.get('/:id', async (req, res) => {
  const product = await prisma.product.findUniqueOrThrow({
    where: { id: req.params.id },
    include: {
      category: true,
      brand: true,
      variants: { include: { inventory: true } },
      supplierProducts: { include: { supplier: true } },
      marketPrices: { orderBy: { checkedAt: 'desc' }, take: 5 },
    },
  })
  res.json(product)
})

// POST /api/admin/products — create product (starts as DRAFT)
router.post('/', requireRole('ADMIN', 'MANAGER', 'SUPER_ADMIN'), async (req, res) => {
  const data = productSchema.parse(req.body)

  // Calculate pricing metrics server-side
  const metrics = calcMetricsAtPrice(data)

  const slug = await uniqueSlug(data.name)

  const product = await prisma.$transaction(async (tx) => {
    const created = await tx.product.create({
      data: {
        name: data.name,
        slug,
        description: data.description,
        categoryId: data.categoryId,
        brandId: data.brandId,
        sku: data.sku,
        status: 'DRAFT',
        supplierCost: data.supplierCost,
        inboundShipping: data.inboundShipping,
        fulfillmentCost: data.fulfillmentCost,
        packagingCost: data.packagingCost,
        paymentFeePercent: data.paymentFeePercent,
        otherDirectCosts: data.otherDirectCosts,
        totalDirectCost: metrics.totalDirectCost,
        sellingPrice: data.sellingPrice,
        recommendedPrice: 0, // set below
        minimumPrice: 0,
        expectedContribution: metrics.expectedContribution,
        contributionMargin: metrics.contributionMargin,
        markup: metrics.markup,
        profitMargin: metrics.profitMargin,
        lowStockThreshold: data.lowStockThreshold,
        images: data.images,
        tags: data.tags,
        variants: {
          create: data.variants.map((v) => ({
            sku: v.sku || generateSku(data.name, v.size, v.color),
            size: v.size,
            color: v.color,
            colorHex: v.colorHex,
            priceOverride: v.priceOverride,
            costOverride: v.costOverride,
          })),
        },
      },
      include: { variants: true },
    })

    // Initialize inventory for each variant
    for (const variant of created.variants) {
      const initialStock = data.variants.find((v) => v.sku === variant.sku)?.initialStock ?? 0
      await tx.inventory.create({ data: { variantId: variant.id, available: initialStock } })

      if (initialStock > 0) {
        await tx.inventoryMovement.create({
          data: {
            variantId: variant.id,
            productId: created.id,
            type: 'PURCHASE',
            quantity: initialStock,
            reason: 'Initial stock',
          },
        })
      }
    }

    return created
  })

  // Now calculate and save recommended/minimum prices
  const recommended = await calcRecommendedPrices(data)
  await prisma.product.update({
    where: { id: product.id },
    data: {
      recommendedPrice: recommended.recommendedPrice,
      minimumPrice: recommended.minimumPrice,
    },
  })

  await audit({ userId: req.adminUser.id, action: 'CREATE_PRODUCT', entity: 'Product', entityId: product.id, newValue: { name: data.name, status: 'DRAFT' }, req })

  res.status(201).json(await prisma.product.findUnique({ where: { id: product.id }, include: { variants: { include: { inventory: true } } } }))
})

// PUT /api/admin/products/:id
router.put('/:id', requireRole('ADMIN', 'MANAGER', 'SUPER_ADMIN'), async (req, res) => {
  const previous = await prisma.product.findUniqueOrThrow({ where: { id: req.params.id } })
  const data = productSchema.partial().parse(req.body)

  const updateData = { ...data }
  delete updateData.variants

  // Recalculate metrics if pricing inputs changed
  const pricingFields = ['supplierCost', 'inboundShipping', 'fulfillmentCost', 'packagingCost', 'paymentFeePercent', 'otherDirectCosts', 'sellingPrice']
  const pricingChanged = pricingFields.some((f) => data[f] !== undefined)

  if (pricingChanged) {
    const merged = { ...previous, ...data }
    const metrics = calcMetricsAtPrice(merged)
    const recommended = await calcRecommendedPrices(merged)
    Object.assign(updateData, metrics, { recommendedPrice: recommended.recommendedPrice, minimumPrice: recommended.minimumPrice })
  }

  const product = await prisma.product.update({ where: { id: req.params.id }, data: updateData })

  await audit({
    userId: req.adminUser.id,
    action: 'UPDATE_PRODUCT',
    entity: 'Product',
    entityId: req.params.id,
    previousValue: { sellingPrice: previous.sellingPrice, status: previous.status },
    newValue: { sellingPrice: product.sellingPrice, status: product.status },
    req,
  })

  res.json(product)
})

// POST /api/admin/products/:id/pricing-preview — preview pricing metrics without saving
router.post('/:id/pricing-preview', async (req, res) => {
  const schema = z.object({
    supplierCost: z.number().positive(),
    inboundShipping: z.number().min(0).default(0),
    fulfillmentCost: z.number().min(0).default(0),
    packagingCost: z.number().min(0).default(0),
    paymentFeePercent: z.number().min(0).max(1).default(0.029),
    otherDirectCosts: z.number().min(0).default(0),
    sellingPrice: z.number().positive(),
  })
  const data = schema.parse(req.body)
  const metrics = calcMetricsAtPrice(data)
  const recommended = await calcRecommendedPrices(data)
  const validation = await validateProductPricing(data)

  res.json({ ...metrics, recommended, validation })
})

// POST /api/admin/products/:id/advance-status — move through approval workflow
router.post('/:id/advance-status', requireRole('ADMIN', 'MANAGER', 'SUPER_ADMIN'), async (req, res) => {
  const product = await prisma.product.findUniqueOrThrow({ where: { id: req.params.id } })

  const statusFlow = {
    DRAFT: 'PRICING_REVIEW',
    PRICING_REVIEW: 'MARKET_REVIEW',
    MARKET_REVIEW: 'APPROVED',
    APPROVED: 'PUBLISHED',
  }

  const next = statusFlow[product.status]
  if (!next) return res.status(400).json({ error: `Cannot advance product from status: ${product.status}` })

  // Validate pricing before MARKET_REVIEW
  if (next === 'MARKET_REVIEW') {
    const validation = await validateProductPricing(product)
    if (!validation.valid) return res.status(400).json({ error: 'Product does not meet pricing requirements', details: validation.errors })
  }

  const updateData = { status: next }
  if (next === 'APPROVED') {
    updateData.approvedById = req.adminUser.id
    updateData.approvedAt = new Date()
  }
  if (next === 'PUBLISHED') {
    updateData.publishedAt = new Date()
  }

  const updated = await prisma.product.update({ where: { id: req.params.id }, data: updateData })

  await audit({
    userId: req.adminUser.id,
    action: 'ADVANCE_PRODUCT_STATUS',
    entity: 'Product',
    entityId: req.params.id,
    previousValue: { status: product.status },
    newValue: { status: next },
    req,
  })

  res.json(updated)
})

// POST /api/admin/products/:id/reject
router.post('/:id/reject', requireRole('ADMIN', 'SUPER_ADMIN'), async (req, res) => {
  const schema = z.object({ reason: z.string().min(5) })
  const { reason } = schema.parse(req.body)

  const updated = await prisma.product.update({
    where: { id: req.params.id },
    data: { status: 'REJECTED', rejectedAt: new Date(), rejectionReason: reason },
  })

  await audit({ userId: req.adminUser.id, action: 'REJECT_PRODUCT', entity: 'Product', entityId: req.params.id, newValue: { reason }, req })
  res.json(updated)
})

// POST /api/admin/products/:id/market-price — record a market price check
router.post('/:id/market-price', async (req, res) => {
  const schema = z.object({
    marketLow: z.number().positive(),
    marketAverage: z.number().positive(),
    marketHigh: z.number().positive(),
    source: z.string().min(1),
    notes: z.string().optional(),
  })
  const data = schema.parse(req.body)
  const product = await prisma.product.findUniqueOrThrow({ where: { id: req.params.id } })

  const myPrice = parseFloat(product.sellingPrice)
  const priceDiff = myPrice - data.marketAverage
  const priceDiffPct = data.marketAverage > 0 ? (priceDiff / data.marketAverage) : 0
  const viability = await evalMarketViability({ myPrice, marketAverage: data.marketAverage, ...product })

  const marketPrice = await prisma.marketPrice.create({
    data: {
      productId: req.params.id,
      marketLow: data.marketLow,
      marketAverage: data.marketAverage,
      marketHigh: data.marketHigh,
      myPrice,
      priceDiff,
      priceDiffPct,
      source: data.source,
      viability,
      notes: data.notes,
    },
  })

  await prisma.product.update({ where: { id: req.params.id }, data: { marketPrice: data.marketAverage, marketViability: viability } })

  res.json(marketPrice)
})

// POST /api/admin/products/:id/variants — add variant
router.post('/:id/variants', requireRole('ADMIN', 'MANAGER', 'SUPER_ADMIN'), async (req, res) => {
  const schema = z.object({
    sku: z.string().optional(),
    size: z.string().optional(),
    color: z.string().optional(),
    colorHex: z.string().optional(),
    priceOverride: z.number().positive().optional(),
    costOverride: z.number().positive().optional(),
    initialStock: z.number().int().min(0).default(0),
  })
  const data = schema.parse(req.body)

  const product = await prisma.product.findUnique({ where: { id: req.params.id }, select: { name: true } })
  const variant = await prisma.$transaction(async (tx) => {
    const created = await tx.productVariant.create({
      data: { productId: req.params.id, sku: data.sku || generateSku(product?.name ?? 'PROD', data.size, data.color), size: data.size, color: data.color, colorHex: data.colorHex, priceOverride: data.priceOverride, costOverride: data.costOverride },
    })
    await tx.inventory.create({ data: { variantId: created.id, available: data.initialStock } })
    if (data.initialStock > 0) {
      await tx.inventoryMovement.create({
        data: { variantId: created.id, productId: req.params.id, type: 'PURCHASE', quantity: data.initialStock, reason: 'Initial stock' },
      })
    }
    return created
  })

  res.status(201).json(variant)
})

async function uniqueSlug(name, attempt = 0) {
  const base = slugify(name, { lower: true, strict: true })
  const candidate = attempt === 0 ? base : `${base}-${attempt}`
  const exists = await prisma.product.findUnique({ where: { slug: candidate } })
  return exists ? uniqueSlug(name, attempt + 1) : candidate
}

module.exports = router
