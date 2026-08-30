const express = require('express')
const prisma = require('../../lib/prisma')

const router = express.Router()

const DEFAULTS = {
  store_name: 'Bevans Sons',
  store_tagline: 'Premium sneakers for those who move different. Born in South Africa.',
  store_reg: '2023/116995/07',
  contact_email: '',
  contact_phone: '',
  contact_whatsapp: '',
  contact_address: '',
  social_instagram: '',
  social_tiktok: '',
  social_facebook: '',
}

// GET /api/store-info
router.get('/', async (req, res) => {
  const rows = await prisma.businessSetting.findMany({ where: { category: 'store_info' } })

  const map = { ...DEFAULTS }
  for (const row of rows) {
    map[row.key] = row.value
  }

  res.json({
    storeName: map.store_name,
    storeTagline: map.store_tagline,
    storeReg: map.store_reg,
    email: map.contact_email,
    phone: map.contact_phone,
    whatsapp: map.contact_whatsapp,
    address: map.contact_address,
    instagram: map.social_instagram,
    tiktok: map.social_tiktok,
    facebook: map.social_facebook,
  })
})

module.exports = router
