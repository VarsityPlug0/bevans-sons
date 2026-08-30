import api from './api'

export interface AdminUser {
  id: string
  email: string
  firstName: string
  lastName: string
  role: string
}

export async function login(email: string, password: string): Promise<{ user: AdminUser; token: string }> {
  const res = await api.post<{ user: AdminUser; token: string }>('/api/admin/auth/login', { email, password })
  localStorage.setItem('admin_token', res.token)
  localStorage.setItem('admin_user', JSON.stringify(res.user))
  return res
}

export function logout() {
  localStorage.removeItem('admin_token')
  localStorage.removeItem('admin_user')
  window.location.href = '/login'
}

export function getStoredUser(): AdminUser | null {
  if (typeof window === 'undefined') return null
  const raw = localStorage.getItem('admin_user')
  return raw ? JSON.parse(raw) : null
}

export function isAuthenticated(): boolean {
  if (typeof window === 'undefined') return false
  return !!localStorage.getItem('admin_token')
}
