'use client'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import api from '@/lib/api'
import { AlertTriangle, AlertCircle, Info, CheckCircle, RefreshCw } from 'lucide-react'

const severityIcon = (s: string) => {
  if (s === 'CRITICAL') return <AlertCircle className="w-4 h-4 text-red-500" />
  if (s === 'HIGH') return <AlertTriangle className="w-4 h-4 text-orange-500" />
  if (s === 'MEDIUM') return <AlertTriangle className="w-4 h-4 text-yellow-500" />
  return <Info className="w-4 h-4 text-blue-400" />
}

const severityBadge = (s: string) => {
  if (s === 'CRITICAL') return 'bg-red-100 text-red-700'
  if (s === 'HIGH') return 'bg-orange-100 text-orange-700'
  if (s === 'MEDIUM') return 'bg-yellow-100 text-yellow-700'
  return 'bg-blue-50 text-blue-600'
}

export default function AlertsPage() {
  const qc = useQueryClient()

  const { data: alerts, isLoading } = useQuery({
    queryKey: ['alerts'],
    queryFn: () => api.get<any[]>('/api/admin/alerts?isResolved=false'),
  })

  const runChecks = useMutation({
    mutationFn: () => api.post('/api/admin/alerts/run-checks', {}),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['alerts'] }),
  })

  const resolve = useMutation({
    mutationFn: (id: string) => api.post(`/api/admin/alerts/${id}/resolve`, {}),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['alerts'] }),
  })

  const critical = alerts?.filter((a) => a.severity === 'CRITICAL') ?? []
  const rest = alerts?.filter((a) => a.severity !== 'CRITICAL') ?? []
  const sorted = [...critical, ...rest]

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Alerts</h1>
          <p className="text-sm text-gray-500">Active business health alerts</p>
        </div>
        <button
          onClick={() => runChecks.mutate()}
          disabled={runChecks.isPending}
          className="flex items-center gap-2 border border-gray-200 bg-white text-gray-700 px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-50 disabled:opacity-40"
        >
          <RefreshCw className={`w-4 h-4 ${runChecks.isPending ? 'animate-spin' : ''}`} />
          Run Checks
        </button>
      </div>

      {isLoading && <p className="text-gray-400">Loading...</p>}

      {!isLoading && sorted.length === 0 && (
        <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
          <CheckCircle className="w-10 h-10 text-green-500 mx-auto mb-3" />
          <p className="font-medium text-gray-900">All clear</p>
          <p className="text-sm text-gray-400 mt-1">No active alerts. Your business is healthy.</p>
        </div>
      )}

      <div className="space-y-3">
        {sorted.map((alert: any) => (
          <div key={alert.id} className={`bg-white rounded-xl border p-5 flex items-start gap-4 ${alert.severity === 'CRITICAL' ? 'border-red-200' : 'border-gray-200'}`}>
            <div className="mt-0.5 flex-shrink-0">{severityIcon(alert.severity)}</div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${severityBadge(alert.severity)}`}>{alert.severity}</span>
                <span className="text-xs text-gray-400 font-mono">{alert.type.replace(/_/g, ' ')}</span>
              </div>
              <p className="text-sm font-medium text-gray-900">{alert.message}</p>
              {alert.metadata && (
                <p className="text-xs text-gray-400 mt-1 font-mono">{JSON.stringify(alert.metadata)}</p>
              )}
              <p className="text-xs text-gray-400 mt-1">{new Date(alert.createdAt).toLocaleString('en-ZA')}</p>
            </div>
            <button
              onClick={() => resolve.mutate(alert.id)}
              className="text-xs text-gray-400 hover:text-gray-700 border border-gray-200 rounded-lg px-3 py-1.5 flex-shrink-0"
            >
              Resolve
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}
