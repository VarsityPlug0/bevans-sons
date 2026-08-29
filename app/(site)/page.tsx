import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { getFeaturedProducts, getNewArrivals } from "@/lib/products";
import { BRAND, formatPrice } from "@/lib/config";
import { ArrowRight, Truck, RotateCcw, ShieldCheck, MessageCircle } from "lucide-react";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: `${BRAND.name} | ${BRAND.tagline}`,
  description: "Shop premium clothing — hoodies, tees, jackets, streetwear and more. Fast delivery across South Africa.",
  alternates: { canonical: BRAND.domain },
  openGraph: {
    title: `${BRAND.name} | Premium Clothing`,
    description: "Shop premium clothing. Fast delivery across South Africa.",
    url: BRAND.domain,
    type: "website",
  },
};

const GUARANTEES = [
  { icon: Truck,         label: "Fast SA Delivery",  sub: "3–5 business days" },
  { icon: RotateCcw,     label: "Free Size Swaps",   sub: "7-day return policy" },
  { icon: ShieldCheck,   label: "Quality Guarantee", sub: "Premium fabrics" },
  { icon: MessageCircle, label: "WhatsApp Support",  sub: "Fast response" },
];

const CATEGORIES = [
  { label: "Hoodies",  cat: "Hoodies & Streetwear", img: "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=600&auto=format&fit=crop&q=80" },
  { label: "Men's",    cat: "Men's Wear",            img: "https://images.unsplash.com/photo-1617137984095-74e4e5e3613f?w=600&auto=format&fit=crop&q=80" },
  { label: "Women's",  cat: "Women's Fashion",       img: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=600&auto=format&fit=crop&q=80" },
  { label: "Sneakers", cat: "Sneakers & Shoes",      img: "https://images.unsplash.com/photo-1552346154-21d32810aba3?w=600&auto=format&fit=crop&q=80" },
];

export default function HomePage() {
  const featured = getFeaturedProducts(8);
  const newArrivals = getNewArrivals(4);

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#0A0A0A] via-[#111111] to-[#0D0D0D] border-b border-[#1F1F1F] py-20 md:py-32">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#D4AF37_1px,transparent_1px)] [background-size:28px_28px]" />
        <div className="max-w-7xl mx-auto px-4 sm:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-7 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#D4AF37]/15 border border-[#D4AF37]/40 text-[#D4AF37] text-xs font-bold uppercase tracking-wider">
                New Collection — Available Now
              </div>
              <h1 className="text-5xl sm:text-6xl md:text-7xl font-black text-white tracking-tight leading-[1.05]">
                Dress Bold.<br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#D4AF37] via-[#F3E5AB] to-[#AA771C]">
                  Live Loud.
                </span>
              </h1>
              <p className="text-gray-300 text-lg max-w-lg mx-auto lg:mx-0 leading-relaxed">
                Premium streetwear crafted for those who refuse to blend in. Heavyweight cotton, signature cuts, fast SA delivery.
              </p>
              <div className="flex flex-wrap gap-4 justify-center lg:justify-start pt-2">
                <Link href="/shop" className="btn-primary px-8 py-4 rounded-xl font-extrabold text-sm flex items-center gap-2 shadow-xl">
                  Shop Now <ArrowRight size={16} />
                </Link>
                <Link href="/clothing" className="px-6 py-4 rounded-xl font-bold text-sm text-gray-300 border border-[#2a2a2a] bg-[#141414] hover:bg-[#1f1f1f] hover:text-white hover:border-gray-500 transition-all">
                  View Clothing
                </Link>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 border-t border-[#1F1F1F]">
                {GUARANTEES.map(({ icon: Icon, label, sub }) => (
                  <div key={label} className="flex flex-col items-center lg:items-start gap-1 text-xs text-gray-400">
                    <Icon size={18} className="text-[#D4AF37]" />
                    <span className="font-bold text-white text-[11px]">{label}</span>
                    <span className="text-[10px]">{sub}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative mx-auto max-w-sm lg:max-w-none">
              <div className="relative aspect-[3/4] rounded-3xl overflow-hidden border border-[#D4AF37]/30 shadow-2xl shadow-black/80">
                <Image
                  src="https://images.unsplash.com/photo-1509967419530-da38b4704bc6?w=900&auto=format&fit=crop&q=90"
                  alt="Bevans Sons Premium Clothing"
                  fill priority
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                <div className="absolute top-4 right-4 bg-[#D4AF37] text-black font-black text-[10px] uppercase tracking-wider px-3 py-1 rounded-full">
                  New Drop
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8 py-16">
        <div className="flex items-end justify-between mb-10">
          <div>
            <p className="text-[#D4AF37] text-xs uppercase tracking-widest font-bold mb-2">Browse By</p>
            <h2 className="text-3xl font-extrabold text-white">Shop by Category</h2>
          </div>
          <Link href="/clothing" className="text-sm font-semibold text-gray-400 hover:text-[#D4AF37] flex items-center gap-1.5 transition-colors">
            All clothing <ArrowRight size={14} />
          </Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {CATEGORIES.map((c) => (
            <Link key={c.label} href={`/shop?cat=${encodeURIComponent(c.cat)}`}
              className="group relative rounded-2xl overflow-hidden aspect-[3/4] bg-[#111] border border-[#1F1F1F] hover:border-[#D4AF37]/50 transition-all shadow-lg">
              <Image src={c.img} alt={c.label} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
              <div className="absolute bottom-4 left-4">
                <h3 className="text-sm font-bold text-white group-hover:text-[#D4AF37] transition-colors">{c.label}</h3>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* New Arrivals */}
      {newArrivals.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-8 py-10">
          <div className="flex items-end justify-between mb-8 border-b border-[#1F1F1F] pb-6">
            <div>
              <p className="text-[#D4AF37] text-xs uppercase tracking-widest font-bold mb-1">Just In</p>
              <h2 className="text-2xl font-extrabold text-white">New Arrivals</h2>
            </div>
            <Link href="/new-arrivals" className="text-sm text-gray-400 hover:text-[#D4AF37] flex items-center gap-1.5 transition-colors font-semibold">
              See all <ArrowRight size={14} />
            </Link>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {newArrivals.map((p) => (
              <Link key={p.id} href={`/shop/${p.id}`}
                className="group bg-[#111111] border border-[#1F1F1F] rounded-2xl overflow-hidden hover:border-[#D4AF37]/40 transition-all">
                <div className="relative aspect-square overflow-hidden bg-[#0A0A0A]">
                  <Image
                    src={p.imageUrl || "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=600&auto=format&fit=crop&q=80"}
                    alt={p.name} fill className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-3 space-y-1">
                  <h3 className="text-xs font-bold text-white group-hover:text-[#D4AF37] transition-colors line-clamp-2">{p.name}</h3>
                  <p className="text-sm font-extrabold text-[#D4AF37]">{formatPrice(p.price)}</p>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* Featured Products */}
      {featured.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-8 py-10">
          <div className="flex items-end justify-between mb-8 border-b border-[#1F1F1F] pb-6">
            <div>
              <p className="text-[#D4AF37] text-xs uppercase tracking-widest font-bold mb-1">Curated Picks</p>
              <h2 className="text-2xl font-extrabold text-white">Featured Products</h2>
            </div>
            <Link href="/shop" className="text-sm text-gray-400 hover:text-[#D4AF37] flex items-center gap-1.5 transition-colors font-semibold">
              Shop all <ArrowRight size={14} />
            </Link>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {featured.map((p) => (
              <Link key={p.id} href={`/shop/${p.id}`}
                className="group bg-[#111111] border border-[#1F1F1F] rounded-2xl overflow-hidden hover:border-[#D4AF37]/40 transition-all hover:shadow-xl hover:shadow-[#D4AF37]/5">
                <div className="relative aspect-square overflow-hidden bg-[#0A0A0A]">
                  <Image
                    src={p.imageUrl || "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=600&auto=format&fit=crop&q=80"}
                    alt={p.name} fill className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-4 space-y-1.5">
                  <p className="text-[10px] text-gray-500 uppercase tracking-wider">{p.category}</p>
                  <h3 className="text-sm font-bold text-white group-hover:text-[#D4AF37] transition-colors line-clamp-2 leading-snug">{p.name}</h3>
                  <p className="text-base font-extrabold text-[#D4AF37]">{formatPrice(p.price)}</p>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="bg-[#D4AF37] py-14 mt-16">
        <div className="max-w-3xl mx-auto px-4 text-center space-y-4">
          <h2 className="text-3xl sm:text-4xl font-black text-black">Ready to upgrade your wardrobe?</h2>
          <p className="text-black/70 text-sm">Message us on WhatsApp for custom orders, bulk enquiries, or questions.</p>
          <div className="flex flex-wrap gap-4 justify-center pt-2">
            <a
              href={`https://wa.me/${BRAND.whatsapp}?text=Hi%20Bevans%20Sons,%20I%20would%20like%20to%20place%20an%20order.`}
              target="_blank" rel="noopener noreferrer"
              className="bg-black text-white font-extrabold text-sm px-8 py-3.5 rounded-xl hover:bg-gray-900 transition-colors inline-flex items-center gap-2">
              Chat on WhatsApp
            </a>
            <Link href="/shop" className="bg-white/20 text-black font-bold text-sm px-8 py-3.5 rounded-xl hover:bg-white/30 transition-colors border border-black/20">
              Browse Store
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
