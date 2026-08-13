"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, ShoppingBag, Zap, HelpCircle, Phone, Mail, MapPin } from "lucide-react";

const WaPath = "M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z";

const navItems = [
  { href: "/",             label: "Home",    icon: Home },
  { href: "/shop",         label: "Shop",    icon: ShoppingBag },
  { href: "/solar/wizard", label: "Wizard",  icon: Zap },
  { href: "/faq",          label: "FAQ",     icon: HelpCircle },
  { href: "/contact",      label: "Contact", icon: Phone },
];

function DaisyLogo() {
  return (
    <svg width="36" height="36" viewBox="0 0 100 100" fill="none">
      {[0, 45, 90, 135, 180, 225, 270, 315].map((deg) => (
        <ellipse key={deg} cx="50" cy="22" rx="9" ry="18" fill="#D4AF37" transform={`rotate(${deg} 50 50)`} />
      ))}
      <circle cx="50" cy="50" r="14" fill="#D4AF37" />
      <circle cx="50" cy="50" r="8" fill="#0d0d0d" />
    </svg>
  );
}

export default function Footer() {
  const pathname = usePathname();

  return (
    <>
      {/* ── Desktop Footer ── */}
      <footer className="hidden lg:block" style={{ background: "#0d0d0d", borderTop: "1px solid rgba(255,255,255,0.06)" }}>
        <div className="max-w-7xl mx-auto px-8 py-14">
          <div className="grid grid-cols-12 gap-10">

            {/* Brand */}
            <div className="col-span-3">
              <div className="flex items-center gap-3 mb-3">
                <DaisyLogo />
                <div>
                  <p style={{ fontFamily: "var(--font-outfit)", fontWeight: 700, fontSize: 18, color: "#D4AF37", lineHeight: 1.2 }}>
                    Daisy &amp; Co.
                  </p>
                  <p style={{ fontSize: 10, color: "#6B7280", letterSpacing: "0.08em", textTransform: "uppercase" }}>
                    Premium Solar &amp; Electronics
                  </p>
                </div>
              </div>
              <p className="text-gray-500 text-sm leading-relaxed mt-4 max-w-xs">
                Your trusted South African partner for premium solar systems, inverters, batteries and consumer electronics.
              </p>
            </div>

            {/* Quick Links */}
            <div className="col-span-2 col-start-5">
              <p className="section-label mb-5">Quick Links</p>
              <ul className="space-y-3">
                {[
                  { l: "Home",                h: "/" },
                  { l: "Shop",                h: "/shop" },
                  { l: "Solar Solutions",     h: "/solar" },
                  { l: "Solar Wizard",        h: "/solar/wizard" },
                  { l: "Compare Packages",    h: "/solar/compare" },
                  { l: "About Us",            h: "/about" },
                ].map((i) => (
                  <li key={i.h + i.l}>
                    <Link href={i.h}
                      className="text-gray-500 hover:text-[#D4AF37] transition-colors text-sm"
                      style={{ fontFamily: "var(--font-outfit)", fontWeight: 500 }}>
                      {i.l}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Customer Service */}
            <div className="col-span-2">
              <p className="section-label mb-5">Help & Support</p>
              <ul className="space-y-3">
                {[
                  { l: "FAQ",                    h: "/faq" },
                  { l: "Contact Us",             h: "/contact" },
                  { l: "Get a Quote",            h: "/contact" },
                  { l: "Delivery Information",   h: "/faq#installation-delivery" },
                  { l: "Warranty & Returns",     h: "/faq#warranty-support" },
                ].map((i) => (
                  <li key={i.l}>
                    <Link href={i.h}
                      className="text-gray-500 hover:text-[#D4AF37] transition-colors text-sm"
                      style={{ fontFamily: "var(--font-outfit)", fontWeight: 500 }}>
                      {i.l}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact Us */}
            <div className="col-span-3">
              <p className="section-label mb-5">Contact Us</p>
              <ul className="space-y-3 text-sm text-gray-500 mb-6">
                <li className="flex items-center gap-2.5">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="#22c55e"><path d={WaPath} /></svg>
                  +27 84 896 1782
                </li>
                <li className="flex items-center gap-2.5">
                  <Mail size={14} color="#D4AF37" />
                  info@daisyandco.co.za
                </li>
                <li className="flex items-center gap-2.5">
                  <MapPin size={14} color="#D4AF37" />
                  South Africa
                </li>
              </ul>
            </div>

            {/* Social icons */}
            <div className="col-span-2 flex flex-col items-end gap-3 pt-1">
              {/* Facebook */}
              <a href="#" aria-label="Facebook"
                className="w-10 h-10 rounded-full border border-[#2a2a2a] flex items-center justify-center text-gray-400 hover:text-white hover:border-[#D4AF37]/50 transition-all">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
                </svg>
              </a>
              {/* Instagram */}
              <a href="#" aria-label="Instagram"
                className="w-10 h-10 rounded-full border border-[#2a2a2a] flex items-center justify-center text-gray-400 hover:text-white hover:border-[#D4AF37]/50 transition-all">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                  <circle cx="12" cy="12" r="4"/>
                  <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor"/>
                </svg>
              </a>
              {/* WhatsApp */}
              <a href="https://wa.me/27848961782" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp"
                className="w-10 h-10 rounded-full border border-[#2a2a2a] flex items-center justify-center text-green-500 hover:text-green-400 hover:border-green-500/40 transition-all">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d={WaPath} /></svg>
              </a>
            </div>

          </div>

          <div className="gold-divider mt-10 mb-5" />
          <p className="text-center text-gray-600 text-xs">
            &copy; 2024 Daisy &amp; Co. All Rights Reserved.
          </p>
        </div>
      </footer>

      {/* ── Mobile Bottom Nav ── */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-50"
        style={{ background: "rgba(10,10,10,0.98)", backdropFilter: "blur(20px)", borderTop: "1px solid rgba(255,255,255,0.07)" }}>
        <div className="grid grid-cols-5 h-16">
          {navItems.map((item) => {
            const active = item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
            const IconComponent = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                className="flex flex-col items-center justify-center gap-1 transition-colors"
                style={{
                  color: active ? "#D4AF37" : "#6B7280",
                  fontFamily: "var(--font-outfit)",
                  fontSize: 9,
                  fontWeight: active ? 700 : 500,
                  letterSpacing: "0.04em",
                }}
              >
                <IconComponent size={22} strokeWidth={active ? 2.2 : 1.8} color={active ? "#D4AF37" : "#6B7280"} />
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
