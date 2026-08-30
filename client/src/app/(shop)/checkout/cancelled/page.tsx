'use client'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { XCircle } from 'lucide-react'
import { Suspense } from 'react'

function CancelledContent() {
  const params = useSearchParams()
  const orderNumber = params.get('orderNumber')

  return (
    <div className="max-w-lg mx-auto px-6 py-24 text-center">
      <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
        <XCircle className="w-10 h-10 text-red-500" />
      </div>
      <h1 className="font-bebas text-5xl uppercase text-brand-black mb-3">Payment Cancelled</h1>
      <p className="text-brand-muted text-sm mb-8">
        Your payment was cancelled. Your order has not been confirmed. You can try again or contact us for help.
      </p>
      <div className="flex flex-col sm:flex-row gap-3 justify-center">
        <Link
          href="/checkout"
          className="bg-brand-black text-white px-6 py-3 text-[11px] font-bold tracking-[0.15em] uppercase hover:bg-brand-dark transition-colors"
        >
          Try Again
        </Link>
        <Link
          href="/contact"
          className="border border-brand-mid text-brand-black px-6 py-3 text-[11px] font-bold tracking-[0.15em] uppercase hover:border-brand-black transition-colors"
        >
          Contact Support
        </Link>
      </div>
    </div>
  )
}

export default function CheckoutCancelledPage() {
  return (
    <Suspense>
      <CancelledContent />
    </Suspense>
  )
}
