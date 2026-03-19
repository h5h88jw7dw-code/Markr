import type { Profile, Submission, NewSubmission, WeaknessSummary, WeaknessEntry, Track } from '@/types'

// ─── Keys ────────────────────────────────────────────────────────────────────

const KEYS = {
  profile: 'markr_profile',
  submissions: 'markr_submissions',
  weaknesses: 'markr_weaknesses',
  questionLog: 'markr_question_log',
} as const

// ─── Helpers ─────────────────────────────────────────────────────────────────

function read<T>(key: string): T | null {
  try {
    const raw = localStorage.getItem(key)
    return raw ? (JSON.parse(raw) as T) : null
  } catch {
    return null
  }
}

function write<T>(key: string, value: T): void {
  try {
    localStorage.setItem(key, JSON.stringify(value))
  } catch (e) {
    console.error('[markr] localStorage write failed:', e)
  }
}

function uuid(): string {
  return crypto.randomUUID()
}

// ─── Profile ─────────────────────────────────────────────────────────────────

export function getProfile(): Profile | null {
  return read<Profile>(KEYS.profile)
}

export function saveProfile(profile: Profile): Profile {
  write(KEYS.profile, profile)
  return profile
}

// ─── Submissions ─────────────────────────────────────────────────────────────

export function getSubmissions(filters?: {
  subjectId?: string
  track?: string
  limit?: number
}): Submission[] {
  let subs = read<Submission[]>(KEYS.submissions) ?? []
  subs.sort((a, b) => b.created_at.localeCompare(a.created_at))
  if (filters?.subjectId) subs = subs.filter((s) => s.subject_id === filters.subjectId)
  if (filters?.track) subs = subs.filter((s) => s.track === filters.track)
  if (filters?.limit) subs = subs.slice(0, filters.limit)
  return subs
}

export function getSubmission(id: string): Submission | null {
  const subs = read<Submission[]>(KEYS.submissions) ?? []
  return subs.find((s) => s.id === id) ?? null
}

export function saveSubmission(submission: NewSubmission): Submission {
  const subs = read<Submission[]>(KEYS.submissions) ?? []
  const full: Submission = {
    ...submission,
    id: uuid(),
    created_at: new Date().toISOString(),
  }
  subs.push(full)
  write(KEYS.submissions, subs)
  return full
}

export function deleteSubmission(id: string): boolean {
  const subs = read<Submission[]>(KEYS.submissions) ?? []
  const filtered = subs.filter((s) => s.id !== id)
  if (filtered.length === subs.length) return false
  write(KEYS.submissions, filtered)
  return true
}

export function getRecentSubmissionsForSubject(subjectId: string, limit = 3): Submission[] {
  return getSubmissions({ subjectId, limit })
}

export function getSubmissionCountSince(subjectId: string, since: string): number {
  const subs = read<Submission[]>(KEYS.submissions) ?? []
  return subs.filter((s) => s.subject_id === subjectId && s.created_at >= since).length
}

// ─── Weakness Summaries ──────────────────────────────────────────────────────

function weaknessKey(subjectId: string): string {
  return `${subjectId}`
}

export function getWeaknessSummary(subjectId: string): WeaknessSummary | null {
  const all = read<Record<string, WeaknessSummary>>(KEYS.weaknesses) ?? {}
  return all[weaknessKey(subjectId)] ?? null
}

export function upsertWeaknessSummary(
  subjectId: string,
  track: string,
  ranked_weaknesses: WeaknessEntry[]
): boolean {
  try {
    const all = read<Record<string, WeaknessSummary>>(KEYS.weaknesses) ?? {}
    const key = weaknessKey(subjectId)
    all[key] = {
      id: all[key]?.id ?? uuid(),
      user_id: 'local',
      track: track as Track,
      subject_id: subjectId,
      ranked_weaknesses,
      last_updated: new Date().toISOString(),
    }
    write(KEYS.weaknesses, all)
    return true
  } catch {
    return false
  }
}

// ─── Question Log ────────────────────────────────────────────────────────────

export function logQuestion(entry: {
  subject_id: string
  question_type: string
  question_snippet: string
  submission_id: string
}): boolean {
  try {
    const log = read<typeof entry[]>(KEYS.questionLog) ?? []
    log.push(entry)
    write(KEYS.questionLog, log)
    return true
  } catch {
    return false
  }
}

// ─── Export / Import ─────────────────────────────────────────────────────────

export function exportAllData(): void {
  const data = {
    profile: read(KEYS.profile),
    submissions: read(KEYS.submissions),
    weaknesses: read(KEYS.weaknesses),
    questionLog: read(KEYS.questionLog),
    exportedAt: new Date().toISOString(),
  }
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = `markr-backup-${new Date().toISOString().slice(0, 10)}.json`
  a.click()
  URL.revokeObjectURL(url)
}

export function importData(file: File): Promise<boolean> {
  return new Promise((resolve) => {
    const reader = new FileReader()
    reader.onload = () => {
      try {
        const data = JSON.parse(reader.result as string)
        if (data.profile) write(KEYS.profile, data.profile)
        if (data.submissions) write(KEYS.submissions, data.submissions)
        if (data.weaknesses) write(KEYS.weaknesses, data.weaknesses)
        if (data.questionLog) write(KEYS.questionLog, data.questionLog)
        resolve(true)
      } catch (e) {
        console.error('[markr] import failed:', e)
        resolve(false)
      }
    }
    reader.onerror = () => resolve(false)
    reader.readAsText(file)
  })
}
