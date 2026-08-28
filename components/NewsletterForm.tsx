"use client";
import { useState } from "react";

export default function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "done" | "error">("idle");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email) return;
    // Store submission — future integration point
    setStatus("done");
  }

  if (status === "done") {
    return (
      <p className="text-white font-semibold text-sm">
        You&apos;re in! Welcome to the community.
      </p>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 w-full max-w-sm">
      <input
        type="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Enter your email"
        className="flex-1 bg-[#1a1a1a] border border-[#2a2a2a] rounded px-4 py-3 text-white text-sm placeholder-gray-600 focus:border-white/40 focus:outline-none"
      />
      <button type="submit" className="btn-gold-fill px-5 py-3 text-xs rounded shrink-0">
        Subscribe
      </button>
    </form>
  );
}
