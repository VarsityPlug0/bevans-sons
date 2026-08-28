import { getProducts } from "@/lib/products";
import { getCategoryGender, MEN_CATEGORIES, WOMEN_CATEGORIES } from "@/lib/categories";
import { BRAND } from "@/lib/config";
import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Package } from "lucide-react";
import { Suspense } from "react";
import ShopFilters from "./ShopFilters";
import ViewProductButton from "./AddToEnquiry";

export const dynamic = "force-dynamic";

const CAT_META: Record<string, { title: string; description: string }> = {
  "Men's T-Shirts":    { title: "Men's T-Shirts",    description: "Premium men's t-shirts. Bold designs, quality cotton." },
  "Men's Hoodies":     { title: "Men's Hoodies",     description: "Heavyweight men's hoodies crafted for comfort and style." },
  "Men's Shirts":      { title: "Men's Shirts",       description: "Men's shirts from casual to smart-casual." },
  "Men's Jackets":     { title: "Men's Jackets",      description: "Men's jackets for every season." },
  "Men's Pants":       { title: "Men's Pants",        description: "Men's trousers and cargo pants." },
  "Men's Shorts":      { title: "Men's Shorts",       description: "Men's shorts — streetwear and casual." },
  "Women's Tops":      { title: "Women's Tops",       description: "Women's tops — crops, tanks and blouses." },
  "Women's Dresses":   { title: "Women's Dresses",    description: "Midi, mini and maxi dresses for every occasion." },
  "Women's Hoodies":   { title: "Women's Hoodies",    description: "Cozy women's hoodies in premium fabrics." },
  "Women's Jackets":   { title: "Women's Jackets",    description: "Women's jackets for all seasons." },
  "Women's Pants":     { title: "Women's Pants",      description: "Women's trousers and wide-leg pants." },
  "Women's Shorts":    { title: "Women's Shorts",     description: "Women's shorts — casual and sporty." },
  "Unisex T-Shirts":   { title: "Unisex T-Shirts",    description: "Unisex tees — one size fits all aesthetics." },
  "Unisex Hoodies":    { title: "Unisex Hoodies",     description: "Oversized unisex hoodies. Premium heavyweight fleece." },
  "Streetwear":        { title: "Streetwear",         description: "Bold streetwear drops — limited edition pieces." },
  "Caps":              { title: "Caps",               description: "Snapbacks, dad caps and bucket hats." },
  "Bags":              { title: "Bags",               description: "Totes, crossbodies and backpacks." },
  "Sneakers":          { title: "Sneakers",           description: "Lifestyle sneakers and urban footwear." },
  "Accessories":       { title: "Accessories",        description: "Finish your fit — socks, belts and more." },
};

export async function generateMetadata({
  searchParams,
}: {
  searchParams: Promise<{ cat?: string; q?: string }>;
}): Promise<Metadata> {
  const { cat, q } = await searchParams;
  if (q) {
    return {
      title: `Search: "${q}"`,
      description: `Search results for "${q}" at ${BRAND.name}.`,
    };
  }
  if (cat && CAT_META[cat]) {
    const m = CAT_META[cat];
    return {
      title: m.title,
      description: m.description,
      alternates: { canonical: `${BRAND.domain}/shop?cat=${encodeURIComponent(cat)}` },
      openGraph: { title: `${m.title} | ${BRAND.name}`, description: m.description },
    };
  }
  return {
    title: "Shop — Premium Clothing",
    description: `Browse ${BRAND.name}'s full clothing range. Men's and women's fashion — hoodies, tees, jackets, dresses and more.`,
    alternates: { canonical: `${BRAND.domain}/shop` },
  };
}

const toNum = (price: string | number) =>
  typeof price === "number" ? price : parseFloat(String(price).replace(/[^0-9.]/g, "")) || 0;

export default async function Shop({
  searchParams,
}: {
  searchParams: Promise<{ cat?: string; q?: string; sort?: string; price?: string }>;
}) {
  const { cat, q, sort = "featured", price } = await searchParams;

  let products = getProducts().filter((p) => p.inStock);

  if (cat) products = products.filter((p) => p.category === cat);

  if (q) {
    const query = q.toLowerCase();
    products = products.filter(
      (p) =>
        p.name.toLowerCase().includes(query) ||
        (p.description ?? "").toLowerCase().includes(query) ||
        (p.category ?? "").toLowerCase().includes(query),
    );
  }

  if (price) {
    products = products.filter((p) => {
      const n = toNum(p.price);
      if (price === "under500")   return n < 500;
      if (price === "500to1000")  return n >= 500 && n < 1000;
      if (price === "1000to2000") return n >= 1000 && n < 2000;
      if (price === "over2000")   return n >= 2000;
      return true;
    });
  }

  if (sort === "price_asc")  products = [...products].sort((a, b) => toNum(a.price) - toNum(b.price));
  else if (sort === "price_desc") products = [...products].sort((a, b) => toNum(b.price) - toNum(a.price));
  else if (sort === "newest") products = [...products].reverse();
  else products = [...products].sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));

  const total = products.length;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-8 py-10">
      <div className="mb-6">
        <p className="section-label mb-1">Bevans Sons</p>
        <h1 className="text-2xl font-bold text-white">
          {cat ? cat : q ? `Results for "${q}"` : "Shop"}
        </h1>
      </div>

      <Suspense fallback={null}>
        <ShopFilters total={total} />
      </Suspense>

      {total === 0 ? (
        <div className="text-center py-20">
          <Package size={48} color="#2a2a2a" strokeWidth={1} className="mx-auto mb-4" />
          <p className="text-gray-500 text-base mb-4">No products match your filters.</p>
          <Link href="/shop" className="btn-primary px-8 py-3">Clear Filters</Link>
        </div>
      ) : (
        <ProductGrid products={products} cat={cat} isDefaultSort={sort === "featured"} />
      )}

      {BRAND.whatsapp && (
        <div className="mt-12 bg-[#111111] border border-[#1F1F1F] rounded-xl p-8 text-center">
          <h3 className="text-xl font-bold text-white mb-2">Looking for something specific?</h3>
          <p className="text-gray-400 text-sm mb-5 max-w-lg mx-auto leading-relaxed">
            Chat with us on WhatsApp and we&apos;ll help you find the perfect fit.
          </p>
          <a
            href={`https://wa.me/${BRAND.whatsapp}`}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary px-8 py-3 inline-flex items-center gap-2"
          >
            Chat on WhatsApp
          </a>
        </div>
      )}
    </div>
  );
}

const SECTION_LIMIT = 8;

function ProductGrid({
  products,
  cat,
  isDefaultSort,
}: {
  products: ReturnType<typeof getProducts>;
  cat?: string;
  isDefaultSort: boolean;
}) {
  if (cat || !isDefaultSort) {
    return (
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-4">
        {products.map((p) => <ProductCard key={p.id} product={p} />)}
      </div>
    );
  }

  // Group by gender section
  const menProducts = products.filter(p => (MEN_CATEGORIES as readonly string[]).includes(p.category));
  const womenProducts = products.filter(p => (WOMEN_CATEGORIES as readonly string[]).includes(p.category));
  const otherProducts = products.filter(p => {
    const g = getCategoryGender(p.category);
    return g !== "Men" && g !== "Women";
  });

  const sections = [
    { label: "Men", products: menProducts, href: "/men" },
    { label: "Women", products: womenProducts, href: "/women" },
    { label: "Unisex & Accessories", products: otherProducts, href: "/shop?cat=Streetwear" },
  ].filter(s => s.products.length > 0);

  return (
    <div className="space-y-14">
      {sections.map(({ label, products: items, href }) => (
        <section key={label}>
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-xl font-bold text-white">{label}</h2>
            <Link href={href} className="text-xs text-gray-400 hover:text-white transition-colors">
              View all →
            </Link>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {items.slice(0, SECTION_LIMIT).map((p) => <ProductCard key={p.id} product={p} />)}
          </div>
        </section>
      ))}
    </div>
  );
}

function ProductCard({ product }: { product: ReturnType<typeof getProducts>[0] }) {
  const price = toNum(product.price);
  const originalPrice = product.originalPrice ? toNum(product.originalPrice) : null;
  const onSale = originalPrice && originalPrice > price;

  return (
    <Link
      href={`/shop/${product.slug ?? product.id}`}
      className="bg-[#111111] border border-[#1F1F1F] rounded-xl overflow-hidden card-hover flex flex-col group"
    >
      <div className="relative aspect-[4/5] bg-[#0f0f0f] overflow-hidden">
        {product.imageUrl ? (
          <Image
            src={product.imageUrl}
            alt={product.name}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <Package size={32} color="#2a2a2a" strokeWidth={1} />
          </div>
        )}
        {onSale && (
          <span className="absolute top-2 left-2 badge-sale">SALE</span>
        )}
        {product.newArrival && !onSale && (
          <span className="absolute top-2 left-2 text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-white text-black">NEW</span>
        )}
      </div>
      <div className="p-3 flex flex-col flex-1">
        <p className="text-gray-400 text-[10px] uppercase tracking-wider mb-1">{product.category}</p>
        <p className="font-medium text-white text-sm leading-snug mb-2 flex-1 line-clamp-2">
          {product.name}
        </p>
        <div className="flex items-center gap-2 mb-2">
          <p className="text-white font-bold text-sm">R {price.toLocaleString("en-ZA")}</p>
          {onSale && (
            <p className="text-gray-600 text-xs line-through">R {originalPrice.toLocaleString("en-ZA")}</p>
          )}
        </div>
        <ViewProductButton id={product.id} slug={product.slug} />
      </div>
    </Link>
  );
}
