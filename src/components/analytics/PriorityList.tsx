import React, { useEffect, useState } from 'react'
import { SmallSpinner } from '@/components/ui/StreamingIndicator'

interface PriorityListProps {
  subjectId: string
  loadPriorities: (subjectId: string) => Promise<string[]>
}

export function PriorityList({ subjectId, loadPriorities }: PriorityListProps) {
  const [items, setItems] = useState<string[]>([])
  const [loading, setLoading] = useState(false)
  const [loaded, setLoaded] = useState(false)

  const load = async () => {
    setLoading(true)
    const result = await loadPriorities(subjectId)
    setItems(result)
    setLoaded(true)
    setLoading(false)
  }

  if (!loaded && !loading) {
    return (
      <button
        onClick={load}
        className="text-sm text-[var(--gcse-accent)] hover:underline"
      >
        Generate revision priorities →
      </button>
    )
  }

  if (loading) {
    return (
      <div className="flex items-center gap-2 text-sm text-[var(--text-muted)]">
        <SmallSpinner />
        Generating priorities...
      </div>
    )
  }

  if (items.length === 0) {
    return (
      <p className="text-sm text-[var(--text-muted)]">
        Not enough data to generate priorities yet. Submit more work in this subject.
      </p>
    )
  }

  return (
    <ol className="space-y-2">
      {items.map((item, i) => (
        <li key={i} className="flex gap-2.5 text-sm text-[var(--text-primary)]">
          <span className="font-mono text-xs text-[var(--text-muted)] w-4 mt-0.5 flex-shrink-0">{i + 1}.</span>
          {item}
        </li>
      ))}
    </ol>
  )
}
