const app = require('./app')
const config = require('./config')
const prisma = require('./lib/prisma')

async function start() {
  try {
    await prisma.$connect()
    console.log('[DB] Connected to PostgreSQL')
  } catch (err) {
    console.error('[DB] Failed to connect:', err.message)
    process.exit(1)
  }

  const server = app.listen(config.port, () => {
    console.log(`[Server] Running on http://localhost:${config.port} (${config.nodeEnv})`)
  })

  const shutdown = async (signal) => {
    console.log(`\n[Server] ${signal} received. Shutting down...`)
    server.close(async () => {
      await prisma.$disconnect()
      console.log('[Server] Closed.')
      process.exit(0)
    })
  }

  process.on('SIGTERM', () => shutdown('SIGTERM'))
  process.on('SIGINT', () => shutdown('SIGINT'))
}

start()
