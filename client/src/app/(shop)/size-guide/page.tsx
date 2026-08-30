import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Size Guide',
  description: 'Find your perfect sneaker size with the Bevans Sons size guide. UK, US, EU and CM conversions.',
}

const sizes = [
  { uk: '6',   us: '7',    eu: '39',  cm: '24.5' },
  { uk: '7',   us: '8',    eu: '41',  cm: '25.5' },
  { uk: '8',   us: '9',    eu: '42',  cm: '26.5' },
  { uk: '9',   us: '10',   eu: '43',  cm: '27.5' },
  { uk: '10',  us: '11',   eu: '44',  cm: '28.5' },
  { uk: '11',  us: '12',   eu: '45',  cm: '29.5' },
]

const womenSizes = [
  { uk: '3',   us: '5',   eu: '36',  cm: '22.5' },
  { uk: '4',   us: '6',   eu: '37',  cm: '23.5' },
  { uk: '5',   us: '7',   eu: '38',  cm: '24.0' },
  { uk: '6',   us: '8',   eu: '39',  cm: '24.5' },
  { uk: '7',   us: '9',   eu: '40',  cm: '25.5' },
  { uk: '8',   us: '10',  eu: '41',  cm: '26.0' },
]

export default function SizeGuidePage() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-20">
      <div className="text-center mb-12">
        <p className="text-[11px] font-semibold tracking-[0.2em] uppercase text-brand-gold mb-3">Fit Guide</p>
        <h1 className="font-bebas text-6xl text-brand-black mb-4 uppercase">Size Guide</h1>
        <p className="text-brand-muted text-sm max-w-lg mx-auto">
          Use the charts below to find your correct size. When in doubt, size up — most sneakers run true to size.
        </p>
      </div>

      {/* How to measure */}
      <div className="bg-brand-light border border-brand-mid p-8 mb-10">
        <h2 className="font-bebas text-2xl uppercase tracking-wide text-brand-black mb-4">How to Measure Your Foot</h2>
        <ol className="space-y-2 text-sm text-brand-muted list-decimal list-inside">
          <li>Place a piece of paper on a flat hard floor and stand on it with your heel against a wall.</li>
          <li>Mark the tip of your longest toe on the paper.</li>
          <li>Measure the distance from the wall to the mark in centimetres.</li>
          <li>Use the CM column in the chart below to find your size.</li>
        </ol>
        <p className="text-xs text-brand-muted mt-4 italic">Measure both feet and use the larger measurement to find your size.</p>
      </div>

      {/* Men's table */}
      <div className="mb-10">
        <h2 className="font-bebas text-2xl uppercase tracking-wide text-brand-black mb-4">Men&apos;s Sizing</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-brand-black text-white">
                {['UK', 'US', 'EU', 'CM'].map(h => (
                  <th key={h} className="px-6 py-3 text-[11px] font-bold tracking-[0.15em] uppercase text-left">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-brand-mid">
              {sizes.map((r, i) => (
                <tr key={r.uk} className={i % 2 === 0 ? 'bg-white' : 'bg-brand-light'}>
                  <td className="px-6 py-3 font-bold text-brand-black">{r.uk}</td>
                  <td className="px-6 py-3 text-brand-muted">{r.us}</td>
                  <td className="px-6 py-3 text-brand-muted">{r.eu}</td>
                  <td className="px-6 py-3 text-brand-muted">{r.cm}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Women's table */}
      <div className="mb-10">
        <h2 className="font-bebas text-2xl uppercase tracking-wide text-brand-black mb-4">Women&apos;s Sizing</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-brand-black text-white">
                {['UK', 'US', 'EU', 'CM'].map(h => (
                  <th key={h} className="px-6 py-3 text-[11px] font-bold tracking-[0.15em] uppercase text-left">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-brand-mid">
              {womenSizes.map((r, i) => (
                <tr key={r.uk} className={i % 2 === 0 ? 'bg-white' : 'bg-brand-light'}>
                  <td className="px-6 py-3 font-bold text-brand-black">{r.uk}</td>
                  <td className="px-6 py-3 text-brand-muted">{r.us}</td>
                  <td className="px-6 py-3 text-brand-muted">{r.eu}</td>
                  <td className="px-6 py-3 text-brand-muted">{r.cm}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Tips */}
      <div className="bg-brand-light border border-brand-mid p-8 mb-10">
        <h2 className="font-bebas text-2xl uppercase tracking-wide text-brand-black mb-4">Sizing Tips</h2>
        <ul className="space-y-2 text-sm text-brand-muted list-disc list-inside">
          <li>Nike generally runs true to size. Half sizes available — if between sizes, size up.</li>
          <li>Adidas Ultraboost runs slightly large — consider sizing down half a size.</li>
          <li>Jordan 1s run true to size for most people.</li>
          <li>New Balance 990s run true to size.</li>
          <li>Converse Chuck Taylors tend to run large — size down half a size.</li>
        </ul>
      </div>

      <div className="text-center">
        <p className="text-brand-muted text-sm mb-6">Still not sure about your size?</p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a href="https://wa.me/27724816274" target="_blank" rel="noopener noreferrer"
            className="bg-brand-black text-white px-8 py-3.5 text-[11px] font-bold tracking-[0.18em] uppercase hover:bg-brand-dark transition-colors">
            Ask Us on WhatsApp
          </a>
          <Link href="/products"
            className="border border-brand-black text-brand-black px-8 py-3.5 text-[11px] font-bold tracking-[0.18em] uppercase hover:bg-brand-black hover:text-white transition-colors">
            Shop All Sneakers
          </Link>
        </div>
      </div>
    </div>
  )
}
