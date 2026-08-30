require('dotenv').config()

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

  yoco: {
    secretKey: process.env.YOCO_SECRET_KEY,
    publicKey: process.env.YOCO_PUBLIC_KEY,
  },

  rateLimit: {
    windowMs: 15 * 60 * 1000, // 15 min
    max: 200,
    adminMax: 500,
  },
}
