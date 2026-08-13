import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Frequently Asked Questions — Solar & Electronics | Daisy & Co.",
  description: "Answers to the most common questions about solar systems, installation, delivery, warranty, inverters, batteries and electronics at Daisy & Co.",
};

const sections = [
  {
    title: "Solar Systems",
    faqs: [
      {
        q: "What solar system do I need?",
        a: "It depends on your home size, monthly electricity bill, and what appliances you want to run. A 2–3 bedroom home with an R1,000–R2,000 monthly bill typically suits our Essential Home package (R67,500). A 3–5 bedroom home typically suits our Premium Home package (R98,000). Use our Solar Wizard for a personalised recommendation in under 2 minutes.",
      },
      {
        q: "Can solar reduce my electricity bill?",
        a: "Yes. Depending on your system size and usage, solar can reduce your Eskom bill by 50%–90%. Our Premium Home Solar package typically pays for itself in 3–4 years through bill savings.",
      },
      {
        q: "What happens during load-shedding with solar?",
        a: "With a hybrid inverter and battery, your home automatically switches to stored battery power when the grid goes down. You will not notice load-shedding at all for essential appliances. Depending on your battery capacity and load, a 200Ah battery can power a household for 12–18 hours.",
      },
      {
        q: "Can I add more batteries later?",
        a: "Yes. Our hybrid inverters are designed to be expandable. You can start with one battery and add more as your needs or budget grows. This is one reason we recommend hybrid systems over off-grid systems.",
      },
      {
        q: "How long do solar panels last?",
        a: "Our solar panels carry a 25-year output warranty. After 25 years, panels typically still produce at least 80% of their original capacity. The average panel lifespan is 30+ years.",
      },
      {
        q: "Can solar run my geyser?",
        a: "Yes. Our Premium Home and Business Home Pro packages are designed to handle high-draw appliances including geysers (3kW). An Essential Home package can run a geyser but will deplete the battery faster. We recommend using a solar diversion controller or timer with the geyser.",
      },
      {
        q: "Do I need council or municipality approval for solar?",
        a: "For grid-tied systems above 1kW, South African municipalities require registration and a Certificate of Compliance (COC). We handle this process for you as part of the installation.",
      },
    ],
  },
  {
    title: "Inverters & Batteries",
    faqs: [
      {
        q: "Which inverter should I choose?",
        a: "For most homes, a 5kW or 8kW hybrid inverter is ideal. A 5kW handles essential loads (lights, fridge, TV, router, computer). An 8kW handles full household loads including a geyser and washing machine. Three-phase inverters (20kW+) are for large homes and businesses.",
      },
      {
        q: "What is the difference between a hybrid inverter and a normal inverter?",
        a: "A hybrid inverter can work with solar panels, battery storage, AND the grid simultaneously. A normal (off-grid) inverter only works with battery and solar. Hybrid inverters are more flexible — you stay connected to the grid when needed and use solar/battery when available.",
      },
      {
        q: "Which battery should I choose?",
        a: "We recommend lithium batteries over lead-acid for solar storage. Our 100Ah lithium battery (5.12kWh) is suitable for 6–10 hours of essential appliance backup. Our 200Ah battery (10.24kWh) provides 12–18 hours and is best for full household coverage.",
      },
      {
        q: "How long do lithium batteries last?",
        a: "Our lithium batteries are rated for 6,000+ charge cycles. At one full cycle per day, that is over 16 years of daily use. Lithium batteries maintain consistent performance throughout their lifespan, unlike lead-acid batteries which degrade significantly after 2–3 years.",
      },
      {
        q: "Can I run my house entirely off-grid?",
        a: "Yes, with the right system size. Our Business Home Pro package (20kW inverter + 400Ah battery storage) can power large homes independently. For full off-grid capability, we assess your exact consumption and configure accordingly.",
      },
    ],
  },
  {
    title: "Pricing & Quotes",
    faqs: [
      {
        q: "How much does solar cost in South Africa?",
        a: "Our packages start at R67,500 (Essential Home) and go up to R264,000 (Business Home Pro). Inverter-only backup systems start from R18,000. Commercial systems are custom-priced from R198,400. All prices include standard installation.",
      },
      {
        q: "What is included in the price?",
        a: "All our solar packages include: the inverter, solar panels, battery, mounting structure, cabling, and standard installation. You will not receive a bill with hidden extras. Unusual installation requirements (very long cable runs, difficult roof access, etc.) may incur additional charges — we advise upfront.",
      },
      {
        q: "Do you offer payment plans or financing?",
        a: "We are working on financing options. Contact us on WhatsApp to discuss payment arrangements. Some customers use personal loans or home equity loans to finance their systems, which still results in net savings once monthly Eskom bills are reduced.",
      },
      {
        q: "How do I get an official quote?",
        a: "You can get an estimated quote using our Solar Wizard in under 2 minutes. For an official, binding quote, submit your details via the wizard or contact us directly on WhatsApp. We will assess your requirements and send you a formal quote.",
      },
    ],
  },
  {
    title: "Installation & Delivery",
    faqs: [
      {
        q: "Do you install?",
        a: "Yes. We supply and install across all 9 provinces of South Africa. Our installation teams are qualified and we handle all paperwork including the Certificate of Compliance (COC) required for grid-tied systems.",
      },
      {
        q: "Do you deliver nationwide?",
        a: "Yes. We deliver to all 9 provinces of South Africa. Electronics and accessories are delivered via courier. Solar systems are typically delivered and installed by our installation teams.",
      },
      {
        q: "How long does installation take?",
        a: "A standard residential installation takes 1–2 days. Large commercial systems may take 3–5 days. We will give you a specific timeline when booking your installation.",
      },
      {
        q: "What happens during the site assessment?",
        a: "For solar systems, we assess your roof type and orientation, available space, electrical panel, current consumption, and any obstructions (trees, neighbouring buildings). This allows us to design the optimal system layout and confirm pricing.",
      },
      {
        q: "How long does delivery take for electronics?",
        a: "Electronics ship within 1–3 business days of payment confirmation. Delivery takes 2–5 business days depending on your province. We use reliable courier partners and provide tracking information.",
      },
    ],
  },
  {
    title: "Warranty & Support",
    faqs: [
      {
        q: "What warranty do you provide?",
        a: "All products carry full manufacturer warranties. Solar panels: 25-year output warranty + 10-year product warranty. Inverters: 5–10 years (depending on model). Lithium batteries: 5–10 years (6,000+ cycles). Electronics: standard manufacturer warranty. We handle all warranty claims on your behalf.",
      },
      {
        q: "What after-sales support do you offer?",
        a: "We provide WhatsApp support for questions, troubleshooting, and after-sales assistance. Our team is available to help you get the most from your system. For technical issues, we coordinate with manufacturers and installers on your behalf.",
      },
      {
        q: "What if something stops working?",
        a: "Contact us immediately on WhatsApp. We will guide you through basic troubleshooting and, if necessary, arrange a technician visit or facilitate a warranty claim with the manufacturer. We do not disappear after the sale.",
      },
    ],
  },
  {
    title: "Electronics",
    faqs: [
      {
        q: "Are your electronics genuine / original products?",
        a: "Yes. We only stock certified, quality-tested products from reputable brands. All electronics come with full manufacturer packaging, documentation, and warranty.",
      },
      {
        q: "Can I return a product if I'm not satisfied?",
        a: "Electronics can be returned within 7 days if they are in original, unused condition with all packaging. Faulty products are replaced or refunded per the manufacturer warranty. Contact us on WhatsApp to arrange a return.",
      },
      {
        q: "Do you stock specific brands?",
        a: "We stock a curated range of premium brands. If you are looking for a specific brand or model not listed, contact us on WhatsApp — we can often source it for you.",
      },
    ],
  },
];

export default function FaqPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10">
      {/* Header */}
      <div className="text-center mb-8">
        <p className="section-label mb-3">Help Centre</p>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white mb-3">
          Frequently Asked <span className="gold-text">Questions</span>
        </h1>
        <p className="text-gray-400 max-w-xl mx-auto text-sm leading-relaxed">
          Answers to the most common questions. If you don't find what you need, chat with us on WhatsApp.
        </p>
      </div>

      {/* Quick links */}
      <div className="flex flex-wrap gap-2 justify-center mb-8">
        {sections.map((s) => (
          <a
            key={s.title}
            href={`#${s.title.toLowerCase().replace(/[^a-z]+/g, "-")}`}
            className="text-sm px-4 py-2 rounded-full border border-[#1F1F1F] text-gray-400 hover:border-[#D4AF37]/50 hover:text-[#D4AF37] transition-colors"
          >
            {s.title}
          </a>
        ))}
      </div>

      {/* FAQ sections */}
      <div className="space-y-8">
        {sections.map((section) => (
          <section key={section.title} id={section.title.toLowerCase().replace(/[^a-z]+/g, "-")}>
            <div className="flex items-center gap-4 mb-5">
              <h2 className="text-lg font-bold text-white whitespace-nowrap">{section.title}</h2>
              <div className="flex-1 h-px bg-[#1F1F1F]" />
            </div>
            <div className="space-y-3">
              {section.faqs.map((faq) => (
                <div key={faq.q} className="bg-[#111111] border border-[#1F1F1F] rounded-xl p-4">
                  <h3 className="text-white font-semibold text-sm mb-2 leading-snug">{faq.q}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed">{faq.a}</p>
                </div>
              ))}
            </div>
          </section>
        ))}
      </div>

      {/* Still have questions CTA */}
      <div className="mt-10 bg-[#111111] border border-[#D4AF37]/25 rounded-2xl p-7 text-center">
        <h3 className="text-xl font-bold text-white mb-2">Still have a question?</h3>
        <p className="text-gray-400 mb-5 max-w-md mx-auto leading-relaxed text-sm">
          Our team is available on WhatsApp to answer any question about solar, electronics, or your specific requirements.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a href="https://wa.me/27848961782" target="_blank" rel="noopener noreferrer"
            className="btn-gold px-8 py-3.5 rounded-xl font-bold">
            Chat on WhatsApp
          </a>
          <Link href="/solar/wizard" className="btn-outline px-8 py-3.5 rounded-xl font-bold">
            Take the Solar Wizard
          </Link>
        </div>
      </div>
    </div>
  );
}
