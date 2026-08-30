'use client'
import { useParams } from 'next/navigation'
import { useQuery } from '@tanstack/react-query'
import { api } from '@/lib/api'
import { ProductCard } from '@/components/products/ProductCard'

export default function CategoryPage() {
  const { slug } = useParams<{ slug: string }>()
  const label = slug.charAt(0).toUpperCase() + slug.slice(1)

  const { data, isLoading } = useQuery({
    queryKey: ['products', slug],
    queryFn: () => api.get<any>(`/api/products?category=${slug}&pageSize=48`),
  })

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">{label}</h1>
        {data?.pagination && (
          <p className="text-sm text-gray-400 mt-1">{data.pagination.total} products</p>
        )}
      </div>

      {isLoading && (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="animate-pulse">
              <div className="aspect-square bg-gray-100 rounded-xl mb-3" />
              <div className="h-3 bg-gray-100 rounded w-1/2 mb-2" />
              <div className="h-4 bg-gray-100 rounded w-3/4" />
            </div>
          ))}
        </div>
      )}

      {!isLoading && data?.data?.length === 0 && (
        <div className="text-center py-24 text-gray-400">
          <p className="text-lg">No products found in {label}.</p>
        </div>
      )}

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {data?.data?.map((p: any) => <ProductCard key={p.id} product={p} />)}
      </div>
    </div>
  )
}
