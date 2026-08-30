'use client'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { useParams, useRouter } from 'next/navigation'
import { useState, useRef } from 'react'
import api from '@/lib/api'
import { formatCurrency, formatPercent, statusColor } from '@/lib/utils'
import { ArrowLeft, ChevronRight, Upload, X, ImagePlus, Scissors } from 'lucide-react'
import Link from 'next/link'
import dynamic from 'next/dynamic'
const ImageCropper = dynamic(() => import('@/components/ui/ImageCropper'), { ssr: false })

const STATUS_FLOW: Record<string, string> = {
  DRAFT: 'PRICING_REVIEW',
  PRICING_REVIEW: 'MARKET_REVIEW',
  MARKET_REVIEW: 'APPROVED',
  APPROVED: 'PUBLISHED',
}

export default function ProductDetailPage() {
  const { id } = useParams<{ id: string }>()
  const router = useRouter()
  const qc = useQueryClient()
  const [rejectReason, setRejectReason] = useState('')
  const [showReject, setShowReject] = useState(false)
  const [images, setImages] = useState<string[]>([])
  const [urlInput, setUrlInput] = useState('')
  const [uploading, setUploading] = useState(false)
  const [uploadError, setUploadError] = useState('')
  const [savingImages, setSavingImages] = useState(false)
  const [cropSrc, setCropSrc] = useState<string | null>(null)
  const fileRef = useRef<HTMLInputElement>(null)

  const { data: product, isLoading } = useQuery({
    queryKey: ['admin-product', id],
    queryFn: () => api.get<any>(`/api/admin/products/${id}`),
  })

  const advance = useMutation({
    mutationFn: () => api.post(`/api/admin/products/${id}/advance-status`, {}),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['admin-product', id] }),
  })

  const reject = useMutation({
    mutationFn: () => api.post(`/api/admin/products/${id}/reject`, { reason: rejectReason }),
    onSuccess: () => { qc.invalidateQueries({ queryKey: ['admin-product', id] }); setShowReject(false) },
  })

  // Sync images from fetched product
  const productImages: string[] = product?.images ?? []

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
      await saveImages([...productImages, data.url])
    } catch (err: any) {
      setUploadError(err.message ?? 'Upload failed')
    }
    setUploading(false)
  }

  async function addUrl() {
    const url = urlInput.trim()
    if (!url) return
    setUrlInput('')
    await saveImages([...productImages, url])
  }

  async function removeImage(url: string) {
    await saveImages(productImages.filter(u => u !== url))
  }

  async function saveImages(newImages: string[]) {
    setSavingImages(true)
    try {
      await api.put(`/api/admin/products/${id}`, { images: newImages })
      qc.invalidateQueries({ queryKey: ['admin-product', id] })
    } catch {}
    setSavingImages(false)
  }

  if (isLoading) return <div className="text-gray-400 p-8">Loading...</div>
  if (!product) return <div className="text-gray-400 p-8">Product not found</div>

  const totalStock = product.variants?.reduce((s: number, v: any) => s + (v.inventory?.available ?? 0), 0) ?? 0
  const nextStatus = STATUS_FLOW[product.status]

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <Link href="/products" className="text-gray-400 hover:text-gray-700">
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">{product.name}</h1>
          <p className="text-sm text-gray-400">{product.sku} · {product.category?.name} · {product.brand?.name}</p>
        </div>
        <span className={`ml-auto px-3 py-1 rounded-full text-xs font-medium ${statusColor(product.status)}`}>
          {product.status.replace(/_/g, ' ')}
        </span>
      </div>

      {/* Workflow Actions */}
      {product.status !== 'PUBLISHED' && product.status !== 'REJECTED' && (
        <div className="bg-white rounded-xl border border-gray-200 p-5 flex items-center justify-between">
          <div>
            <p className="font-medium text-gray-900">Approval Workflow</p>
            <p className="text-sm text-gray-400">
              {product.status} <ChevronRight className="w-3 h-3 inline" /> {nextStatus}
            </p>
          </div>
          <div className="flex gap-3">
            {product.status !== 'DRAFT' && (
              <button
                onClick={() => setShowReject(true)}
                className="border border-red-200 text-red-600 px-4 py-2 rounded-lg text-sm font-medium hover:bg-red-50"
              >
                Reject
              </button>
            )}
            <button
              onClick={() => advance.mutate()}
              disabled={advance.isPending}
              className="bg-gray-900 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-800 disabled:opacity-40"
            >
              {advance.isPending ? 'Advancing...' : `Advance to ${nextStatus?.replace(/_/g, ' ')}`}
            </button>
          </div>
        </div>
      )}

      {advance.isError && (
        <div className="bg-red-50 border border-red-200 rounded-xl p-4 text-sm text-red-700">
          {(advance.error as any)?.message ?? 'Failed to advance status'}
        </div>
      )}

      {/* Reject modal */}
      {showReject && (
        <div className="fixed inset-0 bg-black/30 z-50 flex items-center justify-center">
          <div className="bg-white rounded-xl p-6 w-96 shadow-xl">
            <h3 className="font-bold mb-3">Reject Product</h3>
            <input
              value={rejectReason}
              onChange={(e) => setRejectReason(e.target.value)}
              placeholder="Rejection reason..."
              className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-900"
            />
            <div className="flex gap-3 mt-4">
              <button onClick={() => setShowReject(false)} className="flex-1 border border-gray-200 rounded-lg py-2 text-sm">Cancel</button>
              <button
                onClick={() => reject.mutate()}
                disabled={rejectReason.length < 5 || reject.isPending}
                className="flex-1 bg-red-600 text-white rounded-lg py-2 text-sm disabled:opacity-40"
              >
                Reject
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Pricing */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h2 className="font-semibold text-gray-900 mb-4">Pricing & Economics</h2>
            <div className="grid grid-cols-2 gap-4 text-sm">
              {[
                { label: 'Supplier Cost', value: formatCurrency(product.supplierCost) },
                { label: 'Inbound Shipping', value: formatCurrency(product.inboundShipping) },
                { label: 'Fulfillment Cost', value: formatCurrency(product.fulfillmentCost) },
                { label: 'Packaging Cost', value: formatCurrency(product.packagingCost) },
                { label: 'Total Direct Cost', value: formatCurrency(parseFloat(product.totalDirectCost)) },
                { label: 'Selling Price', value: formatCurrency(product.sellingPrice) },
                { label: 'Recommended Price', value: formatCurrency(parseFloat(product.recommendedPrice)) },
                { label: 'Minimum Price', value: formatCurrency(parseFloat(product.minimumPrice)) },
                { label: 'Contribution', value: formatCurrency(parseFloat(product.expectedContribution)) },
                { label: 'Margin', value: formatPercent(parseFloat(product.contributionMargin)) },
                { label: 'Markup', value: `${parseFloat(product.markup).toFixed(2)}x` },
              ].map(({ label, value }) => (
                <div key={label}>
                  <p className="text-xs text-gray-400">{label}</p>
                  <p className="font-medium text-gray-900">{value}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Variants */}
          <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
              <h2 className="font-semibold text-gray-900">Variants & Inventory</h2>
              <span className="text-sm text-gray-400">{totalStock} total units available</span>
            </div>
            <table className="w-full text-sm">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left font-medium text-gray-600">SKU</th>
                  <th className="px-4 py-3 text-left font-medium text-gray-600">Size</th>
                  <th className="px-4 py-3 text-left font-medium text-gray-600">Color</th>
                  <th className="px-4 py-3 text-right font-medium text-gray-600">Available</th>
                  <th className="px-4 py-3 text-right font-medium text-gray-600">Reserved</th>
                  <th className="px-4 py-3 text-right font-medium text-gray-600">Committed</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {product.variants?.map((v: any) => (
                  <tr key={v.id} className="hover:bg-gray-50">
                    <td className="px-4 py-3 font-mono text-xs text-gray-600">{v.sku}</td>
                    <td className="px-4 py-3">{v.size ?? '—'}</td>
                    <td className="px-4 py-3 flex items-center gap-2">
                      {v.colorHex && <span className="w-3 h-3 rounded-full border border-gray-200 flex-shrink-0" style={{ background: v.colorHex }} />}
                      {v.color ?? '—'}
                    </td>
                    <td className="px-4 py-3 text-right">
                      <span className={`font-medium ${(v.inventory?.available ?? 0) === 0 ? 'text-red-600' : 'text-gray-900'}`}>
                        {v.inventory?.available ?? 0}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-right text-gray-500">{v.inventory?.reserved ?? 0}</td>
                    <td className="px-4 py-3 text-right text-gray-500">{v.inventory?.committed ?? 0}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Market prices */}
          {product.marketPrices?.length > 0 && (
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h2 className="font-semibold text-gray-900 mb-4">Market Price History</h2>
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-left text-xs text-gray-400 border-b border-gray-100">
                    <th className="pb-2">Source</th>
                    <th className="pb-2 text-right">Low</th>
                    <th className="pb-2 text-right">Avg</th>
                    <th className="pb-2 text-right">High</th>
                    <th className="pb-2 text-right">My Price</th>
                    <th className="pb-2">Viability</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {product.marketPrices.map((mp: any) => (
                    <tr key={mp.id}>
                      <td className="py-2 text-gray-600">{mp.source}</td>
                      <td className="py-2 text-right font-mono">{formatCurrency(parseFloat(mp.marketLow))}</td>
                      <td className="py-2 text-right font-mono">{formatCurrency(parseFloat(mp.marketAverage))}</td>
                      <td className="py-2 text-right font-mono">{formatCurrency(parseFloat(mp.marketHigh))}</td>
                      <td className="py-2 text-right font-mono">{formatCurrency(parseFloat(mp.myPrice))}</td>
                      <td className="py-2">
                        <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${mp.viability === 'COMPETITIVE' ? 'bg-green-100 text-green-700' : mp.viability === 'REVIEW' ? 'bg-yellow-100 text-yellow-700' : 'bg-red-100 text-red-700'}`}>
                          {mp.viability}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Sidebar info */}
        <div className="space-y-4">

          {/* Images */}
          <div className="bg-white rounded-xl border border-gray-200 p-5">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-semibold text-gray-900">Images</h3>
              <span className="text-xs text-gray-400">{productImages.length} / 10</span>
            </div>

            {/* Image grid */}
            {productImages.length > 0 && (
              <div className="grid grid-cols-2 gap-2 mb-3">
                {productImages.map((url, i) => (
                  <div key={i} className="relative group aspect-square rounded-lg overflow-hidden bg-gray-100">
                    <img src={url} alt={`Product ${i + 1}`} className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                      <button
                        onClick={() => setCropSrc(url)}
                        className="w-7 h-7 bg-white/20 rounded-full flex items-center justify-center text-white hover:bg-white/40 transition-colors"
                        title="Crop"
                      >
                        <Scissors className="w-3 h-3" />
                      </button>
                      <button
                        onClick={() => removeImage(url)}
                        disabled={savingImages}
                        className="w-7 h-7 bg-red-500 rounded-full flex items-center justify-center text-white hover:bg-red-600 transition-colors disabled:opacity-40"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    </div>
                    {i === 0 && (
                      <span className="absolute top-1 left-1 text-[9px] font-bold bg-gray-900 text-white px-1.5 py-0.5 rounded">MAIN</span>
                    )}
                  </div>
                ))}
              </div>
            )}

            {/* Upload */}
            {productImages.length < 10 && (
              <>
                <button
                  type="button"
                  onClick={() => fileRef.current?.click()}
                  disabled={uploading || savingImages}
                  className="w-full border-2 border-dashed border-gray-200 hover:border-gray-400 rounded-lg py-4 flex flex-col items-center gap-1.5 text-gray-400 hover:text-gray-600 transition-colors disabled:opacity-40"
                >
                  {uploading ? (
                    <div className="w-5 h-5 border-2 border-gray-400 border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <Upload className="w-5 h-5" />
                  )}
                  <span className="text-xs font-medium">{uploading ? 'Uploading...' : 'Upload image'}</span>
                  <span className="text-[10px]">JPEG, PNG, WebP</span>
                </button>
                <input ref={fileRef} type="file" accept="image/*" onChange={handleFileUpload} className="hidden" />

                {/* URL input */}
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
                    disabled={!urlInput.trim() || savingImages}
                    className="flex-shrink-0 w-8 h-8 bg-gray-900 text-white rounded-lg flex items-center justify-center hover:bg-gray-700 disabled:opacity-40 transition-colors"
                  >
                    <ImagePlus className="w-4 h-4" />
                  </button>
                </div>
              </>
            )}

            {uploadError && <p className="text-red-500 text-xs mt-2">{uploadError}</p>}
          </div>

          <div className="bg-white rounded-xl border border-gray-200 p-5">
            <h3 className="font-semibold text-gray-900 mb-3">Details</h3>
            <div className="space-y-2 text-sm">
              <div><p className="text-xs text-gray-400">Category</p><p className="font-medium">{product.category?.name}</p></div>
              <div><p className="text-xs text-gray-400">Brand</p><p className="font-medium">{product.brand?.name ?? '—'}</p></div>
              <div><p className="text-xs text-gray-400">SKU</p><p className="font-mono">{product.sku ?? '—'}</p></div>
              <div><p className="text-xs text-gray-400">Low Stock Threshold</p><p className="font-medium">{product.lowStockThreshold}</p></div>
              {product.tags?.length > 0 && (
                <div>
                  <p className="text-xs text-gray-400 mb-1">Tags</p>
                  <div className="flex flex-wrap gap-1">
                    {product.tags.map((t: string) => (
                      <span key={t} className="px-2 py-0.5 bg-gray-100 text-gray-600 text-xs rounded-full">{t}</span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {product.supplierProducts?.length > 0 && (
            <div className="bg-white rounded-xl border border-gray-200 p-5">
              <h3 className="font-semibold text-gray-900 mb-3">Supplier</h3>
              {product.supplierProducts.map((sp: any) => (
                <div key={sp.id} className="text-sm space-y-1">
                  <p className="font-medium">{sp.supplier.name}</p>
                  {sp.supplierSku && <p className="text-xs text-gray-400">SKU: {sp.supplierSku}</p>}
                  {sp.supplierPrice && <p className="text-xs text-gray-400">Price: {formatCurrency(parseFloat(sp.supplierPrice))}</p>}
                  {sp.isPrimary && <span className="text-xs bg-blue-50 text-blue-600 px-2 py-0.5 rounded-full">Primary</span>}
                </div>
              ))}
            </div>
          )}

          {product.approvedAt && (
            <div className="bg-white rounded-xl border border-gray-200 p-5">
              <h3 className="font-semibold text-gray-900 mb-3">Timeline</h3>
              <div className="space-y-2 text-sm">
                <div><p className="text-xs text-gray-400">Created</p><p>{new Date(product.createdAt).toLocaleDateString('en-ZA')}</p></div>
                {product.approvedAt && <div><p className="text-xs text-gray-400">Approved</p><p>{new Date(product.approvedAt).toLocaleDateString('en-ZA')}</p></div>}
                {product.publishedAt && <div><p className="text-xs text-gray-400">Published</p><p>{new Date(product.publishedAt).toLocaleDateString('en-ZA')}</p></div>}
              </div>
            </div>
          )}
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
