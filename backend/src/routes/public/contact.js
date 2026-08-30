const express = require('express')
const { nanoid } = require('nanoid')
const prisma = require('../../lib/prisma')

const router = express.Router()

// POST /api/contact
router.post('/', async (req, res) => {
  const { name, email, subject, message, phone } = req.body
  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Name, email and message are required' })
  }

  const id = `enquiry_${nanoid(12)}`
  await prisma.businessSetting.upsert({
    where: { key: id },
    create: {
      key: id,
      value: JSON.stringify({ name, email, phone: phone || null, subject: subject || 'General Enquiry', message }),
      category: 'enquiry',
      description: `Contact form submission from ${name}`,
    },
    update: {
      value: JSON.stringify({ name, email, phone: phone || null, subject: subject || 'General Enquiry', message }),
    },
  })

  console.log(`[Contact] ${new Date().toISOString()} | ${name} <${email}> | ${subject || 'General enquiry'}`)
  res.json({ success: true })
})

module.exports = router
