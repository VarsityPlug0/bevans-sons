"use client";
import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { ChevronDown, Menu, X, Tag, Sparkles } from "lucide-react";
import { CartButton } from "@/components/CartContext";

const WaPath = "M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z";

const shopLinks = [
  { label: "All Products",        href: "/shop",                                      desc: "Browse everything we sell" },
  { label: "Smartphones",         href: "/shop?cat=Smartphones",                      desc: "iPhones & more" },
  { label: "Smart TVs",           href: "/shop?cat=TVs",                              desc: "Samsung, Hisense, LG & more" },
  { label: "Gaming Consoles",     href: "/shop?cat=Gaming%20Consoles",                desc: "PS5, Xbox & accessories" },
  { label: "Gaming PCs",          href: "/shop?cat=Gaming%20PCs",                     desc: "High-performance gaming rigs" },
  { label: "Laptops & MacBooks",  href: "/shop?cat=Laptops%20%26%20MacBooks",         desc: "Windows laptops & Apple MacBooks" },
  { label: "Tablets & Watches",   href: "/shop?cat=Tablets%20%26%20Watches",          desc: "iPads & Apple Watches" },
  { label: "Furniture",           href: "/shop?cat=Furniture",                        desc: "Sofas, beds & home furniture" },
  { label: "Home Appliances",     href: "/shop?cat=Home%20Appliances",                desc: "Fridges, washers, dishwashers" },
  { label: "Kitchen Appliances",  href: "/shop?cat=Kitchen%20Appliances",             desc: "Ovens, hobs & microwaves" },
  { label: "Solar & Power",       href: "/shop?cat=Solar%20%26%20Power%20Solutions",  desc: "Inverters, batteries & solar panels" },
  { label: "Electric Ride-Ons",   href: "/shop?cat=Electric%20Ride-On%20Cars",        desc: "Kids electric cars" },
  { label: "Office Equipment",    href: "/shop?cat=Office%20Equipment",               desc: "Printers & office tech" },
];

function DaisyLogo() {
  return (
    <Image src="/logo.jpg" alt="Daisy Gadgets Co." width={44} height={44} className="rounded-lg" />
  );
}

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [shopOpen, setShopOpen] = useState(false);
  const shopRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  useEffect(() => {
    function handler(e: MouseEvent) {
      if (shopRef.current && !shopRef.current.contains(e.target as Node)) setShopOpen(false);
    }
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  useEffect(() => { setMobileOpen(false); setShopOpen(false); }, [pathname]);

  const isActive = (href: string) => href === "/" ? pathname === "/" : pathname.startsWith(href.split("?")[0]);

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      {/* Announcement Bar */}
      <div className="flex items-center justify-center gap-3 px-4 py-2.5 text-center"
        style={{ background: "linear-gradient(90deg, #C9971C, #D4AF37, #F0CE6A, #D4AF37, #C9971C)", color: "#0A0A0A" }}>
        <Tag size={12} strokeWidth={2.5} />
        <span style={{ fontFamily: "var(--font-outfit)", fontWeight: 700, fontSize: 11, letterSpacing: "0.03em" }}>
          30% OFF — August to December Special &nbsp;•&nbsp; Free Worldwide Delivery &nbsp;•&nbsp; Orders Over R10,000 Get 25% Discount
        </span>
        <Tag size={12} strokeWidth={2.5} />
      </div>

      {/* Main Nav */}
      <div style={{ background: "rgba(10,10,10,0.97)", backdropFilter: "blur(16px)", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
        <div className="max-w-7xl mx-auto px-5 sm:px-8 h-[72px] flex items-center justify-between gap-4">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 shrink-0" onClick={() => setMobileOpen(false)}>
            <DaisyLogo />
            <div>
              <p style={{ fontFamily: "var(--font-outfit)", fontWeight: 700, fontSize: 15, color: "#D4AF37", lineHeight: 1.2 }}>
                Daisy Gadgets Co.
              </p>
              <p style={{ fontSize: 9, color: "#6B7280", letterSpacing: "0.1em", textTransform: "uppercase" }}>Premium Gadgets</p>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-0.5">
            <Link href="/" className={`nav-link px-3 py-2 rounded-lg${isActive("/") ? " active" : ""}`}>Home</Link>

            <div className="relative" ref={shopRef}>
              <button onClick={() => setShopOpen((v) => !v)}
                className={`nav-link px-3 py-2 rounded-lg flex items-center gap-1.5${isActive("/shop") ? " active" : ""}`}>
                Shop
                <ChevronDown size={12} strokeWidth={2.5}
                  style={{ transition: "transform 0.2s", transform: shopOpen ? "rotate(180deg)" : "rotate(0deg)" }} />
              </button>
              {shopOpen && (
                <div className="absolute top-full left-0 mt-2 w-72 rounded-2xl overflow-hidden shadow-2xl"
                  style={{ background: "#141414", border: "1px solid rgba(255,255,255,0.08)", boxShadow: "0 20px 60px rgba(0,0,0,0.6)" }}>
                  <div className="p-2 max-h-[75vh] overflow-y-auto">
                    {shopLinks.map((item) => (
                      <Link key={item.label} href={item.href} onClick={() => setShopOpen(false)}
                        className="flex flex-col gap-0.5 px-4 py-2.5 rounded-xl hover:bg-white/5 transition-colors group">
                        <span style={{ fontFamily: "var(--font-outfit)", fontWeight: 600, fontSize: 13, color: "#F0F0F0" }}
                          className="group-hover:text-[#D4AF37] transition-colors">{item.label}</span>
                        <span style={{ fontSize: 11, color: "#6B7280" }}>{item.desc}</span>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <Link href="/special-offers" className={`nav-link px-3 py-2 rounded-lg flex items-center gap-1${isActive("/special-offers") ? " active" : ""}`}>
              Offers <span className="text-[9px] font-bold text-[#0A0A0A] bg-[#D4AF37] rounded-full px-1.5 py-0.5 leading-none">30%</span>
            </Link>
            <Link href="/new-arrivals" className={`nav-link px-3 py-2 rounded-lg${isActive("/new-arrivals") ? " active" : ""}`}>New</Link>
            <Link href="/faq"          className={`nav-link px-3 py-2 rounded-lg${isActive("/faq") ? " active" : ""}`}>FAQ</Link>
            <Link href="/about"        className={`nav-link px-3 py-2 rounded-lg${isActive("/about") ? " active" : ""}`}>About</Link>
            <Link href="/contact"      className={`nav-link px-3 py-2 rounded-lg${isActive("/contact") ? " active" : ""}`}>Contact</Link>
          </nav>

          {/* Desktop CTAs */}
          <div className="hidden lg:flex items-center gap-2">
            <CartButton />
            <a href="https://wa.me/27848961782" target="_blank" rel="noopener noreferrer"
              className="btn-gold rounded-xl flex items-center gap-1.5"
              style={{ fontSize: 12, padding: "9px 14px" }}>
              <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><path d={WaPath} /></svg>
              WhatsApp
            </a>
            <Link href="/track-order" className="btn-outline rounded-xl" style={{ fontSize: 12, padding: "9px 14px" }}>
              Track Order
            </Link>
          </div>

          {/* Mobile right */}
          <div className="lg:hidden flex items-center gap-2">
            <CartButton />
            <button onClick={() => setMobileOpen((v) => !v)}
              className="w-10 h-10 flex items-center justify-center rounded-xl text-gray-300 hover:text-white hover:bg-white/6 transition-all"
              aria-label="Menu">
              {mobileOpen ? <X size={20} strokeWidth={2.2} /> : <Menu size={20} strokeWidth={2.2} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="lg:hidden" style={{ background: "#0f0f0f", borderTop: "1px solid rgba(255,255,255,0.06)" }}>
          <div className="max-w-7xl mx-auto px-5 py-4 flex flex-col gap-1">
            {[
              { label: "Home",             href: "/" },
              { label: "Shop All",         href: "/shop" },
              { label: "Special Offers",   href: "/special-offers" },
              { label: "New Arrivals",     href: "/new-arrivals" },
              { label: "Track My Order",   href: "/track-order" },
              { label: "FAQ",              href: "/faq" },
              { label: "About Us",         href: "/about" },
              { label: "Contact Us",       href: "/contact" },
              { label: "Delivery Info",    href: "/delivery" },
              { label: "Payment Options",  href: "/payment-options" },
            ].map((item) => {
              const active = item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
              return (
                <Link key={item.href} href={item.href} onClick={() => setMobileOpen(false)}
                  className="flex items-center justify-between px-4 py-3 rounded-xl transition-colors"
                  style={{ fontFamily: "var(--font-outfit)", fontWeight: 500, fontSize: 14,
                    color: active ? "#D4AF37" : "#D1D5DB", background: active ? "rgba(212,175,55,0.06)" : "transparent" }}>
                  {item.label}
                  {active && <ChevronDown size={15} color="#D4AF37" style={{ transform: "rotate(-90deg)" }} />}
                </Link>
              );
            })}
            <div className="pt-3 pb-1 flex flex-col gap-2.5">
              <a href="https://wa.me/27848961782" target="_blank" rel="noopener noreferrer"
                onClick={() => setMobileOpen(false)}
                className="btn-gold w-full py-3.5 rounded-xl text-sm flex items-center justify-center gap-2">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d={WaPath} /></svg>
                Chat on WhatsApp
              </a>
              <Link href="/special-offers" onClick={() => setMobileOpen(false)}
                className="btn-outline w-full py-3 rounded-xl text-sm flex items-center justify-center gap-1.5">
                <Sparkles size={14} /> View Special Offers
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
