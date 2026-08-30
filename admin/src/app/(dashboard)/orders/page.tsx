'use client'
import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'
import Link from 'next/link'
import api from '@/lib/api'
import { formatCurrency, formatPercent, statusColor, formatDate } from '@/lib/utils'
import { Search, ChevronRight } from 'lucide-react'

export default function OrdersPage() {
  const [paymentStatus, setPaymentStatus] = useState('')
  const [fulfillmentStatus, setFulfillmentStatus] = useState('')
  const [search, setSearch] = useState('')
  const [page, setPage] = useState(1)

  const { data, isLoading } = useQuery({
    queryKey: ['admin-orders', paymentStatus, fulfillmentStatus, search, page],
    queryFn: () => api.get<any>(`/api/admin/orders?paymentStatus=${paymentStatus}&fulfillmentStatus=${fulfillmentStatus}&search=${search}&page=${page}`),
  })

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Orders</h1>
        <p className="text-sm text-gray-500">All orders with full financial data</p>
      </div>

      <div className="flex gap-3 flex-wrap items-center">
        <div className="relative flex-1 min-w-48">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            value={search}
            onChange={(e) => { setSearch(e.target.value); setPage(1) }}
            placeholder="Order number or customer..."
            className="w-full pl-9 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gray-900"
          />
        </div>
        <select value={paymentStatus} onChange={(e) => { setPaymentStatus(e.target.value); setPage(1) }} className="border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none">
          <option value="">All payments</option>
          {['PENDING', 'PAID', 'FAILED', 'REFUNDED'].map((s) => <option key={s} value={s}>{s}</option>)}
        </select>
        <select value={fulfillmentStatus} onChange={(e) => { setFulfillmentStatus(e.target.value); setPage(1) }} className="border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none">
          <option value="">All fulfillment</option>
          {['UNFULFILLED', 'PROCESSING', 'SHIPPED', 'DELIVERED', 'CANCELLED'].map((s) => <option key={s} value={s}>{s}</option>)}
        </select>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-4 py-3 text-left font-medium text-gray-600">Order</th>
              <th className="px-4 py-3 text-left font-medium text-gray-600">Customer</th>
              <th className="px-4 py-3 text-left font-medium text-gray-600">Date</th>
              <th className="px-4 py-3 text-left font-medium text-gray-600">Payment</th>
              <th className="px-4 py-3 text-left font-medium text-gray-600">Fulfillment</th>
              <th className="px-4 py-3 text-right font-medium text-gray-600">Revenue</th>
              <th className="px-4 py-3 text-right font-medium text-gray-600">Contribution</th>
              <th className="px-4 py-3 text-right font-medium text-gray-600">Margin</th>
              <th className="px-4 py-3" />
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {isLoading && <tr><td colSpan={9} className="px-4 py-8 text-center text-gray-400">Loading...</td></tr>}
            {data?.data?.map((o: any) => (
              <tr key={o.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-4 py-3 font-mono font-medium text-gray-900">{o.orderNumber}</td>
                <td className="px-4 py-3 text-gray-700">{o.customer.firstName} {o.customer.lastName}</td>
                <td className="px-4 py-3 text-gray-500 whitespace-nowrap">{formatDate(o.createdAt)}</td>
                <td className="px-4 py-3"><span className={`px-2 py-0.5 rounded-full text-xs font-medium ${statusColor(o.paymentStatus)}`}>{o.paymentStatus}</span></td>
                <td className="px-4 py-3"><span className={`px-2 py-0.5 rounded-full text-xs font-medium ${statusColor(o.fulfillmentStatus)}`}>{o.fulfillmentStatus}</span></td>
                <td className="px-4 py-3 text-right font-mono">{formatCurrency(parseFloat(o.totalAmount))}</td>
                <td className="px-4 py-3 text-right font-mono">{formatCurrency(parseFloat(o.contribution))}</td>
                <td className="px-4 py-3 text-right">
                  <span className={parseFloat(o.contributionMargin) >= 0.25 ? 'text-green-600 font-medium' : 'text-red-600 font-medium'}>
                    {formatPercent(parseFloat(o.contributionMargin))}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <Link href={`/orders/${o.id}`} className="text-gray-400 hover:text-gray-700"><ChevronRight className="w-4 h-4" /></Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {data?.pagination && (
          <div className="px-4 py-3 border-t border-gray-100 flex items-center justify-between text-sm text-gray-500">
            <span>{data.pagination.total} orders</span>
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
