import Link from 'next/link'
import { fetchStoreInfo } from '@/lib/storeInfo'

export async function Footer() {
  const info = await fetchStoreInfo()

  const waLink = `https://wa.me/${info.whatsapp}`

  return (
    <footer className="bg-brand-black text-brand-muted">
      <div className="max-w-7xl mx-auto px-6 py-14 grid grid-cols-2 md:grid-cols-5 gap-8 text-xs">
        {/* Brand */}
        <div className="col-span-2 md:col-span-1">
          {/* Logo white-on-black works perfectly on the dark footer */}
          <img src="/logo.jpg" alt="Bevans Sons" className="h-16 w-auto mb-3" />
          <p className="text-brand-muted text-[11px] leading-relaxed mb-4">{info.storeTagline}</p>
          <div className="flex gap-4 text-[11px] font-semibold tracking-[0.1em] uppercase">
            {info.instagram && <a href={info.instagram} target="_blank" rel="noreferrer" className="hover:text-white transition-colors">IG</a>}
            {info.tiktok && <a href={info.tiktok} target="_blank" rel="noreferrer" className="hover:text-white transition-colors">TT</a>}
            {info.facebook && <a href={info.facebook} target="_blank" rel="noreferrer" className="hover:text-white transition-colors">FB</a>}
          </div>
        </div>

        {/* Shop */}
        <div>
          <p className="text-white text-[11px] font-bold tracking-[0.15em] uppercase mb-4">Shop</p>
          <ul className="space-y-2.5">
            {[
              { label: 'All Sneakers', href: '/products' },
              { label: 'New Arrivals', href: '/products?sort=newest' },
              { label: 'Best Sellers', href: '/products?sort=popular' },
              { label: 'Collections', href: '/products' },
              { label: 'Size Guide', href: '/size-guide' },
            ].map(({ label, href }) => (
              <li key={label}><Link href={href} className="hover:text-white transition-colors">{label}</Link></li>
            ))}
          </ul>
        </div>

        {/* Customer Care */}
        <div>
          <p className="text-white text-[11px] font-bold tracking-[0.15em] uppercase mb-4">Customer Care</p>
          <ul className="space-y-2.5">
            {[
              { label: 'Contact Us', href: '/contact' },
              { label: 'Shipping & Delivery', href: '/shipping' },
              { label: 'Returns Policy', href: '/returns-policy' },
              { label: 'Track My Order', href: '/track-order' },
              { label: 'FAQ', href: '/faq' },
            ].map(({ label, href }) => (
              <li key={label}><Link href={href} className="hover:text-white transition-colors">{label}</Link></li>
            ))}
          </ul>
        </div>

        {/* About */}
        <div>
          <p className="text-white text-[11px] font-bold tracking-[0.15em] uppercase mb-4">About</p>
          <ul className="space-y-2.5">
            {[
              { label: 'About Us', href: '/about' },
              { label: 'Our Story', href: '/about' },
              { label: 'Privacy Policy', href: '/privacy-policy' },
              { label: 'Terms & Conditions', href: '/terms' },
            ].map(({ label, href }) => (
              <li key={label}><Link href={href} className="hover:text-white transition-colors">{label}</Link></li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div>
          <p className="text-white text-[11px] font-bold tracking-[0.15em] uppercase mb-4">Contact</p>
          <ul className="space-y-2.5">
            {info.whatsapp && (
              <li>
                <a href={waLink} target="_blank" rel="noreferrer" className="hover:text-white transition-colors">
                  WhatsApp: +{info.whatsapp}
                </a>
              </li>
            )}
            {info.phone && (
              <li>
                <a href={`tel:${info.phone}`} className="hover:text-white transition-colors">{info.phone}</a>
              </li>
            )}
            {info.email && (
              <li>
                <a href={`mailto:${info.email}`} className="hover:text-white transition-colors break-all">{info.email}</a>
              </li>
            )}
            {info.address && (
              <li><span className="text-brand-muted">{info.address}</span></li>
            )}
          </ul>
          <div className="mt-6">
            <p className="text-white text-[11px] font-bold tracking-[0.15em] uppercase mb-3">Secure Payments</p>
            <div className="flex gap-2 flex-wrap">
              {['Visa', 'MC', 'Zapper'].map(m => (
                <span key={m} className="border border-brand-dark text-[10px] px-2 py-1 text-brand-muted">{m}</span>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-brand-dark">
        <div className="max-w-7xl mx-auto px-6 py-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-[10px] text-brand-dark">
          <p>© {new Date().getFullYear()} {info.storeName}. All rights reserved.</p>
          {info.storeReg && <p>Reg. {info.storeReg} &nbsp;·&nbsp; South Africa</p>}
        </div>
      </div>
    </footer>
  )
}
