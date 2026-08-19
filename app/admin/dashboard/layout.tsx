import { isAuthenticated } from "@/lib/auth";
import { redirect } from "next/navigation";
import Sidebar from "./Sidebar";

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const ok = await isAuthenticated();
  if (!ok) redirect("/admin");
  return (
    <div className="flex min-h-screen bg-[#0A0A0A]">
      <Sidebar />
      {/* push content below mobile top bar */}
      <div className="flex-1 overflow-auto pt-[52px] lg:pt-0">
        {children}
      </div>
    </div>
  );
}
