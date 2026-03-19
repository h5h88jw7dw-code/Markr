import React from 'react'
import { Sidebar, MobileNav } from './Sidebar'
import { TopBar } from './TopBar'
import type { Profile } from '@/types'

interface PageWrapperProps {
  profile: Profile | null
  title: string
  onNewMarking: () => void
  onToggleDarkMode: () => void
  darkMode: boolean
  children: React.ReactNode
  topBarActions?: React.ReactNode
}

export function PageWrapper({
  profile,
  title,
  onNewMarking,
  onToggleDarkMode,
  darkMode,
  children,
  topBarActions,
}: PageWrapperProps) {
  return (
    <div className="flex min-h-screen bg-[var(--bg)]">
      <Sidebar profile={profile} onNewMarking={onNewMarking} />
      <div className="flex-1 md:ml-60 flex flex-col">
        <TopBar
          title={title}
          onNewMarking={onNewMarking}
          onToggleDarkMode={onToggleDarkMode}
          darkMode={darkMode}
          actions={topBarActions}
        />
        <main className="flex-1 overflow-auto pb-16 md:pb-0">{children}</main>
      </div>
      <MobileNav onNewMarking={onNewMarking} />
    </div>
  )
}
