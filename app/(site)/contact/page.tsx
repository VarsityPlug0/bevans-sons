"use client";

import { useState } from "react";
import { Mail, Phone, MessageCircle, Send } from "lucide-react";
import { BRAND } from "@/lib/config";

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      setStatus(res.ok ? "sent" : "error");
    } catch {
      setStatus("error");
    }
  }

  return (
    <div className="min-h-screen py-16">
      <div className="max-w-5xl mx-auto px-4 sm:px-8">
        {/* Header */}
        <div className="mb-12 text-center">
          <p className="text-[#D4AF37] text-xs uppercase tracking-widest font-bold mb-3">Get in Touch</p>
          <h1 className="text-4xl font-black text-white mb-4">Contact Us</h1>
          <p className="text-gray-400 text-sm max-w-md mx-auto">
            Questions about an order, sizing help, or a custom enquiry? We respond fast — usually within a few hours.
          </p>
        </div>

        <div className="grid lg:grid-cols-5 gap-10">
          {/* Contact Info */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-[#111111] border border-[#1F1F1F] rounded-2xl p-6 space-y-5">
              <h2 className="text-lg font-bold text-white">Contact Details</h2>

              <a href={`mailto:${BRAND.email}`}
                className="flex items-start gap-4 group">
                <div className="w-10 h-10 rounded-xl bg-[#D4AF37]/10 flex items-center justify-center shrink-0 group-hover:bg-[#D4AF37]/20 transition-colors">
                  <Mail size={18} className="text-[#D4AF37]" />
                </div>
                <div>
                  <p className="text-xs text-gray-500 uppercase tracking-wider font-bold mb-0.5">Email</p>
                  <p className="text-sm text-white group-hover:text-[#D4AF37] transition-colors">{BRAND.email}</p>
                </div>
              </a>

              <a href={`tel:${BRAND.phone}`}
                className="flex items-start gap-4 group">
                <div className="w-10 h-10 rounded-xl bg-[#D4AF37]/10 flex items-center justify-center shrink-0 group-hover:bg-[#D4AF37]/20 transition-colors">
                  <Phone size={18} className="text-[#D4AF37]" />
                </div>
                <div>
                  <p className="text-xs text-gray-500 uppercase tracking-wider font-bold mb-0.5">Phone</p>
                  <p className="text-sm text-white group-hover:text-[#D4AF37] transition-colors">{BRAND.phone}</p>
                </div>
              </a>

              <a href={`https://wa.me/${BRAND.whatsapp}?text=Hi%20Bevans%20Sons,%20I%20have%20an%20enquiry.`}
                target="_blank" rel="noopener noreferrer"
                className="flex items-start gap-4 group">
                <div className="w-10 h-10 rounded-xl bg-[#D4AF37]/10 flex items-center justify-center shrink-0 group-hover:bg-[#D4AF37]/20 transition-colors">
                  <MessageCircle size={18} className="text-[#D4AF37]" />
                </div>
                <div>
                  <p className="text-xs text-gray-500 uppercase tracking-wider font-bold mb-0.5">WhatsApp</p>
                  <p className="text-sm text-white group-hover:text-[#D4AF37] transition-colors">+{BRAND.whatsapp}</p>
                </div>
              </a>
            </div>

            <a
              href={`https://wa.me/${BRAND.whatsapp}?text=Hi%20Bevans%20Sons,%20I%20have%20an%20enquiry.`}
              target="_blank" rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full bg-[#25D366] text-white font-bold text-sm px-6 py-3.5 rounded-xl hover:bg-[#22c35e] transition-colors">
              <MessageCircle size={16} /> Chat on WhatsApp
            </a>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-3">
            <div className="bg-[#111111] border border-[#1F1F1F] rounded-2xl p-6 sm:p-8">
              <h2 className="text-lg font-bold text-white mb-6">Send a Message</h2>

              {status === "sent" ? (
                <div className="text-center py-10 space-y-3">
                  <div className="w-14 h-14 rounded-full bg-green-500/10 flex items-center justify-center mx-auto">
                    <Send size={24} className="text-green-400" />
                  </div>
                  <h3 className="text-lg font-bold text-white">Message sent!</h3>
                  <p className="text-sm text-gray-400">We&apos;ll get back to you within a few hours.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div>
                    <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Name</label>
                    <input
                      type="text" required
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      className="w-full bg-[#0A0A0A] border border-[#2a2a2a] text-white rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#D4AF37] transition-colors"
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Email</label>
                    <input
                      type="email" required
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      className="w-full bg-[#0A0A0A] border border-[#2a2a2a] text-white rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#D4AF37] transition-colors"
                      placeholder="your@email.com"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Message</label>
                    <textarea
                      required rows={5}
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      className="w-full bg-[#0A0A0A] border border-[#2a2a2a] text-white rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#D4AF37] transition-colors resize-none"
                      placeholder="How can we help you?"
                    />
                  </div>
                  {status === "error" && (
                    <p className="text-red-400 text-xs">Something went wrong. Please try WhatsApp instead.</p>
                  )}
                  <button
                    type="submit"
                    disabled={status === "sending"}
                    className="w-full btn-primary py-3.5 rounded-xl font-bold text-sm flex items-center justify-center gap-2 disabled:opacity-60">
                    {status === "sending" ? "Sending..." : <><Send size={14} /> Send Message</>}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
