'use client'
import { useQuery } from '@tanstack/react-query'
import { api } from '@/lib/api'
import { ProductCard } from './ProductCard'

interface Props {
  category?: string
  search?: string
  sort?: string
  limit?: number
}

export function ProductGrid({ category = '', search = '', sort = 'newest', limit = 24 }: Props) {
  const { data, isLoading } = useQuery({
    queryKey: ['products', category, search, sort, limit],
    queryFn: () => api.get<any>(`/api/products?category=${category}&search=${search}&sort=${sort}&pageSize=${limit}`),
  })

  if (isLoading) {
    return (
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="aspect-square bg-gray-100 rounded-xl animate-pulse" />
        ))}
      </div>
    )
  }

  if (!data?.data?.length) {
    return <div className="text-center py-16 text-gray-400">No products found.</div>
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
      {data.data.map((product: any) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  )
}
