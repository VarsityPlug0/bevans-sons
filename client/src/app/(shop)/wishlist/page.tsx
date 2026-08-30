'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Heart, Trash2, ShoppingBag } from 'lucide-react'
import { useWishlistStore } from '@/store/wishlistStore'

export default function WishlistPage() {
  const { items, removeItem, clear } = useWishlistStore()
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])

  if (!mounted) return null

  return (
    <div className="max-w-5xl mx-auto px-6 py-16">
      {/* Header */}
      <div className="mb-10">
        <p className="text-[11px] font-semibold tracking-[0.2em] uppercase text-brand-gold mb-2">Saved Items</p>
        <h1 className="font-bebas text-5xl uppercase text-brand-black">My Wishlist</h1>
        {items.length > 0 && (
          <p className="text-sm text-brand-muted mt-1">{items.length} item{items.length !== 1 ? 's' : ''} saved</p>
        )}
      </div>

      {items.length === 0 ? (
        <div className="text-center py-20">
          <div className="w-20 h-20 bg-brand-light rounded-full flex items-center justify-center mx-auto mb-5">
            <Heart className="w-8 h-8 text-brand-muted" />
          </div>
          <h2 className="font-bebas text-3xl uppercase text-brand-black mb-3">Your wishlist is empty</h2>
          <p className="text-brand-muted text-sm mb-8">Browse our collection and tap the heart icon to save items you love.</p>
          <Link
            href="/products"
            className="inline-block bg-brand-black text-white px-8 py-3.5 text-[11px] font-bold tracking-[0.18em] uppercase hover:bg-brand-dark transition-colors"
          >
            Explore Products
          </Link>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
            {items.map((item) => (
              <div key={item.productId} className="group relative">
                <Link href={`/products/${item.slug}`} className="block">
                  <div className="aspect-square bg-brand-light overflow-hidden relative mb-3">
                    {item.imageUrl ? (
                      <Image
                        src={item.imageUrl}
                        alt={item.productName}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-brand-muted text-xs">No image</div>
                    )}
                  </div>
                </Link>

                {/* Remove button */}
                <button
                  onClick={() => removeItem(item.productId)}
                  className="absolute top-3 right-3 p-1.5 bg-white/90 hover:bg-white transition-colors"
                  aria-label="Remove from wishlist"
                >
                  <Heart className="w-4 h-4 fill-brand-black text-brand-black" />
                </button>

                <div>
                  {item.brand && (
                    <p className="text-[10px] font-semibold tracking-[0.15em] uppercase text-brand-muted mb-0.5">{item.brand}</p>
                  )}
                  <Link href={`/products/${item.slug}`}>
                    <p className="text-sm font-semibold text-brand-black leading-snug mb-1 hover:text-brand-gold transition-colors">{item.productName}</p>
                  </Link>
                  <p className="text-sm font-bold text-brand-black mb-3">R{item.price.toFixed(2)}</p>
                  <Link
                    href={`/products/${item.slug}`}
                    className="flex items-center gap-1.5 text-[10px] font-bold tracking-[0.12em] uppercase text-brand-black hover:text-brand-gold transition-colors"
                  >
                    <ShoppingBag className="w-3.5 h-3.5" /> View & Add to Cart
                  </Link>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-10 flex justify-end">
            <button
              onClick={clear}
              className="flex items-center gap-2 text-xs text-brand-muted hover:text-red-500 transition-colors"
            >
              <Trash2 className="w-3.5 h-3.5" /> Clear wishlist
            </button>
          </div>
        </>
      )}
    </div>
  )
}
