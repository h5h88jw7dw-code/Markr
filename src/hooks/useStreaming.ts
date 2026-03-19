import { useState, useCallback } from 'react'
import type { StreamingState, StreamingStatus } from '@/types'
import { STREAMING_STATUS_SEQUENCE } from '@/lib/constants'

const INITIAL_STATE: StreamingState = {
  status: 'idle',
  statusMessage: '',
  progress: 0,
  rawResponse: '',
}

export function useStreaming() {
  const [state, setState] = useState<StreamingState>(INITIAL_STATE)

  const start = useCallback(() => {
    setState({
      status: 'reading',
      statusMessage: 'Reading response...',
      progress: 5,
      rawResponse: '',
    })
  }, [])

  const addChunk = useCallback((chunk: string) => {
    setState((prev) => {
      const rawResponse = prev.rawResponse + chunk
      // Estimate progress based on content length (rough heuristic)
      const charCount = rawResponse.length
      const estimatedTotal = 3000
      const rawProgress = Math.min(90, Math.round((charCount / estimatedTotal) * 85) + 5)

      // Advance status based on content markers
      let status: StreamingStatus = prev.status
      let statusMessage = prev.statusMessage

      if (rawResponse.includes('<inline_feedback>') && status === 'reading') {
        const idx = STREAMING_STATUS_SEQUENCE.indexOf('writing')
        status = STREAMING_STATUS_SEQUENCE[idx] as StreamingStatus
        statusMessage = 'Writing examiner feedback...'
      } else if (rawResponse.includes('<examiner_notes>') && status !== 'generating') {
        status = 'generating'
        statusMessage = 'Generating action plan...'
      }

      return { ...prev, rawResponse, status, statusMessage, progress: rawProgress }
    })
  }, [])

  const complete = useCallback((rawResponse?: string) => {
    setState((prev) => ({
      ...prev,
      status: 'complete',
      statusMessage: 'Complete',
      progress: 100,
      rawResponse: rawResponse ?? prev.rawResponse,
    }))
  }, [])

  const setError = useCallback((error: string) => {
    setState((prev) => ({
      ...prev,
      status: 'error',
      statusMessage: 'An error occurred',
      error,
    }))
  }, [])

  const reset = useCallback(() => {
    setState(INITIAL_STATE)
  }, [])

  return { state, start, addChunk, complete, setError, reset }
}
