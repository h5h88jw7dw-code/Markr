import { useState, useEffect, useCallback } from 'react'
import type { Submission, SubjectAnalytics, WeaknessEntry } from '@/types'
import { getSubmissions, getWeaknessSummary } from '@/lib/storage'
import { getSubject, getMarkPercent, GCSE_SUBJECTS, IB_SUBJECTS } from '@/lib/constants'
import { generatePriorityList } from '@/lib/anthropic'

export function useAnalytics() {
  const [allSubmissions, setAllSubmissions] = useState<Submission[]>([])
  const [loading, setLoading] = useState(false)

  const load = useCallback(() => {
    setLoading(true)
    const data = getSubmissions()
    setAllSubmissions(data)
    setLoading(false)
  }, [])

  useEffect(() => {
    load()
  }, [load])

  const getSubjectAnalytics = useCallback(
    (subjectId: string): SubjectAnalytics | null => {
      const subject = getSubject(subjectId)
      if (!subject) return null

      const submissions = allSubmissions.filter((s) => s.subject_id === subjectId)
      if (submissions.length === 0) {
        return {
          subjectId,
          subjectLabel: subject.label,
          track: subject.track,
          submissions: [],
          averagePercent: 0,
          totalSubmissions: 0,
          bandDistribution: {},
          weaknesses: [],
          questionTypeCoverage: {},
        }
      }

      // Average percent
      const percentages = submissions.map((s) => getMarkPercent(s.mark_achieved, s.mark_max))
      const averagePercent = Math.round(percentages.reduce((a, b) => a + b, 0) / percentages.length)

      // Last submission date and days since
      const sortedByDate = [...submissions].sort((a, b) => b.created_at.localeCompare(a.created_at))
      const lastSubmission = sortedByDate[0]?.created_at
      const daysSinceLast = lastSubmission
        ? Math.floor((Date.now() - new Date(lastSubmission).getTime()) / (1000 * 60 * 60 * 24))
        : undefined

      // Band distribution
      const bandDistribution: Record<string, number> = {}
      for (const sub of submissions) {
        bandDistribution[sub.band] = (bandDistribution[sub.band] ?? 0) + 1
      }

      // Question type coverage
      const questionTypeCoverage: Record<string, number> = {}
      for (const sub of submissions) {
        questionTypeCoverage[sub.question_type] = (questionTypeCoverage[sub.question_type] ?? 0) + 1
      }

      // Weaknesses from summary
      const weaknessSummary = getWeaknessSummary(subjectId)
      const weaknesses: WeaknessEntry[] = weaknessSummary?.ranked_weaknesses ?? []

      return {
        subjectId,
        subjectLabel: subject.label,
        track: subject.track,
        submissions: sortedByDate,
        averagePercent,
        lastSubmission,
        daysSinceLast,
        totalSubmissions: submissions.length,
        bandDistribution,
        weaknesses,
        questionTypeCoverage,
      }
    },
    [allSubmissions]
  )

  const getGlobalStats = useCallback(() => {
    const gcseStats = GCSE_SUBJECTS.map((s) => {
      const subs = allSubmissions.filter((sub) => sub.subject_id === s.id)
      const last = subs.sort((a, b) => b.created_at.localeCompare(a.created_at))[0]
      const avgPct = subs.length > 0
        ? Math.round(subs.reduce((acc, sub) => acc + getMarkPercent(sub.mark_achieved, sub.mark_max), 0) / subs.length)
        : null
      const daysSinceLast = last
        ? Math.floor((Date.now() - new Date(last.created_at).getTime()) / (1000 * 60 * 60 * 24))
        : null
      return { subject: s, count: subs.length, avgPct, daysSinceLast }
    })

    const ibStats = IB_SUBJECTS.map((s) => {
      const subs = allSubmissions.filter((sub) => sub.subject_id === s.id)
      const last = subs.sort((a, b) => b.created_at.localeCompare(a.created_at))[0]
      const avgPct = subs.length > 0
        ? Math.round(subs.reduce((acc, sub) => acc + getMarkPercent(sub.mark_achieved, sub.mark_max), 0) / subs.length)
        : null
      const daysSinceLast = last
        ? Math.floor((Date.now() - new Date(last.created_at).getTime()) / (1000 * 60 * 60 * 24))
        : null
      return { subject: s, count: subs.length, avgPct, daysSinceLast }
    })

    return {
      gcse: gcseStats.sort((a, b) => (a.avgPct ?? 101) - (b.avgPct ?? 101)),
      ib: ibStats.sort((a, b) => (a.avgPct ?? 101) - (b.avgPct ?? 101)),
      totalSubmissions: allSubmissions.length,
    }
  }, [allSubmissions])

  const loadPriorityList = useCallback(
    async (subjectId: string): Promise<string[]> => {
      const subject = getSubject(subjectId)
      if (!subject) return []
      const weaknessSummary = getWeaknessSummary(subjectId)
      const tags = weaknessSummary?.ranked_weaknesses.map((w) => w.tag) ?? []
      const subs = allSubmissions.filter((s) => s.subject_id === subjectId)
      const latestVerdict = subs[0]?.verdict ?? ''
      return generatePriorityList({ subjectLabel: subject.label, weaknessTags: tags, recentVerdict: latestVerdict })
    },
    [allSubmissions]
  )

  return { allSubmissions, loading, reload: load, getSubjectAnalytics, getGlobalStats, loadPriorityList }
}
