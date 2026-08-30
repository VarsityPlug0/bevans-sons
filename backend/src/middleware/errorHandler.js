const config = require('../config')

function errorHandler(err, req, res, next) {
  // Prisma known errors
  if (err.code === 'P2002') {
    return res.status(409).json({ error: 'A record with this value already exists', field: err.meta?.target })
  }
  if (err.code === 'P2025') {
    return res.status(404).json({ error: 'Record not found' })
  }

  // Validation errors
  if (err.name === 'ZodError') {
    return res.status(400).json({ error: 'Validation failed', details: err.errors })
  }

  const status = err.status || err.statusCode || 500
  const message = err.message || 'Internal server error'

  if (config.isDev) {
    console.error('[Error]', err)
  }

  res.status(status).json({
    error: message,
    ...(config.isDev && { stack: err.stack }),
  })
}

function notFound(req, res) {
  res.status(404).json({ error: `Route ${req.method} ${req.path} not found` })
}

module.exports = { errorHandler, notFound }
