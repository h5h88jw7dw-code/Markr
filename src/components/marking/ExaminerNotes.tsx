import React from 'react'
import type { ExaminerNote } from '@/types'

interface ExaminerNotesProps {
  notes: ExaminerNote[]
}

export function ExaminerNotes({ notes }: ExaminerNotesProps) {
  if (notes.length === 0) {
    return (
      <div className="flex items-center gap-2 text-sm text-green-600 bg-green-50 dark:bg-green-900/20 px-4 py-3 rounded-lg border border-green-100 dark:border-green-900/40">
        <svg className="w-4 h-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
        </svg>
        No factual errors identified in this response.
      </div>
    )
  }

  return (
    <div>
      <div className="flex items-start gap-2 mb-4 p-3 bg-amber-50 dark:bg-amber-900/20 border border-amber-100 dark:border-amber-900/40 rounded-lg">
        <svg className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
        </svg>
        <p className="text-xs text-amber-700 dark:text-amber-400">
          <strong>Factual & Accuracy Notes</strong> — these do not affect your mark but must be corrected before your next submission.
        </p>
      </div>

      <div className="space-y-2">
        {notes.map((note, i) => (
          <div
            key={i}
            className="flex gap-3 p-3 bg-red-50 dark:bg-red-900/10 border border-red-100 dark:border-red-900/30 rounded-lg"
          >
            <svg className="w-4 h-4 text-red-500 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
            <div>
              <p className="text-sm text-[var(--text-primary)]">
                <span className="text-red-600 dark:text-red-400">You stated: </span>
                {note.error}
              </p>
              <p className="text-sm text-[var(--text-muted)] mt-1">
                <span className="text-green-600 dark:text-green-400 font-medium">Correction: </span>
                {note.correction}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
