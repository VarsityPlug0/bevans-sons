'use client'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'
import api from '@/lib/api'
import { formatCurrency, formatDate, statusColor } from '@/lib/utils'

export default function RefundsPage() {
  const qc = useQueryClient()
  const [status, setStatus] = useState('PENDING')
  const [selected, setSelected] = useState<any | null>(null)
  const [approvedAmount, setApprovedAmount] = useState('')
  const [rejectReason, setRejectReason] = useState('')

  const { data } = useQuery({
    queryKey: ['refunds', status],
    queryFn: () => api.get<any>(`/api/admin/refunds?status=${status}`),
  })

  const approve = useMutation({
    mutationFn: ({ id, amount }: { id: string; amount: number }) => api.post(`/api/admin/refunds/${id}/approve`, { approvedAmount: amount }),
    onSuccess: () => { qc.invalidateQueries({ queryKey: ['refunds'] }); setSelected(null) },
  })

  const reject = useMutation({
    mutationFn: ({ id, reason }: { id: string; reason: string }) => api.post(`/api/admin/refunds/${id}/reject`, { reason }),
    onSuccess: () => { qc.invalidateQueries({ queryKey: ['refunds'] }); setSelected(null) },
  })

  const process = useMutation({
    mutationFn: (id: string) => api.post(`/api/admin/refunds/${id}/process`, { refundMethod: 'EFT', restockItems: true }),
    onSuccess: () => { qc.invalidateQueries({ queryKey: ['refunds'] }); setSelected(null) },
  })

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Returns & Refunds</h1>
        <p className="text-sm text-gray-500">Refunds create financial reversals — original order economics are never overwritten</p>
      </div>

      <div className="flex gap-2">
        {['PENDING', 'UNDER_REVIEW', 'APPROVED', 'COMPLETED', 'REJECTED'].map((s) => (
          <button key={s} onClick={() => setStatus(s)} className={`px-3 py-1.5 text-xs rounded-full font-medium border transition-colors ${status === s ? 'bg-gray-900 text-white border-gray-900' : 'bg-white text-gray-600 border-gray-200 hover:bg-gray-50'}`}>{s.replace('_', ' ')}</button>
        ))}
      </div>

      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-4 py-3 text-left font-medium text-gray-600">Request</th>
              <th className="px-4 py-3 text-left font-medium text-gray-600">Customer</th>
              <th className="px-4 py-3 text-left font-medium text-gray-600">Order</th>
              <th className="px-4 py-3 text-left font-medium text-gray-600">Reason</th>
              <th className="px-4 py-3 text-right font-medium text-gray-600">Amount</th>
              <th className="px-4 py-3 text-left font-medium text-gray-600">Date</th>
              <th className="px-4 py-3" />
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {data?.data?.map((r: any) => (
              <tr key={r.id} className="hover:bg-gray-50">
                <td className="px-4 py-3">
                  <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${statusColor(r.status)}`}>{r.status.replace('_', ' ')}</span>
                </td>
                <td className="px-4 py-3 text-gray-700">{r.customer?.firstName} {r.customer?.lastName}</td>
                <td className="px-4 py-3 font-mono text-gray-600">{r.order?.orderNumber}</td>
                <td className="px-4 py-3 text-gray-500">{r.reason.replace(/_/g, ' ')}</td>
                <td className="px-4 py-3 text-right font-mono">{formatCurrency(parseFloat(r.requestedAmount))}</td>
                <td className="px-4 py-3 text-gray-400">{formatDate(r.createdAt)}</td>
                <td className="px-4 py-3 text-right">
                  <button onClick={() => { setSelected(r); setApprovedAmount(r.requestedAmount) }} className="text-xs border border-gray-200 rounded px-2 py-1 hover:bg-gray-50">Review</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Review Modal */}
      {selected && (
        <div className="fixed inset-0 bg-black/30 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl p-6 w-full max-w-lg shadow-xl">
            <h3 className="font-bold text-lg mb-1">Refund Request</h3>
            <p className="text-sm text-gray-500 mb-4">Order: {selected.order?.orderNumber} — Requested: {formatCurrency(parseFloat(selected.requestedAmount))}</p>
            <div className="bg-gray-50 rounded-lg p-4 mb-4 text-sm">
              <p><strong>Reason:</strong> {selected.reason.replace(/_/g, ' ')}</p>
              <p className="mt-1"><strong>Description:</strong> {selected.description}</p>
            </div>
            {selected.status === 'PENDING' && (
              <div className="space-y-3">
                <div>
                  <label className="text-sm font-medium text-gray-700 block mb-1">Approved Amount (R)</label>
                  <input type="number" value={approvedAmount} onChange={(e) => setApprovedAmount(e.target.value)} className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none" />
                </div>
                <div className="flex gap-3">
                  <button onClick={() => approve.mutate({ id: selected.id, amount: parseFloat(approvedAmount) })} disabled={approve.isPending} className="flex-1 bg-green-600 text-white rounded-lg py-2 text-sm hover:bg-green-700 disabled:opacity-40">Approve</button>
                  <div className="flex-1 space-y-2">
                    <input value={rejectReason} onChange={(e) => setRejectReason(e.target.value)} placeholder="Rejection reason..." className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none" />
                    <button onClick={() => reject.mutate({ id: selected.id, reason: rejectReason })} disabled={!rejectReason || reject.isPending} className="w-full bg-red-600 text-white rounded-lg py-2 text-sm hover:bg-red-700 disabled:opacity-40">Reject</button>
                  </div>
                </div>
              </div>
            )}
            {selected.status === 'APPROVED' && (
              <button onClick={() => process.mutate(selected.id)} disabled={process.isPending} className="w-full bg-blue-600 text-white rounded-lg py-2 text-sm hover:bg-blue-700 disabled:opacity-40">
                {process.isPending ? 'Processing...' : 'Process Refund (EFT + Restock)'}
              </button>
            )}
            <button onClick={() => setSelected(null)} className="w-full mt-3 border border-gray-200 rounded-lg py-2 text-sm hover:bg-gray-50">Close</button>
          </div>
        </div>
      )}
    </div>
  )
}
