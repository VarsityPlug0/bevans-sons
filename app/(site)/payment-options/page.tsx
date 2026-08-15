import type { Metadata } from "next";
import Link from "next/link";
import { Copy } from "lucide-react";

export const metadata: Metadata = {
  title: "Payment Options | Daisy Gadgets Co.",
  description: "We accept EFT, PayShap, Visa, Mastercard and all major South African bank payments. View our bank details and payment options.",
};

const bankDetails = [
  ["Bank",           "FNB / RMB"],
  ["Account Holder", "Daisy Gadgets Co."],
  ["Account Type",   "Business Cheque Account"],
  ["Account Number", "63211629332"],
  ["Branch Code",    "250655"],
  ["PayShap ID",     "+27848961782@FNB"],
  ["Reference",      "Your Name & Surname"],
];

export default function PaymentOptionsPage() {
  return (
    <div className="max-w-4xl mx-auto px-5 sm:px-8 py-20">

      <div className="text-center mb-14">
        <p className="section-label mb-3">How to Pay</p>
        <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4">
          Payment <span className="gold-text">Options</span>
        </h1>
        <p className="text-gray-400 text-lg max-w-xl mx-auto">
          We accept multiple payment methods for your convenience. All payments are secure.
        </p>
      </div>

      {/* Payment methods */}
      <div className="grid sm:grid-cols-2 gap-5 mb-12">
        {[
          { title: "EFT / Bank Transfer", desc: "Transfer directly to our FNB business account. Upload proof of payment and your order is processed within 2–4 hours.", badge: "Most Popular" },
          { title: "PayShap", desc: "Instant payment via PayShap using our registered PayShap ID: +27848961782@FNB. Instant confirmation.", badge: "Instant" },
          { title: "Visa & Mastercard", desc: "Card payments accepted via secure payment gateway. Contact us on WhatsApp to process a card payment.", badge: null },
          { title: "All SA Banks", desc: "We accept payments from all major South African banks including Standard Bank, ABSA, Nedbank, Capitec, and more.", badge: null },
        ].map(({ title, desc, badge }) => (
          <div key={title} className="bg-[#111111] border border-[#1F1F1F] rounded-2xl p-6">
            <div className="flex items-center gap-3 mb-3">
              <h3 style={{ fontFamily: "var(--font-outfit)", fontWeight: 700, fontSize: 15, color: "#fff" }}>{title}</h3>
              {badge && <span className="text-[9px] font-bold text-[#0A0A0A] bg-[#D4AF37] rounded-full px-2 py-0.5">{badge}</span>}
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">{desc}</p>
          </div>
        ))}
      </div>

      {/* Bank details */}
      <div className="bg-[#111111] border border-[#D4AF37]/20 rounded-2xl overflow-hidden mb-8">
        <div className="px-6 py-5 border-b border-[#1F1F1F]">
          <h2 className="text-lg font-bold text-white">Our Bank Details</h2>
          <p className="text-gray-500 text-sm mt-1">Use these details for EFT and bank transfers</p>
        </div>
        <div className="divide-y divide-[#1F1F1F]">
          {bankDetails.map(([label, value]) => (
            <div key={label} className="flex items-center justify-between px-6 py-4">
              <span className="text-gray-500 text-sm">{label}</span>
              <span className={`text-sm font-semibold ${
                label === "Account Number" || label === "PayShap ID" ? "text-[#D4AF37] font-mono" : "text-white"
              }`}>{value}</span>
            </div>
          ))}
        </div>
      </div>

      {/* How to pay steps */}
      <div className="mb-12">
        <h2 className="text-xl font-bold text-white mb-6">How to Pay via EFT</h2>
        <div className="space-y-4">
          {[
            ["Add to Enquiry",       "Browse our shop and add products to your enquiry list."],
            ["Checkout",               "Enter your details and place your order to receive your unique order reference."],
            ["Make Payment",         "Transfer the exact amount to our FNB account using your order reference as the payment reference."],
            ["Upload Proof",         "Upload your proof of payment on the checkout page. We verify and confirm within 2–4 hours."],
            ["We Confirm & Deliver", "Once payment is verified, we confirm your order and arrange delivery."],
          ].map(([step, desc], i) => (
            <div key={step as string} className="flex gap-4 items-start">
              <div className="w-8 h-8 rounded-full bg-[#D4AF37] text-black font-extrabold text-sm flex items-center justify-center shrink-0">{i + 1}</div>
              <div className="bg-[#111111] border border-[#1F1F1F] rounded-xl px-5 py-4 flex-1">
                <p style={{ fontFamily: "var(--font-outfit)", fontWeight: 700, fontSize: 14, color: "#fff", marginBottom: 4 }}>{step as string}</p>
                <p className="text-gray-400 text-sm">{desc as string}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-[#111111] border border-[#1F1F1F] rounded-2xl p-8 text-center">
        <h3 className="text-xl font-bold text-white mb-3">Questions about payment?</h3>
        <p className="text-gray-400 text-sm mb-6">Our team is happy to help you through the payment process.</p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a href="https://wa.me/27848961782" target="_blank" rel="noopener noreferrer" className="btn-gold px-8 py-3.5 rounded-xl font-bold">Chat on WhatsApp</a>
          <Link href="/shop" className="btn-outline px-8 py-3.5 rounded-xl font-bold">Start Shopping</Link>
        </div>
      </div>

    </div>
  );
}
