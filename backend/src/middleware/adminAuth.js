/**
 * Admin authentication and authorization middleware.
 * Uses a separate JWT secret from customer tokens.
 * All admin endpoints MUST use requireAdmin.
 */

const jwt = require('jsonwebtoken')
const config = require('../config')

function requireAdmin(req, res, next) {
  const token = extractAdminToken(req)
  if (!token) return res.status(401).json({ error: 'Admin authentication required' })

  try {
    const payload = jwt.verify(token, config.jwt.adminSecret)
    if (payload.type !== 'admin') return res.status(403).json({ error: 'Forbidden' })
    req.adminUser = payload
    next()
  } catch (err) {
    return res.status(401).json({ error: 'Invalid or expired admin token' })
  }
}

/**
 * Role-based access control.
 * Usage: requireRole('ADMIN', 'SUPER_ADMIN')
 */
function requireRole(...roles) {
  return (req, res, next) => {
    if (!req.adminUser) return res.status(401).json({ error: 'Not authenticated' })
    if (!roles.includes(req.adminUser.role)) {
      return res.status(403).json({ error: `Requires role: ${roles.join(' or ')}` })
    }
    next()
  }
}

function extractAdminToken(req) {
  const auth = req.headers.authorization
  if (auth && auth.startsWith('Bearer ')) return auth.slice(7)
  return null
}

module.exports = { requireAdmin, requireRole }
