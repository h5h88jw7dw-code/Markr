import React from 'react'
import type { ActionPlan as ActionPlanType } from '@/types'

interface ActionPlanProps {
  actionPlan: ActionPlanType
}

export function ActionPlan({ actionPlan }: ActionPlanProps) {
  return (
    <div className="space-y-5">
      <ActionPlanSection
        title="To reach the next band"
        points={actionPlan.next_band}
        color="blue"
        icon="up"
      />
      <ActionPlanSection
        title="To reach the top band"
        points={actionPlan.top_band}
        color="purple"
        icon="star"
      />
      <ActionPlanSection
        title="Recurring issues"
        points={actionPlan.recurring}
        color="amber"
        icon="repeat"
        note="Patterns identified across your submissions in this subject."
      />
    </div>
  )
}

function ActionPlanSection({
  title,
  points,
  color,
  icon,
  note,
}: {
  title: string
  points: string[]
  color: 'blue' | 'purple' | 'amber'
  icon: string
  note?: string
}) {
  const colorMap = {
    blue: {
      bg: 'bg-blue-50 dark:bg-blue-900/10',
      border: 'border-blue-100 dark:border-blue-900/30',
      title: 'text-blue-700 dark:text-blue-400',
      bullet: 'bg-blue-400',
    },
    purple: {
      bg: 'bg-purple-50 dark:bg-purple-900/10',
      border: 'border-purple-100 dark:border-purple-900/30',
      title: 'text-purple-700 dark:text-purple-400',
      bullet: 'bg-purple-400',
    },
    amber: {
      bg: 'bg-amber-50 dark:bg-amber-900/10',
      border: 'border-amber-100 dark:border-amber-900/30',
      title: 'text-amber-700 dark:text-amber-400',
      bullet: 'bg-amber-400',
    },
  }

  const c = colorMap[color]

  return (
    <div className={['p-4 rounded-lg border', c.bg, c.border].join(' ')}>
      <div className="flex items-center gap-2 mb-3">
        <SectionIcon name={icon} color={c.title} />
        <h3 className={['text-sm font-semibold', c.title].join(' ')}>{title}</h3>
      </div>
      {note && <p className="text-xs text-[var(--text-muted)] mb-2">{note}</p>}
      {points.length === 0 ? (
        <p className="text-sm text-[var(--text-muted)] italic">None identified.</p>
      ) : (
        <ul className="space-y-1.5">
          {points.map((point, i) => (
            <li key={i} className="flex gap-2.5 text-sm text-[var(--text-primary)]">
              <span className={['w-1.5 h-1.5 rounded-full flex-shrink-0 mt-2', c.bullet].join(' ')} />
              {point}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

function SectionIcon({ name, color }: { name: string; color: string }) {
  const cls = `w-4 h-4 ${color}`
  switch (name) {
    case 'up':
      return (
        <svg className={cls} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 10.5L12 3m0 0l7.5 7.5M12 3v18" />
        </svg>
      )
    case 'star':
      return (
        <svg className={cls} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
        </svg>
      )
    case 'repeat':
      return (
        <svg className={cls} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
        </svg>
      )
    default:
      return null
  }
}
