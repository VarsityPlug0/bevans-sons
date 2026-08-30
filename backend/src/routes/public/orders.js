const express = require('express')
const prisma = require('../../lib/prisma')
const { requireCustomer } = require('../../middleware/auth')

const router = express.Router()

// GET /api/orders — customer's order history
router.get('/', requireCustomer, async (req, res) => {
  const { page = '1', pageSize = '10' } = req.query
  const p = parseInt(page)
  const ps = Math.min(parseInt(pageSize), 50)
  const skip = (p - 1) * ps

  const [orders, total] = await Promise.all([
    prisma.order.findMany({
      where: { customerId: req.customer.id },
      skip,
      take: ps,
      orderBy: { createdAt: 'desc' },
      include: {
        items: { select: { productName: true, size: true, color: true, quantity: true, unitPrice: true, lineTotal: true } },
      },
      // Never expose financial data (contribution, costs) to the customer
    }),
    prisma.order.count({ where: { customerId: req.customer.id } }),
  ])

  // Strip internal financial fields
  const safeOrders = orders.map(sanitizeOrderForCustomer)
  res.json({ data: safeOrders, pagination: { page: p, pageSize: ps, total, totalPages: Math.ceil(total / ps) } })
})

// GET /api/orders/:orderNumber
router.get('/:orderNumber', requireCustomer, async (req, res) => {
  const order = await prisma.order.findFirst({
    where: { orderNumber: req.params.orderNumber, customerId: req.customer.id },
    include: {
      items: { select: { productName: true, variantSku: true, size: true, color: true, quantity: true, unitPrice: true, lineTotal: true } },
      address: true,
    },
  })
  if (!order) return res.status(404).json({ error: 'Order not found' })
  res.json(sanitizeOrderForCustomer(order))
})

function sanitizeOrderForCustomer(order) {
  const { contribution, contributionMargin, totalProductCost, totalFulfillmentCost, totalMarketingAlloc, totalOtherCosts, ...safe } = order
  return safe
}

module.exports = router
