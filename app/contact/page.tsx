"use client";
import { useState } from "react";

type FormData = {
  name: string;
  phone: string;
  email: string;
  type: string;
  message: string;
};

export default function Contact() {
  const [form, setForm] = useState<FormData>({ name: "", phone: "", email: "", type: "Residential Solar", message: "" });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handle = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    try {
      const res = await fetch("/api/quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      setStatus(res.ok ? "success" : "error");
    } catch {
      setStatus("error");
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="text-center mb-8">
        <p className="text-[#D4AF37] text-sm uppercase tracking-widest mb-3">Get in Touch</p>
        <h1 className="text-3xl md:text-4xl font-extrabold text-white mb-3">
          Contact & <span className="gold-text">Get a Quote</span>
        </h1>
        <p className="text-gray-400 max-w-xl mx-auto text-base">
          Fill in the form below or chat directly on WhatsApp for instant responses.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
        {/* Contact info */}
        <div className="lg:col-span-2 space-y-6">
          {[
            {
              label: "Phone",
              value: "+27 84 896 1782",
              href: "tel:+27848961782",
              icon: (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#D4AF37" strokeWidth="2">
                  <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 8.81a19.79 19.79 0 01-3.07-8.63A2 2 0 012 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 14.92z" />
                </svg>
              ),
            },
            {
              label: "WhatsApp",
              value: "Chat directly with sales",
              href: "https://wa.me/27848961782",
              icon: (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="#D4AF37">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
              ),
            },
            {
              label: "Email",
              value: "info@daisyandco.co.za",
              href: "mailto:info@daisyandco.co.za",
              icon: (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#D4AF37" strokeWidth="2">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                  <polyline points="22,6 12,13 2,6" />
                </svg>
              ),
            },
            {
              label: "Location",
              value: "South Africa (Nationwide Delivery)",
              href: null,
              icon: (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#D4AF37" strokeWidth="2">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
              ),
            },
          ].map((item) => (
            <div key={item.label} className="bg-[#111111] border border-[#1F1F1F] rounded-2xl p-5 flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-[#1a1a1a] flex items-center justify-center shrink-0">{item.icon}</div>
              <div>
                <p className="text-xs text-gray-500 uppercase tracking-wide mb-0.5">{item.label}</p>
                {item.href ? (
                  <a href={item.href} className="text-white font-medium hover:text-[#D4AF37] transition-colors text-sm">
                    {item.value}
                  </a>
                ) : (
                  <p className="text-white font-medium text-sm">{item.value}</p>
                )}
              </div>
            </div>
          ))}

          <a
            href="https://wa.me/27848961782"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-gold w-full py-4 rounded-xl font-bold flex items-center justify-center gap-2 mt-4"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
            Chat on WhatsApp Now
          </a>
        </div>

        {/* Quote Form */}
        <div className="lg:col-span-3 bg-[#111111] border border-[#1F1F1F] rounded-2xl p-5">
          <h2 className="text-xl font-bold text-white mb-6">Send a Quote Request</h2>

          {status === "success" ? (
            <div className="text-center py-16">
              <div className="w-16 h-16 rounded-full bg-green-900/30 border border-green-500/30 flex items-center justify-center mx-auto mb-4">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#4ade80" strokeWidth="2">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Quote Request Sent!</h3>
              <p className="text-gray-400 mb-6">We will get back to you via WhatsApp or email within 24 hours.</p>
              <a href="https://wa.me/27848961782" target="_blank" rel="noopener noreferrer" className="btn-gold px-6 py-3 rounded-xl font-bold">
                Also Chat on WhatsApp
              </a>
            </div>
          ) : (
            <form onSubmit={submit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs text-gray-500 uppercase tracking-wide mb-1.5">Full Name *</label>
                  <input
                    name="name" value={form.name} onChange={handle} required
                    className="w-full bg-[#0A0A0A] border border-[#1F1F1F] rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-[#D4AF37] transition-colors"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label className="block text-xs text-gray-500 uppercase tracking-wide mb-1.5">Phone Number *</label>
                  <input
                    name="phone" value={form.phone} onChange={handle} required type="tel"
                    className="w-full bg-[#0A0A0A] border border-[#1F1F1F] rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-[#D4AF37] transition-colors"
                    placeholder="+27 xx xxx xxxx"
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs text-gray-500 uppercase tracking-wide mb-1.5">Email Address</label>
                <input
                  name="email" value={form.email} onChange={handle} type="email"
                  className="w-full bg-[#0A0A0A] border border-[#1F1F1F] rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-[#D4AF37] transition-colors"
                  placeholder="your@email.com"
                />
              </div>
              <div>
                <label className="block text-xs text-gray-500 uppercase tracking-wide mb-1.5">I am interested in *</label>
                <select
                  name="type" value={form.type} onChange={handle}
                  className="w-full bg-[#0A0A0A] border border-[#1F1F1F] rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-[#D4AF37] transition-colors"
                >
                  <option>Residential Solar</option>
                  <option>Commercial Solar</option>
                  <option>Inverter & Battery</option>
                  <option>Smart TV</option>
                  <option>Gaming Products</option>
                  <option>Home & Office Electronics</option>
                  <option>Other</option>
                </select>
              </div>
              <div>
                <label className="block text-xs text-gray-500 uppercase tracking-wide mb-1.5">Message / Requirements</label>
                <textarea
                  name="message" value={form.message} onChange={handle} rows={4}
                  className="w-full bg-[#0A0A0A] border border-[#1F1F1F] rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-[#D4AF37] transition-colors resize-none"
                  placeholder="Tell us about your needs, home size, current electricity bill, etc."
                />
              </div>
              {status === "error" && (
                <p className="text-red-400 text-sm">Something went wrong. Please try WhatsApp instead.</p>
              )}
              <button
                type="submit"
                disabled={status === "loading"}
                className="btn-gold w-full py-4 rounded-xl font-bold text-base disabled:opacity-60"
              >
                {status === "loading" ? "Sending..." : "Send Quote Request"}
              </button>
              <p className="text-center text-xs text-gray-600">
                Or chat instantly on{" "}
                <a href="https://wa.me/27848961782" target="_blank" rel="noopener noreferrer" className="text-green-400 hover:underline">
                  WhatsApp
                </a>
              </p>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
