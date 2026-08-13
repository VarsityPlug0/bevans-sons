import { getProducts, getLeads } from "@/lib/products";
import { getQuotes } from "@/lib/quotes";
import { listOrders } from "@/lib/orders";
import Link from "next/link";
import Image from "next/image";
import AdminLogoutButton from "./LogoutButton";
import DeleteButton from "./DeleteButton";

export const dynamic = "force-dynamic";

export default async function Dashboard() {
  const products = getProducts();
  const leads = getLeads() as {
    id: string; name?: string; email?: string; phone?: string;
    message?: string; productInterest?: string; createdAt: string;
  }[];
  const quotes = getQuotes();
  const newQuotes = quotes.filter((q) => q.status === "new").length;
  const orders = listOrders();
  const pendingOrders = orders.filter(o => o.status === "pending" || o.status === "proof_submitted").length;
  const featured = products.filter((p) => p.featured).length;
  const inStock = products.filter((p) => p.inStock).length;

  return (
    <div className="min-h-screen bg-[#0A0A0A]">
      {/* Top bar */}
      <header className="bg-[#0f0f0f] border-b border-[#1A1A1A] px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <svg width="32" height="32" viewBox="0 0 100 100" fill="none">
            {[0,45,90,135,180,225,270,315].map((deg) => (
              <ellipse key={deg} cx="50" cy="22" rx="9" ry="18" fill="#D4AF37" transform={`rotate(${deg} 50 50)`} />
            ))}
            <circle cx="50" cy="50" r="14" fill="#D4AF37" />
            <circle cx="50" cy="50" r="8" fill="#0A0A0A" />
          </svg>
          <div>
            <p style={{ fontFamily: "var(--font-outfit)", fontWeight: 700, color: "#D4AF37", fontSize: 16 }}>Daisy & Co.</p>
            <p className="text-gray-600 text-xs">Staff Dashboard</p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <Link href="/admin/dashboard/images" className="text-gray-400 hover:text-white text-sm transition-colors">
            Site Images
          </Link>
          <Link href="/admin/dashboard/orders" className="text-gray-400 hover:text-white text-sm transition-colors">
            Orders
          </Link>
          <Link href="/shop" target="_blank" className="text-gray-400 hover:text-white text-sm transition-colors">
            View Shop ↗
          </Link>
          <AdminLogoutButton />
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-6 py-10">
        {/* Stats */}
        <div className="grid grid-cols-5 gap-4 mb-10">
          {[
            { label: "Total Products", value: products.length, link: null },
            { label: "In Stock",       value: inStock,         link: null },
            { label: "Featured",       value: featured,        link: null },
            { label: "New Quotes",     value: newQuotes,       link: "/admin/dashboard/quotes" },
            { label: "Pending Orders", value: pendingOrders,   link: "/admin/dashboard/orders" },
            { label: "Leads",          value: leads.length,    link: null },
          ].map((s) => (
            <div key={s.label} className={`bg-[#111111] border rounded-2xl p-5 text-center ${s.link && s.value > 0 ? "border-[#D4AF37]/40 cursor-pointer" : "border-[#1F1F1F]"}`}>
              {s.link ? (
                <Link href={s.link}>
                  <p className="text-3xl font-bold text-[#D4AF37] mb-1">{s.value}</p>
                  <p className="text-gray-400 text-xs">{s.label}</p>
                </Link>
              ) : (
                <>
                  <p className="text-3xl font-bold text-[#D4AF37] mb-1">{s.value}</p>
                  <p className="text-gray-400 text-xs">{s.label}</p>
                </>
              )}
            </div>
          ))}
        </div>

        {/* Header row */}
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-xl font-bold text-white">Products</h1>
          <Link href="/admin/dashboard/new" className="btn-gold px-5 py-2.5 rounded-xl text-sm font-bold">
            + Add Product
          </Link>
        </div>

        {/* Product table */}
        {products.length === 0 ? (
          <div className="bg-[#111111] border border-[#1F1F1F] rounded-2xl p-16 text-center">
            <p className="text-gray-500 text-lg mb-6">No products yet.</p>
            <Link href="/admin/dashboard/new" className="btn-gold px-8 py-3 rounded-xl font-bold">
              Add Your First Product
            </Link>
          </div>
        ) : (
          <div className="bg-[#111111] border border-[#1F1F1F] rounded-2xl overflow-hidden">
            {/* Table head */}
            <div className="grid grid-cols-[60px_1fr_160px_180px_100px_120px] gap-4 px-5 py-3 border-b border-[#1F1F1F]">
              {["", "Product", "Price", "Category", "Status", "Actions"].map((h) => (
                <p key={h} className="text-xs text-gray-500 uppercase tracking-wider font-medium">{h}</p>
              ))}
            </div>

            {/* Rows */}
            {products.map((p) => (
              <div key={p.id}
                className="grid grid-cols-[60px_1fr_160px_180px_100px_120px] gap-4 items-center px-5 py-4 border-b border-[#1A1A1A] last:border-0 hover:bg-white/2 transition-colors">
                {/* Thumbnail */}
                <div className="w-12 h-12 rounded-xl overflow-hidden bg-[#0A0A0A] shrink-0">
                  {p.imageUrl ? (
                    <img src={p.imageUrl} alt={p.name} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-700 text-xs">–</div>
                  )}
                </div>

                {/* Name + description */}
                <div className="min-w-0">
                  <p className="text-white font-medium text-sm truncate">{p.name}</p>
                  {p.description && (
                    <p className="text-gray-500 text-xs truncate mt-0.5">{p.description}</p>
                  )}
                </div>

                {/* Price */}
                <p className="text-[#D4AF37] font-bold text-sm">{p.price}</p>

                {/* Category */}
                <p className="text-gray-400 text-sm truncate">{p.category}</p>

                {/* Status */}
                <div className="flex gap-1.5 flex-wrap">
                  <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${p.inStock ? "bg-green-400/10 text-green-400" : "bg-red-400/10 text-red-400"}`}>
                    {p.inStock ? "In Stock" : "Out of Stock"}
                  </span>
                  {p.featured && (
                    <span className="text-[10px] px-2 py-0.5 rounded-full font-medium bg-[#D4AF37]/10 text-[#D4AF37]">
                      Featured
                    </span>
                  )}
                </div>

                {/* Actions */}
                <div className="flex gap-2">
                  <Link href={`/admin/dashboard/edit/${p.id}`}
                    className="px-3 py-1.5 rounded-lg text-xs font-medium text-gray-300 hover:text-white bg-white/5 hover:bg-white/10 transition-colors">
                    Edit
                  </Link>
                  <DeleteButton id={p.id} />
                </div>
              </div>
            ))}
          </div>
        )}
        {/* Leads */}
        <div className="mt-14">
          <h2 className="text-xl font-bold text-white mb-6">Quote Requests & Leads</h2>
          {leads.length === 0 ? (
            <div className="bg-[#111111] border border-[#1F1F1F] rounded-2xl p-10 text-center text-gray-500">
              No leads yet. They appear here when someone submits the contact form.
            </div>
          ) : (
            <div className="bg-[#111111] border border-[#1F1F1F] rounded-2xl overflow-hidden">
              <div className="grid grid-cols-[1fr_160px_160px_1fr_140px] gap-4 px-5 py-3 border-b border-[#1F1F1F]">
                {["Name", "Email", "Phone", "Message", "Date"].map((h) => (
                  <p key={h} className="text-xs text-gray-500 uppercase tracking-wider font-medium">{h}</p>
                ))}
              </div>
              {leads.map((lead) => (
                <div key={lead.id}
                  className="grid grid-cols-[1fr_160px_160px_1fr_140px] gap-4 items-start px-5 py-4 border-b border-[#1A1A1A] last:border-0 hover:bg-white/2 transition-colors">
                  <p className="text-white text-sm font-medium truncate">{lead.name || "—"}</p>
                  <p className="text-gray-400 text-sm truncate">{lead.email || "—"}</p>
                  <p className="text-gray-400 text-sm truncate">{lead.phone || "—"}</p>
                  <p className="text-gray-400 text-sm line-clamp-2 leading-snug">{lead.message || lead.productInterest || "—"}</p>
                  <p className="text-gray-600 text-xs">{new Date(lead.createdAt).toLocaleDateString("en-ZA")}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

