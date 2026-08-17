import { getProducts, getLeads } from "@/lib/products";
import { getQuotes } from "@/lib/quotes";
import { listOrders } from "@/lib/orders";
import Link from "next/link";
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

  const stats = [
    { label: "Products",       value: products.length, link: null },
    { label: "In Stock",       value: inStock,         link: null },
    { label: "Featured",       value: featured,        link: null },
    { label: "New Quotes",     value: newQuotes,       link: "/admin/dashboard/quotes" },
    { label: "Pending Orders", value: pendingOrders,   link: "/admin/dashboard/orders" },
    { label: "Leads",          value: leads.length,    link: "/admin/dashboard/leads" },
  ];

  // ── Analytics ──────────────────────────────────────────────────────────────
  const PAID = new Set(["approved", "shipped", "delivered"]);
  const paidOrders = orders.filter(o => PAID.has(o.status));
  const totalRevenue = paidOrders.reduce((s, o) => s + o.total, 0);
  const avgOrderValue = paidOrders.length ? Math.round(totalRevenue / paidOrders.length) : 0;

  // Weekly revenue — last 8 weeks (oldest → newest)
  const weeklyRevenue = Array.from({ length: 8 }, (_, wi) => {
    const now = new Date();
    const weekEnd = new Date(now);
    weekEnd.setDate(now.getDate() - wi * 7);
    weekEnd.setHours(23, 59, 59, 999);
    const weekStart = new Date(weekEnd);
    weekStart.setDate(weekEnd.getDate() - 6);
    weekStart.setHours(0, 0, 0, 0);
    const revenue = paidOrders
      .filter(o => { const d = new Date(o.createdAt); return d >= weekStart && d <= weekEnd; })
      .reduce((s, o) => s + o.total, 0);
    const label = weekStart.toLocaleDateString("en-ZA", { month: "short", day: "numeric" });
    return { label, revenue };
  }).reverse();
  const maxWeekRevenue = Math.max(...weeklyRevenue.map(w => w.revenue), 1);

  // Top 5 products by units sold
  const productStats = new Map<string, { name: string; qty: number; revenue: number }>();
  for (const order of paidOrders) {
    for (const item of order.items) {
      const unitPrice = parseFloat(String(item.price).replace(/[^0-9.]/g, "")) || 0;
      const prev = productStats.get(item.name) ?? { name: item.name, qty: 0, revenue: 0 };
      prev.qty  += item.qty;
      prev.revenue += unitPrice * item.qty;
      productStats.set(item.name, prev);
    }
  }
  const topProducts = [...productStats.values()].sort((a, b) => b.qty - a.qty).slice(0, 5);

  // Conversion funnel
  const totalOrders = orders.length;
  const withProof   = orders.filter(o => o.status !== "pending").length;
  const approvedN   = paidOrders.length;
  const deliveredN  = orders.filter(o => o.status === "delivered").length;
  const pct = (n: number) => totalOrders ? Math.round((n / totalOrders) * 100) : 0;

  return (
    <div className="min-h-screen bg-[#0A0A0A]">
      {/* Top bar */}
      <header className="bg-[#0f0f0f] border-b border-[#1A1A1A] px-4 sm:px-6 py-3 flex items-center justify-between gap-3">
        <div className="flex items-center gap-2.5 shrink-0">
          <svg width="28" height="28" viewBox="0 0 100 100" fill="none">
            {[0,45,90,135,180,225,270,315].map((deg) => (
              <ellipse key={deg} cx="50" cy="22" rx="9" ry="18" fill="#D4AF37" transform={`rotate(${deg} 50 50)`} />
            ))}
            <circle cx="50" cy="50" r="14" fill="#D4AF37" />
            <circle cx="50" cy="50" r="8" fill="#0A0A0A" />
          </svg>
          <div>
            <p style={{ fontFamily: "var(--font-outfit)", fontWeight: 700, color: "#D4AF37", fontSize: 14 }}>Daisy &amp; Co.</p>
            <p className="text-gray-600 text-[10px]">Staff Dashboard</p>
          </div>
        </div>

        {/* Desktop nav */}
        <nav className="hidden sm:flex items-center gap-4">
          <Link href="/admin/dashboard/images" className="text-gray-400 hover:text-white text-sm transition-colors">Site Images</Link>
          <Link href="/admin/dashboard/orders" className="text-gray-400 hover:text-white text-sm transition-colors">Orders</Link>
          <Link href="/admin/dashboard/customers" className="text-gray-400 hover:text-white text-sm transition-colors">Customers</Link>
          <Link href="/admin/dashboard/quotes" className="text-gray-400 hover:text-white text-sm transition-colors">Quotes</Link>
          <Link href="/admin/dashboard/leads" className="text-gray-400 hover:text-white text-sm transition-colors">Leads</Link>
          <Link href="/shop" target="_blank" className="text-gray-400 hover:text-white text-sm transition-colors">View Shop ↗</Link>
          <AdminLogoutButton />
        </nav>

        {/* Mobile: just orders + logout */}
        <div className="flex sm:hidden items-center gap-2">
          <Link href="/admin/dashboard/orders" className="text-gray-400 hover:text-white text-xs px-2.5 py-1.5 rounded-lg bg-white/5 transition-colors">Orders</Link>
          <AdminLogoutButton />
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 sm:py-10">

        {/* Stats — 3 cols mobile, 6 cols desktop */}
        <div className="grid grid-cols-3 lg:grid-cols-6 gap-3 mb-8">
          {stats.map((s) => (
            <div key={s.label} className={`bg-[#111111] border rounded-xl p-3 sm:p-4 text-center ${s.link && s.value > 0 ? "border-[#D4AF37]/40" : "border-[#1F1F1F]"}`}>
              {s.link ? (
                <Link href={s.link} className="block">
                  <p className="text-2xl sm:text-3xl font-bold text-[#D4AF37] mb-0.5">{s.value}</p>
                  <p className="text-gray-400 text-[10px] sm:text-xs leading-tight">{s.label}</p>
                </Link>
              ) : (
                <>
                  <p className="text-2xl sm:text-3xl font-bold text-[#D4AF37] mb-0.5">{s.value}</p>
                  <p className="text-gray-400 text-[10px] sm:text-xs leading-tight">{s.label}</p>
                </>
              )}
            </div>
          ))}
        </div>

        {/* ── Analytics ─────────────────────────────────────────────────── */}
        <div className="grid lg:grid-cols-3 gap-4 mb-8">

          {/* Revenue chart + avg order */}
          <div className="lg:col-span-2 bg-[#111111] border border-[#1F1F1F] rounded-2xl p-5">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-sm font-bold text-white">Weekly Revenue</h2>
              <p className="text-[#D4AF37] font-bold text-sm">R {totalRevenue.toLocaleString()}</p>
            </div>
            <div className="flex items-end gap-1.5 h-24">
              {weeklyRevenue.map(({ label, revenue }) => (
                <div key={label} className="flex-1 flex flex-col items-center gap-1 h-full justify-end">
                  <div
                    className="w-full rounded-t-sm"
                    style={{
                      height: revenue > 0 ? `${Math.max((revenue / maxWeekRevenue) * 100, 6)}%` : "3px",
                      background: revenue > 0 ? "#D4AF37" : "#1F1F1F",
                    }}
                  />
                  <span className="text-[8px] text-gray-600 whitespace-nowrap leading-none">{label}</span>
                </div>
              ))}
            </div>
            <div className="flex gap-6 mt-4 pt-3 border-t border-[#1F1F1F]">
              <div>
                <p className="text-[10px] text-gray-500 uppercase tracking-wider">Avg Order</p>
                <p className="text-white font-bold text-sm">R {avgOrderValue.toLocaleString()}</p>
              </div>
              <div>
                <p className="text-[10px] text-gray-500 uppercase tracking-wider">Paid Orders</p>
                <p className="text-white font-bold text-sm">{paidOrders.length}</p>
              </div>
              <div>
                <p className="text-[10px] text-gray-500 uppercase tracking-wider">Total Revenue</p>
                <p className="text-[#D4AF37] font-bold text-sm">R {totalRevenue.toLocaleString()}</p>
              </div>
            </div>
          </div>

          {/* Conversion funnel */}
          <div className="bg-[#111111] border border-[#1F1F1F] rounded-2xl p-5">
            <h2 className="text-sm font-bold text-white mb-4">Conversion Funnel</h2>
            <div className="space-y-3.5">
              {([
                { label: "Orders Placed",   value: totalOrders, p: 100,             color: "#9ca3af" },
                { label: "Proof Submitted", value: withProof,   p: pct(withProof),  color: "#f59e0b" },
                { label: "Approved",        value: approvedN,   p: pct(approvedN),  color: "#10b981" },
                { label: "Delivered",       value: deliveredN,  p: pct(deliveredN), color: "#D4AF37" },
              ] as { label: string; value: number; p: number; color: string }[]).map(({ label, value, p, color }) => (
                <div key={label}>
                  <div className="flex justify-between mb-1">
                    <span className="text-xs text-gray-400">{label}</span>
                    <span className="text-xs font-bold" style={{ color }}>
                      {value} <span className="text-gray-600 font-normal">({p}%)</span>
                    </span>
                  </div>
                  <div className="h-1.5 bg-[#1F1F1F] rounded-full overflow-hidden">
                    <div className="h-full rounded-full" style={{ width: `${p}%`, background: color }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Top selling products */}
        {topProducts.length > 0 && (
          <div className="bg-[#111111] border border-[#1F1F1F] rounded-2xl overflow-hidden mb-8">
            <div className="px-5 py-3.5 border-b border-[#1F1F1F]">
              <h2 className="text-sm font-bold text-white">Top Selling Products</h2>
            </div>
            <div className="divide-y divide-[#1A1A1A]">
              {topProducts.map((p, i) => (
                <div key={p.name} className="flex items-center gap-4 px-5 py-3">
                  <span className="text-gray-600 text-xs font-bold w-4 shrink-0">{i + 1}</span>
                  <p className="text-white text-sm flex-1 truncate">{p.name}</p>
                  <span className="text-gray-500 text-xs shrink-0">{p.qty} sold</span>
                  <span className="text-[#D4AF37] font-bold text-sm shrink-0">R {Math.round(p.revenue).toLocaleString()}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Mobile quick nav links */}
        <div className="flex sm:hidden gap-2 mb-6 flex-wrap">
          {[
            { label: "Site Images", href: "/admin/dashboard/images" },
            { label: "Customers",   href: "/admin/dashboard/customers" },
            { label: "Quotes",      href: "/admin/dashboard/quotes" },
            { label: "Leads",       href: "/admin/dashboard/leads" },
            { label: "Chat",        href: "/admin/dashboard/chat" },
            { label: "View Shop",   href: "/shop" },
          ].map((l) => (
            <Link key={l.href} href={l.href} target={l.href === "/shop" ? "_blank" : undefined}
              className="text-gray-400 text-xs px-3 py-1.5 rounded-lg bg-[#111] border border-[#1F1F1F] hover:text-white transition-colors">
              {l.label}{l.href === "/shop" ? " ↗" : ""}
            </Link>
          ))}
        </div>

        {/* Products header */}
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-lg sm:text-xl font-bold text-white">Products ({products.length})</h1>
          <Link href="/admin/dashboard/new" className="btn-gold px-4 py-2 rounded-xl text-xs sm:text-sm font-bold">
            + Add Product
          </Link>
        </div>

        {products.length === 0 ? (
          <div className="bg-[#111111] border border-[#1F1F1F] rounded-2xl p-12 text-center">
            <p className="text-gray-500 text-lg mb-6">No products yet.</p>
            <Link href="/admin/dashboard/new" className="btn-gold px-8 py-3 rounded-xl font-bold">Add Your First Product</Link>
          </div>
        ) : (
          <>
            {/* Desktop table */}
            <div className="hidden md:block bg-[#111111] border border-[#1F1F1F] rounded-2xl overflow-hidden">
              <div className="grid grid-cols-[52px_1fr_130px_155px_105px_100px] gap-3 px-5 py-3 border-b border-[#1F1F1F]">
                {["", "Product", "Price", "Category", "Status", "Actions"].map((h) => (
                  <p key={h} className="text-[11px] text-gray-500 uppercase tracking-wider font-medium">{h}</p>
                ))}
              </div>
              {products.map((p) => (
                <div key={p.id}
                  className="grid grid-cols-[52px_1fr_130px_155px_105px_100px] gap-3 items-center px-5 py-3.5 border-b border-[#1A1A1A] last:border-0 hover:bg-white/[0.02] transition-colors">
                  <div className="w-11 h-11 rounded-lg overflow-hidden bg-[#0A0A0A] shrink-0">
                    {p.imageUrl
                      ? <img src={p.imageUrl} alt={p.name} className="w-full h-full object-cover" />
                      : <div className="w-full h-full flex items-center justify-center text-gray-700 text-xs">–</div>}
                  </div>
                  <div className="min-w-0">
                    <p className="text-white font-medium text-sm truncate">{p.name}</p>
                    {p.description && <p className="text-gray-500 text-xs truncate mt-0.5">{p.description}</p>}
                  </div>
                  <p className="text-[#D4AF37] font-bold text-sm">{p.price}</p>
                  <p className="text-gray-400 text-sm truncate">{p.category}</p>
                  <div className="flex gap-1 flex-wrap">
                    <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${p.inStock ? "bg-green-400/10 text-green-400" : "bg-red-400/10 text-red-400"}`}>
                      {p.inStock ? "In Stock" : "Out"}
                    </span>
                    {p.featured && (
                      <span className="text-[10px] px-2 py-0.5 rounded-full font-medium bg-[#D4AF37]/10 text-[#D4AF37]">Featured</span>
                    )}
                  </div>
                  <div className="flex gap-1.5">
                    <Link href={`/admin/dashboard/edit/${p.id}`}
                      className="px-3 py-1.5 rounded-lg text-xs font-medium text-gray-300 hover:text-white bg-white/5 hover:bg-white/10 transition-colors">
                      Edit
                    </Link>
                    <DeleteButton id={p.id} />
                  </div>
                </div>
              ))}
            </div>

            {/* Mobile cards */}
            <div className="md:hidden space-y-3">
              {products.map((p) => (
                <div key={p.id} className="bg-[#111111] border border-[#1F1F1F] rounded-2xl p-4">
                  <div className="flex gap-3">
                    <div className="w-16 h-16 rounded-xl overflow-hidden bg-[#0A0A0A] shrink-0">
                      {p.imageUrl
                        ? <img src={p.imageUrl} alt={p.name} className="w-full h-full object-cover" />
                        : <div className="w-full h-full flex items-center justify-center text-gray-700 text-xs">–</div>}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-white font-semibold text-sm leading-snug">{p.name}</p>
                      <p className="text-[#D4AF37] font-bold text-sm mt-0.5">{p.price}</p>
                      <p className="text-gray-500 text-xs mt-0.5 truncate">{p.category}</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between mt-3 pt-3 border-t border-[#1A1A1A]">
                    <div className="flex gap-1.5 flex-wrap">
                      <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${p.inStock ? "bg-green-400/10 text-green-400" : "bg-red-400/10 text-red-400"}`}>
                        {p.inStock ? "In Stock" : "Out of Stock"}
                      </span>
                      {p.featured && (
                        <span className="text-[10px] px-2 py-0.5 rounded-full font-medium bg-[#D4AF37]/10 text-[#D4AF37]">Featured</span>
                      )}
                    </div>
                    <div className="flex gap-2">
                      <Link href={`/admin/dashboard/edit/${p.id}`}
                        className="px-3 py-1.5 rounded-lg text-xs font-medium text-gray-300 hover:text-white bg-white/5 hover:bg-white/10 transition-colors">
                        Edit
                      </Link>
                      <DeleteButton id={p.id} />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        {/* Leads */}
        <div className="mt-12">
          <h2 className="text-lg sm:text-xl font-bold text-white mb-4">Leads &amp; Quote Requests ({leads.length})</h2>
          {leads.length === 0 ? (
            <div className="bg-[#111111] border border-[#1F1F1F] rounded-2xl p-10 text-center text-gray-500 text-sm">
              No leads yet. They appear here when someone submits the contact form.
            </div>
          ) : (
            <>
              {/* Desktop */}
              <div className="hidden md:block bg-[#111111] border border-[#1F1F1F] rounded-2xl overflow-hidden">
                <div className="grid grid-cols-[1fr_160px_130px_1fr_100px] gap-4 px-5 py-3 border-b border-[#1F1F1F]">
                  {["Name", "Email", "Phone", "Message", "Date"].map((h) => (
                    <p key={h} className="text-[11px] text-gray-500 uppercase tracking-wider font-medium">{h}</p>
                  ))}
                </div>
                {leads.map((lead) => (
                  <div key={lead.id}
                    className="grid grid-cols-[1fr_160px_130px_1fr_100px] gap-4 items-start px-5 py-4 border-b border-[#1A1A1A] last:border-0 hover:bg-white/[0.02] transition-colors">
                    <p className="text-white text-sm font-medium truncate">{lead.name || "—"}</p>
                    <p className="text-gray-400 text-sm truncate">{lead.email || "—"}</p>
                    <p className="text-gray-400 text-sm truncate">{lead.phone || "—"}</p>
                    <p className="text-gray-400 text-sm line-clamp-2 leading-snug">{lead.message || lead.productInterest || "—"}</p>
                    <p className="text-gray-600 text-xs">{new Date(lead.createdAt).toLocaleDateString("en-ZA")}</p>
                  </div>
                ))}
              </div>

              {/* Mobile cards */}
              <div className="md:hidden space-y-3">
                {leads.map((lead) => (
                  <div key={lead.id} className="bg-[#111111] border border-[#1F1F1F] rounded-2xl p-4 space-y-1.5">
                    <div className="flex items-start justify-between gap-2">
                      <p className="text-white text-sm font-semibold">{lead.name || "—"}</p>
                      <p className="text-gray-600 text-[10px] shrink-0">{new Date(lead.createdAt).toLocaleDateString("en-ZA")}</p>
                    </div>
                    {lead.email && <p className="text-gray-400 text-xs">{lead.email}</p>}
                    {lead.phone && <p className="text-gray-400 text-xs">{lead.phone}</p>}
                    {(lead.message || lead.productInterest) && (
                      <p className="text-gray-500 text-xs leading-snug line-clamp-3">{lead.message || lead.productInterest}</p>
                    )}
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
