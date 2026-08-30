const express = require('express')
const { v2: cloudinary } = require('cloudinary')
const config = require('../../config')
const { requireAdmin } = require('../../middleware/adminAuth')

const router = express.Router()
router.use(requireAdmin)

cloudinary.config({
  cloud_name: config.cloudinary.cloudName,
  api_key: config.cloudinary.apiKey,
  api_secret: config.cloudinary.apiSecret,
})

// POST /api/admin/upload
// Body: { file: base64String, mimeType: 'image/jpeg', filename: 'product.jpg' }
router.post('/', async (req, res) => {
  const { file, mimeType = 'image/jpeg' } = req.body
  if (!file) return res.status(400).json({ error: 'No file provided' })

  const dataUri = `data:${mimeType};base64,${file}`

  const result = await cloudinary.uploader.upload(dataUri, {
    folder: 'bevans-sons/products',
    transformation: [{ width: 1200, height: 1200, crop: 'limit', quality: 'auto', fetch_format: 'auto' }],
  })

  res.json({ url: result.secure_url, publicId: result.public_id })
})

// DELETE /api/admin/upload
// Body: { publicId: 'folder/filename' }
router.delete('/', async (req, res) => {
  const { publicId } = req.body
  if (!publicId) return res.status(400).json({ error: 'No publicId provided' })
  await cloudinary.uploader.destroy(publicId)
  res.json({ message: 'Deleted' })
})

module.exports = router
