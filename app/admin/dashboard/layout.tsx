import { isAuthenticated } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const ok = await isAuthenticated();
  if (!ok) redirect("/admin");
  return <>{children}</>;
}
