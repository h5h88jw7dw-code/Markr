import React from 'react'
import type { WeaknessEntry } from '@/types'

interface WeaknessTrackerProps {
  weaknesses: WeaknessEntry[]
}

export function WeaknessTracker({ weaknesses }: WeaknessTrackerProps) {
  if (weaknesses.length === 0) {
    return (
      <p className="text-sm text-[var(--text-muted)]">
        Submit at least 3 responses in this subject to see weakness patterns.
      </p>
    )
  }

  const max = weaknesses[0]?.count ?? 1

  return (
    <div className="space-y-2">
      {weaknesses.map((w, i) => (
        <div key={w.tag} className="flex items-start gap-3">
          <span className="text-xs font-mono text-[var(--text-muted)] w-4 mt-1">{i + 1}</span>
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between mb-0.5">
              <p className="text-sm text-[var(--text-primary)] truncate">{w.description}</p>
              <span className="text-xs font-mono text-[var(--text-muted)] ml-2 flex-shrink-0">
                ×{w.count}
              </span>
            </div>
            {/* Bar */}
            <div className="h-1 bg-[var(--border)] rounded-full">
              <div
                className="h-full bg-red-400 rounded-full transition-all duration-300"
                style={{ width: `${(w.count / max) * 100}%` }}
              />
            </div>
            <p className="text-xs text-[var(--text-muted)] mt-0.5">
              Last seen {new Date(w.last_seen).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })}
            </p>
          </div>
        </div>
      ))}
    </div>
  )
}
