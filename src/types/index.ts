// ─── Core Enums ────────────────────────────────────────────────────────────────

export type Track = 'gcse' | 'ib'

export type Band = 'Level 1' | 'Level 2' | 'Level 3' | 'Level 4' | 'Band 1' | 'Band 2' | 'Band 3' | 'Band 4' | 'Band 5' | string

// ─── Profile ───────────────────────────────────────────────────────────────────

export interface Profile {
  name: string
  exam_year: number
  gcse_subjects: string[]
  ib_subjects: string[]
  dark_mode?: boolean
}

// ─── Subject ───────────────────────────────────────────────────────────────────

export interface Subject {
  id: string
  label: string
  board: string
  track: Track
  shortLabel?: string
}

// ─── Question Type ─────────────────────────────────────────────────────────────

export interface QuestionType {
  id: string
  label: string
  subjectId: string
  markMax: number
  descriptor: string  // shown as descriptor card in Step 1
}

// ─── Submission Metadata ───────────────────────────────────────────────────────

export interface SubmissionMetadata {
  timed: boolean
  duration_mins?: number
  paper?: string
  notes?: string
}

// ─── Action Plan ───────────────────────────────────────────────────────────────

export interface ActionPlan {
  next_band: string[]
  top_band: string[]
  recurring: string[]
}

// ─── Examiner Note ─────────────────────────────────────────────────────────────

export interface ExaminerNote {
  error: string
  correction: string
}

// ─── Inline Annotation ─────────────────────────────────────────────────────────

export type AnnotationType = 'ao1' | 'ao2' | 'ao3' | 'weakness' | 'strength'

export interface Annotation {
  type: AnnotationType
  text: string
  note: string
}

// ─── Marking Result ────────────────────────────────────────────────────────────

export interface MarkingResult {
  mark_achieved: number
  mark_max: number
  band: string
  band_descriptor: string
  overall_summary: string
  band_push: string              // single sentence: what would have pushed it one band higher
  inline_feedback_raw: string    // raw XML string from API
  inline_feedback_html: string   // converted to annotated HTML
  annotations: Annotation[]
  examiner_notes: ExaminerNote[]
  action_plan: ActionPlan
  weakness_tags: string[]
}

// ─── Submission ─────────────────────────────────────────────────────────────────

export interface Submission {
  id: string
  track: Track
  subject_id: string
  subject_label: string
  question_type: string
  question: string
  mark_scheme?: string
  context_files?: string
  student_response: string
  word_count: number
  mark_achieved: number
  mark_max: number
  band: string
  verdict: string
  inline_feedback: string
  examiner_notes: string         // JSON string of ExaminerNote[]
  action_plan: ActionPlan
  weakness_tags: string[]
  metadata: SubmissionMetadata
  created_at: string
}

export type NewSubmission = Omit<Submission, 'id' | 'created_at'>

// ─── Weakness Entry ────────────────────────────────────────────────────────────

export interface WeaknessEntry {
  tag: string
  count: number
  last_seen: string
  description: string
}

// ─── Weakness Summary ──────────────────────────────────────────────────────────

export interface WeaknessSummary {
  id: string
  user_id: string   // kept as 'local' for localStorage compat
  track: Track
  subject_id: string
  ranked_weaknesses: WeaknessEntry[]
  last_updated: string
}

// ─── Streaming ─────────────────────────────────────────────────────────────────

export type StreamingStatus =
  | 'idle'
  | 'reading'
  | 'assessing'
  | 'applying'
  | 'checking'
  | 'writing'
  | 'generating'
  | 'complete'
  | 'error'

export interface StreamingState {
  status: StreamingStatus
  statusMessage: string
  progress: number          // 0–100
  rawResponse: string
  error?: string
}

// ─── Marking Form State ────────────────────────────────────────────────────────

export interface MarkingFormState {
  track: Track
  subjectId: string
  questionTypeId: string
  question: string
  markScheme: string
  contextFiles: string
  studentResponse: string
  metadata: SubmissionMetadata
}

// ─── Compare ───────────────────────────────────────────────────────────────────

export interface CompareResult {
  improved: string[]
  regressed: string[]
  unchanged: string[]
}

// ─── Analytics ─────────────────────────────────────────────────────────────────

export interface SubjectAnalytics {
  subjectId: string
  subjectLabel: string
  track: Track
  submissions: Submission[]
  averagePercent: number
  lastSubmission?: string
  daysSinceLast?: number
  totalSubmissions: number
  bandDistribution: Record<string, number>
  weaknesses: WeaknessEntry[]
  questionTypeCoverage: Record<string, number>
  priorityList?: string[]
}

// ─── Library Filter ────────────────────────────────────────────────────────────

export interface LibraryFilter {
  track?: Track
  subjectIds?: string[]
  questionType?: string
  dateFrom?: string
  dateTo?: string
  band?: string
}

// ─── Question Log ──────────────────────────────────────────────────────────────

export interface QuestionLogEntry {
  id: string
  subject_id: string
  question_type: string
  question_snippet: string
  submission_id: string
  created_at: string
}
