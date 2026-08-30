'use client'
import { useQuery } from '@tanstack/react-query'
import { useParams } from 'next/navigation'
import { useState, useMemo } from 'react'
import Image from 'next/image'
import { api } from '@/lib/api'
import { useCartStore } from '@/store/cartStore'
import { ShoppingBag, Check } from 'lucide-react'

export default function ProductDetailPage() {
  const { slug } = useParams() as { slug: string }
  const { addItem, openCart } = useCartStore()
  const [selectedColor, setSelectedColor] = useState<string | null>(null)
  const [selectedVariantId, setSelectedVariantId] = useState<string | null>(null)
  const [activeImageIdx, setActiveImageIdx] = useState(0)
  const [added, setAdded] = useState(false)

  const { data: product, isLoading } = useQuery({
    queryKey: ['product', slug],
    queryFn: () => api.get<any>(`/api/products/${slug}`),
  })

  // Derive unique colors in order they appear in variants
  const uniqueColors = useMemo(() => {
    if (!product?.variants) return []
    const seen = new Set<string>()
    const colors: { color: string; colorHex?: string }[] = []
    for (const v of product.variants) {
      if (v.color && !seen.has(v.color)) {
        seen.add(v.color)
        colors.push({ color: v.color, colorHex: v.colorHex })
      }
    }
    return colors
  }, [product])

  const hasColors = uniqueColors.length > 1

  // Map each unique color to an image by index
  const images: string[] = product?.images ?? []

  // When a color is selected, show the image at that color's index
  const colorImageIndex = useMemo(() => {
    if (!selectedColor) return activeImageIdx
    const idx = uniqueColors.findIndex((c) => c.color === selectedColor)
    return idx >= 0 && idx < images.length ? idx : 0
  }, [selectedColor, uniqueColors, images, activeImageIdx])

  const displayImageIdx = hasColors && selectedColor ? colorImageIndex : activeImageIdx
  const displayImageUrl = images[displayImageIdx] ?? null

  // Variants for the selected color (or all if no colors)
  const filteredVariants = useMemo(() => {
    if (!product?.variants) return []
    if (!hasColors || !selectedColor) return product.variants
    return product.variants.filter((v: any) => v.color === selectedColor)
  }, [product, hasColors, selectedColor])

  const selectedVariant = product?.variants?.find((v: any) => v.id === selectedVariantId)
  const price = parseFloat(selectedVariant?.priceOverride ?? product?.sellingPrice ?? 0)
  const availableStock = selectedVariant?.inventory?.available ?? 0
  const isOutOfStock = selectedVariantId ? availableStock === 0 : false

  function handleColorSelect(color: string) {
    setSelectedColor(color)
    setSelectedVariantId(null) // reset size when color changes
  }

  function handleAddToCart() {
    if (!selectedVariantId || !selectedVariant || isOutOfStock) return
    addItem({
      variantId: selectedVariant.id,
      productId: product.id,
      productName: product.name,
      slug: product.slug,
      size: selectedVariant.size,
      color: selectedVariant.color,
      sku: selectedVariant.sku,
      imageUrl: displayImageUrl,
      unitPrice: price,
    })
    setAdded(true)
    setTimeout(() => setAdded(false), 2000)
    openCart()
  }

  if (isLoading) return <div className="max-w-5xl mx-auto px-6 py-16 text-center text-gray-400">Loading...</div>
  if (!product) return <div className="max-w-5xl mx-auto px-6 py-16 text-center text-gray-400">Product not found.</div>

  return (
    <div className="max-w-5xl mx-auto px-6 py-12">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Image gallery */}
        <div className="space-y-3">
          <div className="aspect-square bg-gray-100 rounded-2xl overflow-hidden relative">
            {displayImageUrl ? (
              <Image src={displayImageUrl} alt={product.name} fill className="object-cover" />
            ) : (
              <div className="flex items-center justify-center h-full text-gray-300">No image</div>
            )}
          </div>

          {/* Thumbnail strip — only shown when multiple images and no color switching */}
          {images.length > 1 && !hasColors && (
            <div className="flex gap-2 overflow-x-auto pb-1">
              {images.map((img: string, idx: number) => (
                <button
                  key={idx}
                  onClick={() => setActiveImageIdx(idx)}
                  className={`flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 transition-colors ${
                    activeImageIdx === idx ? 'border-gray-900' : 'border-transparent'
                  }`}
                >
                  <Image src={img} alt={`${product.name} ${idx + 1}`} width={64} height={64} className="object-cover w-full h-full" />
                </button>
              ))}
            </div>
          )}

          {/* Color thumbnails strip */}
          {hasColors && images.length > 1 && (
            <div className="flex gap-2 overflow-x-auto pb-1">
              {uniqueColors.map(({ color, colorHex }, idx) => {
                const img = images[idx]
                return (
                  <button
                    key={color}
                    onClick={() => handleColorSelect(color)}
                    title={color}
                    className={`flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 transition-colors ${
                      selectedColor === color ? 'border-gray-900' : 'border-transparent'
                    }`}
                  >
                    {img ? (
                      <Image src={img} alt={color} width={64} height={64} className="object-cover w-full h-full" />
                    ) : (
                      <div
                        className="w-full h-full rounded-lg"
                        style={{ backgroundColor: colorHex ?? '#ccc' }}
                      />
                    )}
                  </button>
                )
              })}
            </div>
          )}
        </div>

        {/* Info */}
        <div>
          {product.brand && (
            <p className="text-sm font-medium text-gray-400 uppercase tracking-widest mb-2">{product.brand.name}</p>
          )}
          <h1 className="text-3xl font-bold text-gray-900 mb-3">{product.name}</h1>
          <p className="text-2xl font-bold mb-6">R{price.toFixed(2)}</p>

          {product.description && (
            <p className="text-gray-600 text-sm leading-relaxed mb-8">{product.description}</p>
          )}

          {/* Color selector */}
          {hasColors && (
            <div className="mb-6">
              <p className="text-sm font-semibold text-gray-700 mb-3">
                Color{selectedColor && <span className="font-normal text-gray-500 ml-2">{selectedColor}</span>}
              </p>
              <div className="flex flex-wrap gap-2">
                {uniqueColors.map(({ color, colorHex }, idx) => (
                  <button
                    key={color}
                    onClick={() => handleColorSelect(color)}
                    title={color}
                    className={`w-9 h-9 rounded-full border-2 transition-all ${
                      selectedColor === color
                        ? 'border-gray-900 scale-110'
                        : 'border-gray-200 hover:border-gray-400'
                    }`}
                    style={{
                      backgroundColor: colorHex ?? (images[idx] ? undefined : '#ccc'),
                      backgroundImage: !colorHex && images[idx] ? `url(${images[idx]})` : undefined,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                    }}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Size selector */}
          {product.variants?.length > 0 && (
            <div className="mb-6">
              <p className="text-sm font-semibold text-gray-700 mb-3">
                {hasColors && !selectedColor ? 'Select a color first' : 'Select Size'}
              </p>
              <div className="flex flex-wrap gap-2">
                {filteredVariants.map((v: any) => {
                  const stock = v.inventory?.available ?? 0
                  return (
                    <button
                      key={v.id}
                      onClick={() => setSelectedVariantId(v.id)}
                      disabled={stock === 0 || (hasColors && !selectedColor)}
                      className={`px-4 py-2 rounded-lg border text-sm font-medium transition-all ${
                        selectedVariantId === v.id
                          ? 'bg-gray-900 text-white border-gray-900'
                          : stock === 0
                          ? 'bg-gray-50 text-gray-300 border-gray-200 cursor-not-allowed line-through'
                          : hasColors && !selectedColor
                          ? 'bg-gray-50 text-gray-300 border-gray-200 cursor-not-allowed'
                          : 'bg-white text-gray-700 border-gray-200 hover:border-gray-400'
                      }`}
                    >
                      {v.size ?? v.sku}
                    </button>
                  )
                })}
              </div>
              {selectedVariant && (
                <p className={`text-xs mt-2 ${availableStock <= 3 ? 'text-orange-600 font-medium' : 'text-gray-400'}`}>
                  {availableStock === 0 ? 'Out of stock' : availableStock <= 3 ? `Only ${availableStock} left!` : `${availableStock} in stock`}
                </p>
              )}
            </div>
          )}

          <button
            onClick={handleAddToCart}
            disabled={!selectedVariantId || isOutOfStock || (hasColors && !selectedColor)}
            className={`w-full py-4 rounded-xl font-semibold text-sm flex items-center justify-center gap-2 transition-all ${
              added
                ? 'bg-green-600 text-white'
                : !selectedVariantId || (hasColors && !selectedColor)
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                : isOutOfStock
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                : 'bg-gray-900 text-white hover:bg-gray-800 active:scale-[0.98]'
            }`}
          >
            {added ? (
              <><Check className="w-5 h-5" /> Added!</>
            ) : (
              <><ShoppingBag className="w-5 h-5" /> {
                !selectedVariantId || (hasColors && !selectedColor)
                  ? hasColors && !selectedColor ? 'Select a color' : 'Select a size'
                  : isOutOfStock ? 'Out of stock' : 'Add to Cart'
              }</>
            )}
          </button>
        </div>
      </div>
    </div>
  )
}
