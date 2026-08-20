import { NextRequest, NextResponse } from "next/server";
import { isAuthenticated } from "@/lib/auth";
import { runFollowUps } from "@/lib/followups";

export async function POST(req: NextRequest) {
  // Allow admin session OR secret key (for external cron services)
  const authed = await isAuthenticated();
  if (!authed) {
    const body = await req.json().catch(() => ({})) as { secret?: string };
    if (!process.env.CRON_SECRET || body.secret !== process.env.CRON_SECRET) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
  }

  const result = await runFollowUps();
  return NextResponse.json({ ok: true, ...result });
}
