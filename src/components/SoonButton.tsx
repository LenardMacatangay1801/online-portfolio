import type { ReactNode } from 'react'

type SoonButtonProps = {
  children: ReactNode
  className?: string
  compact?: boolean
}

/** Shared placeholder control for links and files that are still demo data. */
export function SoonButton({
  children,
  className = '',
  compact = false,
}: SoonButtonProps) {
  return (
    <span
      className={`btn-base btn-soon ${compact ? 'btn-soon-compact' : ''} ${className}`}
    >
      <span className="soon-pulse" aria-hidden />
      {children}
    </span>
  )
}
