import React, { useState } from 'react'
import type { MarkingResult } from '@/types'
import { Tabs } from '@/components/ui/Tabs'
import { BandBadge, MarkBadge } from '@/components/ui/Badge'
import { InlineFeedback } from './InlineFeedback'
import { ExaminerNotes } from './ExaminerNotes'
import { ActionPlan } from './ActionPlan'
import { Button } from '@/components/ui/Button'

interface MarkingOutputProps {
  result: MarkingResult
  submissionId?: string | null
  onNewMarking: () => void
  onViewInLibrary?: () => void
}

const TABS = [
  { id: 'verdict', label: 'Verdict' },
  { id: 'inline', label: 'Inline Feedback' },
  { id: 'notes', label: 'Examiner Notes' },
  { id: 'action', label: 'Action Plan' },
]

export function MarkingOutput({
  result,
  submissionId,
  onNewMarking,
  onViewInLibrary,
}: MarkingOutputProps) {
  const [activeTab, setActiveTab] = useState('verdict')

  return (
    <div className="w-full max-w-3xl mx-auto">
      {/* Header with mark */}
      <div className="flex items-start justify-between mb-5 flex-wrap gap-3">
        <div className="flex items-center gap-3">
          <span className="font-mono text-3xl font-semibold text-[var(--text-primary)]">
            {result.mark_achieved}/{result.mark_max}
          </span>
          <BandBadge band={result.band} />
        </div>
        <div className="flex items-center gap-2">
          {submissionId && onViewInLibrary && (
            <Button variant="secondary" size="sm" onClick={onViewInLibrary}>
              View in Library
            </Button>
          )}
          <Button variant="secondary" size="sm" onClick={() => window.print()}>
            Export PDF
          </Button>
          <Button size="sm" onClick={onNewMarking}>
            New Marking
          </Button>
        </div>
      </div>

      {/* Tabs */}
      <Tabs
        tabs={TABS.map((t) => ({
          ...t,
          count:
            t.id === 'notes'
              ? result.examiner_notes.length || undefined
              : undefined,
        }))}
        active={activeTab}
        onChange={setActiveTab}
        className="mb-5"
      />

      {/* Tab: Verdict */}
      {activeTab === 'verdict' && (
        <div className="space-y-4">
          {/* Band descriptor */}
          {result.band_descriptor && (
            <div className="p-4 bg-[var(--sidebar)] border border-[var(--border)] rounded-lg">
              <p className="text-xs font-semibold uppercase tracking-wider text-[var(--text-muted)] mb-1">
                Band Descriptor
              </p>
              <p className="text-sm text-[var(--text-primary)] italic">"{result.band_descriptor}"</p>
            </div>
          )}

          {/* Overall summary */}
          <div className="p-4 border border-[var(--border)] rounded-lg">
            <p className="text-xs font-semibold uppercase tracking-wider text-[var(--text-muted)] mb-2">
              Examiner Assessment
            </p>
            <p className="text-sm text-[var(--text-primary)] leading-relaxed">{result.overall_summary}</p>
          </div>

          {/* Band push */}
          {result.band_push && (
            <div className="p-4 bg-amber-50 dark:bg-amber-900/10 border border-amber-100 dark:border-amber-900/30 rounded-lg">
              <p className="text-xs font-semibold uppercase tracking-wider text-amber-600 dark:text-amber-400 mb-1">
                To push one band higher
              </p>
              <p className="text-sm text-[var(--text-primary)] italic">{result.band_push}</p>
            </div>
          )}

          {/* Quick stats */}
          <div className="grid grid-cols-3 gap-3">
            <StatCard
              label="Mark"
              value={<MarkBadge achieved={result.mark_achieved} max={result.mark_max} />}
            />
            <StatCard
              label="Band"
              value={<BandBadge band={result.band} />}
            />
            <StatCard
              label="Factual Errors"
              value={
                <span className={['font-mono text-sm font-semibold', result.examiner_notes.length > 0 ? 'text-red-600' : 'text-green-600'].join(' ')}>
                  {result.examiner_notes.length === 0 ? 'None' : result.examiner_notes.length}
                </span>
              }
            />
          </div>
        </div>
      )}

      {/* Tab: Inline Feedback */}
      {activeTab === 'inline' && (
        <InlineFeedback html={result.inline_feedback_html} />
      )}

      {/* Tab: Examiner Notes */}
      {activeTab === 'notes' && (
        <ExaminerNotes notes={result.examiner_notes} />
      )}

      {/* Tab: Action Plan */}
      {activeTab === 'action' && (
        <ActionPlan actionPlan={result.action_plan} />
      )}
    </div>
  )
}

function StatCard({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="p-3 bg-[var(--sidebar)] rounded-lg border border-[var(--border)]">
      <p className="text-xs text-[var(--text-muted)] mb-1">{label}</p>
      <div>{value}</div>
    </div>
  )
}
