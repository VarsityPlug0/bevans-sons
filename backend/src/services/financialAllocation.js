/**
 * Financial Allocation Engine
 *
 * When money enters the business (a payment is received), this service
 * automatically splits it across virtual wallets according to configurable rules.
 *
 * All operations that touch money use database transactions to ensure atomicity.
 * The backend is always the source of financial truth.
 */

const Decimal = require('decimal.js')
const prisma = require('../lib/prisma')

Decimal.set({ precision: 20, rounding: Decimal.ROUND_HALF_UP })

/**
 * Load allocation rules from the database.
 */
async function loadAllocationRules() {
  const rules = await prisma.allocationRule.findMany({
    where: { isActive: true },
    orderBy: { sortOrder: 'asc' },
  })
  return rules
}

/**
 * Core allocation function. Called when a payment is received.
 *
 * Flow:
 * 1. Record the sale transaction
 * 2. Split amount across virtual wallets per allocation rules
 * 3. Mark fulfillment wallet funds as committed (for this order)
 *
 * Everything runs inside a single database transaction.
 */
async function allocatePayment({ orderId, amount, description = 'Order payment' }) {
  const decAmount = new Decimal(amount)
  const rules = await loadAllocationRules()

  if (rules.length === 0) {
    throw new Error('No allocation rules configured. Please set up allocation rules in Settings.')
  }

  // Validate that rules sum to 1.0 (100%)
  const totalPct = rules.reduce((sum, r) => sum.plus(new Decimal(r.percentage)), new Decimal(0))
  if (!totalPct.equals(1)) {
    console.warn(`Allocation rules sum to ${totalPct.toString()}, not 1.0. Adjusting last bucket.`)
  }

  return prisma.$transaction(async (tx) => {
    // 1. Create the top-level sale transaction
    const transaction = await tx.financialTransaction.create({
      data: {
        type: 'SALE',
        amount: decAmount.toDecimalPlaces(2).toNumber(),
        direction: 'credit',
        orderId,
        description,
        reference: `ORDER-${orderId}`,
      },
    })

    // 2. Calculate and create allocations
    let allocated = new Decimal(0)
    const allocationData = []

    for (let i = 0; i < rules.length; i++) {
      const rule = rules[i]
      const isLast = i === rules.length - 1

      // Last bucket gets remainder to avoid rounding drift
      let allocationAmount
      if (isLast) {
        allocationAmount = decAmount.minus(allocated).toDecimalPlaces(2)
      } else {
        allocationAmount = decAmount.mul(new Decimal(rule.percentage)).toDecimalPlaces(2)
      }

      allocated = allocated.plus(allocationAmount)
      allocationData.push({ rule, amount: allocationAmount })
    }

    // Resolve account IDs
    const accounts = await tx.financialAccount.findMany({
      where: { key: { in: allocationData.map((a) => a.rule.accountKey) } },
    })
    const accountMap = Object.fromEntries(accounts.map((a) => [a.key, a]))

    // Create allocation records and update account balances
    for (const { rule, amount: alloc } of allocationData) {
      const account = accountMap[rule.accountKey]
      if (!account) {
        throw new Error(`Financial account '${rule.accountKey}' not found. Check your configuration.`)
      }

      await tx.financialAllocation.create({
        data: {
          transactionId: transaction.id,
          accountId: account.id,
          amount: alloc.toDecimalPlaces(2).toNumber(),
          ruleKey: rule.accountKey,
          description: `${rule.name} allocation for order`,
        },
      })

      await tx.financialAccount.update({
        where: { id: account.id },
        data: {
          balance: { increment: alloc.toDecimalPlaces(2).toNumber() },
        },
      })
    }

    return { transactionId: transaction.id, allocated: allocated.toNumber() }
  })
}

/**
 * Commit funds in the fulfillment wallet when an order is placed.
 * This prevents the fulfillment balance from appearing fully available
 * when orders are outstanding.
 */
async function commitFulfillmentFunds({ orderId, fulfillmentCost }) {
  const decAmount = new Decimal(fulfillmentCost)
  if (decAmount.isZero()) return null

  return prisma.$transaction(async (tx) => {
    const account = await tx.financialAccount.findUnique({ where: { key: 'fulfillment' } })
    if (!account) return null

    await tx.financialAccount.update({
      where: { id: account.id },
      data: { committed: { increment: decAmount.toDecimalPlaces(2).toNumber() } },
    })

    return tx.financialTransaction.create({
      data: {
        type: 'COMMITMENT',
        amount: decAmount.toDecimalPlaces(2).toNumber(),
        direction: 'debit',
        accountId: account.id,
        orderId,
        description: 'Fulfillment cost committed for order',
      },
    })
  })
}

/**
 * Release committed fulfillment funds after an order is delivered or cancelled.
 */
async function releaseFulfillmentCommitment({ orderId, fulfillmentCost }) {
  const decAmount = new Decimal(fulfillmentCost)
  if (decAmount.isZero()) return null

  return prisma.$transaction(async (tx) => {
    const account = await tx.financialAccount.findUnique({ where: { key: 'fulfillment' } })
    if (!account) return null

    await tx.financialAccount.update({
      where: { id: account.id },
      data: {
        committed: { decrement: decAmount.toDecimalPlaces(2).toNumber() },
        balance: { decrement: decAmount.toDecimalPlaces(2).toNumber() },
      },
    })

    return tx.financialTransaction.create({
      data: {
        type: 'COMMITMENT_RELEASE',
        amount: decAmount.toDecimalPlaces(2).toNumber(),
        direction: 'credit',
        accountId: account.id,
        orderId,
        description: 'Fulfillment commitment released',
      },
    })
  })
}

/**
 * Record a financial reversal when a refund is processed.
 * Withdraws money from each virtual wallet proportionally.
 */
async function reverseAllocation({ refundRequestId, orderId, refundAmount }) {
  const decAmount = new Decimal(refundAmount)
  const rules = await loadAllocationRules()

  return prisma.$transaction(async (tx) => {
    // Get original allocations for this order
    const originalTx = await tx.financialTransaction.findFirst({
      where: { orderId, type: 'SALE' },
      include: { allocations: true },
    })

    if (!originalTx) {
      // Fall back to proportional reversal based on rules
      return reverseProportionally({ tx, refundRequestId, orderId, decAmount, rules })
    }

    const originalTotal = new Decimal(originalTx.amount)
    const refundRatio = originalTotal.greaterThan(0) ? decAmount.div(originalTotal) : new Decimal(0)

    const reversalTx = await tx.financialTransaction.create({
      data: {
        type: 'REFUND_REVERSAL',
        amount: decAmount.toDecimalPlaces(2).toNumber(),
        direction: 'debit',
        orderId,
        refundRequestId,
        description: `Refund reversal for order`,
      },
    })

    let reversed = new Decimal(0)
    const allocations = originalTx.allocations

    for (let i = 0; i < allocations.length; i++) {
      const alloc = allocations[i]
      const isLast = i === allocations.length - 1

      let reversal
      if (isLast) {
        reversal = decAmount.minus(reversed).toDecimalPlaces(2)
      } else {
        reversal = new Decimal(alloc.amount).mul(refundRatio).toDecimalPlaces(2)
      }

      reversed = reversed.plus(reversal)

      await tx.financialAllocation.create({
        data: {
          transactionId: reversalTx.id,
          accountId: alloc.accountId,
          amount: reversal.neg().toDecimalPlaces(2).toNumber(),
          ruleKey: alloc.ruleKey,
          description: 'Refund reversal',
        },
      })

      await tx.financialAccount.update({
        where: { id: alloc.accountId },
        data: { balance: { decrement: reversal.toDecimalPlaces(2).toNumber() } },
      })
    }

    return { transactionId: reversalTx.id }
  })
}

async function reverseProportionally({ tx, refundRequestId, orderId, decAmount, rules }) {
  const accounts = await tx.financialAccount.findMany({
    where: { key: { in: rules.map((r) => r.accountKey) } },
  })
  const accountMap = Object.fromEntries(accounts.map((a) => [a.key, a]))

  const reversalTx = await tx.financialTransaction.create({
    data: {
      type: 'REFUND_REVERSAL',
      amount: decAmount.toDecimalPlaces(2).toNumber(),
      direction: 'debit',
      orderId,
      refundRequestId,
      description: 'Refund reversal (proportional)',
    },
  })

  let reversed = new Decimal(0)
  for (let i = 0; i < rules.length; i++) {
    const rule = rules[i]
    const isLast = i === rules.length - 1
    const reversal = isLast
      ? decAmount.minus(reversed).toDecimalPlaces(2)
      : decAmount.mul(new Decimal(rule.percentage)).toDecimalPlaces(2)

    reversed = reversed.plus(reversal)
    const account = accountMap[rule.accountKey]
    if (!account) continue

    await tx.financialAllocation.create({
      data: {
        transactionId: reversalTx.id,
        accountId: account.id,
        amount: reversal.neg().toDecimalPlaces(2).toNumber(),
        ruleKey: rule.accountKey,
        description: 'Refund reversal',
      },
    })

    await tx.financialAccount.update({
      where: { id: account.id },
      data: { balance: { decrement: reversal.toDecimalPlaces(2).toNumber() } },
    })
  }

  return { transactionId: reversalTx.id }
}

/**
 * Record an expense and deduct from the appropriate wallet.
 */
async function recordExpenseTransaction({ expenseId, accountKey = 'operations', amount, description }) {
  const decAmount = new Decimal(amount)

  return prisma.$transaction(async (tx) => {
    const account = await tx.financialAccount.findUnique({ where: { key: accountKey } })

    const transaction = await tx.financialTransaction.create({
      data: {
        type: 'EXPENSE',
        amount: decAmount.toDecimalPlaces(2).toNumber(),
        direction: 'debit',
        accountId: account?.id,
        description,
        reference: `EXPENSE-${expenseId}`,
      },
    })

    if (account) {
      await tx.financialAccount.update({
        where: { id: account.id },
        data: { balance: { decrement: decAmount.toDecimalPlaces(2).toNumber() } },
      })
    }

    return transaction
  })
}

/**
 * Record a marketing spend against the marketing wallet.
 */
async function recordMarketingSpend({ campaignId, amount, description }) {
  const decAmount = new Decimal(amount)

  return prisma.$transaction(async (tx) => {
    const account = await tx.financialAccount.findUnique({ where: { key: 'marketing' } })

    const transaction = await tx.financialTransaction.create({
      data: {
        type: 'MARKETING_SPEND',
        amount: decAmount.toDecimalPlaces(2).toNumber(),
        direction: 'debit',
        accountId: account?.id,
        description,
        metadata: { campaignId },
      },
    })

    if (account) {
      await tx.financialAccount.update({
        where: { id: account.id },
        data: { balance: { decrement: decAmount.toDecimalPlaces(2).toNumber() } },
      })
    }

    return transaction
  })
}

/**
 * Get a summary of all financial accounts with available (balance - committed).
 */
async function getWalletSummary() {
  const accounts = await prisma.financialAccount.findMany({
    where: { isActive: true },
    orderBy: { sortOrder: 'asc' },
  })

  return accounts.map((a) => ({
    ...a,
    balance: parseFloat(a.balance),
    committed: parseFloat(a.committed),
    available: parseFloat(new Decimal(a.balance).minus(new Decimal(a.committed)).toDecimalPlaces(2)),
  }))
}

/**
 * Total allocated cash (sum of all wallet balances).
 */
async function getTotalAllocated() {
  const result = await prisma.financialAccount.aggregate({
    _sum: { balance: true, committed: true },
    where: { isActive: true },
  })

  return {
    totalAllocated: parseFloat(result._sum.balance || 0),
    totalCommitted: parseFloat(result._sum.committed || 0),
  }
}

module.exports = {
  allocatePayment,
  commitFulfillmentFunds,
  releaseFulfillmentCommitment,
  reverseAllocation,
  recordExpenseTransaction,
  recordMarketingSpend,
  getWalletSummary,
  getTotalAllocated,
}
