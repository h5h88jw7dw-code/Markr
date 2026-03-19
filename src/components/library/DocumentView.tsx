import React, { useState } from 'react'
import type { Submission } from '@/types'
import { Tabs } from '@/components/ui/Tabs'
import { BandBadge, MarkBadge, TrackBadge } from '@/components/ui/Badge'
import { InlineFeedback } from '@/components/marking/InlineFeedback'
import { ExaminerNotes } from '@/components/marking/ExaminerNotes'
import { ActionPlan } from '@/components/marking/ActionPlan'
import { Button } from '@/components/ui/Button'
import type { ExaminerNote } from '@/types'

interface DocumentViewProps {
  submission: Submission
  onClose: () => void
  onCompare: () => void
}

const TABS = [
  { id: 'verdict', label: 'Verdict' },
  { id: 'inline', label: 'Inline Feedback' },
  { id: 'notes', label: 'Examiner Notes' },
  { id: 'action', label: 'Action Plan' },
]

export function DocumentView({ submission: sub, onClose, onCompare }: DocumentViewProps) {
  const [activeTab, setActiveTab] = useState('verdict')

  const date = new Date(sub.created_at).toLocaleDateString('en-GB', {
    day: 'numeric', month: 'long', year: 'numeric',
  })

  // Parse examiner notes from JSON string
  let examinerNotes: ExaminerNote[] = []
  try {
    examinerNotes = JSON.parse(sub.examiner_notes ?? '[]') as ExaminerNote[]
  } catch {
    examinerNotes = []
  }

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="flex items-start justify-between p-5 border-b border-[var(--border)]">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <TrackBadge track={sub.track} />
            <span className="text-xs text-[var(--text-muted)]">{sub.subject_label} · {sub.question_type}</span>
          </div>
          <div className="flex items-center gap-3 mt-2">
            <span className="font-mono text-2xl font-semibold text-[var(--text-primary)]">
              {sub.mark_achieved}/{sub.mark_max}
            </span>
            <BandBadge band={sub.band} />
            <span className="text-xs text-[var(--text-muted)]">{date}</span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="secondary" size="sm" onClick={onCompare}>
            Compare
          </Button>
          <Button variant="secondary" size="sm" onClick={() => window.print()}>
            Export PDF
          </Button>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-md text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-gray-50 dark:hover:bg-gray-800 transition-all duration-150"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>

      {/* Tabs */}
      <Tabs tabs={TABS} active={activeTab} onChange={setActiveTab} className="px-5" />

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-5">
        {activeTab === 'verdict' && (
          <div className="space-y-4 max-w-2xl">
            <div className="p-4 bg-[var(--sidebar)] rounded-lg border border-[var(--border)]">
              <p className="text-xs font-semibold uppercase tracking-wider text-[var(--text-muted)] mb-2">Question</p>
              <p className="text-sm text-[var(--text-primary)]">{sub.question}</p>
            </div>
            <div className="p-4 border border-[var(--border)] rounded-lg">
              <p className="text-xs font-semibold uppercase tracking-wider text-[var(--text-muted)] mb-2">Examiner Assessment</p>
              <p className="text-sm text-[var(--text-primary)] leading-relaxed whitespace-pre-line">{sub.verdict}</p>
            </div>
          </div>
        )}

        {activeTab === 'inline' && (
          <div className="max-w-2xl">
            <InlineFeedback html={sub.inline_feedback ?? ''} />
          </div>
        )}

        {activeTab === 'notes' && (
          <div className="max-w-2xl">
            <ExaminerNotes notes={examinerNotes} />
          </div>
        )}

        {activeTab === 'action' && (
          <div className="max-w-2xl">
            <ActionPlan actionPlan={sub.action_plan} />
          </div>
        )}
      </div>
    </div>
  )
}
