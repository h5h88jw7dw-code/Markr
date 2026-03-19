import React, { useState, useCallback } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import type { Profile } from '@/types'
import { getProfile, saveProfile } from '@/lib/storage'
import { OnboardingFlow } from '@/components/onboarding/OnboardingFlow'
import { PageWrapper } from '@/components/layout/PageWrapper'
import { MarkPage } from '@/pages/Mark'
import { LibraryPage } from '@/pages/Library'
import { AnalyticsPage } from '@/pages/Analytics'
import { SettingsPage } from '@/pages/Settings'
import './index.css'

type AppState = 'onboarding' | 'ready'

function App() {
  const [profile, setProfile] = useState<Profile | null>(() => getProfile())
  const [appState, setAppState] = useState<AppState>(() => getProfile() ? 'ready' : 'onboarding')
  const [darkMode, setDarkMode] = useState(() => {
    const saved = getProfile()?.dark_mode
    if (saved !== undefined) return saved
    return localStorage.getItem('markr_dark') === 'true'
  })

  // Sync dark mode class
  React.useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
    localStorage.setItem('markr_dark', String(darkMode))
  }, [darkMode])

  const handleOnboardingComplete = useCallback((profileData: Profile) => {
    const saved = saveProfile(profileData)
    setProfile(saved)
    setAppState('ready')
  }, [])

  const handleProfileUpdate = useCallback((updated: Profile) => {
    saveProfile(updated)
    setProfile(updated)
  }, [])

  const toggleDarkMode = useCallback(() => setDarkMode((d) => !d), [])

  if (appState === 'onboarding') {
    return <OnboardingFlow onComplete={handleOnboardingComplete} />
  }

  return (
    <BrowserRouter>
      <AppRoutes
        profile={profile}
        darkMode={darkMode}
        toggleDarkMode={toggleDarkMode}
        onProfileUpdate={handleProfileUpdate}
      />
    </BrowserRouter>
  )
}

function AppRoutes({
  profile,
  darkMode,
  toggleDarkMode,
  onProfileUpdate,
}: {
  profile: Profile | null
  darkMode: boolean
  toggleDarkMode: () => void
  onProfileUpdate: (p: Profile) => void
}) {
  const wrap = (title: string, child: React.ReactNode) => (
    <PageWrapper
      profile={profile}
      title={title}
      onNewMarking={() => {}}
      onToggleDarkMode={toggleDarkMode}
      darkMode={darkMode}
    >
      {child}
    </PageWrapper>
  )

  return (
    <Routes>
      <Route path="/" element={<Navigate to="/mark" replace />} />
      <Route path="/mark" element={wrap('Mark', <MarkPage />)} />
      <Route path="/library" element={wrap('Library', <LibraryPage />)} />
      <Route path="/analytics" element={wrap('Analytics', <AnalyticsPage />)} />
      <Route path="/analytics/:subjectId" element={wrap('Analytics', <AnalyticsPage />)} />
      <Route
        path="/settings"
        element={wrap(
          'Settings',
          <SettingsPage
            profile={profile}
            onProfileUpdate={onProfileUpdate}
            onToggleDarkMode={toggleDarkMode}
            darkMode={darkMode}
          />
        )}
      />
    </Routes>
  )
}

export default App
