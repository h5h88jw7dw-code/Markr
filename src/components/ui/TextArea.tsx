import React, { useEffect, useRef } from 'react'

interface TextAreaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string
  hint?: string
  showWordCount?: boolean
  autoResize?: boolean
  minRows?: number
}

function countWords(text: string): number {
  return text.trim().split(/\s+/).filter(Boolean).length
}

export function TextArea({
  label,
  hint,
  showWordCount = false,
  autoResize = false,
  minRows = 4,
  className = '',
  value,
  onChange,
  ...props
}: TextAreaProps) {
  const ref = useRef<HTMLTextAreaElement>(null)

  useEffect(() => {
    if (!autoResize || !ref.current) return
    ref.current.style.height = 'auto'
    ref.current.style.height = `${ref.current.scrollHeight}px`
  }, [value, autoResize])

  const wordCount = showWordCount && typeof value === 'string' ? countWords(value) : null

  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label className="text-sm font-medium text-[var(--text-primary)]">{label}</label>
      )}
      {hint && <p className="text-xs text-[var(--text-muted)]">{hint}</p>}
      <div className="relative">
        <textarea
          ref={ref}
          rows={minRows}
          value={value}
          onChange={onChange}
          className={[
            'w-full px-3 py-2.5 text-sm text-[var(--text-primary)] bg-white dark:bg-[#1e1e1e]',
            'border border-[var(--border)] rounded-lg resize-y outline-none',
            'placeholder:text-[var(--text-muted)]',
            'focus:border-[var(--gcse-accent)] focus:ring-1 focus:ring-[var(--gcse-accent)]',
            'transition-all duration-150',
            autoResize ? 'resize-none overflow-hidden' : '',
            className,
          ].join(' ')}
          {...props}
        />
        {wordCount !== null && (
          <span className="absolute bottom-2 right-3 text-xs text-[var(--text-muted)] pointer-events-none select-none">
            {wordCount} {wordCount === 1 ? 'word' : 'words'}
          </span>
        )}
      </div>
    </div>
  )
}
