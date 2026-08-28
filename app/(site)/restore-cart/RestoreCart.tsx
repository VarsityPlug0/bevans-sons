"use client";
import { useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { useCart } from "@/components/CartContext";

export default function RestoreCart() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { add, setQty } = useCart();

  useEffect(() => {
    const encoded = searchParams.get("items");
    if (!encoded) { router.replace("/shop"); return; }

    try {
      const items = JSON.parse(atob(encoded)) as {
        id: string; name: string; price: string | number;
        qty: number; imageUrl?: string; category?: string;
        variantId?: string; size?: string; colour?: string; sku?: string;
      }[];

      for (const item of items) {
        const variantId = item.variantId ?? item.id;
        const price = typeof item.price === "number" ? item.price : parseFloat(String(item.price).replace(/[^0-9.]/g, "")) || 0;
        add({
          id: item.id,
          variantId,
          name: item.name,
          price,
          imageUrl: item.imageUrl ?? "",
          category: item.category ?? "",
          size: item.size ?? "",
          colour: item.colour ?? "",
          sku: item.sku ?? "",
        });
        if (item.qty > 1) {
          setQty(variantId, item.qty);
        }
      }
    } catch {
      // malformed — just go to shop
      router.replace("/shop");
      return;
    }

    router.replace("/checkout");
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <div className="w-10 h-10 border-2 border-[#D4AF37] border-t-transparent rounded-full animate-spin mx-auto mb-4" />
        <p className="text-gray-400 text-sm">Restoring your cart…</p>
      </div>
    </div>
  );
}
