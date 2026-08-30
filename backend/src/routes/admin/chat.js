const express = require('express')
const prisma = require('../../lib/prisma')
const { requireAdmin } = require('../../middleware/adminAuth')

const router = express.Router()
router.use(requireAdmin)

async function getBusinessContext() {
  const now = new Date()
  const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate())
  const monthStart = new Date(now.getFullYear(), now.getMonth(), 1)

  const [
    todayOrders,
    monthOrders,
    pendingOrders,
    totalCustomers,
    lowStockVariants,
    outOfStockVariants,
    topProducts,
    recentOrders,
    pendingRefunds,
    openEnquiries,
  ] = await Promise.all([
    // Today's orders + revenue
    prisma.order.aggregate({
      where: { createdAt: { gte: todayStart }, paymentStatus: 'PAID' },
      _count: true,
      _sum: { totalAmount: true },
    }),
    // This month's revenue
    prisma.order.aggregate({
      where: { createdAt: { gte: monthStart }, paymentStatus: 'PAID' },
      _count: true,
      _sum: { totalAmount: true },
    }),
    // Pending orders
    prisma.order.count({ where: { fulfillmentStatus: 'PENDING' } }),
    // Total active customers
    prisma.customer.count({ where: { isActive: true } }),
    // Low stock
    prisma.inventory.count({ where: { available: { gt: 0, lte: 5 } } }),
    // Out of stock
    prisma.inventory.count({ where: { available: 0 } }),
    // Top 5 products by order count
    prisma.orderItem.groupBy({
      by: ['productId'],
      _sum: { quantity: true },
      orderBy: { _sum: { quantity: 'desc' } },
      take: 5,
    }),
    // Recent 5 orders
    prisma.order.findMany({
      take: 5,
      orderBy: { createdAt: 'desc' },
      select: {
        orderNumber: true,
        totalAmount: true,
        paymentStatus: true,
        fulfillmentStatus: true,
        createdAt: true,
        customer: { select: { firstName: true, lastName: true } },
      },
    }),
    // Pending refunds
    prisma.returnRequest.count({ where: { status: 'PENDING' } }),
    // Open enquiries
    prisma.businessSetting.count({ where: { category: 'enquiry' } }),
  ])

  // Resolve product names for top products
  const topProductIds = topProducts.map(p => p.productId)
  const topProductNames = await prisma.product.findMany({
    where: { id: { in: topProductIds } },
    select: { id: true, name: true },
  })
  const nameMap = Object.fromEntries(topProductNames.map(p => [p.id, p.name]))

  return {
    today: {
      orders: todayOrders._count,
      revenue: parseFloat(todayOrders._sum?.totalAmount ?? 0).toFixed(2),
    },
    thisMonth: {
      orders: monthOrders._count,
      revenue: parseFloat(monthOrders._sum?.totalAmount ?? 0).toFixed(2),
    },
    pendingOrders,
    totalCustomers,
    inventory: {
      lowStock: lowStockVariants,
      outOfStock: outOfStockVariants,
    },
    topProducts: topProducts.map(p => ({
      name: nameMap[p.productId] ?? 'Unknown',
      unitsSold: p._sum.quantity,
    })),
    recentOrders: recentOrders.map(o => ({
      orderNumber: o.orderNumber,
      customer: `${o.customer.firstName} ${o.customer.lastName}`,
      amount: `R${parseFloat(o.totalAmount).toFixed(2)}`,
      payment: o.paymentStatus,
      fulfillment: o.fulfillmentStatus,
      date: o.createdAt.toISOString().split('T')[0],
    })),
    pendingRefunds,
    openEnquiries,
    asOf: now.toISOString(),
  }
}

// POST /api/admin/chat
router.post('/', async (req, res) => {
  const { messages } = req.body
  if (!Array.isArray(messages) || messages.length === 0) {
    return res.status(400).json({ error: 'messages array required' })
  }

  const apiKey = process.env.OPENROUTER_API_KEY
  if (!apiKey) return res.status(500).json({ error: 'AI not configured' })

  // Pull live business data for context
  const ctx = await getBusinessContext()

  const systemPrompt = `You are an intelligent admin assistant for Bevans Sons, a premium sneaker store in South Africa.

You have access to live business data as of ${ctx.asOf}:

📊 TODAY
- Orders: ${ctx.today.orders} | Revenue: R${ctx.today.revenue}

📅 THIS MONTH
- Orders: ${ctx.thisMonth.orders} | Revenue: R${ctx.thisMonth.revenue}

📦 OPERATIONS
- Pending orders to fulfill: ${ctx.pendingOrders}
- Pending refund requests: ${ctx.pendingRefunds}
- Open customer enquiries: ${ctx.openEnquiries}

👥 CUSTOMERS
- Total active customers: ${ctx.totalCustomers}

📉 INVENTORY
- Low stock variants (≤5 units): ${ctx.inventory.lowStock}
- Out of stock variants: ${ctx.inventory.outOfStock}

🏆 TOP SELLING PRODUCTS
${ctx.topProducts.map((p, i) => `${i + 1}. ${p.name} — ${p.unitsSold} units sold`).join('\n')}

🕐 RECENT ORDERS
${ctx.recentOrders.map(o => `• ${o.orderNumber} | ${o.customer} | ${o.amount} | ${o.payment} | ${o.fulfillment} | ${o.date}`).join('\n')}

You can help with:
- Business insights and performance analysis
- Inventory alerts and restocking recommendations
- Order management advice
- Customer service guidance
- Marketing and sales suggestions
- Answering questions about the store's data above

Be concise, direct, and actionable. Use ZAR (R) for currency. You are talking to the store owner/admin.`

  const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
      'HTTP-Referer': 'https://bevanssons.store',
      'X-Title': 'Bevans Sons Admin',
    },
    body: JSON.stringify({
      model: 'anthropic/claude-sonnet-4-5',
      messages: [
        { role: 'system', content: systemPrompt },
        ...messages,
      ],
      max_tokens: 1024,
    }),
  })

  if (!response.ok) {
    const err = await response.text()
    console.error('[Admin Chat] OpenRouter error:', err)
    return res.status(500).json({ error: 'AI request failed' })
  }

  const data = await response.json()
  const reply = data.choices?.[0]?.message?.content ?? 'Sorry, I could not generate a response.'

  res.json({ reply })
})

module.exports = router
