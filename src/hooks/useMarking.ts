import { useState, useCallback } from 'react'
import type { MarkingFormState, MarkingResult } from '@/types'
import { streamMarkingCall } from '@/lib/anthropic'
import { parseMarkingResponse } from '@/lib/parsers'
import { saveSubmission, getRecentSubmissionsForSubject, logQuestion } from '@/lib/storage'
import { maybeUpdateWeaknesses } from '@/lib/weaknessExtractor'
import { getSubject, getQuestionType } from '@/lib/constants'
import { useStreaming } from './useStreaming'

interface UseMarkingResult {
  streaming: ReturnType<typeof useStreaming>
  result: MarkingResult | null
  savedSubmissionId: string | null
  isMarking: boolean
  error: string | null
  startMarking: (form: MarkingFormState) => Promise<void>
  reset: () => void
}

export function useMarking(): UseMarkingResult {
  const streaming = useStreaming()
  const [result, setResult] = useState<MarkingResult | null>(null)
  const [savedSubmissionId, setSavedSubmissionId] = useState<string | null>(null)
  const [isMarking, setIsMarking] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const startMarking = useCallback(async (form: MarkingFormState) => {
    setIsMarking(true)
    setError(null)
    setResult(null)
    setSavedSubmissionId(null)
    streaming.reset()
    streaming.start()

    try {
      // Load past submissions for context
      const pastSubmissions = getRecentSubmissionsForSubject(form.subjectId, 3)

      // Stream the marking call
      const rawResponse = await streamMarkingCall({
        subjectId: form.subjectId,
        questionTypeId: form.questionTypeId,
        question: form.question,
        markScheme: form.markScheme || undefined,
        contextFiles: form.contextFiles || undefined,
        studentResponse: form.studentResponse,
        metadata: form.metadata,
        pastSubmissions,
        onChunk: streaming.addChunk,
      })

      // Parse the complete response
      const parsed = parseMarkingResponse(rawResponse)
      setResult(parsed)
      streaming.complete(rawResponse)

      // Save to localStorage
      const subject = getSubject(form.subjectId)
      const questionType = getQuestionType(form.questionTypeId)
      const wordCount = form.studentResponse.trim().split(/\s+/).filter(Boolean).length

      const saved = saveSubmission({
        track: form.track,
        subject_id: form.subjectId,
        subject_label: subject?.label ?? form.subjectId,
        question_type: questionType?.label ?? form.questionTypeId,
        question: form.question,
        mark_scheme: form.markScheme || undefined,
        context_files: form.contextFiles || undefined,
        student_response: form.studentResponse,
        word_count: wordCount,
        mark_achieved: parsed.mark_achieved,
        mark_max: parsed.mark_max,
        band: parsed.band,
        verdict: `${parsed.overall_summary}\n\n${parsed.band_push}`,
        inline_feedback: parsed.inline_feedback_html,
        examiner_notes: JSON.stringify(parsed.examiner_notes),
        action_plan: parsed.action_plan,
        weakness_tags: parsed.weakness_tags,
        metadata: form.metadata,
      })

      setSavedSubmissionId(saved.id)

      // Log question
      logQuestion({
        subject_id: form.subjectId,
        question_type: questionType?.label ?? form.questionTypeId,
        question_snippet: form.question.substring(0, 120),
        submission_id: saved.id,
      })

      // Background weakness update check
      maybeUpdateWeaknesses(form.subjectId, form.track)
    } catch (err) {
      const message = err instanceof Error ? err.message : 'An unexpected error occurred'
      setError(message)
      streaming.setError(message)
    } finally {
      setIsMarking(false)
    }
  }, [streaming])

  const reset = useCallback(() => {
    setResult(null)
    setSavedSubmissionId(null)
    setError(null)
    setIsMarking(false)
    streaming.reset()
  }, [streaming])

  return { streaming, result, savedSubmissionId, isMarking, error, startMarking, reset }
}
