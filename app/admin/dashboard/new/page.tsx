import Link from "next/link";
import ProductForm from "../ProductForm";

export default function NewProduct() {
  return (
    <div className="min-h-screen bg-[#0A0A0A]">
      <header className="bg-[#0f0f0f] border-b border-[#1A1A1A] px-6 py-4 flex items-center gap-4">
        <Link href="/admin/dashboard"
          className="text-gray-500 hover:text-white text-sm transition-colors">
          ← Dashboard
        </Link>
        <span className="text-gray-700">/</span>
        <h1 className="text-white font-semibold text-sm">Add New Product</h1>
      </header>

      <div className="max-w-5xl mx-auto px-6 py-10">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-white mb-1">New Product</h2>
          <p className="text-gray-500 text-sm">Fill in the details below. The product will appear on the public shop page.</p>
        </div>

        <div className="bg-[#111111] border border-[#1F1F1F] rounded-2xl p-8">
          <ProductForm />
        </div>
      </div>
    </div>
  );
}
