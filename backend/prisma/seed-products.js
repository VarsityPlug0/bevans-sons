const prisma = require('../src/lib/prisma')
const slugify = require('slugify')
const Decimal = require('decimal.js')

// IDs from seed
const CAT = {
  running:    'cmtek5zbn000sgzws9mky5hzg',
  lifestyle:  'cmtek5zc6000ugzwsepamfhj7',
  basketball: 'cmtek5zco000wgzws3nmbpa08',
}
const BRAND = {
  nike:       'cmtek5ze7000zgzwsftdrivoo',
  adidas:     'cmtek5zew0010gzwsqc9goib0',
  jordan:     'cmtek5zfc0011gzwsjmcsbvkz',
  newbalance: 'cmtek5zfr0012gzws3g8nt3kx',
  converse:   'cmtek5zgq0014gzws0aqqrlfl',
}
const ADMIN_ID = 'cmtek5z020000gzwslm6mxcvl'

function calcMetrics({ supplierCost, inboundShipping = 0, fulfillmentCost = 0, packagingCost = 0, paymentFeePercent = 0.029, otherDirectCosts = 0, sellingPrice }) {
  const cost = new Decimal(supplierCost)
  const totalDirect = cost.plus(inboundShipping).plus(fulfillmentCost).plus(packagingCost).plus(otherDirectCosts)
  const price = new Decimal(sellingPrice)
  const paymentFee = price.times(paymentFeePercent)
  const contribution = price.minus(totalDirect).minus(paymentFee)
  const margin = contribution.div(price)
  const markup = price.div(cost)
  return {
    totalDirectCost: totalDirect.toDecimalPlaces(4),
    expectedContribution: contribution.toDecimalPlaces(4),
    contributionMargin: margin.toDecimalPlaces(6),
    markup: markup.toDecimalPlaces(6),
    profitMargin: margin.toDecimalPlaces(6),
  }
}

function recPrice({ supplierCost, inboundShipping = 0, fulfillmentCost = 0, packagingCost = 0, paymentFeePercent = 0.029, otherDirectCosts = 0, targetMargin = 0.35 }) {
  const totalDirect = new Decimal(supplierCost).plus(inboundShipping).plus(fulfillmentCost).plus(packagingCost).plus(otherDirectCosts)
  const recommended = totalDirect.div(new Decimal(1).minus(paymentFeePercent).minus(targetMargin)).toDecimalPlaces(2)
  const minimum = totalDirect.div(new Decimal(1).minus(paymentFeePercent).minus(0.25)).toDecimalPlaces(2)
  return { recommendedPrice: recommended, minimumPrice: minimum }
}

async function uniqueSlug(name) {
  const base = slugify(name, { lower: true, strict: true })
  let candidate = base, attempt = 0
  while (true) {
    const exists = await prisma.product.findUnique({ where: { slug: candidate } })
    if (!exists) return candidate
    candidate = `${base}-${++attempt}`
  }
}

const PRODUCTS = [
  {
    name: 'Nike Air Max 90',
    description: 'Classic Air Max cushioning with a timeless silhouette. Perforated leather upper, visible Air unit in the heel.',
    categoryId: CAT.lifestyle,
    brandId: BRAND.nike,
    sku: 'NK-AM90',
    supplierCost: 850,
    inboundShipping: 80,
    fulfillmentCost: 60,
    packagingCost: 25,
    sellingPrice: 1999,
    lowStockThreshold: 3,
    images: ['https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800'],
    tags: ['classic', 'lifestyle', 'air-max'],
    variants: [
      { sku: 'NK-AM90-WHT-7', size: '7', color: 'White/Black', colorHex: '#FFFFFF', initialStock: 4 },
      { sku: 'NK-AM90-WHT-8', size: '8', color: 'White/Black', colorHex: '#FFFFFF', initialStock: 6 },
      { sku: 'NK-AM90-WHT-9', size: '9', color: 'White/Black', colorHex: '#FFFFFF', initialStock: 8 },
      { sku: 'NK-AM90-WHT-10', size: '10', color: 'White/Black', colorHex: '#FFFFFF', initialStock: 5 },
      { sku: 'NK-AM90-WHT-11', size: '11', color: 'White/Black', colorHex: '#FFFFFF', initialStock: 3 },
      { sku: 'NK-AM90-RED-8', size: '8', color: 'Red/Black', colorHex: '#CC0000', initialStock: 4 },
      { sku: 'NK-AM90-RED-9', size: '9', color: 'Red/Black', colorHex: '#CC0000', initialStock: 5 },
      { sku: 'NK-AM90-RED-10', size: '10', color: 'Red/Black', colorHex: '#CC0000', initialStock: 3 },
    ],
  },
  {
    name: 'Nike Air Force 1 Low',
    description: 'The shoe that launched a legacy. Full-grain leather upper, Air-Sole unit for all-day cushioning.',
    categoryId: CAT.lifestyle,
    brandId: BRAND.nike,
    sku: 'NK-AF1-LOW',
    supplierCost: 750,
    inboundShipping: 70,
    fulfillmentCost: 55,
    packagingCost: 20,
    sellingPrice: 1799,
    lowStockThreshold: 3,
    images: ['https://images.unsplash.com/photo-1600269452121-4f2416e55c28?w=800'],
    tags: ['classic', 'lifestyle', 'air-force'],
    variants: [
      { sku: 'NK-AF1-WHT-7', size: '7', color: 'Triple White', colorHex: '#FFFFFF', initialStock: 5 },
      { sku: 'NK-AF1-WHT-8', size: '8', color: 'Triple White', colorHex: '#FFFFFF', initialStock: 8 },
      { sku: 'NK-AF1-WHT-9', size: '9', color: 'Triple White', colorHex: '#FFFFFF', initialStock: 7 },
      { sku: 'NK-AF1-WHT-10', size: '10', color: 'Triple White', colorHex: '#FFFFFF', initialStock: 6 },
      { sku: 'NK-AF1-BLK-8', size: '8', color: 'Triple Black', colorHex: '#111111', initialStock: 4 },
      { sku: 'NK-AF1-BLK-9', size: '9', color: 'Triple Black', colorHex: '#111111', initialStock: 5 },
      { sku: 'NK-AF1-BLK-10', size: '10', color: 'Triple Black', colorHex: '#111111', initialStock: 4 },
    ],
  },
  {
    name: 'Adidas Ultraboost 23',
    description: 'Responsive Boost midsole with a Primeknit upper. Continental rubber outsole for superior grip in any weather.',
    categoryId: CAT.running,
    brandId: BRAND.adidas,
    sku: 'AD-UB23',
    supplierCost: 1100,
    inboundShipping: 90,
    fulfillmentCost: 65,
    packagingCost: 30,
    sellingPrice: 2499,
    lowStockThreshold: 3,
    images: ['https://images.unsplash.com/photo-1587563871167-1ee9c731aefb?w=800'],
    tags: ['running', 'boost', 'performance'],
    variants: [
      { sku: 'AD-UB23-CWH-7', size: '7', color: 'Cloud White', colorHex: '#F5F5F5', initialStock: 3 },
      { sku: 'AD-UB23-CWH-8', size: '8', color: 'Cloud White', colorHex: '#F5F5F5', initialStock: 5 },
      { sku: 'AD-UB23-CWH-9', size: '9', color: 'Cloud White', colorHex: '#F5F5F5', initialStock: 6 },
      { sku: 'AD-UB23-CWH-10', size: '10', color: 'Cloud White', colorHex: '#F5F5F5', initialStock: 4 },
      { sku: 'AD-UB23-COR-8', size: '8', color: 'Core Black', colorHex: '#111111', initialStock: 4 },
      { sku: 'AD-UB23-COR-9', size: '9', color: 'Core Black', colorHex: '#111111', initialStock: 5 },
      { sku: 'AD-UB23-COR-10', size: '10', color: 'Core Black', colorHex: '#111111', initialStock: 3 },
    ],
  },
  {
    name: 'Jordan 1 Retro High OG',
    description: 'The shoe that changed everything. Perforated toe box, ankle collar with Nike Air branding, full-length Air-Sole unit.',
    categoryId: CAT.basketball,
    brandId: BRAND.jordan,
    sku: 'JD-1-HIGH',
    supplierCost: 1400,
    inboundShipping: 100,
    fulfillmentCost: 70,
    packagingCost: 35,
    sellingPrice: 3299,
    lowStockThreshold: 2,
    images: ['https://images.unsplash.com/photo-1589487391730-58f20eb2c308?w=800'],
    tags: ['jordan', 'retro', 'basketball', 'og'],
    variants: [
      { sku: 'JD1H-BRT-7', size: '7', color: 'Bred Toe', colorHex: '#CC0000', initialStock: 2 },
      { sku: 'JD1H-BRT-8', size: '8', color: 'Bred Toe', colorHex: '#CC0000', initialStock: 3 },
      { sku: 'JD1H-BRT-9', size: '9', color: 'Bred Toe', colorHex: '#CC0000', initialStock: 4 },
      { sku: 'JD1H-BRT-10', size: '10', color: 'Bred Toe', colorHex: '#CC0000', initialStock: 3 },
      { sku: 'JD1H-BRT-11', size: '11', color: 'Bred Toe', colorHex: '#CC0000', initialStock: 2 },
      { sku: 'JD1H-RYB-8', size: '8', color: 'Royal Blue', colorHex: '#0033CC', initialStock: 3 },
      { sku: 'JD1H-RYB-9', size: '9', color: 'Royal Blue', colorHex: '#0033CC', initialStock: 4 },
      { sku: 'JD1H-RYB-10', size: '10', color: 'Royal Blue', colorHex: '#0033CC', initialStock: 2 },
    ],
  },
  {
    name: 'New Balance 990v5',
    description: 'Made in USA. Premium pigskin and mesh upper, ENCAP midsole technology for unmatched support and durability.',
    categoryId: CAT.running,
    brandId: BRAND.newbalance,
    sku: 'NB-990V5',
    supplierCost: 1200,
    inboundShipping: 95,
    fulfillmentCost: 65,
    packagingCost: 30,
    sellingPrice: 2799,
    lowStockThreshold: 3,
    images: ['https://images.unsplash.com/photo-1539185441755-769473a23570?w=800'],
    tags: ['made-in-usa', 'running', 'premium'],
    variants: [
      { sku: 'NB990V5-GRY-7', size: '7', color: 'Grey', colorHex: '#808080', initialStock: 3 },
      { sku: 'NB990V5-GRY-8', size: '8', color: 'Grey', colorHex: '#808080', initialStock: 4 },
      { sku: 'NB990V5-GRY-9', size: '9', color: 'Grey', colorHex: '#808080', initialStock: 5 },
      { sku: 'NB990V5-GRY-10', size: '10', color: 'Grey', colorHex: '#808080', initialStock: 4 },
      { sku: 'NB990V5-NVY-8', size: '8', color: 'Navy', colorHex: '#001f5b', initialStock: 3 },
      { sku: 'NB990V5-NVY-9', size: '9', color: 'Navy', colorHex: '#001f5b', initialStock: 4 },
    ],
  },
  {
    name: 'Converse Chuck Taylor All Star',
    description: 'The original canvas sneaker since 1917. Medial eyelets for ventilation, OrthoLite insole, classic rubber outsole.',
    categoryId: CAT.lifestyle,
    brandId: BRAND.converse,
    sku: 'CV-CTAS',
    supplierCost: 380,
    inboundShipping: 45,
    fulfillmentCost: 45,
    packagingCost: 15,
    sellingPrice: 999,
    lowStockThreshold: 5,
    images: ['https://images.unsplash.com/photo-1460353581641-37baddab0fa2?w=800'],
    tags: ['classic', 'canvas', 'lifestyle', 'iconic'],
    variants: [
      { sku: 'CV-CTAS-OW-6', size: '6', color: 'Optical White', colorHex: '#F8F8F0', initialStock: 6 },
      { sku: 'CV-CTAS-OW-7', size: '7', color: 'Optical White', colorHex: '#F8F8F0', initialStock: 8 },
      { sku: 'CV-CTAS-OW-8', size: '8', color: 'Optical White', colorHex: '#F8F8F0', initialStock: 10 },
      { sku: 'CV-CTAS-OW-9', size: '9', color: 'Optical White', colorHex: '#F8F8F0', initialStock: 7 },
      { sku: 'CV-CTAS-OW-10', size: '10', color: 'Optical White', colorHex: '#F8F8F0', initialStock: 5 },
      { sku: 'CV-CTAS-BLK-6', size: '6', color: 'Black', colorHex: '#111111', initialStock: 5 },
      { sku: 'CV-CTAS-BLK-7', size: '7', color: 'Black', colorHex: '#111111', initialStock: 7 },
      { sku: 'CV-CTAS-BLK-8', size: '8', color: 'Black', colorHex: '#111111', initialStock: 8 },
      { sku: 'CV-CTAS-BLK-9', size: '9', color: 'Black', colorHex: '#111111', initialStock: 6 },
      { sku: 'CV-CTAS-RED-7', size: '7', color: 'Red', colorHex: '#CC0000', initialStock: 4 },
      { sku: 'CV-CTAS-RED-8', size: '8', color: 'Red', colorHex: '#CC0000', initialStock: 5 },
      { sku: 'CV-CTAS-RED-9', size: '9', color: 'Red', colorHex: '#CC0000', initialStock: 4 },
    ],
  },
  {
    name: 'Adidas Stan Smith',
    description: 'The clean minimalist tennis shoe that became a style icon. Leather upper, serrated 3-Stripes, cushioned sockliner.',
    categoryId: CAT.lifestyle,
    brandId: BRAND.adidas,
    sku: 'AD-STAN',
    supplierCost: 550,
    inboundShipping: 60,
    fulfillmentCost: 50,
    packagingCost: 20,
    sellingPrice: 1399,
    lowStockThreshold: 4,
    images: ['https://images.unsplash.com/photo-1518002171953-a080ee817e1f?w=800'],
    tags: ['classic', 'tennis', 'lifestyle', 'minimal'],
    variants: [
      { sku: 'AD-STAN-WHG-7', size: '7', color: 'White/Green', colorHex: '#FFFFFF', initialStock: 5 },
      { sku: 'AD-STAN-WHG-8', size: '8', color: 'White/Green', colorHex: '#FFFFFF', initialStock: 7 },
      { sku: 'AD-STAN-WHG-9', size: '9', color: 'White/Green', colorHex: '#FFFFFF', initialStock: 6 },
      { sku: 'AD-STAN-WHG-10', size: '10', color: 'White/Green', colorHex: '#FFFFFF', initialStock: 4 },
      { sku: 'AD-STAN-WHN-8', size: '8', color: 'White/Navy', colorHex: '#FFFFFF', initialStock: 5 },
      { sku: 'AD-STAN-WHN-9', size: '9', color: 'White/Navy', colorHex: '#FFFFFF', initialStock: 4 },
    ],
  },
  {
    name: 'Nike Pegasus 41',
    description: 'Workhorse daily trainer with React foam + Air Zoom unit. Engineered mesh upper, updated outsole pattern for traction.',
    categoryId: CAT.running,
    brandId: BRAND.nike,
    sku: 'NK-PEG41',
    supplierCost: 950,
    inboundShipping: 85,
    fulfillmentCost: 60,
    packagingCost: 25,
    sellingPrice: 2199,
    lowStockThreshold: 3,
    images: ['https://images.unsplash.com/photo-1605408499391-6368c628ef42?w=800'],
    tags: ['running', 'daily-trainer', 'react', 'zoom'],
    variants: [
      { sku: 'NK-PEG41-BLU-7', size: '7', color: 'Blue/White', colorHex: '#0044CC', initialStock: 4 },
      { sku: 'NK-PEG41-BLU-8', size: '8', color: 'Blue/White', colorHex: '#0044CC', initialStock: 5 },
      { sku: 'NK-PEG41-BLU-9', size: '9', color: 'Blue/White', colorHex: '#0044CC', initialStock: 6 },
      { sku: 'NK-PEG41-BLU-10', size: '10', color: 'Blue/White', colorHex: '#0044CC', initialStock: 4 },
      { sku: 'NK-PEG41-BLK-8', size: '8', color: 'Black/White', colorHex: '#111111', initialStock: 4 },
      { sku: 'NK-PEG41-BLK-9', size: '9', color: 'Black/White', colorHex: '#111111', initialStock: 5 },
      { sku: 'NK-PEG41-BLK-10', size: '10', color: 'Black/White', colorHex: '#111111', initialStock: 3 },
    ],
  },
]

async function seedProducts() {
  console.log('Seeding products...\n')

  for (const p of PRODUCTS) {
    const metrics = calcMetrics(p)
    const { recommendedPrice, minimumPrice } = recPrice(p)
    const slug = await uniqueSlug(p.name)

    const product = await prisma.$transaction(async (tx) => {
      const created = await tx.product.create({
        data: {
          name: p.name,
          slug,
          description: p.description,
          categoryId: p.categoryId,
          brandId: p.brandId,
          sku: p.sku,
          status: 'DRAFT',
          supplierCost: p.supplierCost,
          inboundShipping: p.inboundShipping ?? 0,
          fulfillmentCost: p.fulfillmentCost ?? 0,
          packagingCost: p.packagingCost ?? 0,
          paymentFeePercent: p.paymentFeePercent ?? 0.029,
          otherDirectCosts: p.otherDirectCosts ?? 0,
          totalDirectCost: metrics.totalDirectCost,
          sellingPrice: p.sellingPrice,
          recommendedPrice,
          minimumPrice,
          expectedContribution: metrics.expectedContribution,
          contributionMargin: metrics.contributionMargin,
          markup: metrics.markup,
          profitMargin: metrics.profitMargin,
          lowStockThreshold: p.lowStockThreshold ?? 5,
          images: p.images ?? [],
          tags: p.tags ?? [],
          variants: {
            create: p.variants.map((v) => ({
              sku: v.sku,
              size: v.size,
              color: v.color,
              colorHex: v.colorHex,
            })),
          },
        },
        include: { variants: true },
      })

      for (const variant of created.variants) {
        const def = p.variants.find((v) => v.sku === variant.sku)
        const stock = def?.initialStock ?? 0
        await tx.inventory.create({ data: { variantId: variant.id, available: stock } })
        if (stock > 0) {
          await tx.inventoryMovement.create({
            data: { variantId: variant.id, productId: created.id, type: 'PURCHASE', quantity: stock, reason: 'Initial stock from seed' },
          })
        }
      }

      return created
    })

    // Push straight through to PUBLISHED — skip workflow validation for seed data
    await prisma.product.update({
      where: { id: product.id },
      data: {
        status: 'PUBLISHED',
        approvedById: ADMIN_ID,
        approvedAt: new Date(),
        publishedAt: new Date(),
        marketPrice: p.sellingPrice * 0.98, // approx market
        marketViability: 'COMPETITIVE',
      },
    })

    const totalStock = p.variants.reduce((s, v) => s + (v.initialStock ?? 0), 0)
    console.log(`✓ ${p.name} — R${p.sellingPrice} | margin: ${(parseFloat(metrics.contributionMargin) * 100).toFixed(1)}% | ${p.variants.length} variants | ${totalStock} units`)
  }

  console.log(`\n✅ ${PRODUCTS.length} products seeded and published.`)
}

seedProducts()
  .catch((e) => { console.error(e); process.exit(1) })
  .finally(() => prisma.$disconnect())
