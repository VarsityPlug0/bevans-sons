const express = require('express')
const { z } = require('zod')
const prisma = require('../../lib/prisma')
const { requireCustomer } = require('../../middleware/auth')
const { createOrder, confirmPayment } = require('../../services/orderService')
const { buildPaymentData, verifyITN } = require('../../services/payfastService')

const router = express.Router()

const checkoutSchema = z.object({
  addressId: z.string(),
  items: z.array(z.object({ variantId: z.string(), quantity: z.number().int().positive() })).min(1),
  discountCode: z.string().optional(),
  campaignId: z.string().optional(),
})

// POST /api/checkout — create order and return PayFast payment data
router.post('/', requireCustomer, async (req, res) => {
  const data = checkoutSchema.parse(req.body)

  const address = await prisma.customerAddress.findFirst({
    where: { id: data.addressId, customerId: req.customer.id },
  })
  if (!address) return res.status(400).json({ error: 'Invalid address' })

  const order = await createOrder({
    customerId: req.customer.id,
    addressId: data.addressId,
    items: data.items,
    campaignId: data.campaignId ?? null,
  })

  const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:3000'
  const backendUrl = process.env.BACKEND_URL || 'http://localhost:3001'

  const paymentData = buildPaymentData({
    order,
    customer: req.customer,
    returnUrl: `${frontendUrl}/checkout/success?orderNumber=${order.orderNumber}`,
    cancelUrl: `${frontendUrl}/checkout/cancelled?orderNumber=${order.orderNumber}`,
    notifyUrl: `${backendUrl}/api/checkout/payfast-notify`,
  })

  res.status(201).json({
    orderId: order.id,
    orderNumber: order.orderNumber,
    totalAmount: parseFloat(order.totalAmount),
    payfast: paymentData,
  })
})

// POST /api/checkout/payfast-notify — PayFast ITN webhook
// PayFast posts form data here after payment. Must respond with 200 fast.
router.post('/payfast-notify', express.urlencoded({ extended: false }), async (req, res) => {
  res.sendStatus(200)

  const body = req.body
  const { valid, reason } = await verifyITN(body)

  if (!valid) {
    console.error('[PayFast ITN] Invalid notification:', reason)
    return
  }

  const { payment_status, m_payment_id, amount_gross, pf_payment_id } = body

  if (payment_status !== 'COMPLETE') {
    console.warn('[PayFast ITN] Non-complete status:', payment_status)
    return
  }

  try {
    const order = await prisma.order.findUnique({ where: { id: m_payment_id } })
    if (!order) { console.error('[PayFast ITN] Order not found:', m_payment_id); return }

    const paidAmount = parseFloat(amount_gross)
    const orderAmount = parseFloat(order.totalAmount)
    if (Math.abs(paidAmount - orderAmount) > 0.01) {
      console.error('[PayFast ITN] Amount mismatch:', { paid: paidAmount, expected: orderAmount })
      return
    }

    await confirmPayment({
      orderId: order.id,
      paymentMethod: 'payfast',
      paymentReference: pf_payment_id,
      amount: paidAmount,
    })

    console.log('[PayFast ITN] Confirmed:', order.orderNumber)
  } catch (err) {
    console.error('[PayFast ITN] Error:', err.message)
  }
})

// GET /api/checkout/shipping-options
router.get('/shipping-options', async (req, res) => {
  res.json([
    { id: 'standard', name: 'Standard Delivery (3-5 days)', price: 99 },
    { id: 'express', name: 'Express Delivery (1-2 days)', price: 199 },
  ])
})

module.exports = router
