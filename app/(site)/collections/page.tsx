import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { getProducts } from "@/lib/products";
import { BRAND } from "@/lib/config";

export const metadata: Metadata = {
  title: `Collections | ${BRAND.name}`,
  description: "Explore our curated collections — streetwear, essentials, unisex drops and accessories.",
  alternates: { canonical: `${BRAND.domain}/collections` },
};

const COLLECTIONS = [
  {
    label: "Streetwear",
    desc: "Urban cuts and bold graphics for the street-ready look.",
    href: "/shop?cat=Streetwear",
    accent: "#ffffff",
  },
  {
    label: "Unisex Essentials",
    desc: "Classic tees and hoodies built for everyone.",
    href: "/shop?cat=Unisex+T-Shirts",
    accent: "#ffffff",
  },
  {
    label: "Unisex Hoodies",
    desc: "Heavy-weight comfort. Oversized fits. Year-round staples.",
    href: "/shop?cat=Unisex+Hoodies",
    accent: "#ffffff",
  },
  {
    label: "Accessories",
    desc: "Caps, bags and the finishing touches that complete the look.",
    href: "/shop?cat=Accessories",
    accent: "#ffffff",
  },
];

export default async function CollectionsPage() {
  const featured = getProducts().filter((p) => p.inStock && p.featured).slice(0, 8);

  return (
    <div className="min-h-screen">

      {/* Hero */}
      <section className="py-24 px-6 bg-[#0A0A0A] border-b border-[#1F1F1F] text-center">
        <p className="section-label mb-3">Curated Drops</p>
        <h1
          className="text-4xl sm:text-5xl font-bold text-white mb-4"
          style={{ fontFamily: "var(--font-playfair)" }}
        >
          Our Collections
        </h1>
        <p className="text-gray-400 max-w-lg mx-auto">
          From urban streetwear to everyday essentials — each collection is a statement.
        </p>
      </section>

      {/* Collection cards */}
      <section className="px-4 sm:px-6 py-14 max-w-6xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {COLLECTIONS.map((col) => (
            <Link
              key={col.label}
              href={col.href}
              className="group relative aspect-[16/9] rounded-2xl overflow-hidden bg-[#111111] border border-[#1F1F1F] hover:border-white/20 flex items-end p-8 transition-all duration-300"
            >
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
              <div className="relative z-10">
                <h2
                  className="text-2xl font-bold text-white mb-2 group-hover:translate-x-1 transition-transform"
                  style={{ fontFamily: "var(--font-playfair)" }}
                >
                  {col.label}
                </h2>
                <p className="text-gray-400 text-sm">{col.desc}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured from all */}
      {featured.length > 0 && (
        <section className="px-4 sm:px-6 py-14 max-w-6xl mx-auto border-t border-[#1F1F1F]">
          <h2
            className="text-2xl font-bold text-white mb-8"
            style={{ fontFamily: "var(--font-playfair)" }}
          >
            Featured Picks
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-5">
            {featured.map((p) => (
              <Link key={p.id} href={`/shop/${p.slug ?? p.id}`} className="group">
                <div className="relative aspect-[4/5] rounded-xl overflow-hidden bg-[#111111] mb-3">
                  {p.imageUrl ? (
                    <Image
                      src={p.imageUrl}
                      alt={p.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center text-gray-700 text-4xl">👕</div>
                  )}
                </div>
                <p className="text-xs text-gray-500 mb-1">{p.category}</p>
                <p className="text-sm font-semibold text-white line-clamp-2 mb-1">{p.name}</p>
                <span className="text-white font-bold text-sm">R {parseFloat(p.price).toLocaleString("en-ZA")}</span>
              </Link>
            ))}
          </div>
        </section>
      )}

    </div>
  );
}
