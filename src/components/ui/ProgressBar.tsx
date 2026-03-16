import { cn } from '@/lib/utils'

interface ProgressBarProps {
  value: number
  className?: string
}

export function ProgressBar({ value, className }: ProgressBarProps) {
  return (
    <div className={cn('h-1.5 w-full overflow-hidden rounded-full bg-sand-200', className)}>
      <div
        className="h-full rounded-full bg-gradient-to-r from-terracotta-400 to-terracotta-500 transition-all duration-500 ease-out"
        style={{ width: `${Math.min(100, Math.max(0, value))}%` }}
      />
    </div>
  )
}