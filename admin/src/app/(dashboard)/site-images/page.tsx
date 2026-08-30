'use client'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { useRef, useState } from 'react'
import dynamic from 'next/dynamic'
import api from '@/lib/api'
import { Upload, Link as LinkIcon, Check, X, Scissors } from 'lucide-react'

const ImageCropper = dynamic(() => import('@/components/ui/ImageCropper'), { ssr: false })

const SITE_IMAGE_KEYS = [
  { key: 'site_image_hero', label: 'Homepage Hero', section: 'Homepage', hint: '1920×1080 recommended' },
  { key: 'site_image_new_arrivals', label: 'New Arrivals Banner', section: 'Homepage', hint: '1200×600 recommended' },
  { key: 'site_image_best_sellers', label: 'Best Sellers Banner', section: 'Homepage', hint: '1200×600 recommended' },
  { key: 'site_image_limited_drop', label: 'Limited Drop Banner', section: 'Homepage', hint: '1920×900 recommended' },
  { key: 'site_image_cat_men', label: 'Men Category', section: 'Categories', hint: '600×800 recommended' },
  { key: 'site_image_cat_women', label: 'Women Category', section: 'Categories', hint: '600×800 recommended' },
  { key: 'site_image_cat_lifestyle', label: 'Lifestyle Category', section: 'Categories', hint: '600×800 recommended' },
]

export default function SiteImagesPage() {
  const qc = useQueryClient()
  const fileRefs = useRef<Record<string, HTMLInputElement | null>>({})
  const [editing, setEditing] = useState<string | null>(null)
  const [urlInput, setUrlInput] = useState<Record<string, string>>({})
  const [uploading, setUploading] = useState<string | null>(null)
  const [saving, setSaving] = useState<string | null>(null)
  const [saved, setSaved] = useState<string | null>(null)
  const [cropSrc, setCropSrc] = useState<{ key: string; src: string } | null>(null)

  const { data: settings } = useQuery({
    queryKey: ['site-images'],
    queryFn: () => api.get<any[]>('/api/admin/settings'),
    select: (data: any[]) => {
      const map: Record<string, string> = {}
      data.forEach((s: any) => { if (s.key.startsWith('site_image_')) map[s.key] = s.value })
      return map
    },
  })

  async function saveUrl(key: string, url: string) {
    setSaving(key)
    try {
      await api.put('/api/admin/settings', { [key]: url })
      qc.invalidateQueries({ queryKey: ['site-images'] })
      setSaved(key)
      setEditing(null)
      setTimeout(() => setSaved(null), 2000)
    } catch {}
    setSaving(null)
  }

  async function uploadBlob(key: string, blob: Blob) {
    setUploading(key)
    setCropSrc(null)
    try {
      const ab = await blob.arrayBuffer()
      const bytes = new Uint8Array(ab)
      let binary = ''
      for (let i = 0; i < bytes.length; i++) binary += String.fromCharCode(bytes[i])
      const base64 = btoa(binary)
      const data = await api.post<{ url: string }>('/api/admin/upload', { file: base64, mimeType: 'image/jpeg' })
      await saveUrl(key, data.url)
    } catch {}
    setUploading(null)
  }

  async function handleFile(key: string, e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return
    e.target.value = ''
    const objectUrl = URL.createObjectURL(file)
    setCropSrc({ key, src: objectUrl })
  }

  const sections = [...new Set(SITE_IMAGE_KEYS.map(k => k.section))]

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Site Images</h1>
        <p className="text-sm text-gray-500 mt-1">Upload or update images used across your storefront</p>
      </div>

      {sections.map(section => (
        <div key={section}>
          <h2 className="text-xs font-bold tracking-widest uppercase text-gray-400 mb-4">{section}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
            {SITE_IMAGE_KEYS.filter(k => k.section === section).map(({ key, label, hint }) => {
              const currentUrl = settings?.[key] ?? ''
              const isUploading = uploading === key
              const isSaving = saving === key
              const isSaved = saved === key
              const isEditing = editing === key

              return (
                <div key={key} className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                  {/* Image preview */}
                  <div
                    className="relative group bg-gray-100 cursor-pointer"
                    style={{ aspectRatio: '16/9' }}
                    onClick={() => fileRefs.current[key]?.click()}
                  >
                    {currentUrl ? (
                      <>
                        <img src={currentUrl} alt={label} className="w-full h-full object-cover" />
                        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
                          <div className="flex flex-col items-center gap-1 text-white">
                            <Upload className="w-6 h-6" />
                            <span className="text-xs font-medium">Change</span>
                          </div>
                        </div>
                        <button
                          type="button"
                          onClick={e => { e.stopPropagation(); setCropSrc({ key, src: currentUrl }) }}
                          className="absolute top-2 left-2 w-7 h-7 bg-black/70 rounded-full flex items-center justify-center text-white hover:bg-black transition-colors"
                          title="Crop"
                        >
                          <Scissors className="w-3.5 h-3.5" />
                        </button>
                        <button
                          type="button"
                          onClick={e => { e.stopPropagation(); saveUrl(key, '') }}
                          className="absolute top-2 right-2 w-7 h-7 bg-black/70 rounded-full flex items-center justify-center text-white hover:bg-red-500 transition-colors"
                          title="Remove"
                        >
                          <X className="w-3.5 h-3.5" />
                        </button>
                      </>
                    ) : (
                      <div className="w-full h-full flex flex-col items-center justify-center gap-2 text-gray-400">
                        {isUploading
                          ? <div className="w-6 h-6 border-2 border-gray-400 border-t-transparent rounded-full animate-spin" />
                          : <>
                              <Upload className="w-6 h-6" />
                              <span className="text-xs">Click to upload</span>
                            </>
                        }
                      </div>
                    )}
                  </div>

                  <input
                    ref={el => { fileRefs.current[key] = el }}
                    type="file"
                    accept="image/*"
                    onChange={e => handleFile(key, e)}
                    className="hidden"
                  />

                  {/* Label + URL input */}
                  <div className="p-3 space-y-2">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-xs font-semibold text-gray-900">{label}</p>
                        <p className="text-[10px] text-gray-400">{hint}</p>
                      </div>
                      {isSaved && <Check className="w-4 h-4 text-green-500" />}
                    </div>

                    {isEditing ? (
                      <div className="flex gap-2">
                        <input
                          autoFocus
                          value={urlInput[key] ?? ''}
                          onChange={e => setUrlInput(u => ({ ...u, [key]: e.target.value }))}
                          onKeyDown={e => e.key === 'Enter' && saveUrl(key, urlInput[key] ?? '')}
                          placeholder="https://..."
                          className="flex-1 border border-gray-200 rounded-lg px-2.5 py-1.5 text-xs focus:outline-none focus:ring-2 focus:ring-gray-900"
                        />
                        <button
                          onClick={() => saveUrl(key, urlInput[key] ?? '')}
                          disabled={isSaving}
                          className="px-2.5 py-1.5 bg-gray-900 text-white rounded-lg text-xs hover:bg-gray-800 disabled:opacity-40"
                        >
                          {isSaving ? '…' : 'Save'}
                        </button>
                        <button onClick={() => setEditing(null)} className="text-gray-400 hover:text-gray-700">
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={() => { setEditing(key); setUrlInput(u => ({ ...u, [key]: currentUrl })) }}
                        className="flex items-center gap-1.5 text-[11px] text-gray-400 hover:text-gray-700 transition-colors"
                      >
                        <LinkIcon className="w-3 h-3" />
                        {currentUrl ? 'Change URL' : 'Paste URL instead'}
                      </button>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      ))}

      {cropSrc && (
        <ImageCropper
          src={cropSrc.src}
          onDone={blob => {
            const key = cropSrc.key
            URL.revokeObjectURL(cropSrc.src)
            uploadBlob(key, blob)
          }}
          onCancel={() => {
            URL.revokeObjectURL(cropSrc.src)
            setCropSrc(null)
          }}
        />
      )}
    </div>
  )
}
