import React, { useState } from 'react'
import type { Submission } from '@/types'
import { CardGrid } from '@/components/library/CardGrid'
import { DocumentView } from '@/components/library/DocumentView'
import { CompareMode } from '@/components/library/CompareMode'
import { useLibrary } from '@/hooks/useLibrary'

export function LibraryPage() {
  const { submissions, allSubmissions, loading, filter, setFilter, compare } = useLibrary()
  const [selected, setSelected] = useState<Submission | null>(null)
  const [comparing, setComparing] = useState<Submission | null>(null)

  if (loading) {
    return (
      <div className="flex-1 p-6 flex items-center justify-center text-sm text-[var(--text-muted)]">
        Loading library...
      </div>
    )
  }

  return (
    <div className="flex-1 p-6">
      <CardGrid
        submissions={submissions}
        filter={filter}
        onFilterChange={setFilter}
        onSelect={setSelected}
        onCompare={setComparing}
      />

      {/* Document view modal */}
      {selected && (
        <div className="fixed inset-0 z-50 flex">
          <div className="absolute inset-0 bg-black/20 backdrop-blur-sm" onClick={() => setSelected(null)} />
          <div className="relative z-10 ml-auto w-full max-w-3xl bg-[var(--bg)] border-l border-[var(--border)] flex flex-col overflow-hidden">
            <DocumentView
              submission={selected}
              onClose={() => setSelected(null)}
              onCompare={() => { setComparing(selected); setSelected(null) }}
            />
          </div>
        </div>
      )}

      {/* Compare mode modal */}
      {comparing && (
        <div className="fixed inset-0 z-50 flex">
          <div className="absolute inset-0 bg-black/20 backdrop-blur-sm" onClick={() => setComparing(null)} />
          <div className="relative z-10 ml-auto w-full max-w-4xl bg-[var(--bg)] border-l border-[var(--border)] flex flex-col overflow-hidden">
            <CompareMode
              baseSubmission={comparing}
              allSubmissions={allSubmissions}
              onClose={() => setComparing(null)}
              onCompare={compare}
            />
          </div>
        </div>
      )}
    </div>
  )
}
