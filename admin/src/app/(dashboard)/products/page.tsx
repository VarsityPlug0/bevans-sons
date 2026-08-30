'use client'
import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'
import Link from 'next/link'
import api from '@/lib/api'
import { formatCurrency, formatPercent, statusColor } from '@/lib/utils'
import { Plus, Search, ChevronRight } from 'lucide-react'

const STATUSES = ['', 'DRAFT', 'PRICING_REVIEW', 'MARKET_REVIEW', 'APPROVED', 'PUBLISHED', 'REJECTED']

export default function ProductsPage() {
  const [status, setStatus] = useState('')
  const [search, setSearch] = useState('')
  const [page, setPage] = useState(1)

  const { data, isLoading } = useQuery({
    queryKey: ['admin-products', status, search, page],
    queryFn: () => api.get<any>(`/api/admin/products?status=${status}&search=${search}&page=${page}&pageSize=20`),
  })

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Products</h1>
          <p className="text-sm text-gray-500">Manage your product catalog and pricing</p>
        </div>
        <Link href="/products/new" className="flex items-center gap-2 bg-gray-900 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-800 transition-colors">
          <Plus className="w-4 h-4" />
          Add Product
        </Link>
      </div>

      {/* Filters */}
      <div className="flex gap-3 items-center flex-wrap">
        <div className="relative flex-1 min-w-48">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            value={search}
            onChange={(e) => { setSearch(e.target.value); setPage(1) }}
            placeholder="Search products..."
            className="w-full pl-9 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gray-900"
          />
        </div>
        <div className="flex gap-2 flex-wrap">
          {STATUSES.map((s) => (
            <button
              key={s}
              onClick={() => { setStatus(s); setPage(1) }}
              className={`px-3 py-1.5 text-xs rounded-full font-medium transition-colors border ${status === s ? 'bg-gray-900 text-white border-gray-900' : 'bg-white text-gray-600 border-gray-200 hover:bg-gray-50'}`}
            >
              {s || 'All'}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-4 py-3 text-left font-medium text-gray-600">Product</th>
              <th className="px-4 py-3 text-left font-medium text-gray-600">Status</th>
              <th className="px-4 py-3 text-right font-medium text-gray-600">Supplier Cost</th>
              <th className="px-4 py-3 text-right font-medium text-gray-600">Selling Price</th>
              <th className="px-4 py-3 text-right font-medium text-gray-600">Contribution</th>
              <th className="px-4 py-3 text-right font-medium text-gray-600">Margin</th>
              <th className="px-4 py-3 text-right font-medium text-gray-600">Stock</th>
              <th className="px-4 py-3" />
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {isLoading && (
              <tr><td colSpan={8} className="px-4 py-8 text-center text-gray-400">Loading...</td></tr>
            )}
            {data?.data?.map((p: any) => {
              const totalStock = p.variants?.reduce((s: number, v: any) => s + (v.inventory?.available ?? 0), 0) ?? 0
              const thumb = p.images?.[0]
              return (
                <tr key={p.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-gray-100 flex-shrink-0 overflow-hidden">
                        {thumb
                          ? <img src={thumb} alt={p.name} className="w-full h-full object-cover" />
                          : <div className="w-full h-full flex items-center justify-center text-gray-300 text-xs">—</div>
                        }
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">{p.name}</p>
                        <p className="text-xs text-gray-400">{p.sku ?? p.id.slice(0, 8)} · {p.category?.name}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${statusColor(p.status)}`}>{p.status.replace('_', ' ')}</span>
                  </td>
                  <td className="px-4 py-3 text-right font-mono text-gray-700">{formatCurrency(p.supplierCost)}</td>
                  <td className="px-4 py-3 text-right font-mono font-medium">{formatCurrency(p.sellingPrice)}</td>
                  <td className="px-4 py-3 text-right font-mono">{formatCurrency(parseFloat(p.expectedContribution))}</td>
                  <td className="px-4 py-3 text-right">
                    <span className={`font-medium ${parseFloat(p.contributionMargin) >= 0.25 ? 'text-green-600' : 'text-red-600'}`}>
                      {formatPercent(parseFloat(p.contributionMargin))}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <span className={`font-medium ${totalStock === 0 ? 'text-red-600' : totalStock <= p.lowStockThreshold ? 'text-yellow-600' : 'text-gray-700'}`}>
                      {totalStock}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <Link href={`/products/${p.id}`} className="text-gray-400 hover:text-gray-700">
                      <ChevronRight className="w-4 h-4" />
                    </Link>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>

        {data?.pagination && (
          <div className="px-4 py-3 border-t border-gray-100 flex items-center justify-between text-sm text-gray-500">
            <span>{data.pagination.total} products</span>
            <div className="flex gap-2">
              <button disabled={page === 1} onClick={() => setPage(p => p - 1)} className="px-3 py-1 rounded border border-gray-200 disabled:opacity-40 hover:bg-gray-50">Prev</button>
              <span className="px-3 py-1">Page {page} of {data.pagination.totalPages}</span>
              <button disabled={page >= data.pagination.totalPages} onClick={() => setPage(p => p + 1)} className="px-3 py-1 rounded border border-gray-200 disabled:opacity-40 hover:bg-gray-50">Next</button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
