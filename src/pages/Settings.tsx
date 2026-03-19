import React, { useState, useEffect, useRef } from 'react'
import type { Profile } from '@/types'
import { exportAllData, importData } from '@/lib/storage'
import { Button } from '@/components/ui/Button'
import { GCSE_SUBJECTS, IB_SUBJECTS } from '@/lib/constants'

interface SettingsPageProps {
  profile: Profile | null
  onProfileUpdate: (p: Profile) => void
  onToggleDarkMode: () => void
  darkMode: boolean
}

export function SettingsPage({ profile, onProfileUpdate, onToggleDarkMode, darkMode }: SettingsPageProps) {
  const [name, setName] = useState(profile?.name ?? '')
  const [examYear, setExamYear] = useState(profile?.exam_year ?? 2026)
  const [gcseSubjects, setGcseSubjects] = useState<string[]>(profile?.gcse_subjects ?? [])
  const [ibSubjects, setIbSubjects] = useState<string[]>(profile?.ib_subjects ?? [])
  const [apiKey, setApiKey] = useState(() => localStorage.getItem('anthropic_api_key') ?? '')
  const [apiKeySaved, setApiKeySaved] = useState(false)
  const [saved, setSaved] = useState(false)
  const [importStatus, setImportStatus] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    setName(profile?.name ?? '')
    setExamYear(profile?.exam_year ?? 2026)
    setGcseSubjects(profile?.gcse_subjects ?? [])
    setIbSubjects(profile?.ib_subjects ?? [])
  }, [profile])

  const handleSaveProfile = () => {
    if (!profile) return
    const updated: Profile = { ...profile, name, exam_year: examYear, gcse_subjects: gcseSubjects, ib_subjects: ibSubjects }
    onProfileUpdate(updated)
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  const handleSaveApiKey = () => {
    localStorage.setItem('anthropic_api_key', apiKey)
    setApiKeySaved(true)
    setTimeout(() => setApiKeySaved(false), 2000)
  }

  const handleImport = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    const ok = await importData(file)
    setImportStatus(ok ? 'Data imported. Reload to apply.' : 'Import failed — check the file format.')
    setTimeout(() => setImportStatus(null), 4000)
    if (fileInputRef.current) fileInputRef.current.value = ''
  }

  const toggleGcse = (id: string) =>
    setGcseSubjects((prev) => prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id])

  const toggleIb = (id: string) =>
    setIbSubjects((prev) => prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id])

  return (
    <div className="flex-1 p-6 max-w-2xl">
      <div className="space-y-8">
        {/* API Key */}
        <Section title="Anthropic API Key" description="Your key is stored in your browser's localStorage and never sent to any server other than Anthropic.">
          <div className="flex gap-2">
            <input
              type="password"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              placeholder="sk-ant-api03-..."
              className="flex-1 px-3 py-2 text-sm border border-[var(--border)] rounded-lg outline-none focus:border-[var(--gcse-accent)] bg-white dark:bg-[#1e1e1e] text-[var(--text-primary)] font-mono"
            />
            <Button variant="secondary" size="md" onClick={handleSaveApiKey}>
              {apiKeySaved ? '✓ Saved' : 'Save'}
            </Button>
          </div>
          {!apiKey && (
            <p className="text-xs text-red-500 mt-1">No API key set. Marking will not work until you add one.</p>
          )}
        </Section>

        {/* Appearance */}
        <Section title="Appearance" description="Toggle between light and dark mode.">
          <div className="flex items-center justify-between">
            <span className="text-sm text-[var(--text-primary)]">Dark mode</span>
            <button
              onClick={onToggleDarkMode}
              className={[
                'relative w-10 h-5.5 rounded-full transition-all duration-150',
                darkMode ? 'bg-[var(--gcse-accent)]' : 'bg-[var(--border)]',
              ].join(' ')}
              style={{ height: '22px' }}
              aria-label="Toggle dark mode"
            >
              <span
                className={[
                  'absolute top-0.5 w-4 h-4 bg-white rounded-full shadow-sm transition-all duration-150',
                  darkMode ? 'translate-x-5' : 'translate-x-0.5',
                ].join(' ')}
              />
            </button>
          </div>
        </Section>

        {/* Profile */}
        <Section title="Profile" description="Your name and exam year.">
          <div className="space-y-3">
            <div>
              <label className="text-xs font-medium text-[var(--text-muted)] block mb-1">Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-3 py-2 text-sm border border-[var(--border)] rounded-lg outline-none focus:border-[var(--gcse-accent)] bg-white dark:bg-[#1e1e1e] text-[var(--text-primary)]"
              />
            </div>
            <div>
              <label className="text-xs font-medium text-[var(--text-muted)] block mb-1">Exam year</label>
              <input
                type="number"
                value={examYear}
                onChange={(e) => setExamYear(parseInt(e.target.value) || 2026)}
                className="w-24 px-3 py-2 text-sm border border-[var(--border)] rounded-lg outline-none focus:border-[var(--gcse-accent)] bg-white dark:bg-[#1e1e1e] text-[var(--text-primary)]"
              />
            </div>
          </div>
        </Section>

        {/* GCSE subjects */}
        <Section title="GCSE Subjects" description="Subjects shown in your sidebar.">
          <div className="flex flex-wrap gap-2">
            {GCSE_SUBJECTS.map((s) => (
              <button
                key={s.id}
                onClick={() => toggleGcse(s.id)}
                className={[
                  'px-3 py-1.5 text-xs rounded-md border transition-all duration-150',
                  gcseSubjects.includes(s.id)
                    ? 'border-[var(--gcse-accent)] bg-[var(--gcse-accent-light)] text-[var(--gcse-accent)]'
                    : 'border-[var(--border)] text-[var(--text-muted)] hover:border-gray-400',
                ].join(' ')}
              >
                {s.shortLabel ?? s.label}
              </button>
            ))}
          </div>
        </Section>

        {/* IB subjects */}
        <Section title="IB Subjects" description="Subjects shown in your sidebar.">
          <div className="flex flex-wrap gap-2">
            {IB_SUBJECTS.map((s) => (
              <button
                key={s.id}
                onClick={() => toggleIb(s.id)}
                className={[
                  'px-3 py-1.5 text-xs rounded-md border transition-all duration-150',
                  ibSubjects.includes(s.id)
                    ? 'border-[var(--ib-accent)] bg-[var(--ib-accent-light)] text-[var(--ib-accent)]'
                    : 'border-[var(--border)] text-[var(--text-muted)] hover:border-gray-400',
                ].join(' ')}
              >
                {s.shortLabel ?? s.label}
              </button>
            ))}
          </div>
        </Section>

        {/* Save */}
        <div className="flex items-center gap-3">
          <Button onClick={handleSaveProfile} size="md">
            {saved ? '✓ Saved' : 'Save Profile'}
          </Button>
          {saved && <p className="text-sm text-green-600">Changes saved.</p>}
        </div>

        {/* Data Management */}
        <Section title="Data" description="Export all your data as a JSON backup, or import a previous backup.">
          <div className="flex items-center gap-3">
            <Button variant="secondary" size="md" onClick={exportAllData}>
              Export Data
            </Button>
            <Button variant="secondary" size="md" onClick={() => fileInputRef.current?.click()}>
              Import Data
            </Button>
            <input
              ref={fileInputRef}
              type="file"
              accept=".json"
              onChange={handleImport}
              className="hidden"
            />
          </div>
          {importStatus && (
            <p className={['text-sm mt-2', importStatus.includes('failed') ? 'text-red-500' : 'text-green-600'].join(' ')}>
              {importStatus}
            </p>
          )}
        </Section>
      </div>
    </div>
  )
}

function Section({ title, description, children }: { title: string; description?: string; children: React.ReactNode }) {
  return (
    <div>
      <div className="mb-3">
        <h3 className="text-sm font-semibold text-[var(--text-primary)]">{title}</h3>
        {description && <p className="text-xs text-[var(--text-muted)] mt-0.5">{description}</p>}
      </div>
      {children}
    </div>
  )
}
