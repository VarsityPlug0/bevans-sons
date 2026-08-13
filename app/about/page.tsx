import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About Us | Daisy & Co. — Proudly South African",
  description: "Daisy & Co. is a proudly South African company delivering premium solar systems and electronics to all 9 provinces. Quality products, transparent pricing, WhatsApp support.",
};

const areas = [
  "Gauteng", "Western Cape", "KwaZulu-Natal", "Eastern Cape",
  "Limpopo", "Mpumalanga", "North West", "Free State", "Northern Cape",
];

const stats = [
  { value: "9", label: "Provinces Served" },
  { value: "500+", label: "Happy Customers" },
  { value: "100%", label: "Warranty Backed" },
  { value: "24/7", label: "WhatsApp Support" },
];

const products = [
  "Residential Solar Systems",
  "Commercial Solar Systems",
  "Hybrid Inverters",
  "Lithium Battery Storage",
  "Smart TVs & Displays",
  "Gaming Consoles & Accessories",
  "Home & Office Electronics",
  "Tech Accessories",
];

const trustPoints = [
  { title: "Premium Products Only",   desc: "We only stock certified, quality-tested products from reputable brands." },
  { title: "Transparent Pricing",      desc: "What you see is what you pay. No hidden fees or surprise charges." },
  { title: "Fast Nationwide Delivery", desc: "We ship across South Africa with reliable courier partners." },
  { title: "Warranty Support",         desc: "All products come with full manufacturer warranty and we handle claims." },
  { title: "WhatsApp Support",         desc: "Real humans, not bots. Chat directly with our sales and support team." },
  { title: "After-Sales Service",      desc: "We don't disappear after the sale. We are here for the long run." },
];

export default function About() {
  return (
    <div className="min-h-screen">

      {/* ── Hero ──────────────────────────────────────────────── */}
      <section className="relative overflow-hidden border-b border-white/5">
        {/* background glow */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            background: "radial-gradient(ellipse 80% 60% at 50% -10%, rgba(212,175,55,0.08) 0%, transparent 70%)",
          }}
        />
        <div className="max-w-4xl mx-auto px-6 sm:px-10 py-20 text-center relative z-10">
          <p className="section-label mb-4">Our Story</p>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white mb-6 leading-tight">
            About <span className="gold-text">Daisy &amp; Co.</span>
          </h1>
          <p className="text-gray-400 text-lg leading-relaxed max-w-2xl mx-auto mb-10">
            A proudly South African brand built on quality, trust, and the mission to make
            premium solar and electronics accessible to every home and business.
          </p>

          {/* Stats row */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-px bg-white/5 rounded-2xl overflow-hidden border border-white/5">
            {stats.map((s) => (
              <div key={s.label} className="bg-[#0A0A0A] px-6 py-5 text-center">
                <div className="text-2xl font-extrabold gold-text mb-1">{s.value}</div>
                <div className="text-xs text-gray-500 uppercase tracking-widest">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Who We Are + What We Sell ─────────────────────────── */}
      <section className="max-w-7xl mx-auto px-6 sm:px-10 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">

          {/* Left — Who We Are */}
          <div>
            <p className="section-label mb-3">Who We Are</p>
            <h2 className="text-3xl font-bold text-white mb-6">
              Built for South Africans,<br />by South Africans
            </h2>
            <div className="space-y-5 text-gray-400 leading-relaxed">
              <p>
                Daisy &amp; Co. specialises in premium solar energy systems and consumer
                electronics. We were founded with one goal: to provide South Africans with
                high-quality, affordable energy solutions that free them from the burden of
                load-shedding and rising electricity costs.
              </p>
              <p>
                We supply residential solar packages, commercial solar systems, inverters,
                lithium batteries, smart TVs, gaming products, and home &amp; office
                electronics — all backed by dedicated WhatsApp customer service.
              </p>
              <p>
                Whether you are a homeowner tired of candles, a business owner losing revenue
                to power cuts, or simply looking for premium electronics at fair prices,
                Daisy &amp; Co. is here for you.
              </p>
            </div>
          </div>

          {/* Right — What We Sell */}
          <div className="bg-[#111111] border border-[#1F1F1F] rounded-2xl p-7">
            <p className="section-label mb-3">What We Sell</p>
            <h3 className="text-xl font-bold text-white mb-6">Our Product Range</h3>
            <div className="space-y-3">
              {products.map((item) => (
                <div key={item} className="flex items-center gap-3 text-gray-300">
                  <span
                    className="w-1.5 h-1.5 rounded-full shrink-0"
                    style={{ background: "#D4AF37" }}
                  />
                  <span className="text-sm">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Divider ────────────────────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-6 sm:px-10">
        <hr className="gold-divider" />
      </div>

      {/* ── Areas We Serve ─────────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-6 sm:px-10 py-20">
        <div className="text-center mb-10">
          <p className="section-label mb-3">Nationwide</p>
          <h2 className="text-3xl font-bold text-white mb-3">Areas We Serve</h2>
          <p className="text-gray-400">We deliver across all 9 provinces of South Africa.</p>
        </div>
        <div className="flex flex-wrap gap-3 justify-center">
          {areas.map((area) => (
            <span
              key={area}
              className="border text-sm px-5 py-2.5 rounded-full font-medium transition-colors"
              style={{ borderColor: "rgba(212,175,55,0.35)", color: "#D4AF37" }}
            >
              {area}
            </span>
          ))}
        </div>
      </section>

      {/* ── Divider ────────────────────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-6 sm:px-10">
        <hr className="gold-divider" />
      </div>

      {/* ── Why Trust Us ───────────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-6 sm:px-10 py-20">
        <div className="text-center mb-12">
          <p className="section-label mb-3">Why Choose Us</p>
          <h2 className="text-3xl font-bold text-white mb-3">Why Customers Trust Us</h2>
          <p className="text-gray-400">Six reasons our customers keep coming back.</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {trustPoints.map((item) => (
            <div
              key={item.title}
              className="card-hover bg-[#111111] border border-[#1F1F1F] rounded-2xl p-6"
            >
              <div
                className="w-8 h-1 rounded-full mb-5"
                style={{ background: "linear-gradient(90deg, #D4AF37, #F0CE6A)" }}
              />
              <h3 className="font-semibold text-white text-base mb-2">{item.title}</h3>
              <p className="text-gray-400 text-sm leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── CTA ────────────────────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-6 sm:px-10 pb-20">
        <div
          className="text-center rounded-2xl p-10 sm:p-16 relative overflow-hidden"
          style={{
            background: "#111111",
            border: "1px solid rgba(212,175,55,0.2)",
            boxShadow: "0 0 80px rgba(212,175,55,0.05)",
          }}
        >
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0"
            style={{
              background: "radial-gradient(ellipse 60% 50% at 50% 100%, rgba(212,175,55,0.06) 0%, transparent 70%)",
            }}
          />
          <div className="relative z-10">
            <p className="section-label mb-4">Get In Touch</p>
            <h3 className="text-3xl sm:text-4xl font-extrabold text-white mb-4">Ready to talk?</h3>
            <p className="text-gray-400 text-base mb-8 max-w-lg mx-auto leading-relaxed">
              Our team is available on WhatsApp for product enquiries, quotes, and support.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="https://wa.me/27848961782"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-gold px-10 py-4 rounded-xl font-bold text-base"
              >
                Chat on WhatsApp
              </a>
              <Link href="/contact" className="btn-outline px-10 py-4 rounded-xl text-base">
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
