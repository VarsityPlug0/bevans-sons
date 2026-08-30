/**
 * Cart is managed client-side (Zustand).
 * This endpoint validates cart items against real product data
 * and returns authoritative prices — the frontend MUST use these,
 * never its own cached values.
 */

const express = require('express')
const { z } = require('zod')
const Decimal = require('decimal.js')
const prisma = require('../../lib/prisma')

const router = express.Router()

// POST /api/cart/validate
// Validates cart items and returns authoritative prices from the database
router.post('/validate', async (req, res) => {
  const schema = z.array(z.object({ variantId: z.string(), quantity: z.number().int().positive() }))
  const items = schema.parse(req.body)

  const validatedItems = await Promise.all(
    items.map(async ({ variantId, quantity }) => {
      const variant = await prisma.productVariant.findUnique({
        where: { id: variantId, isActive: true },
        include: {
          product: { select: { id: true, name: true, slug: true, status: true, sellingPrice: true, images: true } },
          inventory: { select: { available: true } },
        },
      })

      if (!variant || variant.product.status !== 'PUBLISHED') {
        return { variantId, available: false, reason: 'Product no longer available' }
      }

      const available = variant.inventory?.available ?? 0
      const price = parseFloat(variant.priceOverride ?? variant.product.sellingPrice)

      return {
        variantId,
        productId: variant.product.id,
        productName: variant.product.name,
        slug: variant.product.slug,
        size: variant.size,
        color: variant.color,
        sku: variant.sku,
        imageUrl: variant.imageUrl ?? (variant.product.images?.[0] ?? null),
        unitPrice: price,
        quantity: Math.min(quantity, available),
        requestedQuantity: quantity,
        availableStock: available,
        available: available >= quantity,
        stockLimited: available < quantity,
        lineTotal: new Decimal(price).mul(Math.min(quantity, available)).toDecimalPlaces(2).toNumber(),
      }
    })
  )

  const subtotal = validatedItems
    .filter((i) => i.available !== false)
    .reduce((sum, i) => sum + (i.lineTotal || 0), 0)

  res.json({ items: validatedItems, subtotal: new Decimal(subtotal).toDecimalPlaces(2).toNumber() })
})

module.exports = router
