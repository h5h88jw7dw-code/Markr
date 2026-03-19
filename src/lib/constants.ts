import type { Subject, QuestionType } from '@/types'

// ─── Subjects ──────────────────────────────────────────────────────────────────

export const GCSE_SUBJECTS: Subject[] = [
  { id: 'history_edexcel', label: 'History', board: 'Edexcel IGCSE', track: 'gcse', shortLabel: 'History' },
  { id: 'classciv_ocr', label: 'Classical Civilisation', board: 'OCR GCSE', track: 'gcse', shortLabel: 'Class Civ' },
  { id: 'englang_eduqas', label: 'English Language', board: 'Eduqas GCSE', track: 'gcse', shortLabel: 'Eng Lang' },
  { id: 'englit_cambridge', label: 'English Literature', board: 'Cambridge IGCSE', track: 'gcse', shortLabel: 'Eng Lit' },
  { id: 'spanish_cambridge', label: 'Spanish', board: 'Cambridge IGCSE', track: 'gcse', shortLabel: 'Spanish' },
  { id: 'maths_edexcel', label: 'Maths', board: 'Edexcel IGCSE A Higher', track: 'gcse', shortLabel: 'Maths' },
  { id: 'chemistry_edexcel', label: 'Chemistry', board: 'Edexcel IGCSE', track: 'gcse', shortLabel: 'Chemistry' },
  { id: 'biology_edexcel', label: 'Biology', board: 'Edexcel IGCSE', track: 'gcse', shortLabel: 'Biology' },
  { id: 'physics_edexcel', label: 'Physics', board: 'Edexcel IGCSE', track: 'gcse', shortLabel: 'Physics' },
  { id: 'geography_edexcel', label: 'Geography', board: 'Edexcel IGCSE', track: 'gcse', shortLabel: 'Geography' },
]

export const IB_SUBJECTS: Subject[] = [
  { id: 'history_hl', label: 'History HL', board: 'IB Diploma', track: 'ib', shortLabel: 'History HL' },
  { id: 'physics_hl', label: 'Physics HL', board: 'IB Diploma', track: 'ib', shortLabel: 'Physics HL' },
  { id: 'maths_aa_hl', label: 'Maths AA HL', board: 'IB Diploma', track: 'ib', shortLabel: 'Maths AA HL' },
  { id: 'englit_sl', label: 'English Literature SL', board: 'IB Diploma', track: 'ib', shortLabel: 'Eng Lit SL' },
  { id: 'hindi_b_sl', label: 'Hindi B SL', board: 'IB Diploma', track: 'ib', shortLabel: 'Hindi B SL' },
  { id: 'econ_hl', label: 'Economics HL', board: 'IB Diploma', track: 'ib', shortLabel: 'Economics HL' },
]

export const ALL_SUBJECTS = [...GCSE_SUBJECTS, ...IB_SUBJECTS]

export function getSubject(id: string): Subject | undefined {
  return ALL_SUBJECTS.find((s) => s.id === id)
}

// ─── Question Types ────────────────────────────────────────────────────────────

export const QUESTION_TYPES: QuestionType[] = [
  // HISTORY EDEXCEL
  {
    id: 'history_edexcel_4mark',
    subjectId: 'history_edexcel',
    label: '4-mark Describe',
    markMax: 4,
    descriptor:
      '4-mark Describe (Edexcel IGCSE History) — 1 mark per developed point. Two well-developed points needed for full marks. Generic statements score 0. No analysis required; clear factual identification with development is sufficient.',
  },
  {
    id: 'history_edexcel_6mark',
    subjectId: 'history_edexcel',
    label: '6-mark Explain Why',
    markMax: 6,
    descriptor:
      '6-mark Explain Why (Edexcel IGCSE History) — L1 (1–2): simple, generalised causes. L2 (3–4): one explained cause with development. L3 (5–6): two well-explained causes with clear causal links between them.',
  },
  {
    id: 'history_edexcel_16mark',
    subjectId: 'history_edexcel',
    label: '16-mark How Far Do You Agree Essay',
    markMax: 16,
    descriptor:
      '16-mark How Far Do You Agree (Edexcel IGCSE History) — Requires three distinct aspects to access Level 4. Hard cap at Level 3 (max 12) if fewer than three aspects addressed. Must include sustained analytical argument and a justified conclusion, not a summary. Both sides must be addressed.',
  },
  {
    id: 'history_edexcel_source',
    subjectId: 'history_edexcel',
    label: 'Source Question',
    markMax: 8,
    descriptor:
      'Source Question (Edexcel IGCSE History) — Direct quotation from the named extract is mandatory for secure Level 4. Paraphrase alone cannot achieve top marks. Must address content, provenance, and utility explicitly.',
  },

  // CLASSICAL CIVILISATION OCR
  {
    id: 'classciv_ocr_short',
    subjectId: 'classciv_ocr',
    label: 'Short Answer (AO1)',
    markMax: 5,
    descriptor:
      'Short Answer AO1 (OCR Classical Civilisation) — Named primary source or archaeological reference required for top marks. Generic knowledge without named evidence is capped at L1.',
  },
  {
    id: 'classciv_ocr_source',
    subjectId: 'classciv_ocr',
    label: 'Source Utility',
    markMax: 10,
    descriptor:
      'Source Utility (OCR Classical Civilisation) — Must address content, origin, purpose, and limitation. A generic "bias" comment without specificity is Level 1. Every point must be anchored to the specific source.',
  },
  {
    id: 'classciv_ocr_essay',
    subjectId: 'classciv_ocr',
    label: 'Extended Essay (AO1 + AO2)',
    markMax: 20,
    descriptor:
      'Extended Essay (OCR Classical Civilisation) — AO1 (knowledge) and AO2 (analysis/evaluation) marked separately. "The Greeks believed" without a named source = L1 ceiling. Direct engagement with set texts and named artefacts required throughout.',
  },

  // ENGLISH LANGUAGE EDUQAS
  {
    id: 'englang_eduqas_reading',
    subjectId: 'englang_eduqas',
    label: 'Reading Question',
    markMax: 15,
    descriptor:
      'Reading (Eduqas GCSE English Language) — Lower marks: retrieval. Upper marks require named technique + embedded evidence + effect on reader + wider meaning. Vague effect comments without language-level analysis cannot access the top band.',
  },
  {
    id: 'englang_eduqas_writing',
    subjectId: 'englang_eduqas',
    label: 'Writing Task (AO5 + AO6)',
    markMax: 40,
    descriptor:
      'Writing (Eduqas GCSE English Language) — AO5 (communication, organisation) and AO6 (vocabulary, grammar, punctuation) marked separately. Top band requires sophisticated structural choices (withholding, non-linear, deliberate bathos/anaphora). Technically correct but generic writing caps at mid-band.',
  },

  // ENGLISH LITERATURE CAMBRIDGE
  {
    id: 'englit_cambridge_extract',
    subjectId: 'englit_cambridge',
    label: 'How Does the Writer Present X',
    markMax: 15,
    descriptor:
      'How Does the Writer Present X (Cambridge IGCSE English Literature) — Method: technique → embedded quotation → language-level analysis (connotation, sound, syntax) → effect on reader → link to theme/wider meaning. Plot summary = Level 1 regardless of length. Quotation without analysis = Level 2 ceiling.',
  },
  {
    id: 'englit_cambridge_essay',
    subjectId: 'englit_cambridge',
    label: 'Extended Essay',
    markMax: 25,
    descriptor:
      'Extended Essay (Cambridge IGCSE English Literature) — Top band requires sustained personal response, convincing interpretation, and well-selected evidence throughout. Must demonstrate independent critical thinking, not summary of plot.',
  },

  // MATHS EDEXCEL
  {
    id: 'maths_edexcel_problem',
    subjectId: 'maths_edexcel',
    label: 'Problem-Solving Question',
    markMax: 5,
    descriptor:
      'Problem-Solving (Edexcel IGCSE Maths A Higher) — Method marks (M) awarded independently of accuracy marks (A). Award M even if arithmetic error leads to wrong final answer. Show all working. Correct equation/formula setup scores method marks.',
  },
  {
    id: 'maths_edexcel_showtthat',
    subjectId: 'maths_edexcel',
    label: '"Show That" Question',
    markMax: 4,
    descriptor:
      '"Show That" (Edexcel IGCSE Maths A Higher) — Full rigorous working mandatory. Answer is given so no marks for stating it without method. Every algebraic step must be shown explicitly.',
  },

  // CHEMISTRY / BIOLOGY / PHYSICS EDEXCEL
  {
    id: 'chemistry_edexcel_6mark',
    subjectId: 'chemistry_edexcel',
    label: '6-mark Extended Writing',
    markMax: 6,
    descriptor:
      '6-mark Extended Writing (Edexcel IGCSE Chemistry) — 1 mark per correct scientific statement up to 6. Must be continuous prose with correct scientific terminology. Required practical questions: describe exact procedure, name equipment, explain how validity is ensured.',
  },
  {
    id: 'biology_edexcel_6mark',
    subjectId: 'biology_edexcel',
    label: '6-mark Extended Writing',
    markMax: 6,
    descriptor:
      '6-mark Extended Writing (Edexcel IGCSE Biology) — 1 mark per correct scientific statement up to 6. Continuous prose required. Mathematical questions: show all working for method marks even if final answer wrong.',
  },
  {
    id: 'physics_edexcel_6mark',
    subjectId: 'physics_edexcel',
    label: '6-mark Extended Writing',
    markMax: 6,
    descriptor:
      '6-mark Extended Writing (Edexcel IGCSE Physics) — 1 mark per correct scientific statement up to 6. Continuous prose required. Required practical questions: name equipment and explain how validity is ensured.',
  },
  {
    id: 'physics_edexcel_calc',
    subjectId: 'physics_edexcel',
    label: 'Calculation Question',
    markMax: 4,
    descriptor:
      'Calculation (Edexcel IGCSE Physics) — Method marks awarded independently. Show all workings including formula selection and substitution. Units must be correct for accuracy marks.',
  },

  // GEOGRAPHY EDEXCEL
  {
    id: 'geography_edexcel_casestudy',
    subjectId: 'geography_edexcel',
    label: 'Case Study / Extended Answer',
    markMax: 8,
    descriptor:
      'Case Study / Extended Answer (Edexcel IGCSE Geography) — Named location + specific data/statistics required for top band. "A city in a developing country" = Level 2 ceiling. Case study location must be named. Command term compliance: explain = cause-effect chain; assess = weigh factors; evaluate = justified conclusion with evidence.',
  },

  // ECONOMICS HL
  {
    id: 'econ_hl_paper1a',
    subjectId: 'econ_hl',
    label: 'Paper 1A (10 marks)',
    markMax: 10,
    descriptor:
      'Paper 1A (IB Economics HL, 10 marks) — Opening definition of key terms mandatory. Fully labelled diagram required: title + axis labels + all curves labelled + shifts shown with arrows. Theoretical explanation linked directly to diagram. Evaluation not required for Part A. Markbands: 1–4 descriptive/diagram absent; 5–7 explanation present, diagram incomplete; 8–10 full theory + accurate labelled diagram.',
  },
  {
    id: 'econ_hl_paper1b',
    subjectId: 'econ_hl',
    label: 'Paper 1B (15 marks)',
    markMax: 15,
    descriptor:
      'Paper 1B (IB Economics HL, 15 marks) — All Paper 1A requirements plus: genuine two-sided evaluation, named real-world example (country + approximate year — "a European country" scores 0 for application), and justified conclusion that weighs arguments rather than summarising them. Markbands: 11–13 both-sides evaluation, real world present, conclusion not fully justified; 14–15 precise diagram, strong named real world, balanced evaluation, well-reasoned conclusion.',
  },
  {
    id: 'econ_hl_paper2',
    subjectId: 'econ_hl',
    label: 'Paper 2 (Data Response)',
    markMax: 15,
    descriptor:
      'Paper 2 (IB Economics HL) — Explicit reference to stimulus material mandatory throughout. Ignoring the extract = cannot access the top band. All other Paper 1B requirements apply.',
  },
  {
    id: 'econ_hl_paper3',
    subjectId: 'econ_hl',
    label: 'Paper 3 HL (Policy/Quantitative)',
    markMax: 20,
    descriptor:
      'Paper 3 HL (IB Economics HL) — Must engage with numerical data given. Generic policy argument without quantitative reference is heavily penalised. Real-world named examples still required.',
  },

  // HISTORY HL IB
  {
    id: 'history_hl_paper2',
    subjectId: 'history_hl',
    label: 'Paper 2 Essay (15 marks)',
    markMax: 15,
    descriptor:
      'Paper 2 Essay (IB History HL, 15 marks) — 1–4: descriptive, no argument. 5–9: some analysis, mostly narrative, argument not sustained. 10–13: analytical, sustained argument, some counter-argument, knowledge accurate. 14–15: fully analytical, counter-argument integrated and addressed, precise knowledge, justified conclusion.',
  },
  {
    id: 'history_hl_paper1_source',
    subjectId: 'history_hl',
    label: 'Paper 1 Source Skills (OPCVL)',
    markMax: 9,
    descriptor:
      'Paper 1 Source Skills (IB History HL) — Value and Limitation must address origin AND purpose AND content. OPCVL must be specific to the named source, not generic. Compare/contrast: explicit link between sources required; parallel analysis without linking = Level 2 ceiling.',
  },

  // ENGLISH LITERATURE SL IB
  {
    id: 'englit_sl_paper1',
    subjectId: 'englit_sl',
    label: 'Paper 1 Guided Literary Analysis (20 marks)',
    markMax: 20,
    descriptor:
      'Paper 1 (IB English Literature SL, 20 marks, four criteria at 5 each) — Criterion A (Literary features): named technique + effect on meaning; "the author uses imagery" without specificity = Band 2 ceiling. Criterion B (Organisation): clear argument, not a list of observations. Criterion C (Development): ideas must build, not repeat. Criterion D (Language): avoid "the author tries to show", "this is effective because", "we can see that".',
  },
  {
    id: 'englit_sl_oral',
    subjectId: 'englit_sl',
    label: 'Individual Oral',
    markMax: 40,
    descriptor:
      'Individual Oral (IB English Literature SL) — Global issue must be specific and debatable. Both the literary text and the body of work must be addressed with specific textual evidence. Generic thematic statements without textual grounding cannot access top marks.',
  },

  // PHYSICS HL IB
  {
    id: 'physics_hl_data',
    subjectId: 'physics_hl',
    label: 'Data-Based Question',
    markMax: 8,
    descriptor:
      'Data-Based Question (IB Physics HL) — Must quote specific values from the graph or table with correct units. Vague reference to trends without values is capped at L2.',
  },
  {
    id: 'physics_hl_suggest',
    subjectId: 'physics_hl',
    label: '"Suggest" Question',
    markMax: 3,
    descriptor:
      '"Suggest" (IB Physics HL) — Scientifically reasonable explanations are rewarded even if not explicitly on the syllabus. Must be physically plausible and logically coherent.',
  },
  {
    id: 'physics_hl_ia',
    subjectId: 'physics_hl',
    label: 'Internal Assessment (IA)',
    markMax: 24,
    descriptor:
      'IA (IB Physics HL) — Five criteria: Personal Engagement, Exploration, Analysis, Evaluation, Communication. Methodology must be scientifically justified. Evaluation must include specific realistic improvements — "repeat the experiment" without specifying what changes is not acceptable.',
  },

  // MATHS AA HL IB
  {
    id: 'maths_aa_hl_paper1',
    subjectId: 'maths_aa_hl',
    label: 'Paper 1 (No Calculator)',
    markMax: 120,
    descriptor:
      'Paper 1 (IB Maths AA HL, No Calculator) — Method marks independent of accuracy marks. Show all working with every algebraic step. State theorems/rules used explicitly. Exact answers preferred over decimals unless specified.',
  },
  {
    id: 'maths_aa_hl_showtthat',
    subjectId: 'maths_aa_hl',
    label: '"Show That" Question',
    markMax: 5,
    descriptor:
      '"Show That" (IB Maths AA HL) — Full rigorous working required with every algebraic step. No marks for stating the answer. Show that questions require a chain of logical deductions — the conclusion is given, the method is what is marked.',
  },
  {
    id: 'maths_aa_hl_paper3',
    subjectId: 'maths_aa_hl',
    label: 'Paper 3 Extended Problem',
    markMax: 55,
    descriptor:
      'Paper 3 (IB Maths AA HL) — Sustained logical development required. Partial credit for correct sub-methods even if overall conclusion wrong. State theorems/rules explicitly. Exact answers required unless stated otherwise.',
  },
]

export function getQuestionTypesForSubject(subjectId: string): QuestionType[] {
  return QUESTION_TYPES.filter((qt) => qt.subjectId === subjectId)
}

export function getQuestionType(id: string): QuestionType | undefined {
  return QUESTION_TYPES.find((qt) => qt.id === id)
}

// ─── Default onboarding selections ────────────────────────────────────────────

export const DEFAULT_GCSE_SUBJECT_IDS = GCSE_SUBJECTS.map((s) => s.id)
export const DEFAULT_IB_SUBJECT_IDS = IB_SUBJECTS.map((s) => s.id)

// ─── Streaming status messages ─────────────────────────────────────────────────

export const STREAMING_MESSAGES: Record<string, string> = {
  reading: 'Reading response...',
  assessing: 'Assessing knowledge and accuracy...',
  applying: 'Applying level descriptors...',
  checking: 'Checking command term compliance...',
  writing: 'Writing examiner feedback...',
  generating: 'Generating action plan...',
  complete: 'Complete',
  error: 'An error occurred',
}

export const STREAMING_STATUS_SEQUENCE = [
  'reading',
  'assessing',
  'applying',
  'checking',
  'writing',
  'generating',
] as const

// ─── Band colours ─────────────────────────────────────────────────────────────

export function getBandColor(band: string): string {
  const b = band.toLowerCase()
  if (b.includes('1') || b.includes('level 1') || b.includes('band 1')) return 'bg-red-100 text-red-700'
  if (b.includes('2') || b.includes('level 2') || b.includes('band 2')) return 'bg-yellow-100 text-yellow-700'
  if (b.includes('3') || b.includes('level 3') || b.includes('band 3')) return 'bg-green-100 text-green-700'
  if (b.includes('4') || b.includes('level 4') || b.includes('band 4')) return 'bg-blue-100 text-blue-700'
  if (b.includes('5') || b.includes('level 5') || b.includes('band 5')) return 'bg-purple-100 text-purple-700'
  return 'bg-gray-100 text-gray-700'
}

export function getMarkPercent(achieved: number, max: number): number {
  if (max === 0) return 0
  return Math.round((achieved / max) * 100)
}
