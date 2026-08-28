"use client";
import { Heart } from "lucide-react";

export default function WishlistButton({ size = 14 }: { size?: number }) {
  return (
    <button
      aria-label="Add to wishlist"
      onClick={(e) => { e.preventDefault(); e.stopPropagation(); }}
      className="w-8 h-8 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-black/70"
    >
      <Heart size={size} className="text-white" strokeWidth={1.8} />
    </button>
  );
}
