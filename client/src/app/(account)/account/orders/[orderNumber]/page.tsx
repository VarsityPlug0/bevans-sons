'use client'
import { useEffect, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import { useAuthStore } from '@/store/authStore'
import { api } from '@/lib/api'
import { ArrowLeft } from 'lucide-react'

const FULFILLMENT_STEPS = ['PENDING', 'PROCESSING', 'SHIPPED', 'DELIVERED']

const STATUS_COLORS: Record<string, string> = {
  DELIVERED: 'text-green-600 bg-green-50',
  SHIPPED: 'text-blue-600 bg-blue-50',
  PROCESSING: 'text-brand-gold bg-amber-50',
  PENDING: 'text-brand-muted bg-brand-light',
  CANCELLED: 'text-red-500 bg-red-50',
}

export default function OrderDetailPage() {
  const router = useRouter()
  const { customer } = useAuthStore()
  const { orderNumber } = useParams<{ orderNumber: string }>()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!mounted) return
    if (!customer) router.replace(`/login?redirect=/account/orders/${orderNumber}`)
  }, [mounted, customer])

  const { data: order, isLoading } = useQuery({
    queryKey: ['order', orderNumber],
    queryFn: () => api.get<any>(`/api/orders/${orderNumber}`),
    enabled: !!customer,
  })

  if (!mounted || !customer) return null

  if (isLoading) {
    return (
      <div className="max-w-2xl mx-auto px-6 py-14 space-y-4 animate-pulse">
        <div className="h-5 bg-brand-light w-48" />
        <div className="h-32 bg-brand-light" />
        <div className="h-48 bg-brand-light" />
      </div>
    )
  }

  if (!order) {
    return (
      <div className="max-w-2xl mx-auto px-6 py-14 text-center">
        <p className="text-brand-muted mb-4">Order not found.</p>
        <Link href="/account/orders" className="text-[11px] font-bold tracking-[0.15em] uppercase text-brand-black hover:text-brand-gold transition-colors">
          ← Back to Orders
        </Link>
      </div>
    )
  }

  const stepIndex = FULFILLMENT_STEPS.indexOf(order.fulfillmentStatus)

  return (
    <div className="max-w-2xl mx-auto px-6 py-14 space-y-8">
      {/* Back + title */}
      <div className="flex items-center gap-4">
        <Link href="/account/orders" className="text-brand-muted hover:text-brand-black transition-colors">
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <div>
          <p className="text-[11px] font-semibold tracking-[0.2em] uppercase text-brand-gold mb-0.5">Order</p>
          <h1 className="font-bebas text-3xl tracking-wide text-brand-black uppercase">{order.orderNumber}</h1>
          <p className="text-xs text-brand-muted">
            {new Date(order.createdAt).toLocaleDateString('en-ZA', { year: 'numeric', month: 'long', day: 'numeric' })}
          </p>
        </div>
      </div>

      {/* Status badges */}
      <div className="flex items-center gap-3">
        <span className={`text-[10px] font-bold tracking-[0.12em] uppercase px-3 py-1.5 ${order.paymentStatus === 'PAID' ? 'text-green-600 bg-green-50' : 'text-brand-gold bg-amber-50'}`}>
          {order.paymentStatus}
        </span>
        <span className={`text-[10px] font-bold tracking-[0.12em] uppercase px-3 py-1.5 ${STATUS_COLORS[order.fulfillmentStatus] ?? 'text-brand-muted bg-brand-light'}`}>
          {order.fulfillmentStatus}
        </span>
        {order.trackingNumber && (
          <span className="text-[10px] font-mono text-brand-muted px-3 py-1.5 border border-brand-mid">
            {order.carrier && `${order.carrier}: `}{order.trackingNumber}
          </span>
        )}
      </div>

      {/* Progress bar */}
      {order.fulfillmentStatus !== 'CANCELLED' && (
        <div>
          <div className="flex justify-between mb-2">
            {FULFILLMENT_STEPS.map((step, i) => (
              <span
                key={step}
                className={`text-[9px] font-bold tracking-[0.12em] uppercase ${i <= stepIndex ? 'text-brand-black' : 'text-brand-mid'}`}
              >
                {step}
              </span>
            ))}
          </div>
          <div className="h-1 bg-brand-light">
            <div
              className="h-full bg-brand-black transition-all duration-500"
              style={{ width: `${stepIndex < 0 ? 0 : ((stepIndex) / (FULFILLMENT_STEPS.length - 1)) * 100}%` }}
            />
          </div>
        </div>
      )}

      {/* Items */}
      <div className="border border-brand-mid">
        <div className="px-5 py-4 border-b border-brand-mid">
          <p className="text-[11px] font-bold tracking-[0.15em] uppercase text-brand-black">Items</p>
        </div>
        <div className="divide-y divide-brand-mid">
          {order.items?.map((item: any, i: number) => (
            <div key={i} className="px-5 py-4 flex items-center justify-between">
              <div>
                <p className="font-semibold text-sm text-brand-black">{item.productName}</p>
                <p className="text-xs text-brand-muted mt-0.5">
                  {[item.size && `Size ${item.size}`, item.color].filter(Boolean).join(' · ')}
                  {item.quantity > 1 && ` · Qty ${item.quantity}`}
                </p>
              </div>
              <p className="font-bebas text-lg text-brand-black">R{parseFloat(item.lineTotal).toFixed(2)}</p>
            </div>
          ))}
        </div>
        <div className="px-5 py-4 border-t border-brand-mid space-y-2 text-sm">
          <div className="flex justify-between text-brand-muted">
            <span>Subtotal</span>
            <span>R{(parseFloat(order.totalAmount) - parseFloat(order.shippingAmount || '0') + parseFloat(order.discountAmount || '0')).toFixed(2)}</span>
          </div>
          {parseFloat(order.shippingAmount || '0') > 0 && (
            <div className="flex justify-between text-brand-muted">
              <span>Shipping</span>
              <span>R{parseFloat(order.shippingAmount).toFixed(2)}</span>
            </div>
          )}
          {parseFloat(order.discountAmount || '0') > 0 && (
            <div className="flex justify-between text-green-600">
              <span>Discount</span>
              <span>-R{parseFloat(order.discountAmount).toFixed(2)}</span>
            </div>
          )}
          <div className="flex justify-between font-bold text-brand-black pt-2 border-t border-brand-mid">
            <span>Total</span>
            <span className="font-bebas text-xl">R{parseFloat(order.totalAmount).toFixed(2)}</span>
          </div>
        </div>
      </div>

      {/* Delivery Address */}
      {order.address && (
        <div className="border border-brand-mid p-5">
          <p className="text-[11px] font-bold tracking-[0.15em] uppercase text-brand-black mb-3">Delivery Address</p>
          <div className="text-sm text-brand-muted space-y-0.5">
            <p className="text-brand-black font-semibold">{order.address.firstName} {order.address.lastName}</p>
            <p>{order.address.line1}{order.address.line2 ? `, ${order.address.line2}` : ''}</p>
            <p>{order.address.city}, {order.address.province} {order.address.postalCode}</p>
            <p>{order.address.country}</p>
          </div>
        </div>
      )}
    </div>
  )
}
