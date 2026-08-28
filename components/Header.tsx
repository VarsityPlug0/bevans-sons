"use client";
import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X, ChevronRight } from "lucide-react";
import { CartButton } from "@/components/CartContext";
import { BRAND } from "@/lib/config";

const WaPath = "M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z";

const shopCategories = [
  { label: "Men's T-Shirts",    href: "/shop?cat=Men%27s%20T-Shirts" },
  { label: "Men's Hoodies",     href: "/shop?cat=Men%27s%20Hoodies" },
  { label: "Men's Jackets",     href: "/shop?cat=Men%27s%20Jackets" },
  { label: "Women's Tops",      href: "/shop?cat=Women%27s%20Tops" },
  { label: "Women's Dresses",   href: "/shop?cat=Women%27s%20Dresses" },
  { label: "Women's Hoodies",   href: "/shop?cat=Women%27s%20Hoodies" },
  { label: "Streetwear",        href: "/shop?cat=Streetwear" },
  { label: "Accessories",       href: "/shop?cat=Accessories" },
];

function BrandLogo() {
  return (
    <Image src="/logo.jpg" alt={BRAND.name} width={40} height={40} className="rounded" />
  );
}

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [shopOpen, setShopOpen] = useState(false);
  const shopRef = useRef<HTMLDivElement>(null);
  const tickerRef = useRef<HTMLDivElement>(null);
  const posRef = useRef(0);
  const rafRef = useRef<number>(0);
  const pathname = usePathname();

  useEffect(() => {
    function handler(e: MouseEvent) {
      if (shopRef.current && !shopRef.current.contains(e.target as Node)) setShopOpen(false);
    }
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  useEffect(() => { setMobileOpen(false); setShopOpen(false); }, [pathname]);

  useEffect(() => {
    const el = tickerRef.current;
    if (!el) return;
    let last = 0;
    function step(ts: number) {
      if (last) {
        posRef.current -= (ts - last) * 0.035;
        const half = el!.scrollWidth / 2;
        if (Math.abs(posRef.current) >= half) posRef.current = 0;
        el!.style.transform = `translateX(${posRef.current}px)`;
      }
      last = ts;
      rafRef.current = requestAnimationFrame(step);
    }
    rafRef.current = requestAnimationFrame(step);
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  const isActive = (href: string) => href === "/" ? pathname === "/" : pathname.startsWith(href.split("?")[0]);

  const tickerItems = [
    "Free Delivery on Orders Over R999",
    "Premium Clothing — Crafted for the Bold",
    "New Arrivals — Men & Women",
    "EFT Payments Accepted",
    "Size Guide Available",
    "WhatsApp Support — Fast Response",
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      {/* Announcement ticker */}
      <div style={{ overflow: "hidden", display: "flex", alignItems: "center",
        background: "#0A0A0A", borderBottom: "1px solid rgba(255,255,255,0.08)",
        color: "#6B7280", height: 36 }}>
        <div ref={tickerRef} style={{ display: "flex", flexShrink: 0, whiteSpace: "nowrap", willChange: "transform" }}>
          {[0, 1].map((copy) => (
            <span key={copy} style={{ display: "inline-flex", alignItems: "center" }}>
              {tickerItems.map((item, i) => (
                <span key={i} style={{ display: "inline-flex", alignItems: "center", gap: 8, paddingRight: 48,
                  fontFamily: "var(--font-inter)", fontWeight: 500, fontSize: 11, letterSpacing: "0.06em", textTransform: "uppercase" }}>
                  <span style={{ width: 4, height: 4, borderRadius: "50%", background: "#333", flexShrink: 0 }} />
                  {item}
                </span>
              ))}
            </span>
          ))}
        </div>
      </div>

      {/* Main Nav */}
      <div style={{ background: "rgba(10,10,10,0.98)", backdropFilter: "blur(16px)", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
        <div className="max-w-7xl mx-auto px-5 sm:px-8 h-[68px] flex items-center justify-between gap-4">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 shrink-0" onClick={() => setMobileOpen(false)}>
            <BrandLogo />
            <div>
              <p style={{ fontFamily: "var(--font-playfair)", fontWeight: 700, fontSize: 16, color: "#FFFFFF", lineHeight: 1.2, letterSpacing: "-0.01em" }}>
                {BRAND.name}
              </p>
              <p style={{ fontSize: 9, color: "#4B5563", letterSpacing: "0.14em", textTransform: "uppercase" }}>Premium Clothing</p>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-1">
            <Link href="/" className={`nav-link px-3 py-2${isActive("/") ? " active" : ""}`}>Home</Link>

            {/* Shop dropdown */}
            <div className="relative" ref={shopRef}>
              <button onClick={() => setShopOpen((v) => !v)}
                className={`nav-link px-3 py-2 flex items-center gap-1${isActive("/shop") ? " active" : ""}`}>
                Shop
                <ChevronRight size={11} strokeWidth={2}
                  style={{ transition: "transform 0.2s", transform: shopOpen ? "rotate(90deg)" : "rotate(0deg)" }} />
              </button>
              {shopOpen && (
                <div className="absolute top-full left-0 mt-2 w-52 rounded-lg overflow-hidden shadow-2xl"
                  style={{ background: "#141414", border: "1px solid rgba(255,255,255,0.08)" }}>
                  <div className="py-2">
                    <Link href="/shop" onClick={() => setShopOpen(false)}
                      className="block px-4 py-2 text-xs text-gray-400 hover:text-white hover:bg-white/5 transition-colors font-semibold uppercase tracking-wider">
                      All Products →
                    </Link>
                    <div className="h-px bg-[#222] my-1" />
                    {shopCategories.map((item) => (
                      <Link key={item.label} href={item.href} onClick={() => setShopOpen(false)}
                        className="block px-4 py-2 text-xs text-gray-400 hover:text-white hover:bg-white/5 transition-colors">
                        {item.label}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <Link href="/men"          className={`nav-link px-3 py-2${isActive("/men") ? " active" : ""}`}>Men</Link>
            <Link href="/women"        className={`nav-link px-3 py-2${isActive("/women") ? " active" : ""}`}>Women</Link>
            <Link href="/collections"  className={`nav-link px-3 py-2${isActive("/collections") ? " active" : ""}`}>Collections</Link>
            <Link href="/new-arrivals" className={`nav-link px-3 py-2${isActive("/new-arrivals") ? " active" : ""}`}>New</Link>
            <Link href="/about"        className={`nav-link px-3 py-2${isActive("/about") ? " active" : ""}`}>About</Link>
          </nav>

          {/* Desktop CTAs */}
          <div className="hidden lg:flex items-center gap-2">
            <CartButton />
            {BRAND.whatsapp && (
              <a href={`https://wa.me/${BRAND.whatsapp}`} target="_blank" rel="noopener noreferrer"
                className="btn-primary flex items-center gap-1.5"
                style={{ fontSize: 12, padding: "9px 14px", borderRadius: 4 }}>
                <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><path d={WaPath} /></svg>
                WhatsApp
              </a>
            )}
            <Link href="/size-guide" className="btn-ghost" style={{ fontSize: 12, padding: "9px 14px" }}>
              Size Guide
            </Link>
          </div>

          {/* Mobile right */}
          <div className="lg:hidden flex items-center gap-2">
            <CartButton />
            <button onClick={() => setMobileOpen((v) => !v)}
              className="w-10 h-10 flex items-center justify-center rounded text-gray-300 hover:text-white hover:bg-white/6 transition-all"
              aria-label="Menu">
              {mobileOpen ? <X size={20} strokeWidth={2} /> : <Menu size={20} strokeWidth={2} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="lg:hidden" style={{ background: "#0f0f0f", borderTop: "1px solid rgba(255,255,255,0.06)" }}>
          <div className="max-w-7xl mx-auto px-5 py-4 flex flex-col gap-0.5">
            {[
              { label: "Home",           href: "/" },
              { label: "Shop All",       href: "/shop" },
              { label: "Men",            href: "/men" },
              { label: "Women",          href: "/women" },
              { label: "Collections",    href: "/collections" },
              { label: "New Arrivals",   href: "/new-arrivals" },
              { label: "Size Guide",     href: "/size-guide" },
              { label: "Track My Order", href: "/track-order" },
              { label: "FAQ",            href: "/faq" },
              { label: "About Us",       href: "/about" },
              { label: "Contact Us",     href: "/contact" },
              { label: "Delivery Info",  href: "/delivery" },
            ].map((item) => {
              const active = item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
              return (
                <Link key={item.href} href={item.href} onClick={() => setMobileOpen(false)}
                  className="flex items-center justify-between px-4 py-3 rounded transition-colors"
                  style={{ fontFamily: "var(--font-inter)", fontWeight: active ? 600 : 400, fontSize: 14,
                    color: active ? "#FFFFFF" : "#9CA3AF", background: active ? "rgba(255,255,255,0.05)" : "transparent" }}>
                  {item.label}
                  {active && <ChevronRight size={14} color="#fff" />}
                </Link>
              );
            })}
            <div className="pt-3 pb-1 flex flex-col gap-2.5">
              {BRAND.whatsapp && (
                <a href={`https://wa.me/${BRAND.whatsapp}`} target="_blank" rel="noopener noreferrer"
                  onClick={() => setMobileOpen(false)}
                  className="btn-primary w-full py-3.5 text-sm flex items-center justify-center gap-2">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d={WaPath} /></svg>
                  Chat on WhatsApp
                </a>
              )}
              <Link href="/shop" onClick={() => setMobileOpen(false)}
                className="btn-outline w-full py-3 text-sm flex items-center justify-center">
                Shop All
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
