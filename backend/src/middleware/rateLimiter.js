const rateLimit = require('express-rate-limit')
const config = require('../config')

const publicLimiter = rateLimit({
  windowMs: config.rateLimit.windowMs,
  max: config.rateLimit.max,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: 'Too many requests. Please try again later.' },
})

const adminLimiter = rateLimit({
  windowMs: config.rateLimit.windowMs,
  max: config.rateLimit.adminMax,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: 'Too many requests.' },
})

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 min
  max: 10,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: 'Too many login attempts. Please try again in 15 minutes.' },
})

module.exports = { publicLimiter, adminLimiter, authLimiter }
