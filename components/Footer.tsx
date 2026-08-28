"use client";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { Home, ShoppingBag, Users, BookOpen, Phone } from "lucide-react";
import { BRAND } from "@/lib/config";

const WaPath = "M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z";

const navItems = [
  { href: "/",       label: "Home",    icon: Home },
  { href: "/shop",   label: "Shop",    icon: ShoppingBag },
  { href: "/men",    label: "Men",     icon: Users },
  { href: "/women",  label: "Women",   icon: BookOpen },
  { href: "/contact",label: "Contact", icon: Phone },
];

function MobileNewsletter() {
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);
  if (done) return <p className="text-white text-sm font-semibold">You&apos;re in! Welcome to the community.</p>;
  return (
    <form onSubmit={(e) => { e.preventDefault(); if (email) setDone(true); }} className="flex gap-2">
      <input
        type="email" required value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Your email address"
        className="flex-1 bg-[#1a1a1a] border border-[#2a2a2a] rounded px-3 py-2.5 text-white text-xs placeholder-gray-600 focus:border-white/40 focus:outline-none"
      />
      <button type="submit"
        style={{ background: "#D4AF37", color: "#0A0A0A", fontWeight: 700, fontSize: 11, letterSpacing: "0.08em", textTransform: "uppercase", padding: "10px 14px", borderRadius: 4, border: "none", cursor: "pointer", whiteSpace: "nowrap" }}>
        Join
      </button>
    </form>
  );
}

function FooterLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <li>
      <Link href={href}
        className="text-gray-500 hover:text-white transition-colors text-xs"
        style={{ fontFamily: "var(--font-inter)", fontWeight: 400 }}>
        {children}
      </Link>
    </li>
  );
}

export default function Footer() {
  const pathname = usePathname();
  const year = new Date().getFullYear();
  const domain = new URL(BRAND.domain).hostname;

  return (
    <>
      {/* Desktop Footer */}
      <footer className="hidden lg:block" style={{ background: "#0d0d0d", borderTop: "1px solid rgba(255,255,255,0.06)" }}>
        <div className="max-w-7xl mx-auto px-8 py-14">
          <div className="grid grid-cols-12 gap-10">

            {/* Brand column */}
            <div className="col-span-4">
              <div className="flex items-center gap-3 mb-4">
                <Image src="/logo.jpg" alt={BRAND.name} width={44} height={44} className="rounded" />
                <div>
                  <p style={{ fontFamily: "var(--font-playfair)", fontWeight: 700, fontSize: 16, color: "#FFFFFF", lineHeight: 1.2 }}>
                    {BRAND.name}
                  </p>
                  <p style={{ fontSize: 9, color: "#4B5563", letterSpacing: "0.14em", textTransform: "uppercase" }}>
                    Premium Clothing
                  </p>
                </div>
              </div>
              <p className="text-gray-500 text-sm leading-relaxed max-w-xs mb-6">
                {BRAND.tagline}. Premium men&apos;s and women&apos;s clothing with free delivery across South Africa.
              </p>

              {/* Social icons */}
              <div className="flex gap-2.5">
                {[
                  { label: "Instagram", href: BRAND.social.instagram || "#",
                    icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="0.5" fill="currentColor"/></svg> },
                  { label: "TikTok", href: BRAND.social.tiktok || "#",
                    icon: <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.34-6.34V9.01a8.16 8.16 0 004.77 1.52V7.07a4.85 4.85 0 01-1.01-.38z"/></svg> },
                  { label: "Facebook", href: BRAND.social.facebook || "#",
                    icon: <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg> },
                  ...(BRAND.whatsapp ? [{ label: "WhatsApp", href: `https://wa.me/${BRAND.whatsapp}`,
                    icon: <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><path d={WaPath}/></svg> }] : []),
                ].map((s) => (
                  <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" aria-label={s.label}
                    className="w-9 h-9 rounded border border-[#2a2a2a] flex items-center justify-center text-gray-400 hover:text-white hover:border-white/30 transition-all">
                    {s.icon}
                  </a>
                ))}
              </div>
            </div>

            {/* Shop links */}
            <div className="col-span-2 col-start-6">
              <p className="section-label mb-5">Shop</p>
              <ul className="space-y-2.5">
                <FooterLink href="/shop">All Products</FooterLink>
                <FooterLink href="/men">Men</FooterLink>
                <FooterLink href="/women">Women</FooterLink>
                <FooterLink href="/collections">Collections</FooterLink>
                <FooterLink href="/new-arrivals">New Arrivals</FooterLink>
                <FooterLink href="/shop?cat=Streetwear">Streetwear</FooterLink>
                <FooterLink href="/shop?cat=Accessories">Accessories</FooterLink>
                <FooterLink href="/size-guide">Size Guide</FooterLink>
              </ul>
            </div>

            {/* Support links */}
            <div className="col-span-2">
              <p className="section-label mb-5">Support</p>
              <ul className="space-y-2.5">
                <FooterLink href="/track-order">Track My Order</FooterLink>
                <FooterLink href="/faq">FAQ</FooterLink>
                <FooterLink href="/contact">Contact Us</FooterLink>
                <FooterLink href="/delivery">Delivery Info</FooterLink>
                <FooterLink href="/payment-options">Payment Options</FooterLink>
                <FooterLink href="/about">About Us</FooterLink>
              </ul>
              <p className="section-label mt-6 mb-3">Legal</p>
              <ul className="space-y-2.5">
                <FooterLink href="/policies/terms">Terms & Conditions</FooterLink>
                <FooterLink href="/policies/privacy">Privacy Policy</FooterLink>
                <FooterLink href="/policies/returns">Returns Policy</FooterLink>
                <FooterLink href="/policies/refund">Refund Policy</FooterLink>
              </ul>
            </div>

            {/* Contact */}
            <div className="col-span-2 col-start-11">
              <p className="section-label mb-5">Contact</p>
              <ul className="space-y-4 text-xs text-gray-500">
                {BRAND.whatsapp && (
                  <li className="flex items-start gap-2.5">
                    <svg className="mt-0.5 shrink-0" width="13" height="13" viewBox="0 0 24 24" fill="#22c55e"><path d={WaPath} /></svg>
                    <a href={`https://wa.me/${BRAND.whatsapp}`} className="text-white font-medium hover:text-gray-300 transition-colors">
                      WhatsApp
                    </a>
                  </li>
                )}
                <li className="flex items-start gap-2.5">
                  <svg className="mt-0.5 shrink-0" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                    <polyline points="22,6 12,13 2,6"/>
                  </svg>
                  <a href={`mailto:hello@${domain}`} className="text-white font-medium hover:text-gray-300 transition-colors">
                    hello@{domain}
                  </a>
                </li>
                <li className="flex items-start gap-2.5">
                  <svg className="mt-0.5 shrink-0" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/>
                    <circle cx="12" cy="10" r="3"/>
                  </svg>
                  <span className="text-gray-400">South Africa</span>
                </li>
              </ul>

              <div className="flex flex-wrap gap-1.5 mt-6">
                {["SSL Secure", "POPIA Compliant", "SA Shipping"].map((b) => (
                  <span key={b} className="text-[9px] font-semibold text-gray-600 border border-[#222] rounded-full px-2 py-1">{b}</span>
                ))}
              </div>
            </div>
          </div>

          <div className="gold-divider mt-10 mb-6" />
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-gray-600 text-xs">
              &copy; {year} {BRAND.name}. All Rights Reserved. &nbsp;·&nbsp; South Africa
            </p>
            {/* Payment method icons */}
            <div className="flex items-center gap-2">
              {[
                { label: "Visa", text: "VISA" },
                { label: "Mastercard", text: "MC" },
                { label: "EFT", text: "EFT" },
                { label: "Bank Transfer", text: "FNB" },
              ].map(({ label, text }) => (
                <span
                  key={label}
                  title={label}
                  className="inline-flex items-center justify-center px-2 py-1 rounded"
                  style={{ background: "#1a1a1a", border: "1px solid #2a2a2a", fontSize: 9, fontWeight: 700, letterSpacing: "0.06em", color: "#6B7280", minWidth: 32 }}
                >
                  {text}
                </span>
              ))}
            </div>
          </div>
        </div>
      </footer>

      {/* Mobile Footer */}
      <div className="lg:hidden" style={{ background: "#0d0d0d", borderTop: "1px solid rgba(255,255,255,0.06)", paddingBottom: 80 }}>
        <div className="px-5 py-10 flex flex-col gap-6">
          {/* Brand */}
          <div className="flex items-center gap-3">
            <Image src="/logo.jpg" alt={BRAND.name} width={36} height={36} className="rounded" />
            <p style={{ fontFamily: "var(--font-playfair)", fontWeight: 700, fontSize: 15, color: "#FFFFFF" }}>
              {BRAND.name}
            </p>
          </div>

          {/* Newsletter */}
          <MobileNewsletter />

          {/* Quick links */}
          <div className="flex flex-wrap gap-x-5 gap-y-2">
            {[
              { label: "Shop All", href: "/shop" },
              { label: "Men", href: "/men" },
              { label: "Women", href: "/women" },
              { label: "New Arrivals", href: "/new-arrivals" },
              { label: "Size Guide", href: "/size-guide" },
              { label: "Track Order", href: "/track-order" },
              { label: "FAQ", href: "/faq" },
              { label: "Contact", href: "/contact" },
            ].map((l) => (
              <Link key={l.href} href={l.href} className="text-gray-500 hover:text-white text-xs transition-colors">
                {l.label}
              </Link>
            ))}
          </div>

          {/* Payment + copyright */}
          <div className="flex items-center gap-2 flex-wrap">
            {["VISA", "MC", "EFT", "FNB"].map((t) => (
              <span key={t} className="inline-flex items-center justify-center px-2 py-1 rounded"
                style={{ background: "#1a1a1a", border: "1px solid #2a2a2a", fontSize: 9, fontWeight: 700, color: "#6B7280" }}>
                {t}
              </span>
            ))}
          </div>
          <p className="text-gray-700 text-[10px]">
            &copy; {new Date().getFullYear()} {BRAND.name}. All Rights Reserved.
          </p>
        </div>
      </div>

      {/* Mobile Bottom Nav */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-50"
        style={{ background: "rgba(10,10,10,0.98)", backdropFilter: "blur(20px)", borderTop: "1px solid rgba(255,255,255,0.07)" }}>
        <div className="grid grid-cols-5 h-16">
          {navItems.map((item) => {
            const active = item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
            const IconComponent = item.icon;
            return (
              <Link key={item.href} href={item.href}
                className="flex flex-col items-center justify-center gap-1 transition-colors"
                style={{ color: active ? "#FFFFFF" : "#6B7280", fontFamily: "var(--font-inter)", fontSize: 9, fontWeight: active ? 600 : 400, letterSpacing: "0.04em", textTransform: "uppercase" }}>
                <IconComponent size={20} strokeWidth={active ? 2.2 : 1.6} color={active ? "#fff" : "#6B7280"} />
                {item.label}
              </Link>
            );
          })}
        </div>
        <div className="h-safe-area-inset-bottom" />
      </nav>
    </>
  );
}
