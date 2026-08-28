import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { getFeaturedProducts, getNewArrivals } from "@/lib/products";
import { BRAND } from "@/lib/config";
import { ArrowRight, Truck, RotateCcw, ShieldCheck, Lock } from "lucide-react";
import NewsletterForm from "@/components/NewsletterForm";
import WishlistButton from "@/components/WishlistButton";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: `${BRAND.name} | ${BRAND.tagline}`,
  description: "Shop premium men's and women's clothing — hoodies, tees, jackets, streetwear and more. Free delivery in South Africa.",
  alternates: { canonical: BRAND.domain },
  openGraph: {
    title: `${BRAND.name} | Premium Clothing`,
    description: "Shop premium men's and women's clothing. Free delivery in South Africa.",
    url: BRAND.domain,
    type: "website",
  },
};

const CATEGORY_CARDS = [
  { label: "Men", sub: "Shop Now", href: "/men", bg: "#111111" },
  { label: "Women", sub: "Shop Now", href: "/women", bg: "#0f0f0f" },
  { label: "Lifestyle", sub: "Shop Now", href: "/collections", bg: "#0d0d0d" },
];

const VALUES = [
  { Icon: Truck,       title: "Free Delivery",     body: "Free nationwide delivery on orders over R999." },
  { Icon: RotateCcw,   title: "Easy Returns",       body: "30-day hassle-free returns on unworn items." },
  { Icon: ShieldCheck, title: "Authentic Products", body: "Every piece quality-checked before it ships." },
  { Icon: Lock,        title: "Secure Payments",    body: "EFT payments processed safely every time." },
];

export default async function HomePage() {
  const featured = getFeaturedProducts(8);
  const newArrivals = getNewArrivals(6);

  return (
    <div className="min-h-screen">

      {/* ── Hero ─────────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-[#080808]" style={{ minHeight: "92vh" }}>
        {/* Background image fills full section */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('/images/hero-banner.jpg')", opacity: 0.35 }}
        />
        {/* Gradient overlay: strong on right for text readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#080808]/10 via-[#080808]/50 to-[#080808]" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#080808] via-transparent to-transparent" />

        {/* Content: centered on mobile, right-aligned on desktop */}
        <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8 h-full flex items-center" style={{ minHeight: "92vh" }}>
          <div className="w-full lg:w-1/2 lg:ml-auto py-24 lg:py-0">
            <p className="section-label mb-4 tracking-[0.3em]">New Season — 2026</p>
            <h1
              className="text-5xl sm:text-6xl lg:text-7xl font-extrabold text-white leading-[0.95] mb-6"
              style={{ fontFamily: "var(--font-playfair)", letterSpacing: "-0.02em" }}
            >
              STEP INTO<br />YOUR NEXT
            </h1>
            <p className="text-gray-400 text-base sm:text-lg mb-10 max-w-sm leading-relaxed">
              Premium clothing. Everyday confidence.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Link href="/shop" className="btn-gold-fill px-8 py-4 text-sm">
                Shop Now
              </Link>
              <Link href="/collections" className="btn-outline px-8 py-4 text-sm">
                Explore Collection
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── Featured Products ─────────────────────────────────── */}
      {featured.length > 0 && (
        <section className="px-4 sm:px-6 py-16 max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <div>
              <p className="section-label mb-1">Curated for You</p>
              <h2
                className="text-2xl sm:text-3xl font-bold text-white"
                style={{ fontFamily: "var(--font-playfair)" }}
              >
                Featured Pieces
              </h2>
            </div>
            <Link href="/shop" className="text-xs text-gray-400 hover:text-white flex items-center gap-1.5 transition-colors uppercase tracking-wider font-semibold">
              View All <ArrowRight size={12} />
            </Link>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-5">
            {featured.map((p) => (
              <Link key={p.id} href={`/shop/${p.slug ?? p.id}`} className="group relative">
                {/* Product image */}
                <div className="relative aspect-[4/5] rounded-xl overflow-hidden bg-[#111111] mb-3">
                  {p.imageUrl ? (
                    <Image
                      src={p.imageUrl}
                      alt={p.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center bg-[#111] text-gray-700 text-5xl select-none">
                      BS
                    </div>
                  )}
                  {p.originalPrice && (
                    <span className="badge-sale absolute top-3 left-3">Sale</span>
                  )}
                  {/* Wishlist heart */}
                  <div className="absolute top-3 right-3">
                    <WishlistButton size={14} />
                  </div>
                </div>
                <p className="text-[10px] text-gray-500 mb-1 uppercase tracking-wider font-semibold">{p.category}</p>
                <p className="text-sm font-semibold text-white leading-snug line-clamp-1 mb-1.5">{p.name}</p>
                <div className="flex items-center gap-2">
                  <span className="text-white font-bold text-sm">
                    R {parseFloat(String(p.price)).toLocaleString("en-ZA")}
                  </span>
                  {p.originalPrice && (
                    <span className="text-gray-600 text-xs line-through">
                      R {parseFloat(String(p.originalPrice)).toLocaleString("en-ZA")}
                    </span>
                  )}
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* ── New Arrivals ──────────────────────────────────────── */}
      {newArrivals.length > 0 && (
        <section className="py-14 border-t border-[#1F1F1F]">
          <div className="px-4 sm:px-6 max-w-7xl mx-auto mb-6 flex items-center justify-between">
            <div>
              <p className="section-label mb-1">Just In</p>
              <h2 className="text-2xl font-bold text-white" style={{ fontFamily: "var(--font-playfair)" }}>
                New Arrivals
              </h2>
            </div>
            <Link href="/new-arrivals" className="text-xs text-gray-400 hover:text-white flex items-center gap-1.5 transition-colors uppercase tracking-wider font-semibold">
              Shop Now <ArrowRight size={12} />
            </Link>
          </div>
          <div className="flex gap-4 overflow-x-auto no-scrollbar px-4 sm:px-6 pb-2">
            {newArrivals.map((p) => (
              <Link key={p.id} href={`/shop/${p.slug ?? p.id}`} className="group shrink-0 w-44 sm:w-52">
                <div className="relative aspect-[3/4] rounded-xl overflow-hidden bg-[#111111] mb-3">
                  {p.imageUrl ? (
                    <Image
                      src={p.imageUrl}
                      alt={p.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center bg-[#111] text-gray-700 text-2xl font-bold">BS</div>
                  )}
                  <span className="absolute top-2 left-2 bg-white text-black text-[9px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
                    New
                  </span>
                  <div className="absolute top-2 right-2">
                    <WishlistButton size={12} />
                  </div>
                </div>
                <p className="text-sm font-semibold text-white line-clamp-1 mb-0.5">{p.name}</p>
                <p className="text-sm text-gray-400 font-medium">R {parseFloat(String(p.price)).toLocaleString("en-ZA")}</p>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* ── Best Sellers ──────────────────────────────────────── */}
      {featured.length > 0 && (
        <section className="py-14 border-t border-[#1F1F1F]">
          <div className="px-4 sm:px-6 max-w-7xl mx-auto mb-6 flex items-center justify-between">
            <div>
              <p className="section-label mb-1">Top Picks</p>
              <h2 className="text-2xl font-bold text-white" style={{ fontFamily: "var(--font-playfair)" }}>
                Best Sellers
              </h2>
            </div>
            <Link href="/shop" className="text-xs text-gray-400 hover:text-white flex items-center gap-1.5 transition-colors uppercase tracking-wider font-semibold">
              Shop Now <ArrowRight size={12} />
            </Link>
          </div>
          <div className="flex gap-4 overflow-x-auto no-scrollbar px-4 sm:px-6 pb-2">
            {featured.slice(0, 6).map((p) => (
              <Link key={p.id} href={`/shop/${p.slug ?? p.id}`} className="group shrink-0 w-44 sm:w-52">
                <div className="relative aspect-[3/4] rounded-xl overflow-hidden bg-[#111111] mb-3">
                  {p.imageUrl ? (
                    <Image
                      src={p.imageUrl}
                      alt={p.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center bg-[#111] text-gray-700 text-2xl font-bold">BS</div>
                  )}
                  <div className="absolute top-2 right-2">
                    <WishlistButton size={12} />
                  </div>
                </div>
                <p className="text-sm font-semibold text-white line-clamp-1 mb-0.5">{p.name}</p>
                <p className="text-sm text-gray-400 font-medium">R {parseFloat(String(p.price)).toLocaleString("en-ZA")}</p>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* ── Shop by Category ──────────────────────────────────── */}
      <section className="px-4 sm:px-6 py-16 max-w-7xl mx-auto border-t border-[#1F1F1F]">
        <div className="flex items-center justify-between mb-8">
          <div>
            <p className="section-label mb-1">Browse</p>
            <h2 className="text-2xl font-bold text-white" style={{ fontFamily: "var(--font-playfair)" }}>
              Shop by Category
            </h2>
          </div>
          <Link href="/shop" className="text-xs text-gray-400 hover:text-white flex items-center gap-1.5 transition-colors uppercase tracking-wider font-semibold">
            View All <ArrowRight size={12} />
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {CATEGORY_CARDS.map((cat) => (
            <Link
              key={cat.label}
              href={cat.href}
              className="group relative aspect-[4/3] sm:aspect-[3/4] rounded-2xl overflow-hidden flex flex-col justify-end p-6"
              style={{ background: cat.bg, border: "1px solid #1F1F1F" }}
            >
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              <div className="relative z-10">
                <p
                  className="text-2xl font-bold text-white mb-1 group-hover:translate-x-1 transition-transform duration-200"
                  style={{ fontFamily: "var(--font-playfair)" }}
                >
                  {cat.label}
                </p>
                <p className="text-xs text-gray-400 uppercase tracking-wider font-semibold flex items-center gap-1.5">
                  {cat.sub} <ArrowRight size={10} className="opacity-60 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all" />
                </p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ── Limited Drop ──────────────────────────────────────── */}
      <section className="px-4 sm:px-6 py-6 max-w-7xl mx-auto">
        <div
          className="relative rounded-2xl overflow-hidden flex flex-col sm:flex-row items-center justify-between gap-6 p-10 sm:p-12"
          style={{ background: "#0d0d0d", border: "1px solid #1F1F1F" }}
        >
          {/* subtle grain texture */}
          <div className="absolute inset-0 opacity-[0.03]"
            style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E\")" }} />
          <div className="relative z-10 text-center sm:text-left">
            <p className="section-label mb-2" style={{ color: "#D4AF37", borderColor: "#D4AF37" }}>Limited Drop</p>
            <h2
              className="text-3xl sm:text-4xl font-extrabold text-white mb-2"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              Exclusive Styles.
            </h2>
            <p className="text-gray-400 text-sm tracking-wider uppercase font-semibold">Limited Quantity — Get Yours Now</p>
          </div>
          <Link href="/shop" className="btn-gold-fill relative z-10 px-10 py-4 text-sm shrink-0">
            Shop the Drop
          </Link>
        </div>
      </section>

      {/* ── Value Props ───────────────────────────────────────── */}
      <section className="px-4 sm:px-6 py-16 max-w-7xl mx-auto border-t border-[#1F1F1F]">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {VALUES.map(({ Icon, title, body }) => (
            <div key={title} className="flex flex-col sm:flex-row items-center sm:items-start gap-4 text-center sm:text-left">
              <div className="w-11 h-11 rounded-xl bg-[#1a1a1a] border border-[#2a2a2a] flex items-center justify-center shrink-0">
                <Icon size={19} className="text-white" strokeWidth={1.7} />
              </div>
              <div>
                <p className="text-white font-semibold text-sm mb-1">{title}</p>
                <p className="text-gray-500 text-xs leading-relaxed">{body}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Newsletter ────────────────────────────────────────── */}
      <section className="px-4 sm:px-6 py-16 max-w-7xl mx-auto border-t border-[#1F1F1F]">
        <div
          className="rounded-2xl p-10 sm:p-14 flex flex-col lg:flex-row items-center justify-between gap-8"
          style={{ background: "#111111", border: "1px solid #1F1F1F" }}
        >
          <div className="text-center lg:text-left">
            <p className="section-label mb-3">Community</p>
            <h2
              className="text-2xl sm:text-3xl font-bold text-white mb-2"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              Join the Bevans Sons Community
            </h2>
            <p className="text-gray-500 text-sm">
              Be first to know about new drops, exclusive offers, and styling tips.
            </p>
          </div>
          <div className="w-full lg:w-auto">
            <NewsletterForm />
          </div>
        </div>
      </section>

    </div>
  );
}
