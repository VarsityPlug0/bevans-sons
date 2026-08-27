"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useRef, useState } from "react";
import { CATEGORIES } from "@/lib/categories";
import {
  Search, X, LayoutGrid, ChevronDown,
  Smartphone, Tv, Gamepad2, Monitor, Tablet, Sofa,
  WashingMachine, ChefHat, Zap, Car, Printer, Laptop,
} from "lucide-react";

const CAT_META: Record<string, { icon: React.ElementType; color: string }> = {
  "Smartphones":             { icon: Smartphone,     color: "#3B82F6" },
  "TVs":                     { icon: Tv,             color: "#8B5CF6" },
  "Gaming Consoles":         { icon: Gamepad2,       color: "#EF4444" },
  "Gaming PCs":              { icon: Monitor,        color: "#F59E0B" },
  "Tablets & Watches":       { icon: Tablet,         color: "#06B6D4" },
  "Laptops & MacBooks":      { icon: Laptop,         color: "#10B981" },
  "Furniture":               { icon: Sofa,           color: "#A78BFA" },
  "Home Appliances":         { icon: WashingMachine, color: "#60A5FA" },
  "Solar & Power Solutions": { icon: Zap,            color: "#D4AF37" },
  "Electric Ride-On Cars":   { icon: Car,            color: "#F97316" },
  "Kitchen Appliances":      { icon: ChefHat,        color: "#EC4899" },
  "Office Equipment":        { icon: Printer,        color: "#6B7280" },
};

const ALL_CATS = [
  { id: "", label: "All", icon: LayoutGrid, color: "#D4AF37" },
  ...CATEGORIES.map(c => ({
    id: c,
    label: c,
    icon: CAT_META[c]?.icon ?? LayoutGrid,
    color: CAT_META[c]?.color ?? "#6B7280",
  })),
];

const SORT_OPTIONS = [
  { value: "featured", label: "Featured" },
  { value: "price_asc", label: "Price: Low → High" },
  { value: "price_desc", label: "Price: High → Low" },
  { value: "newest", label: "Newest" },
];

const PRICE_RANGES = [
  { value: "", label: "All prices" },
  { value: "under5", label: "< R5k" },
  { value: "5to15", label: "R5k–R15k" },
  { value: "15to30", label: "R15k–R30k" },
  { value: "over30", label: "R30k+" },
];

export default function ShopFilters({ total }: { total: number }) {
  const router = useRouter();
  const params = useSearchParams();
  const cat   = params.get("cat")   ?? "";
  const q     = params.get("q")     ?? "";
  const sort  = params.get("sort")  ?? "featured";
  const price = params.get("price") ?? "";

  const [searchVal, setSearchVal] = useState(q);
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

  function scrollBy(dir: number) {
    scrollRef.current?.scrollBy({ left: dir * 200, behavior: "smooth" });
  }

  const hasFilters = !!(cat || q || sort !== "featured" || price);

  return (
    <div className="mb-6 space-y-3">

      {/* Search + sort */}
      <div className="flex gap-2">
        <div className="relative flex-1">
          <Search size={14} color="#6B7280" className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            inputMode="search"
            placeholder="Search products…"
            value={searchVal}
            onChange={e => handleSearch(e.target.value)}
            className="w-full bg-[#111111] border border-[#1F1F1F] rounded-xl pl-9 pr-8 py-2.5 text-white text-sm placeholder-gray-600 focus:outline-none focus:border-[#D4AF37]/50 transition-colors"
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
            className="appearance-none bg-[#111111] border border-[#1F1F1F] rounded-xl pl-3 pr-8 py-2.5 text-sm text-gray-300 focus:outline-none focus:border-[#D4AF37]/50 transition-colors cursor-pointer"
          >
            {SORT_OPTIONS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
          </select>
          <ChevronDown size={13} color="#6B7280" className="absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
        </div>
      </div>

      {/* Price range + count */}
      <div className="flex items-center gap-2 flex-wrap">
        {PRICE_RANGES.map(r => (
          <button
            key={r.value}
            onClick={() => push({ price: r.value })}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
              price === r.value
                ? "bg-[#D4AF37]/15 text-[#D4AF37] border border-[#D4AF37]/40"
                : "bg-[#111111] border border-[#1F1F1F] text-gray-400 hover:border-[#D4AF37]/30 hover:text-gray-200"
            }`}
          >
            {r.label}
          </button>
        ))}
        <span className="ml-auto text-xs text-gray-600 shrink-0">
          {total} product{total !== 1 ? "s" : ""}
        </span>
      </div>

      {/* Category strip */}
      <div className="relative">
        <button
          onClick={() => scrollBy(-1)}
          aria-label="Scroll left"
          className="hidden md:flex absolute left-0 top-0 bottom-0 z-10 items-center pr-4 pl-1"
          style={{ background: "linear-gradient(to right, #0A0A0A 55%, transparent)" }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#D4AF37" strokeWidth="2.5"><path d="M15 18l-6-6 6-6"/></svg>
        </button>

        <div
          ref={scrollRef}
          className="no-scrollbar flex gap-2 overflow-x-auto py-1 px-0.5 md:px-8"
          style={{ WebkitOverflowScrolling: "touch", scrollSnapType: "x proximity" }}
        >
          {ALL_CATS.map(({ id, label, icon: Icon, color }) => {
            const active = id === "" ? !cat : cat === id;
            return (
              <button
                key={id}
                onClick={() => push({ cat: id === "" ? "" : cat === id ? "" : id })}
                style={{ scrollSnapAlign: "start" }}
                className="flex flex-col items-center gap-1.5 shrink-0 rounded-xl px-3 py-2 transition-all duration-200 active:scale-95"
              >
                <div
                  className="w-9 h-9 rounded-xl flex items-center justify-center transition-all duration-200"
                  style={{
                    background: active ? `${color}22` : "#171717",
                    border: active ? `1.5px solid ${color}55` : "1.5px solid #222",
                    boxShadow: active ? `0 0 12px ${color}22` : "none",
                  }}
                >
                  <Icon size={16} color={active ? color : "#555"} strokeWidth={active ? 2 : 1.8} />
                </div>
                <span
                  className="text-center leading-tight"
                  style={{
                    fontSize: 9,
                    fontFamily: "var(--font-outfit)",
                    fontWeight: active ? 700 : 500,
                    color: active ? color : "#6B7280",
                    maxWidth: 60,
                    wordBreak: "break-word",
                    hyphens: "auto",
                  }}
                >
                  {label}
                </span>
              </button>
            );
          })}
        </div>

        <div
          className="md:hidden absolute right-0 top-0 bottom-0 w-8 pointer-events-none"
          style={{ background: "linear-gradient(to left, #0A0A0A 20%, transparent)" }}
        />

        <button
          onClick={() => scrollBy(1)}
          aria-label="Scroll right"
          className="hidden md:flex absolute right-0 top-0 bottom-0 z-10 items-center pl-4 pr-1"
          style={{ background: "linear-gradient(to left, #0A0A0A 55%, transparent)" }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#D4AF37" strokeWidth="2.5"><path d="M9 18l6-6-6-6"/></svg>
        </button>
      </div>

      {/* Active filter chips */}
      {hasFilters && (
        <div className="flex items-center gap-2 flex-wrap">
          {cat && (
            <span
              className="inline-flex items-center gap-1 text-xs px-2.5 py-1 rounded-full"
              style={{
                background: `${CAT_META[cat]?.color ?? "#D4AF37"}15`,
                color: CAT_META[cat]?.color ?? "#D4AF37",
                border: `1px solid ${CAT_META[cat]?.color ?? "#D4AF37"}30`,
              }}
            >
              {cat}
              <button onClick={() => push({ cat: "" })}><X size={9} /></button>
            </span>
          )}
          {price && (
            <span className="inline-flex items-center gap-1 text-xs px-2.5 py-1 rounded-full bg-[#D4AF37]/10 text-[#D4AF37] border border-[#D4AF37]/25">
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
