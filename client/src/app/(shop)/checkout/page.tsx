'use client'
import { useQuery, useMutation } from '@tanstack/react-query'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { api } from '@/lib/api'
import { useCartStore } from '@/store/cartStore'
import { useAuthStore } from '@/store/authStore'
import { Eye, EyeOff, ChevronDown, ChevronUp, Plus } from 'lucide-react'

const SA_PROVINCES = ['Gauteng','Western Cape','KwaZulu-Natal','Eastern Cape','Free State','Limpopo','Mpumalanga','North West','Northern Cape']

const emptyAddress = { firstName: '', lastName: '', phone: '', line1: '', line2: '', city: '', province: '', postalCode: '' }

export default function CheckoutPage() {
  const router = useRouter()
  const { items, clearCart } = useCartStore()
  const { customer, token, login } = useAuthStore()
  const isLoggedIn = !!token

  // Auth form state
  const [authTab, setAuthTab] = useState<'login' | 'register'>('login')
  const [authForm, setAuthForm] = useState({ email: '', password: '', firstName: '', lastName: '', phone: '' })
  const [showPw, setShowPw] = useState(false)
  const [authError, setAuthError] = useState('')
  const [authLoading, setAuthLoading] = useState(false)

  // Address state
  const [selectedAddressId, setSelectedAddressId] = useState('')
  const [showNewForm, setShowNewForm] = useState(false)
  const [newAddress, setNewAddress] = useState(emptyAddress)
  const [savingAddress, setSavingAddress] = useState(false)

  // Order state
  const [orderError, setOrderError] = useState('')

  // Validate cart
  const { data: validated, isLoading: validating } = useQuery({
    queryKey: ['cart-validate', items.map(i => `${i.variantId}:${i.quantity}`).join(',')],
    queryFn: () => api.post<any>('/api/cart/validate', items.map(i => ({ variantId: i.variantId, quantity: i.quantity }))),
    enabled: items.length > 0,
  })

  // Saved addresses
  const { data: addresses, refetch: refetchAddresses } = useQuery({
    queryKey: ['addresses'],
    queryFn: () => api.get<any[]>('/api/auth/addresses'),
    enabled: isLoggedIn,
  })

  useEffect(() => {
    if (addresses?.length && !selectedAddressId) {
      setSelectedAddressId(addresses[0].id)
    }
    if (addresses?.length === 0) {
      setShowNewForm(true)
    }
  }, [addresses])

  // Auth handlers
  async function handleLogin(e: React.FormEvent) {
    e.preventDefault()
    setAuthLoading(true); setAuthError('')
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/login`, {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: authForm.email, password: authForm.password }),
      })
      const data = await res.json()
      if (!res.ok) { setAuthError(data.error ?? 'Login failed'); return }
      login(data.customer, data.token)
    } catch { setAuthError('Something went wrong.') }
    finally { setAuthLoading(false) }
  }

  async function handleRegister(e: React.FormEvent) {
    e.preventDefault()
    setAuthLoading(true); setAuthError('')
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/register`, {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: authForm.email, password: authForm.password, firstName: authForm.firstName, lastName: authForm.lastName, phone: authForm.phone }),
      })
      const data = await res.json()
      if (!res.ok) { setAuthError(data.error ?? 'Registration failed'); return }
      login(data.customer, data.token)
    } catch { setAuthError('Something went wrong.') }
    finally { setAuthLoading(false) }
  }

  // Save new address
  async function saveNewAddress(): Promise<string | null> {
    setSavingAddress(true)
    try {
      const res = await api.post<any>('/api/auth/addresses', { ...newAddress, isDefault: !addresses?.length })
      await refetchAddresses()
      setSelectedAddressId(res.id)
      setShowNewForm(false)
      setNewAddress(emptyAddress)
      return res.id
    } catch { return null }
    finally { setSavingAddress(false) }
  }

  // Place order + redirect to PayFast
  const placeOrder = useMutation({
    mutationFn: async () => {
      let addrId = selectedAddressId

      if (showNewForm || !addrId) {
        const id = await saveNewAddress()
        if (!id) throw new Error('Could not save address. Please try again.')
        addrId = id
      }

      return api.post<any>('/api/checkout', {
        addressId: addrId,
        items: items.map(i => ({ variantId: i.variantId, quantity: i.quantity })),
      })
    },
    onSuccess: (data) => {
      clearCart()
      // Auto-submit a hidden form to PayFast payment page
      const { url, fields } = data.payfast
      const form = document.createElement('form')
      form.method = 'POST'
      form.action = url
      Object.entries(fields).forEach(([key, value]) => {
        const input = document.createElement('input')
        input.type = 'hidden'
        input.name = key
        input.value = String(value)
        form.appendChild(input)
      })
      document.body.appendChild(form)
      form.submit()
    },
    onError: (err: Error) => setOrderError(err.message),
  })

  if (items.length === 0) {
    return (
      <div className="max-w-2xl mx-auto px-6 py-24 text-center">
        <p className="font-bebas text-4xl text-brand-black uppercase mb-4">Your Cart is Empty</p>
        <Link href="/products" className="text-[11px] font-bold tracking-[0.15em] uppercase text-brand-black hover:text-brand-gold transition-colors">
          Continue Shopping &rarr;
        </Link>
      </div>
    )
  }

  const validatedItems = validated?.items?.filter((i: any) => i.available !== false) ?? []
  const subtotal = validated?.subtotal ?? 0
  const shippingFee = subtotal >= 999 ? 0 : 99
  const total = subtotal + shippingFee

  const canPlaceOrder = isLoggedIn && (selectedAddressId || showNewForm) && validatedItems.length > 0 && !placeOrder.isPending

  return (
    <div className="max-w-5xl mx-auto px-6 py-12">
      <h1 className="font-bebas text-5xl uppercase tracking-wide text-brand-black mb-10">Checkout</h1>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
        {/* ── Left Column ── */}
        <div className="lg:col-span-3 space-y-6">

          {/* ── Section 1: Account ── */}
          <div className="border border-brand-mid">
            <div className="flex items-center gap-3 px-5 py-4 bg-brand-black text-white">
              <span className="font-bebas text-sm tracking-widest">01</span>
              <span className="text-[11px] font-bold tracking-[0.15em] uppercase">Account</span>
              {isLoggedIn && <span className="ml-auto text-[10px] text-white/50">{customer?.email}</span>}
            </div>

            {!isLoggedIn ? (
              <div className="p-5">
                {/* Tabs */}
                <div className="flex border-b border-brand-mid mb-5">
                  {(['login', 'register'] as const).map(tab => (
                    <button key={tab} onClick={() => setAuthTab(tab)}
                      className={`px-5 py-2.5 text-[11px] font-bold tracking-[0.15em] uppercase transition-colors ${authTab === tab ? 'border-b-2 border-brand-black text-brand-black' : 'text-brand-muted hover:text-brand-black'}`}>
                      {tab === 'login' ? 'Sign In' : 'Create Account'}
                    </button>
                  ))}
                </div>

                {authTab === 'login' ? (
                  <form onSubmit={handleLogin} className="space-y-3">
                    <input type="email" required placeholder="Email address"
                      value={authForm.email} onChange={e => setAuthForm({ ...authForm, email: e.target.value })}
                      className="w-full bg-brand-light border border-brand-mid px-4 py-3 text-sm outline-none focus:border-brand-black transition-colors" />
                    <div className="relative">
                      <input type={showPw ? 'text' : 'password'} required placeholder="Password"
                        value={authForm.password} onChange={e => setAuthForm({ ...authForm, password: e.target.value })}
                        className="w-full bg-brand-light border border-brand-mid px-4 py-3 pr-10 text-sm outline-none focus:border-brand-black transition-colors" />
                      <button type="button" onClick={() => setShowPw(s => !s)} className="absolute right-3 top-1/2 -translate-y-1/2 text-brand-muted">
                        {showPw ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                    {authError && <p className="text-red-500 text-xs">{authError}</p>}
                    <button type="submit" disabled={authLoading}
                      className="w-full bg-brand-black text-white py-3 text-[11px] font-bold tracking-[0.18em] uppercase hover:bg-brand-dark transition-colors disabled:opacity-60">
                      {authLoading ? 'Signing in...' : 'Sign In'}
                    </button>
                  </form>
                ) : (
                  <form onSubmit={handleRegister} className="space-y-3">
                    <div className="grid grid-cols-2 gap-3">
                      <input type="text" required placeholder="First name"
                        value={authForm.firstName} onChange={e => setAuthForm({ ...authForm, firstName: e.target.value })}
                        className="bg-brand-light border border-brand-mid px-4 py-3 text-sm outline-none focus:border-brand-black transition-colors" />
                      <input type="text" required placeholder="Last name"
                        value={authForm.lastName} onChange={e => setAuthForm({ ...authForm, lastName: e.target.value })}
                        className="bg-brand-light border border-brand-mid px-4 py-3 text-sm outline-none focus:border-brand-black transition-colors" />
                    </div>
                    <input type="email" required placeholder="Email address"
                      value={authForm.email} onChange={e => setAuthForm({ ...authForm, email: e.target.value })}
                      className="w-full bg-brand-light border border-brand-mid px-4 py-3 text-sm outline-none focus:border-brand-black transition-colors" />
                    <input type="tel" placeholder="Phone number"
                      value={authForm.phone} onChange={e => setAuthForm({ ...authForm, phone: e.target.value })}
                      className="w-full bg-brand-light border border-brand-mid px-4 py-3 text-sm outline-none focus:border-brand-black transition-colors" />
                    <div className="relative">
                      <input type={showPw ? 'text' : 'password'} required minLength={8} placeholder="Password (min. 8 chars)"
                        value={authForm.password} onChange={e => setAuthForm({ ...authForm, password: e.target.value })}
                        className="w-full bg-brand-light border border-brand-mid px-4 py-3 pr-10 text-sm outline-none focus:border-brand-black transition-colors" />
                      <button type="button" onClick={() => setShowPw(s => !s)} className="absolute right-3 top-1/2 -translate-y-1/2 text-brand-muted">
                        {showPw ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                    {authError && <p className="text-red-500 text-xs">{authError}</p>}
                    <button type="submit" disabled={authLoading}
                      className="w-full bg-brand-black text-white py-3 text-[11px] font-bold tracking-[0.18em] uppercase hover:bg-brand-dark transition-colors disabled:opacity-60">
                      {authLoading ? 'Creating account...' : 'Create Account'}
                    </button>
                  </form>
                )}
              </div>
            ) : (
              <div className="px-5 py-4 flex items-center gap-3">
                <div className="w-8 h-8 bg-brand-black text-white flex items-center justify-center text-sm font-bold">
                  {customer?.firstName?.[0]?.toUpperCase()}
                </div>
                <div>
                  <p className="text-sm font-semibold text-brand-black">{customer?.firstName} {customer?.lastName}</p>
                  <p className="text-xs text-brand-muted">{customer?.email}</p>
                </div>
              </div>
            )}
          </div>

          {/* ── Section 2: Delivery Address ── */}
          <div className={`border border-brand-mid ${!isLoggedIn ? 'opacity-40 pointer-events-none' : ''}`}>
            <div className="flex items-center gap-3 px-5 py-4 bg-brand-black text-white">
              <span className="font-bebas text-sm tracking-widest">02</span>
              <span className="text-[11px] font-bold tracking-[0.15em] uppercase">Delivery Address</span>
            </div>

            <div className="p-5 space-y-3">
              {/* Saved addresses */}
              {addresses?.map((a: any) => (
                <label key={a.id} onClick={() => { setSelectedAddressId(a.id); setShowNewForm(false) }}
                  className={`flex items-start gap-3 p-4 border cursor-pointer transition-colors ${selectedAddressId === a.id && !showNewForm ? 'border-brand-black bg-brand-light' : 'border-brand-mid hover:border-brand-black'}`}>
                  <input type="radio" name="address" readOnly checked={selectedAddressId === a.id && !showNewForm} className="mt-0.5 accent-black" />
                  <div className="text-sm">
                    <p className="font-semibold text-brand-black">{a.firstName} {a.lastName}</p>
                    <p className="text-brand-muted text-xs">{a.line1}{a.line2 ? `, ${a.line2}` : ''}, {a.city}, {a.province}, {a.postalCode}</p>
                    <p className="text-brand-muted text-xs">{a.phone}</p>
                  </div>
                </label>
              ))}

              {/* Add new address */}
              {addresses && addresses.length > 0 && (
                <button onClick={() => { setShowNewForm(s => !s); setSelectedAddressId('') }}
                  className="flex items-center gap-2 text-[11px] font-bold tracking-[0.12em] uppercase text-brand-black hover:text-brand-gold transition-colors">
                  {showNewForm ? <ChevronUp className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                  {showNewForm ? 'Cancel' : 'Add a different address'}
                </button>
              )}

              {/* New address form */}
              {showNewForm && (
                <div className="bg-brand-light border border-brand-mid p-4 space-y-3 mt-2">
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[10px] font-bold tracking-widest uppercase text-brand-muted mb-1">First Name *</label>
                      <input type="text" required value={newAddress.firstName} onChange={e => setNewAddress({ ...newAddress, firstName: e.target.value })}
                        className="w-full bg-white border border-brand-mid px-3 py-2.5 text-sm outline-none focus:border-brand-black transition-colors" />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold tracking-widest uppercase text-brand-muted mb-1">Last Name *</label>
                      <input type="text" required value={newAddress.lastName} onChange={e => setNewAddress({ ...newAddress, lastName: e.target.value })}
                        className="w-full bg-white border border-brand-mid px-3 py-2.5 text-sm outline-none focus:border-brand-black transition-colors" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold tracking-widest uppercase text-brand-muted mb-1">Phone *</label>
                    <input type="tel" required value={newAddress.phone} onChange={e => setNewAddress({ ...newAddress, phone: e.target.value })}
                      className="w-full bg-white border border-brand-mid px-3 py-2.5 text-sm outline-none focus:border-brand-black transition-colors" placeholder="0721234567" />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold tracking-widest uppercase text-brand-muted mb-1">Street Address *</label>
                    <input type="text" required value={newAddress.line1} onChange={e => setNewAddress({ ...newAddress, line1: e.target.value })}
                      className="w-full bg-white border border-brand-mid px-3 py-2.5 text-sm outline-none focus:border-brand-black transition-colors" placeholder="123 Main Street" />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold tracking-widest uppercase text-brand-muted mb-1">Apartment / Unit</label>
                    <input type="text" value={newAddress.line2} onChange={e => setNewAddress({ ...newAddress, line2: e.target.value })}
                      className="w-full bg-white border border-brand-mid px-3 py-2.5 text-sm outline-none focus:border-brand-black transition-colors" placeholder="Apt 4B (optional)" />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[10px] font-bold tracking-widest uppercase text-brand-muted mb-1">City *</label>
                      <input type="text" required value={newAddress.city} onChange={e => setNewAddress({ ...newAddress, city: e.target.value })}
                        className="w-full bg-white border border-brand-mid px-3 py-2.5 text-sm outline-none focus:border-brand-black transition-colors" />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold tracking-widest uppercase text-brand-muted mb-1">Postal Code *</label>
                      <input type="text" required value={newAddress.postalCode} onChange={e => setNewAddress({ ...newAddress, postalCode: e.target.value })}
                        className="w-full bg-white border border-brand-mid px-3 py-2.5 text-sm outline-none focus:border-brand-black transition-colors" placeholder="0001" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold tracking-widest uppercase text-brand-muted mb-1">Province *</label>
                    <select required value={newAddress.province} onChange={e => setNewAddress({ ...newAddress, province: e.target.value })}
                      className="w-full bg-white border border-brand-mid px-3 py-2.5 text-sm outline-none focus:border-brand-black transition-colors">
                      <option value="">Select province</option>
                      {SA_PROVINCES.map(p => <option key={p} value={p}>{p}</option>)}
                    </select>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* ── Right Column: Order Summary ── */}
        <div className="lg:col-span-2">
          <div className="border border-brand-mid sticky top-24">
            <div className="px-5 py-4 bg-brand-black text-white">
              <span className="text-[11px] font-bold tracking-[0.15em] uppercase">Order Summary</span>
            </div>
            <div className="p-5 space-y-3">
              {validating ? (
                <p className="text-brand-muted text-sm">Validating...</p>
              ) : (
                <>
                  {validatedItems.map((item: any) => (
                    <div key={item.variantId} className="flex justify-between text-sm">
                      <div className="flex-1 pr-2">
                        <p className="font-medium text-brand-black text-xs leading-snug">{item.productName}</p>
                        <p className="text-brand-muted text-[10px]">Size {item.size} × {item.quantity}</p>
                        {item.stockLimited && <p className="text-orange-500 text-[10px]">Reduced to {item.quantity} (limited stock)</p>}
                      </div>
                      <span className="font-bold text-brand-black text-xs whitespace-nowrap">R{item.lineTotal?.toFixed(2)}</span>
                    </div>
                  ))}

                  <div className="border-t border-brand-mid pt-3 space-y-1.5 text-sm">
                    <div className="flex justify-between text-brand-muted">
                      <span>Subtotal</span>
                      <span>R{subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-brand-muted">
                      <span>Shipping</span>
                      <span>{shippingFee === 0 ? 'Free' : `R${shippingFee.toFixed(2)}`}</span>
                    </div>
                    <div className="flex justify-between font-bold text-brand-black border-t border-brand-mid pt-2">
                      <span>Total</span>
                      <span>R{total.toFixed(2)}</span>
                    </div>
                  </div>

                  {shippingFee > 0 && (
                    <p className="text-[10px] text-brand-muted">Add R{(999 - subtotal).toFixed(2)} more for free delivery</p>
                  )}
                </>
              )}
            </div>

            {orderError && <p className="px-5 pb-2 text-red-500 text-xs">{orderError}</p>}

            <div className="px-5 pb-5">
              <button
                onClick={() => placeOrder.mutate()}
                disabled={!canPlaceOrder}
                className="w-full bg-brand-gold text-brand-black py-4 text-[11px] font-bold tracking-[0.18em] uppercase hover:opacity-90 transition-opacity disabled:opacity-40"
              >
                {placeOrder.isPending ? 'Redirecting to PayFast...' : !isLoggedIn ? 'Sign In to Continue' : 'Pay with PayFast'}
              </button>
              <p className="text-[10px] text-brand-muted text-center mt-3">Secure checkout powered by PayFast. You'll be redirected to complete payment.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
