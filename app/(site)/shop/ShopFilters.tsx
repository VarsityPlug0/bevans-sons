"use client";

import { useState, useRef, useCallback } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { CATEGORIES, MEN_CATEGORIES, WOMEN_CATEGORIES, UNISEX_CATEGORIES, ACCESSORIES_CATEGORIES } from "@/lib/categories";
import {
  Search, X, LayoutGrid, ChevronDown,
  Shirt, Sparkles, Users, ShoppingBag, Tag,
} from "lucide-react";

const CAT_ICON: Record<string, { icon: React.ElementType; color: string }> = {
  "Men's T-Shirts":    { icon: Shirt,       color: "#3B82F6" },
  "Men's Hoodies":     { icon: Shirt,       color: "#6366F1" },
  "Men's Shirts":      { icon: Shirt,       color: "#0EA5E9" },
  "Men's Jackets":     { icon: Shirt,       color: "#1D4ED8" },
  "Men's Pants":       { icon: Shirt,       color: "#2563EB" },
  "Men's Shorts":      { icon: Shirt,       color: "#60A5FA" },
  "Women's Tops":      { icon: Sparkles,    color: "#EC4899" },
  "Women's Dresses":   { icon: Sparkles,    color: "#F43F5E" },
  "Women's Hoodies":   { icon: Sparkles,    color: "#DB2777" },
  "Women's Jackets":   { icon: Sparkles,    color: "#BE185D" },
  "Women's Pants":     { icon: Sparkles,    color: "#F9A8D4" },
  "Women's Shorts":    { icon: Sparkles,    color: "#FBCFE8" },
  "Unisex T-Shirts":   { icon: Users,       color: "#8B5CF6" },
  "Unisex Hoodies":    { icon: Users,       color: "#7C3AED" },
  "Streetwear":        { icon: ShoppingBag, color: "#F97316" },
  "Caps":              { icon: Tag,         color: "#D97706" },
  "Bags":              { icon: ShoppingBag, color: "#92400E" },
  "Sneakers":          { icon: Tag,         color: "#065F46" },
  "Accessories":       { icon: Tag,         color: "#6B7280" },
};

const GENDER_TABS = [
  { id: "all",   label: "All",         icon: LayoutGrid },
  { id: "men",   label: "Men",         icon: Shirt },
  { id: "women", label: "Women",       icon: Sparkles },
  { id: "unisex",label: "Unisex",      icon: Users },
  { id: "acc",   label: "Accessories", icon: Tag },
];

const GENDER_CATS: Record<string, readonly string[]> = {
  all: CATEGORIES,
  men: MEN_CATEGORIES,
  women: WOMEN_CATEGORIES,
  unisex: UNISEX_CATEGORIES,
  acc: ACCESSORIES_CATEGORIES,
};

const SORT_OPTIONS = [
  { value: "featured", label: "Featured" },
  { value: "price_asc", label: "Price: Low → High" },
  { value: "price_desc", label: "Price: High → Low" },
  { value: "newest", label: "Newest" },
];

const PRICE_RANGES = [
  { value: "", label: "All prices" },
  { value: "under500",  label: "< R500" },
  { value: "500to1000", label: "R500–R1k" },
  { value: "1000to2000",label: "R1k–R2k" },
  { value: "over2000",  label: "R2k+" },
];

export default function ShopFilters({ total }: { total: number }) {
  const router = useRouter();
  const params = useSearchParams();
  const cat   = params.get("cat")   ?? "";
  const q     = params.get("q")     ?? "";
  const sort  = params.get("sort")  ?? "featured";
  const price = params.get("price") ?? "";

  const [searchVal, setSearchVal] = useState(q);
  const [gender, setGender] = useState<string>(() => {
    if (!cat) return "all";
    if ((MEN_CATEGORIES as readonly string[]).includes(cat)) return "men";
    if ((WOMEN_CATEGORIES as readonly string[]).includes(cat)) return "women";
    if ((UNISEX_CATEGORIES as readonly string[]).includes(cat)) return "unisex";
    if ((ACCESSORIES_CATEGORIES as readonly string[]).includes(cat)) return "acc";
    return "all";
  });

  const debounceRef = useRef<ReturnType<typeof setTimeout>>(undefined);
  const scrollRef   = useRef<HTMLDivElement>(null);

  const push = useCallback(
    (next: { cat?: string; q?: string; sort?: string; price?: string }) => {
      const sp       = new URLSearchParams();
      const newCat   = next.cat   !== undefined ? next.cat   : cat;
      const newQ     = next.q     !== undefined ? next.q     : q;
      const newSort  = next.sort  !== undefined ? next.sort  : sort;
      const newPrice = next.price !== undefined ? next.price : price;
      if (newCat)                            sp.set("cat",   newCat);
      if (newQ)                              sp.set("q",     newQ);
      if (newSort && newSort !== "featured") sp.set("sort",  newSort);
      if (newPrice)                          sp.set("price", newPrice);
      router.push(`/shop${sp.toString() ? `?${sp}` : ""}`);
    },
    [router, cat, q, sort, price],
  );

  function handleSearch(val: string) {
    setSearchVal(val);
    clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => push({ q: val }), 400);
  }

  function handleGenderChange(g: string) {
    setGender(g);
    const cats = GENDER_CATS[g];
    // If current cat is not in the new gender group, clear it
    if (cat && !(cats as readonly string[]).includes(cat)) {
      push({ cat: "" });
    }
  }

  const visibleCats = [
    { id: "", label: "All", icon: LayoutGrid, color: "#fff" },
    ...GENDER_CATS[gender].map(c => ({
      id: c, label: c,
      icon: CAT_ICON[c]?.icon ?? LayoutGrid,
      color: CAT_ICON[c]?.color ?? "#6B7280",
    })),
  ];

  return (
    <div className="mb-6 space-y-4">
      {/* Gender tabs */}
      <div className="flex gap-1 p-1 bg-[#111111] border border-[#1F1F1F] rounded-lg overflow-x-auto no-scrollbar">
        {GENDER_TABS.map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            type="button"
            onClick={() => handleGenderChange(id)}
            className={`flex-1 min-w-[90px] flex items-center justify-center gap-1.5 py-2.5 px-3 rounded text-xs font-semibold uppercase tracking-wide transition-all ${
              gender === id
                ? "bg-white text-black shadow"
                : "text-gray-400 hover:text-white hover:bg-white/5"
            }`}
          >
            <Icon size={13} />
            {label}
          </button>
        ))}
      </div>

      {/* Search + sort */}
      <div className="flex gap-2">
        <div className="relative flex-1">
          <Search size={14} color="#6B7280" className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            inputMode="search"
            placeholder="Search clothing, hoodies, jackets…"
            value={searchVal}
            onChange={e => handleSearch(e.target.value)}
            className="w-full bg-[#111111] border border-[#1F1F1F] rounded-lg pl-9 pr-8 py-2.5 text-white text-sm placeholder-gray-600 transition-colors"
          />
          {searchVal && (
            <button
              onClick={() => { setSearchVal(""); push({ q: "" }); }}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white transition-colors"
            >
              <X size={13} />
            </button>
          )}
        </div>

        <div className="relative">
          <select
            value={sort}
            onChange={e => push({ sort: e.target.value })}
            className="appearance-none bg-[#111111] border border-[#1F1F1F] rounded-lg pl-3 pr-8 py-2.5 text-sm text-gray-300 cursor-pointer"
          >
            {SORT_OPTIONS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
          </select>
          <ChevronDown size={13} color="#6B7280" className="absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
        </div>
      </div>

      {/* Price ranges + count */}
      <div className="flex items-center gap-2 flex-wrap">
        {PRICE_RANGES.map(r => (
          <button
            key={r.value}
            onClick={() => push({ price: r.value })}
            className={`px-3 py-1.5 rounded text-xs font-medium transition-all ${
              price === r.value
                ? "bg-white text-black"
                : "bg-[#111111] border border-[#1F1F1F] text-gray-400 hover:border-white/20 hover:text-gray-200"
            }`}
          >
            {r.label}
          </button>
        ))}
        <span className="ml-auto text-xs text-gray-600 shrink-0">
          {total} item{total !== 1 ? "s" : ""}
        </span>
      </div>

      {/* Category strip */}
      <div
        ref={scrollRef}
        className="no-scrollbar flex gap-2 overflow-x-auto py-1"
        style={{ WebkitOverflowScrolling: "touch" }}
      >
        {visibleCats.map(({ id, label, icon: Icon, color }) => {
          const active = id === "" ? !cat : cat === id;
          return (
            <button
              key={id}
              onClick={() => push({ cat: id === "" ? "" : cat === id ? "" : id })}
              className={`flex items-center gap-1.5 shrink-0 rounded px-3 py-1.5 text-xs font-medium transition-all ${
                active
                  ? "bg-white text-black"
                  : "bg-[#111111] border border-[#1F1F1F] text-gray-400 hover:text-white hover:border-white/20"
              }`}
            >
              <Icon size={12} color={active ? "#000" : color} />
              {label}
            </button>
          );
        })}
      </div>

      {/* Active filter chips */}
      {(cat || price || (sort && sort !== "featured") || q) && (
        <div className="flex items-center gap-2 flex-wrap pt-1">
          {cat && (
            <span className="inline-flex items-center gap-1 text-xs px-2.5 py-1 rounded-full bg-white/10 text-white border border-white/20">
              {cat}
              <button onClick={() => push({ cat: "" })}><X size={9} /></button>
            </span>
          )}
          {price && (
            <span className="inline-flex items-center gap-1 text-xs px-2.5 py-1 rounded-full bg-white/10 text-white border border-white/20">
              {PRICE_RANGES.find(r => r.value === price)?.label}
              <button onClick={() => push({ price: "" })}><X size={9} /></button>
            </span>
          )}
          {sort !== "featured" && (
            <span className="inline-flex items-center gap-1 text-xs px-2.5 py-1 rounded-full bg-white/5 text-gray-400 border border-white/10">
              {SORT_OPTIONS.find(o => o.value === sort)?.label}
              <button onClick={() => push({ sort: "featured" })}><X size={9} /></button>
            </span>
          )}
          <button
            onClick={() => { setSearchVal(""); push({ cat: "", q: "", sort: "featured", price: "" }); }}
            className="text-xs text-gray-600 hover:text-gray-400 transition-colors ml-1"
          >
            Clear all
          </button>
        </div>
      )}
    </div>
  );
}
