import Link from 'next/link'
import Image from 'next/image'
import { ProductGrid } from '@/components/products/ProductGrid'
import { Truck, RotateCcw, ShieldCheck, Lock, Star, Users, MapPin } from 'lucide-react'

export default function HomePage() {
  return (
    <div>
      {/* Hero */}
      <section className="relative h-[80vh] min-h-[560px] overflow-hidden bg-brand-dark">
        <Image
          src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=1600&q=80"
          alt="Bevans Sons — Premium Sneakers"
          fill
          className="object-cover object-center opacity-50"
          priority
        />
        <div className="relative z-10 max-w-7xl mx-auto px-6 h-full flex flex-col justify-center">
          <p className="text-brand-gold text-[11px] font-semibold tracking-[0.2em] uppercase mb-4">New Arrivals</p>
          <h1 className="font-bebas text-[80px] md:text-[110px] leading-[0.9] text-white mb-5 uppercase">
            Step Into<br />Your Next
          </h1>
          <p className="text-white/60 text-sm tracking-wide mb-8 max-w-xs">
            Premium sneakers. Everyday confidence.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link
              href="/products"
              className="bg-brand-gold text-brand-black px-8 py-3.5 text-[11px] font-bold tracking-[0.18em] uppercase hover:opacity-90 transition-opacity"
            >
              Shop Sneakers
            </Link>
            <Link
              href="/products"
              className="border border-white text-white px-8 py-3.5 text-[11px] font-bold tracking-[0.18em] uppercase hover:bg-white hover:text-brand-black transition-colors"
            >
              Explore Collection
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Sneakers */}
      <section className="max-w-7xl mx-auto px-6 py-16">
        <div className="flex items-center justify-between mb-8">
          <h2 className="font-bebas text-4xl tracking-[0.05em] uppercase text-brand-black">Featured Sneakers</h2>
          <Link href="/products" className="text-[11px] font-semibold tracking-[0.15em] uppercase text-brand-black hover:text-brand-gold transition-colors flex items-center gap-2">
            View All <span>&rarr;</span>
          </Link>
        </div>
        <ProductGrid limit={8} />
      </section>

      {/* Trust Badges */}
      <section className="border-t border-b border-brand-mid py-8">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { icon: Truck, title: 'Free Delivery', sub: 'On orders over R999' },
            { icon: RotateCcw, title: 'Easy Returns', sub: '30-day return policy' },
            { icon: ShieldCheck, title: 'Authentic Products', sub: '100% original sneakers' },
            { icon: Lock, title: 'Secure Payments', sub: 'Encrypted & safe checkout' },
          ].map(({ icon: Icon, title, sub }) => (
            <div key={title} className="flex items-center gap-4">
              <Icon className="w-8 h-8 text-brand-black flex-shrink-0 stroke-[1.5]" />
              <div>
                <p className="text-[11px] font-bold tracking-[0.12em] uppercase text-brand-black">{title}</p>
                <p className="text-xs text-brand-muted mt-0.5">{sub}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* New Arrivals + Best Sellers */}
      <section className="max-w-7xl mx-auto px-6 py-14 grid md:grid-cols-2 gap-4">
        <Link href="/products?sort=newest" className="group relative h-60 overflow-hidden bg-brand-light block">
          <Image
            src="https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=800&q=80"
            alt="New Arrivals"
            fill
            className="object-cover opacity-70 group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute inset-0 p-8 flex flex-col justify-end">
            <p className="font-bebas text-3xl text-brand-black uppercase tracking-wide">New Arrivals</p>
            <p className="text-[11px] font-semibold tracking-[0.15em] uppercase text-brand-black mt-1 flex items-center gap-2 group-hover:gap-3 transition-all">
              Shop Now <span>&rarr;</span>
            </p>
          </div>
        </Link>
        <Link href="/products?sort=popular" className="group relative h-60 overflow-hidden bg-brand-light block">
          <Image
            src="https://images.unsplash.com/photo-1539185441755-769473a23570?w=800&q=80"
            alt="Best Sellers"
            fill
            className="object-cover opacity-70 group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute inset-0 p-8 flex flex-col justify-end">
            <p className="font-bebas text-3xl text-brand-black uppercase tracking-wide">Best Sellers</p>
            <p className="text-[11px] font-semibold tracking-[0.15em] uppercase text-brand-black mt-1 flex items-center gap-2 group-hover:gap-3 transition-all">
              Shop Now <span>&rarr;</span>
            </p>
          </div>
        </Link>
      </section>

      {/* Shop by Category */}
      <section className="max-w-7xl mx-auto px-6 pb-16">
        <div className="flex items-center justify-between mb-8">
          <h2 className="font-bebas text-4xl tracking-[0.05em] uppercase text-brand-black">Shop by Category</h2>
          <Link href="/products" className="text-[11px] font-semibold tracking-[0.15em] uppercase text-brand-black hover:text-brand-gold transition-colors flex items-center gap-2">
            View All <span>&rarr;</span>
          </Link>
        </div>
        <div className="grid grid-cols-3 gap-4">
          {[
            { label: 'Men', slug: 'men', img: 'https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?w=600&q=80' },
            { label: 'Women', slug: 'women', img: 'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?w=600&q=80' },
            { label: 'Lifestyle', slug: 'lifestyle', img: 'https://images.unsplash.com/photo-1491553895911-0055eca6402d?w=600&q=80' },
          ].map(({ label, slug, img }) => (
            <Link key={slug} href={`/categories/${slug}`} className="group relative h-72 overflow-hidden bg-brand-dark block">
              <Image
                src={img}
                alt={label}
                fill
                className="object-cover opacity-60 group-hover:opacity-70 group-hover:scale-105 transition-all duration-500"
              />
              <div className="absolute inset-0 flex flex-col justify-end p-6">
                <p className="font-bebas text-3xl text-white uppercase tracking-wide">{label}</p>
                <p className="text-[10px] font-semibold tracking-[0.18em] uppercase text-white/70 mt-1 flex items-center gap-2 group-hover:gap-3 transition-all">
                  Shop Now <span>&rarr;</span>
                </p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Limited Drop Banner */}
      <section className="relative bg-brand-black py-16 px-6 overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1600185365926-3a2ce3cdb9eb?w=1400&q=80"
          alt="Limited Drop"
          fill
          className="object-cover opacity-20"
        />
        <div className="relative z-10 max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
          <div>
            <h2 className="font-bebas text-5xl md:text-6xl text-white uppercase tracking-wide leading-tight">Limited Drop</h2>
            <p className="text-brand-muted text-xs tracking-[0.15em] uppercase mt-2">Exclusive styles. Limited quantity.</p>
          </div>
          <Link
            href="/products"
            className="bg-brand-gold text-brand-black px-10 py-4 text-[11px] font-bold tracking-[0.2em] uppercase hover:opacity-90 transition-opacity whitespace-nowrap"
          >
            Shop the Drop
          </Link>
        </div>
      </section>

      {/* Social Proof */}
      <section className="border-t border-brand-mid py-10">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {[
            { icon: Star, stat: '4.8/5', sub: 'From 2,500+ reviews' },
            { icon: Users, stat: '25,000+', sub: 'Happy customers' },
            { icon: ShieldCheck, stat: '100% Authentic', sub: 'Original sneakers only' },
            { icon: MapPin, stat: 'Nationwide Delivery', sub: 'Fast & reliable shipping' },
          ].map(({ icon: Icon, stat, sub }) => (
            <div key={stat} className="flex flex-col items-center gap-2">
              <Icon className="w-6 h-6 text-brand-black stroke-[1.5]" />
              <p className="text-sm font-bold text-brand-black">{stat}</p>
              <p className="text-xs text-brand-muted">{sub}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Newsletter */}
      <section className="bg-brand-light py-14 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
          <div>
            <h3 className="font-bebas text-3xl uppercase tracking-wide text-brand-black">Join the Bevans Sons Community</h3>
            <p className="text-xs text-brand-muted mt-1">Get early access to new drops, exclusive offers and style inspiration.</p>
          </div>
          <form className="flex w-full md:w-auto">
            <input
              type="email"
              placeholder="Enter your email address"
              className="flex-1 md:w-72 px-4 py-3 text-sm border border-brand-mid bg-white outline-none focus:border-brand-black transition-colors"
            />
            <button
              type="submit"
              className="bg-brand-black text-white px-6 py-3 text-[11px] font-bold tracking-[0.18em] uppercase hover:bg-brand-dark transition-colors"
            >
              Subscribe
            </button>
          </form>
        </div>
      </section>
    </div>
  )
}
