import type { Metadata } from "next";
import Link from "next/link";
import { ShieldCheck, Truck, BadgeCheck, Headphones, MapPin, Phone, Mail, Building2 } from "lucide-react";
// Phone/Mail shown as static placeholders until contact details are confirmed

export const metadata: Metadata = {
  title: "About Us | Bevans Sons",
  description: "Bevans Sons is a registered South African clothing brand — premium streetwear, hoodies, tees, jackets and more. Founded by Bevan Mkhabele, operating online across South Africa.",
};

const values = [
  { icon: BadgeCheck, title: "Quality First",    desc: "Every piece is quality-checked before it ships. No compromises." },
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
        <h1
          className="text-4xl md:text-5xl font-bold text-white mb-6"
          style={{ fontFamily: "var(--font-playfair)" }}
        >
          About Bevans Sons
        </h1>
        <p className="text-gray-400 text-lg leading-relaxed max-w-2xl mx-auto">
          A proudly South African clothing brand — crafting premium streetwear and everyday essentials for those who wear their confidence.
        </p>
      </div>

      {/* Mission */}
      <div className="bg-[#111111] border border-[#1F1F1F] rounded-3xl p-10 mb-12 text-center">
        <p className="section-label mb-4">Our Mission</p>
        <p className="text-white text-xl md:text-2xl font-bold leading-relaxed max-w-3xl mx-auto" style={{ fontFamily: "var(--font-playfair)" }}>
          &ldquo;Premium clothing. Crafted for the Bold.&rdquo;
        </p>
      </div>

      {/* Story + Contact */}
      <div className="grid md:grid-cols-2 gap-10 mb-16">
        <div>
          <h2 className="text-2xl font-bold text-white mb-4">Who We Are</h2>
          <p className="text-gray-400 leading-relaxed mb-4">
            Bevans Sons (Pty) Ltd was founded by Bevan Ndzhaka Mkhabele in September 2023 with a simple vision: to give South Africans access to premium clothing at fair prices, backed by genuine service and after-sales support.
          </p>
          <p className="text-gray-400 leading-relaxed mb-4">
            Based in South Africa, we serve customers across all 9 South African provinces and ship internationally. Our range covers men&apos;s and women&apos;s clothing — hoodies, tees, jackets, streetwear, accessories and more.
          </p>
          <p className="text-gray-400 leading-relaxed">
            We&apos;re available via WhatsApp every day to help you find the right size, track your order, or resolve any issue — fast.
          </p>
        </div>

        {/* Contact card */}
        <div className="bg-[#111111] border border-[#1F1F1F] rounded-2xl p-7">
          <h3 className="text-white font-bold text-lg mb-5">Contact &amp; Company Info</h3>
          <div className="space-y-4 text-sm">
            <div className="flex items-center gap-3">
              <MapPin size={16} className="text-gray-400 shrink-0" />
              <p className="text-gray-400">South Africa — Online Only</p>
            </div>
            <div className="flex items-center gap-3">
              <Phone size={16} className="text-gray-400 shrink-0" />
              <span className="text-gray-400">WhatsApp — coming soon</span>
            </div>
            <div className="flex items-center gap-3">
              <Mail size={16} className="text-gray-400 shrink-0" />
              <Link href="/contact" className="text-white hover:text-gray-300 transition-colors">
                Contact Us
              </Link>
            </div>
            <div className="flex items-start gap-3 pt-3 border-t border-[#1F1F1F]">
              <Building2 size={16} className="text-gray-400 shrink-0 mt-0.5" />
              <div>
                <p className="text-white font-medium">Bevans Sons (Pty) Ltd</p>
                <p className="text-gray-500">Reg: 2023/116995/07</p>
                <p className="text-gray-500">CIPC Registered — In Business since 26 Sep 2023</p>
              </div>
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
              <div className="w-11 h-11 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center mx-auto mb-3">
                <Icon size={20} className="text-white" strokeWidth={1.8} />
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
            <span
              key={a}
              className={`text-xs font-semibold px-3 py-1.5 rounded-full border ${
                a.includes("International")
                  ? "border-white/30 text-white bg-white/5"
                  : "border-[#2a2a2a] text-gray-400"
              }`}
            >
              {a}
            </span>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="text-center">
        <h2 className="text-2xl font-bold text-white mb-4">Ready to Shop?</h2>
        <p className="text-gray-400 mb-8">Browse our full catalogue or chat with us on WhatsApp to get started.</p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/shop" className="btn-primary px-10 py-4 rounded-xl font-bold">Shop Now</Link>
          <Link href="/contact" className="btn-outline px-10 py-4 rounded-xl font-bold">Contact Us</Link>
        </div>
      </div>

    </div>
  );
}
