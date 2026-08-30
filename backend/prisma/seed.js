const { PrismaClient } = require('@prisma/client')
const bcrypt = require('bcryptjs')

const prisma = new PrismaClient()

async function main() {
  console.log('Seeding database...')

  // ── Super Admin User ──────────────────────────────────────────────────────
  const hashedPassword = await bcrypt.hash('Admin@123!', 12)
  await prisma.user.upsert({
    where: { email: 'admin@store.co.za' },
    create: {
      email: 'admin@store.co.za',
      password: hashedPassword,
      firstName: 'Store',
      lastName: 'Admin',
      role: 'SUPER_ADMIN',
    },
    update: {},
  })
  console.log('✓ Admin user created (admin@store.co.za / Admin@123!)')

  // ── Business Settings ─────────────────────────────────────────────────────
  const settings = [
    { key: 'store_name', value: 'Sneaker Store', category: 'general', description: 'Store display name' },
    { key: 'store_currency', value: 'ZAR', category: 'general', description: 'Store currency code' },
    { key: 'store_email', value: 'hello@store.co.za', category: 'general', description: 'Store contact email' },
    { key: 'minimum_reserve_balance', value: '5000', type: 'number', category: 'finance', description: 'Alert threshold for business reserve (R)' },
    { key: 'minimum_roas', value: '2', type: 'number', category: 'marketing', description: 'Minimum acceptable ROAS for campaigns' },
    { key: 'low_stock_default_threshold', value: '5', type: 'number', category: 'inventory', description: 'Default low stock threshold for new products' },
    { key: 'refund_policy_days', value: '7', type: 'number', category: 'orders', description: 'Days after delivery that refunds are accepted' },
  ]

  for (const s of settings) {
    await prisma.businessSetting.upsert({
      where: { key: s.key },
      create: { ...s, type: s.type ?? 'string' },
      update: { value: s.value },
    })
  }
  console.log('✓ Business settings seeded')

  // ── Pricing Rules ─────────────────────────────────────────────────────────
  const pricingRules = [
    { key: 'target_markup', value: 1.8, name: 'Target Markup', description: 'Multiply supplier cost by this to get target selling price' },
    { key: 'minimum_markup', value: 1.5, name: 'Minimum Markup', description: 'Minimum acceptable markup on supplier cost' },
    { key: 'target_margin', value: 0.35, name: 'Target Contribution Margin', description: 'Target contribution margin (35%)' },
    { key: 'minimum_margin', value: 0.25, name: 'Minimum Contribution Margin', description: 'Minimum acceptable contribution margin (25%)' },
    { key: 'minimum_contribution', value: 150, name: 'Minimum Contribution (R)', description: 'Minimum rand contribution per order' },
    { key: 'default_payment_fee', value: 0.029, name: 'Default Payment Fee %', description: 'Default payment processing fee percentage (2.9%)' },
  ]

  for (const r of pricingRules) {
    await prisma.pricingRule.upsert({
      where: { key: r.key },
      create: r,
      update: { value: r.value },
    })
  }
  console.log('✓ Pricing rules seeded')

  // ── Financial Accounts (Virtual Wallets) ──────────────────────────────────
  const accounts = [
    { key: 'fulfillment', name: 'Fulfillment', description: 'Reserved for fulfilling customer orders', color: '#3B82F6', icon: 'truck', sortOrder: 1 },
    { key: 'marketing', name: 'Marketing', description: 'Budget for advertising and customer acquisition', color: '#8B5CF6', icon: 'megaphone', sortOrder: 2 },
    { key: 'operations', name: 'Operations', description: 'General business operating expenses', color: '#F59E0B', icon: 'cog', sortOrder: 3 },
    { key: 'reserve', name: 'Business Reserve', description: 'Emergency and business stability reserve', color: '#10B981', icon: 'shield', sortOrder: 4 },
    { key: 'tax', name: 'Tax Reserve', description: 'Reserved for VAT and income tax obligations', color: '#EF4444', icon: 'receipt', sortOrder: 5 },
    { key: 'profit', name: 'Available Profit', description: 'Profit available for owner withdrawal after all commitments', color: '#06B6D4', icon: 'banknotes', sortOrder: 6 },
  ]

  for (const a of accounts) {
    await prisma.financialAccount.upsert({
      where: { key: a.key },
      create: a,
      update: {},
    })
  }
  console.log('✓ Financial accounts (wallets) created')

  // ── Allocation Rules ──────────────────────────────────────────────────────
  // These must sum to exactly 1.0 (100%)
  const allocationRules = [
    { accountKey: 'fulfillment', percentage: 0.15, name: 'Fulfillment Allocation', description: '15% of revenue allocated to fulfillment costs', sortOrder: 1 },
    { accountKey: 'marketing', percentage: 0.15, name: 'Marketing Allocation', description: '15% of revenue allocated to marketing budget', sortOrder: 2 },
    { accountKey: 'operations', percentage: 0.10, name: 'Operations Allocation', description: '10% of revenue allocated to operating expenses', sortOrder: 3 },
    { accountKey: 'reserve', percentage: 0.10, name: 'Reserve Allocation', description: '10% of revenue allocated to business reserve', sortOrder: 4 },
    { accountKey: 'tax', percentage: 0.15, name: 'Tax Allocation', description: '15% of revenue allocated to tax reserve (VAT + income tax)', sortOrder: 5 },
    { accountKey: 'profit', percentage: 0.35, name: 'Profit Allocation', description: '35% of revenue allocated as available profit', sortOrder: 6 },
  ]

  for (const r of allocationRules) {
    await prisma.allocationRule.upsert({
      where: { accountKey: r.accountKey },
      create: r,
      update: { percentage: r.percentage },
    })
  }
  console.log('✓ Allocation rules seeded (15% fulfillment + 15% marketing + 10% ops + 10% reserve + 15% tax + 35% profit = 100%)')

  // ── Categories ────────────────────────────────────────────────────────────
  const categories = [
    { name: 'Sneakers', slug: 'sneakers', description: 'Athletic and casual footwear' },
    { name: 'Running', slug: 'running', description: 'Performance running shoes', parentSlug: 'sneakers' },
    { name: 'Lifestyle', slug: 'lifestyle', description: 'Everyday casual sneakers', parentSlug: 'sneakers' },
    { name: 'Basketball', slug: 'basketball', description: 'Basketball performance shoes', parentSlug: 'sneakers' },
    { name: 'Clothing', slug: 'clothing', description: 'Streetwear and activewear' },
    { name: 'Accessories', slug: 'accessories', description: 'Caps, socks, bags and more' },
  ]

  const categoryMap = {}
  for (const c of categories) {
    const { parentSlug, ...data } = c
    const created = await prisma.category.upsert({
      where: { slug: c.slug },
      create: { ...data, parentId: parentSlug ? categoryMap[parentSlug]?.id : undefined },
      update: {},
    })
    categoryMap[c.slug] = created
  }
  console.log('✓ Categories seeded')

  // ── Brands ────────────────────────────────────────────────────────────────
  const brands = [
    { name: 'Nike', slug: 'nike' },
    { name: 'Adidas', slug: 'adidas' },
    { name: 'Jordan', slug: 'jordan' },
    { name: 'New Balance', slug: 'new-balance' },
    { name: 'Puma', slug: 'puma' },
    { name: 'Converse', slug: 'converse' },
  ]

  for (const b of brands) {
    await prisma.brand.upsert({ where: { slug: b.slug }, create: b, update: {} })
  }
  console.log('✓ Brands seeded')

  console.log('\n✅ Seed complete!')
  console.log('\nAdmin login: admin@store.co.za / Admin@123!')
  console.log('IMPORTANT: Change this password immediately after first login.')
}

main()
  .catch((e) => { console.error(e); process.exit(1) })
  .finally(() => prisma.$disconnect())
