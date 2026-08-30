'use client'
import { useQuery, useMutation } from '@tanstack/react-query'
import { useState, useMemo } from 'react'
import api from '@/lib/api'
import { Send, X, Search } from 'lucide-react'

const TEMPLATES = [
  {
    id: 'sale',
    label: 'Sale Announcement',
    subject: '🔥 Exclusive Sale — Up to 25% Off at Bevans Sons',
    heading: 'Exclusive Sale — Limited Time',
    body: 'Hi there,\n\nWe have an exclusive sale running right now — up to 25% off on selected sneakers!\n\nDon\'t miss out. Shop now and step into your next pair.\n\nOffer ends soon.',
    ctaText: 'Shop the Sale',
    ctaUrl: 'https://bevanssons.store/products',
  },
  {
    id: 'new_arrivals',
    label: 'New Arrivals',
    subject: 'New sneakers just dropped at Bevans Sons 🚀',
    heading: 'Fresh Drops Just Landed',
    body: 'Hi there,\n\nWe\'ve just added exciting new sneakers to our store — from the latest running shoes to lifestyle kicks.\n\nBe the first to grab what\'s new before they sell out!',
    ctaText: 'See New Arrivals',
    ctaUrl: 'https://bevanssons.store/products?sort=newest',
  },
  {
    id: 'cart',
    label: 'Cart Reminder',
    subject: 'You left something behind — come back and complete your order',
    heading: 'You left something in your cart',
    body: 'Hi there,\n\nYou visited our store recently but didn\'t complete your order.\n\nYour sneakers are waiting. Come back and complete your purchase before they sell out!',
    ctaText: 'Return to Cart',
    ctaUrl: 'https://bevanssons.store/checkout',
  },
  {
    id: 'followup',
    label: 'Order Follow-up',
    subject: 'How is your order from Bevans Sons?',
    heading: 'How\'s everything going?',
    body: 'Hi there,\n\nWe hope you\'re loving your recent purchase from Bevans Sons!\n\nIf you have any questions or need support, we\'re always here to help. Reach out on WhatsApp anytime.',
    ctaText: 'WhatsApp Us',
    ctaUrl: 'https://wa.me/27724816274',
  },
  {
    id: 'custom',
    label: 'Custom Message',
    subject: '',
    heading: '',
    body: '',
    ctaText: '',
    ctaUrl: '',
  },
]

export default function EmailsPage() {
  const [templateId, setTemplateId] = useState('sale')
  const [subject, setSubject] = useState(TEMPLATES[0].subject)
  const [heading, setHeading] = useState(TEMPLATES[0].heading)
  const [body, setBody] = useState(TEMPLATES[0].body)
  const [ctaText, setCtaText] = useState(TEMPLATES[0].ctaText)
  const [ctaUrl, setCtaUrl] = useState(TEMPLATES[0].ctaUrl)
  const [recipients, setRecipients] = useState('all')
  const [customEmail, setCustomEmail] = useState('')
  const [productSearch, setProductSearch] = useState('')
  const [selectedProducts, setSelectedProducts] = useState<any[]>([])
  const [pickerOpen, setPickerOpen] = useState(false)
  const [result, setResult] = useState<{ sent: number; total: number } | null>(null)
  const [error, setError] = useState('')

  const { data: customersData } = useQuery({ queryKey: ['customers-count'], queryFn: () => api.get<any>('/api/admin/customers?pageSize=1') })
  const { data: productsData } = useQuery({ queryKey: ['products-all'], queryFn: () => api.get<any>('/api/admin/products?pageSize=100&status=PUBLISHED') })

  const customerCount = customersData?.pagination?.total ?? 0
  const allProducts: any[] = productsData?.data ?? []

  const filteredProducts = useMemo(() => {
    const q = productSearch.toLowerCase()
    return allProducts.filter(p =>
      !selectedProducts.find(s => s.id === p.id) &&
      (p.name?.toLowerCase().includes(q) || p.category?.name?.toLowerCase().includes(q))
    )
  }, [allProducts, productSearch, selectedProducts])

  const send = useMutation({
    mutationFn: () => {
      if (!subject.trim() || !heading.trim() || !body.trim()) throw new Error('Subject, heading and body are required')
      return api.post<any>('/api/admin/email/send-campaign', {
        subject, heading, body, ctaText, ctaUrl, recipients, customEmail,
        featuredProducts: selectedProducts.map(p => ({
          id: p.id, name: p.name,
          price: `R${parseFloat(p.sellingPrice).toFixed(2)}`,
          imageUrl: p.images?.[0] ?? '',
        })),
      })
    },
    onSuccess: data => { setResult(data); setError('') },
    onError: (err: any) => setError(err.message ?? 'Send failed'),
  })

  function applyTemplate(id: string) {
    const t = TEMPLATES.find(t => t.id === id)!
    setTemplateId(id)
    setSubject(t.subject); setHeading(t.heading); setBody(t.body); setCtaText(t.ctaText); setCtaUrl(t.ctaUrl)
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Email Marketing</h1>
        <p className="text-sm text-gray-500">Compose and send campaigns to your customers</p>
      </div>

      <div className="grid lg:grid-cols-5 gap-6">
        {/* Composer */}
        <div className="lg:col-span-3 space-y-4">

          {/* Templates */}
          <div className="bg-white rounded-xl border border-gray-200 p-5">
            <p className="text-xs font-bold tracking-widest uppercase text-gray-400 mb-3">Template</p>
            <div className="flex flex-wrap gap-2">
              {TEMPLATES.map(t => (
                <button
                  key={t.id}
                  onClick={() => applyTemplate(t.id)}
                  className={`text-xs px-3 py-1.5 rounded-full font-medium transition-colors border ${templateId === t.id ? 'bg-gray-900 text-white border-gray-900' : 'bg-white text-gray-600 border-gray-200 hover:bg-gray-50'}`}
                >
                  {t.label}
                </button>
              ))}
            </div>
          </div>

          {/* Fields */}
          <div className="bg-white rounded-xl border border-gray-200 p-5 space-y-4">
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1.5">Subject line</label>
              <input value={subject} onChange={e => setSubject(e.target.value)} placeholder="Email subject…" className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-gray-900" />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1.5">Heading</label>
              <input value={heading} onChange={e => setHeading(e.target.value)} placeholder="Main heading…" className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-gray-900" />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1.5">Body</label>
              <textarea value={body} onChange={e => setBody(e.target.value)} rows={6} placeholder="Write your message…" className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-gray-900 resize-none" />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1.5">Button text</label>
                <input value={ctaText} onChange={e => setCtaText(e.target.value)} placeholder="Shop Now" className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-gray-900" />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1.5">Button URL</label>
                <input value={ctaUrl} onChange={e => setCtaUrl(e.target.value)} placeholder="https://…" className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-gray-900" />
              </div>
            </div>
          </div>

          {/* Product picker */}
          <div className="bg-white rounded-xl border border-gray-200 p-5">
            <div className="flex items-center justify-between mb-3">
              <p className="text-xs font-bold tracking-widest uppercase text-gray-400">Featured Products</p>
              {selectedProducts.length < 4 && (
                <button onClick={() => setPickerOpen(o => !o)} className="text-xs px-3 py-1.5 rounded-lg border border-gray-200 hover:bg-gray-50 text-gray-600">
                  + Add product
                </button>
              )}
            </div>

            {selectedProducts.length > 0 && (
              <div className="grid grid-cols-2 gap-2 mb-3">
                {selectedProducts.map(p => (
                  <div key={p.id} className="flex items-center gap-2 bg-gray-50 rounded-lg p-2 border border-gray-200">
                    {p.images?.[0] ? <img src={p.images[0]} alt={p.name} className="w-10 h-10 rounded-lg object-cover flex-shrink-0" /> : <div className="w-10 h-10 rounded-lg bg-gray-200 flex-shrink-0" />}
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-semibold text-gray-900 truncate">{p.name}</p>
                      <p className="text-xs text-gray-500">R{parseFloat(p.sellingPrice).toFixed(2)}</p>
                    </div>
                    <button onClick={() => setSelectedProducts(prev => prev.filter(s => s.id !== p.id))} className="text-gray-400 hover:text-red-500 flex-shrink-0">
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            )}

            {pickerOpen && selectedProducts.length < 4 && (
              <div>
                <div className="relative mb-2">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input autoFocus value={productSearch} onChange={e => setProductSearch(e.target.value)} placeholder="Search products…" className="w-full border border-gray-200 rounded-lg pl-9 pr-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-900" />
                </div>
                <div className="max-h-52 overflow-y-auto rounded-lg border border-gray-200 divide-y divide-gray-100">
                  {filteredProducts.slice(0, 30).map(p => (
                    <button key={p.id} onClick={() => { setSelectedProducts(prev => [...prev, p]); if (selectedProducts.length + 1 >= 4) setPickerOpen(false) }} className="w-full flex items-center gap-3 px-3 py-2.5 hover:bg-gray-50 transition-colors text-left">
                      {p.images?.[0] ? <img src={p.images[0]} alt={p.name} className="w-9 h-9 rounded-lg object-cover flex-shrink-0" /> : <div className="w-9 h-9 rounded-lg bg-gray-100 flex-shrink-0" />}
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 truncate">{p.name}</p>
                        <p className="text-xs text-gray-400">{p.category?.name}</p>
                      </div>
                      <p className="text-sm font-bold text-gray-900 flex-shrink-0">R{parseFloat(p.sellingPrice).toFixed(2)}</p>
                    </button>
                  ))}
                  {filteredProducts.length === 0 && <p className="text-gray-400 text-xs text-center py-4">No products found</p>}
                </div>
              </div>
            )}

            {selectedProducts.length === 0 && !pickerOpen && (
              <p className="text-gray-400 text-xs">No products selected — email will send without product images.</p>
            )}
          </div>
        </div>

        {/* Send panel */}
        <div className="lg:col-span-2 space-y-4">
          <div className="bg-white rounded-xl border border-gray-200 p-5 space-y-4">
            <p className="font-semibold text-gray-900 text-sm">Send to</p>
            <div className="space-y-2">
              {[
                { value: 'all', label: 'All customers', sub: `${customerCount} emails` },
                { value: 'pending', label: 'Pending orders', sub: 'Customers awaiting payment' },
                { value: 'custom', label: 'Specific email', sub: 'Test or one person' },
              ].map(opt => (
                <label key={opt.value} className={`flex items-start gap-3 p-3 rounded-lg cursor-pointer border transition-colors ${recipients === opt.value ? 'border-gray-900 bg-gray-50' : 'border-gray-200 hover:border-gray-300'}`}>
                  <input type="radio" name="recipients" value={opt.value} checked={recipients === opt.value} onChange={() => setRecipients(opt.value)} className="mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-gray-900">{opt.label}</p>
                    <p className="text-xs text-gray-400">{opt.sub}</p>
                  </div>
                </label>
              ))}
            </div>

            {recipients === 'custom' && (
              <input value={customEmail} onChange={e => setCustomEmail(e.target.value)} placeholder="recipient@email.com" type="email" className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-gray-900" />
            )}

            {error && <p className="text-red-500 text-sm">{error}</p>}

            {result && (
              <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-center">
                <p className="text-green-700 font-bold text-xl">{result.sent}</p>
                <p className="text-green-600 text-xs mt-0.5">emails sent of {result.total} recipients</p>
              </div>
            )}

            <button
              onClick={() => send.mutate()}
              disabled={send.isPending}
              className="w-full flex items-center justify-center gap-2 bg-gray-900 text-white py-3 rounded-lg text-sm font-semibold hover:bg-gray-800 disabled:opacity-40 transition-colors"
            >
              <Send className="w-4 h-4" />
              {send.isPending ? 'Sending…' : `Send Campaign`}
            </button>
          </div>

          <div className="bg-gray-50 rounded-xl border border-gray-200 p-5">
            <p className="text-xs font-bold tracking-widest uppercase text-gray-400 mb-3">Requires Setup</p>
            <div className="space-y-2 text-xs text-gray-500">
              <p>Add <code className="bg-gray-200 px-1 rounded">RESEND_API_KEY</code> to <code className="bg-gray-200 px-1 rounded">backend/.env</code></p>
              <p>Add <code className="bg-gray-200 px-1 rounded">EMAIL_FROM</code> (e.g. <code className="bg-gray-200 px-1 rounded">noreply@bevanssons.store</code>)</p>
              <p>Verify your domain in the Resend dashboard</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
