import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { getProductsByGender } from "@/lib/products";
import { BRAND } from "@/lib/config";
import { WOMEN_CATEGORIES } from "@/lib/categories";
import { ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: `Women's Clothing | ${BRAND.name}`,
  description: "Shop women's tops, dresses, hoodies, jackets, pants and shorts. Premium quality, free delivery in South Africa.",
  alternates: { canonical: `${BRAND.domain}/women` },
};

const CAT_LINKS = WOMEN_CATEGORIES.map((c) => ({
  label: c,
  href: `/shop?cat=${encodeURIComponent(c)}`,
}));

export default function WomenPage() {
  const products = getProductsByGender("Women", 24);

  return (
    <div className="min-h-screen">

      {/* Hero */}
      <section className="relative py-24 px-6 bg-[#0A0A0A] border-b border-[#1F1F1F] text-center">
        <p className="section-label mb-3">Women&apos;s Collection</p>
        <h1
          className="text-4xl sm:text-5xl font-bold text-white mb-4"
          style={{ fontFamily: "var(--font-playfair)" }}
        >
          Elegant. Bold. Yours.
        </h1>
        <p className="text-gray-400 max-w-md mx-auto mb-8">
          Tops, dresses, hoodies, jackets and more — made for women who define their own style.
        </p>
        <Link href="/shop?gender=Women" className="btn-primary px-8 py-3.5 rounded-xl font-bold">
          Shop All Women&apos;s
        </Link>
      </section>

      {/* Category pills */}
      <section className="px-4 sm:px-6 py-8 max-w-6xl mx-auto">
        <div className="flex flex-wrap gap-2">
          {CAT_LINKS.map((c) => (
            <Link
              key={c.label}
              href={c.href}
              className="px-4 py-2 rounded-full border border-[#2a2a2a] text-sm text-gray-300 hover:text-white hover:border-white/40 transition-all"
            >
              {c.label}
            </Link>
          ))}
        </div>
      </section>

      {/* Products */}
      <section className="px-4 sm:px-6 pb-20 max-w-6xl mx-auto">
        {products.length === 0 ? (
          <div className="py-24 text-center">
            <p className="text-gray-500 mb-6">No women&apos;s products yet — check back soon.</p>
            <Link href="/shop" className="btn-outline px-8 py-3 rounded-xl">Browse All</Link>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-5">
            {products.map((p) => (
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
                    <div className="absolute inset-0 flex items-center justify-center text-gray-700 text-4xl">👗</div>
                  )}
                  {p.originalPrice && (
                    <span className="badge-sale absolute top-3 left-3">Sale</span>
                  )}
                </div>
                <p className="text-xs text-gray-500 mb-1">{p.category}</p>
                <p className="text-sm font-semibold text-white leading-snug line-clamp-2 mb-1">{p.name}</p>
                <div className="flex items-center gap-2">
                  <span className="text-white font-bold text-sm">R {parseFloat(p.price).toLocaleString("en-ZA")}</span>
                  {p.originalPrice && (
                    <span className="text-gray-500 text-xs line-through">R {parseFloat(p.originalPrice).toLocaleString("en-ZA")}</span>
                  )}
                </div>
              </Link>
            ))}
          </div>
        )}

        <div className="mt-10 text-center">
          <Link href="/shop?gender=Women" className="text-sm text-gray-400 hover:text-white flex items-center gap-1 justify-center transition-colors">
            View full women&apos;s catalogue <ArrowRight size={14} />
          </Link>
        </div>
      </section>

    </div>
  );
}
