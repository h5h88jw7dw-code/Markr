import React, { useRef, useState } from 'react'
import { extractTextFromFile } from '@/lib/parsers'

interface FileUploadProps {
  onExtracted: (text: string, filename: string) => void
  label?: string
  hint?: string
  className?: string
}

export function FileUpload({ onExtracted, label, hint, className = '' }: FileUploadProps) {
  const inputRef = useRef<HTMLInputElement>(null)
  const [filename, setFilename] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [dragging, setDragging] = useState(false)

  const handleFile = async (file: File) => {
    setLoading(true)
    setFilename(file.name)
    try {
      const text = await extractTextFromFile(file)
      onExtracted(text, file.name)
    } catch (e) {
      console.error('File extraction failed:', e)
      setFilename(null)
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) handleFile(file)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setDragging(false)
    const file = e.dataTransfer.files?.[0]
    if (file) handleFile(file)
  }

  return (
    <div className={className}>
      {label && <p className="text-sm font-medium text-[var(--text-primary)] mb-1.5">{label}</p>}
      {hint && <p className="text-xs text-[var(--text-muted)] mb-2">{hint}</p>}
      <div
        className={[
          'border-2 border-dashed rounded-lg px-4 py-6 text-center cursor-pointer transition-all duration-150',
          dragging
            ? 'border-[var(--gcse-accent)] bg-[var(--gcse-accent-light)]'
            : 'border-[var(--border)] hover:border-gray-400',
        ].join(' ')}
        onClick={() => inputRef.current?.click()}
        onDragOver={(e) => { e.preventDefault(); setDragging(true) }}
        onDragLeave={() => setDragging(false)}
        onDrop={handleDrop}
      >
        {loading ? (
          <div className="flex items-center justify-center gap-2 text-sm text-[var(--text-muted)]">
            <span className="w-4 h-4 border-2 border-[var(--gcse-accent)] border-t-transparent rounded-full animate-spin" />
            Extracting text...
          </div>
        ) : filename ? (
          <div className="flex items-center justify-center gap-2 text-sm text-[var(--text-primary)]">
            <svg className="w-4 h-4 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
            {filename}
            <button
              onClick={(e) => { e.stopPropagation(); setFilename(null); if (inputRef.current) inputRef.current.value = '' }}
              className="text-[var(--text-muted)] hover:text-[var(--danger)] ml-1"
              aria-label="Remove file"
            >
              ×
            </button>
          </div>
        ) : (
          <div className="text-sm text-[var(--text-muted)]">
            <p>Drop a PDF or .txt file here, or <span className="text-[var(--gcse-accent)] underline">browse</span></p>
            <p className="text-xs mt-1">PDF and plain text accepted</p>
          </div>
        )}
      </div>
      <input
        ref={inputRef}
        type="file"
        accept=".pdf,.txt,text/plain,application/pdf"
        className="hidden"
        onChange={handleChange}
      />
    </div>
  )
}
