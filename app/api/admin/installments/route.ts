import { NextResponse } from "next/server";
import { isAuthenticated } from "@/lib/auth";
import { listApplications, getEventStats } from "@/lib/installments";

export async function GET() {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  return NextResponse.json({
    applications: listApplications(),
    stats: getEventStats(),
  });
}
