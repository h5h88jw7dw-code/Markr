import type { MarkingResult, ActionPlan, ExaminerNote, Annotation, AnnotationType } from '@/types'

// ─── XML tag extraction ────────────────────────────────────────────────────────

function extractTag(raw: string, tag: string): string {
  const regex = new RegExp(`<${tag}>[\\s\\S]*?<\\/${tag}>`, 'i')
  const match = raw.match(regex)
  if (!match) return ''
  return match[0].replace(new RegExp(`^<${tag}>`, 'i'), '').replace(new RegExp(`<\\/${tag}>$`, 'i'), '').trim()
}

// ─── Verdict parsing ──────────────────────────────────────────────────────────

function parseVerdict(verdictBlock: string): {
  mark_achieved: number
  mark_max: number
  band: string
  band_descriptor: string
  overall_summary: string
  band_push: string
} {
  const markLine = verdictBlock.match(/Mark:\s*(\d+)\s*\/\s*(\d+)/i)
  const mark_achieved = markLine ? parseInt(markLine[1], 10) : 0
  const mark_max = markLine ? parseInt(markLine[2], 10) : 0

  const bandLine = verdictBlock.match(/Band:\s*(.+)/i)
  const band = bandLine ? bandLine[1].trim() : ''

  const bandPushLine = verdictBlock.match(/BAND_PUSH:\s*(.+)/i)
  const band_push = bandPushLine ? bandPushLine[1].trim() : ''

  // Everything between the band line and BAND_PUSH line is the content
  let content = verdictBlock
    .replace(/Mark:\s*\d+\s*\/\s*\d+\s*/i, '')
    .replace(/Band:\s*.+\n?/i, '')
    .replace(/BAND_PUSH:\s*.+/i, '')
    .trim()

  // First line after Band is the band descriptor quote (in brackets or as-is)
  const lines = content.split('\n').filter((l) => l.trim())
  const band_descriptor = lines[0] || ''
  const overall_summary = lines.slice(1).join(' ').trim()

  return { mark_achieved, mark_max, band, band_descriptor, overall_summary, band_push }
}

// ─── Inline feedback parsing ──────────────────────────────────────────────────

const ANNOTATION_TAGS: AnnotationType[] = ['ao1', 'ao2', 'ao3', 'weakness', 'strength']

export function parseAnnotations(inlineBlock: string): Annotation[] {
  const annotations: Annotation[] = []
  const regex = /<(ao1|ao2|ao3|weakness|strength)\s+note="([^"]*)">([\s\S]*?)<\/\1>/gi
  let match
  while ((match = regex.exec(inlineBlock)) !== null) {
    annotations.push({
      type: match[1] as AnnotationType,
      note: match[2],
      text: match[3],
    })
  }
  return annotations
}

export function buildAnnotatedHTML(inlineBlock: string): string {
  let html = inlineBlock

  // AO1 — green highlight with AO1 badge
  html = html.replace(
    /<ao1\s+note="([^"]*)">([\s\S]*?)<\/ao1>/gi,
    '<span class="annotation-ao1" data-note="$1" title="AO1: $1">$2<span class="annotation-badge ao1-badge">AO1</span></span>'
  )

  // AO2 — blue highlight with AO2 badge
  html = html.replace(
    /<ao2\s+note="([^"]*)">([\s\S]*?)<\/ao2>/gi,
    '<span class="annotation-ao2" data-note="$1" title="AO2: $1">$2<span class="annotation-badge ao2-badge">AO2</span></span>'
  )

  // AO3 — purple highlight with AO3 badge
  html = html.replace(
    /<ao3\s+note="([^"]*)">([\s\S]*?)<\/ao3>/gi,
    '<span class="annotation-ao3" data-note="$1" title="AO3: $1">$2<span class="annotation-badge ao3-badge">AO3</span></span>'
  )

  // Weakness — red underline with tooltip
  html = html.replace(
    /<weakness\s+note="([^"]*)">([\s\S]*?)<\/weakness>/gi,
    '<span class="annotation-weakness" data-note="$1" title="$1">$2</span>'
  )

  // Strength — green left-border span
  html = html.replace(
    /<strength\s+note="([^"]*)">([\s\S]*?)<\/strength>/gi,
    '<span class="annotation-strength" data-note="$1" title="$1">$2</span>'
  )

  // Preserve newlines
  html = html.replace(/\n/g, '<br />')

  return html
}

// ─── Examiner notes parsing ───────────────────────────────────────────────────

export function parseExaminerNotes(notesBlock: string): ExaminerNote[] {
  if (!notesBlock || notesBlock.trim().toUpperCase() === 'NONE') return []

  const notes: ExaminerNote[] = []
  const lines = notesBlock.split('\n').filter((l) => l.trim())

  for (const line of lines) {
    const match = line.match(/ERROR:\s*(.+?)\s*\|\s*CORRECTION:\s*(.+)/i)
    if (match) {
      notes.push({ error: match[1].trim(), correction: match[2].trim() })
    }
  }

  return notes
}

// ─── Action plan parsing ──────────────────────────────────────────────────────

export function parseActionPlan(actionBlock: string): ActionPlan {
  const nextBandMatch = actionBlock.match(/NEXT_BAND:\s*([\s\S]*?)(?=TOP_BAND:|RECURRING:|$)/i)
  const topBandMatch = actionBlock.match(/TOP_BAND:\s*([\s\S]*?)(?=NEXT_BAND:|RECURRING:|$)/i)
  const recurringMatch = actionBlock.match(/RECURRING:\s*([\s\S]*?)(?=NEXT_BAND:|TOP_BAND:|$)/i)

  const parsePoints = (block: string | undefined): string[] => {
    if (!block) return []
    return block
      .split('\n')
      .map((l) => l.replace(/^[-•*]\s*/, '').trim())
      .filter((l) => l.length > 0)
  }

  return {
    next_band: parsePoints(nextBandMatch?.[1]),
    top_band: parsePoints(topBandMatch?.[1]),
    recurring: parsePoints(recurringMatch?.[1]),
  }
}

// ─── Weakness tag extraction ──────────────────────────────────────────────────

export function extractWeaknessTagsFromResponse(actionPlan: ActionPlan, examinerNotes: ExaminerNote[]): string[] {
  const tags: string[] = []

  const allText = [
    ...actionPlan.next_band,
    ...actionPlan.top_band,
    ...actionPlan.recurring,
    ...examinerNotes.map((n) => n.error),
  ].join(' ')

  // Extract key patterns
  const patterns: [RegExp, string][] = [
    [/three aspects/i, 'insufficient-aspects'],
    [/conclusion|justified/i, 'weak-conclusion'],
    [/counter.?argument/i, 'missing-counter-argument'],
    [/factual error|incorrect.*fact/i, 'factual-error'],
    [/named example|specific example/i, 'missing-named-example'],
    [/direct quotation|quote/i, 'missing-quotation'],
    [/diagram/i, 'diagram-issue'],
    [/definition|define/i, 'missing-definition'],
    [/real.?world/i, 'missing-real-world'],
    [/analysis|analytical/i, 'analysis-weakness'],
    [/technique|language.?level/i, 'language-level-weakness'],
    [/method mark|working/i, 'missing-working'],
    [/units/i, 'wrong-units'],
    [/command term/i, 'command-term-compliance'],
    [/evaluation|evaluate/i, 'evaluation-weakness'],
    [/provenance|origin.*purpose/i, 'provenance-analysis'],
    [/sustained argument/i, 'unsustained-argument'],
    [/narrative|descriptive|plot summary/i, 'excessive-narrative'],
    [/vocabulary|terminology/i, 'vocabulary-weakness'],
    [/structure|organisation/i, 'structure-weakness'],
    [/uncertainty|error bar/i, 'missing-uncertainty'],
  ]

  for (const [pattern, tag] of patterns) {
    if (pattern.test(allText) && !tags.includes(tag)) {
      tags.push(tag)
    }
  }

  return tags
}

// ─── Full response parser ─────────────────────────────────────────────────────

export function parseMarkingResponse(raw: string): MarkingResult {
  const verdictBlock = extractTag(raw, 'verdict')
  const inlineFeedbackBlock = extractTag(raw, 'inline_feedback')
  const examinerNotesBlock = extractTag(raw, 'examiner_notes')
  const actionPlanBlock = extractTag(raw, 'action_plan')

  const verdictData = parseVerdict(verdictBlock)
  const annotations = parseAnnotations(inlineFeedbackBlock)
  const inline_feedback_html = buildAnnotatedHTML(inlineFeedbackBlock)
  const examiner_notes = parseExaminerNotes(examinerNotesBlock)
  const action_plan = parseActionPlan(actionPlanBlock)
  const weakness_tags = extractWeaknessTagsFromResponse(action_plan, examiner_notes)

  return {
    ...verdictData,
    inline_feedback_raw: inlineFeedbackBlock,
    inline_feedback_html,
    annotations,
    examiner_notes,
    action_plan,
    weakness_tags,
  }
}

// ─── PDF text extraction ──────────────────────────────────────────────────────

export async function extractTextFromPDF(file: File): Promise<string> {
  // Dynamically import pdfjs-dist to avoid issues with worker
  const pdfjsLib = await import('pdfjs-dist')
  pdfjsLib.GlobalWorkerOptions.workerSrc = new URL(
    'pdfjs-dist/build/pdf.worker.min.mjs',
    import.meta.url
  ).toString()

  const arrayBuffer = await file.arrayBuffer()
  const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise
  const textParts: string[] = []

  for (let i = 1; i <= pdf.numPages; i++) {
    const page = await pdf.getPage(i)
    const content = await page.getTextContent()
    const pageText = content.items
      .map((item) => ('str' in item ? item.str : ''))
      .join(' ')
    textParts.push(pageText)
  }

  return textParts.join('\n\n')
}

export async function extractTextFromFile(file: File): Promise<string> {
  if (file.type === 'application/pdf' || file.name.endsWith('.pdf')) {
    return extractTextFromPDF(file)
  }
  // Plain text
  return file.text()
}

// ─── Unused import guard ──────────────────────────────────────────────────────

void ANNOTATION_TAGS
