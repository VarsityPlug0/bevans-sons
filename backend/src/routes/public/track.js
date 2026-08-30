const express = require('express')
const prisma = require('../../lib/prisma')
const router = express.Router()

// GET /api/track/:orderNumber — public order status (no auth)
router.get('/:orderNumber', async (req, res) => {
  const order = await prisma.order.findUnique({
    where: { orderNumber: req.params.orderNumber },
    select: {
      orderNumber: true,
      status: true,
      createdAt: true,
      updatedAt: true,
      total: true,
      shippingFee: true,
      items: {
        select: { productName: true, size: true, color: true, quantity: true },
      },
    },
  })
  if (!order) return res.status(404).json({ error: 'Order not found' })
  res.json({ data: order })
})

module.exports = router
