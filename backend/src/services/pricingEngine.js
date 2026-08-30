/**
 * Pricing Engine
 *
 * All financial calculations happen here — never on the frontend.
 * Uses Decimal.js for precision arithmetic.
 */

const Decimal = require('decimal.js')
const prisma = require('../lib/prisma')

Decimal.set({ precision: 20, rounding: Decimal.ROUND_HALF_UP })

/**
 * Load all pricing rules from the database.
 * Falls back to safe defaults if the database has not been seeded yet.
 */
async function loadPricingRules() {
  const rules = await prisma.pricingRule.findMany()
  const map = {}
  for (const r of rules) {
    map[r.key] = new Decimal(r.value)
  }

  return {
    targetMarkup: map.target_markup || new Decimal('1.8'),         // 180% of cost
    minimumMarkup: map.minimum_markup || new Decimal('1.5'),       // 150% of cost
    targetMargin: map.target_margin || new Decimal('0.35'),        // 35%
    minimumMargin: map.minimum_margin || new Decimal('0.25'),      // 25%
    minimumContribution: map.minimum_contribution || new Decimal('150'), // R150
    defaultPaymentFee: map.default_payment_fee || new Decimal('0.029'),  // 2.9%
  }
}

/**
 * Calculate total direct cost from individual cost inputs.
 * Payment fee is calculated as a percentage of the selling price.
 */
function calcTotalDirectCost({ supplierCost, inboundShipping, fulfillmentCost, packagingCost, paymentFeePercent, otherDirectCosts, sellingPrice }) {
  const cost = new Decimal(supplierCost || 0)
  const shipping = new Decimal(inboundShipping || 0)
  const fulfillment = new Decimal(fulfillmentCost || 0)
  const packaging = new Decimal(packagingCost || 0)
  const feeRate = new Decimal(paymentFeePercent || 0)
  const other = new Decimal(otherDirectCosts || 0)
  const price = new Decimal(sellingPrice || 0)

  const paymentFee = price.mul(feeRate)
  const total = cost.plus(shipping).plus(fulfillment).plus(packaging).plus(paymentFee).plus(other)

  return {
    totalDirectCost: total,
    paymentFeeAmount: paymentFee,
  }
}

/**
 * Calculate recommended and minimum prices from a supplier cost.
 * Based on configurable markup rules.
 */
async function calcRecommendedPrices({ supplierCost, inboundShipping = 0, fulfillmentCost = 0, packagingCost = 0, paymentFeePercent = 0.029, otherDirectCosts = 0 }) {
  const rules = await loadPricingRules()

  const baseCost = new Decimal(supplierCost || 0)
    .plus(new Decimal(inboundShipping || 0))
    .plus(new Decimal(fulfillmentCost || 0))
    .plus(new Decimal(packagingCost || 0))
    .plus(new Decimal(otherDirectCosts || 0))

  // Work backwards from margin targets to find price
  // margin = (price - cost) / price  =>  price = cost / (1 - margin)
  // But payment fee is a % of price, so:
  // totalCost = baseCost + price * feeRate
  // contribution = price - totalCost = price - baseCost - price * feeRate = price(1 - feeRate) - baseCost
  // margin = contribution / price = (price(1-feeRate) - baseCost) / price = (1-feeRate) - baseCost/price
  // price = baseCost / (1 - feeRate - targetMargin)

  const feeRate = new Decimal(paymentFeePercent || 0.029)

  const targetDenominator = new Decimal(1).minus(feeRate).minus(rules.targetMargin)
  const minDenominator = new Decimal(1).minus(feeRate).minus(rules.minimumMargin)

  // Guard against division by zero / negative denominator
  const recommendedPrice = targetDenominator.greaterThan(0)
    ? baseCost.div(targetDenominator).toDecimalPlaces(2, Decimal.ROUND_UP)
    : baseCost.mul(rules.targetMarkup).toDecimalPlaces(2, Decimal.ROUND_UP)

  const minimumPrice = minDenominator.greaterThan(0)
    ? baseCost.div(minDenominator).toDecimalPlaces(2, Decimal.ROUND_UP)
    : baseCost.mul(rules.minimumMarkup).toDecimalPlaces(2, Decimal.ROUND_UP)

  // Now calculate metrics at recommended price
  const metrics = calcMetricsAtPrice({
    sellingPrice: recommendedPrice.toNumber(),
    supplierCost,
    inboundShipping,
    fulfillmentCost,
    packagingCost,
    paymentFeePercent,
    otherDirectCosts,
  })

  return {
    recommendedPrice: recommendedPrice.toNumber(),
    minimumPrice: minimumPrice.toNumber(),
    ...metrics,
  }
}

/**
 * Calculate all financial metrics for a product at a given selling price.
 * This is the single source of truth for product economics.
 */
function calcMetricsAtPrice({ sellingPrice, supplierCost, inboundShipping = 0, fulfillmentCost = 0, packagingCost = 0, paymentFeePercent = 0.029, otherDirectCosts = 0 }) {
  const price = new Decimal(sellingPrice || 0)
  const cost = new Decimal(supplierCost || 0)
  const shipping = new Decimal(inboundShipping || 0)
  const fulfillment = new Decimal(fulfillmentCost || 0)
  const packaging = new Decimal(packagingCost || 0)
  const feeRate = new Decimal(paymentFeePercent || 0)
  const other = new Decimal(otherDirectCosts || 0)

  const paymentFeeAmount = price.mul(feeRate)
  const totalDirectCost = cost.plus(shipping).plus(fulfillment).plus(packaging).plus(paymentFeeAmount).plus(other)

  const contribution = price.minus(totalDirectCost)
  const contributionMargin = price.greaterThan(0) ? contribution.div(price) : new Decimal(0)
  const markup = cost.greaterThan(0) ? price.div(cost) : new Decimal(0)
  const profitMargin = price.greaterThan(0) ? contribution.div(price) : new Decimal(0)

  return {
    totalDirectCost: totalDirectCost.toDecimalPlaces(2).toNumber(),
    paymentFeeAmount: paymentFeeAmount.toDecimalPlaces(2).toNumber(),
    expectedContribution: contribution.toDecimalPlaces(2).toNumber(),
    contributionMargin: contributionMargin.toDecimalPlaces(4).toNumber(),
    markup: markup.toDecimalPlaces(4).toNumber(),
    profitMargin: profitMargin.toDecimalPlaces(4).toNumber(),
  }
}

/**
 * Evaluate market viability: can we compete while making enough money?
 * Returns COMPETITIVE / REVIEW / NOT_VIABLE
 */
async function evalMarketViability({ myPrice, marketAverage, sellingPrice, supplierCost, inboundShipping, fulfillmentCost, packagingCost, paymentFeePercent, otherDirectCosts }) {
  const rules = await loadPricingRules()
  const metrics = calcMetricsAtPrice({ sellingPrice: myPrice || sellingPrice, supplierCost, inboundShipping, fulfillmentCost, packagingCost, paymentFeePercent, otherDirectCosts })

  const priceDecimal = new Decimal(myPrice || sellingPrice)
  const marketAvg = new Decimal(marketAverage || 0)
  const contribution = new Decimal(metrics.expectedContribution)
  const margin = new Decimal(metrics.contributionMargin)

  // Not viable if margin is below minimum or contribution is below minimum
  if (margin.lessThan(rules.minimumMargin) || contribution.lessThan(rules.minimumContribution)) {
    return 'NOT_VIABLE'
  }

  // Review if price is significantly above market average (more than 15%)
  if (marketAvg.greaterThan(0) && priceDecimal.greaterThan(marketAvg.mul(1.15))) {
    return 'REVIEW'
  }

  return 'COMPETITIVE'
}

/**
 * Validate that a product's selling price meets minimum business requirements.
 */
async function validateProductPricing({ sellingPrice, supplierCost, inboundShipping, fulfillmentCost, packagingCost, paymentFeePercent, otherDirectCosts }) {
  const rules = await loadPricingRules()
  const metrics = calcMetricsAtPrice({ sellingPrice, supplierCost, inboundShipping, fulfillmentCost, packagingCost, paymentFeePercent, otherDirectCosts })

  const errors = []

  if (new Decimal(metrics.contributionMargin).lessThan(rules.minimumMargin)) {
    errors.push(`Contribution margin ${(metrics.contributionMargin * 100).toFixed(1)}% is below minimum ${rules.minimumMargin.mul(100).toFixed(1)}%`)
  }

  if (new Decimal(metrics.expectedContribution).lessThan(rules.minimumContribution)) {
    errors.push(`Expected contribution R${metrics.expectedContribution.toFixed(2)} is below minimum R${rules.minimumContribution.toFixed(2)}`)
  }

  return {
    valid: errors.length === 0,
    errors,
    metrics,
  }
}

/**
 * Recalculate and persist product pricing metrics to the database.
 */
async function recalcAndSaveProduct(productId) {
  const product = await prisma.product.findUniqueOrThrow({ where: { id: productId } })

  const metrics = calcMetricsAtPrice({
    sellingPrice: product.sellingPrice,
    supplierCost: product.supplierCost,
    inboundShipping: product.inboundShipping,
    fulfillmentCost: product.fulfillmentCost,
    packagingCost: product.packagingCost,
    paymentFeePercent: product.paymentFeePercent,
    otherDirectCosts: product.otherDirectCosts,
  })

  return prisma.product.update({
    where: { id: productId },
    data: metrics,
  })
}

module.exports = {
  loadPricingRules,
  calcTotalDirectCost,
  calcRecommendedPrices,
  calcMetricsAtPrice,
  evalMarketViability,
  validateProductPricing,
  recalcAndSaveProduct,
}
