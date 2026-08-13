"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { CheckCircle, XCircle, Clock, Truck, Package } from "lucide-react";

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
  pending:         { label: "Pending",          color: "#6b7280", icon: <Clock size={14} /> },
  proof_submitted: { label: "Proof Submitted",  color: "#f59e0b", icon: <Package size={14} /> },
  approved:        { label: "Approved",         color: "#10b981", icon: <CheckCircle size={14} /> },
  rejected:        { label: "Rejected",         color: "#ef4444", icon: <XCircle size={14} /> },
  shipped:         { label: "Shipped",          color: "#3b82f6", icon: <Truck size={14} /> },
  delivered:       { label: "Delivered",        color: "#D4AF37", icon: <CheckCircle size={14} /> },
};

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [selected, setSelected] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [notes, setNotes] = useState("");
  const [filter, setFilter] = useState("all");

  useEffect(() => { fetchOrders(); }, []);

  async function fetchOrders() {
    setLoading(true);
    const res = await fetch("/api/orders");
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

  const filtered = filter === "all" ? orders : orders.filter(o => o.status === filter);

  return (
    <div className="min-h-screen bg-[#0A0A0A] p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-white">Orders</h1>
            <p className="text-gray-500 text-sm mt-1">{orders.length} total orders</p>
          </div>
          <button onClick={fetchOrders} className="btn-outline px-5 py-2.5 rounded-xl text-sm">Refresh</button>
        </div>

        {/* Filter tabs */}
        <div className="flex gap-2 mb-6 flex-wrap">
          {["all", "pending", "proof_submitted", "approved", "shipped", "delivered", "rejected"].map(f => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-1.5 rounded-full text-xs font-medium transition-colors ${
                filter === f
                  ? "bg-[#D4AF37] text-black"
                  : "bg-[#1F1F1F] text-gray-400 hover:text-white"
              }`}
            >
              {f === "all" ? "All" : STATUS_CONFIG[f]?.label ?? f}
              {f === "all"
                ? ` (${orders.length})`
                : ` (${orders.filter(o => o.status === f).length})`}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          {/* Order list */}
          <div className="xl:col-span-1 space-y-3">
            {loading ? (
              <p className="text-gray-500 text-sm">Loading…</p>
            ) : filtered.length === 0 ? (
              <p className="text-gray-500 text-sm">No orders</p>
            ) : filtered.map(order => {
              const cfg = STATUS_CONFIG[order.status] ?? STATUS_CONFIG.pending;
              return (
                <button
                  key={order.id}
                  onClick={() => { setSelected(order); setNotes(order.notes ?? ""); }}
                  className={`w-full text-left bg-[#111111] border rounded-xl p-4 transition-colors ${
                    selected?.id === order.id ? "border-[#D4AF37]/50" : "border-[#1F1F1F] hover:border-[#2a2a2a]"
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[#D4AF37] font-bold text-sm">{order.ref}</span>
                    <span className="flex items-center gap-1 text-xs" style={{ color: cfg.color }}>
                      {cfg.icon} {cfg.label}
                    </span>
                  </div>
                  <p className="text-white text-sm font-medium">{order.name}</p>
                  <p className="text-gray-500 text-xs">{order.email}</p>
                  <div className="flex justify-between mt-2">
                    <span className="text-xs text-gray-600">{order.items.length} item{order.items.length !== 1 ? "s" : ""}</span>
                    <span className="text-sm font-bold text-white">R {order.total.toLocaleString()}</span>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Order detail */}
          <div className="xl:col-span-2">
            {!selected ? (
              <div className="bg-[#111111] border border-[#1F1F1F] rounded-2xl p-12 text-center">
                <p className="text-gray-500">Select an order to view details</p>
              </div>
            ) : (
              <div className="bg-[#111111] border border-[#1F1F1F] rounded-2xl p-7 space-y-6">
                {/* Header */}
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-[#D4AF37] font-bold text-lg">{selected.ref}</p>
                    <p className="text-gray-500 text-xs mt-0.5">{new Date(selected.createdAt).toLocaleString("en-ZA")}</p>
                  </div>
                  <span
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium"
                    style={{
                      color: STATUS_CONFIG[selected.status]?.color,
                      background: STATUS_CONFIG[selected.status]?.color + "15",
                    }}
                  >
                    {STATUS_CONFIG[selected.status]?.icon}
                    {STATUS_CONFIG[selected.status]?.label ?? selected.status}
                  </span>
                </div>

                {/* Customer */}
                <div className="grid grid-cols-2 gap-4">
                  {[
                    ["Name",    selected.name],
                    ["Email",   selected.email],
                    ["Phone",   selected.phone],
                    ["Address", selected.address || "Not provided"],
                  ].map(([l, v]) => (
                    <div key={l}>
                      <p className="text-xs text-gray-500 mb-0.5">{l}</p>
                      <p className="text-sm text-white">{v}</p>
                    </div>
                  ))}
                </div>

                {/* Items */}
                <div>
                  <p className="text-xs text-gray-500 mb-3">Items</p>
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
                        <p className="text-sm font-bold text-[#D4AF37]">
                          R {(Number(item.price) * item.qty).toLocaleString()}
                        </p>
                      </div>
                    ))}
                  </div>
                  <div className="flex justify-between mt-4 pt-4 border-t border-[#1F1F1F]">
                    <span className="text-gray-400 text-sm">Total</span>
                    <span className="text-white font-bold text-lg">R {selected.total.toLocaleString()}</span>
                  </div>
                </div>

                {/* Proof of payment */}
                {selected.proof_url && (
                  <div>
                    <p className="text-xs text-gray-500 mb-3">Proof of Payment</p>
                    {selected.proof_url.endsWith(".pdf") ? (
                      <a href={selected.proof_url} target="_blank" rel="noopener noreferrer"
                        className="text-[#D4AF37] text-sm underline">
                        View PDF proof
                      </a>
                    ) : (
                      <a href={selected.proof_url} target="_blank" rel="noopener noreferrer">
                        <div className="relative h-48 rounded-xl overflow-hidden border border-[#1F1F1F]">
                          <Image src={selected.proof_url} alt="Proof" fill className="object-contain" />
                        </div>
                      </a>
                    )}
                  </div>
                )}

                {/* Notes */}
                <div>
                  <label className="text-xs text-gray-500 block mb-2">Admin Notes</label>
                  <textarea
                    value={notes}
                    onChange={e => setNotes(e.target.value)}
                    rows={2}
                    placeholder="Add notes…"
                    className="w-full bg-[#0A0A0A] border border-[#2a2a2a] rounded-xl px-4 py-3 text-white text-sm placeholder-gray-600 resize-none"
                  />
                </div>

                {/* Actions */}
                <div style={{ display: "flex", flexDirection: "row", flexWrap: "wrap", gap: "10px" }}>
                  {[
                    { status: "approved",  label: "Approve",        color: "#10b981" },
                    { status: "rejected",  label: "Reject",         color: "#ef4444" },
                    { status: "shipped",   label: "Mark Shipped",   color: "#3b82f6" },
                    { status: "delivered", label: "Mark Delivered", color: "#D4AF37" },
                  ].map(({ status, label, color }) => (
                    <button
                      key={status}
                      onClick={() => updateStatus(selected.id, status)}
                      disabled={updating || selected.status === status}
                      className="px-5 py-2.5 rounded-xl text-sm font-semibold disabled:opacity-40 transition-opacity"
                      style={{ background: color + "20", color, border: `1px solid ${color}40` }}
                    >
                      {updating ? "…" : label}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
