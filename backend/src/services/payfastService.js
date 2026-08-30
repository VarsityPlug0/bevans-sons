const crypto = require('crypto')

const isSandbox = process.env.PAYFAST_SANDBOX !== 'false'
const PAYFAST_URL = isSandbox
  ? 'https://sandbox.payfast.co.za/eng/process'
  : 'https://www.payfast.co.za/eng/process'

function getMerchantConfig() {
  const merchantId = process.env.PAYFAST_MERCHANT_ID
  const merchantKey = process.env.PAYFAST_MERCHANT_KEY
  if (!merchantId || !merchantKey) throw new Error('PayFast credentials not configured')
  return { merchantId, merchantKey }
}

/**
 * Generate the MD5 signature for a PayFast payment.
 * Parameters must be in the exact order PayFast expects.
 */
function generateSignature(params, passphrase) {
  // Build query string in param order, excluding empty values and signature itself
  const queryString = Object.entries(params)
    .filter(([, v]) => v !== '' && v !== null && v !== undefined)
    .map(([k, v]) => `${k}=${encodeURIComponent(String(v)).replace(/%20/g, '+')}`)
    .join('&')

  const stringToHash = passphrase
    ? `${queryString}&passphrase=${encodeURIComponent(passphrase).replace(/%20/g, '+')}`
    : queryString

  return crypto.createHash('md5').update(stringToHash).digest('hex')
}

/**
 * Build the PayFast payment data for an order.
 * Returns { url, fields } — client should POST fields to url.
 */
function buildPaymentData({ order, customer, returnUrl, cancelUrl, notifyUrl }) {
  const { merchantId, merchantKey } = getMerchantConfig()
  const passphrase = process.env.PAYFAST_PASSPHRASE || ''

  const amount = parseFloat(order.totalAmount).toFixed(2)

  // Parameters in the exact order PayFast requires for signature
  const params = {
    merchant_id: merchantId,
    merchant_key: merchantKey,
    return_url: returnUrl,
    cancel_url: cancelUrl,
    notify_url: notifyUrl,
    name_first: customer.firstName,
    name_last: customer.lastName,
    email_address: customer.email,
    m_payment_id: order.id,
    amount,
    item_name: `Order ${order.orderNumber}`,
    item_description: `Bevans Sons — ${order.orderNumber}`,
  }

  const signature = generateSignature(params, passphrase || undefined)

  return {
    url: PAYFAST_URL,
    fields: { ...params, signature },
  }
}

/**
 * Verify an incoming PayFast ITN (Instant Transaction Notification).
 * Returns true if the notification is valid.
 */
async function verifyITN(body) {
  const passphrase = process.env.PAYFAST_PASSPHRASE || ''

  // 1. Validate the signature
  const { signature, ...rest } = body
  const computedSig = generateSignature(rest, passphrase || undefined)
  if (computedSig !== signature) return { valid: false, reason: 'Invalid signature' }

  // 2. Validate with PayFast server (required by PayFast spec)
  const validationUrl = isSandbox
    ? 'https://sandbox.payfast.co.za/eng/query/validate'
    : 'https://www.payfast.co.za/eng/query/validate'

  try {
    const queryString = Object.entries(body)
      .map(([k, v]) => `${encodeURIComponent(k)}=${encodeURIComponent(v)}`)
      .join('&')

    const response = await fetch(validationUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: queryString,
    })
    const text = await response.text()
    if (!text.includes('VALID')) return { valid: false, reason: 'PayFast server validation failed' }
  } catch (err) {
    return { valid: false, reason: 'Could not reach PayFast validation server' }
  }

  return { valid: true }
}

module.exports = { buildPaymentData, verifyITN, PAYFAST_URL }
