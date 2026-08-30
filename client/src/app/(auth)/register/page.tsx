'use client'
import { useState } from 'react'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import { useAuthStore } from '@/store/authStore'
import { Eye, EyeOff } from 'lucide-react'

export default function RegisterPage() {
  const router = useRouter()
  const params = useSearchParams()
  const { login } = useAuthStore()
  const [form, setForm] = useState({ firstName: '', lastName: '', email: '', phone: '', password: '' })
  const [showPw, setShowPw] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const redirect = params.get('redirect') ?? '/account'

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      const data = await res.json()
      if (!res.ok) { setError(data.error ?? 'Registration failed'); return }
      login(data.customer, data.token)
      router.push(redirect)
    } catch {
      setError('Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-[70vh] flex items-center justify-center px-6 py-16">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <p className="text-[11px] font-semibold tracking-[0.2em] uppercase text-brand-gold mb-2">Join Us</p>
          <h1 className="font-bebas text-4xl uppercase tracking-wide text-brand-black">Create Account</h1>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-[10px] font-bold tracking-[0.15em] uppercase text-brand-muted mb-1.5">First Name</label>
              <input
                type="text" required
                value={form.firstName}
                onChange={e => setForm({ ...form, firstName: e.target.value })}
                className="w-full bg-brand-light border border-brand-mid px-3 py-3 text-sm text-brand-black outline-none focus:border-brand-black transition-colors"
                placeholder="John"
              />
            </div>
            <div>
              <label className="block text-[10px] font-bold tracking-[0.15em] uppercase text-brand-muted mb-1.5">Last Name</label>
              <input
                type="text" required
                value={form.lastName}
                onChange={e => setForm({ ...form, lastName: e.target.value })}
                className="w-full bg-brand-light border border-brand-mid px-3 py-3 text-sm text-brand-black outline-none focus:border-brand-black transition-colors"
                placeholder="Doe"
              />
            </div>
          </div>
          <div>
            <label className="block text-[10px] font-bold tracking-[0.15em] uppercase text-brand-muted mb-1.5">Email</label>
            <input
              type="email" required
              value={form.email}
              onChange={e => setForm({ ...form, email: e.target.value })}
              className="w-full bg-brand-light border border-brand-mid px-4 py-3 text-sm text-brand-black outline-none focus:border-brand-black transition-colors"
              placeholder="your@email.com"
            />
          </div>
          <div>
            <label className="block text-[10px] font-bold tracking-[0.15em] uppercase text-brand-muted mb-1.5">Phone</label>
            <input
              type="tel"
              value={form.phone}
              onChange={e => setForm({ ...form, phone: e.target.value })}
              className="w-full bg-brand-light border border-brand-mid px-4 py-3 text-sm text-brand-black outline-none focus:border-brand-black transition-colors"
              placeholder="0721234567"
            />
          </div>
          <div>
            <label className="block text-[10px] font-bold tracking-[0.15em] uppercase text-brand-muted mb-1.5">Password</label>
            <div className="relative">
              <input
                type={showPw ? 'text' : 'password'} required minLength={8}
                value={form.password}
                onChange={e => setForm({ ...form, password: e.target.value })}
                className="w-full bg-brand-light border border-brand-mid px-4 py-3 pr-10 text-sm text-brand-black outline-none focus:border-brand-black transition-colors"
                placeholder="Min. 8 characters"
              />
              <button type="button" onClick={() => setShowPw(s => !s)} className="absolute right-3 top-1/2 -translate-y-1/2 text-brand-muted hover:text-brand-black">
                {showPw ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {error && <p className="text-red-500 text-xs">{error}</p>}

          <button
            type="submit" disabled={loading}
            className="w-full bg-brand-black text-white py-3.5 text-[11px] font-bold tracking-[0.18em] uppercase hover:bg-brand-dark transition-colors disabled:opacity-60"
          >
            {loading ? 'Creating account...' : 'Create Account'}
          </button>
        </form>

        <p className="text-center text-xs text-brand-muted mt-6">
          Already have an account?{' '}
          <Link href={`/login${redirect !== '/account' ? `?redirect=${redirect}` : ''}`} className="text-brand-black font-semibold hover:text-brand-gold transition-colors">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  )
}
