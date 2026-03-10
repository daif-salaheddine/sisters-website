import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { format } from 'date-fns'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDate(date: Date | string | null | undefined): string {
  if (!date) return 'Present'
  const d = typeof date === 'string' ? new Date(date) : date
  return format(d, 'MMM yyyy')
}

export function formatDateRange(
  startDate: Date | string,
  endDate: Date | string | null | undefined,
  current?: boolean
): string {
  const start = formatDate(startDate)
  const end = current ? 'Present' : endDate ? formatDate(endDate) : 'Present'
  return `${start} - ${end}`
}

export function generateFilename(originalName: string): string {
  const ext = originalName.split('.').pop() || 'jpg'
  const timestamp = Date.now()
  const random = Math.random().toString(36).substring(2, 8)
  return `${timestamp}-${random}.${ext}`
}