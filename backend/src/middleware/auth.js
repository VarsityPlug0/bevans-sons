/**
 * Customer authentication middleware.
 * Verifies the customer JWT and attaches `req.customer`.
 */

const jwt = require('jsonwebtoken')
const config = require('../config')

function requireCustomer(req, res, next) {
  const token = extractToken(req)
  if (!token) return res.status(401).json({ error: 'Authentication required' })

  try {
    const payload = jwt.verify(token, config.jwt.secret)
    req.customer = payload
    next()
  } catch (err) {
    return res.status(401).json({ error: 'Invalid or expired token' })
  }
}

function optionalCustomer(req, res, next) {
  const token = extractToken(req)
  if (token) {
    try {
      req.customer = jwt.verify(token, config.jwt.secret)
    } catch (_) {
      // Invalid token — continue as guest
    }
  }
  next()
}

function extractToken(req) {
  const auth = req.headers.authorization
  if (auth && auth.startsWith('Bearer ')) return auth.slice(7)
  return null
}

module.exports = { requireCustomer, optionalCustomer }
