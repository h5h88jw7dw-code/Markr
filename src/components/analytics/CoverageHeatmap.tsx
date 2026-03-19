import React from 'react'
import { getQuestionTypesForSubject } from '@/lib/constants'

interface CoverageHeatmapProps {
  subjectId: string
  coverage: Record<string, number>  // questionTypeLabel → count
}

export function CoverageHeatmap({ subjectId, coverage }: CoverageHeatmapProps) {
  const questionTypes = getQuestionTypesForSubject(subjectId)

  if (questionTypes.length === 0) {
    return <p className="text-sm text-[var(--text-muted)]">No question types defined for this subject.</p>
  }

  return (
    <div className="border border-[var(--border)] rounded-lg overflow-hidden">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-[var(--border)] bg-[var(--sidebar)]">
            <th className="text-left px-4 py-2.5 text-xs font-medium text-[var(--text-muted)]">Question Type</th>
            <th className="text-right px-4 py-2.5 text-xs font-medium text-[var(--text-muted)]">Practised</th>
            <th className="text-right px-4 py-2.5 text-xs font-medium text-[var(--text-muted)]">Status</th>
          </tr>
        </thead>
        <tbody>
          {questionTypes.map((qt, i) => {
            const count = coverage[qt.label] ?? 0
            const untried = count === 0
            return (
              <tr
                key={qt.id}
                className={[
                  'border-b border-[var(--border)] last:border-0',
                  i % 2 === 0 ? 'bg-white dark:bg-[#1e1e1e]' : 'bg-[var(--sidebar)]',
                ].join(' ')}
              >
                <td className="px-4 py-2.5 text-[var(--text-primary)]">
                  {qt.label}
                  <span className="ml-2 font-mono text-xs text-[var(--text-muted)]">/{qt.markMax}</span>
                </td>
                <td className="px-4 py-2.5 text-right font-mono text-sm text-[var(--text-muted)]">
                  {count}×
                </td>
                <td className="px-4 py-2.5 text-right">
                  {untried ? (
                    <span className="inline-flex items-center px-2 py-0.5 rounded-md text-xs font-medium bg-red-100 text-red-700 dark:bg-red-900/20 dark:text-red-400">
                      Not practised
                    </span>
                  ) : (
                    <span className="inline-flex items-center px-2 py-0.5 rounded-md text-xs font-medium bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-400">
                      {count} {count === 1 ? 'attempt' : 'attempts'}
                    </span>
                  )}
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}
