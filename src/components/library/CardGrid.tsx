import React from 'react'
import type { Submission, LibraryFilter, Track } from '@/types'
import { TrackBadge, BandBadge, MarkBadge } from '@/components/ui/Badge'
import { GCSE_SUBJECTS, IB_SUBJECTS } from '@/lib/constants'

interface CardGridProps {
  submissions: Submission[]
  filter: LibraryFilter
  onFilterChange: (f: LibraryFilter) => void
  onSelect: (submission: Submission) => void
  onCompare: (submission: Submission) => void
}

export function CardGrid({ submissions, filter, onFilterChange, onSelect, onCompare }: CardGridProps) {
  const allSubjects = [...GCSE_SUBJECTS, ...IB_SUBJECTS]

  return (
    <div>
      {/* Filter bar */}
      <div className="flex flex-wrap items-center gap-2 mb-5 p-3 bg-[var(--sidebar)] rounded-lg border border-[var(--border)]">
        {/* Track toggle */}
        <div className="flex rounded-md border border-[var(--border)] overflow-hidden bg-white dark:bg-[#1e1e1e]">
          {(['gcse', 'ib', undefined] as (Track | undefined)[]).map((t) => (
            <button
              key={String(t)}
              onClick={() => onFilterChange({ ...filter, track: t })}
              className={[
                'px-3 py-1.5 text-xs font-medium transition-all duration-150',
                filter.track === t
                  ? t === 'gcse'
                    ? 'bg-[var(--gcse-accent-light)] text-[var(--gcse-accent)]'
                    : t === 'ib'
                    ? 'bg-[var(--ib-accent-light)] text-[var(--ib-accent)]'
                    : 'bg-[var(--gcse-accent-light)] text-[var(--gcse-accent)]'
                  : 'text-[var(--text-muted)] hover:text-[var(--text-primary)]',
              ].join(' ')}
            >
              {t === undefined ? 'All' : t === 'gcse' ? 'GCSE' : 'IB'}
            </button>
          ))}
        </div>

        {/* Band filter */}
        <select
          value={filter.band ?? ''}
          onChange={(e) => onFilterChange({ ...filter, band: e.target.value || undefined })}
          className="px-2 py-1.5 text-xs border border-[var(--border)] rounded-md bg-white dark:bg-[#1e1e1e] text-[var(--text-primary)] outline-none"
        >
          <option value="">All bands</option>
          {['Level 1', 'Level 2', 'Level 3', 'Level 4', 'Band 1', 'Band 2', 'Band 3', 'Band 4'].map((b) => (
            <option key={b} value={b}>{b}</option>
          ))}
        </select>

        <span className="ml-auto text-xs text-[var(--text-muted)]">
          {submissions.length} submission{submissions.length !== 1 ? 's' : ''}
        </span>
      </div>

      {/* Empty state */}
      {submissions.length === 0 && (
        <div className="text-center py-16 text-[var(--text-muted)]">
          <svg className="w-8 h-8 mx-auto mb-3 opacity-30" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
          </svg>
          <p className="text-sm">No submissions yet.</p>
          <p className="text-xs mt-1">Your marked work will appear here.</p>
        </div>
      )}

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {submissions.map((sub) => (
          <SubmissionCard
            key={sub.id}
            submission={sub}
            onSelect={() => onSelect(sub)}
            onCompare={() => onCompare(sub)}
          />
        ))}
      </div>
    </div>
  )
}

function SubmissionCard({
  submission: sub,
  onSelect,
  onCompare,
}: {
  submission: Submission
  onSelect: () => void
  onCompare: () => void
}) {
  const date = new Date(sub.created_at).toLocaleDateString('en-GB', {
    day: 'numeric', month: 'short', year: 'numeric',
  })
  const topWeakness = sub.weakness_tags?.[0]

  return (
    <div
      className="p-4 bg-white dark:bg-[#1e1e1e] border border-[var(--border)] rounded-lg cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800 transition-all duration-150 group"
      onClick={onSelect}
    >
      {/* Top row */}
      <div className="flex items-center justify-between mb-2">
        <TrackBadge track={sub.track} />
        <span className="text-xs text-[var(--text-muted)]">{date}</span>
      </div>

      {/* Subject + type */}
      <p className="text-xs font-medium text-[var(--text-muted)] mb-1">{sub.subject_label} · {sub.question_type}</p>

      {/* Question snippet */}
      <p className="text-sm text-[var(--text-primary)] mb-3 line-clamp-2 leading-snug">
        {sub.question.substring(0, 100)}{sub.question.length > 100 ? '…' : ''}
      </p>

      {/* Bottom row */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <MarkBadge achieved={sub.mark_achieved} max={sub.mark_max} />
          <BandBadge band={sub.band} />
        </div>
        <button
          onClick={(e) => { e.stopPropagation(); onCompare() }}
          className="text-xs text-[var(--text-muted)] hover:text-[var(--gcse-accent)] transition-all duration-150 opacity-0 group-hover:opacity-100"
        >
          Compare
        </button>
      </div>

      {/* Weakness */}
      {topWeakness && (
        <p className="text-xs text-[var(--text-muted)] mt-2 truncate">
          {humaniseTag(topWeakness)}
        </p>
      )}
    </div>
  )
}

function humaniseTag(tag: string): string {
  const map: Record<string, string> = {
    'insufficient-aspects': 'Needs three distinct aspects',
    'weak-conclusion': 'Conclusion not justified',
    'missing-counter-argument': 'Missing counter-argument',
    'factual-error': 'Factual errors present',
    'missing-named-example': 'Real-world example unnamed',
    'missing-quotation': 'No direct quotation',
    'diagram-issue': 'Diagram issues',
    'missing-definition': 'Key terms not defined',
    'analysis-weakness': 'Analysis underdeveloped',
    'language-level-weakness': 'Language-level analysis weak',
    'evaluation-weakness': 'Evaluation one-sided',
  }
  return map[tag] ?? tag.replace(/-/g, ' ')
}
