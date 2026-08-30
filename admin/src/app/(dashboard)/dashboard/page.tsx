'use client'
import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'
import api from '@/lib/api'
import { formatCurrency, formatPercent, calcHealthColor, severityColor } from '@/lib/utils'
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend,
} from 'recharts'
import {
  TrendingUp, ShoppingBag, DollarSign, Package, AlertTriangle,
  ArrowUpRight, ArrowDownRight, Banknote, Target, RefreshCw,
} from 'lucide-react'

type DashboardData = {
  period: { days: number; since: string }
  revenue: { total: number; vsLast: number | null; orders: number; aov: number }
  contribution: { total: number; margin: number }
  profitability: { grossProfit: number; operatingExpenses: number; netProfit: number; netMargin: number }
  cash: { totalAllocated: number; totalCommitted: number; availableForWithdrawal: number; taxReserved: number; businessReserve: number; wallets: any[] }
  operations: { pendingFulfillment: number; pendingRefunds: number; lowStockCount: number; outOfStockCount: number; lowStockItems: any[]; outOfStockItems: any[] }
  alerts: { total: number; critical: number; warnings: number; items: any[] }
  chart: { date: string; revenue: number; contribution: number; orders: number }[]
  businessHealth: { status: string; issues: { severity: string; message: string }[] }
}

export default function DashboardPage() {
  const [period, setPeriod] = useState('30')

  const { data, isLoading } = useQuery<DashboardData>({
    queryKey: ['dashboard', period],
    queryFn: () => api.get(`/api/admin/dashboard?period=${period}`),
    refetchInterval: 60_000,
  })

  const { data: breakEven } = useQuery({
    queryKey: ['break-even', period],
    queryFn: () => api.get<any>(`/api/admin/dashboard/break-even?period=${period}`),
  })

  if (isLoading) return <div className="flex items-center justify-center h-96 text-gray-400">Loading...</div>
  if (!data) return null

  const { revenue, contribution, profitability, cash, operations, alerts, chart, businessHealth } = data

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Business Dashboard</h1>
          <p className="text-sm text-gray-500 mt-0.5">Real-time business performance</p>
        </div>
        <div className="flex gap-2">
          {['7', '30', '90', '365'].map((d) => (
            <button
              key={d}
              onClick={() => setPeriod(d)}
              className={`px-3 py-1.5 text-sm rounded-lg font-medium transition-colors ${period === d ? 'bg-gray-900 text-white' : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'}`}
            >
              {d === '365' ? '1 year' : `${d}d`}
            </button>
          ))}
        </div>
      </div>

      {/* Business Health Banner */}
      <div className={`rounded-xl border px-5 py-4 flex items-start gap-3 ${
        businessHealth.status === 'HEALTHY' ? 'bg-green-50 border-green-200' :
        businessHealth.status === 'NEEDS_ATTENTION' ? 'bg-yellow-50 border-yellow-200' :
        'bg-red-50 border-red-200'
      }`}>
        <div className={`mt-0.5 w-2 h-2 rounded-full flex-shrink-0 ${
          businessHealth.status === 'HEALTHY' ? 'bg-green-500' :
          businessHealth.status === 'NEEDS_ATTENTION' ? 'bg-yellow-500' : 'bg-red-500'
        }`} />
        <div>
          <p className={`font-semibold text-sm ${calcHealthColor(businessHealth.status)}`}>
            Business Health: {businessHealth.status.replace('_', ' ')}
          </p>
          {businessHealth.issues.map((issue, i) => (
            <p key={i} className="text-sm text-gray-600 mt-0.5">{issue.message}</p>
          ))}
        </div>
      </div>

      {/* Key Metrics Row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard
          label="Revenue"
          value={formatCurrency(revenue.total)}
          sub={`${revenue.orders} orders`}
          change={revenue.vsLast}
          icon={<TrendingUp className="w-5 h-5" />}
          color="blue"
        />
        <MetricCard
          label="Contribution"
          value={formatCurrency(contribution.total)}
          sub={formatPercent(contribution.margin) + ' margin'}
          icon={<Target className="w-5 h-5" />}
          color="purple"
        />
        <MetricCard
          label="Net Profit"
          value={formatCurrency(profitability.netProfit)}
          sub={formatPercent(profitability.netMargin) + ' margin'}
          icon={<DollarSign className="w-5 h-5" />}
          color={profitability.netProfit >= 0 ? 'green' : 'red'}
        />
        <MetricCard
          label="Avg Order Value"
          value={formatCurrency(revenue.aov)}
          sub="per paid order"
          icon={<ShoppingBag className="w-5 h-5" />}
          color="orange"
        />
      </div>

      {/* Revenue Chart */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h2 className="font-semibold text-gray-900 mb-4">Revenue & Contribution</h2>
        <ResponsiveContainer width="100%" height={280}>
          <AreaChart data={chart}>
            <defs>
              <linearGradient id="revGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.1} />
                <stop offset="95%" stopColor="#3B82F6" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="contGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#8B5CF6" stopOpacity={0.1} />
                <stop offset="95%" stopColor="#8B5CF6" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis dataKey="date" tick={{ fontSize: 11 }} tickFormatter={(d) => d.slice(5)} />
            <YAxis tick={{ fontSize: 11 }} tickFormatter={(v) => `R${(v / 1000).toFixed(0)}k`} />
            <Tooltip formatter={(v: number) => formatCurrency(v)} />
            <Legend />
            <Area type="monotone" dataKey="revenue" name="Revenue" stroke="#3B82F6" fill="url(#revGrad)" strokeWidth={2} />
            <Area type="monotone" dataKey="contribution" name="Contribution" stroke="#8B5CF6" fill="url(#contGrad)" strokeWidth={2} />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* P&L Summary */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h2 className="font-semibold text-gray-900 mb-4">P&L Summary</h2>
          <div className="space-y-3">
            <PLRow label="Revenue" value={profitability.grossProfit + profitability.operatingExpenses} positive />
            <PLRow label="Direct costs (COGS)" value={-(revenue.total - contribution.total)} />
            <PLRow label="Contribution" value={contribution.total} positive />
            <div className="border-t border-gray-100 pt-2" />
            <PLRow label="Operating expenses" value={-profitability.operatingExpenses} />
            <PLRow label="Net profit" value={profitability.netProfit} positive={profitability.netProfit >= 0} bold />
          </div>
        </div>

        {/* Cash / Wallet Summary */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h2 className="font-semibold text-gray-900 mb-1">Cash Allocation</h2>
          <p className="text-xs text-gray-400 mb-4">Total allocated: {formatCurrency(cash.totalAllocated)}</p>
          <div className="space-y-2">
            {cash.wallets.map((w) => (
              <div key={w.key} className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: w.color }} />
                  <span className="text-gray-700">{w.name}</span>
                </div>
                <div className="text-right">
                  <span className="font-medium">{formatCurrency(w.available)}</span>
                  {w.committed > 0 && <span className="text-xs text-gray-400 ml-1">({formatCurrency(w.committed)} committed)</span>}
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4 pt-4 border-t border-gray-100">
            <div className="flex justify-between text-sm">
              <span className="font-semibold text-green-700">Available for withdrawal</span>
              <span className="font-bold text-green-700">{formatCurrency(cash.availableForWithdrawal)}</span>
            </div>
          </div>
        </div>

        {/* Operations */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h2 className="font-semibold text-gray-900 mb-4">Action Required</h2>
          <div className="space-y-3">
            <OpRow label="Pending fulfillment" value={operations.pendingFulfillment} href="/orders?fulfillmentStatus=PROCESSING" urgent={operations.pendingFulfillment > 0} />
            <OpRow label="Refund requests" value={operations.pendingRefunds} href="/refunds?status=PENDING" urgent={operations.pendingRefunds > 0} />
            <OpRow label="Low stock products" value={operations.lowStockCount} href="/inventory" warn={operations.lowStockCount > 0} />
            <OpRow label="Out of stock" value={operations.outOfStockCount} href="/inventory" urgent={operations.outOfStockCount > 0} />
            <OpRow label="Unread alerts" value={alerts.critical} href="/alerts" urgent={alerts.critical > 0} />
          </div>

          {/* Break-even */}
          {breakEven && (
            <div className="mt-4 pt-4 border-t border-gray-100">
              <p className="text-xs font-medium text-gray-500 mb-2">Break-even ({period}d)</p>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Required orders</span>
                <span className="font-medium">{breakEven.breakEvenOrders ?? 'N/A'}</span>
              </div>
              <div className="flex justify-between text-sm mt-1">
                <span className="text-gray-600">Current orders</span>
                <span className={`font-medium ${breakEven.achieved ? 'text-green-600' : 'text-red-600'}`}>{breakEven.currentOrders}</span>
              </div>
              {breakEven.distanceFromBreakEven !== null && (
                <p className={`text-xs mt-1 ${breakEven.achieved ? 'text-green-600' : 'text-orange-600'}`}>
                  {breakEven.achieved
                    ? `${breakEven.distanceFromBreakEven} orders above break-even`
                    : `${Math.abs(breakEven.distanceFromBreakEven)} orders to break-even`}
                </p>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Recent Alerts */}
      {alerts.items.length > 0 && (
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h2 className="font-semibold text-gray-900 mb-4">Active Alerts</h2>
          <div className="space-y-2">
            {alerts.items.slice(0, 8).map((alert) => (
              <div key={alert.id} className={`flex items-start gap-3 rounded-lg border px-4 py-3 text-sm ${severityColor(alert.severity)}`}>
                <AlertTriangle className="w-4 h-4 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium">{alert.title}</p>
                  <p className="text-xs opacity-80 mt-0.5">{alert.message}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

function MetricCard({ label, value, sub, change, icon, color }: { label: string; value: string; sub: string; change?: number | null; icon: React.ReactNode; color: string }) {
  const colorMap: Record<string, string> = {
    blue: 'bg-blue-50 text-blue-600',
    purple: 'bg-purple-50 text-purple-600',
    green: 'bg-green-50 text-green-600',
    red: 'bg-red-50 text-red-600',
    orange: 'bg-orange-50 text-orange-600',
  }

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-5">
      <div className="flex items-center justify-between mb-3">
        <span className="text-sm text-gray-500 font-medium">{label}</span>
        <span className={`p-2 rounded-lg ${colorMap[color] || colorMap.blue}`}>{icon}</span>
      </div>
      <p className="text-2xl font-bold text-gray-900">{value}</p>
      <div className="flex items-center justify-between mt-1">
        <span className="text-xs text-gray-500">{sub}</span>
        {change !== null && change !== undefined && (
          <span className={`flex items-center gap-0.5 text-xs font-medium ${change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
            {change >= 0 ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
            {Math.abs(change).toFixed(1)}%
          </span>
        )}
      </div>
    </div>
  )
}

function PLRow({ label, value, positive, bold }: { label: string; value: number; positive?: boolean; bold?: boolean }) {
  return (
    <div className={`flex justify-between text-sm ${bold ? 'font-semibold' : ''}`}>
      <span className="text-gray-600">{label}</span>
      <span className={value >= 0 ? 'text-gray-900' : 'text-red-600'}>{formatCurrency(value)}</span>
    </div>
  )
}

function OpRow({ label, value, href, urgent, warn }: { label: string; value: number; href: string; urgent?: boolean; warn?: boolean }) {
  return (
    <a href={href} className="flex items-center justify-between text-sm hover:bg-gray-50 rounded px-1 py-0.5 transition-colors">
      <span className="text-gray-600">{label}</span>
      <span className={`font-semibold px-2 py-0.5 rounded-full text-xs ${urgent && value > 0 ? 'bg-red-100 text-red-700' : warn && value > 0 ? 'bg-yellow-100 text-yellow-700' : 'bg-gray-100 text-gray-600'}`}>
        {value}
      </span>
    </a>
  )
}
