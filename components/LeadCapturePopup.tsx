"use client";
import { useEffect, useState } from "react";
import { X } from "lucide-react";

const STORAGE_KEY = "daisy_visitor_id";
const CAPTURED_KEY = "daisy_lead_captured";
const DISMISS_KEY  = "daisy_lead_dismissed";
const DELAY_MS     = 8000; // show after 8 seconds
const SUPPRESS_DAYS = 30;

function getVisitorId(): string {
  let id = localStorage.getItem(STORAGE_KEY);
  if (!id) {
    id = crypto.randomUUID();
    localStorage.setItem(STORAGE_KEY, id);
  }
  return id;
}

function isSuppressed(): boolean {
  const val = localStorage.getItem(DISMISS_KEY) ?? localStorage.getItem(CAPTURED_KEY);
  if (!val) return false;
  return Date.now() - parseInt(val, 10) < SUPPRESS_DAYS * 86400 * 1000;
}

export default function LeadCapturePopup() {
  const [show, setShow] = useState(false);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (isSuppressed()) return;
    const t = setTimeout(() => setShow(true), DELAY_MS);
    return () => clearTimeout(t);
  }, []);

  function dismiss() {
    localStorage.setItem(DISMISS_KEY, String(Date.now()));
    setShow(false);
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!phone && !email) return;
    setLoading(true);
    const visitorId = getVisitorId();
    try {
      await fetch("/api/track/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ visitorId, name, phone, email }),
      });
      localStorage.setItem(CAPTURED_KEY, String(Date.now()));
      // Store contact in localStorage so cart events can include it
      localStorage.setItem("daisy_visitor_name", name);
      localStorage.setItem("daisy_visitor_phone", phone);
      localStorage.setItem("daisy_visitor_email", email);
    } catch { /* non-fatal */ }
    setDone(true);
    setTimeout(() => setShow(false), 2000);
  }

  if (!show) return null;

  return (
    <div className="fixed inset-0 z-[200] flex items-end sm:items-center justify-center p-4" style={{ background: "rgba(0,0,0,0.7)", backdropFilter: "blur(4px)" }}>
      <div
        className="relative w-full max-w-md rounded-2xl overflow-hidden"
        style={{ background: "#0f0f0f", border: "1px solid rgba(212,175,55,0.25)", boxShadow: "0 24px 64px rgba(0,0,0,0.8)" }}
      >
        {/* Gold top bar */}
        <div style={{ height: 3, background: "linear-gradient(90deg, #D4AF37, #f5d76e, #D4AF37)" }} />

        <div className="p-6">
          <button
            onClick={dismiss}
            className="absolute top-5 right-5 w-7 h-7 rounded-lg flex items-center justify-center text-gray-500 hover:text-white transition-colors"
          >
            <X size={16} />
          </button>

          {done ? (
            <div className="py-6 text-center">
              <div className="text-3xl mb-3">🎉</div>
              <p className="text-white font-bold text-lg">Thanks, {name || "friend"}!</p>
              <p className="text-gray-400 text-sm mt-1">We&apos;ll be in touch with exclusive deals.</p>
            </div>
          ) : (
            <>
              <div className="mb-5">
                <p className="text-xs font-bold tracking-widest text-[#D4AF37] uppercase mb-1">Special Offer</p>
                <h2 className="text-white font-bold text-xl leading-snug">Get exclusive deals &amp; cart assistance</h2>
                <p className="text-gray-400 text-sm mt-1.5">
                  Leave your number and we&apos;ll help you find the best price and check stock — no spam, ever.
                </p>
              </div>

              <form onSubmit={submit} className="space-y-3">
                <input
                  type="text"
                  placeholder="Your name (optional)"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-[#1a1a1a] border border-[#2a2a2a] rounded-xl px-4 py-3 text-white text-sm placeholder-gray-600 focus:outline-none focus:border-[#D4AF37] transition-colors"
                />
                <input
                  type="tel"
                  placeholder="WhatsApp / phone number *"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full bg-[#1a1a1a] border border-[#2a2a2a] rounded-xl px-4 py-3 text-white text-sm placeholder-gray-600 focus:outline-none focus:border-[#D4AF37] transition-colors"
                />
                <input
                  type="email"
                  placeholder="Email (optional)"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-[#1a1a1a] border border-[#2a2a2a] rounded-xl px-4 py-3 text-white text-sm placeholder-gray-600 focus:outline-none focus:border-[#D4AF37] transition-colors"
                />

                <button
                  type="submit"
                  disabled={loading || (!phone && !email)}
                  className="w-full py-3.5 rounded-xl font-bold text-sm text-[#0A0A0A] transition-opacity disabled:opacity-40"
                  style={{ background: "linear-gradient(135deg, #D4AF37, #f5d76e)" }}
                >
                  {loading ? "Saving..." : "Yes, keep me in the loop"}
                </button>

                <button type="button" onClick={dismiss} className="w-full text-center text-xs text-gray-600 hover:text-gray-400 transition-colors py-1">
                  No thanks
                </button>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
