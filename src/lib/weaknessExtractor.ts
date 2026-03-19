import type { Submission, WeaknessEntry } from '@/types'
import {
  getSubmissions,
  getWeaknessSummary,
  upsertWeaknessSummary,
  getSubmissionCountSince,
} from './storage'

// ─── Rebuild weakness summary ─────────────────────────────────────────────────

export function rebuildWeaknessSummary(
  subjectId: string,
  track: string
): void {
  const submissions = getSubmissions({ subjectId })
  if (submissions.length === 0) return

  const tagCounts: Record<string, { count: number; last_seen: string; descriptions: string[] }> = {}

  for (const sub of submissions) {
    const date = sub.created_at
    for (const tag of sub.weakness_tags ?? []) {
      if (!tagCounts[tag]) {
        tagCounts[tag] = { count: 0, last_seen: date, descriptions: [] }
      }
      tagCounts[tag].count++
      if (date > tagCounts[tag].last_seen) tagCounts[tag].last_seen = date

      // Collect description context from action plans
      const allPoints = [
        ...(sub.action_plan?.next_band ?? []),
        ...(sub.action_plan?.top_band ?? []),
        ...(sub.action_plan?.recurring ?? []),
      ]
      const relevantPoint = allPoints.find((p) =>
        p.toLowerCase().includes(tag.replace(/-/g, ' ').substring(0, 8))
      )
      if (relevantPoint && !tagCounts[tag].descriptions.includes(relevantPoint)) {
        tagCounts[tag].descriptions.push(relevantPoint)
      }
    }
  }

  const ranked: WeaknessEntry[] = Object.entries(tagCounts)
    .map(([tag, data]) => ({
      tag,
      count: data.count,
      last_seen: data.last_seen,
      description: data.descriptions[0] ?? humaniseTag(tag),
    }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 10)

  upsertWeaknessSummary(subjectId, track, ranked)
}

// ─── Trigger check (every 3 submissions) ──────────────────────────────────────

export function maybeUpdateWeaknesses(
  subjectId: string,
  track: string
): void {
  const existing = getWeaknessSummary(subjectId)
  const since = existing?.last_updated ?? new Date(0).toISOString()

  const newCount = getSubmissionCountSince(subjectId, since)

  if (newCount >= 3 || !existing) {
    rebuildWeaknessSummary(subjectId, track)
  }
}

// ─── Summarise last N submissions for prompt ───────────────────────────────────

export function summarisePastSubmissions(submissions: Submission[]): string {
  if (submissions.length === 0) return ''

  return submissions
    .map((sub, i) => {
      const date = new Date(sub.created_at).toLocaleDateString('en-GB', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
      })
      const lines = [`Submission ${i + 1} (${date}): ${sub.mark_achieved}/${sub.mark_max} — ${sub.band}`]
      if (sub.weakness_tags.length > 0) {
        lines.push(`  Tags: ${sub.weakness_tags.join(', ')}`)
      }
      const recurring = sub.action_plan?.recurring ?? []
      if (recurring.length > 0) {
        lines.push(`  Recurring: ${recurring.join('; ')}`)
      }
      return lines.join('\n')
    })
    .join('\n\n')
}

// ─── Tag humaniser ────────────────────────────────────────────────────────────

function humaniseTag(tag: string): string {
  const map: Record<string, string> = {
    'insufficient-aspects': 'Does not address three distinct aspects',
    'weak-conclusion': 'Conclusion not justified — asserts rather than weighs',
    'missing-counter-argument': 'Counter-argument absent or not integrated',
    'factual-error': 'Factual errors identified in response',
    'missing-named-example': 'Real-world example not named with country and year',
    'missing-quotation': 'No direct quotation from source material',
    'diagram-issue': 'Diagram missing, incomplete, or incorrectly labelled',
    'missing-definition': 'Key terms not defined at the start',
    'missing-real-world': 'Real-world named example absent',
    'analysis-weakness': 'Analysis underdeveloped — descriptive rather than analytical',
    'language-level-weakness': 'Language-level analysis absent (connotation, syntax, sound)',
    'missing-working': 'Working not shown — method marks at risk',
    'wrong-units': 'Units incorrect or missing in numerical answers',
    'command-term-compliance': 'Command term not fully addressed',
    'evaluation-weakness': 'Evaluation one-sided or conclusion not justified',
    'provenance-analysis': 'Source provenance analysis vague or generic',
    'unsustained-argument': 'Argument not sustained throughout — drifts into narrative',
    'excessive-narrative': 'Excessive narrative or plot summary',
    'vocabulary-weakness': 'Vocabulary imprecise or lacks subject-specific terminology',
    'structure-weakness': 'Organisation weak — no clear developing argument',
    'missing-uncertainty': 'Uncertainty or error analysis absent in practical work',
  }
  return map[tag] ?? tag.replace(/-/g, ' ')
}
