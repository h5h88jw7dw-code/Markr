import React from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import type { Profile } from '@/types'
import { GCSE_SUBJECTS, IB_SUBJECTS } from '@/lib/constants'

interface SidebarProps {
  profile: Profile | null
  onNewMarking: () => void
}

function SubjectNavItem({ subjectId, label, track }: { subjectId: string; label: string; track: 'gcse' | 'ib' }) {
  const accent = track === 'gcse' ? 'var(--gcse-accent)' : 'var(--ib-accent)'
  const accentLight = track === 'gcse' ? 'var(--gcse-accent-light)' : 'var(--ib-accent-light)'

  return (
    <NavLink
      to={`/analytics/${subjectId}`}
      className={({ isActive }) =>
        [
          'flex items-center gap-2 px-3 py-1.5 text-xs rounded-md transition-all duration-150 group',
          isActive
            ? 'text-[var(--text-primary)] font-medium'
            : 'text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-gray-50 dark:hover:bg-gray-800',
        ].join(' ')
      }
      style={({ isActive }) =>
        isActive
          ? {
              borderLeft: `2px solid ${accent}`,
              backgroundColor: accentLight,
              paddingLeft: '10px',
            }
          : { borderLeft: '2px solid transparent' }
      }
    >
      <span className="truncate">{label}</span>
    </NavLink>
  )
}

export function Sidebar({ profile, onNewMarking }: SidebarProps) {
  const navigate = useNavigate()

  const gcseSubjects = profile?.gcse_subjects
    ? GCSE_SUBJECTS.filter((s) => profile.gcse_subjects.includes(s.id))
    : GCSE_SUBJECTS

  const ibSubjects = profile?.ib_subjects
    ? IB_SUBJECTS.filter((s) => profile.ib_subjects.includes(s.id))
    : IB_SUBJECTS

  return (
    <aside
      className="hidden md:flex flex-col w-60 h-screen fixed left-0 top-0 bg-[var(--sidebar)] border-r border-[var(--border)] overflow-y-auto z-30"
      aria-label="Sidebar navigation"
    >
      {/* Logo */}
      <div className="px-4 py-4 border-b border-[var(--border)]">
        <button
          onClick={() => navigate('/mark')}
          className="text-sm font-semibold text-[var(--text-primary)] tracking-tight"
        >
          Markr
        </button>
      </div>

      {/* New Marking button */}
      <div className="px-3 py-3">
        <button
          onClick={onNewMarking}
          className="w-full flex items-center gap-2 px-3 py-2 text-xs font-medium text-white bg-[var(--gcse-accent)] rounded-lg hover:opacity-90 transition-all duration-150"
        >
          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
          </svg>
          New Marking
        </button>
      </div>

      {/* Main nav */}
      <nav className="px-2 py-1">
        <SidebarNavItem to="/mark" icon="mark" label="Mark" />
        <SidebarNavItem to="/library" icon="library" label="Library" />
        <SidebarNavItem to="/analytics" icon="analytics" label="Analytics" />
        <SidebarNavItem to="/settings" icon="settings" label="Settings" />
      </nav>

      <div className="mx-3 my-2 border-t border-[var(--border)]" />

      {/* GCSE subjects */}
      {gcseSubjects.length > 0 && (
        <div className="px-2 py-1">
          <p className="px-3 py-1 text-[10px] font-semibold uppercase tracking-wider text-[var(--gcse-accent)]">
            GCSE
          </p>
          {gcseSubjects.map((s) => (
            <SubjectNavItem key={s.id} subjectId={s.id} label={s.shortLabel ?? s.label} track="gcse" />
          ))}
        </div>
      )}

      {/* IB subjects */}
      {ibSubjects.length > 0 && (
        <div className="px-2 py-1">
          <p className="px-3 py-1 text-[10px] font-semibold uppercase tracking-wider text-[var(--ib-accent)]">
            IB Diploma
          </p>
          {ibSubjects.map((s) => (
            <SubjectNavItem key={s.id} subjectId={s.id} label={s.shortLabel ?? s.label} track="ib" />
          ))}
        </div>
      )}

      {/* Profile at bottom */}
      {profile && (
        <div className="mt-auto px-4 py-3 border-t border-[var(--border)]">
          <p className="text-xs font-medium text-[var(--text-primary)] truncate">{profile.name}</p>
          <p className="text-xs text-[var(--text-muted)]">Exam year {profile.exam_year}</p>
        </div>
      )}
    </aside>
  )
}

function SidebarNavItem({
  to,
  icon,
  label,
}: {
  to: string
  icon: string
  label: string
}) {
  return (
    <NavLink
      to={to}
      end={to === '/analytics'}
      className={({ isActive }) =>
        [
          'flex items-center gap-2.5 px-3 py-2 text-sm rounded-md transition-all duration-150',
          isActive
            ? 'bg-gray-100 dark:bg-gray-800 text-[var(--text-primary)] font-medium'
            : 'text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-gray-50 dark:hover:bg-gray-800',
        ].join(' ')
      }
    >
      <NavIcon name={icon} />
      {label}
    </NavLink>
  )
}

function NavIcon({ name }: { name: string }) {
  const cls = 'w-4 h-4 flex-shrink-0'
  switch (name) {
    case 'mark':
      return (
        <svg className={cls} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931z" />
        </svg>
      )
    case 'library':
      return (
        <svg className={cls} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
        </svg>
      )
    case 'analytics':
      return (
        <svg className={cls} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
        </svg>
      )
    case 'settings':
      return (
        <svg className={cls} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.325.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.241-.438.613-.43.992a7.723 7.723 0 010 .255c-.008.378.137.75.43.991l1.004.827c.424.35.534.955.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.47 6.47 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.281c-.09.543-.56.94-1.11.94h-2.594c-.55 0-1.019-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.991a6.932 6.932 0 010-.255c.007-.38-.138-.751-.43-.992l-1.004-.827a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.086.22-.128.332-.183.582-.495.644-.869l.214-1.28z" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      )
    default:
      return null
  }
}

// ─── Mobile bottom nav ────────────────────────────────────────────────────────

export function MobileNav({ onNewMarking }: { onNewMarking: () => void }) {
  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-[var(--bg)] border-t border-[var(--border)] flex items-center justify-around px-2 py-2 safe-area-pb">
      <MobileNavItem to="/mark" label="Mark" icon="mark" />
      <button
        onClick={onNewMarking}
        className="flex flex-col items-center gap-0.5 text-[10px] text-white bg-[var(--gcse-accent)] rounded-lg px-3 py-1.5"
      >
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
        </svg>
        New
      </button>
      <MobileNavItem to="/library" label="Library" icon="library" />
      <MobileNavItem to="/analytics" label="Analytics" icon="analytics" />
      <MobileNavItem to="/settings" label="Settings" icon="settings" />
    </nav>
  )
}

function MobileNavItem({ to, label, icon }: { to: string; label: string; icon: string }) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        [
          'flex flex-col items-center gap-0.5 text-[10px] px-2 py-1 rounded-md transition-all duration-150',
          isActive ? 'text-[var(--gcse-accent)]' : 'text-[var(--text-muted)]',
        ].join(' ')
      }
    >
      <NavIcon name={icon} />
      {label}
    </NavLink>
  )
}
