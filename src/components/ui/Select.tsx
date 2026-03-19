import React from 'react'

interface SelectOption {
  value: string
  label: string
  description?: string
}

interface SelectProps extends Omit<React.SelectHTMLAttributes<HTMLSelectElement>, 'onChange'> {
  label?: string
  hint?: string
  options: SelectOption[]
  onChange: (value: string) => void
  placeholder?: string
}

export function Select({ label, hint, options, onChange, placeholder, className = '', value, ...props }: SelectProps) {
  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label className="text-sm font-medium text-[var(--text-primary)]">{label}</label>
      )}
      {hint && <p className="text-xs text-[var(--text-muted)]">{hint}</p>}
      <div className="relative">
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={[
            'w-full px-3 py-2 pr-8 text-sm text-[var(--text-primary)] bg-white dark:bg-[#1e1e1e]',
            'border border-[var(--border)] rounded-lg outline-none appearance-none cursor-pointer',
            'focus:border-[var(--gcse-accent)] focus:ring-1 focus:ring-[var(--gcse-accent)]',
            'transition-all duration-150',
            className,
          ].join(' ')}
          {...props}
        >
          {placeholder && <option value="">{placeholder}</option>}
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
        <span className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-[var(--text-muted)]">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
        </span>
      </div>
      {/* Show description for selected option */}
      {value && (() => {
        const selected = options.find((o) => o.value === value)
        return selected?.description ? (
          <p className="text-xs text-[var(--text-muted)]">{selected.description}</p>
        ) : null
      })()}
    </div>
  )
}
