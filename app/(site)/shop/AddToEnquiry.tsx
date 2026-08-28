"use client";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

interface Props {
  id: string;
  slug?: string;
}

export default function ViewProductButton({ id, slug }: Props) {
  return (
    <Link
      href={`/shop/${slug ?? id}`}
      className="w-full py-2.5 text-xs font-semibold text-center border border-[#2a2a2a] rounded flex items-center justify-center gap-1.5 text-gray-400 hover:text-white hover:border-white/30 transition-all duration-200"
      onClick={(e) => e.stopPropagation()}
    >
      Select Options <ArrowRight size={11} />
    </Link>
  );
}
