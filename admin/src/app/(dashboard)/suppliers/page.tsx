'use client'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'
import api from '@/lib/api'
import { formatCurrency } from '@/lib/utils'
import { Plus, Star } from 'lucide-react'

export default function SuppliersPage() {
  const qc = useQueryClient()
  const [showNew, setShowNew] = useState(false)
  const [form, setForm] = useState({ name: '', contactPerson: '', email: '', phone: '', paymentTerms: '', leadTimeDays: '' })

  const { data: suppliers, isLoading } = useQuery({
    queryKey: ['suppliers'],
    queryFn: () => api.get<any[]>('/api/admin/suppliers'),
  })

  const create = useMutation({
    mutationFn: () => api.post('/api/admin/suppliers', { ...form, leadTimeDays: form.leadTimeDays ? parseInt(form.leadTimeDays) : undefined }),
    onSuccess: () => { qc.invalidateQueries({ queryKey: ['suppliers'] }); setShowNew(false); setForm({ name: '', contactPerson: '', email: '', phone: '', paymentTerms: '', leadTimeDays: '' }) },
  })

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Suppliers</h1>
          <p className="text-sm text-gray-500">Manage your product suppliers and track obligations</p>
        </div>
        <button onClick={() => setShowNew(true)} className="flex items-center gap-2 bg-gray-900 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-800">
          <Plus className="w-4 h-4" /> Add Supplier
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {isLoading && <p className="text-gray-400 col-span-3">Loading...</p>}
        {suppliers?.map((s: any) => (
          <div key={s.id} className="bg-white rounded-xl border border-gray-200 p-5">
            <div className="flex items-start justify-between mb-3">
              <div>
                <h3 className="font-semibold text-gray-900">{s.name}</h3>
                {s.contactPerson && <p className="text-xs text-gray-400">{s.contactPerson}</p>}
              </div>
              {s.reliability && (
                <div className="flex gap-0.5">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className={`w-3 h-3 ${i < s.reliability ? 'fill-yellow-400 text-yellow-400' : 'text-gray-200'}`} />
                  ))}
                </div>
              )}
            </div>
            <div className="space-y-1 text-sm text-gray-600">
              {s.email && <p>{s.email}</p>}
              {s.phone && <p>{s.phone}</p>}
              {s.paymentTerms && <p className="text-gray-400">Terms: {s.paymentTerms}</p>}
              {s.leadTimeDays && <p className="text-gray-400">Lead time: {s.leadTimeDays} days</p>}
            </div>
            <div className="mt-4 pt-4 border-t border-gray-100 grid grid-cols-2 gap-3 text-sm">
              <div>
                <p className="text-xs text-gray-400">Total purchased</p>
                <p className="font-semibold">{formatCurrency(parseFloat(s.totalPurchased))}</p>
              </div>
              <div>
                <p className="text-xs text-gray-400">Outstanding</p>
                <p className={`font-semibold ${parseFloat(s.totalOutstanding) > 0 ? 'text-red-600' : 'text-gray-700'}`}>{formatCurrency(parseFloat(s.totalOutstanding))}</p>
              </div>
            </div>
            <p className="text-xs text-gray-400 mt-2">{s.supplierProducts?.length ?? 0} products linked</p>
          </div>
        ))}
      </div>

      {showNew && (
        <div className="fixed inset-0 bg-black/30 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl p-6 w-full max-w-lg shadow-xl">
            <h3 className="font-bold mb-4">Add Supplier</h3>
            <div className="grid grid-cols-2 gap-3">
              {[
                { field: 'name', label: 'Name *', type: 'text' },
                { field: 'contactPerson', label: 'Contact Person', type: 'text' },
                { field: 'email', label: 'Email', type: 'email' },
                { field: 'phone', label: 'Phone', type: 'text' },
                { field: 'paymentTerms', label: 'Payment Terms', type: 'text' },
                { field: 'leadTimeDays', label: 'Lead Time (days)', type: 'number' },
              ].map(({ field, label, type }) => (
                <div key={field}>
                  <label className="text-xs font-medium text-gray-600 block mb-1">{label}</label>
                  <input
                    type={type}
                    value={(form as any)[field]}
                    onChange={(e) => setForm((f) => ({ ...f, [field]: e.target.value }))}
                    className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-900"
                  />
                </div>
              ))}
            </div>
            <div className="flex gap-3 mt-5">
              <button onClick={() => setShowNew(false)} className="flex-1 border border-gray-200 rounded-lg py-2 text-sm">Cancel</button>
              <button onClick={() => create.mutate()} disabled={!form.name || create.isPending} className="flex-1 bg-gray-900 text-white rounded-lg py-2 text-sm disabled:opacity-40">
                {create.isPending ? 'Creating...' : 'Add Supplier'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
