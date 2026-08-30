'use client'
import Link from 'next/link'
import Image from 'next/image'
import { Heart } from 'lucide-react'
import { useState } from 'react'
import { useWishlistStore } from '@/store/wishlistStore'

interface Props {
  product: {
    id: string
    name: string
    slug: string
    sellingPrice: number | string
    images: string[]
    brand?: { name: string }
    variants?: { size?: string; color?: string; inventory?: { available: number } }[]
  }
}

export function ProductCard({ product }: Props) {
  const { toggle, isWishlisted } = useWishlistStore()
  const [mounted, setMounted] = useState(false)
  useState(() => { setMounted(true) })
  const liked = mounted && isWishlisted(product.id)
  const price = parseFloat(product.sellingPrice as string)
  const imageUrl = product.images?.[0]
  const totalStock = product.variants?.reduce((s, v) => s + (v.inventory?.available ?? 0), 0) ?? 0
  const isOutOfStock = totalStock === 0

  const sizes = Array.from(new Set(product.variants?.map(v => v.size).filter(Boolean))) as string[]
  const colors = Array.from(new Set(product.variants?.map(v => v.color).filter(Boolean))) as string[]

  const colorMap: Record<string, string> = {
    black: '#111111',
    white: '#FFFFFF',
    grey: '#A7A7AA',
    gray: '#A7A7AA',
    cream: '#E9ECE6',
    tan: '#C8B993',
    green: '#68705C',
    navy: '#1D2A3A',
    beige: '#D4C5A9',
  }

  return (
    <div className="group relative">
      {/* Image */}
      <Link href={`/products/${product.slug}`} className="block">
        <div className="aspect-square bg-brand-light overflow-hidden relative mb-3">
          {imageUrl ? (
            <Image
              src={imageUrl}
              alt={product.name}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-brand-muted text-xs">No image</div>
          )}
          {isOutOfStock && (
            <div className="absolute inset-0 bg-white/70 flex items-center justify-center">
              <span className="text-[11px] font-semibold tracking-[0.12em] uppercase text-brand-muted">Sold Out</span>
            </div>
          )}
        </div>
      </Link>

      {/* Heart */}
      <button
        onClick={(e) => {
          e.preventDefault()
          toggle({
            productId: product.id,
            productName: product.name,
            slug: product.slug,
            imageUrl: product.images?.[0] ?? null,
            price,
            brand: product.brand?.name,
          })
        }}
        className="absolute top-3 right-3 p-1.5 bg-white/90 hover:bg-white transition-colors"
        aria-label="Wishlist"
      >
        <Heart
          className={`w-4 h-4 transition-colors ${liked ? 'fill-brand-black text-brand-black' : 'text-brand-muted'}`}
        />
      </button>

      {/* Info */}
      <div>
        {product.brand && (
          <p className="text-[10px] font-semibold tracking-[0.15em] uppercase text-brand-muted mb-0.5">
            {product.brand.name}
          </p>
        )}
        <Link href={`/products/${product.slug}`}>
          <p className="text-sm font-semibold text-brand-black leading-snug mb-1 hover:text-brand-gold transition-colors">
            {product.name}
          </p>
        </Link>
        <p className="text-sm font-bold text-brand-black mb-2">R{price.toFixed(2)}</p>

        {/* Size pills */}
        {sizes.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-2">
            {sizes.slice(0, 6).map(size => (
              <span
                key={size}
                className="text-[10px] font-medium text-brand-muted border border-brand-mid px-1.5 py-0.5"
              >
                {size}
              </span>
            ))}
          </div>
        )}

        {/* Color swatches */}
        {colors.length > 0 && (
          <div className="flex gap-1.5">
            {colors.slice(0, 4).map(color => (
              <span
                key={color}
                className="w-3.5 h-3.5 rounded-full border border-brand-mid"
                style={{ backgroundColor: colorMap[color.toLowerCase()] ?? color }}
                title={color}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
