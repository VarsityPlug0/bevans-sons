/**
 * Alert Service
 *
 * Generates and manages system alerts for the admin dashboard.
 * Alerts are written to the database and deduplicated by type + entityId.
 */

const prisma = require('../lib/prisma')
const { loadPricingRules } = require('./pricingEngine')

/**
 * Create or update an alert. Deduplicates by type + entityId to avoid flooding.
 */
async function createAlert({ type, severity, title, message, entityType = null, entityId = null }) {
  // Check if an unresolved alert of this type/entity already exists
  const existing = await prisma.alert.findFirst({
    where: { type, entityId, isResolved: false },
  })

  if (existing) {
    return prisma.alert.update({
      where: { id: existing.id },
      data: { title, message, severity, isRead: false },
    })
  }

  return prisma.alert.create({
    data: { type, severity, title, message, entityType, entityId },
  })
}

/**
 * Resolve an alert.
 */
async function resolveAlert(alertId) {
  return prisma.alert.update({
    where: { id: alertId },
    data: { isResolved: true, resolvedAt: new Date() },
  })
}

/**
 * Auto-resolve alerts for an entity that no longer has a problem.
 */
async function autoResolve({ type, entityId }) {
  await prisma.alert.updateMany({
    where: { type, entityId, isResolved: false },
    data: { isResolved: true, resolvedAt: new Date() },
  })
}

/**
 * Run all alert checks. Call this periodically (e.g. after order events, from a cron job).
 */
async function runAllAlertChecks() {
  await Promise.all([
    checkLowStockAlerts(),
    checkLowMarginProducts(),
    checkPendingFulfillment(),
    checkLowCashReserve(),
    checkExcessiveRefunds(),
    checkPoorCampaigns(),
  ])
}

async function checkLowStockAlerts() {
  const variants = await prisma.productVariant.findMany({
    where: { isActive: true, product: { status: 'PUBLISHED' } },
    include: {
      product: { select: { id: true, name: true, lowStockThreshold: true } },
      inventory: true,
    },
  })

  for (const v of variants) {
    const available = v.inventory?.available ?? 0
    const threshold = v.product.lowStockThreshold

    if (available === 0) {
      await createAlert({
        type: 'OUT_OF_STOCK',
        severity: 'CRITICAL',
        title: `Out of stock: ${v.product.name}`,
        message: `${v.product.name} (${v.size ?? ''} ${v.color ?? ''}) is completely out of stock.`,
        entityType: 'ProductVariant',
        entityId: v.id,
      })
    } else if (available <= threshold) {
      await createAlert({
        type: 'LOW_STOCK',
        severity: 'WARNING',
        title: `Low stock: ${v.product.name}`,
        message: `${v.product.name} (${v.size ?? ''} ${v.color ?? ''}) has only ${available} units remaining (threshold: ${threshold}).`,
        entityType: 'ProductVariant',
        entityId: v.id,
      })
    } else {
      // No longer low stock — auto-resolve
      await autoResolve({ type: 'LOW_STOCK', entityId: v.id })
      await autoResolve({ type: 'OUT_OF_STOCK', entityId: v.id })
    }
  }
}

async function checkLowMarginProducts() {
  const rules = await loadPricingRules()
  const minMargin = rules.minimumMargin.toNumber()
  const minContribution = rules.minimumContribution.toNumber()

  const products = await prisma.product.findMany({
    where: { status: 'PUBLISHED' },
    select: { id: true, name: true, contributionMargin: true, expectedContribution: true },
  })

  for (const p of products) {
    const margin = parseFloat(p.contributionMargin)
    const contribution = parseFloat(p.expectedContribution)

    if (margin < minMargin || contribution < minContribution) {
      await createAlert({
        type: 'LOW_MARGIN',
        severity: 'WARNING',
        title: `Low margin: ${p.name}`,
        message: `${p.name} has a contribution margin of ${(margin * 100).toFixed(1)}% (min: ${(minMargin * 100).toFixed(1)}%) and contribution of R${contribution.toFixed(2)} (min: R${minContribution.toFixed(2)}).`,
        entityType: 'Product',
        entityId: p.id,
      })
    } else {
      await autoResolve({ type: 'LOW_MARGIN', entityId: p.id })
    }
  }
}

async function checkPendingFulfillment() {
  const threshold = new Date()
  threshold.setHours(threshold.getHours() - 48) // Orders older than 48h

  const count = await prisma.order.count({
    where: {
      paymentStatus: 'PAID',
      fulfillmentStatus: 'PROCESSING',
      paidAt: { lt: threshold },
    },
  })

  if (count > 0) {
    await createAlert({
      type: 'PENDING_FULFILLMENT',
      severity: 'WARNING',
      title: `${count} order${count > 1 ? 's' : ''} awaiting fulfillment`,
      message: `${count} paid order${count > 1 ? 's are' : ' is'} older than 48 hours and still awaiting fulfillment.`,
      entityType: 'Order',
      entityId: 'PENDING_FULFILLMENT',
    })
  } else {
    await autoResolve({ type: 'PENDING_FULFILLMENT', entityId: 'PENDING_FULFILLMENT' })
  }
}

async function checkLowCashReserve() {
  const reserveAccount = await prisma.financialAccount.findUnique({ where: { key: 'reserve' } })
  if (!reserveAccount) return

  const setting = await prisma.businessSetting.findUnique({ where: { key: 'minimum_reserve_balance' } })
  const minBalance = parseFloat(setting?.value ?? '5000')
  const balance = parseFloat(reserveAccount.balance)

  if (balance < minBalance) {
    await createAlert({
      type: 'LOW_CASH_RESERVE',
      severity: 'CRITICAL',
      title: 'Low business reserve',
      message: `Business reserve is R${balance.toFixed(2)}, below the minimum of R${minBalance.toFixed(2)}.`,
      entityType: 'FinancialAccount',
      entityId: reserveAccount.id,
    })
  } else {
    await autoResolve({ type: 'LOW_CASH_RESERVE', entityId: reserveAccount.id })
  }
}

async function checkExcessiveRefunds() {
  const thirtyDaysAgo = new Date()
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30)

  const [refundCount, orderCount] = await Promise.all([
    prisma.refundRequest.count({ where: { createdAt: { gte: thirtyDaysAgo }, status: { not: 'REJECTED' } } }),
    prisma.order.count({ where: { paidAt: { gte: thirtyDaysAgo }, paymentStatus: 'PAID' } }),
  ])

  if (orderCount === 0) return

  const refundRate = refundCount / orderCount
  if (refundRate > 0.05) { // > 5% refund rate
    await createAlert({
      type: 'EXCESSIVE_REFUNDS',
      severity: 'WARNING',
      title: `High refund rate: ${(refundRate * 100).toFixed(1)}%`,
      message: `${refundCount} refunds in the last 30 days out of ${orderCount} orders (${(refundRate * 100).toFixed(1)}% refund rate). Investigate product quality or customer expectations.`,
      entityType: 'Order',
      entityId: 'EXCESSIVE_REFUNDS',
    })
  } else {
    await autoResolve({ type: 'EXCESSIVE_REFUNDS', entityId: 'EXCESSIVE_REFUNDS' })
  }
}

async function checkPoorCampaigns() {
  const campaigns = await prisma.marketingCampaign.findMany({
    where: { status: 'ACTIVE' },
  })

  const setting = await prisma.businessSetting.findUnique({ where: { key: 'minimum_roas' } })
  const minRoas = parseFloat(setting?.value ?? '2')

  for (const c of campaigns) {
    const roas = parseFloat(c.roas)
    if (c.spend > 0 && roas < minRoas && roas > 0) {
      await createAlert({
        type: 'POOR_CAMPAIGN_PERFORMANCE',
        severity: 'WARNING',
        title: `Poor ROAS: ${c.name}`,
        message: `Campaign "${c.name}" has ROAS of ${roas.toFixed(2)}x (minimum: ${minRoas}x). Consider pausing or optimising.`,
        entityType: 'MarketingCampaign',
        entityId: c.id,
      })
    } else {
      await autoResolve({ type: 'POOR_CAMPAIGN_PERFORMANCE', entityId: c.id })
    }
  }
}

module.exports = {
  createAlert,
  resolveAlert,
  autoResolve,
  runAllAlertChecks,
  checkLowStockAlerts,
  checkLowMarginProducts,
  checkPendingFulfillment,
  checkLowCashReserve,
  checkExcessiveRefunds,
  checkPoorCampaigns,
}
