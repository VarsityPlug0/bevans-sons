import { getDb } from "@/lib/db";
import { listOrders } from "@/lib/orders";
import { getProducts } from "@/lib/products";
import EmailComposer from "./EmailComposer";

export const dynamic = "force-dynamic";

export default function EmailsPage() {
  const orders = listOrders();

  const customerCount = new Set(orders.map((o) => o.email.toLowerCase())).size;
  const pendingCount = new Set(
    orders
      .filter((o) => o.status === "pending" || o.status === "proof_submitted")
      .map((o) => o.email.toLowerCase())
  ).size;

  const products = getProducts().map((p) => ({
    id: p.id, name: p.name, price: p.price, imageUrl: p.imageUrl ?? "", category: p.category,
  }));

  const db = getDb();
  const campaigns = db
    .prepare("SELECT * FROM email_campaigns ORDER BY createdAt DESC LIMIT 20")
    .all() as {
      id: string; subject: string; heading: string; recipients: string;
      sent_to: number; status: string; createdAt: string;
    }[];

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 sm:py-10">

      <div className="mb-7">
        <h1 className="text-xl font-bold text-white">Email Campaigns</h1>
        <p className="text-gray-500 text-sm mt-0.5">Send announcements, reminders, and follow-ups to your customers.</p>
      </div>

      <EmailComposer customerCount={customerCount} pendingCount={pendingCount} products={products} />

      {/* Campaign history */}
      {campaigns.length > 0 && (
        <div className="mt-10">
          <h2 className="text-sm font-semibold text-gray-400 uppercase tracking-widest mb-4">Send History</h2>
          <div className="bg-[#111111] border border-[#1F1F1F] rounded-2xl overflow-hidden">
            <div className="grid grid-cols-[1fr_120px_90px_130px] gap-3 px-5 py-3 border-b border-[#1F1F1F]">
              {["Subject", "Recipients", "Sent", "Date"].map((h) => (
                <p key={h} className="text-[11px] text-gray-500 uppercase tracking-wider font-medium">{h}</p>
              ))}
            </div>
            {campaigns.map((c) => (
              <div key={c.id} className="grid grid-cols-[1fr_120px_90px_130px] gap-3 items-center px-5 py-3.5 border-b border-[#1A1A1A] last:border-0">
                <p className="text-white text-sm truncate">{c.subject}</p>
                <p className="text-gray-400 text-sm capitalize">{c.recipients}</p>
                <p className="text-[#D4AF37] font-bold text-sm">{c.sent_to}</p>
                <p className="text-gray-500 text-xs">
                  {new Date(c.createdAt).toLocaleDateString("en-ZA", { day: "numeric", month: "short", year: "numeric" })}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
