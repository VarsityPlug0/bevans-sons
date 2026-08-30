const prisma = require('../lib/prisma')

/**
 * Record an auditable admin action.
 */
async function audit({ userId, action, entity, entityId, previousValue = null, newValue = null, req = null }) {
  return prisma.auditLog.create({
    data: {
      userId: userId ?? null,
      action,
      entity,
      entityId: entityId ?? null,
      previousValue: previousValue ?? undefined,
      newValue: newValue ?? undefined,
      ipAddress: req?.ip ?? null,
      userAgent: req?.headers?.['user-agent'] ?? null,
    },
  })
}

/**
 * Middleware-style audit wrapper — call with before/after snapshots.
 */
function createAuditEntry(req, { action, entity, entityId }) {
  return {
    log: async ({ previousValue, newValue }) => {
      await audit({
        userId: req.adminUser?.id ?? null,
        action,
        entity,
        entityId,
        previousValue,
        newValue,
        req,
      })
    },
  }
}

module.exports = { audit, createAuditEntry }
