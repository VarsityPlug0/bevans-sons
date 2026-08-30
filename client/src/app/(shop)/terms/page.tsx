import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Terms & Conditions',
  description: 'Bevans Sons terms and conditions of sale and use of our website.',
}

export default function TermsPage() {
  return (
    <div className="max-w-3xl mx-auto px-6 py-20">
      <div className="mb-12">
        <p className="text-[11px] font-semibold tracking-[0.2em] uppercase text-brand-gold mb-3">Legal</p>
        <h1 className="font-bebas text-6xl text-brand-black mb-2 uppercase">Terms & Conditions</h1>
        <p className="text-xs text-brand-muted">Last updated: January 2025</p>
      </div>

      <div className="space-y-8 text-sm text-brand-muted leading-relaxed">
        <section>
          <h2 className="font-bebas text-xl uppercase tracking-wide text-brand-black mb-3">1. About Us</h2>
          <p>These terms govern your use of the Bevans Sons website and the purchase of products from us. Bevans Sons (Reg. 2023/116995/07) is a registered South African private company. By using our website or placing an order, you agree to these terms.</p>
        </section>

        <section>
          <h2 className="font-bebas text-xl uppercase tracking-wide text-brand-black mb-3">2. Products</h2>
          <p>All products sold by Bevans Sons are genuine and sourced from authorised distributors. Product images are for illustration purposes — minor variations in colour may occur due to screen calibration. We reserve the right to withdraw any product from sale at any time.</p>
        </section>

        <section>
          <h2 className="font-bebas text-xl uppercase tracking-wide text-brand-black mb-3">3. Orders & Pricing</h2>
          <ul className="list-disc list-inside space-y-1">
            <li>All prices are in South African Rand (ZAR) and include VAT where applicable.</li>
            <li>We reserve the right to change prices without notice.</li>
            <li>An order is confirmed only after payment has been received and verified.</li>
            <li>We reserve the right to cancel any order due to pricing errors, stock availability, or suspected fraud.</li>
          </ul>
        </section>

        <section>
          <h2 className="font-bebas text-xl uppercase tracking-wide text-brand-black mb-3">4. Payment</h2>
          <p>We accept Visa, Mastercard, and Zapper. All payments are processed securely. We do not store your card details.</p>
        </section>

        <section>
          <h2 className="font-bebas text-xl uppercase tracking-wide text-brand-black mb-3">5. Delivery</h2>
          <p>Delivery times are estimates and not guaranteed. We are not liable for delays caused by couriers, weather, or other factors outside our control. Risk of loss transfers to you upon delivery.</p>
        </section>

        <section>
          <h2 className="font-bebas text-xl uppercase tracking-wide text-brand-black mb-3">6. Returns & Refunds</h2>
          <p>Returns are accepted within 30 days of delivery for unworn items in their original condition. See our Returns Policy for full details. Refunds are processed within 5–7 business days of receiving the returned item.</p>
        </section>

        <section>
          <h2 className="font-bebas text-xl uppercase tracking-wide text-brand-black mb-3">7. Intellectual Property</h2>
          <p>All content on this website — including text, images, logos, and design — is owned by Bevans Sons or its licensors. You may not reproduce or use any content without our written permission.</p>
        </section>

        <section>
          <h2 className="font-bebas text-xl uppercase tracking-wide text-brand-black mb-3">8. Limitation of Liability</h2>
          <p>To the maximum extent permitted by law, Bevans Sons is not liable for indirect, incidental, or consequential damages arising from your use of our website or products.</p>
        </section>

        <section>
          <h2 className="font-bebas text-xl uppercase tracking-wide text-brand-black mb-3">9. Governing Law</h2>
          <p>These terms are governed by the laws of the Republic of South Africa. Any disputes will be subject to the jurisdiction of the South African courts.</p>
        </section>

        <section>
          <h2 className="font-bebas text-xl uppercase tracking-wide text-brand-black mb-3">10. Contact</h2>
          <p>For any questions regarding these terms:</p>
          <div className="mt-2 space-y-1">
            <p>Email: <a href="mailto:MkhabeleEnterprise@gmail.com" className="text-brand-black hover:text-brand-gold transition-colors">MkhabeleEnterprise@gmail.com</a></p>
            <p>Phone: <a href="tel:0724816274" className="text-brand-black hover:text-brand-gold transition-colors">0724816274</a></p>
          </div>
        </section>
      </div>
    </div>
  )
}
