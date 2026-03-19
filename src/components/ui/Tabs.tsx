import React from 'react'

interface Tab {
  id: string
  label: string
  count?: number
}

interface TabsProps {
  tabs: Tab[]
  active: string
  onChange: (id: string) => void
  className?: string
}

export function Tabs({ tabs, active, onChange, className = '' }: TabsProps) {
  return (
    <div className={['flex border-b border-[var(--border)]', className].join(' ')} role="tablist">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          role="tab"
          aria-selected={active === tab.id}
          onClick={() => onChange(tab.id)}
          className={[
            'px-4 py-2.5 text-sm font-medium transition-all duration-150 ease-in-out border-b-2 -mb-px whitespace-nowrap',
            active === tab.id
              ? 'border-[var(--gcse-accent)] text-[var(--gcse-accent)]'
              : 'border-transparent text-[var(--text-muted)] hover:text-[var(--text-primary)]',
          ].join(' ')}
        >
          {tab.label}
          {tab.count !== undefined && (
            <span className="ml-1.5 px-1.5 py-0.5 text-xs rounded-full bg-gray-100 dark:bg-gray-700 text-[var(--text-muted)]">
              {tab.count}
            </span>
          )}
        </button>
      ))}
    </div>
  )
}
