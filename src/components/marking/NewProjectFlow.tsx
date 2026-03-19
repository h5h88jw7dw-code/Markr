import React, { useState } from 'react'
import type { MarkingFormState, Track } from '@/types'
import {
  GCSE_SUBJECTS, IB_SUBJECTS,
  getQuestionTypesForSubject, getQuestionType, getSubject,
} from '@/lib/constants'
import { Button } from '@/components/ui/Button'
import { TextArea } from '@/components/ui/TextArea'
import { Select } from '@/components/ui/Select'
import { FileUpload } from '@/components/ui/FileUpload'
import { TrackBadge } from '@/components/ui/Badge'

interface NewProjectFlowProps {
  onSubmit: (form: MarkingFormState) => void
  onCancel?: () => void
}

const STEP_LABELS = ['Setup', 'Question & Materials', 'Student Response', 'Review & Submit']

const INITIAL_FORM: MarkingFormState = {
  track: 'gcse',
  subjectId: '',
  questionTypeId: '',
  question: '',
  markScheme: '',
  contextFiles: '',
  studentResponse: '',
  metadata: { timed: false },
}

export function NewProjectFlow({ onSubmit, onCancel }: NewProjectFlowProps) {
  const [step, setStep] = useState(0)
  const [form, setForm] = useState<MarkingFormState>(INITIAL_FORM)
  const [markSchemeOpen, setMarkSchemeOpen] = useState(false)
  const [contextOpen, setContextOpen] = useState(false)

  const setField = <K extends keyof MarkingFormState>(key: K, value: MarkingFormState[K]) =>
    setForm((f) => ({ ...f, [key]: value }))

  const subjects = form.track === 'gcse' ? GCSE_SUBJECTS : IB_SUBJECTS
  const questionTypes = form.subjectId ? getQuestionTypesForSubject(form.subjectId) : []
  const selectedQType = form.questionTypeId ? getQuestionType(form.questionTypeId) : null
  const selectedSubject = form.subjectId ? getSubject(form.subjectId) : null

  const canProceed = () => {
    if (step === 0) return !!form.subjectId && !!form.questionTypeId
    if (step === 1) return form.question.trim().length > 0
    if (step === 2) return form.studentResponse.trim().length > 50
    return true
  }

  const wordCount = form.studentResponse.trim().split(/\s+/).filter(Boolean).length

  return (
    <div className="w-full max-w-2xl mx-auto">
      {/* Step indicator */}
      <div className="flex items-center gap-0 mb-8">
        {STEP_LABELS.map((label, i) => (
          <React.Fragment key={i}>
            <div className="flex items-center gap-2">
              <div
                className={[
                  'w-6 h-6 rounded-full flex items-center justify-center text-xs font-semibold flex-shrink-0 transition-all duration-150',
                  i < step ? 'bg-[var(--gcse-accent)] text-white'
                    : i === step ? 'border-2 border-[var(--gcse-accent)] text-[var(--gcse-accent)]'
                    : 'border border-[var(--border)] text-[var(--text-muted)]',
                ].join(' ')}
              >
                {i < step ? (
                  <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                ) : i + 1}
              </div>
              <span className={['text-xs hidden sm:inline', i === step ? 'text-[var(--text-primary)] font-medium' : 'text-[var(--text-muted)]'].join(' ')}>
                {label}
              </span>
            </div>
            {i < STEP_LABELS.length - 1 && (
              <div className={['flex-1 h-px mx-2', i < step ? 'bg-[var(--gcse-accent)]' : 'bg-[var(--border)]'].join(' ')} />
            )}
          </React.Fragment>
        ))}
      </div>

      {/* Step 0: Setup */}
      {step === 0 && (
        <div className="space-y-5">
          <div>
            <p className="text-sm font-medium text-[var(--text-primary)] mb-2">Track</p>
            <div className="flex gap-2 p-1 bg-[var(--sidebar)] rounded-lg inline-flex w-full sm:w-auto">
              {(['gcse', 'ib'] as Track[]).map((t) => (
                <button
                  key={t}
                  onClick={() => { setField('track', t); setField('subjectId', ''); setField('questionTypeId', '') }}
                  className={[
                    'flex-1 sm:flex-none px-5 py-2 text-sm font-medium rounded-md transition-all duration-150',
                    form.track === t
                      ? t === 'gcse'
                        ? 'bg-white dark:bg-[#1e1e1e] text-[var(--gcse-accent)] shadow-sm border border-[var(--border)]'
                        : 'bg-white dark:bg-[#1e1e1e] text-[var(--ib-accent)] shadow-sm border border-[var(--border)]'
                      : 'text-[var(--text-muted)] hover:text-[var(--text-primary)]',
                  ].join(' ')}
                >
                  {t === 'gcse' ? 'GCSE' : 'IB Diploma'}
                </button>
              ))}
            </div>
          </div>

          <Select
            label="Subject"
            value={form.subjectId}
            onChange={(v) => { setField('subjectId', v); setField('questionTypeId', '') }}
            placeholder="Select a subject..."
            options={subjects.map((s) => ({
              value: s.id,
              label: s.label,
              description: s.board,
            }))}
          />
          {selectedSubject && (
            <p className="text-xs text-[var(--text-muted)] -mt-3">{selectedSubject.board}</p>
          )}

          {form.subjectId && (
            <div className="space-y-3">
              <p className="text-sm font-medium text-[var(--text-primary)]">Question Type</p>
              <div className="space-y-2">
                {questionTypes.map((qt) => (
                  <button
                    key={qt.id}
                    onClick={() => setField('questionTypeId', qt.id)}
                    className={[
                      'w-full text-left p-3 rounded-lg border transition-all duration-150',
                      form.questionTypeId === qt.id
                        ? form.track === 'gcse'
                          ? 'border-[var(--gcse-accent)] bg-[var(--gcse-accent-light)]'
                          : 'border-[var(--ib-accent)] bg-[var(--ib-accent-light)]'
                        : 'border-[var(--border)] hover:border-gray-400',
                    ].join(' ')}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <p className="text-sm font-medium text-[var(--text-primary)]">{qt.label}</p>
                      <span className="font-mono text-xs text-[var(--text-muted)]">{qt.markMax} marks</span>
                    </div>
                    <p className="text-xs text-[var(--text-muted)] leading-relaxed">{qt.descriptor}</p>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Step 1: Question & Materials */}
      {step === 1 && (
        <div className="space-y-4">
          <TextArea
            label="Question"
            placeholder="Paste the full question here..."
            value={form.question}
            onChange={(e) => setField('question', e.target.value)}
            minRows={4}
            autoResize
          />

          {/* Mark scheme collapsible */}
          <div className="border border-[var(--border)] rounded-lg overflow-hidden">
            <button
              className="w-full flex items-center justify-between px-4 py-3 text-sm font-medium text-[var(--text-primary)] hover:bg-gray-50 dark:hover:bg-gray-800 transition-all duration-150"
              onClick={() => setMarkSchemeOpen((o) => !o)}
            >
              <span>Mark Scheme <span className="text-[var(--text-muted)] font-normal">(optional)</span></span>
              <svg
                className={['w-4 h-4 text-[var(--text-muted)] transition-transform duration-150', markSchemeOpen ? 'rotate-180' : ''].join(' ')}
                fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            {markSchemeOpen && (
              <div className="px-4 pb-4 border-t border-[var(--border)]">
                <p className="text-xs text-[var(--text-muted)] mt-3 mb-2">
                  If you have the specific mark scheme, paste it here. If not, the built-in rubric will be used.
                </p>
                <TextArea
                  placeholder="Paste the mark scheme..."
                  value={form.markScheme}
                  onChange={(e) => setField('markScheme', e.target.value)}
                  minRows={4}
                  autoResize
                />
                <FileUpload
                  className="mt-2"
                  hint="Or upload a PDF / .txt mark scheme"
                  onExtracted={(text) => setField('markScheme', (form.markScheme + '\n\n' + text).trim())}
                />
              </div>
            )}
          </div>

          {/* Source/stimulus collapsible */}
          <div className="border border-[var(--border)] rounded-lg overflow-hidden">
            <button
              className="w-full flex items-center justify-between px-4 py-3 text-sm font-medium text-[var(--text-primary)] hover:bg-gray-50 dark:hover:bg-gray-800 transition-all duration-150"
              onClick={() => setContextOpen((o) => !o)}
            >
              <span>Source / Stimulus / Extract <span className="text-[var(--text-muted)] font-normal">(optional)</span></span>
              <svg
                className={['w-4 h-4 text-[var(--text-muted)] transition-transform duration-150', contextOpen ? 'rotate-180' : ''].join(' ')}
                fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            {contextOpen && (
              <div className="px-4 pb-4 border-t border-[var(--border)]">
                <p className="text-xs text-[var(--text-muted)] mt-3 mb-2">
                  Paste anything the student was given: source text, data table, poem, graph description, case study.
                </p>
                <TextArea
                  placeholder="Paste source material..."
                  value={form.contextFiles}
                  onChange={(e) => setField('contextFiles', e.target.value)}
                  minRows={4}
                  autoResize
                />
                <FileUpload
                  className="mt-2"
                  hint="Or upload a PDF / .txt file"
                  onExtracted={(text) => setField('contextFiles', (form.contextFiles + '\n\n' + text).trim())}
                />
              </div>
            )}
          </div>
        </div>
      )}

      {/* Step 2: Student Response */}
      {step === 2 && (
        <div className="space-y-4">
          <div className="relative">
            <TextArea
              label="Student Response"
              placeholder="Paste or type the student's full response here..."
              value={form.studentResponse}
              onChange={(e) => setField('studentResponse', e.target.value)}
              minRows={16}
              className="pb-8"
              showWordCount
            />
          </div>

          {/* Metadata row */}
          <div className="flex flex-wrap items-center gap-3 p-3 bg-[var(--sidebar)] rounded-lg">
            <label className="flex items-center gap-2 text-sm text-[var(--text-primary)] cursor-pointer">
              <input
                type="checkbox"
                checked={form.metadata.timed}
                onChange={(e) => setField('metadata', { ...form.metadata, timed: e.target.checked })}
                className="w-3.5 h-3.5 accent-[var(--gcse-accent)]"
              />
              Timed
            </label>

            {form.metadata.timed && (
              <div className="flex items-center gap-1.5">
                <input
                  type="number"
                  min={5}
                  max={180}
                  placeholder="mins"
                  value={form.metadata.duration_mins ?? ''}
                  onChange={(e) => setField('metadata', { ...form.metadata, duration_mins: parseInt(e.target.value) || undefined })}
                  className="w-16 px-2 py-1 text-xs border border-[var(--border)] rounded bg-white dark:bg-[#1e1e1e] text-[var(--text-primary)] outline-none focus:border-[var(--gcse-accent)]"
                />
                <span className="text-xs text-[var(--text-muted)]">minutes</span>
              </div>
            )}

            <input
              type="text"
              placeholder="Paper (e.g. Paper 2)"
              value={form.metadata.paper ?? ''}
              onChange={(e) => setField('metadata', { ...form.metadata, paper: e.target.value })}
              className="px-2 py-1 text-xs border border-[var(--border)] rounded bg-white dark:bg-[#1e1e1e] text-[var(--text-primary)] outline-none focus:border-[var(--gcse-accent)] w-32"
            />

            <input
              type="text"
              placeholder="Notes"
              value={form.metadata.notes ?? ''}
              onChange={(e) => setField('metadata', { ...form.metadata, notes: e.target.value })}
              className="flex-1 min-w-24 px-2 py-1 text-xs border border-[var(--border)] rounded bg-white dark:bg-[#1e1e1e] text-[var(--text-primary)] outline-none focus:border-[var(--gcse-accent)]"
            />
          </div>
        </div>
      )}

      {/* Step 3: Review & Submit */}
      {step === 3 && (
        <div className="space-y-4">
          <div className="border border-[var(--border)] rounded-lg divide-y divide-[var(--border)]">
            <ReviewRow label="Track">
              <TrackBadge track={form.track} />
            </ReviewRow>
            <ReviewRow label="Subject">
              <span className="text-sm text-[var(--text-primary)]">{selectedSubject?.label}</span>
              <span className="text-xs text-[var(--text-muted)] ml-1">({selectedSubject?.board})</span>
            </ReviewRow>
            <ReviewRow label="Question Type">
              <span className="text-sm text-[var(--text-primary)]">{selectedQType?.label}</span>
              <span className="font-mono text-xs text-[var(--text-muted)] ml-1">/{selectedQType?.markMax} marks</span>
            </ReviewRow>
            <ReviewRow label="Mark Scheme">
              <span className={['text-sm', form.markScheme ? 'text-green-600' : 'text-[var(--text-muted)]'].join(' ')}>
                {form.markScheme ? 'Provided' : 'Built-in rubric'}
              </span>
            </ReviewRow>
            <ReviewRow label="Source Material">
              <span className={['text-sm', form.contextFiles ? 'text-green-600' : 'text-[var(--text-muted)]'].join(' ')}>
                {form.contextFiles ? 'Provided' : 'None'}
              </span>
            </ReviewRow>
            <ReviewRow label="Word Count">
              <span className="font-mono text-sm text-[var(--text-primary)]">{wordCount} words</span>
            </ReviewRow>
            {form.metadata.timed && form.metadata.duration_mins && (
              <ReviewRow label="Timed">
                <span className="text-sm text-[var(--text-primary)]">{form.metadata.duration_mins} minutes</span>
              </ReviewRow>
            )}
            {form.metadata.paper && (
              <ReviewRow label="Paper">
                <span className="text-sm text-[var(--text-primary)]">{form.metadata.paper}</span>
              </ReviewRow>
            )}
          </div>

          <Button
            size="lg"
            onClick={() => onSubmit(form)}
            className={[
              'w-full',
              form.track === 'ib' ? 'bg-[var(--ib-accent)] hover:opacity-90' : '',
            ].join(' ')}
          >
            Mark This Response
          </Button>
        </div>
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
          <button
            onClick={onCancel}
            className="text-sm text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-all duration-150"
          >
            Cancel
          </button>
        )}
        {step < STEP_LABELS.length - 1 && (
          <Button onClick={() => setStep((s) => s + 1)} disabled={!canProceed()} size="md">
            Continue →
          </Button>
        )}
      </div>
    </div>
  )
}

function ReviewRow({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex items-center justify-between px-4 py-3">
      <span className="text-xs text-[var(--text-muted)] font-medium w-32 flex-shrink-0">{label}</span>
      <div className="flex items-center gap-1">{children}</div>
    </div>
  )
}
