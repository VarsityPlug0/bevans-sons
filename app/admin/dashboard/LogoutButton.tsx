"use client";
import { useRouter } from "next/navigation";

export default function AdminLogoutButton() {
  const router = useRouter();

  async function logout() {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin");
  }

  return (
    <button onClick={logout}
      className="text-gray-500 hover:text-red-400 text-sm transition-colors">
      Sign Out
    </button>
  );
}
