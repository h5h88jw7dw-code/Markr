import React from 'react'
import type { Track } from '@/types'
import { getBandColor } from '@/lib/constants'

interface BadgeProps {
  children: React.ReactNode
  className?: string
}

export function Badge({ children, className = '' }: BadgeProps) {
  return (
    <span
      className={[
        'inline-flex items-center px-2 py-0.5 rounded-md text-xs font-medium',
        className,
      ].join(' ')}
    >
      {children}
    </span>
  )
}

export function TrackBadge({ track }: { track: Track }) {
  return (
    <Badge
      className={
        track === 'gcse'
          ? 'bg-[var(--gcse-accent-light)] text-[var(--gcse-accent)]'
          : 'bg-[var(--ib-accent-light)] text-[var(--ib-accent)]'
      }
    >
      {track === 'gcse' ? 'GCSE' : 'IB'}
    </Badge>
  )
}

export function BandBadge({ band }: { band: string }) {
  return <Badge className={getBandColor(band)}>{band}</Badge>
}

export function MarkBadge({ achieved, max }: { achieved: number; max: number }) {
  const pct = max > 0 ? Math.round((achieved / max) * 100) : 0
  const color =
    pct >= 80 ? 'text-green-700' : pct >= 60 ? 'text-yellow-700' : 'text-red-700'
  return (
    <span className={['font-mono text-sm font-semibold', color].join(' ')}>
      {achieved}/{max}
    </span>
  )
}
