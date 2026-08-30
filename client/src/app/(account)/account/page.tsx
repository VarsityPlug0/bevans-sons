'use client'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { useAuthStore } from '@/store/authStore'
import { api } from '@/lib/api'
import { LogOut, Package, MapPin, Plus, Trash2, User } from 'lucide-react'

interface Address {
  id: string
  firstName: string
  lastName: string
  line1: string
  line2?: string
  city: string
  province: string
  postalCode: string
  country: string
  isDefault: boolean
}

const SA_PROVINCES = [
  'Eastern Cape', 'Free State', 'Gauteng', 'KwaZulu-Natal',
  'Limpopo', 'Mpumalanga', 'North West', 'Northern Cape', 'Western Cape',
]

const BLANK_FORM = { firstName: '', lastName: '', phone: '', line1: '', line2: '', city: '', province: '', postalCode: '', country: 'South Africa' }

export default function AccountPage() {
  const router = useRouter()
  const { customer, logout } = useAuthStore()
  const [mounted, setMounted] = useState(false)
  const [addresses, setAddresses] = useState<Address[]>([])
  const [showAddForm, setShowAddForm] = useState(false)
  const [form, setForm] = useState(BLANK_FORM)
  const [saving, setSaving] = useState(false)
  const [deleting, setDeleting] = useState<string | null>(null)
  const [error, setError] = useState('')

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!mounted) return
    if (!customer) {
      router.replace('/login?redirect=/account')
      return
    }
    fetchAddresses()
  }, [mounted, customer])

  async function fetchAddresses() {
    try {
      const data = await api.get<Address[]>('/api/auth/addresses')
      setAddresses(Array.isArray(data) ? data : [])
    } catch {}
  }

  async function handleSaveAddress(e: React.FormEvent) {
    e.preventDefault()
    setSaving(true)
    setError('')
    try {
      await api.post('/api/auth/addresses', form)
      setForm(BLANK_FORM)
      setShowAddForm(false)
      fetchAddresses()
    } catch (err: any) {
      setError(err.message ?? 'Failed to save address')
    } finally {
      setSaving(false)
    }
  }

  async function handleDelete(id: string) {
    setDeleting(id)
    try {
      await api.delete(`/api/auth/addresses/${id}`)
      setAddresses(prev => prev.filter(a => a.id !== id))
    } catch {}
    setDeleting(null)
  }

  function handleLogout() {
    logout()
    router.push('/')
  }

  if (!mounted || !customer) return null

  return (
    <div className="min-h-[70vh] max-w-3xl mx-auto px-6 py-14">
      {/* Header */}
      <div className="flex items-start justify-between mb-10">
        <div>
          <p className="text-[11px] font-semibold tracking-[0.2em] uppercase text-brand-gold mb-1">My Account</p>
          <h1 className="font-bebas text-4xl uppercase tracking-wide text-brand-black">
            {customer.firstName} {customer.lastName}
          </h1>
          <p className="text-sm text-brand-muted mt-1">{customer.email}</p>
        </div>
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 text-[11px] font-bold tracking-[0.15em] uppercase text-brand-muted hover:text-brand-black transition-colors"
        >
          <LogOut className="w-4 h-4" />
          Sign Out
        </button>
      </div>

      {/* Quick links */}
      <div className="grid grid-cols-2 gap-3 mb-10">
        <Link
          href="/account/orders"
          className="flex items-center gap-3 border border-brand-mid p-4 hover:border-brand-black transition-colors group"
        >
          <Package className="w-5 h-5 text-brand-muted group-hover:text-brand-black transition-colors" />
          <div>
            <p className="text-[11px] font-bold tracking-[0.15em] uppercase text-brand-black">My Orders</p>
            <p className="text-xs text-brand-muted mt-0.5">Track & view orders</p>
          </div>
        </Link>
        <div className="flex items-center gap-3 border border-brand-mid p-4">
          <User className="w-5 h-5 text-brand-muted" />
          <div>
            <p className="text-[11px] font-bold tracking-[0.15em] uppercase text-brand-black">Profile</p>
            <p className="text-xs text-brand-muted mt-0.5">{customer.email}</p>
          </div>
        </div>
      </div>

      {/* Saved Addresses */}
      <div>
        <div className="flex items-center justify-between mb-5">
          <div>
            <p className="text-[11px] font-semibold tracking-[0.2em] uppercase text-brand-gold mb-1">Saved</p>
            <h2 className="font-bebas text-2xl uppercase tracking-wide text-brand-black">Delivery Addresses</h2>
          </div>
          {!showAddForm && (
            <button
              onClick={() => setShowAddForm(true)}
              className="flex items-center gap-2 text-[11px] font-bold tracking-[0.15em] uppercase text-brand-black border border-brand-black px-4 py-2 hover:bg-brand-black hover:text-white transition-colors"
            >
              <Plus className="w-3.5 h-3.5" />
              Add New
            </button>
          )}
        </div>

        {addresses.length === 0 && !showAddForm && (
          <div className="border border-brand-mid p-8 text-center">
            <MapPin className="w-8 h-8 text-brand-mid mx-auto mb-3" />
            <p className="text-sm text-brand-muted">No saved addresses yet.</p>
          </div>
        )}

        <div className="space-y-3">
          {addresses.map(addr => (
            <div key={addr.id} className="border border-brand-mid p-4 flex items-start justify-between">
              <div className="text-sm text-brand-black space-y-0.5">
                <p className="font-semibold">{addr.firstName} {addr.lastName}</p>
                <p className="text-brand-muted">{addr.line1}{addr.line2 ? `, ${addr.line2}` : ''}</p>
                <p className="text-brand-muted">{addr.city}, {addr.province} {addr.postalCode}</p>
                <p className="text-brand-muted">{addr.country}</p>
                {addr.isDefault && (
                  <span className="inline-block mt-1 text-[10px] font-bold tracking-[0.12em] uppercase text-brand-gold">Default</span>
                )}
              </div>
              <button
                onClick={() => handleDelete(addr.id)}
                disabled={deleting === addr.id}
                className="text-brand-muted hover:text-red-500 transition-colors disabled:opacity-40"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>

        {/* Add address form */}
        {showAddForm && (
          <form onSubmit={handleSaveAddress} className="border border-brand-mid p-6 mt-4 space-y-4">
            <p className="text-[11px] font-bold tracking-[0.15em] uppercase text-brand-black mb-2">New Address</p>

            <div className="grid grid-cols-2 gap-3">
              {(['firstName', 'lastName'] as const).map(field => (
                <div key={field}>
                  <label className="block text-[10px] font-bold tracking-[0.15em] uppercase text-brand-muted mb-1.5">
                    {field === 'firstName' ? 'First Name' : 'Last Name'}
                  </label>
                  <input
                    required
                    value={form[field]}
                    onChange={e => setForm({ ...form, [field]: e.target.value })}
                    className="w-full bg-brand-light border border-brand-mid px-3 py-2.5 text-sm text-brand-black outline-none focus:border-brand-black transition-colors"
                  />
                </div>
              ))}
            </div>

            <div>
              <label className="block text-[10px] font-bold tracking-[0.15em] uppercase text-brand-muted mb-1.5">Phone</label>
              <input
                required
                type="tel"
                value={form.phone}
                onChange={e => setForm({ ...form, phone: e.target.value })}
                placeholder="0721234567"
                className="w-full bg-brand-light border border-brand-mid px-3 py-2.5 text-sm text-brand-black outline-none focus:border-brand-black transition-colors"
              />
            </div>

            <div>
              <label className="block text-[10px] font-bold tracking-[0.15em] uppercase text-brand-muted mb-1.5">Address Line 1</label>
              <input
                required
                value={form.line1}
                onChange={e => setForm({ ...form, line1: e.target.value })}
                placeholder="Street address"
                className="w-full bg-brand-light border border-brand-mid px-3 py-2.5 text-sm text-brand-black outline-none focus:border-brand-black transition-colors"
              />
            </div>

            <div>
              <label className="block text-[10px] font-bold tracking-[0.15em] uppercase text-brand-muted mb-1.5">Address Line 2 (optional)</label>
              <input
                value={form.line2}
                onChange={e => setForm({ ...form, line2: e.target.value })}
                placeholder="Apartment, suite, unit, etc."
                className="w-full bg-brand-light border border-brand-mid px-3 py-2.5 text-sm text-brand-black outline-none focus:border-brand-black transition-colors"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-[10px] font-bold tracking-[0.15em] uppercase text-brand-muted mb-1.5">City</label>
                <input
                  required
                  value={form.city}
                  onChange={e => setForm({ ...form, city: e.target.value })}
                  className="w-full bg-brand-light border border-brand-mid px-3 py-2.5 text-sm text-brand-black outline-none focus:border-brand-black transition-colors"
                />
              </div>
              <div>
                <label className="block text-[10px] font-bold tracking-[0.15em] uppercase text-brand-muted mb-1.5">Postal Code</label>
                <input
                  required
                  value={form.postalCode}
                  onChange={e => setForm({ ...form, postalCode: e.target.value })}
                  className="w-full bg-brand-light border border-brand-mid px-3 py-2.5 text-sm text-brand-black outline-none focus:border-brand-black transition-colors"
                />
              </div>
            </div>

            <div>
              <label className="block text-[10px] font-bold tracking-[0.15em] uppercase text-brand-muted mb-1.5">Province</label>
              <select
                required
                value={form.province}
                onChange={e => setForm({ ...form, province: e.target.value })}
                className="w-full bg-brand-light border border-brand-mid px-3 py-2.5 text-sm text-brand-black outline-none focus:border-brand-black transition-colors"
              >
                <option value="">Select province</option>
                {SA_PROVINCES.map(p => <option key={p} value={p}>{p}</option>)}
              </select>
            </div>

            {error && <p className="text-red-500 text-xs">{error}</p>}

            <div className="flex gap-3 pt-2">
              <button
                type="submit"
                disabled={saving}
                className="flex-1 bg-brand-black text-white py-3 text-[11px] font-bold tracking-[0.18em] uppercase hover:bg-brand-dark transition-colors disabled:opacity-60"
              >
                {saving ? 'Saving...' : 'Save Address'}
              </button>
              <button
                type="button"
                onClick={() => { setShowAddForm(false); setForm(BLANK_FORM); setError('') }}
                className="px-5 py-3 border border-brand-mid text-[11px] font-bold tracking-[0.15em] uppercase text-brand-muted hover:border-brand-black hover:text-brand-black transition-colors"
              >
                Cancel
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  )
}
