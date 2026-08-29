import type { Metadata } from "next";
import Link from "next/link";
import { ShieldCheck, Truck, BadgeCheck, Headphones, Phone, Mail, FileText } from "lucide-react";

export const metadata: Metadata = {
  title: "About Us | Bevans Sons — Premium Clothing",
  description: "Bevans Sons is a proudly South African registered clothing brand offering premium men's and women's fashion with fast delivery across South Africa.",
};

const values = [
  { icon: BadgeCheck, title: "Authenticity",     desc: "Every product is 100% genuine. We never sell counterfeit goods." },
  { icon: ShieldCheck, title: "Transparency",    desc: "Clear pricing, honest communication, no hidden fees." },
  { icon: Truck,       title: "Reliability",     desc: "We deliver on our promises — fast shipping, secure packaging." },
  { icon: Headphones,  title: "Customer First",  desc: "Real human support via WhatsApp. We're here when you need us." },
];

const areas = [
  "Gauteng", "Western Cape", "KwaZulu-Natal", "Eastern Cape",
  "Free State", "Limpopo", "Mpumalanga", "North West", "Northern Cape",
  "International (Worldwide)",
];

export default function AboutPage() {
  return (
    <div className="max-w-5xl mx-auto px-5 sm:px-8 py-20">

      {/* Header */}
      <div className="mb-16 text-center">
        <p className="section-label mb-3">Our Story</p>
        <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-6">
          About <span className="gold-text">Bevans Sons</span>
        </h1>
        <p className="text-gray-400 text-lg leading-relaxed max-w-2xl mx-auto">
          We&apos;re a proudly South African registered clothing brand on a mission to bring premium men&apos;s and women&apos;s fashion to everyone — at prices that make sense.
        </p>
      </div>

      {/* Mission */}
      <div className="bg-[#111111] border border-[#D4AF37]/20 rounded-3xl p-10 mb-12 text-center">
        <p className="text-[#D4AF37] text-xs uppercase tracking-widest font-bold mb-4">Our Mission</p>
        <p className="text-white text-xl md:text-2xl font-bold leading-relaxed max-w-3xl mx-auto">
          &ldquo;Premium clothing, crafted for the bold. Free delivery across South Africa. Style that speaks before you do.&rdquo;
        </p>
      </div>

      {/* Story */}
      <div className="grid md:grid-cols-2 gap-10 mb-16">
        <div>
          <h2 className="text-2xl font-bold text-white mb-4">Who We Are</h2>
          <p className="text-gray-400 leading-relaxed mb-4">
            Bevans Sons is a registered South African private company founded in 2023. We exist to give South Africans access to premium clothing — quality pieces built to last, at prices that are honest and fair.
          </p>
          <p className="text-gray-400 leading-relaxed mb-4">
            We deliver to all 9 provinces across South Africa. Every order is handled with care, and our team is available via WhatsApp to assist with sizing, orders, or anything else you need.
          </p>
          <p className="text-gray-400 leading-relaxed">
            We believe clothing should make you feel confident. That&apos;s the standard we hold every product to before it reaches you.
          </p>
        </div>
        <div className="bg-[#111111] border border-[#1F1F1F] rounded-2xl p-7">
          <h3 className="text-white font-bold text-lg mb-5">Company Info</h3>
          <div className="space-y-4 text-sm">
            <div className="flex items-start gap-3">
              <FileText size={16} color="#D4AF37" className="shrink-0 mt-0.5" />
              <div>
                <p className="text-xs text-gray-500 uppercase tracking-wider font-bold mb-0.5">Registration Number</p>
                <p className="text-white font-medium">2023 / 116995 / 07</p>
                <p className="text-gray-500 text-xs">CIPC Registered Private Company</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Phone size={16} color="#D4AF37" className="shrink-0" />
              <a href="https://wa.me/27724816274" className="text-white hover:text-[#D4AF37] transition-colors">+27 72 481 6274</a>
            </div>
            <div className="flex items-center gap-3">
              <Mail size={16} color="#D4AF37" className="shrink-0" />
              <a href="mailto:MkhabeleEnterprise@gmail.com" className="text-white hover:text-[#D4AF37] transition-colors">MkhabeleEnterprise@gmail.com</a>
            </div>
          </div>
        </div>
      </div>

      {/* Values */}
      <div className="mb-16">
        <h2 className="text-2xl font-bold text-white mb-8 text-center">Our Values</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {values.map(({ icon: Icon, title, desc }) => (
            <div key={title} className="bg-[#111111] border border-[#1F1F1F] rounded-2xl p-6 text-center">
              <div className="w-11 h-11 rounded-xl bg-[#D4AF37]/10 flex items-center justify-center mx-auto mb-3">
                <Icon size={20} color="#D4AF37" strokeWidth={1.8} />
              </div>
              <h3 className="text-white font-bold text-sm mb-2">{title}</h3>
              <p className="text-gray-500 text-xs leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Coverage */}
      <div className="bg-[#111111] border border-[#1F1F1F] rounded-2xl p-8 mb-12">
        <h2 className="text-xl font-bold text-white mb-6">Where We Deliver</h2>
        <div className="flex flex-wrap gap-2">
          {areas.map((a) => (
            <span key={a} className={`text-xs font-semibold px-3 py-1.5 rounded-full border ${
              a.includes("International") ? "border-[#D4AF37]/40 text-[#D4AF37] bg-[#D4AF37]/5" : "border-[#2a2a2a] text-gray-400"
            }`}>{a}</span>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="text-center">
        <h2 className="text-2xl font-bold text-white mb-4">Ready to Shop?</h2>
        <p className="text-gray-400 mb-8">Browse our full catalogue or chat with us on WhatsApp to get started.</p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/shop" className="btn-gold px-10 py-4 rounded-xl font-bold">Shop Now</Link>
          <a href="https://wa.me/27724816274" target="_blank" rel="noopener noreferrer"
            className="btn-outline px-10 py-4 rounded-xl font-bold">Chat on WhatsApp</a>
        </div>
      </div>

    </div>
  );
}
