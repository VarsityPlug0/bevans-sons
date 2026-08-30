'use client'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'
import api from '@/lib/api'
import { Plus, Pencil, Trash2, Eye, EyeOff, Navigation } from 'lucide-react'

const BLANK = { name: '', description: '', imageUrl: '', parentId: '', isActive: true, showInNav: false, sortOrder: 0 }

export default function CategoriesPage() {
  const qc = useQueryClient()
  const [editing, setEditing] = useState<any | null>(null)
  const [form, setForm] = useState({ ...BLANK })
  const [showForm, setShowForm] = useState(false)
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null)
  const [error, setError] = useState('')

  const { data: categories = [], isLoading } = useQuery({
    queryKey: ['admin-categories'],
    queryFn: () => api.get<any[]>('/api/admin/categories'),
  })

  const save = useMutation({
    mutationFn: () => {
      const payload = {
        ...form,
        sortOrder: Number(form.sortOrder),
        parentId: form.parentId || undefined,
        imageUrl: form.imageUrl || undefined,
        description: form.description || undefined,
      }
      return editing
        ? api.put(`/api/admin/categories/${editing.id}`, payload)
        : api.post('/api/admin/categories', payload)
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['admin-categories'] })
      setShowForm(false)
      setEditing(null)
      setForm({ ...BLANK })
      setError('')
    },
    onError: (err: Error) => setError(err.message),
  })

  const toggleNav = useMutation({
    mutationFn: (cat: any) => api.put(`/api/admin/categories/${cat.id}`, { showInNav: !cat.showInNav }),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['admin-categories'] }),
  })

  const toggleActive = useMutation({
    mutationFn: (cat: any) => api.put(`/api/admin/categories/${cat.id}`, { isActive: !cat.isActive }),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['admin-categories'] }),
  })

  const deleteCat = useMutation({
    mutationFn: (id: string) => api.delete(`/api/admin/categories/${id}`),
    onSuccess: () => { qc.invalidateQueries({ queryKey: ['admin-categories'] }); setDeleteConfirm(null) },
    onError: (err: Error) => { setError(err.message); setDeleteConfirm(null) },
  })

  function openNew() {
    setEditing(null)
    setForm({ ...BLANK })
    setShowForm(true)
    setError('')
  }

  function openEdit(cat: any) {
    setEditing(cat)
    setForm({
      name: cat.name,
      description: cat.description ?? '',
      imageUrl: cat.imageUrl ?? '',
      parentId: cat.parentId ?? '',
      isActive: cat.isActive,
      showInNav: cat.showInNav,
      sortOrder: cat.sortOrder,
    })
    setShowForm(true)
    setError('')
  }

  const topLevel = categories.filter((c: any) => !c.parentId)
  const navCount = categories.filter((c: any) => c.showInNav).length

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Categories</h1>
          <p className="text-sm text-gray-500">Manage product categories and navbar navigation</p>
        </div>
        <button onClick={openNew} className="flex items-center gap-2 bg-gray-900 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-800">
          <Plus className="w-4 h-4" /> New Category
        </button>
      </div>

      {/* Nav summary */}
      <div className="bg-blue-50 border border-blue-200 rounded-xl px-5 py-4 flex items-center gap-3">
        <Navigation className="w-5 h-5 text-blue-600 flex-shrink-0" />
        <p className="text-sm text-blue-800">
          <span className="font-semibold">{navCount}</span> {navCount === 1 ? 'category' : 'categories'} showing in the storefront navbar.
          Toggle the <span className="font-semibold">Nav</span> button on any category to show/hide it in the navbar.
        </p>
      </div>

      {error && <p className="text-red-600 text-sm bg-red-50 border border-red-200 rounded-lg px-4 py-3">{error}</p>}

      {/* Form modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black/30 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl p-6 w-full max-w-lg shadow-xl">
            <h2 className="font-bold text-gray-900 mb-5">{editing ? 'Edit Category' : 'New Category'}</h2>
            <div className="space-y-4">
              <div>
                <label className="text-xs font-medium text-gray-600 block mb-1">Name *</label>
                <input
                  value={form.name}
                  onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-900"
                  placeholder="e.g. Shirts, Sneakers, Men..."
                />
              </div>
              <div>
                <label className="text-xs font-medium text-gray-600 block mb-1">Description</label>
                <input
                  value={form.description}
                  onChange={e => setForm(f => ({ ...f, description: e.target.value }))}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-900"
                  placeholder="Short description (optional)"
                />
              </div>
              <div>
                <label className="text-xs font-medium text-gray-600 block mb-1">Image URL</label>
                <input
                  value={form.imageUrl}
                  onChange={e => setForm(f => ({ ...f, imageUrl: e.target.value }))}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-900"
                  placeholder="https://... (optional)"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-medium text-gray-600 block mb-1">Parent Category</label>
                  <select
                    value={form.parentId}
                    onChange={e => setForm(f => ({ ...f, parentId: e.target.value }))}
                    className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-900 bg-white"
                  >
                    <option value="">None (top-level)</option>
                    {topLevel.filter((c: any) => c.id !== editing?.id).map((c: any) => (
                      <option key={c.id} value={c.id}>{c.name}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="text-xs font-medium text-gray-600 block mb-1">Sort Order</label>
                  <input
                    type="number"
                    value={form.sortOrder}
                    onChange={e => setForm(f => ({ ...f, sortOrder: parseInt(e.target.value) || 0 }))}
                    className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-900"
                    placeholder="0"
                  />
                </div>
              </div>
              <div className="flex gap-6">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" checked={form.isActive} onChange={e => setForm(f => ({ ...f, isActive: e.target.checked }))} className="w-4 h-4 accent-gray-900" />
                  <span className="text-sm text-gray-700">Active (visible to customers)</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" checked={form.showInNav} onChange={e => setForm(f => ({ ...f, showInNav: e.target.checked }))} className="w-4 h-4 accent-gray-900" />
                  <span className="text-sm text-gray-700">Show in navbar</span>
                </label>
              </div>
            </div>
            {error && <p className="text-red-600 text-xs mt-3">{error}</p>}
            <div className="flex gap-3 mt-6">
              <button onClick={() => { setShowForm(false); setEditing(null); setError('') }} className="flex-1 border border-gray-200 rounded-lg py-2 text-sm hover:bg-gray-50">Cancel</button>
              <button
                onClick={() => save.mutate()}
                disabled={!form.name || save.isPending}
                className="flex-1 bg-gray-900 text-white rounded-lg py-2 text-sm hover:bg-gray-800 disabled:opacity-40"
              >
                {save.isPending ? 'Saving...' : editing ? 'Save Changes' : 'Create Category'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete confirm */}
      {deleteConfirm && (
        <div className="fixed inset-0 bg-black/30 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl p-6 w-full max-w-sm shadow-xl">
            <h3 className="font-bold text-gray-900 mb-2">Delete Category?</h3>
            <p className="text-sm text-gray-500 mb-5">This action cannot be undone. Categories with products cannot be deleted.</p>
            <div className="flex gap-3">
              <button onClick={() => setDeleteConfirm(null)} className="flex-1 border border-gray-200 rounded-lg py-2 text-sm hover:bg-gray-50">Cancel</button>
              <button onClick={() => deleteCat.mutate(deleteConfirm!)} disabled={deleteCat.isPending} className="flex-1 bg-red-600 text-white rounded-lg py-2 text-sm hover:bg-red-700 disabled:opacity-40">
                {deleteCat.isPending ? 'Deleting...' : 'Delete'}
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-4 py-3 text-left font-medium text-gray-600">Category</th>
              <th className="px-4 py-3 text-left font-medium text-gray-600">Parent</th>
              <th className="px-4 py-3 text-center font-medium text-gray-600">Products</th>
              <th className="px-4 py-3 text-center font-medium text-gray-600">Order</th>
              <th className="px-4 py-3 text-center font-medium text-gray-600">Navbar</th>
              <th className="px-4 py-3 text-center font-medium text-gray-600">Status</th>
              <th className="px-4 py-3 text-right font-medium text-gray-600">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {isLoading && <tr><td colSpan={7} className="px-4 py-8 text-center text-gray-400">Loading...</td></tr>}
            {!isLoading && categories.length === 0 && (
              <tr><td colSpan={7} className="px-4 py-10 text-center text-gray-400">No categories yet. Create one to get started.</td></tr>
            )}
            {categories.map((cat: any) => (
              <tr key={cat.id} className="hover:bg-gray-50">
                <td className="px-4 py-3">
                  <div className="flex items-center gap-3">
                    {cat.imageUrl && <img src={cat.imageUrl} alt={cat.name} className="w-9 h-9 rounded-lg object-cover border border-gray-100 flex-shrink-0" />}
                    <div>
                      <p className="font-medium text-gray-900">{cat.name}</p>
                      <p className="text-xs text-gray-400 font-mono">{cat.slug}</p>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-3 text-gray-500">{cat.parent?.name ?? <span className="text-gray-300">—</span>}</td>
                <td className="px-4 py-3 text-center text-gray-700">{cat._count?.products ?? 0}</td>
                <td className="px-4 py-3 text-center text-gray-500">{cat.sortOrder}</td>
                <td className="px-4 py-3 text-center">
                  <button
                    onClick={() => toggleNav.mutate(cat)}
                    title={cat.showInNav ? 'Remove from navbar' : 'Add to navbar'}
                    className={`px-2.5 py-1 rounded-full text-xs font-medium transition-colors ${cat.showInNav ? 'bg-blue-100 text-blue-700 hover:bg-blue-200' : 'bg-gray-100 text-gray-400 hover:bg-gray-200'}`}
                  >
                    {cat.showInNav ? 'In Nav' : 'Hidden'}
                  </button>
                </td>
                <td className="px-4 py-3 text-center">
                  <button
                    onClick={() => toggleActive.mutate(cat)}
                    className={`px-2.5 py-1 rounded-full text-xs font-medium transition-colors ${cat.isActive ? 'bg-green-100 text-green-700 hover:bg-green-200' : 'bg-red-100 text-red-700 hover:bg-red-200'}`}
                  >
                    {cat.isActive ? 'Active' : 'Inactive'}
                  </button>
                </td>
                <td className="px-4 py-3 text-right">
                  <div className="flex items-center justify-end gap-1">
                    <button onClick={() => openEdit(cat)} className="p-1.5 text-gray-400 hover:text-gray-700 hover:bg-gray-100 rounded">
                      <Pencil className="w-3.5 h-3.5" />
                    </button>
                    <button onClick={() => setDeleteConfirm(cat.id)} className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded">
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
