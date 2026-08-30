'use client'
import Link from 'next/link'
import { ShoppingBag, User, Search, Menu, LogOut, Heart } from 'lucide-react'
import { useWishlistStore } from '@/store/wishlistStore'
import { useCartStore } from '@/store/cartStore'
import { useAuthStore } from '@/store/authStore'
import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { useQuery } from '@tanstack/react-query'
import { api } from '@/lib/api'

export function Navbar() {
  const router = useRouter()

  const { data: navCategories = [] } = useQuery({
    queryKey: ['nav-categories'],
    queryFn: () => api.get<any[]>('/api/categories?nav=true'),
    staleTime: 60_000,
  })
  const { totalItems, openCart } = useCartStore()
  const wishlistCount = useWishlistStore(s => s.items.length)
  const { customer, logout } = useAuthStore()
  const count = totalItems()
  const [mounted, setMounted] = useState(false)
  const [userMenuOpen, setUserMenuOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)

  useEffect(() => setMounted(true), [])

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setUserMenuOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  function handleLogout() {
    logout()
    setUserMenuOpen(false)
    router.push('/')
  }

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-brand-mid">
      <nav className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between gap-8">
        {/* Mobile menu */}
        <button className="md:hidden p-2 text-brand-black">
          <Menu className="w-5 h-5" />
        </button>

        {/* Logo */}
        <Link href="/" className="font-bebas text-2xl tracking-[0.12em] text-brand-black flex-shrink-0 uppercase">
          Bevans Sons
        </Link>

        {/* Nav Links — driven by Admin → Categories */}
        <div className="hidden md:flex items-center gap-8 text-[11px] font-semibold tracking-[0.12em] uppercase">
          <Link href="/products?sort=newest" className="text-brand-black hover:text-brand-gold transition-colors">New Arrivals</Link>
          {navCategories.map((cat: any) => (
            <Link
              key={cat.id}
              href={`/categories/${cat.slug}`}
              className="text-brand-black hover:text-brand-gold transition-colors"
            >
              {cat.name}
            </Link>
          ))}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-1">
          <Link href="/products?search=" className="p-2.5 text-brand-black hover:text-brand-gold transition-colors">
            <Search className="w-[18px] h-[18px]" />
          </Link>

          {/* Wishlist */}
          <Link href="/wishlist" className="relative p-2.5 text-brand-black hover:text-brand-gold transition-colors">
            <Heart className="w-[18px] h-[18px]" />
            {mounted && wishlistCount > 0 && (
              <span className="absolute top-1 right-1 w-4 h-4 bg-brand-gold text-brand-black text-[10px] font-bold rounded-full flex items-center justify-center">
                {wishlistCount > 9 ? '9+' : wishlistCount}
              </span>
            )}
          </Link>

          {/* User menu */}
          {mounted && customer ? (
            <div className="relative" ref={menuRef}>
              <button
                onClick={() => setUserMenuOpen(o => !o)}
                className="flex items-center gap-1.5 p-2.5 text-brand-black hover:text-brand-gold transition-colors"
              >
                <User className="w-[18px] h-[18px]" />
                <span className="hidden md:block text-[11px] font-semibold tracking-[0.1em] uppercase max-w-[80px] truncate">
                  {customer.firstName}
                </span>
              </button>
              {userMenuOpen && (
                <div className="absolute right-0 top-full mt-1 w-44 bg-white border border-brand-mid shadow-lg z-50">
                  <Link
                    href="/account"
                    onClick={() => setUserMenuOpen(false)}
                    className="block px-4 py-3 text-[11px] font-semibold tracking-[0.12em] uppercase text-brand-black hover:bg-brand-light transition-colors"
                  >
                    My Account
                  </Link>
                  <Link
                    href="/account/orders"
                    onClick={() => setUserMenuOpen(false)}
                    className="block px-4 py-3 text-[11px] font-semibold tracking-[0.12em] uppercase text-brand-black hover:bg-brand-light transition-colors"
                  >
                    My Orders
                  </Link>
                  <Link
                    href="/wishlist"
                    onClick={() => setUserMenuOpen(false)}
                    className="block px-4 py-3 text-[11px] font-semibold tracking-[0.12em] uppercase text-brand-black hover:bg-brand-light transition-colors"
                  >
                    Wishlist{mounted && wishlistCount > 0 && <span className="ml-1.5 text-brand-gold">({wishlistCount})</span>}
                  </Link>
                  <div className="border-t border-brand-mid" />
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-2 px-4 py-3 text-[11px] font-semibold tracking-[0.12em] uppercase text-brand-muted hover:text-brand-black hover:bg-brand-light transition-colors"
                  >
                    <LogOut className="w-3.5 h-3.5" />
                    Sign Out
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link href="/account" className="p-2.5 text-brand-black hover:text-brand-gold transition-colors">
              <User className="w-[18px] h-[18px]" />
            </Link>
          )}

          {/* Cart */}
          <button onClick={openCart} className="relative p-2.5 text-brand-black hover:text-brand-gold transition-colors">
            <ShoppingBag className="w-[18px] h-[18px]" />
            {mounted && count > 0 && (
              <span className="absolute top-1 right-1 w-4 h-4 bg-brand-black text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                {count > 9 ? '9+' : count}
              </span>
            )}
          </button>
        </div>
      </nav>
    </header>
  )
}
