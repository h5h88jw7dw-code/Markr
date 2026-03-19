import React, { useState } from 'react'

interface InlineFeedbackProps {
  html: string
}

export function InlineFeedback({ html }: InlineFeedbackProps) {
  const [showAnnotations, setShowAnnotations] = useState(true)

  return (
    <div>
      {/* Toggle */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3 flex-wrap">
          <AnnotationLegendItem color="bg-green-100 dark:bg-green-900/30" badge="AO1" badgeColor="bg-green-600" label="Knowledge" />
          <AnnotationLegendItem color="bg-blue-100 dark:bg-blue-900/30" badge="AO2" badgeColor="bg-blue-600" label="Analysis" />
          <AnnotationLegendItem color="bg-purple-100 dark:bg-purple-900/30" badge="AO3" badgeColor="bg-purple-600" label="AO3" />
          <div className="flex items-center gap-1.5 text-xs text-[var(--text-muted)]">
            <span className="inline-block w-4 h-0.5 border-b-2 border-red-500 border-dashed" />
            Weakness
          </div>
          <div className="flex items-center gap-1.5 text-xs text-[var(--text-muted)]">
            <span className="inline-block w-1 h-4 bg-green-600 rounded" />
            Strength
          </div>
        </div>
        <button
          onClick={() => setShowAnnotations((a) => !a)}
          className="text-xs text-[var(--text-muted)] hover:text-[var(--text-primary)] border border-[var(--border)] px-2 py-1 rounded-md transition-all duration-150"
        >
          {showAnnotations ? 'Hide annotations' : 'Show annotations'}
        </button>
      </div>

      {/* Annotated response */}
      <div
        className={[
          'text-sm text-[var(--text-primary)] leading-relaxed p-4 bg-[var(--sidebar)] rounded-lg border border-[var(--border)]',
          !showAnnotations ? 'annotation-hidden' : '',
        ].join(' ')}
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: showAnnotations ? html : stripAnnotations(html) }}
      />

      {!showAnnotations && (
        <style>{`.annotation-hidden .annotation-ao1, .annotation-hidden .annotation-ao2, .annotation-hidden .annotation-ao3, .annotation-hidden .annotation-weakness, .annotation-hidden .annotation-strength { all: unset; }`}</style>
      )}
    </div>
  )
}

function AnnotationLegendItem({
  color,
  badge,
  badgeColor,
  label,
}: {
  color: string
  badge: string
  badgeColor: string
  label: string
}) {
  return (
    <div className="flex items-center gap-1.5 text-xs text-[var(--text-muted)]">
      <span className={['inline-block px-1.5 py-0.5 rounded text-white text-[10px] font-semibold', badgeColor].join(' ')}>
        {badge}
      </span>
      <span className={['inline-block w-3 h-3 rounded', color].join(' ')} />
      {label}
    </div>
  )
}

function stripAnnotations(html: string): string {
  return html
    .replace(/<span class="annotation[^"]*"[^>]*>/g, '')
    .replace(/<span class="annotation-badge[^"]*">[^<]*<\/span>/g, '')
    .replace(/<\/span>/g, '')
}
