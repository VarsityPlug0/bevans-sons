import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'Bevans Sons privacy policy — how we collect, use and protect your personal information.',
}

export default function PrivacyPolicyPage() {
  return (
    <div className="max-w-3xl mx-auto px-6 py-20">
      <div className="mb-12">
        <p className="text-[11px] font-semibold tracking-[0.2em] uppercase text-brand-gold mb-3">Legal</p>
        <h1 className="font-bebas text-6xl text-brand-black mb-2 uppercase">Privacy Policy</h1>
        <p className="text-xs text-brand-muted">Last updated: January 2025</p>
      </div>

      <div className="space-y-8 text-sm text-brand-muted leading-relaxed">
        <section>
          <h2 className="font-bebas text-xl uppercase tracking-wide text-brand-black mb-3">1. Who We Are</h2>
          <p>Bevans Sons (Reg. 2023/116995/07) is a registered South African private company that operates an online sneaker retail store at bevanssons.store. We are committed to protecting your personal information in accordance with the Protection of Personal Information Act (POPIA) of South Africa.</p>
        </section>

        <section>
          <h2 className="font-bebas text-xl uppercase tracking-wide text-brand-black mb-3">2. Information We Collect</h2>
          <ul className="list-disc list-inside space-y-1">
            <li>Name, email address, and phone number (when you register or checkout)</li>
            <li>Delivery address</li>
            <li>Order and payment history</li>
            <li>Device and browser information for analytics purposes</li>
          </ul>
        </section>

        <section>
          <h2 className="font-bebas text-xl uppercase tracking-wide text-brand-black mb-3">3. How We Use Your Information</h2>
          <ul className="list-disc list-inside space-y-1">
            <li>To process and fulfil your orders</li>
            <li>To send order confirmations and delivery updates</li>
            <li>To respond to customer service enquiries</li>
            <li>To send marketing communications (only with your consent)</li>
            <li>To improve our website and services</li>
          </ul>
        </section>

        <section>
          <h2 className="font-bebas text-xl uppercase tracking-wide text-brand-black mb-3">4. Data Sharing</h2>
          <p>We do not sell your personal information to third parties. We may share your information with:</p>
          <ul className="list-disc list-inside space-y-1 mt-2">
            <li>Delivery partners (to fulfil your order)</li>
            <li>Payment processors (to process transactions securely)</li>
            <li>IT service providers (who help us operate our platform)</li>
          </ul>
          <p className="mt-2">All third parties are required to protect your information and only use it for specified purposes.</p>
        </section>

        <section>
          <h2 className="font-bebas text-xl uppercase tracking-wide text-brand-black mb-3">5. Data Security</h2>
          <p>We implement appropriate technical and organisational measures to protect your personal information against unauthorised access, alteration, disclosure or destruction.</p>
        </section>

        <section>
          <h2 className="font-bebas text-xl uppercase tracking-wide text-brand-black mb-3">6. Your Rights</h2>
          <p>Under POPIA, you have the right to:</p>
          <ul className="list-disc list-inside space-y-1 mt-2">
            <li>Access the personal information we hold about you</li>
            <li>Request correction of inaccurate information</li>
            <li>Request deletion of your information (subject to legal obligations)</li>
            <li>Opt out of marketing communications at any time</li>
          </ul>
        </section>

        <section>
          <h2 className="font-bebas text-xl uppercase tracking-wide text-brand-black mb-3">7. Cookies</h2>
          <p>Our website uses cookies to enhance your browsing experience. You can disable cookies in your browser settings, although this may affect some website functionality.</p>
        </section>

        <section>
          <h2 className="font-bebas text-xl uppercase tracking-wide text-brand-black mb-3">8. Contact Us</h2>
          <p>For any privacy-related enquiries or requests, contact us at:</p>
          <div className="mt-2 space-y-1">
            <p>Email: <a href="mailto:MkhabeleEnterprise@gmail.com" className="text-brand-black hover:text-brand-gold transition-colors">MkhabeleEnterprise@gmail.com</a></p>
            <p>Phone: <a href="tel:0724816274" className="text-brand-black hover:text-brand-gold transition-colors">0724816274</a></p>
          </div>
        </section>
      </div>
    </div>
  )
}
