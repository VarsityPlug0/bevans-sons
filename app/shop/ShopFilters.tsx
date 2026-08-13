"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useRef, useState } from "react";
import { CATEGORIES } from "@/lib/categories";
import { Search, X } from "lucide-react";

export default function ShopFilters() {
  const router = useRouter();
  const params = useSearchParams();
  const cat = params.get("cat") ?? "";
  const q = params.get("q") ?? "";
  const [searchVal, setSearchVal] = useState(q);
  const debounceRef = useRef<ReturnType<typeof setTimeout>>(undefined);

  const push = useCallback(
    (next: { cat?: string; q?: string }) => {
      const sp = new URLSearchParams();
      const newCat = next.cat !== undefined ? next.cat : cat;
      const newQ = next.q !== undefined ? next.q : q;
      if (newCat) sp.set("cat", newCat);
      if (newQ) sp.set("q", newQ);
      router.push(`/shop${sp.toString() ? `?${sp}` : ""}`);
    },
    [router, cat, q]
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

  return (
    <div className="space-y-5 mb-12">
      {/* Search */}
      <div className="relative max-w-md">
        <Search size={16} color="#6B7280" className="absolute left-4 top-1/2 -translate-y-1/2" />
        <input
          type="text"
          placeholder="Search products…"
          value={searchVal}
          onChange={(e) => handleSearch(e.target.value)}
          className="w-full bg-[#111111] border border-[#1F1F1F] rounded-xl pl-10 pr-4 py-3 text-white text-sm placeholder-gray-600 focus:outline-none focus:border-[#D4AF37]/50"
        />
        {searchVal && (
          <button onClick={clearSearch}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white">
            <X size={14} />
          </button>
        )}
      </div>

      {/* Category pills */}
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => push({ cat: "" })}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${!cat ? "btn-gold" : "border border-[#2a2a2a] text-gray-400 hover:border-[#D4AF37]/50 hover:text-white"}`}
        >
          All
        </button>
        {CATEGORIES.map((c) => (
          <button
            key={c}
            onClick={() => push({ cat: cat === c ? "" : c })}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${cat === c ? "btn-gold" : "border border-[#2a2a2a] text-gray-400 hover:border-[#D4AF37]/50 hover:text-white"}`}
          >
            {c}
          </button>
        ))}
      </div>
    </div>
  );
}
