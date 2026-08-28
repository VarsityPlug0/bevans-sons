import type { Metadata } from "next";
import { BRAND } from "@/lib/config";

export const metadata: Metadata = {
  title: `Size Guide | ${BRAND.name}`,
  description: "Find your perfect fit with our comprehensive size guide for men's and women's clothing.",
  alternates: { canonical: `${BRAND.domain}/size-guide` },
};

const MEN_TOPS = [
  { size: "XS", chest: "86–91", waist: "71–76", length: "68" },
  { size: "S",  chest: "91–96", waist: "76–81", length: "70" },
  { size: "M",  chest: "96–101", waist: "81–86", length: "72" },
  { size: "L",  chest: "101–106", waist: "86–91", length: "74" },
  { size: "XL", chest: "106–111", waist: "91–96", length: "76" },
  { size: "2XL", chest: "111–116", waist: "96–101", length: "78" },
];

const WOMEN_TOPS = [
  { size: "XS", chest: "79–84", waist: "61–66", length: "60" },
  { size: "S",  chest: "84–89", waist: "66–71", length: "62" },
  { size: "M",  chest: "89–94", waist: "71–76", length: "64" },
  { size: "L",  chest: "94–99", waist: "76–81", length: "66" },
  { size: "XL", chest: "99–104", waist: "81–86", length: "68" },
  { size: "2XL", chest: "104–110", waist: "86–92", length: "70" },
];

const BOTTOMS = [
  { size: "XS", waist: "66–71", hips: "86–91", inseam: "76" },
  { size: "S",  waist: "71–76", hips: "91–96", inseam: "77" },
  { size: "M",  waist: "76–81", hips: "96–101", inseam: "78" },
  { size: "L",  waist: "81–86", hips: "101–106", inseam: "79" },
  { size: "XL", waist: "86–91", hips: "106–111", inseam: "80" },
  { size: "2XL", waist: "91–97", hips: "111–117", inseam: "81" },
];

function SizeTable({ headers, rows }: { headers: string[]; rows: string[][] }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-[#2a2a2a]">
            {headers.map((h) => (
              <th key={h} className="py-3 px-4 text-left text-gray-400 font-semibold text-xs uppercase tracking-wider">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-[#1a1a1a]">
          {rows.map((row) => (
            <tr key={row[0]} className="hover:bg-[#111111] transition-colors">
              {row.map((cell, i) => (
                <td key={i} className={`py-3 px-4 text-sm ${i === 0 ? "font-bold text-white" : "text-gray-300"}`}>
                  {i > 0 ? `${cell} cm` : cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default function SizeGuidePage() {
  return (
    <div className="min-h-screen py-12 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto">

        {/* Header */}
        <div className="text-center mb-12">
          <p className="section-label mb-3">Fit Finder</p>
          <h1
            className="text-4xl font-bold text-white mb-4"
            style={{ fontFamily: "var(--font-playfair)" }}
          >
            Size Guide
          </h1>
          <p className="text-gray-400 max-w-xl mx-auto">
            All measurements are in centimetres (cm). If you&apos;re between sizes, we recommend sizing up for a relaxed fit.
          </p>
        </div>

        {/* How to measure */}
        <div className="bg-[#111111] border border-[#1F1F1F] rounded-2xl p-6 mb-8">
          <h2 className="text-lg font-bold text-white mb-4">How to Measure</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              { label: "Chest", tip: "Measure around the fullest part of your chest, keeping the tape horizontal." },
              { label: "Waist", tip: "Measure around your natural waistline, about 2.5 cm above your belly button." },
              { label: "Hips", tip: "Stand with feet together and measure around the fullest part of your hips." },
            ].map(({ label, tip }) => (
              <div key={label} className="bg-[#0A0A0A] rounded-xl p-4">
                <p className="text-white font-semibold mb-2">{label}</p>
                <p className="text-gray-500 text-sm leading-relaxed">{tip}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Men's tops */}
        <div className="bg-[#111111] border border-[#1F1F1F] rounded-2xl overflow-hidden mb-5">
          <div className="px-6 py-4 border-b border-[#1F1F1F]">
            <h2 className="text-base font-bold text-white">Men&apos;s Tops &amp; Hoodies</h2>
          </div>
          <SizeTable
            headers={["Size", "Chest", "Waist", "Length"]}
            rows={MEN_TOPS.map((r) => [r.size, r.chest, r.waist, r.length])}
          />
        </div>

        {/* Women's tops */}
        <div className="bg-[#111111] border border-[#1F1F1F] rounded-2xl overflow-hidden mb-5">
          <div className="px-6 py-4 border-b border-[#1F1F1F]">
            <h2 className="text-base font-bold text-white">Women&apos;s Tops &amp; Hoodies</h2>
          </div>
          <SizeTable
            headers={["Size", "Chest", "Waist", "Length"]}
            rows={WOMEN_TOPS.map((r) => [r.size, r.chest, r.waist, r.length])}
          />
        </div>

        {/* Bottoms */}
        <div className="bg-[#111111] border border-[#1F1F1F] rounded-2xl overflow-hidden mb-8">
          <div className="px-6 py-4 border-b border-[#1F1F1F]">
            <h2 className="text-base font-bold text-white">Pants, Shorts &amp; Skirts</h2>
          </div>
          <SizeTable
            headers={["Size", "Waist", "Hips", "Inseam"]}
            rows={BOTTOMS.map((r) => [r.size, r.waist, r.hips, r.inseam])}
          />
        </div>

        {/* Footwear */}
        <div className="bg-[#111111] border border-[#1F1F1F] rounded-2xl overflow-hidden mb-8">
          <div className="px-6 py-4 border-b border-[#1F1F1F]">
            <h2 className="text-base font-bold text-white">Footwear (Sneakers)</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-[#2a2a2a]">
                  {["UK", "EU", "US (Men)", "US (Women)", "cm"].map((h) => (
                    <th key={h} className="py-3 px-4 text-left text-gray-400 font-semibold text-xs uppercase tracking-wider">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-[#1a1a1a]">
                {[
                  ["UK 5", "38", "6", "7", "24.0"],
                  ["UK 6", "39", "7", "8", "24.8"],
                  ["UK 7", "40–41", "8", "9", "25.7"],
                  ["UK 8", "42", "9", "10", "26.5"],
                  ["UK 9", "43", "10", "11", "27.3"],
                  ["UK 10", "44", "11", "12", "28.0"],
                  ["UK 11", "45–46", "12", "13", "28.8"],
                ].map((row) => (
                  <tr key={row[0]} className="hover:bg-[#111111] transition-colors">
                    {row.map((cell, i) => (
                      <td key={i} className={`py-3 px-4 text-sm ${i === 0 ? "font-bold text-white" : "text-gray-300"}`}>{cell}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Note */}
        <div className="bg-[#0A0A0A] border border-[#1F1F1F] rounded-2xl p-6 text-center">
          <p className="text-gray-400 text-sm leading-relaxed">
            Still unsure about your size? Chat with us on WhatsApp and we&apos;ll help you find the perfect fit.
          </p>
          {process.env.NEXT_PUBLIC_WHATSAPP && (
            <a
              href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP.replace(/\D/g, "")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block mt-4 btn-primary px-6 py-2.5 rounded-xl text-sm font-bold"
            >
              Chat on WhatsApp
            </a>
          )}
        </div>

      </div>
    </div>
  );
}
