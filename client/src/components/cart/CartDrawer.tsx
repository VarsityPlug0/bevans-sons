'use client'
import Link from 'next/link'
import { X, Trash2, ShoppingBag } from 'lucide-react'
import { useCartStore } from '@/store/cartStore'

export function CartDrawer() {
  const { items, isOpen, closeCart, removeItem, updateQuantity } = useCartStore()

  const subtotal = items.reduce((sum, i) => sum + i.unitPrice * i.quantity, 0)
  const freeShipping = subtotal >= 999

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 bg-black/40 z-50" onClick={closeCart} />
      )}

      <div className={`fixed right-0 top-0 h-full w-full max-w-sm bg-white z-50 flex flex-col transition-transform duration-300 ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-brand-mid">
          <div>
            <p className="text-[10px] font-semibold tracking-[0.2em] uppercase text-brand-gold">Your Cart</p>
            <h2 className="font-bebas text-2xl tracking-wide text-brand-black uppercase">
              {items.length} {items.length === 1 ? 'Item' : 'Items'}
            </h2>
          </div>
          <button onClick={closeCart} className="p-1.5 text-brand-muted hover:text-brand-black transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto px-6 py-5 space-y-5">
          {items.length === 0 && (
            <div className="flex flex-col items-center justify-center h-48 text-brand-muted gap-3">
              <ShoppingBag className="w-10 h-10 opacity-30" />
              <p className="text-sm">Your cart is empty</p>
            </div>
          )}
          {items.map((item) => (
            <div key={item.variantId} className="flex gap-4">
              <div className="w-16 h-16 bg-brand-light flex-shrink-0">
                {item.imageUrl && (
                  <img src={item.imageUrl} alt={item.productName} className="w-full h-full object-cover" />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-brand-black truncate">{item.productName}</p>
                {item.size && <p className="text-[11px] text-brand-muted tracking-wide">Size {item.size}</p>}
                <div className="flex items-center justify-between mt-2">
                  <div className="flex items-center border border-brand-mid">
                    <button
                      onClick={() => updateQuantity(item.variantId, item.quantity - 1)}
                      className="w-7 h-7 flex items-center justify-center text-brand-muted hover:text-brand-black text-sm transition-colors"
                    >
                      -
                    </button>
                    <span className="text-sm font-medium w-6 text-center">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.variantId, item.quantity + 1)}
                      className="w-7 h-7 flex items-center justify-center text-brand-muted hover:text-brand-black text-sm transition-colors"
                    >
                      +
                    </button>
                  </div>
                  <span className="font-bebas text-lg text-brand-black">R{(item.unitPrice * item.quantity).toFixed(2)}</span>
                </div>
              </div>
              <button onClick={() => removeItem(item.variantId)} className="text-brand-muted hover:text-red-500 flex-shrink-0 transition-colors">
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="border-t border-brand-mid px-6 py-5">
            {freeShipping ? (
              <p className="text-[10px] font-bold tracking-[0.15em] uppercase text-green-600 mb-3">Free Delivery Applied</p>
            ) : (
              <p className="text-[10px] text-brand-muted mb-3">
                Add R{(999 - subtotal).toFixed(2)} more for free delivery
              </p>
            )}
            <div className="flex justify-between items-baseline mb-4">
              <span className="text-[11px] font-bold tracking-[0.15em] uppercase text-brand-muted">Subtotal</span>
              <span className="font-bebas text-2xl text-brand-black">R{subtotal.toFixed(2)}</span>
            </div>
            <Link
              href="/checkout"
              onClick={closeCart}
              className="block w-full bg-brand-black text-white text-center py-3.5 text-[11px] font-bold tracking-[0.18em] uppercase hover:bg-brand-dark transition-colors"
            >
              Checkout
            </Link>
            <button
              onClick={closeCart}
              className="block w-full text-center mt-3 text-[11px] font-semibold tracking-[0.15em] uppercase text-brand-muted hover:text-brand-black transition-colors"
            >
              Continue Shopping
            </button>
          </div>
        )}
      </div>
    </>
  )
}
