import { getProducts } from "@/lib/products";
import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Package } from "lucide-react";
import { Suspense } from "react";
import ShopFilters from "./ShopFilters";
import AddToEnquiry from "./AddToEnquiry";

export const dynamic = "force-dynamic";

const CAT_META: Record<string, { title: string; description: string }> = {
  "Smartphones":                  { title: "Smartphones — iPhones & Android",         description: "Shop iPhones, Samsung Galaxy, and more. 30% OFF August to December. Fast delivery across South Africa." },
  "TVs":                          { title: "Smart TVs — Samsung, LG, Hisense",        description: "4K and OLED Smart TVs from Samsung, LG, Hisense and more. Great prices with free delivery in South Africa." },
  "Gaming Consoles":              { title: "Gaming Consoles — PS5, Xbox & More",      description: "Buy PS5, Xbox Series X/S and gaming accessories. 100% authentic with full warranty." },
  "Gaming PCs":                   { title: "Gaming PCs — High-Performance Rigs",      description: "Pre-built gaming PCs with RTX and AMD Ryzen. Ready to game out of the box." },
  "Laptops & MacBooks":           { title: "Laptops & MacBooks",                       description: "Windows laptops and Apple MacBooks for work, study and creative use. M3 chip MacBooks available." },
  "Tablets & Watches":            { title: "Tablets & Watches — iPads & Apple Watch", description: "Shop iPads and Apple Watches. Sealed, authentic devices delivered fast." },
  "Home Appliances":              { title: "Home Appliances — Fridges, Washers & More", description: "Fridges, washing machines, dishwashers and more from trusted brands. Delivered to your door." },
  "Kitchen Appliances":           { title: "Kitchen Appliances — Ovens, Hobs & More", description: "Ovens, hobs, espresso machines and kitchen tech at great prices." },
  "Solar & Power Solutions":      { title: "Solar & Power Solutions — Inverters & Batteries", description: "Load-shedding solutions: 5kVA–10kVA inverters, lithium batteries and solar panels for home and business." },
  "Electric Ride-On Cars":        { title: "Kids Electric Ride-On Cars",              description: "Licensed Mercedes and premium electric ride-on cars for kids. Safe, fun and fast delivery." },
  "Furniture":                    { title: "Furniture — Sofas, Beds & More",          description: "Quality furniture delivered to your home. Sofas, beds, dining sets and more." },
  "Office Equipment":             { title: "Office Equipment — Printers & Tech",      description: "Printers, shredders and office technology for home and business use." },
};

export async function generateMetadata({ searchParams }: { searchParams: Promise<{ cat?: string; q?: string }> }): Promise<Metadata> {
  const { cat, q } = await searchParams;
  if (q) {
    return {
      title: `Search: "${q}"`,
      description: `Search results for "${q}" at Daisy Gadgets Co. Find smartphones, TVs, gaming, laptops, solar and more.`,
    };
  }
  if (cat && CAT_META[cat]) {
    const m = CAT_META[cat];
    return {
      title: m.title,
      description: m.description,
      alternates: { canonical: `https://daisygadgetsco.co.za/shop?cat=${encodeURIComponent(cat)}` },
      openGraph: { title: `${m.title} | Daisy Gadgets Co.`, description: m.description },
      twitter: { card: "summary_large_image", title: m.title, description: m.description },
    };
  }
  return {
    title: "Shop — Premium Gadgets",
    description: "Browse our full range of smartphones, smart TVs, gaming consoles, laptops, MacBooks, home appliances, solar & more. Worldwide shipping available.",
    alternates: { canonical: "https://daisygadgetsco.co.za/shop" },
  };
}

export default async function Shop({ searchParams }: { searchParams: Promise<{ cat?: string; q?: string }> }) {
  const { cat, q } = await searchParams;
  const all = getProducts().filter((p) => p.inStock);

  let filtered = all;
  if (cat) filtered = filtered.filter((p) => p.category === cat);
  if (q) {
    const query = q.toLowerCase();
    filtered = filtered.filter((p) =>
      p.name.toLowerCase().includes(query) ||
      (p.description ?? "").toLowerCase().includes(query)
    );
  }

  const featured = filtered.filter((p) => p.featured);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-8 py-16">

      <div className="mb-12">
        <p className="text-[#D4AF37] text-sm uppercase tracking-widest mb-3">All Products</p>
        <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4">
          Our <span className="gold-text">Shop</span>
        </h1>
        <p className="text-gray-400 text-lg leading-relaxed max-w-xl">
          Premium gadgets across all categories. {cat ? `Showing: ${cat}` : "Browse everything or filter by category."}
        </p>
      </div>

      <Suspense fallback={null}>
        <ShopFilters />
      </Suspense>

      {filtered.length === 0 ? (
        <div className="text-center py-16">
          <Package size={48} color="#2a2a2a" strokeWidth={1} className="mx-auto mb-4" />
          <p className="text-gray-500 text-base mb-4">{q || cat ? "No products match your search." : "No products available yet."}</p>
          <Link href="/shop" className="btn-gold px-8 py-3 rounded-xl font-bold">Clear Filters</Link>
        </div>
      ) : (
        <Suspense fallback={null}>
          <ProductGrid products={filtered} featured={featured} />
        </Suspense>
      )}

      <div className="mt-12 bg-[#111111] border border-[#D4AF37]/25 rounded-2xl p-7 text-center">
        <h3 className="text-xl font-bold text-white mb-2">Can&apos;t find what you&apos;re looking for?</h3>
        <p className="text-gray-400 text-sm mb-5 max-w-lg mx-auto leading-relaxed">
          We source a wide range of gadgets. Chat with us on WhatsApp and we&apos;ll find it for you.
        </p>
        <a href="https://wa.me/27848961782" target="_blank" rel="noopener noreferrer"
          className="btn-gold px-10 py-4 rounded-xl font-bold text-base">
          Chat on WhatsApp
        </a>
      </div>
    </div>
  );
}

function ProductGrid({ products, featured }: { products: ReturnType<typeof getProducts>; featured: ReturnType<typeof getProducts> }) {
  return (
    <div className="space-y-12">
      {featured.length > 0 && (
        <section>
          <SectionHeader title="Featured" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featured.map((p) => <ProductCard key={p.id} product={p} />)}
          </div>
        </section>
      )}
      {Object.entries(
        products.reduce((acc, p) => {
          if (!acc[p.category]) acc[p.category] = [];
          acc[p.category].push(p);
          return acc;
        }, {} as Record<string, typeof products>)
      ).map(([cat, items]) => (
        <section key={cat}>
          <SectionHeader title={cat} />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {items.map((p) => <ProductCard key={p.id} product={p} />)}
          </div>
        </section>
      ))}
    </div>
  );
}

function SectionHeader({ title }: { title: string }) {
  return (
    <div className="flex items-center gap-5 mb-8">
      <h2 className="text-2xl font-bold text-white whitespace-nowrap">{title}</h2>
      <div className="flex-1 h-px bg-[#1F1F1F]" />
    </div>
  );
}

function ProductCard({ product }: { product: ReturnType<typeof getProducts>[0] }) {
  return (
    <Link href={`/shop/${product.id}`}
      className="bg-[#111111] border border-[#1F1F1F] rounded-2xl overflow-hidden card-hover flex flex-col group">
      <div className="relative h-64 bg-[#0f0f0f] overflow-hidden">
        {product.imageUrl ? (
          <Image src={product.imageUrl} alt={product.name} fill
            className="object-contain transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw" />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <Package size={48} color="#2a2a2a" strokeWidth={1} />
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-[#111111]/70 to-transparent" />
        {product.featured && (
          <span className="absolute top-3 left-3 btn-gold text-[10px] font-bold px-3 py-1 rounded-full">Featured</span>
        )}
      </div>
      <div className="p-6 flex flex-col flex-1">
        <p className="text-xs text-[#D4AF37] uppercase tracking-wider mb-2">{product.category}</p>
        <p className="font-medium text-white text-sm leading-snug mb-2 flex-1">{product.name}</p>
        {product.description && (
          <p className="text-gray-500 text-sm leading-relaxed mb-3 line-clamp-2">{product.description}</p>
        )}
        <div className="flex items-center gap-2 mb-3">
          <p className="text-[#D4AF37] font-bold text-xl">{product.price}</p>
          {product.originalPrice && (
            <p className="text-gray-600 text-sm line-through">{product.originalPrice}</p>
          )}
        </div>
        <div className="flex flex-col gap-2">
          <div className="w-full py-2.5 rounded-xl text-sm font-semibold text-center text-white border border-[#2a2a2a] group-hover:border-[#D4AF37]/50 transition-colors">
            View Details
          </div>
          <AddToEnquiry
            id={product.id}
            name={product.name}
            price={product.price}
            imageUrl={product.imageUrl}
            category={product.category}
          />
        </div>
      </div>
    </Link>
  );
}
