const express = require('express')
const prisma = require('../../lib/prisma')

const router = express.Router()

router.get('/', async (req, res) => {
  const brands = await prisma.brand.findMany({
    where: { isActive: true },
    orderBy: { name: 'asc' },
    select: { id: true, name: true, slug: true, logoUrl: true },
  })
  res.json(brands)
})

module.exports = router
