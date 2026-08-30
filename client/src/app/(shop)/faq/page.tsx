import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'FAQ',
  description: 'Answers to common questions about ordering, delivery, payment, returns and more at Bevans Sons.',
}

const sections = [
  {
    title: 'Orders & Shopping',
    items: [
      { q: 'How do I place an order?', a: 'Browse our shop, select your size, add items to your cart, and proceed to checkout. You can also message us on WhatsApp (+27 72 481 6274) and we will assist you.' },
      { q: 'Can I order via WhatsApp?', a: 'Yes. Send us the product name and your size on WhatsApp (+27 72 481 6274) and we will create an order for you.' },
      { q: 'Are all your sneakers authentic?', a: 'Yes, 100%. Every sneaker we sell is genuine and sourced from verified distributors. We never sell counterfeits.' },
      { q: 'What sizes do you stock?', a: 'We stock UK sizes 6 to 11. Check our Size Guide for help finding your size.' },
    ],
  },
  {
    title: 'Payment',
    items: [
      { q: 'What payment methods do you accept?', a: 'We accept Visa, Mastercard, and Zapper. All payments are processed securely.' },
      { q: 'Is it safe to pay online?', a: 'Yes. All transactions are encrypted and processed through secure payment gateways.' },
      { q: 'Do you offer payment plans?', a: 'Contact us on WhatsApp to discuss payment options for larger orders.' },
    ],
  },
  {
    title: 'Delivery & Shipping',
    items: [
      { q: 'How long does delivery take?', a: 'Johannesburg & Pretoria: 2–3 business days. Cape Town, Durban & other major cities: 3–5 business days. Remote areas: 5–7 business days.' },
      { q: 'Is there free delivery?', a: 'Yes — free delivery on all orders over R999. Orders below R999 attract a shipping fee calculated at checkout.' },
      { q: 'Do you ship internationally?', a: 'We ship to select countries. Contact us on WhatsApp for international shipping rates and timelines.' },
      { q: 'How do I track my order?', a: 'Visit our Track Order page and enter your order reference number (format: BS-XXXXXXXX). You can also email us at MkhabeleEnterprise@gmail.com.' },
    ],
  },
  {
    title: 'Returns & Refunds',
    items: [
      { q: 'What is your return policy?', a: 'We accept returns within 30 days of delivery for unworn items in their original packaging with all tags attached.' },
      { q: 'How do I initiate a return?', a: 'Email us at MkhabeleEnterprise@gmail.com with your order number and reason for return. We will send you return instructions within 1–2 business days.' },
      { q: 'How long do refunds take?', a: 'Once your returned item is received and inspected, refunds are processed within 5–7 business days to your original payment method.' },
      { q: 'What if my sneakers are defective?', a: 'Contact us immediately via WhatsApp with photos of the defect. We will arrange a replacement or refund with priority.' },
    ],
  },
]

const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: sections.flatMap(s =>
    s.items.map(item => ({
      '@type': 'Question',
      name: item.q,
      acceptedAnswer: { '@type': 'Answer', text: item.a },
    }))
  ),
}

export default function FAQPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <div className="max-w-4xl mx-auto px-6 py-20">
        <div className="text-center mb-14">
          <p className="text-[11px] font-semibold tracking-[0.2em] uppercase text-brand-gold mb-3">Help Centre</p>
          <h1 className="font-bebas text-6xl text-brand-black mb-4 uppercase">Frequently Asked Questions</h1>
          <p className="text-brand-muted text-base max-w-xl mx-auto">
            Can&apos;t find your answer? Chat with us on WhatsApp for the fastest response.
          </p>
        </div>

        <div className="space-y-10">
          {sections.map(section => (
            <div key={section.title}>
              <h2 className="font-bebas text-2xl uppercase tracking-wide text-brand-black mb-5 flex items-center gap-3">
                <span className="text-brand-gold">/</span> {section.title}
              </h2>
              <div className="space-y-2">
                {section.items.map(item => (
                  <details key={item.q} className="group bg-brand-light border border-brand-mid overflow-hidden">
                    <summary className="flex items-center justify-between px-6 py-4 cursor-pointer select-none list-none">
                      <span className="text-sm font-semibold text-brand-black pr-4">{item.q}</span>
                      <svg className="shrink-0 transition-transform duration-200 group-open:rotate-180" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="shrink-0 text-brand-gold transition-transform duration-200 group-open:rotate-180">
                        <path d="M6 9l6 6 6-6" />
                      </svg>
                    </summary>
                    <div className="px-6 pb-4 text-sm text-brand-muted leading-relaxed border-t border-brand-mid pt-3">
                      {item.a}
                    </div>
                  </details>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-14 bg-brand-black p-8 text-center">
          <h3 className="font-bebas text-3xl uppercase tracking-wide text-white mb-3">Still Have Questions?</h3>
          <p className="text-brand-muted mb-6 text-sm">Our team is ready to help. Reach us via WhatsApp for the fastest response.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="https://wa.me/27724816274" target="_blank" rel="noopener noreferrer"
              className="bg-brand-gold text-brand-black px-8 py-3.5 text-[11px] font-bold tracking-[0.18em] uppercase hover:opacity-90 transition-opacity">
              Chat on WhatsApp
            </a>
            <Link href="/contact"
              className="border border-white text-white px-8 py-3.5 text-[11px] font-bold tracking-[0.18em] uppercase hover:bg-white hover:text-brand-black transition-colors">
              Send a Message
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}
