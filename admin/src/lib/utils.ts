import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-ZA', { style: 'currency', currency: 'ZAR' }).format(amount)
}

export function formatPercent(value: number, decimals = 1): string {
  return `${(value * 100).toFixed(decimals)}%`
}

export function formatDate(date: string | Date): string {
  return new Intl.DateTimeFormat('en-ZA', { dateStyle: 'medium' }).format(new Date(date))
}

export function formatDateTime(date: string | Date): string {
  return new Intl.DateTimeFormat('en-ZA', { dateStyle: 'medium', timeStyle: 'short' }).format(new Date(date))
}

export function calcHealthColor(status: string) {
  if (status === 'HEALTHY') return 'text-green-600'
  if (status === 'NEEDS_ATTENTION') return 'text-yellow-600'
  if (status === 'CRITICAL') return 'text-red-600'
  return 'text-gray-600'
}

export function severityColor(severity: string) {
  if (severity === 'CRITICAL') return 'bg-red-100 text-red-800 border-red-200'
  if (severity === 'WARNING') return 'bg-yellow-100 text-yellow-800 border-yellow-200'
  return 'bg-blue-100 text-blue-800 border-blue-200'
}

export function statusColor(status: string) {
  const map: Record<string, string> = {
    PUBLISHED: 'bg-green-100 text-green-800',
    APPROVED: 'bg-blue-100 text-blue-800',
    DRAFT: 'bg-gray-100 text-gray-800',
    PRICING_REVIEW: 'bg-orange-100 text-orange-800',
    MARKET_REVIEW: 'bg-purple-100 text-purple-800',
    REJECTED: 'bg-red-100 text-red-800',
    ARCHIVED: 'bg-gray-100 text-gray-500',
    PAID: 'bg-green-100 text-green-800',
    PENDING: 'bg-yellow-100 text-yellow-800',
    FAILED: 'bg-red-100 text-red-800',
    REFUNDED: 'bg-orange-100 text-orange-800',
    UNFULFILLED: 'bg-yellow-100 text-yellow-800',
    PROCESSING: 'bg-blue-100 text-blue-800',
    SHIPPED: 'bg-indigo-100 text-indigo-800',
    DELIVERED: 'bg-green-100 text-green-800',
    CANCELLED: 'bg-gray-100 text-gray-800',
  }
  return map[status] ?? 'bg-gray-100 text-gray-800'
}
