'use client'
import { useQuery } from '@tanstack/react-query'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import api from '@/lib/api'
import { formatCurrency, formatDate, statusColor } from '@/lib/utils'
import { ArrowLeft, Mail, Phone, ShoppingBag, RefreshCw } from 'lucide-react'

export default function CustomerDetailPage() {
  const { id } = useParams<{ id: string }>()

  const { data: customer, isLoading } = useQuery({
    queryKey: ['customer', id],
    queryFn: () => api.get<any>(`/api/admin/customers/${id}`),
  })

  if (isLoading) return (
    <div className="space-y-4 animate-pulse max-w-4xl">
      <div className="h-6 bg-gray-100 rounded w-48" />
      <div className="h-32 bg-gray-100 rounded-xl" />
      <div className="h-64 bg-gray-100 rounded-xl" />
    </div>
  )

  if (!customer) return <div className="text-gray-400 p-8">Customer not found</div>

  return (
    <div className="space-y-6 max-w-4xl">
      <div className="flex items-center gap-3">
        <Link href="/customers" className="text-gray-400 hover:text-gray-700">
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">{customer.firstName} {customer.lastName}</h1>
          <p className="text-sm text-gray-400">Customer since {formatDate(customer.createdAt)}</p>
        </div>
        <span className={`ml-auto text-xs font-medium px-2.5 py-1 rounded-full ${customer.isActive ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-600'}`}>
          {customer.isActive ? 'Active' : 'Inactive'}
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left: profile + stats */}
        <div className="space-y-4">
          {/* Profile */}
          <div className="bg-white rounded-xl border border-gray-200 p-5 space-y-3">
            <h2 className="font-semibold text-gray-900">Profile</h2>
            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-2 text-gray-600">
                <Mail className="w-4 h-4 text-gray-400 flex-shrink-0" />
                <a href={`mailto:${customer.email}`} className="hover:text-gray-900 truncate">{customer.email}</a>
              </div>
              {customer.phone && (
                <div className="flex items-center gap-2 text-gray-600">
                  <Phone className="w-4 h-4 text-gray-400 flex-shrink-0" />
                  <a href={`tel:${customer.phone}`} className="hover:text-gray-900">{customer.phone}</a>
                </div>
              )}
            </div>
            <a
              href={`https://wa.me/${customer.phone?.replace(/\D/g, '')}`}
              target="_blank"
              rel="noreferrer"
              className="flex items-center justify-center gap-2 w-full py-2 rounded-lg bg-green-500 text-white text-sm font-medium hover:bg-green-600 transition-colors"
            >
              WhatsApp
            </a>
          </div>

          {/* Stats */}
          <div className="bg-white rounded-xl border border-gray-200 p-5">
            <h2 className="font-semibold text-gray-900 mb-4">Lifetime Value</h2>
            <div className="space-y-3 text-sm">
              {[
                { label: 'Total Orders', value: customer._count?.orders ?? customer.orderCount ?? 0 },
                { label: 'Total Spent', value: formatCurrency(parseFloat(customer.totalSpent ?? '0')) },
                { label: 'Avg Order Value', value: formatCurrency(customer.avgOrderValue ?? 0) },
                { label: 'Total Refunds', value: customer._count?.refundRequests ?? 0 },
                { label: 'Last Order', value: customer.lastOrderAt ? formatDate(customer.lastOrderAt) : '—' },
              ].map(({ label, value }) => (
                <div key={label} className="flex justify-between">
                  <span className="text-gray-400">{label}</span>
                  <span className="font-medium text-gray-900">{value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right: orders */}
        <div className="lg:col-span-2 space-y-4">
          <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
            <div className="px-5 py-4 border-b border-gray-100 flex items-center gap-2">
              <ShoppingBag className="w-4 h-4 text-gray-400" />
              <h2 className="font-semibold text-gray-900">Orders</h2>
              <span className="ml-auto text-xs text-gray-400">{customer.orders?.length ?? 0} orders</span>
            </div>
            {customer.orders?.length === 0 && (
              <div className="px-5 py-10 text-center text-gray-400 text-sm">No orders yet</div>
            )}
            <div className="divide-y divide-gray-100">
              {customer.orders?.map((order: any) => (
                <Link
                  key={order.orderNumber}
                  href={`/orders/${order.orderNumber}`}
                  className="flex items-center justify-between px-5 py-3.5 hover:bg-gray-50 transition-colors"
                >
                  <div>
                    <p className="font-mono text-sm font-semibold text-gray-900">{order.orderNumber}</p>
                    <p className="text-xs text-gray-400">{formatDate(order.createdAt)}</p>
                  </div>
                  <div className="text-right flex items-center gap-3">
                    <div>
                      <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${statusColor(order.fulfillmentStatus)}`}>
                        {order.fulfillmentStatus}
                      </span>
                    </div>
                    <p className="font-mono font-semibold text-sm text-gray-900">{formatCurrency(parseFloat(order.totalAmount))}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Refunds */}
          {customer.refundRequests?.length > 0 && (
            <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
              <div className="px-5 py-4 border-b border-gray-100 flex items-center gap-2">
                <RefreshCw className="w-4 h-4 text-gray-400" />
                <h2 className="font-semibold text-gray-900">Refund Requests</h2>
              </div>
              <div className="divide-y divide-gray-100">
                {customer.refundRequests.map((r: any) => (
                  <div key={r.id} className="flex items-center justify-between px-5 py-3.5 text-sm">
                    <div>
                      <p className="text-gray-600">{r.reason}</p>
                      <p className="text-xs text-gray-400">{formatDate(r.createdAt)}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold">{formatCurrency(parseFloat(r.requestedAmount))}</p>
                      <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${statusColor(r.status)}`}>{r.status}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
