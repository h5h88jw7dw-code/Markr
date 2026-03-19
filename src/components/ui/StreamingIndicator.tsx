import React, { useEffect, useState } from 'react'
import type { StreamingStatus } from '@/types'
import { STREAMING_MESSAGES, STREAMING_STATUS_SEQUENCE } from '@/lib/constants'

interface StreamingIndicatorProps {
  status: StreamingStatus
  progress: number
}

export function StreamingIndicator({ status, progress }: StreamingIndicatorProps) {
  const [visibleMessage, setVisibleMessage] = useState('')
  const [fade, setFade] = useState(true)

  useEffect(() => {
    setFade(false)
    const t = setTimeout(() => {
      setVisibleMessage(STREAMING_MESSAGES[status] ?? '')
      setFade(true)
    }, 150)
    return () => clearTimeout(t)
  }, [status])

  // Auto-cycle through messages while streaming
  const [autoIndex, setAutoIndex] = useState(0)

  useEffect(() => {
    if (status === 'complete' || status === 'error' || status === 'idle') return
    const interval = setInterval(() => {
      setAutoIndex((i) => (i + 1) % STREAMING_STATUS_SEQUENCE.length)
    }, 2200)
    return () => clearInterval(interval)
  }, [status])

  const displayMessage =
    status === 'complete' || status === 'error'
      ? STREAMING_MESSAGES[status]
      : STREAMING_MESSAGES[STREAMING_STATUS_SEQUENCE[autoIndex]] ?? ''

  return (
    <div className="flex flex-col items-center justify-center py-16 gap-6">
      {/* Thin progress bar at top */}
      <div className="fixed top-0 left-0 right-0 h-0.5 bg-[var(--border)] z-50">
        <div
          className="h-full bg-[var(--gcse-accent)] transition-all duration-500 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Spinner */}
      <div className="w-10 h-10 border-2 border-[var(--border)] border-t-[var(--gcse-accent)] rounded-full animate-spin" />

      {/* Cycling message */}
      <p
        className={[
          'text-sm text-[var(--text-muted)] text-center transition-opacity duration-150',
          fade ? 'opacity-100' : 'opacity-0',
        ].join(' ')}
      >
        {displayMessage}
      </p>
    </div>
  )
}

// Inline small version for within cards
export function SmallSpinner({ className = '' }: { className?: string }) {
  return (
    <span
      className={[
        'inline-block w-4 h-4 border-2 border-[var(--border)] border-t-[var(--gcse-accent)] rounded-full animate-spin',
        className,
      ].join(' ')}
    />
  )
}
