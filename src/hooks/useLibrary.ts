import { useState, useEffect, useCallback } from 'react'
import type { Submission, LibraryFilter, CompareResult } from '@/types'
import { getSubmissions, getSubmission } from '@/lib/storage'
import { compareSubmissionsCall } from '@/lib/anthropic'
import { getSubject } from '@/lib/constants'

export function useLibrary() {
  const [submissions, setSubmissions] = useState<Submission[]>([])
  const [loading, setLoading] = useState(false)
  const [filter, setFilter] = useState<LibraryFilter>({})

  const load = useCallback(() => {
    setLoading(true)
    const data = getSubmissions()
    setSubmissions(data)
    setLoading(false)
  }, [])

  useEffect(() => {
    load()
  }, [load])

  const filtered = submissions.filter((sub) => {
    if (filter.track && sub.track !== filter.track) return false
    if (filter.subjectIds?.length && !filter.subjectIds.includes(sub.subject_id)) return false
    if (filter.questionType && sub.question_type !== filter.questionType) return false
    if (filter.band && sub.band !== filter.band) return false
    if (filter.dateFrom && sub.created_at < filter.dateFrom) return false
    if (filter.dateTo && sub.created_at > filter.dateTo) return false
    return true
  })

  const compare = useCallback(async (idA: string, idB: string): Promise<CompareResult | null> => {
    const a = getSubmission(idA)
    const b = getSubmission(idB)
    if (!a || !b) return null

    const subjectLabel = getSubject(a.subject_id)?.label ?? a.subject_id

    const raw = await compareSubmissionsCall({
      subjectLabel,
      submissionA: {
        date: new Date(a.created_at).toLocaleDateString('en-GB'),
        mark: `${a.mark_achieved}/${a.mark_max}`,
        band: a.band,
        verdict: a.verdict,
        actionPlan: [...(a.action_plan?.next_band ?? []), ...(a.action_plan?.recurring ?? [])].join('; '),
      },
      submissionB: {
        date: new Date(b.created_at).toLocaleDateString('en-GB'),
        mark: `${b.mark_achieved}/${b.mark_max}`,
        band: b.band,
        verdict: b.verdict,
        actionPlan: [...(b.action_plan?.next_band ?? []), ...(b.action_plan?.recurring ?? [])].join('; '),
      },
    })

    return parseCompareResult(raw)
  }, [])

  return { submissions: filtered, allSubmissions: submissions, loading, filter, setFilter, reload: load, compare }
}

function parseCompareResult(raw: string): CompareResult {
  const block = raw.match(/<comparison>([\s\S]*?)<\/comparison>/i)?.[1] ?? raw

  const parseSection = (name: string): string[] => {
    const match = block.match(new RegExp(`${name}:\\s*([\\s\\S]*?)(?=IMPROVED:|REGRESSED:|UNCHANGED:|$)`, 'i'))
    if (!match) return []
    return match[1]
      .split('\n')
      .map((l) => l.replace(/^[-•*]\s*/, '').trim())
      .filter((l) => l.length > 0 && l.toLowerCase() !== 'none identified.')
  }

  return {
    improved: parseSection('IMPROVED'),
    regressed: parseSection('REGRESSED'),
    unchanged: parseSection('UNCHANGED'),
  }
}
