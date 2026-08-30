'use client'
import { useState } from 'react'
import { Search, Package, CheckCircle, Truck, Clock } from 'lucide-react'

const STATUS_STEPS: Record<string, { label: string; step: number }> = {
  PENDING:    { label: 'Order Placed', step: 1 },
  CONFIRMED:  { label: 'Confirmed', step: 2 },
  PROCESSING: { label: 'Processing', step: 3 },
  SHIPPED:    { label: 'Shipped', step: 4 },
  DELIVERED:  { label: 'Delivered', step: 5 },
  CANCELLED:  { label: 'Cancelled', step: 0 },
}

interface OrderData {
  orderNumber: string
  status: string
  createdAt: string
  updatedAt: string
  total: string
  shippingFee: string
  items: { productName: string; size: string; color: string; quantity: number }[]
}

export default function TrackOrderPage() {
  const [ref, setRef] = useState('')
  const [loading, setLoading] = useState(false)
  const [order, setOrder] = useState<OrderData | null>(null)
  const [error, setError] = useState('')

  async function handleTrack(e: React.FormEvent) {
    e.preventDefault()
    if (!ref.trim()) return
    setLoading(true)
    setError('')
    setOrder(null)
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/track/${ref.trim()}`)
      if (!res.ok) {
        setError('Order not found. Please check your order number and try again.')
        return
      }
      const data = await res.json()
      setOrder(data.data)
    } catch {
      setError('Something went wrong. Please try again or contact us on WhatsApp.')
    } finally {
      setLoading(false)
    }
  }

  const currentStep = order ? STATUS_STEPS[order.status]?.step ?? 1 : 0
  const steps = ['Order Placed', 'Confirmed', 'Processing', 'Shipped', 'Delivered']

  return (
    <div className="max-w-3xl mx-auto px-6 py-20">
      <div className="text-center mb-12">
        <p className="text-[11px] font-semibold tracking-[0.2em] uppercase text-brand-gold mb-3">Order Status</p>
        <h1 className="font-bebas text-6xl text-brand-black mb-4 uppercase">Track Your Order</h1>
        <p className="text-brand-muted text-sm">Enter your order reference number to check the status of your delivery.</p>
      </div>

      {/* Search */}
      <form onSubmit={handleTrack} className="flex gap-0 mb-10">
        <input
          type="text"
          value={ref}
          onChange={e => setRef(e.target.value)}
          placeholder="e.g. BS-20260101-ABCD"
          className="flex-1 bg-brand-light border border-brand-mid border-r-0 px-4 py-3.5 text-sm text-brand-black outline-none focus:border-brand-black transition-colors"
        />
        <button
          type="submit"
          disabled={loading}
          className="bg-brand-black text-white px-6 py-3.5 text-[11px] font-bold tracking-[0.15em] uppercase hover:bg-brand-dark transition-colors disabled:opacity-60 flex items-center gap-2"
        >
          <Search className="w-4 h-4" />
          {loading ? 'Searching...' : 'Track'}
        </button>
      </form>

      {error && (
        <div className="bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-600 mb-6">
          {error}
        </div>
      )}

      {order && (
        <div className="space-y-6">
          {/* Header */}
          <div className="bg-brand-black text-white p-6 flex items-start justify-between">
            <div>
              <p className="text-[11px] text-white/50 tracking-widest uppercase mb-1">Order Reference</p>
              <p className="font-bebas text-2xl tracking-wide">{order.orderNumber}</p>
            </div>
            <div className="text-right">
              <p className="text-[11px] text-white/50 tracking-widest uppercase mb-1">Total</p>
              <p className="font-bold">R{parseFloat(order.total).toFixed(2)}</p>
            </div>
          </div>

          {/* Progress */}
          {order.status !== 'CANCELLED' && (
            <div className="bg-brand-light border border-brand-mid p-6">
              <div className="flex items-center justify-between mb-2">
                {steps.map((step, i) => (
                  <div key={step} className="flex-1 flex flex-col items-center gap-1">
                    <div className={`w-7 h-7 flex items-center justify-center text-xs font-bold ${
                      i + 1 <= currentStep ? 'bg-brand-black text-white' : 'bg-brand-mid text-brand-muted'
                    }`}>
                      {i + 1 <= currentStep ? <CheckCircle className="w-4 h-4" /> : i + 1}
                    </div>
                    {i < steps.length - 1 && (
                      <div className={`h-0.5 w-full ${i + 1 < currentStep ? 'bg-brand-black' : 'bg-brand-mid'}`} style={{ position: 'absolute', display: 'none' }} />
                    )}
                    <p className="text-[9px] font-semibold tracking-wider uppercase text-center text-brand-muted hidden md:block">{step}</p>
                  </div>
                ))}
              </div>
              <p className="text-center text-sm font-semibold text-brand-black mt-2">
                Status: <span className="text-brand-gold">{STATUS_STEPS[order.status]?.label ?? order.status}</span>
              </p>
            </div>
          )}

          {order.status === 'CANCELLED' && (
            <div className="bg-red-50 border border-red-200 p-4 text-sm text-red-600">
              This order has been cancelled. Contact us on WhatsApp if you need assistance.
            </div>
          )}

          {/* Items */}
          <div className="bg-brand-light border border-brand-mid p-6">
            <h3 className="font-bebas text-xl uppercase tracking-wide text-brand-black mb-4 flex items-center gap-2">
              <Package className="w-5 h-5" /> Order Items
            </h3>
            <div className="space-y-3">
              {order.items.map((item, i) => (
                <div key={i} className="flex items-center justify-between py-2 border-b border-brand-mid last:border-0">
                  <div>
                    <p className="text-sm font-semibold text-brand-black">{item.productName}</p>
                    <p className="text-xs text-brand-muted">Size: {item.size} {item.color ? `· ${item.color}` : ''}</p>
                  </div>
                  <p className="text-sm font-bold text-brand-black">×{item.quantity}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Dates */}
          <div className="grid sm:grid-cols-2 gap-4 text-sm">
            <div className="bg-brand-light border border-brand-mid p-4 flex items-center gap-3">
              <Clock className="w-4 h-4 text-brand-muted" />
              <div>
                <p className="text-[10px] text-brand-muted uppercase tracking-widest font-bold">Ordered</p>
                <p className="text-brand-black font-medium">{new Date(order.createdAt).toLocaleDateString('en-ZA', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
              </div>
            </div>
            <div className="bg-brand-light border border-brand-mid p-4 flex items-center gap-3">
              <Truck className="w-4 h-4 text-brand-muted" />
              <div>
                <p className="text-[10px] text-brand-muted uppercase tracking-widest font-bold">Last Updated</p>
                <p className="text-brand-black font-medium">{new Date(order.updatedAt).toLocaleDateString('en-ZA', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Help */}
      <div className="mt-12 bg-brand-light border border-brand-mid p-6 text-center">
        <p className="text-sm font-semibold text-brand-black mb-1">Need help with your order?</p>
        <p className="text-xs text-brand-muted mb-4">Contact us with your order reference for the fastest assistance.</p>
        <a
          href="https://wa.me/27724816274"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block bg-brand-black text-white px-8 py-3 text-[11px] font-bold tracking-[0.18em] uppercase hover:bg-brand-dark transition-colors"
        >
          Chat on WhatsApp
        </a>
      </div>
    </div>
  )
}
