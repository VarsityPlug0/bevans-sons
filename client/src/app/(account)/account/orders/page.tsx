'use client'
import { useEffect, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useAuthStore } from '@/store/authStore'
import { api } from '@/lib/api'
import { Package, ChevronRight } from 'lucide-react'

const STATUS_COLORS: Record<string, string> = {
  DELIVERED: 'text-green-600',
  SHIPPED: 'text-blue-600',
  PROCESSING: 'text-brand-gold',
  PENDING: 'text-brand-muted',
  CANCELLED: 'text-red-500',
}

export default function AccountOrdersPage() {
  const router = useRouter()
  const { customer } = useAuthStore()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!mounted) return
    if (!customer) router.replace('/login?redirect=/account/orders')
  }, [mounted, customer])

  const { data, isLoading } = useQuery({
    queryKey: ['my-orders'],
    queryFn: () => api.get<any>('/api/orders'),
    enabled: !!customer,
  })

  if (!mounted || !customer) return null

  const orders = data?.data ?? data ?? []

  return (
    <div className="min-h-[60vh] max-w-3xl mx-auto px-6 py-14">
      <div className="mb-10">
        <p className="text-[11px] font-semibold tracking-[0.2em] uppercase text-brand-gold mb-1">Account</p>
        <h1 className="font-bebas text-4xl uppercase tracking-wide text-brand-black">My Orders</h1>
      </div>

      {isLoading && (
        <div className="space-y-3">
          {[1, 2, 3].map(n => (
            <div key={n} className="border border-brand-mid p-5 animate-pulse">
              <div className="h-4 bg-brand-light w-32 mb-3" />
              <div className="h-3 bg-brand-light w-48" />
            </div>
          ))}
        </div>
      )}

      {!isLoading && orders.length === 0 && (
        <div className="border border-brand-mid p-12 text-center">
          <Package className="w-10 h-10 text-brand-mid mx-auto mb-4" />
          <p className="text-brand-muted text-sm mb-4">You haven&apos;t placed any orders yet.</p>
          <Link
            href="/products"
            className="inline-block bg-brand-black text-white px-8 py-3 text-[11px] font-bold tracking-[0.18em] uppercase hover:bg-brand-dark transition-colors"
          >
            Start Shopping
          </Link>
        </div>
      )}

      <div className="space-y-3">
        {orders.map((order: any) => (
          <Link
            key={order.id}
            href={`/account/orders/${order.orderNumber}`}
            className="flex items-center justify-between border border-brand-mid p-5 hover:border-brand-black transition-colors group"
          >
            <div className="flex-1">
              <div className="flex items-center gap-4 mb-2">
                <p className="font-mono font-bold text-brand-black text-sm">{order.orderNumber}</p>
                <span className={`text-[10px] font-bold tracking-[0.1em] uppercase ${STATUS_COLORS[order.fulfillmentStatus] ?? 'text-brand-muted'}`}>
                  {order.fulfillmentStatus}
                </span>
                <span className={`text-[10px] font-bold tracking-[0.1em] uppercase ${order.paymentStatus === 'PAID' ? 'text-green-600' : 'text-brand-gold'}`}>
                  {order.paymentStatus}
                </span>
              </div>
              <p className="text-xs text-brand-muted">
                {new Date(order.createdAt).toLocaleDateString('en-ZA', { year: 'numeric', month: 'long', day: 'numeric' })}
              </p>
              <p className="text-xs text-brand-muted mt-1">
                {order.items?.slice(0, 3).map((item: any, i: number) => (
                  <span key={i}>{i > 0 ? ', ' : ''}{item.productName}{item.size ? ` (${item.size})` : ''}</span>
                ))}
                {order.items?.length > 3 && ` +${order.items.length - 3} more`}
              </p>
            </div>
            <div className="flex items-center gap-3 flex-shrink-0 ml-4">
              <p className="font-bebas text-xl text-brand-black">R{parseFloat(order.totalAmount).toFixed(2)}</p>
              <ChevronRight className="w-4 h-4 text-brand-muted group-hover:text-brand-black transition-colors" />
            </div>
          </Link>
        ))}
      </div>

      <div className="mt-8">
        <Link href="/account" className="text-[11px] font-bold tracking-[0.15em] uppercase text-brand-muted hover:text-brand-black transition-colors">
          ← Back to Account
        </Link>
      </div>
    </div>
  )
}
