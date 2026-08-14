"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useRef, useState } from "react";
import { CATEGORIES } from "@/lib/categories";
import {
  Search, X, LayoutGrid,
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

export default function ShopFilters() {
  const router = useRouter();
  const params = useSearchParams();
  const cat = params.get("cat") ?? "";
  const q   = params.get("q")   ?? "";
  const [searchVal, setSearchVal] = useState(q);
  const debounceRef = useRef<ReturnType<typeof setTimeout>>(undefined);
  const scrollRef   = useRef<HTMLDivElement>(null);

  const push = useCallback(
    (next: { cat?: string; q?: string }) => {
      const sp     = new URLSearchParams();
      const newCat = next.cat !== undefined ? next.cat : cat;
      const newQ   = next.q   !== undefined ? next.q   : q;
      if (newCat) sp.set("cat", newCat);
      if (newQ)   sp.set("q",   newQ);
      router.push(`/shop${sp.toString() ? `?${sp}` : ""}`);
    },
    [router, cat, q],
  );

  function handleSearch(val: string) {
    setSearchVal(val);
    clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => push({ q: val }), 400);
  }

  function clearSearch() {
    setSearchVal("");
    clearTimeout(debounceRef.current);
    push({ q: "" });
  }

  function scrollBy(dir: number) {
    scrollRef.current?.scrollBy({ left: dir * 200, behavior: "smooth" });
  }

  return (
    <div className="mb-10 space-y-4">

      {/* ── Search ────────────────────────────────────────────── */}
      <div className="relative w-full">
        <Search size={15} color="#6B7280" className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
        <input
          type="text"
          inputMode="search"
          placeholder="Search products…"
          value={searchVal}
          onChange={e => handleSearch(e.target.value)}
          className="w-full bg-[#111111] border border-[#1F1F1F] rounded-xl pl-10 pr-10 py-3 text-white text-sm placeholder-gray-600 focus:outline-none focus:border-[#D4AF37]/50 transition-colors"
        />
        {searchVal && (
          <button
            onClick={clearSearch}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white transition-colors p-1"
          >
            <X size={14} />
          </button>
        )}
      </div>

      {/* ── Category strip ────────────────────────────────────── */}
      <div className="relative">

        {/* Desktop scroll arrows */}
        <button
          onClick={() => scrollBy(-1)}
          aria-label="Scroll left"
          className="hidden md:flex absolute left-0 top-0 bottom-0 z-10 items-center pr-4 pl-1"
          style={{ background: "linear-gradient(to right, #0A0A0A 55%, transparent)" }}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#D4AF37" strokeWidth="2.5"><path d="M15 18l-6-6 6-6"/></svg>
        </button>

        {/* Scrollable row */}
        <div
          ref={scrollRef}
          className="no-scrollbar flex gap-2.5 overflow-x-auto py-1 px-0.5 md:px-8"
          style={{ WebkitOverflowScrolling: "touch", scrollSnapType: "x proximity" }}
        >

          {ALL_CATS.map(({ id, label, icon: Icon, color }) => {
            const active = id === "" ? !cat : cat === id;
            return (
              <button
                key={id}
                onClick={() => push({ cat: id === "" ? "" : cat === id ? "" : id })}
                style={{ scrollSnapAlign: "start" }}
                className={`
                  flex flex-col items-center gap-1.5 shrink-0 rounded-xl
                  px-3 py-2.5 sm:px-4 sm:py-3
                  transition-all duration-200 active:scale-95
                  ${active ? "shadow-lg" : ""}
                `}
              >
                {/* Icon circle */}
                <div
                  className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl flex items-center justify-center transition-all duration-200"
                  style={{
                    background: active ? `${color}22` : "#171717",
                    border: active ? `1.5px solid ${color}55` : "1.5px solid #222",
                    boxShadow: active ? `0 0 14px ${color}25` : "none",
                  }}
                >
                  <Icon
                    size={18}
                    color={active ? color : "#555"}
                    strokeWidth={active ? 2 : 1.8}
                    style={{ transition: "color 0.2s" }}
                  />
                </div>

                {/* Label */}
                <span
                  className="text-center leading-tight"
                  style={{
                    fontSize: 9,
                    fontFamily: "var(--font-outfit)",
                    fontWeight: active ? 700 : 500,
                    color: active ? color : "#6B7280",
                    maxWidth: 68,
                    wordBreak: "break-word",
                    hyphens: "auto",
                    transition: "color 0.2s",
                  }}
                >
                  {label}
                </span>
              </button>
            );
          })}
        </div>

        {/* Fade — right edge (mobile only) */}
        <div
          className="md:hidden absolute right-0 top-0 bottom-0 w-10 pointer-events-none"
          style={{ background: "linear-gradient(to left, #0A0A0A 20%, transparent)" }}
        />

        {/* Desktop scroll arrow right */}
        <button
          onClick={() => scrollBy(1)}
          aria-label="Scroll right"
          className="hidden md:flex absolute right-0 top-0 bottom-0 z-10 items-center pl-4 pr-1"
          style={{ background: "linear-gradient(to left, #0A0A0A 55%, transparent)" }}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#D4AF37" strokeWidth="2.5"><path d="M9 18l6-6-6-6"/></svg>
        </button>
      </div>

      {/* ── Active filter chip ───────────────────────────────── */}
      {cat && (
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-xs text-gray-600">Showing:</span>
          <span
            className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1 rounded-full"
            style={{
              background: `${CAT_META[cat]?.color ?? "#D4AF37"}15`,
              color: CAT_META[cat]?.color ?? "#D4AF37",
              border: `1px solid ${CAT_META[cat]?.color ?? "#D4AF37"}35`,
            }}
          >
            {cat}
            <button
              onClick={() => push({ cat: "" })}
              className="hover:opacity-70 transition-opacity"
              aria-label="Clear filter"
            >
              <X size={10} />
            </button>
          </span>
          <button
            onClick={() => push({ cat: "", q: "" })}
            className="text-xs text-gray-600 hover:text-gray-400 transition-colors"
          >
            Clear all
          </button>
        </div>
      )}
    </div>
  );
}
