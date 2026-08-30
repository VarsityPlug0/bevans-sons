'use client'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'
import { useParams } from 'next/navigation'
import api from '@/lib/api'
import { formatCurrency, formatPercent, statusColor, formatDateTime } from '@/lib/utils'
import { Truck, CheckCircle, XCircle } from 'lucide-react'

export default function OrderDetailPage() {
  const { id } = useParams() as { id: string }
  const qc = useQueryClient()
  const [tracking, setTracking] = useState('')
  const [carrier, setCarrier] = useState('')

  const { data: order, isLoading } = useQuery({
    queryKey: ['order', id],
    queryFn: () => api.get<any>(`/api/admin/orders/${id}`),
  })

  const { data: economics } = useQuery({
    queryKey: ['order-economics', id],
    queryFn: () => api.get<any>(`/api/admin/orders/${id}/economics`),
  })

  const ship = useMutation({
    mutationFn: () => api.post(`/api/admin/orders/${id}/ship`, { trackingNumber: tracking, trackingCarrier: carrier }),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['order', id] }),
  })

  const deliver = useMutation({
    mutationFn: () => api.post(`/api/admin/orders/${id}/deliver`),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['order', id] }),
  })

  if (isLoading) return <div className="text-gray-400 py-16 text-center">Loading...</div>
  if (!order) return null

  return (
    <div className="space-y-6 max-w-5xl">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Order {order.orderNumber}</h1>
          <p className="text-sm text-gray-500">{formatDateTime(order.createdAt)}</p>
        </div>
        <div className="flex gap-2">
          <span className={`px-3 py-1 rounded-full text-sm font-medium ${statusColor(order.paymentStatus)}`}>{order.paymentStatus}</span>
          <span className={`px-3 py-1 rounded-full text-sm font-medium ${statusColor(order.fulfillmentStatus)}`}>{order.fulfillmentStatus}</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Order Items */}
        <div className="lg:col-span-2 space-y-4">
          <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
            <div className="px-5 py-4 border-b border-gray-100">
              <h2 className="font-semibold text-gray-900">Items</h2>
            </div>
            <table className="w-full text-sm">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-2.5 text-left font-medium text-gray-600">Product</th>
                  <th className="px-4 py-2.5 text-right font-medium text-gray-600">Qty</th>
                  <th className="px-4 py-2.5 text-right font-medium text-gray-600">Price</th>
                  <th className="px-4 py-2.5 text-right font-medium text-gray-600">Cost</th>
                  <th className="px-4 py-2.5 text-right font-medium text-gray-600">Contribution</th>
                  <th className="px-4 py-2.5 text-right font-medium text-gray-600">Margin</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {order.items?.map((item: any) => (
                  <tr key={item.id}>
                    <td className="px-4 py-3">
                      <p className="font-medium text-gray-900">{item.productName}</p>
                      <p className="text-xs text-gray-400">{item.size && `Size ${item.size}`} {item.color}</p>
                    </td>
                    <td className="px-4 py-3 text-right">{item.quantity}</td>
                    <td className="px-4 py-3 text-right font-mono">{formatCurrency(parseFloat(item.unitPrice))}</td>
                    <td className="px-4 py-3 text-right font-mono text-gray-500">{formatCurrency(parseFloat(item.unitCost))}</td>
                    <td className="px-4 py-3 text-right font-mono font-medium">{formatCurrency(parseFloat(item.contribution))}</td>
                    <td className="px-4 py-3 text-right">
                      <span className={parseFloat(item.margin) >= 0.25 ? 'text-green-600 font-medium' : 'text-red-600 font-medium'}>
                        {formatPercent(parseFloat(item.margin))}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Economics */}
          {economics && (
            <div className="bg-white rounded-xl border border-gray-200 p-5">
              <h2 className="font-semibold text-gray-900 mb-4">Order Economics</h2>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2 text-sm">
                  <p className="font-medium text-gray-700 mb-2">Revenue Breakdown</p>
                  <div className="flex justify-between"><span className="text-gray-500">Revenue</span><span className="font-mono">{formatCurrency(economics.totalRevenue)}</span></div>
                  <div className="flex justify-between"><span className="text-gray-500">Product cost</span><span className="font-mono text-red-600">-{formatCurrency(economics.directCosts.productCost)}</span></div>
                  <div className="flex justify-between"><span className="text-gray-500">Fulfillment</span><span className="font-mono text-red-600">-{formatCurrency(economics.directCosts.fulfillmentCost)}</span></div>
                  <div className="flex justify-between"><span className="text-gray-500">Payment fee</span><span className="font-mono text-red-600">-{formatCurrency(economics.directCosts.paymentFee)}</span></div>
                  <div className="flex justify-between border-t pt-2 font-semibold"><span>Contribution</span><span className="font-mono text-green-700">{formatCurrency(economics.contribution)}</span></div>
                  <div className="flex justify-between"><span className="text-gray-500">Margin</span><span className={formatPercent(economics.contributionMargin)}>{formatPercent(economics.contributionMargin)}</span></div>
                </div>
                <div className="space-y-2 text-sm">
                  <p className="font-medium text-gray-700 mb-2">Money Allocated To</p>
                  {economics.moneyAllocated?.map((a: any) => (
                    <div key={a.key} className="flex justify-between">
                      <span className="text-gray-500">{a.wallet}</span>
                      <span className="font-mono">{formatCurrency(a.amount)}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Fulfillment Actions */}
          {order.paymentStatus === 'PAID' && order.fulfillmentStatus === 'PROCESSING' && (
            <div className="bg-white rounded-xl border border-gray-200 p-5">
              <h2 className="font-semibold text-gray-900 mb-4">Fulfill Order</h2>
              <div className="flex gap-3">
                <input value={tracking} onChange={(e) => setTracking(e.target.value)} placeholder="Tracking number" className="flex-1 border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-900" />
                <input value={carrier} onChange={(e) => setCarrier(e.target.value)} placeholder="Carrier (e.g. Courier Guy)" className="flex-1 border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-900" />
                <button onClick={() => ship.mutate()} disabled={!tracking || !carrier || ship.isPending} className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 disabled:opacity-40 flex items-center gap-2">
                  <Truck className="w-4 h-4" /> Ship
                </button>
              </div>
            </div>
          )}
          {order.fulfillmentStatus === 'SHIPPED' && (
            <button onClick={() => deliver.mutate()} disabled={deliver.isPending} className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg text-sm font-medium hover:bg-green-700">
              <CheckCircle className="w-4 h-4" /> Mark as Delivered
            </button>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-4">
          <div className="bg-white rounded-xl border border-gray-200 p-5">
            <h2 className="font-semibold text-gray-900 mb-3">Customer</h2>
            <p className="text-sm font-medium text-gray-700">{order.customer?.firstName} {order.customer?.lastName}</p>
            <p className="text-sm text-gray-500">{order.customer?.email}</p>
          </div>

          {order.address && (
            <div className="bg-white rounded-xl border border-gray-200 p-5">
              <h2 className="font-semibold text-gray-900 mb-3">Delivery Address</h2>
              <address className="text-sm text-gray-600 not-italic">
                {order.address.firstName} {order.address.lastName}<br />
                {order.address.line1}<br />
                {order.address.line2 && <>{order.address.line2}<br /></>}
                {order.address.city}, {order.address.province} {order.address.postalCode}
              </address>
            </div>
          )}

          <div className="bg-white rounded-xl border border-gray-200 p-5">
            <h2 className="font-semibold text-gray-900 mb-3">Payment</h2>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between"><span className="text-gray-500">Method</span><span>{order.paymentMethod ?? '—'}</span></div>
              <div className="flex justify-between"><span className="text-gray-500">Reference</span><span className="font-mono text-xs">{order.paymentReference ?? '—'}</span></div>
              {order.paidAt && <div className="flex justify-between"><span className="text-gray-500">Paid at</span><span>{formatDateTime(order.paidAt)}</span></div>}
              <div className="border-t pt-2 flex justify-between font-semibold"><span>Total</span><span>{formatCurrency(parseFloat(order.totalAmount))}</span></div>
            </div>
          </div>

          {order.trackingNumber && (
            <div className="bg-white rounded-xl border border-gray-200 p-5">
              <h2 className="font-semibold text-gray-900 mb-3">Tracking</h2>
              <p className="text-sm font-mono">{order.trackingNumber}</p>
              <p className="text-xs text-gray-500">{order.trackingCarrier}</p>
              {order.shippedAt && <p className="text-xs text-gray-400 mt-1">Shipped: {formatDate(order.shippedAt)}</p>}
              {order.deliveredAt && <p className="text-xs text-green-600 mt-1">Delivered: {formatDate(order.deliveredAt)}</p>}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
