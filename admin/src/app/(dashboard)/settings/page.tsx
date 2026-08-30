'use client'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { useState, useEffect } from 'react'
import api from '@/lib/api'

const STORE_INFO_KEYS = [
  { key: 'store_name', label: 'Store Name', placeholder: 'Bevans Sons' },
  { key: 'store_tagline', label: 'Tagline', placeholder: 'Premium sneakers...' },
  { key: 'store_reg', label: 'Registration Number', placeholder: '2023/116995/07' },
  { key: 'contact_email', label: 'Email Address', placeholder: 'hello@yourstore.com', type: 'email' },
  { key: 'contact_phone', label: 'Phone Number', placeholder: '0724816274' },
  { key: 'contact_whatsapp', label: 'WhatsApp Number (digits only)', placeholder: '27724816274' },
  { key: 'contact_address', label: 'Physical Address', placeholder: 'Johannesburg, South Africa' },
  { key: 'social_instagram', label: 'Instagram URL', placeholder: 'https://instagram.com/yourhandle' },
  { key: 'social_tiktok', label: 'TikTok URL', placeholder: 'https://tiktok.com/@yourhandle' },
  { key: 'social_facebook', label: 'Facebook URL', placeholder: 'https://facebook.com/yourpage' },
]

export default function SettingsPage() {
  const qc = useQueryClient()
  const [saved, setSaved] = useState('')
  const [storeInfoForm, setStoreInfoForm] = useState<Record<string, string>>({})

  const { data: settings } = useQuery({ queryKey: ['settings'], queryFn: () => api.get<any[]>('/api/admin/settings') })
  const { data: pricingRules } = useQuery({ queryKey: ['pricing-rules'], queryFn: () => api.get<any[]>('/api/admin/settings/pricing-rules') })
  const { data: allocationRules } = useQuery({ queryKey: ['allocation-rules-s'], queryFn: () => api.get<any[]>('/api/admin/finance/allocation-rules') })

  const [pricingForm, setPricingForm] = useState<Record<string, string>>({})
  const [allocForm, setAllocForm] = useState<Record<string, string>>({})

  const savePricing = useMutation({
    mutationFn: () => api.put('/api/admin/settings/pricing-rules', Object.entries(pricingForm).map(([key, value]) => ({ key, value: parseFloat(value) }))),
    onSuccess: () => { qc.invalidateQueries({ queryKey: ['pricing-rules'] }); setSaved('pricing') },
  })

  const saveAlloc = useMutation({
    mutationFn: () => {
      const updated = allocationRules?.map((r: any) => ({ ...r, percentage: parseFloat(allocForm[r.accountKey] ?? r.percentage) / 100 })) ?? []
      return api.put('/api/admin/finance/allocation-rules', updated)
    },
    onSuccess: () => { qc.invalidateQueries({ queryKey: ['allocation-rules-s'] }); setSaved('alloc') },
    onError: (err: Error) => setSaved('error:' + err.message),
  })

  // Populate storeInfoForm from loaded settings
  useEffect(() => {
    if (!settings) return
    const map: Record<string, string> = {}
    for (const row of settings as any[]) {
      if (row.category === 'store_info') map[row.key] = row.value
    }
    setStoreInfoForm(map)
  }, [settings])

  const saveStoreInfo = useMutation({
    mutationFn: () => api.put('/api/admin/settings', STORE_INFO_KEYS.map(({ key }) => ({ key, value: storeInfoForm[key] ?? '', category: 'store_info' }))),
    onSuccess: () => { qc.invalidateQueries({ queryKey: ['settings'] }); setSaved('storeInfo') },
  })

  return (
    <div className="space-y-8 max-w-3xl">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
        <p className="text-sm text-gray-500">Configure business rules, pricing, and financial allocations</p>
      </div>

      {/* Store & Contact Info */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h2 className="font-semibold text-gray-900 mb-1">Store & Contact Info</h2>
        <p className="text-xs text-gray-400 mb-5">These appear on your website footer, contact page, and emails. No code changes needed.</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {STORE_INFO_KEYS.map(({ key, label, placeholder, type }) => (
            <div key={key}>
              <label className="text-xs font-medium text-gray-600 block mb-1">{label}</label>
              <input
                type={type ?? 'text'}
                value={storeInfoForm[key] ?? ''}
                onChange={(e) => setStoreInfoForm((f) => ({ ...f, [key]: e.target.value }))}
                placeholder={placeholder}
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-900 placeholder:text-gray-300"
              />
            </div>
          ))}
        </div>
        <div className="flex items-center gap-3 mt-5">
          <button onClick={() => saveStoreInfo.mutate()} disabled={saveStoreInfo.isPending} className="px-4 py-2 bg-gray-900 text-white rounded-lg text-sm hover:bg-gray-800 disabled:opacity-40">
            {saveStoreInfo.isPending ? 'Saving...' : 'Save Store Info'}
          </button>
          {saved === 'storeInfo' && <span className="text-green-600 text-sm">Saved! Changes live on the website.</span>}
        </div>
      </div>

      {/* Pricing Rules */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h2 className="font-semibold text-gray-900 mb-1">Pricing Rules</h2>
        <p className="text-xs text-gray-400 mb-5">These drive the automatic pricing recommendations. No code changes required.</p>
        <div className="space-y-4">
          {pricingRules?.map((r: any) => (
            <div key={r.key} className="flex items-center gap-4">
              <div className="flex-1">
                <label className="text-sm font-medium text-gray-700">{r.name}</label>
                {r.description && <p className="text-xs text-gray-400">{r.description}</p>}
              </div>
              <input
                type="number"
                step="0.01"
                defaultValue={parseFloat(r.value)}
                onChange={(e) => setPricingForm((f) => ({ ...f, [r.key]: e.target.value }))}
                className="w-32 border border-gray-200 rounded-lg px-3 py-1.5 text-sm text-right focus:outline-none focus:ring-2 focus:ring-gray-900"
              />
            </div>
          ))}
        </div>
        <div className="flex items-center gap-3 mt-5">
          <button onClick={() => savePricing.mutate()} disabled={savePricing.isPending} className="px-4 py-2 bg-gray-900 text-white rounded-lg text-sm hover:bg-gray-800 disabled:opacity-40">
            {savePricing.isPending ? 'Saving...' : 'Save Pricing Rules'}
          </button>
          {saved === 'pricing' && <span className="text-green-600 text-sm">Saved!</span>}
        </div>
      </div>

      {/* Allocation Rules */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h2 className="font-semibold text-gray-900 mb-1">Financial Allocation Rules</h2>
        <p className="text-xs text-gray-400 mb-5">How each payment is split across virtual wallets. Must total exactly 100%.</p>
        <div className="space-y-4">
          {allocationRules?.map((r: any) => (
            <div key={r.accountKey} className="flex items-center gap-4">
              <div className="flex-1">
                <label className="text-sm font-medium text-gray-700">{r.name.replace(' Allocation', '')}</label>
                {r.description && <p className="text-xs text-gray-400">{r.description}</p>}
              </div>
              <div className="flex items-center gap-1">
                <input
                  type="number"
                  step="1"
                  min="0"
                  max="100"
                  defaultValue={(parseFloat(r.percentage) * 100).toFixed(0)}
                  onChange={(e) => setAllocForm((f) => ({ ...f, [r.accountKey]: e.target.value }))}
                  className="w-20 border border-gray-200 rounded-lg px-3 py-1.5 text-sm text-right focus:outline-none focus:ring-2 focus:ring-gray-900"
                />
                <span className="text-sm text-gray-400">%</span>
              </div>
            </div>
          ))}
        </div>
        <div className="flex items-center gap-3 mt-5">
          <button onClick={() => saveAlloc.mutate()} disabled={saveAlloc.isPending} className="px-4 py-2 bg-gray-900 text-white rounded-lg text-sm hover:bg-gray-800 disabled:opacity-40">
            {saveAlloc.isPending ? 'Saving...' : 'Save Allocation Rules'}
          </button>
          {saved === 'alloc' && <span className="text-green-600 text-sm">Saved!</span>}
          {saved.startsWith('error:') && <span className="text-red-600 text-sm">{saved.replace('error:', '')}</span>}
        </div>
      </div>

      {/* General Settings */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h2 className="font-semibold text-gray-900 mb-4">Business Settings</h2>
        <div className="space-y-3 text-sm">
          {settings?.filter((s: any) => ['minimum_reserve_balance', 'minimum_roas', 'refund_policy_days', 'low_stock_default_threshold'].includes(s.key)).map((s: any) => (
            <div key={s.key} className="flex items-center gap-4">
              <div className="flex-1">
                <p className="font-medium text-gray-700">{s.key.replace(/_/g, ' ')}</p>
                {s.description && <p className="text-xs text-gray-400">{s.description}</p>}
              </div>
              <input
                type="text"
                defaultValue={s.value}
                className="w-32 border border-gray-200 rounded-lg px-3 py-1.5 text-sm text-right focus:outline-none focus:ring-2 focus:ring-gray-900"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
