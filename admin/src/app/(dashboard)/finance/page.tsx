'use client'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'
import api from '@/lib/api'
import { formatCurrency, formatPercent } from '@/lib/utils'
import { Banknote, TrendingUp, ArrowDownLeft, AlertCircle } from 'lucide-react'

export default function FinancePage() {
  const qc = useQueryClient()
  const [withdrawAmount, setWithdrawAmount] = useState('')
  const [withdrawNote, setWithdrawNote] = useState('')

  const { data: overview } = useQuery({
    queryKey: ['finance-overview'],
    queryFn: () => api.get<any>('/api/admin/finance/overview'),
    refetchInterval: 60_000,
  })

  const { data: rules } = useQuery({
    queryKey: ['allocation-rules'],
    queryFn: () => api.get<any[]>('/api/admin/finance/allocation-rules'),
  })

  const { data: ledger } = useQuery({
    queryKey: ['ledger'],
    queryFn: () => api.get<any>('/api/admin/finance/ledger?pageSize=30'),
  })

  const withdraw = useMutation({
    mutationFn: (data: { amount: number; description: string }) => api.post('/api/admin/finance/withdraw', data),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['finance-overview'] })
      setWithdrawAmount('')
      setWithdrawNote('')
    },
  })

  if (!overview) return <div className="text-gray-400 py-16 text-center">Loading...</div>

  const { summary, cash, keyFigures } = overview

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Finance</h1>
        <p className="text-sm text-gray-500">Financial overview, wallets, and ledger</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <SummaryCard label="Revenue" value={formatCurrency(summary.revenue)} sub={formatPercent(summary.contributionMargin) + ' contribution margin'} color="blue" />
        <SummaryCard label="Contribution" value={formatCurrency(summary.contribution)} sub="After direct costs" color="purple" />
        <SummaryCard label="Expenses" value={formatCurrency(summary.expenses)} sub="Operating costs" color="orange" />
        <SummaryCard label="Net Profit" value={formatCurrency(summary.netProfit)} sub={formatPercent(summary.netMargin) + ' margin'} color={summary.netProfit >= 0 ? 'green' : 'red'} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Cash Position */}
        <div className="lg:col-span-2 bg-white rounded-xl border border-gray-200 p-6">
          <h2 className="font-semibold text-gray-900 mb-1">Cash Allocation</h2>
          <p className="text-xs text-gray-400 mb-5">
            Total allocated: <strong>{formatCurrency(cash.totalAllocated)}</strong> |
            Total committed: <strong>{formatCurrency(cash.totalCommitted)}</strong> |
            Available: <strong>{formatCurrency(cash.totalAvailable)}</strong>
          </p>

          <div className="space-y-3">
            {cash.wallets?.map((w: any) => (
              <div key={w.key} className="flex items-center gap-4">
                <div className="w-3 h-3 rounded-full flex-shrink-0" style={{ backgroundColor: w.color }} />
                <div className="flex-1">
                  <div className="flex justify-between text-sm mb-1">
                    <span className="font-medium text-gray-700">{w.name}</span>
                    <span className="font-mono">
                      {formatCurrency(w.available)}
                      {w.committed > 0 && <span className="text-xs text-gray-400 ml-1">({formatCurrency(w.committed)} committed)</span>}
                    </span>
                  </div>
                  <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full"
                      style={{ width: `${cash.totalAllocated > 0 ? Math.min((w.balance / cash.totalAllocated) * 100, 100) : 0}%`, backgroundColor: w.color }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Withdrawal */}
          <div className="mt-6 pt-6 border-t border-gray-100">
            <div className="flex items-start gap-3 bg-green-50 border border-green-200 rounded-lg p-4 mb-4">
              <Banknote className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-semibold text-green-800">Available for Owner Withdrawal</p>
                <p className="text-2xl font-bold text-green-700">{formatCurrency(cash.availableForWithdrawal)}</p>
                <p className="text-xs text-green-600 mt-0.5">After all commitments, reserves, and tax allocations</p>
              </div>
            </div>

            <div className="flex gap-3">
              <input
                type="number"
                value={withdrawAmount}
                onChange={(e) => setWithdrawAmount(e.target.value)}
                placeholder="Amount (R)"
                className="flex-1 border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-900"
              />
              <input
                type="text"
                value={withdrawNote}
                onChange={(e) => setWithdrawNote(e.target.value)}
                placeholder="Note (optional)"
                className="flex-1 border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-900"
              />
              <button
                onClick={() => withdraw.mutate({ amount: parseFloat(withdrawAmount), description: withdrawNote || 'Owner withdrawal' })}
                disabled={!withdrawAmount || withdraw.isPending}
                className="px-4 py-2 bg-green-700 text-white rounded-lg text-sm font-medium hover:bg-green-800 disabled:opacity-40 transition-colors"
              >
                {withdraw.isPending ? 'Processing...' : 'Withdraw'}
              </button>
            </div>
            {withdraw.isError && <p className="text-red-600 text-xs mt-2">{(withdraw.error as Error).message}</p>}
          </div>
        </div>

        {/* Key Figures & Allocation Rules */}
        <div className="space-y-4">
          <div className="bg-white rounded-xl border border-gray-200 p-5">
            <h2 className="font-semibold text-gray-900 mb-3">Key Figures</h2>
            <div className="space-y-2.5 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-500">Tax reserved</span>
                <span className="font-mono font-medium text-red-600">{formatCurrency(keyFigures.taxReserved)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Business reserve</span>
                <span className="font-mono font-medium">{formatCurrency(keyFigures.businessReserve)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Fulfillment committed</span>
                <span className="font-mono font-medium text-blue-600">{formatCurrency(keyFigures.fulfillmentCommitted)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Marketing available</span>
                <span className="font-mono font-medium text-purple-600">{formatCurrency(keyFigures.marketingAvailable)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Refunds (paid)</span>
                <span className="font-mono font-medium text-orange-600">{formatCurrency(summary.refunds)}</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-gray-200 p-5">
            <h2 className="font-semibold text-gray-900 mb-3">Allocation Rules</h2>
            <p className="text-xs text-gray-400 mb-3">How each payment is split</p>
            <div className="space-y-2 text-sm">
              {rules?.map((r: any) => (
                <div key={r.accountKey} className="flex justify-between">
                  <span className="text-gray-600">{r.name.replace(' Allocation', '')}</span>
                  <span className="font-medium">{(parseFloat(r.percentage) * 100).toFixed(0)}%</span>
                </div>
              ))}
            </div>
            <a href="/settings" className="text-xs text-blue-600 hover:underline mt-3 block">Edit rules in Settings</a>
          </div>
        </div>
      </div>

      {/* Transaction Ledger */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="px-5 py-4 border-b border-gray-100">
          <h2 className="font-semibold text-gray-900">Transaction Ledger</h2>
          <p className="text-xs text-gray-400">Every financial event recorded</p>
        </div>
        <table className="w-full text-sm">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-4 py-2.5 text-left font-medium text-gray-600">Date</th>
              <th className="px-4 py-2.5 text-left font-medium text-gray-600">Type</th>
              <th className="px-4 py-2.5 text-left font-medium text-gray-600">Description</th>
              <th className="px-4 py-2.5 text-left font-medium text-gray-600">Order</th>
              <th className="px-4 py-2.5 text-right font-medium text-gray-600">Amount</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {ledger?.data?.map((tx: any) => (
              <tr key={tx.id} className="hover:bg-gray-50">
                <td className="px-4 py-2.5 text-gray-500 whitespace-nowrap">{new Date(tx.createdAt).toLocaleDateString('en-ZA')}</td>
                <td className="px-4 py-2.5">
                  <span className="text-xs bg-gray-100 text-gray-700 px-2 py-0.5 rounded font-medium">{tx.type.replace(/_/g, ' ')}</span>
                </td>
                <td className="px-4 py-2.5 text-gray-700">{tx.description}</td>
                <td className="px-4 py-2.5 text-gray-500">{tx.order?.orderNumber ?? '—'}</td>
                <td className={`px-4 py-2.5 text-right font-mono font-medium ${tx.direction === 'credit' ? 'text-green-600' : 'text-red-600'}`}>
                  {tx.direction === 'credit' ? '+' : '-'}{formatCurrency(parseFloat(tx.amount))}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

function SummaryCard({ label, value, sub, color }: { label: string; value: string; sub: string; color: string }) {
  const colors: Record<string, string> = {
    blue: 'text-blue-600 bg-blue-50',
    purple: 'text-purple-600 bg-purple-50',
    green: 'text-green-600 bg-green-50',
    red: 'text-red-600 bg-red-50',
    orange: 'text-orange-600 bg-orange-50',
  }
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-5">
      <p className="text-sm text-gray-500 font-medium mb-1">{label}</p>
      <p className={`text-xl font-bold ${colors[color]?.split(' ')[0] ?? 'text-gray-900'}`}>{value}</p>
      <p className="text-xs text-gray-400 mt-1">{sub}</p>
    </div>
  )
}
