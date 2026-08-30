require('dotenv').config()

// Validate required secrets at startup — fail fast rather than fail silently
const REQUIRED = ['JWT_SECRET', 'JWT_ADMIN_SECRET', 'DATABASE_URL']
const missing = REQUIRED.filter(k => !process.env[k])
if (missing.length) {
  console.error(`[Config] Missing required env vars: ${missing.join(', ')}`)
  process.exit(1)
}

module.exports = {
  port: parseInt(process.env.PORT) || 3001,
  nodeEnv: process.env.NODE_ENV || 'development',
  isDev: process.env.NODE_ENV !== 'production',

  jwt: {
    secret: process.env.JWT_SECRET,
    adminSecret: process.env.JWT_ADMIN_SECRET,
    expiresIn: process.env.JWT_EXPIRES_IN || '7d',
    adminExpiresIn: process.env.JWT_ADMIN_EXPIRES_IN || '8h',
  },

  cors: {
    frontendUrl: process.env.FRONTEND_URL || 'http://localhost:3000',
    adminUrl: process.env.ADMIN_URL || 'http://localhost:3002',
  },

  cloudinary: {
    cloudName: process.env.CLOUDINARY_CLOUD_NAME,
    apiKey: process.env.CLOUDINARY_API_KEY,
    apiSecret: process.env.CLOUDINARY_API_SECRET,
  },

  payfast: {
    merchantId: process.env.PAYFAST_MERCHANT_ID,
    merchantKey: process.env.PAYFAST_MERCHANT_KEY,
    passphrase: process.env.PAYFAST_PASSPHRASE || '',
    sandbox: process.env.PAYFAST_SANDBOX !== 'false',
  },

  rateLimit: {
    windowMs: 15 * 60 * 1000, // 15 min
    max: 200,
    adminMax: 500,
  },
}
