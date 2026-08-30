'use client'
import { useSearchParams, useRouter } from 'next/navigation'
import { Suspense } from 'react'
import { ProductGrid } from '@/components/products/ProductGrid'

function ProductsContent() {
  const params = useSearchParams()
  const router = useRouter()
  const search = params.get('search') ?? ''
  const sort = params.get('sort') ?? 'newest'
  const category = params.get('category') ?? ''

  return (
    <div className="max-w-7xl mx-auto px-6 py-10">
      <div className="flex items-center justify-between mb-8 flex-wrap gap-4">
        <h1 className="text-3xl font-bold">All Sneakers</h1>
        <div className="flex gap-3 items-center">
          <input
            defaultValue={search}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                const url = new URLSearchParams(params.toString())
                url.set('search', (e.target as HTMLInputElement).value)
                router.push(`/products?${url.toString()}`)
              }
            }}
            placeholder="Search..."
            className="border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none"
          />
          <select value={sort} onChange={(e) => { const url = new URLSearchParams(params.toString()); url.set('sort', e.target.value); router.push(`/products?${url.toString()}`) }} className="border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none">
            <option value="newest">Newest</option>
            <option value="price_asc">Price: Low to High</option>
            <option value="price_desc">Price: High to Low</option>
            <option value="name">Name A–Z</option>
          </select>
        </div>
      </div>
      <ProductGrid search={search} sort={sort} category={category} limit={48} />
    </div>
  )
}

export default function ProductsPage() {
  return (
    <Suspense>
      <ProductsContent />
    </Suspense>
  )
}
