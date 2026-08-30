import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export interface WishlistItem {
  productId: string
  productName: string
  slug: string
  imageUrl: string | null
  price: number
  brand?: string
}

interface WishlistState {
  items: WishlistItem[]
  addItem: (item: WishlistItem) => void
  removeItem: (productId: string) => void
  toggle: (item: WishlistItem) => void
  isWishlisted: (productId: string) => boolean
  clear: () => void
}

export const useWishlistStore = create<WishlistState>()(
  persist(
    (set, get) => ({
      items: [],
      addItem: (item) => set((s) => ({
        items: s.items.some(i => i.productId === item.productId)
          ? s.items
          : [...s.items, item],
      })),
      removeItem: (productId) => set((s) => ({
        items: s.items.filter(i => i.productId !== productId),
      })),
      toggle: (item) => {
        const exists = get().items.some(i => i.productId === item.productId)
        if (exists) get().removeItem(item.productId)
        else get().addItem(item)
      },
      isWishlisted: (productId) => get().items.some(i => i.productId === productId),
      clear: () => set({ items: [] }),
    }),
    { name: 'wishlist' }
  )
)
