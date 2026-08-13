import Link from "next/link";
import Image from "next/image";
import { getSiteImages } from "@/lib/siteImages";

export const dynamic = "force-dynamic";
import {
  Sun, BatteryCharging, Tv, Gamepad2, Monitor,
  ShieldCheck, Truck, BadgeCheck, Headphones,
  ArrowRight, Zap, ChevronRight, Check,
} from "lucide-react";

const WaPath = "M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z";
const gold = "#D4AF37";

const categories = [
  { name: "Solar Systems",         href: "/solar",                     icon: <Sun size={26} color={gold} strokeWidth={1.5} /> },
  { name: "Inverters & Batteries", href: "/solar/inverters-batteries",  icon: <BatteryCharging size={26} color={gold} strokeWidth={1.5} /> },
  { name: "Smart TVs",             href: "/electronics",               icon: <Tv size={26} color={gold} strokeWidth={1.5} /> },
  { name: "Gaming",                href: "/electronics",               icon: <Gamepad2 size={26} color={gold} strokeWidth={1.5} /> },
  { name: "Home & Office",         href: "/electronics",               icon: <Monitor size={26} color={gold} strokeWidth={1.5} /> },
  { name: "View All",              href: "/shop",                      icon: <ArrowRight size={26} color={gold} strokeWidth={1.5} /> },
];

const featured = [
  { name: "Essential Home Solar",  price: "From R67,500", tag: "BEST VALUE", href: "/solar/residential", imgKey: "home.feat_solar_ess", alt: "Residential solar",  specs: ["5kW Inverter", "3.6kWp Panels", "6–10h backup"] },
  { name: "Premium Home Solar",    price: "R98,000",       tag: "POPULAR",   href: "/solar/residential", imgKey: "home.feat_solar_pre", alt: "Premium solar",      specs: ["8kW Inverter", "7.2kWp Panels", "12–18h backup"] },
  { name: '55" QLED Smart TV',    price: "From R7,999",   tag: null,        href: "/electronics",       imgKey: "home.feat_tv",        alt: "QLED Smart TV",      specs: ["4K UHD", "Smart Android", "HDR10+"] },
  { name: "PlayStation 5 Console", price: "From R12,999",  tag: null,        href: "/electronics",       imgKey: "home.feat_ps5",       alt: "PlayStation 5",      specs: ["Latest Gen", "4K Gaming", "Warranty"] },
];

const trust = [
  { icon: <ShieldCheck size={22} color={gold} strokeWidth={1.5} />, title: "Quality Guaranteed",    desc: "Only certified, premium products." },
  { icon: <Truck       size={22} color={gold} strokeWidth={1.5} />, title: "Nationwide Delivery",   desc: "All 9 provinces of South Africa." },
  { icon: <BadgeCheck  size={22} color={gold} strokeWidth={1.5} />, title: "Transparent Pricing",   desc: "No hidden charges." },
  { icon: <Headphones  size={22} color={gold} strokeWidth={1.5} />, title: "After-Sales Support",   desc: "We are here after the sale." },
];

export default function Home() {
  const imgs = getSiteImages([
    "home.hero", "home.wizard_bg", "home.cta_bg",
    "home.feat_solar_ess", "home.feat_solar_pre", "home.feat_tv", "home.feat_ps5",
  ]);

  return (
    <>
      {/* ── HERO ─────────────────────────────────────────────────────────── */}
      <section className="relative bg-[#0A0A0A] overflow-hidden py-10 lg:py-14">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute right-0 bottom-0 w-[600px] h-[600px]"
            style={{ background: "radial-gradient(ellipse at 80% 88%, rgba(212,175,55,0.12) 0%, transparent 60%)" }} />
        </div>
        <div className="relative max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <div>
              <span className="section-label block mb-4">Premium Solar &amp; Electronics — South Africa</span>
              <h1 className="text-[30px] sm:text-[36px] lg:text-[42px] font-extrabold leading-[1.08] text-white mb-4">
                Power Your Home.<br />
                <span className="text-[#D4AF37]">Run Your Business.</span>
              </h1>
              <p className="text-gray-400 text-base leading-relaxed mb-6 max-w-md">
                Solar systems, inverters, batteries, and premium electronics — all in one trusted South African store.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 mb-6">
                <Link href="/solar/wizard" className="btn-gold px-6 py-3.5 rounded-xl text-sm font-bold flex items-center justify-center gap-2">
                  <Zap size={16} strokeWidth={2.5} /> Find My Solar Solution
                </Link>
                <Link href="/shop" className="btn-outline px-6 py-3.5 rounded-xl text-sm font-semibold flex items-center justify-center gap-2">
                  Browse Products <ChevronRight size={15} />
                </Link>
              </div>
              <div className="flex flex-wrap gap-4">
                {[
                  { icon: <BadgeCheck size={13} color={gold} />, text: "Transparent pricing" },
                  { icon: <Truck size={13} color={gold} />,      text: "Nationwide delivery" },
                  { icon: <Check size={13} color={gold} />,      text: "Full product warranty" },
                ].map((t) => (
                  <div key={t.text} className="flex items-center gap-1.5 text-xs text-gray-400">{t.icon} {t.text}</div>
                ))}
              </div>
            </div>

            <div className="relative h-64 lg:h-80 rounded-2xl overflow-hidden">
              <Image src={imgs["home.hero"]}
                alt="Solar inverter system" fill className="object-cover object-center" priority />
              <div className="absolute inset-0" style={{ background: "linear-gradient(135deg, rgba(10,10,10,0.45) 0%, transparent 60%)" }} />
              <div className="absolute bottom-4 left-4 bg-[#0A0A0A]/90 border border-[#D4AF37]/25 rounded-xl px-4 py-3">
                <p className="text-[10px] text-gray-500 mb-0.5">Solar packages from</p>
                <p className="text-lg font-bold text-[#D4AF37]">R67,500</p>
                <p className="text-[10px] text-gray-500">installed nationwide</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 3 PATHS ─────────────────────────────────────────────────────── */}
      <section className="bg-[#0f0f0f] border-t border-[#1A1A1A] py-8">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {[
              { icon: <Zap size={22} color={gold} strokeWidth={1.5} />, title: "Find My Solar Solution", desc: "Answer 5 questions and get a tailored recommendation.", cta: "Start Wizard", href: "/solar/wizard", primary: true },
              { icon: <Monitor size={22} color={gold} strokeWidth={1.5} />, title: "Shop Products", desc: "Browse solar, inverters, TVs and electronics with clear pricing.", cta: "Browse Shop", href: "/shop", primary: false },
              { icon: <BadgeCheck size={22} color={gold} strokeWidth={1.5} />, title: "Get a Free Quote", desc: "Submit your requirements and receive an itemised quote.", cta: "Request Quote", href: "/contact", primary: false },
            ].map((item) => (
              <div key={item.title} className={`rounded-xl border p-5 flex flex-col gap-3 ${item.primary ? "border-[#D4AF37]/35 bg-[#D4AF37]/3" : "border-[#1A1A1A] bg-[#111111]"}`}>
                <div className="w-9 h-9 rounded-lg flex items-center justify-center" style={{ background: "rgba(212,175,55,0.08)" }}>{item.icon}</div>
                <div>
                  <h3 className="text-sm font-bold text-white mb-1">{item.title}</h3>
                  <p className="text-gray-400 text-xs leading-relaxed">{item.desc}</p>
                </div>
                <Link href={item.href} className={`${item.primary ? "btn-gold" : "btn-outline"} py-2.5 rounded-xl text-xs font-bold mt-auto`}>
                  {item.cta} <ChevronRight size={12} className="inline ml-0.5" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SOLAR WIZARD TEASER ──────────────────────────────────────────── */}
      <section className="relative overflow-hidden border-t border-[#1A1A1A]">
        <Image src={imgs["home.wizard_bg"]}
          alt="Solar panels" fill className="object-cover object-center" sizes="100vw" />
        <div className="absolute inset-0" style={{ background: "linear-gradient(to right, rgba(10,10,10,0.97) 0%, rgba(10,10,10,0.85) 55%, rgba(10,10,10,0.55) 100%)" }} />
        <div className="relative max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 py-10 grid lg:grid-cols-2 gap-8 items-center">
          <div>
            <p className="section-label mb-2">Solar Solution Finder</p>
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3 leading-tight">Not Sure Which Solar System You Need?</h2>
            <p className="text-gray-400 text-sm leading-relaxed mb-5 max-w-md">
              Our guided wizard asks 5 simple questions and recommends the right system for your property, usage, and budget — in under 2 minutes.
            </p>
            <Link href="/solar/wizard" className="btn-gold px-6 py-3.5 rounded-xl font-bold text-sm inline-flex items-center gap-2">
              <Zap size={16} strokeWidth={2.5} /> Find My Solar Solution
            </Link>
          </div>
          <div className="space-y-3">
            {[
              { step: "01", title: "Answer 5 Questions", desc: "Property type, electricity bill, appliances, budget." },
              { step: "02", title: "Get Your Recommendation", desc: "Instant recommendation — no jargon, no guesswork." },
              { step: "03", title: "Request an Official Quote", desc: "Submit details and receive a formal, itemised quote." },
            ].map((item) => (
              <div key={item.step} className="flex items-start gap-4">
                <span className="w-8 h-8 rounded-full shrink-0 flex items-center justify-center text-[10px] font-bold text-[#0A0A0A]"
                  style={{ background: "linear-gradient(135deg, #D4AF37, #F0CE6A)" }}>
                  {item.step}
                </span>
                <div>
                  <p className="text-white font-semibold text-xs mb-0.5">{item.title}</p>
                  <p className="text-gray-500 text-xs leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CATEGORIES ──────────────────────────────────────────────────── */}
      <section className="bg-[#0A0A0A] py-8 border-t border-[#1A1A1A]">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-lg font-bold text-white">Shop by Category</h2>
            <Link href="/shop" className="text-xs text-[#D4AF37] hover:underline">View all</Link>
          </div>
          <div className="grid grid-cols-3 sm:grid-cols-6 gap-2.5">
            {categories.map((cat) => (
              <Link key={cat.name} href={cat.href}
                className="bg-[#111111] border border-[#1A1A1A] rounded-xl p-3 flex flex-col items-center justify-center gap-2 text-center card-hover min-h-[90px]">
                {cat.icon}
                <p className="text-white text-[9px] sm:text-[10px] font-medium leading-tight">{cat.name}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── FEATURED PRODUCTS ────────────────────────────────────────────── */}
      <section className="bg-[#0A0A0A] py-8 border-t border-[#1A1A1A]">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-lg font-bold text-white">Featured Products</h2>
            <Link href="/shop" className="text-xs text-[#D4AF37] hover:underline">See all</Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {featured.map((p) => (
              <Link key={p.name} href={p.href}
                className="bg-[#111111] border border-[#1A1A1A] rounded-xl overflow-hidden card-hover flex flex-col group">
                <div className="relative h-44 overflow-hidden">
                  <Image src={imgs[p.imgKey]} alt={p.alt} fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#111111]/80 via-transparent to-transparent" />
                  {p.tag && <span className="absolute top-2.5 left-2.5 btn-gold text-[9px] font-bold px-2 py-0.5 rounded-full">{p.tag}</span>}
                </div>
                <div className="p-4 flex flex-col flex-1">
                  <p className="font-semibold text-white text-sm leading-snug mb-1.5">{p.name}</p>
                  <div className="flex flex-wrap gap-1 mb-2">
                    {p.specs.map((s) => (
                      <span key={s} className="text-[9px] text-gray-500 border border-[#1F1F1F] rounded-full px-2 py-0.5">{s}</span>
                    ))}
                  </div>
                  <p className="text-[#D4AF37] font-bold text-base mt-auto mb-2">{p.price}</p>
                  <div className="w-full py-2 rounded-lg text-xs font-medium text-center text-gray-400 border border-[#2a2a2a] group-hover:border-[#D4AF37]/40 group-hover:text-white transition-colors">
                    View Details
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── PACKAGES TEASER ──────────────────────────────────────────────── */}
      <section className="bg-[#0f0f0f] border-t border-[#1A1A1A] py-8">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            <div>
              <p className="section-label mb-2">Solar Packages</p>
              <h2 className="text-2xl font-bold text-white mb-3">Three packages. One for every home.</h2>
              <p className="text-gray-400 text-sm leading-relaxed mb-5">
                All packages include installation and nationwide delivery. Fixed prices — no hidden charges.
              </p>
              <div className="flex gap-2.5 flex-wrap">
                <Link href="/solar/compare" className="btn-gold px-5 py-2.5 rounded-xl text-xs font-bold">Compare Packages</Link>
                <Link href="/solar/wizard" className="btn-outline px-5 py-2.5 rounded-xl text-xs font-bold">Find My Match</Link>
              </div>
            </div>
            <div className="space-y-2">
              {[
                { name: "Essential Home",    price: "R67,500",  backup: "6–10h backup",   color: "#22c55e" },
                { name: "Premium Home",      price: "R98,000",  backup: "12–18h backup",  color: "#D4AF37" },
                { name: "Business Home Pro", price: "R264,000", backup: "18–24h backup",  color: "#A855F7" },
              ].map((pkg) => (
                <div key={pkg.name} className="flex items-center justify-between bg-[#111111] border border-[#1A1A1A] rounded-xl px-4 py-3 hover:border-[#D4AF37]/25 transition-colors">
                  <div className="flex items-center gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ background: pkg.color }} />
                    <span className="text-white text-xs font-medium">{pkg.name}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-gray-600 text-[10px]">{pkg.backup}</span>
                    <span className="text-[#D4AF37] font-bold text-xs">{pkg.price}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── TRUST BAR ────────────────────────────────────────────────────── */}
      <section className="bg-[#0A0A0A] border-t border-[#1A1A1A] py-7">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
            {trust.map((item) => (
              <div key={item.title} className="flex items-start gap-3">
                <div className="shrink-0 mt-0.5">{item.icon}</div>
                <div>
                  <p className="text-white font-semibold text-xs mb-0.5">{item.title}</p>
                  <p className="text-gray-500 text-[11px] leading-snug">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ TEASER ───────────────────────────────────────────────────── */}
      <section className="bg-[#0f0f0f] border-t border-[#1A1A1A] py-8">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
          <div className="grid lg:grid-cols-2 gap-8 items-start">
            <div>
              <p className="section-label mb-2">Help Centre</p>
              <h2 className="text-xl font-bold text-white mb-2">Common Questions</h2>
              <p className="text-gray-400 text-sm leading-relaxed mb-4">Find answers instantly — no need to WhatsApp for common questions.</p>
              <Link href="/faq" className="btn-outline px-5 py-2.5 rounded-xl text-xs font-bold">View All FAQs</Link>
            </div>
            <div className="space-y-2.5">
              {[
                { q: "How much does solar cost?",                    a: "Packages from R67,500 (Essential) to R264,000 (Business Pro), all including installation." },
                { q: "Do you deliver nationwide?",                   a: "Yes — all 9 provinces of South Africa." },
                { q: "How long does a battery last during load-shedding?", a: "A 200Ah lithium battery powers a typical family home for 12–18 hours." },
                { q: "Is installation included?",                   a: "Yes. All solar packages include standard installation and COC." },
              ].map((item) => (
                <div key={item.q} className="bg-[#111111] border border-[#1F1F1F] rounded-xl p-4">
                  <p className="text-white text-xs font-semibold mb-1.5">{item.q}</p>
                  <p className="text-gray-400 text-xs leading-relaxed">{item.a}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── FINAL CTA ────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden border-t border-[#1A1A1A]">
        <Image src={imgs["home.cta_bg"]}
          alt="Modern home powered by solar" fill className="object-cover" sizes="100vw" />
        <div className="absolute inset-0"
          style={{ background: "linear-gradient(to right, rgba(10,10,10,0.96) 45%, rgba(10,10,10,0.7) 80%, rgba(10,10,10,0.4) 100%)" }} />
        <div className="relative max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 py-12">
          <p className="section-label mb-2">Ready to go solar?</p>
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3 leading-tight">Start your solar journey today.</h2>
          <p className="text-gray-300 text-sm leading-relaxed mb-6 max-w-sm">
            Find your solution in 2 minutes or get a free, no-obligation quote from our team.
          </p>
          <div className="flex flex-col sm:flex-row gap-3">
            <Link href="/solar/wizard" className="btn-gold px-6 py-3.5 rounded-xl font-bold text-sm flex items-center gap-2 justify-center sm:justify-start">
              <Zap size={16} strokeWidth={2.5} /> Find My Solution
            </Link>
            <a href="https://wa.me/27848961782" target="_blank" rel="noopener noreferrer"
              className="btn-outline px-6 py-3.5 rounded-xl font-bold text-sm flex items-center gap-2 justify-center sm:justify-start">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d={WaPath} /></svg>
              Chat on WhatsApp
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
