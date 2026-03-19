import Anthropic from '@anthropic-ai/sdk'
import type { Submission } from '@/types'
import { buildRubricSystemPrompt } from './rubrics'
import { getSubject, getQuestionType } from './constants'

const MODEL = 'claude-sonnet-4-6'
const MAX_TOKENS = 8000

// ─── Client factory ───────────────────────────────────────────────────────────

export function getAnthropicClient(): Anthropic {
  const apiKey = localStorage.getItem('anthropic_api_key')
  if (!apiKey) throw new Error('No Anthropic API key found. Please add your API key in Settings.')
  return new Anthropic({ apiKey, dangerouslyAllowBrowser: true })
}

// ─── Retry wrapper ────────────────────────────────────────────────────────────

async function withRetry<T>(fn: () => Promise<T>, attempts = 3): Promise<T> {
  let lastError: Error = new Error('Unknown error')
  for (let i = 0; i < attempts; i++) {
    try {
      return await fn()
    } catch (err) {
      lastError = err instanceof Error ? err : new Error(String(err))
      if (i < attempts - 1) {
        await sleep(500 * Math.pow(2, i))
      }
    }
  }
  throw lastError
}

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

// ─── System prompt builder ────────────────────────────────────────────────────

export function buildMarkingSystemPrompt(params: {
  subjectId: string
  questionTypeId: string
  pastWeaknesses?: string
}): string {
  const subject = getSubject(params.subjectId)
  const questionType = getQuestionType(params.questionTypeId)
  const rubricSection = buildRubricSystemPrompt(params.subjectId, params.questionTypeId)

  const lines = [
    '=== EXAMINER IDENTITY ===',
    `You are an experienced examiner for ${subject?.label ?? params.subjectId} (${subject?.board ?? ''}).`,
    'You are stricter than the average examiner, calibrated to the upper end of the marking team.',
    'You do not give the benefit of the doubt on vague claims — you treat ambiguous statements as the weaker interpretation.',
    'You do not reward length. A shorter, precise answer outscores a longer, vague one.',
    'You reward precision: named example beats generic, specific date beats decade, direct quotation beats paraphrase.',
    '',
    '=== MARKING PHILOSOPHY ===',
    '1. Never give benefit of the doubt on ambiguous or vague claims.',
    '2. Factual errors are flagged in Examiner Notes but do not directly reduce the mark.',
    '3. Reward precision at every level.',
    '4. Action plan must be specific to what was written — "revise the topic" is not acceptable feedback.',
    '5. The verdict must end with one sentence: the single thing that would have pushed this answer up one band.',
    '6. Apply all hard rules and caps from the mark scheme absolutely — no exceptions.',
    '',
    rubricSection,
  ]

  if (params.pastWeaknesses) {
    lines.push('')
    lines.push('=== STUDENT\'S RECURRING WEAKNESSES (from prior submissions in this subject) ===')
    lines.push(params.pastWeaknesses)
    lines.push('Cross-reference these patterns with the current submission. If a recurring pattern appears, name it explicitly in the Action Plan RECURRING section.')
  }

  lines.push('')
  lines.push('=== OUTPUT FORMAT ===')
  lines.push('You must respond using exactly these XML tags. Do not add any text outside them:')
  lines.push('')
  lines.push(`<verdict>
Mark: X/Y
Band: [exact band name]
[Band descriptor — one sentence from the mark scheme describing this band]
[One paragraph overall assessment in strict examiner voice — not encouraging, not harsh, precisely accurate]
BAND_PUSH: [One specific sentence stating what would have pushed this answer one band higher]
</verdict>

<inline_feedback>
[Reproduce the student's full response with inline XML annotations:
<ao1 note="comment">text</ao1>  — for AO1 knowledge points (highlight green)
<ao2 note="comment">text</ao2>  — for AO2 analytical points (highlight blue)
<ao3 note="comment">text</ao3>  — for AO3 points where applicable (highlight purple)
<weakness note="comment">text</weakness>  — for specific weaknesses (underline red)
<strength note="comment">text</strength>  — for strengths (green left border)
Not every word needs annotation — only annotate where there is something specific to say.]
</inline_feedback>

<examiner_notes>
[Format each factual error as: ERROR: [what the student said] | CORRECTION: [accurate information]
If no factual errors: write NONE]
</examiner_notes>

<action_plan>
NEXT_BAND:
- [specific point 1]
- [specific point 2]
- [specific point 3, if needed]

TOP_BAND:
- [specific point 1]
- [specific point 2]
- [specific point 3, if needed]

RECURRING:
[If past weaknesses match: name the pattern explicitly. If this is the first submission: state "No submission history yet in this subject — recurring patterns will appear after your second submission."]
</action_plan>`)

  return lines.join('\n')
}

// ─── Past weaknesses formatter ────────────────────────────────────────────────

export function formatPastWeaknessesForPrompt(pastSubmissions: Submission[]): string {
  if (pastSubmissions.length === 0) return ''

  const lines: string[] = []
  for (const sub of pastSubmissions) {
    const date = new Date(sub.created_at).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })
    lines.push(`Submission ${date}: ${sub.mark_achieved}/${sub.mark_max} (${sub.band})`)
    if (sub.weakness_tags.length > 0) {
      lines.push(`  Weakness tags: ${sub.weakness_tags.join(', ')}`)
    }
    if (sub.action_plan?.recurring?.length > 0) {
      lines.push(`  Recurring issues: ${sub.action_plan.recurring.join(' | ')}`)
    }
  }
  return lines.join('\n')
}

// ─── Streaming marking call ───────────────────────────────────────────────────

export interface MarkingCallParams {
  subjectId: string
  questionTypeId: string
  question: string
  markScheme?: string
  contextFiles?: string
  studentResponse: string
  metadata?: {
    timed?: boolean
    duration_mins?: number
    paper?: string
    notes?: string
  }
  pastSubmissions?: Submission[]
  onChunk: (chunk: string) => void
}

export async function streamMarkingCall(params: MarkingCallParams): Promise<string> {
  const client = getAnthropicClient()
  const questionType = getQuestionType(params.questionTypeId)

  const pastWeaknessesText = params.pastSubmissions
    ? formatPastWeaknessesForPrompt(params.pastSubmissions)
    : ''

  const systemPrompt = buildMarkingSystemPrompt({
    subjectId: params.subjectId,
    questionTypeId: params.questionTypeId,
    pastWeaknesses: pastWeaknessesText || undefined,
  })

  const userParts = [
    `QUESTION TYPE: ${questionType?.label ?? params.questionTypeId}`,
    `MAXIMUM MARKS: ${questionType?.markMax ?? 'Unknown'}`,
    '',
    `QUESTION:\n${params.question}`,
  ]

  if (params.markScheme) {
    userParts.push('', `MARK SCHEME PROVIDED:\n${params.markScheme}`)
  } else {
    userParts.push('', 'MARK SCHEME: Using built-in rubric for this question type.')
  }

  if (params.contextFiles) {
    userParts.push('', `SOURCE / STIMULUS / EXTRACT:\n${params.contextFiles}`)
  }

  userParts.push('', `STUDENT RESPONSE:\n${params.studentResponse}`)

  if (params.metadata) {
    const meta = params.metadata
    const metaParts = []
    if (meta.timed) metaParts.push(`Timed: yes (${meta.duration_mins ?? '?'} minutes)`)
    else metaParts.push('Timed: no')
    if (meta.paper) metaParts.push(`Paper: ${meta.paper}`)
    if (meta.notes) metaParts.push(`Notes: ${meta.notes}`)
    if (metaParts.length > 0) userParts.push('', `METADATA: ${metaParts.join(' | ')}`)
  }

  const userMessage = userParts.join('\n')

  return withRetry(async () => {
    let fullResponse = ''

    const stream = client.messages.stream({
      model: MODEL,
      max_tokens: MAX_TOKENS,
      system: systemPrompt,
      messages: [{ role: 'user', content: userMessage }],
    })

    for await (const event of stream) {
      if (
        event.type === 'content_block_delta' &&
        event.delta.type === 'text_delta'
      ) {
        const chunk = event.delta.text
        fullResponse += chunk
        params.onChunk(chunk)
      }
    }

    return fullResponse
  })
}

// ─── Compare submissions call ─────────────────────────────────────────────────

export interface CompareCallParams {
  subjectLabel: string
  submissionA: {
    date: string
    mark: string
    band: string
    verdict: string
    actionPlan: string
  }
  submissionB: {
    date: string
    mark: string
    band: string
    verdict: string
    actionPlan: string
  }
}

export async function compareSubmissionsCall(params: CompareCallParams): Promise<string> {
  const client = getAnthropicClient()

  const systemPrompt = `You are an experienced ${params.subjectLabel} examiner reviewing a student's progress between two submissions. You are precise, specific, and write in examiner voice. You do not offer generic encouragement.`

  const userMessage = `Compare these two marking outcomes and identify what has concretely changed.

SUBMISSION A (${params.submissionA.date}):
Mark: ${params.submissionA.mark} | Band: ${params.submissionA.band}
Verdict: ${params.submissionA.verdict}
Action plan issues: ${params.submissionA.actionPlan}

SUBMISSION B (${params.submissionB.date}):
Mark: ${params.submissionB.mark} | Band: ${params.submissionB.band}
Verdict: ${params.submissionB.verdict}
Action plan issues: ${params.submissionB.actionPlan}

Output in this exact format:

<comparison>
IMPROVED:
- [specific improvement 1]
- [specific improvement 2]

REGRESSED:
- [specific regression 1 if any, else: None identified]

UNCHANGED:
- [specific pattern still present 1]
- [specific pattern still present 2]
</comparison>`

  return withRetry(async () => {
    const response = await client.messages.create({
      model: MODEL,
      max_tokens: 1500,
      system: systemPrompt,
      messages: [{ role: 'user', content: userMessage }],
    })
    const block = response.content[0]
    return block.type === 'text' ? block.text : ''
  })
}

// ─── Priority revision list ───────────────────────────────────────────────────

export async function generatePriorityList(params: {
  subjectLabel: string
  weaknessTags: string[]
  recentVerdict: string
}): Promise<string[]> {
  const client = getAnthropicClient()

  const userMessage = `Subject: ${params.subjectLabel}
Identified weakness tags: ${params.weaknessTags.join(', ')}
Recent examiner verdict: ${params.recentVerdict}

Generate exactly 5 specific revision priorities for this student. Each priority must:
1. Be specific to the subject and exam board
2. Reference an actual weakness from the data above
3. Include a concrete action (not "revise X" — say how)
4. Be written in the second person ("You should...")

Output as a JSON array of 5 strings only. No other text.`

  return withRetry(async () => {
    const response = await client.messages.create({
      model: MODEL,
      max_tokens: 800,
      messages: [{ role: 'user', content: userMessage }],
    })
    const block = response.content[0]
    if (block.type !== 'text') return []
    try {
      const parsed = JSON.parse(block.text)
      return Array.isArray(parsed) ? parsed : []
    } catch {
      return []
    }
  })
}
