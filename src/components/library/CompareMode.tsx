import React, { useState } from 'react'
import type { Submission, CompareResult } from '@/types'
import { BandBadge, MarkBadge, TrackBadge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { Modal } from '@/components/ui/Modal'
import { SmallSpinner } from '@/components/ui/StreamingIndicator'

interface CompareModeProps {
  baseSubmission: Submission
  allSubmissions: Submission[]
  onClose: () => void
  onCompare: (idA: string, idB: string) => Promise<CompareResult | null>
}

export function CompareMode({ baseSubmission, allSubmissions, onClose, onCompare }: CompareModeProps) {
  const [pickerOpen, setPickerOpen] = useState(true)
  const [targetSubmission, setTargetSubmission] = useState<Submission | null>(null)
  const [compareResult, setCompareResult] = useState<CompareResult | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Only show submissions from the same subject (excluding this one)
  const compatible = allSubmissions.filter(
    (s) => s.subject_id === baseSubmission.subject_id && s.id !== baseSubmission.id
  )

  const handleSelect = async (target: Submission) => {
    setTargetSubmission(target)
    setPickerOpen(false)
    setLoading(true)
    setError(null)
    try {
      const result = await onCompare(baseSubmission.id, target.id)
      setCompareResult(result)
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Comparison failed')
    } finally {
      setLoading(false)
    }
  }

  const formatDate = (d: string) =>
    new Date(d).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="flex items-center justify-between px-5 py-4 border-b border-[var(--border)]">
        <h2 className="text-sm font-semibold text-[var(--text-primary)]">Compare Submissions</h2>
        <div className="flex items-center gap-2">
          {targetSubmission && (
            <Button variant="secondary" size="sm" onClick={() => { setTargetSubmission(null); setCompareResult(null); setPickerOpen(true) }}>
              Change comparison
            </Button>
          )}
          <button onClick={onClose} className="w-8 h-8 flex items-center justify-center rounded-md text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-gray-50 dark:hover:bg-gray-800 transition-all duration-150">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-5">
        {/* Picker modal */}
        <Modal open={pickerOpen} onClose={() => { if (targetSubmission) setPickerOpen(false) }} title="Select a submission to compare">
          {compatible.length === 0 ? (
            <p className="text-sm text-[var(--text-muted)]">No other submissions in this subject to compare against.</p>
          ) : (
            <div className="space-y-2">
              {compatible.map((sub) => (
                <button
                  key={sub.id}
                  onClick={() => handleSelect(sub)}
                  className="w-full text-left p-3 rounded-lg border border-[var(--border)] hover:border-[var(--gcse-accent)] hover:bg-[var(--gcse-accent-light)] transition-all duration-150"
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs text-[var(--text-muted)]">{formatDate(sub.created_at)}</span>
                    <div className="flex items-center gap-1.5">
                      <MarkBadge achieved={sub.mark_achieved} max={sub.mark_max} />
                      <BandBadge band={sub.band} />
                    </div>
                  </div>
                  <p className="text-sm text-[var(--text-primary)] line-clamp-1">{sub.question.substring(0, 80)}…</p>
                </button>
              ))}
            </div>
          )}
        </Modal>

        {targetSubmission && (
          <>
            {/* Split: base vs target */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <SubmissionCard submission={baseSubmission} label="Older submission" />
              <SubmissionCard submission={targetSubmission} label="This submission" isNewer />
            </div>

            {/* Comparison analysis */}
            {loading && (
              <div className="flex items-center justify-center gap-3 py-8 text-sm text-[var(--text-muted)]">
                <SmallSpinner />
                Running comparison analysis...
              </div>
            )}
            {error && (
              <div className="p-4 bg-red-50 border border-red-100 rounded-lg text-sm text-red-600">{error}</div>
            )}
            {compareResult && (
              <div className="border border-[var(--border)] rounded-lg overflow-hidden">
                <div className="px-4 py-3 bg-[var(--sidebar)] border-b border-[var(--border)]">
                  <h3 className="text-sm font-semibold text-[var(--text-primary)]">Comparison Analysis</h3>
                  <p className="text-xs text-[var(--text-muted)]">What changed between these two submissions</p>
                </div>
                <div className="p-4 space-y-4">
                  <CompareSection title="Improved" items={compareResult.improved} color="green" />
                  <CompareSection title="Regressed" items={compareResult.regressed} color="red" />
                  <CompareSection title="Unchanged" items={compareResult.unchanged} color="gray" />
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
}

function SubmissionCard({ submission: sub, label, isNewer }: { submission: Submission; label: string; isNewer?: boolean }) {
  return (
    <div className={['p-4 rounded-lg border', isNewer ? 'border-[var(--gcse-accent)] bg-[var(--gcse-accent-light)]' : 'border-[var(--border)] bg-[var(--sidebar)]'].join(' ')}>
      <p className="text-xs font-semibold uppercase tracking-wider text-[var(--text-muted)] mb-2">{label}</p>
      <p className="text-xs text-[var(--text-muted)] mb-2">{new Date(sub.created_at).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}</p>
      <div className="flex items-center gap-2 mb-2">
        <MarkBadge achieved={sub.mark_achieved} max={sub.mark_max} />
        <BandBadge band={sub.band} />
      </div>
      <p className="text-xs text-[var(--text-primary)] line-clamp-3 leading-relaxed">{sub.verdict}</p>
    </div>
  )
}

function CompareSection({ title, items, color }: { title: string; items: string[]; color: string }) {
  const colorMap: Record<string, string> = {
    green: 'text-green-700 dark:text-green-400',
    red: 'text-red-700 dark:text-red-400',
    gray: 'text-[var(--text-muted)]',
  }
  const bulletMap: Record<string, string> = {
    green: 'bg-green-500',
    red: 'bg-red-500',
    gray: 'bg-gray-400',
  }
  return (
    <div>
      <p className={['text-xs font-semibold uppercase tracking-wider mb-1.5', colorMap[color]].join(' ')}>{title}</p>
      {items.length === 0 ? (
        <p className="text-xs text-[var(--text-muted)]">None identified.</p>
      ) : (
        <ul className="space-y-1">
          {items.map((item, i) => (
            <li key={i} className="flex gap-2 text-sm text-[var(--text-primary)]">
              <span className={['w-1.5 h-1.5 rounded-full flex-shrink-0 mt-2', bulletMap[color]].join(' ')} />
              {item}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
