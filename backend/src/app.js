require('dotenv').config()
require('express-async-errors')

const express = require('express')
const cors = require('cors')
const helmet = require('helmet')
const morgan = require('morgan')
const config = require('./config')
const { errorHandler, notFound } = require('./middleware/errorHandler')
const { publicLimiter, adminLimiter } = require('./middleware/rateLimiter')

// Route imports
const publicAuthRoutes = require('./routes/public/auth')
const publicProductRoutes = require('./routes/public/products')
const publicCategoryRoutes = require('./routes/public/categories')
const publicBrandRoutes = require('./routes/public/brands')
const publicCartRoutes = require('./routes/public/cart')
const publicCheckoutRoutes = require('./routes/public/checkout')
const publicOrderRoutes = require('./routes/public/orders')
const publicReturnRoutes = require('./routes/public/returns')
const publicContactRoutes = require('./routes/public/contact')
const publicTrackRoutes = require('./routes/public/track')
const publicStoreInfoRoutes = require('./routes/public/storeInfo')

const adminAuthRoutes = require('./routes/admin/auth')
const adminDashboardRoutes = require('./routes/admin/dashboard')
const adminProductRoutes = require('./routes/admin/products')
const adminSupplierRoutes = require('./routes/admin/suppliers')
const adminInventoryRoutes = require('./routes/admin/inventory')
const adminOrderRoutes = require('./routes/admin/orders')
const adminFinanceRoutes = require('./routes/admin/finance')
const adminExpenseRoutes = require('./routes/admin/expenses')
const adminMarketingRoutes = require('./routes/admin/marketing')
const adminCustomerRoutes = require('./routes/admin/customers')
const adminRefundRoutes = require('./routes/admin/refunds')
const adminAnalyticsRoutes = require('./routes/admin/analytics')
const adminSettingsRoutes = require('./routes/admin/settings')
const adminAlertRoutes = require('./routes/admin/alerts')
const adminAuditRoutes = require('./routes/admin/audit')
const adminUploadRoutes = require('./routes/admin/upload')
const adminCategoriesRoutes = require('./routes/admin/categories')
const adminEnquiriesRoutes = require('./routes/admin/enquiries')
const adminEmailRoutes = require('./routes/admin/email')
const adminChatRoutes = require('./routes/admin/chat')

const app = express()

// Security headers
app.use(helmet())

// CORS — strict origin control
app.use(cors({
  origin: [config.cors.frontendUrl, config.cors.adminUrl],
  credentials: true,
}))

app.use(express.json({ limit: '10mb' }))
app.use(express.urlencoded({ extended: true, limit: '10mb' }))

if (config.isDev) {
  app.use(morgan('dev'))
}

// Health check (no auth, no rate limit)
app.get('/health', (req, res) => res.json({ status: 'ok', timestamp: new Date() }))

// ── Public (Storefront) API ────────────────────────────────────────────────────
app.use('/api/auth', publicLimiter, publicAuthRoutes)
app.use('/api/products', publicLimiter, publicProductRoutes)
app.use('/api/categories', publicLimiter, publicCategoryRoutes)
app.use('/api/brands', publicLimiter, publicBrandRoutes)
app.use('/api/cart', publicLimiter, publicCartRoutes)
app.use('/api/checkout', publicLimiter, publicCheckoutRoutes)
app.use('/api/orders', publicLimiter, publicOrderRoutes)
app.use('/api/returns', publicLimiter, publicReturnRoutes)
app.use('/api/contact', publicLimiter, publicContactRoutes)
app.use('/api/track', publicLimiter, publicTrackRoutes)
app.use('/api/store-info', publicLimiter, publicStoreInfoRoutes)

// ── Admin API ──────────────────────────────────────────────────────────────────
// Admin routes use a separate rate limiter and require admin JWT on all routes
// (adminAuth middleware is applied per-route inside each router)
app.use('/api/admin/auth', adminLimiter, adminAuthRoutes)
app.use('/api/admin/dashboard', adminLimiter, adminDashboardRoutes)
app.use('/api/admin/products', adminLimiter, adminProductRoutes)
app.use('/api/admin/suppliers', adminLimiter, adminSupplierRoutes)
app.use('/api/admin/inventory', adminLimiter, adminInventoryRoutes)
app.use('/api/admin/orders', adminLimiter, adminOrderRoutes)
app.use('/api/admin/finance', adminLimiter, adminFinanceRoutes)
app.use('/api/admin/expenses', adminLimiter, adminExpenseRoutes)
app.use('/api/admin/marketing', adminLimiter, adminMarketingRoutes)
app.use('/api/admin/customers', adminLimiter, adminCustomerRoutes)
app.use('/api/admin/refunds', adminLimiter, adminRefundRoutes)
app.use('/api/admin/analytics', adminLimiter, adminAnalyticsRoutes)
app.use('/api/admin/settings', adminLimiter, adminSettingsRoutes)
app.use('/api/admin/alerts', adminLimiter, adminAlertRoutes)
app.use('/api/admin/audit', adminLimiter, adminAuditRoutes)
app.use('/api/admin/upload', adminLimiter, adminUploadRoutes)
app.use('/api/admin/categories', adminLimiter, adminCategoriesRoutes)
app.use('/api/admin/enquiries', adminLimiter, adminEnquiriesRoutes)
app.use('/api/admin/email', adminLimiter, adminEmailRoutes)
app.use('/api/admin/chat', adminLimiter, adminChatRoutes)

// 404 and error handlers
app.use(notFound)
app.use(errorHandler)

module.exports = app
