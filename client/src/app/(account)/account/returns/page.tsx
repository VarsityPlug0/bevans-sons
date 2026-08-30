'use client'
import Link from 'next/link'
import { RotateCcw } from 'lucide-react'

export default function ReturnsPage() {
  return (
    <div className="min-h-[60vh] max-w-2xl mx-auto px-6 py-14">
      <div className="mb-10">
        <p className="text-[11px] font-semibold tracking-[0.2em] uppercase text-brand-gold mb-1">Account</p>
        <h1 className="font-bebas text-4xl uppercase tracking-wide text-brand-black">My Returns</h1>
        <p className="text-sm text-brand-muted mt-1">Track and manage your return requests.</p>
      </div>

      <div className="border border-brand-mid p-12 text-center">
        <RotateCcw className="w-10 h-10 text-brand-mid mx-auto mb-4" />
        <p className="text-brand-muted text-sm mb-2">You have no active returns.</p>
        <p className="text-xs text-brand-muted mb-6">
          Need to return something?{' '}
          <Link href="/returns-policy" className="text-brand-black font-semibold hover:text-brand-gold transition-colors">
            Read our returns policy
          </Link>
        </p>
        <Link
          href="/account/orders"
          className="inline-block bg-brand-black text-white px-8 py-3 text-[11px] font-bold tracking-[0.18em] uppercase hover:bg-brand-dark transition-colors"
        >
          View My Orders
        </Link>
      </div>

      <div className="mt-8">
        <Link href="/account" className="text-[11px] font-bold tracking-[0.15em] uppercase text-brand-muted hover:text-brand-black transition-colors">
          ← Back to Account
        </Link>
      </div>
    </div>
  )
}
