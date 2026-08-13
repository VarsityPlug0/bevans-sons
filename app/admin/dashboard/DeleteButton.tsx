"use client";

export default function DeleteButton({ id }: { id: string }) {
  async function handleDelete() {
    if (!confirm("Delete this product?")) return;
    await fetch(`/api/admin/products/${id}`, { method: "DELETE" });
    window.location.reload();
  }

  return (
    <button
      onClick={handleDelete}
      className="px-3 py-1.5 rounded-lg text-xs font-medium text-red-400 hover:text-red-300 bg-red-400/5 hover:bg-red-400/10 transition-colors"
    >
      Delete
    </button>
  );
}
