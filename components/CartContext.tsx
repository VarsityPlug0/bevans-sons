"use client";
import { createContext, useContext, useReducer, useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { X, ShoppingBag, Trash2, Plus, Minus } from "lucide-react";

export interface CartItem {
  id: string;
  variantId: string;
  name: string;
  price: number;
  originalPrice?: number;
  imageUrl: string;
  category: string;
  size: string;
  colour: string;
  sku: string;
  qty: number;
}

type CartAction =
  | { type: "ADD"; item: Omit<CartItem, "qty"> }
  | { type: "REMOVE"; variantId: string }
  | { type: "QTY"; variantId: string; qty: number }
  | { type: "CLEAR" }
  | { type: "LOAD"; items: CartItem[] };

function cartReducer(state: CartItem[], action: CartAction): CartItem[] {
  switch (action.type) {
    case "ADD": {
      const existing = state.find((i) => i.variantId === action.item.variantId);
      if (existing) return state.map((i) => i.variantId === action.item.variantId ? { ...i, qty: i.qty + 1 } : i);
      return [...state, { ...action.item, qty: 1 }];
    }
    case "REMOVE": return state.filter((i) => i.variantId !== action.variantId);
    case "QTY":   return state.map((i) => i.variantId === action.variantId ? { ...i, qty: Math.max(1, action.qty) } : i);
    case "CLEAR": return [];
    case "LOAD":  return action.items;
    default:      return state;
  }
}

interface CartContextValue {
  items: CartItem[];
  count: number;
  total: number;
  add: (item: Omit<CartItem, "qty">) => void;
  remove: (variantId: string) => void;
  setQty: (variantId: string, qty: number) => void;
  clear: () => void;
  openCart: () => void;
}

const CartContext = createContext<CartContextValue>({
  items: [], count: 0, total: 0,
  add: () => {}, remove: () => {}, setQty: () => {}, clear: () => {}, openCart: () => {},
});

export function useCart() { return useContext(CartContext); }

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, dispatch] = useReducer(cartReducer, []);
  const [open, setOpen] = useState(false);
  const [hydrated, setHydrated] = useState(false);
  const pathname = usePathname();

  useEffect(() => { setOpen(false); }, [pathname]);

  useEffect(() => {
    try {
      const stored = localStorage.getItem("bevans_cart");
      if (stored) dispatch({ type: "LOAD", items: JSON.parse(stored) });
    } catch { /* ignore */ }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    localStorage.setItem("bevans_cart", JSON.stringify(items));
  }, [items, hydrated]);

  const count = items.reduce((s, i) => s + i.qty, 0);
  const total = items.reduce((s, i) => s + i.price * i.qty, 0);

  const ctx: CartContextValue = {
    items, count, total,
    add: (item) => {
      dispatch({ type: "ADD", item });
      try {
        const visitorId = localStorage.getItem("bevans_visitor_id") ?? undefined;
        const visitorEmail = localStorage.getItem("bevans_visitor_email") ?? undefined;
        fetch("/api/track/cart", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ visitorId, visitorEmail, productId: item.id, productName: item.name, price: String(item.price), category: item.category }),
        }).catch(() => {});
      } catch { }
    },
    remove: (variantId) => dispatch({ type: "REMOVE", variantId }),
    setQty: (variantId, qty) => dispatch({ type: "QTY", variantId, qty }),
    clear: () => dispatch({ type: "CLEAR" }),
    openCart: () => setOpen(true),
  };

  return (
    <CartContext.Provider value={ctx}>
      {children}

      {/* Backdrop */}
      {open && (
        <div className="fixed inset-0 bg-black/70 z-[60] backdrop-blur-sm" onClick={() => setOpen(false)} />
      )}

      {/* Cart sidebar */}
      <div
        className="fixed top-0 right-0 h-full z-[70] flex flex-col"
        style={{
          width: "min(440px, 100vw)",
          background: "#0f0f0f",
          borderLeft: "1px solid rgba(255,255,255,0.07)",
          transform: open ? "translateX(0)" : "translateX(100%)",
          transition: "transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
          boxShadow: open ? "-20px 0 60px rgba(0,0,0,0.8)" : "none",
        }}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-[#1A1A1A]">
          <div className="flex items-center gap-3">
            <ShoppingBag size={20} color="#fff" />
            <h2 className="text-white font-semibold tracking-wide text-sm uppercase">Your Cart</h2>
            {count > 0 && (
              <span className="text-xs font-bold text-black bg-white rounded-full w-5 h-5 flex items-center justify-center">
                {count}
              </span>
            )}
          </div>
          <button onClick={() => setOpen(false)} className="w-8 h-8 rounded flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/8 transition-colors">
            <X size={18} />
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full gap-4 px-6 text-center">
              <ShoppingBag size={48} color="#2a2a2a" strokeWidth={1} />
              <p className="text-gray-500 text-sm">Your cart is empty.</p>
              <button onClick={() => setOpen(false)} className="btn-outline px-6 py-2.5 text-sm font-semibold">
                Continue Shopping
              </button>
            </div>
          ) : (
            <div className="px-4 py-4 space-y-3">
              {items.map((item) => (
                <div key={item.variantId} className="flex gap-4 bg-[#111111] border border-[#1A1A1A] rounded-xl p-4">
                  {item.imageUrl && (
                    <div className="w-16 h-20 rounded overflow-hidden shrink-0 bg-[#0A0A0A]">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={item.imageUrl} alt={item.name} className="w-full h-full object-cover" />
                    </div>
                  )}
                  <div className="flex-1 min-w-0">
                    <p className="text-white text-sm font-medium leading-snug">{item.name}</p>
                    <p className="text-gray-500 text-xs mt-0.5">{item.colour} · {item.size}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <p className="text-white font-bold text-sm">R {(item.price * item.qty).toLocaleString("en-ZA")}</p>
                      {item.originalPrice && item.originalPrice > item.price && (
                        <p className="text-gray-600 text-xs line-through">R {item.originalPrice.toLocaleString("en-ZA")}</p>
                      )}
                    </div>
                    <div className="flex items-center gap-2 mt-2">
                      <button
                        onClick={() => ctx.setQty(item.variantId, item.qty - 1)}
                        disabled={item.qty <= 1}
                        className="w-6 h-6 rounded border border-[#2a2a2a] flex items-center justify-center text-gray-400 hover:text-white transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                      >
                        <Minus size={11} />
                      </button>
                      <span className="text-white text-xs font-bold w-5 text-center">{item.qty}</span>
                      <button onClick={() => ctx.setQty(item.variantId, item.qty + 1)}
                        className="w-6 h-6 rounded border border-[#2a2a2a] flex items-center justify-center text-gray-400 hover:text-white transition-colors">
                        <Plus size={11} />
                      </button>
                      <button onClick={() => ctx.remove(item.variantId)}
                        className="ml-auto w-6 h-6 rounded flex items-center justify-center text-gray-600 hover:text-red-400 transition-colors">
                        <Trash2 size={11} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="px-4 py-5 border-t border-[#1A1A1A] space-y-3">
            <div className="flex items-center justify-between text-sm mb-1">
              <span className="text-gray-500">Subtotal ({count} item{count !== 1 ? "s" : ""})</span>
              <span className="text-white font-bold">R {total.toLocaleString("en-ZA")}</span>
            </div>
            <Link href="/checkout" onClick={() => setOpen(false)}
              className="btn-primary w-full py-3 text-sm text-center block">
              Checkout
            </Link>
            <button onClick={() => ctx.clear()}
              className="w-full text-center text-xs text-gray-600 hover:text-red-400 transition-colors py-1">
              Clear cart
            </button>
          </div>
        )}
      </div>
    </CartContext.Provider>
  );
}

export function CartButton() {
  const { count, openCart } = useCart();
  return (
    <button
      onClick={openCart}
      className="relative w-9 h-9 flex items-center justify-center rounded text-gray-400 hover:text-white hover:bg-white/6 transition-all"
      aria-label="Shopping cart"
    >
      <ShoppingBag size={19} strokeWidth={1.8} />
      {count > 0 && (
        <span className="absolute -top-1 -right-1 min-w-[18px] min-h-[18px] text-[9px] font-bold text-black bg-white rounded-full flex items-center justify-center leading-none px-1">
          {count}
        </span>
      )}
    </button>
  );
}
