'use client'
import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'
import Link from 'next/link'
import api from '@/lib/api'
import { ChevronRight } from 'lucide-react'
import { formatCurrency, formatDate } from '@/lib/utils'
import { Search } from 'lucide-react'

export default function CustomersPage() {
  const [search, setSearch] = useState('')
  const [page, setPage] = useState(1)

  const { data, isLoading } = useQuery({
    queryKey: ['customers', search, page],
    queryFn: () => api.get<any>(`/api/admin/customers?search=${search}&page=${page}`),
  })

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Customers</h1>
        <p className="text-sm text-gray-500">Customer profiles with order history and lifetime value</p>
      </div>

      <div className="relative max-w-sm">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
        <input value={search} onChange={(e) => { setSearch(e.target.value); setPage(1) }} placeholder="Search by name, email or phone..." className="w-full pl-9 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gray-900" />
      </div>

      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-4 py-3 text-left font-medium text-gray-600">Customer</th>
              <th className="px-4 py-3 text-right font-medium text-gray-600">Orders</th>
              <th className="px-4 py-3 text-right font-medium text-gray-600">Total Spent</th>
              <th className="px-4 py-3 text-left font-medium text-gray-600">Last Order</th>
              <th className="px-4 py-3 text-left font-medium text-gray-600">Since</th>
              <th className="px-4 py-3" />
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {isLoading && <tr><td colSpan={5} className="px-4 py-8 text-center text-gray-400">Loading...</td></tr>}
            {data?.data?.map((c: any) => (
              <tr key={c.id} className="hover:bg-gray-50 cursor-pointer" onClick={() => window.location.href = `/customers/${c.id}`}>
                <td className="px-4 py-3">
                  <p className="font-medium text-gray-900">{c.firstName} {c.lastName}</p>
                  <p className="text-xs text-gray-400">{c.email}</p>
                </td>
                <td className="px-4 py-3 text-right text-gray-700">{c.orderCount}</td>
                <td className="px-4 py-3 text-right font-mono font-semibold">{formatCurrency(parseFloat(c.totalSpent))}</td>
                <td className="px-4 py-3 text-gray-500">{c.lastOrderAt ? formatDate(c.lastOrderAt) : '—'}</td>
                <td className="px-4 py-3 text-gray-400">{formatDate(c.createdAt)}</td>
                <td className="px-4 py-3 text-gray-300"><ChevronRight className="w-4 h-4" /></td>
              </tr>
            ))}
          </tbody>
        </table>
        {data?.pagination && (
          <div className="px-4 py-3 border-t border-gray-100 flex items-center justify-between text-sm text-gray-500">
            <span>{data.pagination.total} customers</span>
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
