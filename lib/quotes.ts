import { getDb } from "./db";
import { randomBytes } from "crypto";

export interface Quote {
  id: string;
  ref: string;
  name: string;
  phone: string;
  email: string;
  province: string;
  propertyType: string;
  monthlyBill: string;
  mainGoal: string;
  appliances: string; // JSON array
  budget: string;
  recommendedPackage: string;
  estimatedPrice: string;
  message: string;
  status: "new" | "reviewing" | "quoted" | "approved" | "declined";
  source: string;
  createdAt: string;
}

function generateRef(): string {
  const year = new Date().getFullYear();
  const rand = randomBytes(3).toString("hex").toUpperCase(); // 6 hex chars, crypto-random
  return `DC-${year}-${rand}`;
}

export function createQuote(data: Omit<Quote, "id" | "ref" | "createdAt">): Quote {
  const db = getDb();
  // Use timestamp + random suffix to avoid same-millisecond collisions
  const id = `${Date.now()}-${randomBytes(4).toString("hex")}`;

  // Retry ref generation up to 3 times on collision (UNIQUE constraint)
  let ref = generateRef();
  for (let i = 0; i < 3; i++) {
    if (!db.prepare("SELECT 1 FROM quotes WHERE ref = ?").get(ref)) break;
    ref = generateRef();
  }
  const now = new Date().toISOString();
  db.prepare(`
    INSERT INTO quotes
      (id, ref, name, phone, email, province, propertyType, monthlyBill, mainGoal, appliances,
       budget, recommendedPackage, estimatedPrice, message, status, source, createdAt)
    VALUES
      (@id, @ref, @name, @phone, @email, @province, @propertyType, @monthlyBill, @mainGoal, @appliances,
       @budget, @recommendedPackage, @estimatedPrice, @message, @status, @source, @createdAt)
  `).run({ id, ref, createdAt: now, ...data });
  return getQuote(id)!;
}

export function getQuote(id: string): Quote | undefined {
  return getDb().prepare("SELECT * FROM quotes WHERE id = ?").get(id) as Quote | undefined;
}

export function getQuotes(): Quote[] {
  return getDb().prepare("SELECT * FROM quotes ORDER BY createdAt DESC").all() as Quote[];
}

export function updateQuoteStatus(id: string, status: Quote["status"]) {
  getDb().prepare("UPDATE quotes SET status = ? WHERE id = ?").run(status, id);
}
