const express = require('express')
const { Resend } = require('resend')
const prisma = require('../../lib/prisma')
const { requireAdmin, requireRole } = require('../../middleware/adminAuth')

const router = express.Router()
router.use(requireAdmin)

function getResend() {
  if (!process.env.RESEND_API_KEY) throw new Error('RESEND_API_KEY not configured')
  return new Resend(process.env.RESEND_API_KEY)
}

function buildHtml({ heading, body, ctaText, ctaUrl, featuredProducts, storeName, storeUrl }) {
  const productsHtml = featuredProducts?.length
    ? `<table width="100%" cellpadding="0" cellspacing="0" style="margin:24px 0">
        <tr>${featuredProducts.slice(0, 4).map(p => `
          <td width="25%" style="padding:6px;vertical-align:top;text-align:center">
            ${p.imageUrl ? `<img src="${p.imageUrl}" width="120" height="120" style="object-fit:cover;border-radius:8px" alt="${p.name}" />` : ''}
            <p style="margin:8px 0 4px;font-size:12px;font-weight:600;color:#111">${p.name}</p>
            <p style="margin:0;font-size:12px;color:#C8B993;font-weight:700">${p.price ?? ''}</p>
          </td>`).join('')}
        </tr>
      </table>` : ''

  const ctaHtml = ctaText && ctaUrl
    ? `<div style="text-align:center;margin:28px 0">
        <a href="${ctaUrl}" style="background:#111;color:#fff;text-decoration:none;padding:14px 36px;font-size:13px;font-weight:700;letter-spacing:0.1em;text-transform:uppercase;display:inline-block">${ctaText}</a>
      </div>` : ''

  return `<!DOCTYPE html>
<html><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#f5f5f5;font-family:Arial,sans-serif">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f5f5f5;padding:40px 20px">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="background:#fff;max-width:600px;width:100%">
        <tr><td style="background:#111;padding:24px 32px;text-align:center">
          <span style="color:#fff;font-size:22px;font-weight:700;letter-spacing:0.1em;text-transform:uppercase">${storeName}</span>
        </td></tr>
        <tr><td style="padding:36px 32px">
          <h1 style="margin:0 0 20px;font-size:26px;font-weight:700;color:#111;line-height:1.3">${heading}</h1>
          <p style="margin:0 0 20px;font-size:14px;color:#555;line-height:1.7;white-space:pre-line">${body.replace(/\n/g, '<br>')}</p>
          ${productsHtml}
          ${ctaHtml}
        </td></tr>
        <tr><td style="background:#111;padding:20px 32px;text-align:center">
          <p style="margin:0;color:#888;font-size:11px">© ${new Date().getFullYear()} ${storeName} · <a href="${storeUrl}/privacy-policy" style="color:#888">Privacy</a> · <a href="${storeUrl}/contact" style="color:#888">Contact Us</a></p>
        </td></tr>
      </table>
    </td></tr>
  </table>
</body></html>`
}

// POST /api/admin/email/send-campaign
router.post('/send-campaign', requireRole('ADMIN', 'MANAGER', 'SUPER_ADMIN'), async (req, res) => {
  const { subject, heading, body, ctaText, ctaUrl, recipients, customEmail, featuredProducts } = req.body

  if (!subject || !heading || !body) {
    return res.status(400).json({ error: 'Subject, heading and body are required' })
  }

  const storeUrl = process.env.FRONTEND_URL || 'https://bevanssons.store'
  const fromEmail = process.env.EMAIL_FROM || 'noreply@bevanssons.store'
  const storeName = 'Bevans Sons'

  let emails = []

  if (recipients === 'custom') {
    if (!customEmail) return res.status(400).json({ error: 'Custom email required' })
    emails = [customEmail]
  } else if (recipients === 'pending') {
    const orders = await prisma.order.findMany({
      where: { paymentStatus: 'PENDING' },
      select: { customer: { select: { email: true } } },
      distinct: ['customerId'],
      take: 500,
    })
    emails = [...new Set(orders.map((o) => o.customer?.email).filter(Boolean))]
  } else {
    const customers = await prisma.customer.findMany({
      where: { isActive: true },
      select: { email: true },
      take: 1000,
    })
    emails = customers.map((c) => c.email)
  }

  const resend = getResend()
  const html = buildHtml({ heading, body, ctaText, ctaUrl, featuredProducts, storeName, storeUrl })

  let sent = 0
  // Send in batches of 50 (Resend rate limit)
  for (let i = 0; i < emails.length; i += 50) {
    const batch = emails.slice(i, i + 50)
    await Promise.allSettled(batch.map(to =>
      resend.emails.send({ from: `${storeName} <${fromEmail}>`, to, subject, html })
        .then(() => { sent++ })
    ))
  }

  res.json({ sent, total: emails.length })
})

module.exports = router
