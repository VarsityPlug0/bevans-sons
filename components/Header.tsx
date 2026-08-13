"use client";
import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown, Menu, X, Zap } from "lucide-react";
import { CartButton } from "@/components/CartContext";

const WaPath = "M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z";

const shopLinks = [
  { label: "All Products",             href: "/shop",         desc: "Browse everything we sell" },
  { label: "Smart TVs & Electronics",  href: "/electronics",  desc: "TVs, laptops, gadgets & more" },
  { label: "Gaming",                   href: "/electronics",  desc: "Consoles, controllers & gear" },
  { label: "Home & Office",            href: "/electronics",  desc: "Appliances & office tech" },
  { label: "Solar Systems",            href: "/solar",        desc: "Residential & commercial solar" },
  { label: "Inverters & Batteries",    href: "/solar/inverters-batteries", desc: "Backup power solutions" },
];

function DaisyLogo() {
  return (
    <svg width="38" height="38" viewBox="0 0 100 100" fill="none">
      {[0, 45, 90, 135, 180, 225, 270, 315].map((deg) => (
        <ellipse key={deg} cx="50" cy="22" rx="9" ry="18" fill="#D4AF37" transform={`rotate(${deg} 50 50)`} />
      ))}
      <circle cx="50" cy="50" r="14" fill="#D4AF37" />
      <circle cx="50" cy="50" r="8" fill="#0A0A0A" />
    </svg>
  );
}

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [shopOpen, setShopOpen] = useState(false);
  const shopRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  useEffect(() => {
    function handler(e: MouseEvent) {
      if (shopRef.current && !shopRef.current.contains(e.target as Node)) {
        setShopOpen(false);
      }
    }
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  useEffect(() => { setMobileOpen(false); }, [pathname]);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50"
      style={{ background: "rgba(10,10,10,0.97)", backdropFilter: "blur(16px)", borderBottom: "1px solid rgba(255,255,255,0.06)" }}
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-8 h-[72px] flex items-center justify-between gap-6">

        {/* ── Logo ── */}
        <Link href="/" className="flex items-center gap-3 shrink-0" onClick={() => setMobileOpen(false)}>
          <DaisyLogo />
          <div>
            <p style={{ fontFamily: "var(--font-outfit), sans-serif", fontWeight: 700, fontSize: 18, color: "#D4AF37", lineHeight: 1.2, letterSpacing: "-0.01em" }}>
              Daisy &amp; Co.
            </p>
            <p style={{ fontSize: 10, color: "#6B7280", letterSpacing: "0.08em", textTransform: "uppercase" }}>
              Premium Solar &amp; Electronics
            </p>
          </div>
        </Link>

        {/* ── Desktop Nav ── */}
        <nav className="hidden lg:flex items-center gap-1">
          <Link href="/" className={`nav-link px-3 py-2 rounded-lg${isActive("/") ? " active" : ""}`}>
            Home
          </Link>

          {/* Shop dropdown */}
          <div className="relative" ref={shopRef}>
            <button
              onClick={() => setShopOpen((v) => !v)}
              className={`nav-link px-3 py-2 rounded-lg flex items-center gap-1.5${isActive("/electronics") ? " active" : ""}`}
            >
              Shop
              <ChevronDown
                size={13}
                strokeWidth={2.5}
                style={{ transition: "transform 0.2s", transform: shopOpen ? "rotate(180deg)" : "rotate(0deg)" }}
              />
            </button>

            {shopOpen && (
              <div
                className="absolute top-full left-0 mt-2 w-72 rounded-2xl overflow-hidden shadow-2xl"
                style={{ background: "#141414", border: "1px solid rgba(255,255,255,0.08)", boxShadow: "0 20px 60px rgba(0,0,0,0.6), 0 0 0 1px rgba(212,175,55,0.08)" }}
              >
                <div className="p-2">
                  {shopLinks.map((item) => (
                    <Link
                      key={item.label}
                      href={item.href}
                      onClick={() => setShopOpen(false)}
                      className="flex flex-col gap-0.5 px-4 py-3 rounded-xl hover:bg-white/5 transition-colors group"
                    >
                      <span
                        style={{ fontFamily: "var(--font-outfit)", fontWeight: 600, fontSize: 14, color: "#F0F0F0" }}
                        className="group-hover:text-[#D4AF37] transition-colors"
                      >
                        {item.label}
                      </span>
                      <span style={{ fontSize: 12, color: "#6B7280" }}>{item.desc}</span>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>

          <Link href="/solar"       className={`nav-link px-3 py-2 rounded-lg${pathname === "/solar" ? " active" : ""}`}>Solar</Link>
          <Link href="/faq"         className={`nav-link px-3 py-2 rounded-lg${isActive("/faq") ? " active" : ""}`}>FAQ</Link>
          <Link href="/about"       className={`nav-link px-3 py-2 rounded-lg${isActive("/about") ? " active" : ""}`}>About</Link>
          <Link href="/contact"     className={`nav-link px-3 py-2 rounded-lg${isActive("/contact") ? " active" : ""}`}>Contact</Link>
        </nav>

        {/* ── Desktop right CTAs ── */}
        <div className="hidden lg:flex items-center gap-2">
          <CartButton />
          <Link
            href="/solar/wizard"
            className="btn-gold text-sm rounded-xl flex items-center gap-1.5"
            style={{ fontSize: 13, padding: "9px 16px" }}
          >
            <Zap size={14} strokeWidth={2.5} />
            Find My Solution
          </Link>
          <Link
            href="/contact"
            className="btn-outline text-sm rounded-xl"
            style={{ fontSize: 13, padding: "9px 16px" }}
          >
            Get a Quote
          </Link>
        </div>

        {/* ── Mobile right ── */}
        <div className="lg:hidden flex items-center gap-2">
          <CartButton />
          <button
            onClick={() => setMobileOpen((v) => !v)}
            className="w-10 h-10 flex items-center justify-center rounded-xl text-gray-300 hover:text-white hover:bg-white/6 transition-all"
            aria-label="Menu"
          >
            {mobileOpen ? <X size={20} strokeWidth={2.2} /> : <Menu size={20} strokeWidth={2.2} />}
          </button>
        </div>
      </div>

      {/* ── Mobile dropdown ── */}
      {mobileOpen && (
        <div className="lg:hidden" style={{ background: "#0f0f0f", borderTop: "1px solid rgba(255,255,255,0.06)" }}>
          <div className="max-w-7xl mx-auto px-5 py-4 flex flex-col gap-1">
            {[
              { label: "Home",              href: "/" },
              { label: "Shop",              href: "/shop" },
              { label: "Solar Solutions",   href: "/solar", exact: true },
              { label: "Solar Wizard",      href: "/solar/wizard" },
              { label: "FAQ",               href: "/faq" },
              { label: "About Us",          href: "/about" },
              { label: "Contact Us",        href: "/contact" },
            ].map((item) => {
              const active = "exact" in item ? pathname === item.href : isActive(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center justify-between px-4 py-3 rounded-xl transition-colors"
                  style={{
                    fontFamily: "var(--font-outfit)",
                    fontWeight: 500,
                    fontSize: 15,
                    color: active ? "#D4AF37" : "#D1D5DB",
                    background: active ? "rgba(212,175,55,0.06)" : "transparent",
                  }}
                >
                  {item.label}
                  {active && <ChevronDown size={16} color="#D4AF37" style={{ transform: "rotate(-90deg)" }} />}
                </Link>
              );
            })}

            <div className="pt-3 pb-2 flex flex-col gap-3">
              <Link href="/solar/wizard" onClick={() => setMobileOpen(false)} className="btn-gold w-full py-3.5 rounded-xl text-sm flex items-center justify-center gap-2">
                <Zap size={16} strokeWidth={2.5} /> Find My Solar Solution
              </Link>
              <Link href="/contact" onClick={() => setMobileOpen(false)} className="btn-outline w-full py-3 rounded-xl text-sm">
                Get a Free Quote
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
