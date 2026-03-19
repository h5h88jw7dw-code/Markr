import React, { useState } from 'react'
import type { Profile } from '@/types'
import { GCSE_SUBJECTS, IB_SUBJECTS, DEFAULT_GCSE_SUBJECT_IDS, DEFAULT_IB_SUBJECT_IDS } from '@/lib/constants'
import { Button } from '@/components/ui/Button'

interface OnboardingFlowProps {
  onComplete: (profile: Profile) => void
}

const STEPS = ['Name', 'Exam Year', 'GCSE Subjects', 'IB Subjects', 'Ready']

function StepIndicator({ current, total }: { current: number; total: number }) {
  return (
    <div className="flex items-center gap-2 mb-8">
      {Array.from({ length: total }).map((_, i) => (
        <React.Fragment key={i}>
          <div
            className={[
              'w-6 h-6 rounded-full flex items-center justify-center text-xs font-semibold transition-all duration-150',
              i < current
                ? 'bg-[var(--gcse-accent)] text-white'
                : i === current
                ? 'bg-[var(--gcse-accent-light)] text-[var(--gcse-accent)] border border-[var(--gcse-accent)]'
                : 'bg-[var(--border)] text-[var(--text-muted)]',
            ].join(' ')}
          >
            {i < current ? (
              <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            ) : (
              i + 1
            )}
          </div>
          {i < total - 1 && (
            <div
              className={[
                'flex-1 h-px transition-all duration-150',
                i < current ? 'bg-[var(--gcse-accent)]' : 'bg-[var(--border)]',
              ].join(' ')}
            />
          )}
        </React.Fragment>
      ))}
    </div>
  )
}

export function OnboardingFlow({ onComplete }: OnboardingFlowProps) {
  const [step, setStep] = useState(0)
  const [name, setName] = useState('')
  const [examYear, setExamYear] = useState<number>(2026)
  const [customYear, setCustomYear] = useState('')
  const [gcseSubjects, setGcseSubjects] = useState<string[]>(DEFAULT_GCSE_SUBJECT_IDS)
  const [ibSubjects, setIbSubjects] = useState<string[]>(DEFAULT_IB_SUBJECT_IDS)
  const [error, setError] = useState<string | null>(null)

  const toggleGcse = (id: string) =>
    setGcseSubjects((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    )

  const toggleIb = (id: string) =>
    setIbSubjects((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    )

  const canProceed = () => {
    if (step === 0) return name.trim().length > 0
    if (step === 1) return examYear > 2024 || (customYear !== '' && parseInt(customYear) > 2024)
    if (step === 2) return gcseSubjects.length > 0
    if (step === 3) return ibSubjects.length > 0
    return true
  }

  const handleNext = () => {
    if (step < STEPS.length - 1) {
      setStep((s) => s + 1)
    } else {
      setError(null)
      try {
        const finalYear = customYear ? parseInt(customYear) : examYear
        onComplete({
          name: name.trim(),
          exam_year: finalYear,
          gcse_subjects: gcseSubjects,
          ib_subjects: ibSubjects,
          dark_mode: false,
        })
      } catch (err) {
        console.error('[markr] onboarding: handleNext error:', err)
        setError('Something went wrong. Please try again.')
      }
    }
  }

  return (
    <div className="min-h-screen bg-[var(--bg)] flex items-center justify-center p-6">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-2xl font-semibold text-[var(--text-primary)] mb-1">Markr</h1>
          <p className="text-sm text-[var(--text-muted)]">Your personal examiner</p>
        </div>

        {/* Card */}
        <div className="bg-white dark:bg-[#1e1e1e] border border-[var(--border)] rounded-lg p-6">
          <StepIndicator current={step} total={STEPS.length} />

          {/* Step 0: Name */}
          {step === 0 && (
            <div>
              <h2 className="text-base font-semibold text-[var(--text-primary)] mb-1">What's your name?</h2>
              <p className="text-sm text-[var(--text-muted)] mb-4">This is just for display purposes.</p>
              <input
                type="text"
                autoFocus
                value={name}
                onChange={(e) => setName(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && canProceed() && handleNext()}
                placeholder="Your name"
                className="w-full px-3 py-2 text-sm border border-[var(--border)] rounded-lg outline-none focus:border-[var(--gcse-accent)] focus:ring-1 focus:ring-[var(--gcse-accent)] transition-all duration-150 bg-white dark:bg-[#1e1e1e] text-[var(--text-primary)]"
              />
            </div>
          )}

          {/* Step 1: Exam Year */}
          {step === 1 && (
            <div>
              <h2 className="text-base font-semibold text-[var(--text-primary)] mb-1">When are your exams?</h2>
              <p className="text-sm text-[var(--text-muted)] mb-4">Select your exam year.</p>
              <div className="flex flex-col gap-2">
                {[
                  { year: 2026, label: '2026 — GCSE' },
                  { year: 2027, label: '2027 — IB Diploma' },
                ].map(({ year, label }) => (
                  <button
                    key={year}
                    onClick={() => { setExamYear(year); setCustomYear('') }}
                    className={[
                      'w-full text-left px-4 py-3 border rounded-lg text-sm transition-all duration-150',
                      examYear === year && !customYear
                        ? 'border-[var(--gcse-accent)] bg-[var(--gcse-accent-light)] text-[var(--gcse-accent)] font-medium'
                        : 'border-[var(--border)] text-[var(--text-primary)] hover:border-gray-400',
                    ].join(' ')}
                  >
                    {label}
                  </button>
                ))}
                <div className="flex items-center gap-2 mt-1">
                  <input
                    type="number"
                    placeholder="Or enter custom year"
                    value={customYear}
                    onChange={(e) => { setCustomYear(e.target.value); setExamYear(0) }}
                    className="flex-1 px-3 py-2 text-sm border border-[var(--border)] rounded-lg outline-none focus:border-[var(--gcse-accent)] transition-all duration-150 bg-white dark:bg-[#1e1e1e] text-[var(--text-primary)]"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Step 2: GCSE Subjects */}
          {step === 2 && (
            <div>
              <h2 className="text-base font-semibold text-[var(--text-primary)] mb-1">Your GCSE subjects</h2>
              <p className="text-sm text-[var(--text-muted)] mb-4">All are pre-selected. Deselect any you're not taking.</p>
              <div className="flex flex-col gap-1.5 max-h-72 overflow-y-auto pr-1">
                {GCSE_SUBJECTS.map((subject) => (
                  <label
                    key={subject.id}
                    className={[
                      'flex items-center gap-3 px-3 py-2.5 rounded-lg border cursor-pointer transition-all duration-150',
                      gcseSubjects.includes(subject.id)
                        ? 'border-[var(--gcse-accent)] bg-[var(--gcse-accent-light)]'
                        : 'border-[var(--border)] hover:border-gray-400',
                    ].join(' ')}
                  >
                    <input
                      type="checkbox"
                      checked={gcseSubjects.includes(subject.id)}
                      onChange={() => toggleGcse(subject.id)}
                      className="w-4 h-4 accent-[var(--gcse-accent)]"
                    />
                    <div>
                      <p className="text-sm font-medium text-[var(--text-primary)]">{subject.label}</p>
                      <p className="text-xs text-[var(--text-muted)]">{subject.board}</p>
                    </div>
                  </label>
                ))}
              </div>
            </div>
          )}

          {/* Step 3: IB Subjects */}
          {step === 3 && (
            <div>
              <h2 className="text-base font-semibold text-[var(--text-primary)] mb-1">Your IB subjects</h2>
              <p className="text-sm text-[var(--text-muted)] mb-4">All are pre-selected. Deselect any you're not taking.</p>
              <div className="flex flex-col gap-1.5">
                {IB_SUBJECTS.map((subject) => (
                  <label
                    key={subject.id}
                    className={[
                      'flex items-center gap-3 px-3 py-2.5 rounded-lg border cursor-pointer transition-all duration-150',
                      ibSubjects.includes(subject.id)
                        ? 'border-[var(--ib-accent)] bg-[var(--ib-accent-light)]'
                        : 'border-[var(--border)] hover:border-gray-400',
                    ].join(' ')}
                  >
                    <input
                      type="checkbox"
                      checked={ibSubjects.includes(subject.id)}
                      onChange={() => toggleIb(subject.id)}
                      className="w-4 h-4 accent-[var(--ib-accent)]"
                    />
                    <div>
                      <p className="text-sm font-medium text-[var(--text-primary)]">{subject.label}</p>
                      <p className="text-xs text-[var(--text-muted)]">
                        {subject.board}
                        {subject.id === 'maths_aa_hl' && (
                          <span className="ml-2 text-[var(--ib-accent)]">· provisional — pending summer assessment</span>
                        )}
                      </p>
                    </div>
                  </label>
                ))}
              </div>
            </div>
          )}

          {/* Step 4: Explainer */}
          {step === 4 && (
            <div>
              <h2 className="text-base font-semibold text-[var(--text-primary)] mb-3">You're ready.</h2>
              <div className="bg-[var(--sidebar)] rounded-lg p-4 text-sm text-[var(--text-primary)] leading-relaxed">
                <p className="mb-3">
                  Markr uses Claude to mark your work <strong>stricter than the average examiner</strong>. It applies each board's level descriptors and hard rules exactly — no benefit of the doubt.
                </p>
                <p className="mb-3">
                  Add the mark scheme when you have it. If you don't, Markr uses its built-in rubrics calibrated to each board.
                </p>
                <p>
                  The more you submit, the more accurate your weakness tracking becomes. Recurring patterns appear after your second submission in each subject.
                </p>
              </div>
              <div className="mt-4 space-y-1.5">
                <div className="flex items-center gap-2 text-xs text-[var(--text-muted)]">
                  <svg className="w-3.5 h-3.5 text-green-600 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                  Inline annotations on your response
                </div>
                <div className="flex items-center gap-2 text-xs text-[var(--text-muted)]">
                  <svg className="w-3.5 h-3.5 text-green-600 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                  Factual errors flagged separately from the mark
                </div>
                <div className="flex items-center gap-2 text-xs text-[var(--text-muted)]">
                  <svg className="w-3.5 h-3.5 text-green-600 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                  Specific action plan per submission
                </div>
                <div className="flex items-center gap-2 text-xs text-[var(--text-muted)]">
                  <svg className="w-3.5 h-3.5 text-green-600 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                  Progress tracking and weakness analytics
                </div>
              </div>
            </div>
          )}

          {error && (
            <p className="mt-4 text-sm text-red-500">{error}</p>
          )}

          {/* Navigation */}
          <div className="flex items-center justify-between mt-6">
            {step > 0 ? (
              <button
                onClick={() => setStep((s) => s - 1)}
                className="text-sm text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-all duration-150"
              >
                ← Back
              </button>
            ) : (
              <span />
            )}
            <Button
              onClick={handleNext}
              disabled={!canProceed()}
              size="md"
            >
              {step === STEPS.length - 1 ? 'Start Marking' : 'Continue →'}
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
