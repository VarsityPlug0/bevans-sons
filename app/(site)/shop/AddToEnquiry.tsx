"use client";
import { useCart } from "@/components/CartContext";
import { ShoppingCart, Check } from "lucide-react";
import { useState } from "react";

interface Props {
  id: string;
  name: string;
  price: string;
  originalPrice?: string;
  imageUrl: string | undefined;
  category: string;
}

export default function AddToEnquiry({ id, name, price, originalPrice, imageUrl, category }: Props) {
  const { add, openCart } = useCart();
  const [added, setAdded] = useState(false);

  function handleAdd(e: React.MouseEvent) {
    e.preventDefault();
    e.stopPropagation();
    add({ id, name, price, originalPrice, imageUrl: imageUrl ?? "", category });
    setAdded(true);
    openCart();
    setTimeout(() => setAdded(false), 2000);
  }

  return (
    <button
      onClick={handleAdd}
      className="w-full py-2.5 rounded-xl text-xs font-semibold text-center border transition-all duration-200 flex items-center justify-center gap-1.5"
      style={{
        borderColor: added ? "#D4AF37" : "#2a2a2a",
        color: added ? "#D4AF37" : "#9CA3AF",
        background: added ? "rgba(212,175,55,0.05)" : "transparent",
      }}
    >
      {added ? <Check size={12} /> : <ShoppingCart size={12} />}
      {added ? "Added to Cart" : "Add to Cart"}
    </button>
  );
}
