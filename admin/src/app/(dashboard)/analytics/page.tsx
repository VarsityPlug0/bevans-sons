'use client'
import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'
import api from '@/lib/api'
import { formatCurrency, formatPercent } from '@/lib/utils'

export default function AnalyticsPage() {
  const [days, setDays] = useState('30')
  const to = new Date().toISOString()
  const from = new Date(Date.now() - parseInt(days) * 86400000).toISOString()
  const params = `from=${from}&to=${to}`

  const { data: sales } = useQuery({ queryKey: ['analytics-sales', days], queryFn: () => api.get<any>(`/api/admin/analytics/sales?${params}`) })
  const { data: products } = useQuery({ queryKey: ['analytics-products', days], queryFn: () => api.get<any>(`/api/admin/analytics/products?${params}`) })
  const { data: customers } = useQuery({ queryKey: ['analytics-customers', days], queryFn: () => api.get<any>(`/api/admin/analytics/customers?${params}`) })
  const { data: financial } = useQuery({ queryKey: ['analytics-financial', days], queryFn: () => api.get<any>(`/api/admin/analytics/financial?${params}`) })
  const { data: inventory } = useQuery({ queryKey: ['analytics-inventory'], queryFn: () => api.get<any>('/api/admin/analytics/inventory') })

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Analytics</h1>
          <p className="text-sm text-gray-500">Business performance data</p>
        </div>
        <div className="flex gap-2">
          {['7', '30', '90', '365'].map((d) => (
            <button key={d} onClick={() => setDays(d)} className={`px-3 py-1.5 text-sm rounded-lg font-medium transition-colors ${days === d ? 'bg-gray-900 text-white' : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'}`}>
              {d === '365' ? '1yr' : `${d}d`}
            </button>
          ))}
        </div>
      </div>

      {/* Financial */}
      <Section title="Financial">
        <StatGrid>
          <Stat label="Revenue" value={formatCurrency(financial?.revenue ?? 0)} />
          <Stat label="Contribution" value={formatCurrency(financial?.contribution ?? 0)} sub={formatPercent(financial?.contributionMargin ?? 0)} />
          <Stat label="Expenses" value={formatCurrency(financial?.expenses ?? 0)} />
          <Stat label="Net Profit" value={formatCurrency(financial?.netProfit ?? 0)} sub={formatPercent(financial?.netMargin ?? 0)} highlight={financial?.netProfit >= 0} />
          <Stat label="Refunds" value={formatCurrency(financial?.refunds ?? 0)} />
        </StatGrid>
      </Section>

      {/* Sales */}
      <Section title="Sales">
        <StatGrid>
          <Stat label="Orders" value={sales?.orders ?? 0} />
          <Stat label="AOV" value={formatCurrency(sales?.aov ?? 0)} />
          <Stat label="Discounts" value={formatCurrency(sales?.discounts ?? 0)} />
        </StatGrid>
      </Section>

      {/* Products */}
      <Section title="Top Products">
        <table className="w-full text-sm">
          <thead className="border-b border-gray-200">
            <tr className="text-left">
              <th className="pb-2 font-medium text-gray-600">Product</th>
              <th className="pb-2 text-right font-medium text-gray-600">Units</th>
              <th className="pb-2 text-right font-medium text-gray-600">Revenue</th>
              <th className="pb-2 text-right font-medium text-gray-600">Contribution</th>
              <th className="pb-2 text-right font-medium text-gray-600">Margin</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {products?.bestSellers?.map((p: any) => (
              <tr key={p.productId}>
                <td className="py-2 font-medium text-gray-900">{p.productName}</td>
                <td className="py-2 text-right text-gray-600">{p.unitsSold}</td>
                <td className="py-2 text-right font-mono">{formatCurrency(p.revenue)}</td>
                <td className="py-2 text-right font-mono">{formatCurrency(p.contribution)}</td>
                <td className="py-2 text-right"><span className={p.margin >= 0.25 ? 'text-green-600 font-medium' : 'text-red-600 font-medium'}>{formatPercent(p.margin)}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </Section>

      {/* Customers */}
      <Section title="Customers">
        <StatGrid>
          <Stat label="New Customers" value={customers?.newCustomers ?? 0} />
          <Stat label="Total Customers" value={customers?.totalCustomers ?? 0} />
          <Stat label="Repeat Purchase Rate" value={formatPercent(customers?.repeatPurchaseRate ?? 0)} />
          <Stat label="Avg Lifetime Value" value={formatCurrency(customers?.avgLifetimeValue ?? 0)} />
        </StatGrid>
      </Section>

      {/* Inventory */}
      <Section title="Inventory">
        <StatGrid>
          <Stat label="Total Available" value={inventory?.totalAvailable ?? 0} />
          <Stat label="Reserved" value={inventory?.totalReserved ?? 0} />
          <Stat label="Committed (sold)" value={inventory?.totalCommitted ?? 0} />
          <Stat label="Damaged" value={inventory?.totalDamaged ?? 0} />
          <Stat label="Out of Stock Variants" value={inventory?.outOfStockVariants ?? 0} highlight={false} />
        </StatGrid>
      </Section>
    </div>
  )
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6">
      <h2 className="font-semibold text-gray-900 mb-5">{title}</h2>
      {children}
    </div>
  )
}

function StatGrid({ children }: { children: React.ReactNode }) {
  return <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">{children}</div>
}

function Stat({ label, value, sub, highlight }: { label: string; value: string | number; sub?: string; highlight?: boolean }) {
  return (
    <div>
      <p className="text-xs text-gray-400 mb-1">{label}</p>
      <p className={`text-xl font-bold ${highlight === false ? 'text-red-600' : highlight ? 'text-green-600' : 'text-gray-900'}`}>{value}</p>
      {sub && <p className="text-xs text-gray-400 mt-0.5">{sub}</p>}
    </div>
  )
}
