'use client'
import { useState, useRef } from 'react'
import ReactCrop, { type Crop, type PixelCrop, centerCrop, makeAspectCrop } from 'react-image-crop'
import 'react-image-crop/dist/ReactCrop.css'
import { X, Check } from 'lucide-react'

interface Props {
  src: string
  onDone: (blob: Blob) => void
  onCancel: () => void
}

function centerAspectCrop(width: number, height: number): Crop {
  return centerCrop(
    makeAspectCrop({ unit: '%', width: 90 }, 1, width, height),
    width,
    height
  )
}

async function cropToBlob(image: HTMLImageElement, crop: PixelCrop): Promise<Blob> {
  const canvas = document.createElement('canvas')
  const scaleX = image.naturalWidth / image.width
  const scaleY = image.naturalHeight / image.height
  canvas.width = crop.width * scaleX
  canvas.height = crop.height * scaleY
  const ctx = canvas.getContext('2d')!
  ctx.drawImage(
    image,
    crop.x * scaleX, crop.y * scaleY,
    crop.width * scaleX, crop.height * scaleY,
    0, 0,
    canvas.width, canvas.height
  )
  return new Promise((resolve, reject) =>
    canvas.toBlob(b => b ? resolve(b) : reject(new Error('toBlob failed')), 'image/jpeg', 0.92)
  )
}

async function toLocalSrc(src: string): Promise<string> {
  if (src.startsWith('blob:') || src.startsWith('data:')) return src
  const res = await fetch(src)
  const blob = await res.blob()
  return URL.createObjectURL(blob)
}

export default function ImageCropper({ src, onDone, onCancel }: Props) {
  const imgRef = useRef<HTMLImageElement>(null)
  const [localSrc, setLocalSrc] = useState<string | null>(null)
  const [crop, setCrop] = useState<Crop>()
  const [completedCrop, setCompletedCrop] = useState<PixelCrop>()
  const [processing, setProcessing] = useState(false)
  const [error, setError] = useState('')

  useState(() => {
    toLocalSrc(src).then(setLocalSrc).catch(() => setLocalSrc(src))
  })

  function onImageLoad(e: React.SyntheticEvent<HTMLImageElement>) {
    const { width, height } = e.currentTarget
    const c = centerAspectCrop(width, height)
    setCrop(c)
    setCompletedCrop({
      unit: 'px',
      x: (c.x / 100) * width,
      y: (c.y / 100) * height,
      width: (c.width / 100) * width,
      height: (c.height / 100) * height,
    })
  }

  async function handleApply() {
    if (!imgRef.current || !completedCrop) return
    setProcessing(true)
    setError('')
    try {
      const blob = await cropToBlob(imgRef.current, completedCrop)
      onDone(blob)
    } catch {
      setError('Crop failed — try again.')
      setProcessing(false)
    }
  }

  return (
    <>
      <style>{`
        .ReactCrop__drag-handle::after { width:26px!important; height:26px!important; background:#111827!important; border-radius:4px!important; opacity:.9!important; }
        .ReactCrop__crop-selection { border:2px solid #111827!important; box-shadow:0 0 0 9999px rgba(0,0,0,0.6)!important; }
      `}</style>
      <div className="fixed inset-0 z-50 flex flex-col sm:items-center sm:justify-center bg-black/80" style={{ touchAction: 'none' }}>
        <div className="bg-white sm:rounded-xl w-full sm:max-w-2xl sm:mx-4 flex flex-col h-full sm:h-auto border border-gray-200 shadow-2xl">
          <div className="flex items-center justify-between px-5 py-4 border-b border-gray-200">
            <h2 className="font-semibold text-gray-900 text-sm">Crop Image</h2>
            <button onClick={onCancel} className="w-8 h-8 flex items-center justify-center rounded-full text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors">
              <X className="w-4 h-4" />
            </button>
          </div>
          <div className="flex-1 flex items-center justify-center bg-gray-900 p-3 overflow-hidden">
            {localSrc ? (
              <ReactCrop crop={crop} onChange={c => setCrop(c)} onComplete={c => setCompletedCrop(c)} style={{ maxHeight: '100%', maxWidth: '100%' }}>
                <img
                  ref={imgRef}
                  src={localSrc}
                  alt="Crop"
                  onLoad={onImageLoad}
                  crossOrigin="anonymous"
                  style={{ maxHeight: 'calc(100vh - 200px)', maxWidth: '100%', display: 'block', touchAction: 'none' }}
                />
              </ReactCrop>
            ) : (
              <div className="w-8 h-8 border-2 border-white border-t-transparent rounded-full animate-spin" />
            )}
          </div>
          <p className="text-center text-gray-400 text-xs py-2">Drag corners or edges to adjust</p>
          {error && <p className="text-red-500 text-xs text-center pb-2">{error}</p>}
          <div className="flex gap-3 px-5 py-4 border-t border-gray-200">
            <button onClick={onCancel} className="flex-1 py-2.5 rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-50 text-sm transition-colors">
              Cancel
            </button>
            <button
              onClick={handleApply}
              disabled={processing || !completedCrop?.width}
              className="flex-1 py-2.5 rounded-lg bg-gray-900 text-white font-semibold text-sm hover:bg-gray-800 disabled:opacity-40 flex items-center justify-center gap-2 transition-colors"
            >
              <Check className="w-4 h-4" />
              {processing ? 'Processing…' : 'Apply Crop'}
            </button>
          </div>
        </div>
      </div>
    </>
  )
}
