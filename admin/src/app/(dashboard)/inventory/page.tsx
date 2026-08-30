'use client'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { useState, useMemo } from 'react'
import api from '@/lib/api'
import { Search, Package, AlertTriangle } from 'lucide-react'

type StockTab = 'all' | 'out' | 'low' | 'ok'

const TAB_LABELS: { key: StockTab; label: string; color: string; active: string }[] = [
  { key: 'all', label: 'All', color: 'text-gray-600 border-gray-300 bg-white hover:bg-gray-50', active: 'bg-gray-900 text-white border-gray-900' },
  { key: 'out', label: 'Out of Stock', color: 'text-red-600 border-red-200 bg-white hover:bg-red-50', active: 'bg-red-600 text-white border-red-600' },
  { key: 'low', label: 'Low Stock', color: 'text-yellow-700 border-yellow-200 bg-white hover:bg-yellow-50', active: 'bg-yellow-500 text-white border-yellow-500' },
  { key: 'ok', label: 'OK', color: 'text-green-700 border-green-200 bg-white hover:bg-green-50', active: 'bg-green-600 text-white border-green-600' },
]

export default function InventoryPage() {
  const qc = useQueryClient()
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('')
  const [tab, setTab] = useState<StockTab>('all')
  const [page, setPage] = useState(1)
  const [adjusting, setAdjusting] = useState<{ variantId: string; sku: string } | null>(null)
  const [adjQty, setAdjQty] = useState('')
  const [adjReason, setAdjReason] = useState('')

  const { data, isLoading } = useQuery({
    queryKey: ['inventory', search, page],
    queryFn: () => api.get<any>(`/api/admin/inventory?search=${search}&page=${page}&pageSize=200`),
  })

  const allVariants: any[] = data?.data ?? []

  const categories = useMemo(() => {
    const set = new Set<string>()
    allVariants.forEach((v) => { if (v.category) set.add(v.category) })
    return Array.from(set).sort()
  }, [allVariants])

  const filtered = useMemo(() => {
    return allVariants.filter((v) => {
      if (category && v.category !== category) return false
      if (tab === 'out') return v.isOutOfStock
      if (tab === 'low') return v.isLowStock
      if (tab === 'ok') return !v.isOutOfStock && !v.isLowStock
      return true
    })
  }, [allVariants, category, tab])

  const adjust = useMutation({
    mutationFn: ({ variantId, quantity, reason }: { variantId: string; quantity: number; reason: string }) =>
      api.post(`/api/admin/inventory/${variantId}/adjust`, { quantity, reason }),
    onSuccess: () => { qc.invalidateQueries({ queryKey: ['inventory'] }); setAdjusting(null); setAdjQty(''); setAdjReason('') },
  })

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Inventory</h1>
        <p className="text-sm text-gray-500">Movement-based stock tracking per size/variant</p>
      </div>

      {/* Status tabs */}
      <div className="flex gap-2 flex-wrap">
        {TAB_LABELS.map(({ key, label, color, active }) => (
          <button
            key={key}
            onClick={() => setTab(key)}
            className={`px-4 py-1.5 rounded-full text-sm font-medium border transition-colors ${tab === key ? active : color}`}
          >
            {label}
            {key !== 'all' && (
              <span className="ml-1.5 opacity-75">
                ({allVariants.filter(v =>
                  key === 'out' ? v.isOutOfStock :
                  key === 'low' ? v.isLowStock :
                  !v.isOutOfStock && !v.isLowStock
                ).length})
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Filters row */}
      <div className="flex gap-3 flex-wrap">
        <div className="relative flex-1 min-w-[200px] max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            value={search}
            onChange={(e) => { setSearch(e.target.value); setPage(1) }}
            placeholder="Search products or SKU..."
            className="w-full pl-9 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gray-900"
          />
        </div>
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="px-3 py-2 border border-gray-200 rounded-lg text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-900 bg-white"
        >
          <option value="">All Categories</option>
          {categories.map((c) => <option key={c} value={c}>{c}</option>)}
        </select>
      </div>

      {/* Result count */}
      <p className="text-sm text-gray-500">{filtered.length} variant{filtered.length !== 1 ? 's' : ''}</p>

      {/* Adjust modal */}
      {adjusting && (
        <div className="fixed inset-0 bg-black/30 z-50 flex items-center justify-center">
          <div className="bg-white rounded-xl p-6 w-96 shadow-xl">
            <h3 className="font-bold mb-4">Adjust Stock — {adjusting.sku}</h3>
            <div className="space-y-3">
              <div>
                <label className="text-sm font-medium text-gray-700 block mb-1">Quantity (+ to add, − to remove)</label>
                <input
                  type="number"
                  value={adjQty}
                  onChange={(e) => setAdjQty(e.target.value)}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-900"
                  placeholder="e.g. 5 or -2"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 block mb-1">Reason *</label>
                <input
                  type="text"
                  value={adjReason}
                  onChange={(e) => setAdjReason(e.target.value)}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-900"
                  placeholder="e.g. Damaged item, stock count correction"
                />
              </div>
            </div>
            <div className="flex gap-3 mt-5">
              <button onClick={() => setAdjusting(null)} className="flex-1 border border-gray-200 rounded-lg py-2 text-sm hover:bg-gray-50">Cancel</button>
              <button
                onClick={() => adjust.mutate({ variantId: adjusting.variantId, quantity: parseInt(adjQty), reason: adjReason })}
                disabled={!adjQty || !adjReason || adjust.isPending}
                className="flex-1 bg-gray-900 text-white rounded-lg py-2 text-sm hover:bg-gray-800 disabled:opacity-40"
              >
                {adjust.isPending ? 'Saving...' : 'Save Adjustment'}
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-4 py-3 text-left font-medium text-gray-600">Product / Variant</th>
              <th className="px-4 py-3 text-left font-medium text-gray-600">Category</th>
              <th className="px-4 py-3 text-center font-medium text-gray-600">Available</th>
              <th className="px-4 py-3 text-center font-medium text-gray-600">Reserved</th>
              <th className="px-4 py-3 text-center font-medium text-gray-600">Committed</th>
              <th className="px-4 py-3 text-center font-medium text-gray-600">Damaged</th>
              <th className="px-4 py-3 text-center font-medium text-gray-600">Status</th>
              <th className="px-4 py-3 text-right font-medium text-gray-600">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {isLoading && (
              <tr><td colSpan={8} className="px-4 py-10 text-center text-gray-400">Loading...</td></tr>
            )}
            {!isLoading && filtered.length === 0 && (
              <tr>
                <td colSpan={8} className="px-4 py-16 text-center">
                  <Package className="w-10 h-10 text-gray-300 mx-auto mb-3" />
                  <p className="text-gray-500 font-medium">No variants found</p>
                  <p className="text-gray-400 text-xs mt-1">Try adjusting your search or filters</p>
                </td>
              </tr>
            )}
            {filtered.map((v: any) => (
              <tr key={v.variantId} className="hover:bg-gray-50">
                <td className="px-4 py-3">
                  <div className="flex items-center gap-3">
                    {v.productImage ? (
                      <img src={v.productImage} alt={v.productName} className="w-10 h-10 rounded-lg object-cover flex-shrink-0 border border-gray-100" />
                    ) : (
                      <div className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center flex-shrink-0">
                        <Package className="w-5 h-5 text-gray-400" />
                      </div>
                    )}
                    <div>
                      <p className="font-medium text-gray-900">{v.productName}</p>
                      <p className="text-xs text-gray-400">{v.sku}{v.size && ` · Size ${v.size}`}{v.color && ` · ${v.color}`}</p>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-3 text-gray-500">{v.category ?? '—'}</td>
                <td className="px-4 py-3 text-center">
                  <span className={`font-bold ${v.available === 0 ? 'text-red-600' : v.isLowStock ? 'text-yellow-600' : 'text-gray-900'}`}>
                    {v.available}
                  </span>
                </td>
                <td className="px-4 py-3 text-center text-gray-500">{v.reserved}</td>
                <td className="px-4 py-3 text-center text-blue-600">{v.committed}</td>
                <td className="px-4 py-3 text-center text-orange-600">{v.damaged}</td>
                <td className="px-4 py-3 text-center">
                  {v.isOutOfStock ? (
                    <span className="px-2 py-0.5 bg-red-100 text-red-700 rounded-full text-xs font-medium">Out of Stock</span>
                  ) : v.isLowStock ? (
                    <span className="px-2 py-0.5 bg-yellow-100 text-yellow-700 rounded-full text-xs font-medium">Low Stock</span>
                  ) : (
                    <span className="px-2 py-0.5 bg-green-100 text-green-700 rounded-full text-xs font-medium">OK</span>
                  )}
                </td>
                <td className="px-4 py-3 text-right">
                  <button
                    onClick={() => setAdjusting({ variantId: v.variantId, sku: v.sku })}
                    className="text-xs text-gray-500 hover:text-gray-900 border border-gray-200 rounded px-2 py-1 hover:bg-gray-50 transition-colors"
                  >
                    Adjust
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {data?.pagination && data.pagination.totalPages > 1 && (
          <div className="px-4 py-3 border-t border-gray-100 flex items-center justify-between text-sm text-gray-500">
            <span>{data.pagination.total} total variants</span>
            <div className="flex gap-2">
              <button disabled={page === 1} onClick={() => setPage(p => p - 1)} className="px-3 py-1 rounded border border-gray-200 disabled:opacity-40">Prev</button>
              <span className="px-3 py-1">Page {page} of {data.pagination.totalPages}</span>
              <button disabled={page >= data.pagination.totalPages} onClick={() => setPage(p => p + 1)} className="px-3 py-1 rounded border border-gray-200 disabled:opacity-40">Next</button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
