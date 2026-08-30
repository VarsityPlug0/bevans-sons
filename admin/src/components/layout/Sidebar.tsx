'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import {
  LayoutDashboard, ShoppingBag, Package, Warehouse, Truck, Users,
  DollarSign, Megaphone, BarChart3, RefreshCw, Settings, Bell, LogOut,
  Mail, MessageSquare, Image, Tag,
} from 'lucide-react'
import { logout } from '@/lib/auth'

const nav = [
  { label: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
  { label: 'Orders', href: '/orders', icon: ShoppingBag },
  { label: 'Products', href: '/products', icon: Package },
  { label: 'Categories', href: '/categories', icon: Tag },
  { label: 'Inventory', href: '/inventory', icon: Warehouse },
  { label: 'Suppliers', href: '/suppliers', icon: Truck },
  { label: 'Customers', href: '/customers', icon: Users },
  { label: 'Finance', href: '/finance', icon: DollarSign },
  { label: 'Marketing', href: '/marketing', icon: Megaphone },
  { label: 'Email Campaigns', href: '/emails', icon: Mail },
  { label: 'Analytics', href: '/analytics', icon: BarChart3 },
  { label: 'Returns & Refunds', href: '/refunds', icon: RefreshCw },
  { label: 'Enquiries', href: '/enquiries', icon: MessageSquare },
  { label: 'Site Images', href: '/site-images', icon: Image },
  { label: 'Settings', href: '/settings', icon: Settings },
]

export function Sidebar() {
  const pathname = usePathname()

  return (
    <aside className="fixed left-0 top-0 h-full w-60 bg-gray-900 text-gray-100 flex flex-col z-40">
      {/* Logo */}
      <div className="px-6 py-5 border-b border-gray-700">
        <img src="/logo.jpg" alt="Bevans Sons" className="h-10 w-auto mb-1" />
        <p className="text-gray-400 text-xs mt-0.5">Business Control Center</p>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-4 space-y-0.5 overflow-y-auto">
        {nav.map(({ label, href, icon: Icon }) => {
          const active = pathname === href || pathname.startsWith(href + '/')
          return (
            <Link
              key={href}
              href={href}
              className={cn(
                'flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors',
                active ? 'bg-gray-700 text-white' : 'text-gray-400 hover:bg-gray-800 hover:text-white'
              )}
            >
              <Icon className="w-4 h-4 flex-shrink-0" />
              {label}
            </Link>
          )
        })}
      </nav>

      {/* Bottom */}
      <div className="px-3 py-4 border-t border-gray-700 space-y-0.5">
        <Link href="/alerts" className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-gray-400 hover:bg-gray-800 hover:text-white transition-colors">
          <Bell className="w-4 h-4" />
          Alerts
        </Link>
        <button
          onClick={logout}
          className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-gray-400 hover:bg-gray-800 hover:text-red-400 transition-colors"
        >
          <LogOut className="w-4 h-4" />
          Sign out
        </button>
      </div>
    </aside>
  )
}
