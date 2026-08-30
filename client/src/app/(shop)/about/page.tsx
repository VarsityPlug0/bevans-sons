import type { Metadata } from 'next'
import Link from 'next/link'
import { ShieldCheck, Truck, BadgeCheck, Headphones, Phone, Mail, FileText } from 'lucide-react'

export const metadata: Metadata = {
  title: 'About Us',
  description: 'Bevans Sons is a proudly South African registered sneaker retailer offering premium authentic kicks with fast delivery across South Africa.',
}

const values = [
  { icon: BadgeCheck, title: 'Authenticity', desc: 'Every sneaker is 100% genuine. Zero counterfeits, zero compromises.' },
  { icon: ShieldCheck, title: 'Transparency', desc: 'Clear pricing, honest communication, no hidden fees.' },
  { icon: Truck, title: 'Reliability', desc: 'We deliver on our promises — fast shipping, secure packaging.' },
  { icon: Headphones, title: 'Customer First', desc: 'Real support via WhatsApp. We are here when you need us.' },
]

const provinces = [
  'Gauteng', 'Western Cape', 'KwaZulu-Natal', 'Eastern Cape',
  'Free State', 'Limpopo', 'Mpumalanga', 'North West', 'Northern Cape',
]

export default function AboutPage() {
  return (
    <div className="max-w-5xl mx-auto px-6 py-20">
      {/* Header */}
      <div className="mb-16 text-center">
        <p className="text-[11px] font-semibold tracking-[0.2em] uppercase text-brand-gold mb-3">Our Story</p>
        <h1 className="font-bebas text-6xl md:text-7xl text-brand-black mb-6 uppercase">About Bevans Sons</h1>
        <p className="text-brand-muted text-base leading-relaxed max-w-2xl mx-auto">
          A proudly South African registered sneaker retailer on a mission to bring premium authentic kicks to everyone — at prices that make sense.
        </p>
      </div>

      {/* Mission */}
      <div className="bg-brand-black text-white p-10 mb-12 text-center">
        <p className="text-[11px] font-semibold tracking-[0.2em] uppercase text-brand-gold mb-4">Our Mission</p>
        <p className="text-xl md:text-2xl font-bebas tracking-wide leading-relaxed max-w-3xl mx-auto uppercase">
          &ldquo;Authentic sneakers. Delivered fast. No fakes, no nonsense.&rdquo;
        </p>
      </div>

      {/* Story + Info */}
      <div className="grid md:grid-cols-2 gap-10 mb-16">
        <div>
          <h2 className="font-bebas text-3xl uppercase tracking-wide text-brand-black mb-4">Who We Are</h2>
          <p className="text-brand-muted text-sm leading-relaxed mb-4">
            Bevans Sons is a registered South African private company founded in 2023. We exist to give South Africans access to authentic premium sneakers — quality pairs built to last, at prices that are honest and fair.
          </p>
          <p className="text-brand-muted text-sm leading-relaxed mb-4">
            We stock Nike, Adidas, Jordan, New Balance, Converse and more. Every pair is sourced from verified distributors and comes exactly as advertised.
          </p>
          <p className="text-brand-muted text-sm leading-relaxed">
            We deliver to all 9 provinces across South Africa. Our team is available via WhatsApp to assist with sizing, orders, or anything else you need.
          </p>
        </div>
        <div className="bg-brand-light border border-brand-mid p-7">
          <h3 className="font-semibold text-brand-black text-base mb-5">Company Info</h3>
          <div className="space-y-4 text-sm">
            <div className="flex items-start gap-3">
              <FileText className="w-4 h-4 text-brand-gold flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-[10px] text-brand-muted uppercase tracking-widest font-bold mb-0.5">Registration Number</p>
                <p className="text-brand-black font-semibold">2023 / 116995 / 07</p>
                <p className="text-brand-muted text-xs">CIPC Registered Private Company</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Phone className="w-4 h-4 text-brand-gold flex-shrink-0" />
              <a href="tel:0724816274" className="text-brand-black hover:text-brand-gold transition-colors">0724816274</a>
            </div>
            <div className="flex items-center gap-3">
              <Mail className="w-4 h-4 text-brand-gold flex-shrink-0" />
              <a href="mailto:MkhabeleEnterprise@gmail.com" className="text-brand-black hover:text-brand-gold transition-colors text-xs">MkhabeleEnterprise@gmail.com</a>
            </div>
          </div>
        </div>
      </div>

      {/* Values */}
      <div className="mb-16">
        <h2 className="font-bebas text-3xl uppercase tracking-wide text-brand-black mb-8 text-center">Our Values</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {values.map(({ icon: Icon, title, desc }) => (
            <div key={title} className="bg-brand-light p-6 text-center">
              <div className="w-11 h-11 bg-brand-black flex items-center justify-center mx-auto mb-3">
                <Icon className="w-5 h-5 text-brand-gold" strokeWidth={1.8} />
              </div>
              <h3 className="font-bold text-brand-black text-sm mb-2">{title}</h3>
              <p className="text-brand-muted text-xs leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Coverage */}
      <div className="bg-brand-light border border-brand-mid p-8 mb-12">
        <h2 className="font-bebas text-2xl uppercase tracking-wide text-brand-black mb-6">Where We Deliver</h2>
        <div className="flex flex-wrap gap-2">
          {provinces.map(p => (
            <span key={p} className="text-xs font-medium px-3 py-1.5 border border-brand-mid text-brand-muted bg-white">{p}</span>
          ))}
          <span className="text-xs font-medium px-3 py-1.5 border border-brand-gold text-brand-gold bg-brand-gold/5">International (select countries)</span>
        </div>
      </div>

      {/* CTA */}
      <div className="text-center">
        <h2 className="font-bebas text-4xl uppercase tracking-wide text-brand-black mb-4">Ready to Shop?</h2>
        <p className="text-brand-muted text-sm mb-8">Browse our full catalogue or chat with us on WhatsApp to get started.</p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/products" className="bg-brand-black text-white px-10 py-4 text-[11px] font-bold tracking-[0.18em] uppercase hover:bg-brand-dark transition-colors">
            Shop Now
          </Link>
          <a
            href="https://wa.me/27724816274"
            target="_blank"
            rel="noopener noreferrer"
            className="border border-brand-black text-brand-black px-10 py-4 text-[11px] font-bold tracking-[0.18em] uppercase hover:bg-brand-black hover:text-white transition-colors"
          >
            Chat on WhatsApp
          </a>
        </div>
      </div>
    </div>
  )
}
