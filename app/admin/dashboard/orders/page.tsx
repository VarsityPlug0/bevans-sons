"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { CheckCircle, XCircle, Clock, Truck, Package, ArrowLeft, RefreshCw } from "lucide-react";

interface Order {
  id: string;
  ref: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  items: { id: string; name: string; price: string; qty: number; imageUrl: string }[];
  total: number;
  status: string;
  payment_method: string;
  proof_url: string | null;
  eft_reference: string | null;
  notes: string | null;
  createdAt: string;
}

const STATUS_CONFIG: Record<string, { label: string; color: string; icon: React.ReactNode }> = {
  pending:         { label: "Pending",         color: "#6b7280", icon: <Clock size={13} /> },
  proof_submitted: { label: "Proof Submitted", color: "#f59e0b", icon: <Package size={13} /> },
  approved:        { label: "Approved",        color: "#10b981", icon: <CheckCircle size={13} /> },
  rejected:        { label: "Rejected",        color: "#ef4444", icon: <XCircle size={13} /> },
  shipped:         { label: "Shipped",         color: "#3b82f6", icon: <Truck size={13} /> },
  delivered:       { label: "Delivered",       color: "#D4AF37", icon: <CheckCircle size={13} /> },
};

const STATUSES = ["pending", "proof_submitted", "approved", "shipped", "delivered", "rejected"];

export default function AdminOrdersPage() {
  const [orders, setOrders]     = useState<Order[]>([]);
  const [selected, setSelected] = useState<Order | null>(null);
  const [loading, setLoading]   = useState(true);
  const [updating, setUpdating] = useState(false);
  const [notes, setNotes]       = useState("");
  const [filter, setFilter]     = useState("all");
  const [showDetail, setShowDetail] = useState(false);

  useEffect(() => { fetchOrders(); }, []);

  async function fetchOrders() {
    setLoading(true);
    const res  = await fetch("/api/orders");
    const data = await res.json();
    setOrders(Array.isArray(data) ? data : []);
    setLoading(false);
  }

  async function updateStatus(id: string, status: string) {
    setUpdating(true);
    const res = await fetch(`/api/orders/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status, notes: notes || undefined }),
    });
    if (res.ok) {
      const updated = await res.json();
      setOrders(o => o.map(x => x.id === id ? updated : x));
      setSelected(updated);
    }
    setUpdating(false);
  }

  function selectOrder(order: Order) {
    setSelected(order);
    setNotes(order.notes ?? "");
    setShowDetail(true);
  }

  const filtered = filter === "all" ? orders : orders.filter(o => o.status === filter);

  const revenue = orders
    .filter(o => o.status === "delivered" || o.status === "approved" || o.status === "shipped")
    .reduce((s, o) => s + o.total, 0);

  const statCards = [
    { label: "Total",     value: orders.length,                                                                         color: "#9ca3af" },
    { label: "Pending",   value: orders.filter(o => o.status === "pending" || o.status === "proof_submitted").length,   color: "#f59e0b" },
    { label: "Approved",  value: orders.filter(o => o.status === "approved").length,                                    color: "#10b981" },
    { label: "Shipped",   value: orders.filter(o => o.status === "shipped").length,                                     color: "#3b82f6" },
    { label: "Delivered", value: orders.filter(o => o.status === "delivered").length,                                   color: "#D4AF37" },
    { label: "Rejected",  value: orders.filter(o => o.status === "rejected").length,                                    color: "#ef4444" },
  ];

  return (
    <div className="min-h-screen bg-[#0A0A0A]">
      {/* Header */}
      <header className="bg-[#0f0f0f] border-b border-[#1A1A1A] px-4 sm:px-6 py-3 flex items-center gap-3">
        <Link href="/admin/dashboard" className="text-gray-500 hover:text-white transition-colors shrink-0">
          <ArrowLeft size={18} />
        </Link>
        <h1 className="text-white font-semibold text-sm flex-1">Orders</h1>
        <button onClick={fetchOrders}
          className="flex items-center gap-1.5 text-gray-400 hover:text-white text-xs transition-colors">
          <RefreshCw size={13} /> Refresh
        </button>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6">

        {/* Stats */}
        <div className="grid grid-cols-3 sm:grid-cols-6 gap-3 mb-4">
          {statCards.map(s => (
            <div key={s.label} className="bg-[#111] border border-[#1F1F1F] rounded-xl p-3 text-center">
              <p className="text-xl sm:text-2xl font-bold mb-0.5" style={{ color: s.color }}>{s.value}</p>
              <p className="text-gray-500 text-[10px] sm:text-xs">{s.label}</p>
            </div>
          ))}
        </div>

        {/* Revenue */}
        <div className="bg-[#111] border border-[#D4AF37]/20 rounded-xl px-4 sm:px-5 py-3.5 flex items-center justify-between mb-5">
          <p className="text-gray-400 text-xs sm:text-sm">Revenue (approved + shipped + delivered)</p>
          <p className="text-[#D4AF37] font-bold text-lg sm:text-xl">R {revenue.toLocaleString()}</p>
        </div>

        {/* Filter tabs */}
        <div className="flex gap-2 mb-5 overflow-x-auto pb-1" style={{ scrollbarWidth: "none" }}>
          {["all", ...STATUSES].map(f => (
            <button key={f} onClick={() => setFilter(f)}
              className="flex-shrink-0 px-3 py-1.5 rounded-full text-xs font-medium transition-colors"
              style={filter === f
                ? { background: "#D4AF37", color: "#000" }
                : { background: "#1F1F1F", color: "#9ca3af" }}>
              {f === "all" ? "All" : STATUS_CONFIG[f]?.label ?? f}
              {" "}({f === "all" ? orders.length : orders.filter(o => o.status === f).length})
            </button>
          ))}
        </div>

        {/* Mobile back button */}
        {showDetail && selected && (
          <button onClick={() => setShowDetail(false)}
            className="flex xl:hidden items-center gap-1.5 text-gray-400 hover:text-white text-sm mb-4">
            <ArrowLeft size={15} /> Back to list
          </button>
        )}

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-5">

          {/* Order list */}
          <div className={`xl:col-span-1 space-y-2.5 ${showDetail && selected ? "hidden xl:block" : "block"}`}>
            {loading ? (
              <p className="text-gray-500 text-sm py-10 text-center">Loading…</p>
            ) : filtered.length === 0 ? (
              <p className="text-gray-500 text-sm py-10 text-center">No orders here</p>
            ) : filtered.map(order => {
              const cfg = STATUS_CONFIG[order.status] ?? STATUS_CONFIG.pending;
              return (
                <button key={order.id} onClick={() => selectOrder(order)}
                  className="w-full text-left bg-[#111111] border rounded-xl p-4 transition-colors hover:border-[#2a2a2a]"
                  style={{ borderColor: selected?.id === order.id ? "#D4AF37" : "#1F1F1F" }}>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-[#D4AF37] font-bold text-sm">{order.ref}</span>
                    <span className="flex items-center gap-1 text-xs" style={{ color: cfg.color }}>
                      {cfg.icon} {cfg.label}
                    </span>
                  </div>
                  <p className="text-white text-sm font-medium truncate">{order.name}</p>
                  <p className="text-gray-500 text-xs truncate">{order.email}</p>
                  <div className="flex justify-between mt-2">
                    <span className="text-xs text-gray-600">
                      {order.items.length} item{order.items.length !== 1 ? "s" : ""}
                      {" · "}{new Date(order.createdAt).toLocaleDateString("en-ZA")}
                    </span>
                    <span className="text-sm font-bold text-white">R {order.total.toLocaleString()}</span>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Order detail */}
          <div className={`xl:col-span-2 ${showDetail && selected ? "block" : "hidden xl:block"}`}>
            {!selected ? (
              <div className="bg-[#111111] border border-[#1F1F1F] rounded-2xl p-12 text-center">
                <p className="text-gray-500">Select an order to view details</p>
              </div>
            ) : (
              <div className="bg-[#111111] border border-[#1F1F1F] rounded-2xl p-4 sm:p-6 space-y-5">

                {/* Order header */}
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-[#D4AF37] font-bold text-lg">{selected.ref}</p>
                    <p className="text-gray-500 text-xs mt-0.5">{new Date(selected.createdAt).toLocaleString("en-ZA")}</p>
                    {selected.payment_method && (
                      <p className="text-gray-600 text-xs mt-0.5 capitalize">
                        Payment: {selected.payment_method.replace(/_/g, " ")}
                      </p>
                    )}
                  </div>
                  <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium shrink-0"
                    style={{
                      color: STATUS_CONFIG[selected.status]?.color,
                      background: (STATUS_CONFIG[selected.status]?.color ?? "#6b7280") + "18",
                    }}>
                    {STATUS_CONFIG[selected.status]?.icon}
                    {STATUS_CONFIG[selected.status]?.label ?? selected.status}
                  </span>
                </div>

                {/* Customer info */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 bg-[#0f0f0f] rounded-xl p-4">
                  {[
                    ["Customer", selected.name],
                    ["Email",    selected.email],
                    ["Phone",    selected.phone],
                    ["Address",  selected.address || "Not provided"],
                  ].map(([l, v]) => (
                    <div key={l}>
                      <p className="text-[10px] text-gray-500 uppercase tracking-wider mb-0.5">{l}</p>
                      <p className="text-sm text-white break-words">{v}</p>
                    </div>
                  ))}
                </div>

                {/* Items */}
                <div>
                  <p className="text-[10px] text-gray-500 uppercase tracking-wider mb-3">Order Items</p>
                  <div className="space-y-3">
                    {selected.items.map((item, i) => (
                      <div key={i} className="flex items-center gap-3">
                        {item.imageUrl && (
                          <div className="relative w-10 h-10 rounded-lg overflow-hidden bg-[#1a1a1a] shrink-0">
                            <Image src={item.imageUrl} alt={item.name} fill className="object-cover" />
                          </div>
                        )}
                        <div className="flex-1 min-w-0">
                          <p className="text-sm text-white truncate">{item.name}</p>
                          <p className="text-xs text-gray-500">× {item.qty}</p>
                        </div>
                        <p className="text-sm font-bold text-[#D4AF37] shrink-0">
                          R {(Number(item.price) * item.qty).toLocaleString()}
                        </p>
                      </div>
                    ))}
                  </div>
                  <div className="flex justify-between mt-4 pt-3 border-t border-[#1F1F1F]">
                    <span className="text-gray-400 text-sm">Total</span>
                    <span className="text-white font-bold text-lg">R {selected.total.toLocaleString()}</span>
                  </div>
                </div>

                {/* EFT reference */}
                {selected.eft_reference && (
                  <div className="bg-[#0f0f0f] rounded-xl p-4">
                    <p className="text-[10px] text-gray-500 uppercase tracking-wider mb-1">EFT Reference</p>
                    <p className="text-white text-sm font-mono">{selected.eft_reference}</p>
                  </div>
                )}

                {/* Proof of payment */}
                {selected.proof_url && (
                  <div>
                    <p className="text-[10px] text-gray-500 uppercase tracking-wider mb-3">Proof of Payment</p>
                    {selected.proof_url.endsWith(".pdf") ? (
                      <a href={selected.proof_url} target="_blank" rel="noopener noreferrer"
                        className="text-[#D4AF37] text-sm underline">View PDF proof ↗</a>
                    ) : (
                      <a href={selected.proof_url} target="_blank" rel="noopener noreferrer">
                        <div className="relative h-48 rounded-xl overflow-hidden border border-[#1F1F1F]">
                          <Image src={selected.proof_url} alt="Proof" fill className="object-contain" />
                        </div>
                      </a>
                    )}
                  </div>
                )}

                {/* Admin notes */}
                <div>
                  <label className="text-[10px] text-gray-500 uppercase tracking-wider block mb-2">Admin Notes</label>
                  <textarea value={notes} onChange={e => setNotes(e.target.value)}
                    rows={2} placeholder="Add internal notes…"
                    className="w-full bg-[#0A0A0A] border border-[#2a2a2a] rounded-xl px-4 py-3 text-white text-sm placeholder-gray-600 resize-none focus:outline-none" />
                </div>

                {/* Status actions */}
                <div>
                  <p className="text-[10px] text-gray-500 uppercase tracking-wider mb-3">Update Status</p>
                  <div className="grid grid-cols-2 sm:flex sm:flex-wrap gap-2">
                    {[
                      { status: "approved",  label: "Approve",        color: "#10b981" },
                      { status: "rejected",  label: "Reject",         color: "#ef4444" },
                      { status: "shipped",   label: "Mark Shipped",   color: "#3b82f6" },
                      { status: "delivered", label: "Mark Delivered", color: "#D4AF37" },
                    ].map(({ status, label, color }) => (
                      <button key={status}
                        onClick={() => updateStatus(selected.id, status)}
                        disabled={updating || selected.status === status}
                        className="px-4 py-2.5 rounded-xl text-sm font-semibold disabled:opacity-40 transition-opacity"
                        style={{ background: color + "20", color, border: `1px solid ${color}40` }}>
                        {label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
