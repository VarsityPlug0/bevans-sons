'use client'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'
import api from '@/lib/api'
import { formatCurrency, statusColor } from '@/lib/utils'
import { Plus } from 'lucide-react'

export default function MarketingPage() {
  const qc = useQueryClient()
  const [showNew, setShowNew] = useState(false)
  const [form, setForm] = useState({ name: '', platform: '', budget: '' })

  const { data: overview } = useQuery({ queryKey: ['marketing-overview'], queryFn: () => api.get<any>('/api/admin/marketing/overview') })
  const { data: campaigns } = useQuery({ queryKey: ['campaigns'], queryFn: () => api.get<any[]>('/api/admin/marketing/campaigns') })

  const create = useMutation({
    mutationFn: () => api.post('/api/admin/marketing/campaigns', { ...form, budget: parseFloat(form.budget) }),
    onSuccess: () => { qc.invalidateQueries({ queryKey: ['campaigns'] }); setShowNew(false); setForm({ name: '', platform: '', budget: '' }) },
  })

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Marketing</h1>
          <p className="text-sm text-gray-500">Campaign tracking and spend management</p>
        </div>
        <button onClick={() => setShowNew(true)} className="flex items-center gap-2 bg-gray-900 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-800">
          <Plus className="w-4 h-4" /> New Campaign
        </button>
      </div>

      {/* Overview */}
      {overview && (
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
          {[
            { label: 'Total Spend', value: formatCurrency(overview.totalSpend) },
            { label: 'Revenue Generated', value: formatCurrency(overview.totalRevenue) },
            { label: 'Contribution', value: formatCurrency(overview.totalContribution) },
            { label: 'Overall ROAS', value: `${(overview.overallROAS || 0).toFixed(2)}x` },
            { label: 'Overall CAC', value: formatCurrency(overview.overallCAC) },
          ].map((s) => (
            <div key={s.label} className="bg-white rounded-xl border border-gray-200 p-4">
              <p className="text-xs text-gray-400 mb-1">{s.label}</p>
              <p className="text-xl font-bold text-gray-900">{s.value}</p>
            </div>
          ))}
        </div>
      )}

      {/* Campaigns Table */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-4 py-3 text-left font-medium text-gray-600">Campaign</th>
              <th className="px-4 py-3 text-left font-medium text-gray-600">Platform</th>
              <th className="px-4 py-3 text-left font-medium text-gray-600">Status</th>
              <th className="px-4 py-3 text-right font-medium text-gray-600">Budget</th>
              <th className="px-4 py-3 text-right font-medium text-gray-600">Spend</th>
              <th className="px-4 py-3 text-right font-medium text-gray-600">Revenue</th>
              <th className="px-4 py-3 text-right font-medium text-gray-600">ROAS</th>
              <th className="px-4 py-3 text-right font-medium text-gray-600">CAC</th>
              <th className="px-4 py-3 text-right font-medium text-gray-600">Orders</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {campaigns?.map((c: any) => {
              const roas = parseFloat(c.roas)
              return (
                <tr key={c.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3 font-medium text-gray-900">{c.name}</td>
                  <td className="px-4 py-3 text-gray-500">{c.platform}</td>
                  <td className="px-4 py-3"><span className={`px-2 py-0.5 rounded-full text-xs font-medium ${statusColor(c.status)}`}>{c.status}</span></td>
                  <td className="px-4 py-3 text-right font-mono">{formatCurrency(parseFloat(c.budget))}</td>
                  <td className="px-4 py-3 text-right font-mono">{formatCurrency(parseFloat(c.spend))}</td>
                  <td className="px-4 py-3 text-right font-mono">{formatCurrency(parseFloat(c.revenue))}</td>
                  <td className="px-4 py-3 text-right">
                    <span className={`font-medium ${roas >= 2 ? 'text-green-600' : roas > 0 ? 'text-orange-600' : 'text-gray-400'}`}>{roas > 0 ? `${roas.toFixed(2)}x` : '—'}</span>
                  </td>
                  <td className="px-4 py-3 text-right font-mono">{parseFloat(c.cac) > 0 ? formatCurrency(parseFloat(c.cac)) : '—'}</td>
                  <td className="px-4 py-3 text-right text-gray-600">{c.orderCount}</td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>

      {showNew && (
        <div className="fixed inset-0 bg-black/30 z-50 flex items-center justify-center">
          <div className="bg-white rounded-xl p-6 w-96 shadow-xl">
            <h3 className="font-bold mb-4">New Campaign</h3>
            <div className="space-y-3">
              <input value={form.name} onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))} placeholder="Campaign name" className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-900" />
              <input value={form.platform} onChange={(e) => setForm((f) => ({ ...f, platform: e.target.value }))} placeholder="Platform (Facebook, Google, TikTok...)" className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-900" />
              <input type="number" value={form.budget} onChange={(e) => setForm((f) => ({ ...f, budget: e.target.value }))} placeholder="Budget (R)" className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-900" />
            </div>
            <div className="flex gap-3 mt-5">
              <button onClick={() => setShowNew(false)} className="flex-1 border border-gray-200 rounded-lg py-2 text-sm">Cancel</button>
              <button onClick={() => create.mutate()} disabled={!form.name || !form.platform || !form.budget || create.isPending} className="flex-1 bg-gray-900 text-white rounded-lg py-2 text-sm disabled:opacity-40">
                {create.isPending ? 'Creating...' : 'Create'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
