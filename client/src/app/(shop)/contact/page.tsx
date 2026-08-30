'use client'
import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { Mail, Phone, MessageCircle, Send } from 'lucide-react'
import { fetchStoreInfo, type StoreInfo } from '@/lib/storeInfo'

const FALLBACK: StoreInfo = {
  storeName: 'Bevans Sons', storeTagline: '', storeReg: '',
  email: 'MkhabeleEnterprise@gmail.com', phone: '0724816274',
  whatsapp: '27724816274', address: '', instagram: '', tiktok: '', facebook: '',
}

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' })
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle')
  const { data: info = FALLBACK } = useQuery({ queryKey: ['store-info'], queryFn: fetchStoreInfo, staleTime: 60_000 })

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setStatus('sending')
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      setStatus(res.ok ? 'sent' : 'error')
    } catch {
      setStatus('error')
    }
  }

  return (
    <div className="max-w-5xl mx-auto px-6 py-20">
      {/* Header */}
      <div className="mb-12 text-center">
        <p className="text-[11px] font-semibold tracking-[0.2em] uppercase text-brand-gold mb-3">Get in Touch</p>
        <h1 className="font-bebas text-6xl text-brand-black mb-4 uppercase">Contact Us</h1>
        <p className="text-brand-muted text-sm max-w-md mx-auto">
          Questions about an order, sizing help, or anything else? We respond fast — usually within a few hours.
        </p>
      </div>

      <div className="grid lg:grid-cols-5 gap-10">
        {/* Contact Info */}
        <div className="lg:col-span-2 space-y-4">
          <div className="bg-brand-light border border-brand-mid p-6 space-y-5">
            <h2 className="font-bebas text-2xl uppercase tracking-wide text-brand-black">Contact Details</h2>

            {info.email && (
              <a href={`mailto:${info.email}`} className="flex items-start gap-4 group">
                <div className="w-10 h-10 bg-brand-black flex items-center justify-center flex-shrink-0">
                  <Mail className="w-4 h-4 text-brand-gold" />
                </div>
                <div>
                  <p className="text-[10px] text-brand-muted uppercase tracking-widest font-bold mb-0.5">Email</p>
                  <p className="text-xs text-brand-black group-hover:text-brand-gold transition-colors">{info.email}</p>
                </div>
              </a>
            )}

            {info.phone && (
              <a href={`tel:${info.phone}`} className="flex items-start gap-4 group">
                <div className="w-10 h-10 bg-brand-black flex items-center justify-center flex-shrink-0">
                  <Phone className="w-4 h-4 text-brand-gold" />
                </div>
                <div>
                  <p className="text-[10px] text-brand-muted uppercase tracking-widest font-bold mb-0.5">Phone</p>
                  <p className="text-sm text-brand-black group-hover:text-brand-gold transition-colors">{info.phone}</p>
                </div>
              </a>
            )}

            {info.whatsapp && (
              <a href={`https://wa.me/${info.whatsapp}?text=Hi%20${encodeURIComponent(info.storeName)}%2C%20I%20have%20an%20enquiry.`} target="_blank" rel="noopener noreferrer" className="flex items-start gap-4 group">
                <div className="w-10 h-10 bg-[#25D366] flex items-center justify-center flex-shrink-0">
                  <MessageCircle className="w-4 h-4 text-white" />
                </div>
                <div>
                  <p className="text-[10px] text-brand-muted uppercase tracking-widest font-bold mb-0.5">WhatsApp</p>
                  <p className="text-sm text-brand-black group-hover:text-brand-gold transition-colors">+{info.whatsapp}</p>
                </div>
              </a>
            )}
          </div>

          {info.whatsapp && (
            <a
              href={`https://wa.me/${info.whatsapp}?text=Hi%20${encodeURIComponent(info.storeName)}%2C%20I%20have%20an%20enquiry.`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full bg-[#25D366] text-white font-bold text-xs tracking-[0.12em] uppercase px-6 py-3.5 hover:bg-[#22c35e] transition-colors"
            >
              <MessageCircle className="w-4 h-4" /> Chat on WhatsApp
            </a>
          )}
        </div>

        {/* Form */}
        <div className="lg:col-span-3 bg-brand-light border border-brand-mid p-8">
          <h2 className="font-bebas text-2xl uppercase tracking-wide text-brand-black mb-6">Send a Message</h2>

          {status === 'sent' ? (
            <div className="text-center py-12 space-y-3">
              <div className="w-14 h-14 bg-brand-black flex items-center justify-center mx-auto">
                <Send className="w-6 h-6 text-brand-gold" />
              </div>
              <h3 className="font-bebas text-2xl uppercase text-brand-black">Message Sent!</h3>
              <p className="text-sm text-brand-muted">We will get back to you within a few hours.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-bold text-brand-muted uppercase tracking-widest mb-1.5">Name</label>
                  <input
                    type="text" required
                    value={form.name}
                    onChange={e => setForm({ ...form, name: e.target.value })}
                    className="w-full bg-white border border-brand-mid text-brand-black px-4 py-3 text-sm outline-none focus:border-brand-black transition-colors"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-brand-muted uppercase tracking-widest mb-1.5">Email</label>
                  <input
                    type="email" required
                    value={form.email}
                    onChange={e => setForm({ ...form, email: e.target.value })}
                    className="w-full bg-white border border-brand-mid text-brand-black px-4 py-3 text-sm outline-none focus:border-brand-black transition-colors"
                    placeholder="your@email.com"
                  />
                </div>
              </div>
              <div>
                <label className="block text-[10px] font-bold text-brand-muted uppercase tracking-widest mb-1.5">Subject</label>
                <input
                  type="text"
                  value={form.subject}
                  onChange={e => setForm({ ...form, subject: e.target.value })}
                  className="w-full bg-white border border-brand-mid text-brand-black px-4 py-3 text-sm outline-none focus:border-brand-black transition-colors"
                  placeholder="Order enquiry, sizing, etc."
                />
              </div>
              <div>
                <label className="block text-[10px] font-bold text-brand-muted uppercase tracking-widest mb-1.5">Message</label>
                <textarea
                  required rows={5}
                  value={form.message}
                  onChange={e => setForm({ ...form, message: e.target.value })}
                  className="w-full bg-white border border-brand-mid text-brand-black px-4 py-3 text-sm outline-none focus:border-brand-black transition-colors resize-none"
                  placeholder="How can we help you?"
                />
              </div>
              {status === 'error' && (
                <p className="text-red-500 text-xs">Something went wrong. Please try WhatsApp instead.</p>
              )}
              <button
                type="submit"
                disabled={status === 'sending'}
                className="w-full bg-brand-black text-white py-3.5 text-[11px] font-bold tracking-[0.18em] uppercase hover:bg-brand-dark transition-colors disabled:opacity-60 flex items-center justify-center gap-2"
              >
                {status === 'sending' ? 'Sending...' : <><Send className="w-3.5 h-3.5" /> Send Message</>}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  )
}
