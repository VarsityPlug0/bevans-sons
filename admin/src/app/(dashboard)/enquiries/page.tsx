'use client'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'
import api from '@/lib/api'
import { Mail, Phone, Trash2, MessageSquare } from 'lucide-react'

export default function EnquiriesPage() {
  const qc = useQueryClient()
  const [page, setPage] = useState(1)
  const [selected, setSelected] = useState<any>(null)

  const { data, isLoading } = useQuery({
    queryKey: ['enquiries', page],
    queryFn: () => api.get<any>(`/api/admin/enquiries?page=${page}`),
  })

  const remove = useMutation({
    mutationFn: (id: string) => api.delete(`/api/admin/enquiries/${id}`),
    onSuccess: () => { qc.invalidateQueries({ queryKey: ['enquiries'] }); setSelected(null) },
  })

  const enquiries: any[] = data?.data ?? []

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Enquiries</h1>
          <p className="text-sm text-gray-500">Contact form submissions from your store</p>
        </div>
        <span className="text-sm text-gray-400">{data?.pagination?.total ?? 0} total</span>
      </div>

      {isLoading && (
        <div className="space-y-3">
          {[1,2,3].map(n => <div key={n} className="h-20 bg-gray-100 rounded-xl animate-pulse" />)}
        </div>
      )}

      {!isLoading && enquiries.length === 0 && (
        <div className="bg-white rounded-xl border border-gray-200 p-16 text-center">
          <MessageSquare className="w-10 h-10 text-gray-300 mx-auto mb-3" />
          <p className="text-gray-400 text-sm">No enquiries yet.</p>
          <p className="text-gray-300 text-xs mt-1">Messages from your contact form will appear here.</p>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        {/* List */}
        <div className="lg:col-span-2 space-y-2">
          {enquiries.map((enq: any) => (
            <button
              key={enq.id}
              onClick={() => setSelected(enq)}
              className={`w-full text-left bg-white rounded-xl border p-4 hover:border-gray-400 transition-colors ${selected?.id === enq.id ? 'border-gray-900' : 'border-gray-200'}`}
            >
              <div className="flex items-start justify-between gap-2">
                <div className="min-w-0">
                  <p className="font-semibold text-gray-900 text-sm truncate">{enq.name}</p>
                  <p className="text-xs text-gray-400 truncate">{enq.email}</p>
                  <p className="text-xs text-gray-500 mt-1 truncate">{enq.subject}</p>
                </div>
                <div className="text-[10px] text-gray-400 flex-shrink-0 text-right">
                  {new Date(enq.receivedAt).toLocaleDateString('en-ZA', { month: 'short', day: 'numeric' })}
                </div>
              </div>
            </button>
          ))}

          {data?.pagination && data.pagination.totalPages > 1 && (
            <div className="flex justify-between pt-2 text-sm text-gray-500">
              <button disabled={page === 1} onClick={() => setPage(p => p - 1)} className="px-3 py-1 rounded border border-gray-200 disabled:opacity-40">Prev</button>
              <span className="py-1">Page {page} of {data.pagination.totalPages}</span>
              <button disabled={page >= data.pagination.totalPages} onClick={() => setPage(p => p + 1)} className="px-3 py-1 rounded border border-gray-200 disabled:opacity-40">Next</button>
            </div>
          )}
        </div>

        {/* Detail */}
        <div className="lg:col-span-3">
          {selected ? (
            <div className="bg-white rounded-xl border border-gray-200 p-6 space-y-5">
              <div className="flex items-start justify-between">
                <div>
                  <h2 className="text-lg font-bold text-gray-900">{selected.subject}</h2>
                  <p className="text-xs text-gray-400 mt-0.5">
                    {new Date(selected.receivedAt).toLocaleString('en-ZA', { dateStyle: 'medium', timeStyle: 'short' })}
                  </p>
                </div>
                <button
                  onClick={() => remove.mutate(selected.id)}
                  disabled={remove.isPending}
                  className="text-gray-400 hover:text-red-500 transition-colors disabled:opacity-40"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>

              <div className="flex flex-col gap-2 text-sm">
                <div className="flex items-center gap-2 text-gray-600">
                  <span className="font-medium text-gray-900 w-16">Name</span>
                  {selected.name}
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <span className="font-medium text-gray-900 w-16">Email</span>
                  <a href={`mailto:${selected.email}`} className="text-blue-600 hover:underline">{selected.email}</a>
                </div>
                {selected.phone && (
                  <div className="flex items-center gap-2 text-gray-600">
                    <span className="font-medium text-gray-900 w-16">Phone</span>
                    <a href={`tel:${selected.phone}`} className="hover:underline">{selected.phone}</a>
                  </div>
                )}
              </div>

              <div className="bg-gray-50 rounded-lg p-4">
                <p className="text-sm text-gray-700 whitespace-pre-wrap">{selected.message}</p>
              </div>

              <div className="flex gap-3">
                <a
                  href={`mailto:${selected.email}?subject=Re: ${encodeURIComponent(selected.subject)}`}
                  className="flex items-center gap-2 flex-1 justify-center py-2.5 rounded-lg bg-gray-900 text-white text-sm font-medium hover:bg-gray-800 transition-colors"
                >
                  <Mail className="w-4 h-4" />
                  Reply via Email
                </a>
                {selected.phone && (
                  <a
                    href={`https://wa.me/${selected.phone.replace(/\D/g, '')}?text=Hi ${encodeURIComponent(selected.name)}, thanks for reaching out to Bevans Sons!`}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-2 flex-1 justify-center py-2.5 rounded-lg bg-green-500 text-white text-sm font-medium hover:bg-green-600 transition-colors"
                  >
                    <Phone className="w-4 h-4" />
                    WhatsApp
                  </a>
                )}
              </div>
            </div>
          ) : (
            <div className="bg-gray-50 rounded-xl border border-dashed border-gray-200 h-64 flex items-center justify-center text-gray-400 text-sm">
              Select an enquiry to view details
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
