'use client'
import { useState } from 'react'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import { useAuthStore } from '@/store/authStore'
import { Eye, EyeOff } from 'lucide-react'

export default function LoginPage() {
  const router = useRouter()
  const params = useSearchParams()
  const { login } = useAuthStore()
  const [form, setForm] = useState({ email: '', password: '' })
  const [showPw, setShowPw] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const redirect = params.get('redirect') ?? '/account'

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      const data = await res.json()
      if (!res.ok) { setError(data.error ?? 'Login failed'); return }
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
          <p className="text-[11px] font-semibold tracking-[0.2em] uppercase text-brand-gold mb-2">Welcome back</p>
          <h1 className="font-bebas text-4xl uppercase tracking-wide text-brand-black">Sign In</h1>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
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
            <label className="block text-[10px] font-bold tracking-[0.15em] uppercase text-brand-muted mb-1.5">Password</label>
            <div className="relative">
              <input
                type={showPw ? 'text' : 'password'} required
                value={form.password}
                onChange={e => setForm({ ...form, password: e.target.value })}
                className="w-full bg-brand-light border border-brand-mid px-4 py-3 pr-10 text-sm text-brand-black outline-none focus:border-brand-black transition-colors"
                placeholder="••••••••"
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
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>

        <p className="text-center text-xs text-brand-muted mt-6">
          Don&apos;t have an account?{' '}
          <Link href={`/register${redirect !== '/account' ? `?redirect=${redirect}` : ''}`} className="text-brand-black font-semibold hover:text-brand-gold transition-colors">
            Create one
          </Link>
        </p>
      </div>
    </div>
  )
}
