"use client";
import { useCart } from "@/components/CartContext";
import { useRouter } from "next/navigation";
import { ShoppingCart } from "lucide-react";

interface Props {
  product: { id: string; name: string; price: string; imageUrl: string; category: string };
}

export default function BuyNowButton({ product }: Props) {
  const { add } = useCart();
  const router = useRouter();

  function handleBuyNow() {
    add(product);
    router.push("/checkout");
  }

  return (
    <div className="flex gap-3 w-full">
      <button
        onClick={handleBuyNow}
        className="btn-gold flex-1 py-4 rounded-xl font-bold text-base flex items-center justify-center gap-2.5"
      >
        Buy Now — Pay via EFT
      </button>
      <button
        onClick={() => add(product)}
        className="w-14 h-14 rounded-xl border border-[#2a2a2a] flex items-center justify-center text-gray-400 hover:text-white hover:border-[#D4AF37]/50 transition-colors shrink-0"
        title="Add to Enquiry"
      >
        <ShoppingCart size={20} />
      </button>
    </div>
  );
}
