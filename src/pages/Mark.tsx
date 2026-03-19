import React from 'react'
import type { MarkingFormState } from '@/types'
import { NewProjectFlow } from '@/components/marking/NewProjectFlow'
import { MarkingOutput } from '@/components/marking/MarkingOutput'
import { StreamingIndicator } from '@/components/ui/StreamingIndicator'
import { useMarking } from '@/hooks/useMarking'
import { useNavigate } from 'react-router-dom'

export function MarkPage() {
  const { streaming, result, savedSubmissionId, isMarking, error, startMarking, reset } = useMarking()
  const navigate = useNavigate()

  const handleSubmit = (form: MarkingFormState) => {
    startMarking(form)
  }

  // Streaming in progress
  if (isMarking && streaming.state.status !== 'complete') {
    return (
      <div className="flex-1 p-6">
        <StreamingIndicator
          status={streaming.state.status}
          progress={streaming.state.progress}
        />
      </div>
    )
  }

  // Error state
  if (error && !result) {
    return (
      <div className="flex-1 p-6 max-w-2xl mx-auto">
        <div className="p-4 bg-red-50 dark:bg-red-900/10 border border-red-100 dark:border-red-900/30 rounded-lg">
          <p className="text-sm font-semibold text-red-600 mb-1">Marking failed</p>
          <p className="text-sm text-red-500">{error}</p>
          {error.includes('API key') && (
            <p className="text-sm text-red-400 mt-2">
              Add your Anthropic API key in <button onClick={() => navigate('/settings')} className="underline">Settings</button>.
            </p>
          )}
        </div>
        <button onClick={reset} className="mt-4 text-sm text-[var(--text-muted)] hover:text-[var(--text-primary)]">
          ← Try again
        </button>
      </div>
    )
  }

  // Show result
  if (result) {
    return (
      <div className="flex-1 p-6">
        <MarkingOutput
          result={result}
          submissionId={savedSubmissionId}
          onNewMarking={reset}
          onViewInLibrary={() => navigate('/library')}
        />
      </div>
    )
  }

  // Show form
  return (
    <div className="flex-1 p-6">
      <NewProjectFlow onSubmit={handleSubmit} />
    </div>
  )
}
