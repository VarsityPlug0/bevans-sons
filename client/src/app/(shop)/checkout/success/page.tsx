'use client'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { CheckCircle } from 'lucide-react'
import { Suspense } from 'react'

function SuccessContent() {
  const params = useSearchParams()
  const orderNumber = params.get('orderNumber')

  return (
    <div className="max-w-lg mx-auto px-6 py-24 text-center">
      <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
        <CheckCircle className="w-10 h-10 text-green-600" />
      </div>
      <h1 className="font-bebas text-5xl uppercase text-brand-black mb-3">Payment Successful!</h1>
      <p className="text-brand-muted text-sm mb-2">
        Thank you for your order. We've received your payment and will begin processing it shortly.
      </p>
      {orderNumber && (
        <p className="text-sm font-semibold text-brand-black mb-8">Order: <span className="font-mono">{orderNumber}</span></p>
      )}
      <div className="flex flex-col sm:flex-row gap-3 justify-center">
        {orderNumber && (
          <Link
            href={`/account/orders/${orderNumber}`}
            className="bg-brand-black text-white px-6 py-3 text-[11px] font-bold tracking-[0.15em] uppercase hover:bg-brand-dark transition-colors"
          >
            View Order
          </Link>
        )}
        <Link
          href="/products"
          className="border border-brand-mid text-brand-black px-6 py-3 text-[11px] font-bold tracking-[0.15em] uppercase hover:border-brand-black transition-colors"
        >
          Continue Shopping
        </Link>
      </div>
    </div>
  )
}

export default function CheckoutSuccessPage() {
  return (
    <Suspense>
      <SuccessContent />
    </Suspense>
  )
}
