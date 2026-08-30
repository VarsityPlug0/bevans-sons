'use client'
import { useQuery, useMutation } from '@tanstack/react-query'
import { useState, useRef } from 'react'
import { useRouter } from 'next/navigation'
import api from '@/lib/api'
import { formatCurrency, formatPercent } from '@/lib/utils'
import { ArrowLeft, Plus, Trash2, Upload, X, ImagePlus, Scissors } from 'lucide-react'
import Link from 'next/link'
import dynamic from 'next/dynamic'
const ImageCropper = dynamic(() => import('@/components/ui/ImageCropper'), { ssr: false })

interface Variant { sku: string; size: string; color: string; colorHex: string; initialStock: string }

export default function NewProductPage() {
  const router = useRouter()
  const [form, setForm] = useState({
    name: '', description: '', categoryId: '', brandId: '', sku: '',
    supplierCost: '', inboundShipping: '0', fulfillmentCost: '0', packagingCost: '0',
    paymentFeePercent: '0.029', otherDirectCosts: '0', sellingPrice: '',
    lowStockThreshold: '5', tags: '',
  })
  const [variants, setVariants] = useState<Variant[]>([
    { sku: '', size: '', color: '', colorHex: '', initialStock: '0' },
  ])
  const [preview, setPreview] = useState<any>(null)
  const [images, setImages] = useState<string[]>([])
  const [urlInput, setUrlInput] = useState('')
  const [uploading, setUploading] = useState(false)
  const [uploadError, setUploadError] = useState('')
  const [cropSrc, setCropSrc] = useState<string | null>(null)
  const fileRef = useRef<HTMLInputElement>(null)

  const { data: categories } = useQuery({ queryKey: ['categories'], queryFn: () => api.get<any[]>('/api/categories') })
  const { data: brands } = useQuery({ queryKey: ['brands'], queryFn: () => api.get<any[]>('/api/brands') })

  const previewPricing = useMutation({
    mutationFn: () => api.post(`/api/admin/products/preview/pricing-preview`, {
      supplierCost: parseFloat(form.supplierCost),
      inboundShipping: parseFloat(form.inboundShipping),
      fulfillmentCost: parseFloat(form.fulfillmentCost),
      packagingCost: parseFloat(form.packagingCost),
      paymentFeePercent: parseFloat(form.paymentFeePercent),
      otherDirectCosts: parseFloat(form.otherDirectCosts),
      sellingPrice: parseFloat(form.sellingPrice),
    }),
    onSuccess: (data) => setPreview(data),
  })

  const create = useMutation({
    mutationFn: () => api.post('/api/admin/products', {
      ...form,
      supplierCost: parseFloat(form.supplierCost),
      inboundShipping: parseFloat(form.inboundShipping),
      fulfillmentCost: parseFloat(form.fulfillmentCost),
      packagingCost: parseFloat(form.packagingCost),
      paymentFeePercent: parseFloat(form.paymentFeePercent),
      otherDirectCosts: parseFloat(form.otherDirectCosts),
      sellingPrice: parseFloat(form.sellingPrice),
      lowStockThreshold: parseInt(form.lowStockThreshold),
      tags: form.tags ? form.tags.split(',').map((t) => t.trim()).filter(Boolean) : [],
      images,
      variants: variants.map((v) => ({ ...v, initialStock: parseInt(v.initialStock) || 0 })),
    }),
    onSuccess: (data: any) => router.push(`/products/${data.id}`),
  })

  const setVariant = (i: number, field: keyof Variant, value: string) =>
    setVariants((vs) => vs.map((v, idx) => idx === i ? { ...v, [field]: value } : v))

  async function handleFileUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return
    e.target.value = ''
    setUploadError('')
    const objectUrl = URL.createObjectURL(file)
    setCropSrc(objectUrl)
  }

  async function uploadBlob(blob: Blob) {
    setUploading(true)
    setCropSrc(null)
    try {
      const ab = await blob.arrayBuffer()
      const bytes = new Uint8Array(ab)
      let binary = ''
      for (let i = 0; i < bytes.length; i++) binary += String.fromCharCode(bytes[i])
      const base64 = btoa(binary)
      const data = await api.post<{ url: string }>('/api/admin/upload', { file: base64, mimeType: 'image/jpeg' })
      setImages(prev => [...prev, data.url])
    } catch (err: any) {
      setUploadError(err.message ?? 'Upload failed')
    }
    setUploading(false)
  }

  function addUrl() {
    const url = urlInput.trim()
    if (!url) return
    setImages(prev => [...prev, url])
    setUrlInput('')
  }

  const canPreview = form.supplierCost && form.sellingPrice

  return (
    <div className="space-y-6 max-w-4xl">
      <div className="flex items-center gap-3">
        <Link href="/products" className="text-gray-400 hover:text-gray-700">
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <h1 className="text-2xl font-bold text-gray-900">Add Product</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          {/* Basic info */}
          <div className="bg-white rounded-xl border border-gray-200 p-6 space-y-4">
            <h2 className="font-semibold text-gray-900">Basic Info</h2>
            <div className="grid grid-cols-2 gap-4">
              <div className="col-span-2">
                <label className="text-xs font-medium text-gray-600 block mb-1">Product Name *</label>
                <input value={form.name} onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))} className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-900" />
              </div>
              <div className="col-span-2">
                <label className="text-xs font-medium text-gray-600 block mb-1">Description</label>
                <textarea rows={3} value={form.description} onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))} className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-900 resize-none" />
              </div>
              <div>
                <label className="text-xs font-medium text-gray-600 block mb-1">Category *</label>
                <select value={form.categoryId} onChange={(e) => setForm((f) => ({ ...f, categoryId: e.target.value }))} className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-900">
                  <option value="">Select category</option>
                  {categories?.map((c: any) => <option key={c.id} value={c.id}>{c.name}</option>)}
                </select>
              </div>
              <div>
                <label className="text-xs font-medium text-gray-600 block mb-1">Brand</label>
                <select value={form.brandId} onChange={(e) => setForm((f) => ({ ...f, brandId: e.target.value }))} className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-900">
                  <option value="">Select brand</option>
                  {brands?.map((b: any) => <option key={b.id} value={b.id}>{b.name}</option>)}
                </select>
              </div>
              <div>
                <label className="text-xs font-medium text-gray-600 block mb-1">SKU <span className="text-gray-400 font-normal">(optional)</span></label>
                <input value={form.sku} onChange={(e) => setForm((f) => ({ ...f, sku: e.target.value }))} placeholder="Leave blank to auto-generate" className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-900 placeholder:text-gray-300" />
              </div>
              <div>
                <label className="text-xs font-medium text-gray-600 block mb-1">Tags (comma separated)</label>
                <input value={form.tags} onChange={(e) => setForm((f) => ({ ...f, tags: e.target.value }))} placeholder="running, lifestyle..." className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-900" />
              </div>
            </div>
          </div>

          {/* Pricing */}
          <div className="bg-white rounded-xl border border-gray-200 p-6 space-y-4">
            <h2 className="font-semibold text-gray-900">Pricing & Costs</h2>
            <div className="grid grid-cols-2 gap-4">
              {[
                { field: 'supplierCost', label: 'Supplier Cost (R) *' },
                { field: 'sellingPrice', label: 'Selling Price (R) *' },
                { field: 'inboundShipping', label: 'Inbound Shipping (R)' },
                { field: 'fulfillmentCost', label: 'Fulfillment Cost (R)' },
                { field: 'packagingCost', label: 'Packaging Cost (R)' },
                { field: 'otherDirectCosts', label: 'Other Direct Costs (R)' },
                { field: 'paymentFeePercent', label: 'Payment Fee (e.g. 0.029)' },
                { field: 'lowStockThreshold', label: 'Low Stock Alert Threshold' },
              ].map(({ field, label }) => (
                <div key={field}>
                  <label className="text-xs font-medium text-gray-600 block mb-1">{label}</label>
                  <input
                    type="number"
                    step="any"
                    value={(form as any)[field]}
                    onChange={(e) => setForm((f) => ({ ...f, [field]: e.target.value }))}
                    className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-900"
                  />
                </div>
              ))}
            </div>
            <button
              onClick={() => previewPricing.mutate()}
              disabled={!canPreview || previewPricing.isPending}
              className="border border-gray-200 px-4 py-2 rounded-lg text-sm hover:bg-gray-50 disabled:opacity-40"
            >
              Preview Pricing Metrics
            </button>

            {preview && (
              <div className="grid grid-cols-3 gap-3 mt-2 p-4 bg-gray-50 rounded-lg text-sm">
                <div><p className="text-xs text-gray-400">Total Direct Cost</p><p className="font-medium">{formatCurrency(parseFloat(preview.totalDirectCost))}</p></div>
                <div><p className="text-xs text-gray-400">Contribution</p><p className="font-medium">{formatCurrency(parseFloat(preview.expectedContribution))}</p></div>
                <div><p className="text-xs text-gray-400">Margin</p><p className={`font-medium ${parseFloat(preview.contributionMargin) >= 0.25 ? 'text-green-600' : 'text-red-600'}`}>{formatPercent(parseFloat(preview.contributionMargin))}</p></div>
                <div><p className="text-xs text-gray-400">Recommended Price</p><p className="font-medium">{formatCurrency(parseFloat(preview.recommended?.recommendedPrice))}</p></div>
                <div><p className="text-xs text-gray-400">Minimum Price</p><p className="font-medium">{formatCurrency(parseFloat(preview.recommended?.minimumPrice))}</p></div>
                <div><p className="text-xs text-gray-400">Markup</p><p className="font-medium">{parseFloat(preview.markup).toFixed(2)}x</p></div>
                {preview.validation && !preview.validation.valid && (
                  <div className="col-span-3 text-red-600 text-xs">{preview.validation.errors?.join(' · ')}</div>
                )}
              </div>
            )}
          </div>

          {/* Variants */}
          <div className="bg-white rounded-xl border border-gray-200 p-6 space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="font-semibold text-gray-900">Variants</h2>
              <button
                onClick={() => setVariants((vs) => [...vs, { sku: '', size: '', color: '', colorHex: '', initialStock: '0' }])}
                className="flex items-center gap-1.5 text-sm text-gray-600 hover:text-gray-900 border border-gray-200 px-3 py-1.5 rounded-lg"
              >
                <Plus className="w-3.5 h-3.5" /> Add Variant
              </button>
            </div>
            <div className="space-y-3">
              {variants.map((v, i) => (
                <div key={i} className="grid grid-cols-5 gap-2 items-start">
                  {(['sku', 'size', 'color', 'colorHex', 'initialStock'] as const).map((field) => (
                    <div key={field}>
                      {i === 0 && <label className="text-xs text-gray-400 block mb-1 capitalize">{field === 'colorHex' ? 'Hex' : field === 'initialStock' ? 'Stock' : field}</label>}
                      <input
                        value={v[field]}
                        onChange={(e) => setVariant(i, field, e.target.value)}
                        placeholder={field === 'sku' ? 'Auto-generate' : field === 'colorHex' ? '#000000' : field === 'initialStock' ? '0' : ''}
                        className="w-full border border-gray-200 rounded-lg px-2 py-1.5 text-xs focus:outline-none focus:ring-1 focus:ring-gray-900"
                      />
                    </div>
                  ))}
                  {variants.length > 1 && (
                    <button onClick={() => setVariants((vs) => vs.filter((_, idx) => idx !== i))} className="mt-5 text-red-400 hover:text-red-600">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-4">

          {/* Images */}
          <div className="bg-white rounded-xl border border-gray-200 p-5">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-semibold text-gray-900">Images</h3>
              <span className="text-xs text-gray-400">{images.length} / 10</span>
            </div>

            {images.length > 0 && (
              <div className="grid grid-cols-2 gap-2 mb-3">
                {images.map((url, i) => (
                  <div key={i} className="relative group aspect-square rounded-lg overflow-hidden bg-gray-100">
                    <img src={url} alt={`Image ${i + 1}`} className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                      <button type="button" onClick={() => setCropSrc(url)} className="w-7 h-7 bg-white/20 rounded-full flex items-center justify-center text-white hover:bg-white/40 transition-colors" title="Crop">
                        <Scissors className="w-3 h-3" />
                      </button>
                      <button type="button" onClick={() => setImages(prev => prev.filter((_, idx) => idx !== i))} className="w-7 h-7 bg-red-500 rounded-full flex items-center justify-center text-white hover:bg-red-600 transition-colors">
                        <X className="w-3.5 h-3.5" />
                      </button>
                    </div>
                    {i === 0 && <span className="absolute top-1 left-1 text-[9px] font-bold bg-gray-900 text-white px-1.5 py-0.5 rounded">MAIN</span>}
                  </div>
                ))}
              </div>
            )}

            {images.length < 10 && (
              <>
                <button
                  type="button"
                  onClick={() => fileRef.current?.click()}
                  disabled={uploading}
                  className="w-full border-2 border-dashed border-gray-200 hover:border-gray-400 rounded-lg py-4 flex flex-col items-center gap-1.5 text-gray-400 hover:text-gray-600 transition-colors disabled:opacity-40"
                >
                  {uploading
                    ? <div className="w-5 h-5 border-2 border-gray-400 border-t-transparent rounded-full animate-spin" />
                    : <Upload className="w-5 h-5" />
                  }
                  <span className="text-xs font-medium">{uploading ? 'Uploading...' : 'Upload image'}</span>
                  <span className="text-[10px]">JPEG, PNG, WebP</span>
                </button>
                <input ref={fileRef} type="file" accept="image/*" onChange={handleFileUpload} className="hidden" />
                <div className="flex gap-2 mt-2">
                  <input
                    value={urlInput}
                    onChange={e => setUrlInput(e.target.value)}
                    onKeyDown={e => e.key === 'Enter' && (e.preventDefault(), addUrl())}
                    placeholder="Or paste image URL..."
                    className="flex-1 border border-gray-200 rounded-lg px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-gray-900"
                  />
                  <button
                    type="button"
                    onClick={addUrl}
                    disabled={!urlInput.trim()}
                    className="flex-shrink-0 w-8 h-8 bg-gray-900 text-white rounded-lg flex items-center justify-center hover:bg-gray-700 disabled:opacity-40 transition-colors"
                  >
                    <ImagePlus className="w-4 h-4" />
                  </button>
                </div>
              </>
            )}
            {uploadError && <p className="text-red-500 text-xs mt-2">{uploadError}</p>}
          </div>

          {/* Actions */}
          <div className="bg-white rounded-xl border border-gray-200 p-5 space-y-3">
            <p className="text-sm text-gray-500">Product will be created as <span className="font-medium text-gray-900">DRAFT</span> and must pass through the approval workflow before publishing.</p>
            {create.isError && (
              <p className="text-sm text-red-600">{(create.error as any)?.message ?? 'Failed to create product'}</p>
            )}
            <button
              onClick={() => create.mutate()}
              disabled={!form.name || !form.categoryId || !form.supplierCost || !form.sellingPrice || create.isPending}
              className="w-full bg-gray-900 text-white rounded-lg py-2.5 text-sm font-medium hover:bg-gray-800 disabled:opacity-40"
            >
              {create.isPending ? 'Creating...' : 'Create Product'}
            </button>
            <Link href="/products" className="block text-center text-sm text-gray-400 hover:text-gray-600">
              Cancel
            </Link>
          </div>
        </div>
      </div>

      {cropSrc && (
        <ImageCropper
          src={cropSrc}
          onDone={blob => { URL.revokeObjectURL(cropSrc); uploadBlob(blob) }}
          onCancel={() => { URL.revokeObjectURL(cropSrc); setCropSrc(null) }}
        />
      )}
    </div>
  )
}
