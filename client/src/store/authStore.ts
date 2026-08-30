import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface Customer {
  id: string
  email: string
  firstName: string
  lastName: string
  phone?: string
}

interface AuthState {
  customer: Customer | null
  token: string | null
  login: (customer: Customer, token: string) => void
  logout: () => void
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      customer: null,
      token: null,
      login: (customer, token) => {
        if (typeof window !== 'undefined') localStorage.setItem('customer_token', token)
        set({ customer, token })
      },
      logout: () => {
        if (typeof window !== 'undefined') localStorage.removeItem('customer_token')
        set({ customer: null, token: null })
      },
    }),
    { name: 'auth' }
  )
)
