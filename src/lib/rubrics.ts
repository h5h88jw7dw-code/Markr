// ─── Rubrics ───────────────────────────────────────────────────────────────────
// Keyed by subjectId → questionTypeId
// Each entry is injected verbatim into the system prompt for the marking call.

export interface LevelDescriptor {
  level: string
  markRange: string
  description: string
}

export interface Rubric {
  subjectLabel: string
  board: string
  track: 'gcse' | 'ib'
  questionTypeLabel: string
  markMax: number
  fullDescriptor: string
  levelDescriptors: LevelDescriptor[]
  hardRules: string[]
  commandTerms?: Record<string, string>
  aoBreakdown?: string[]
}

type RubricMap = Record<string, Record<string, Rubric>>

export const RUBRICS: RubricMap = {
  // ─── HISTORY EDEXCEL ─────────────────────────────────────────────────────────

  history_edexcel: {
    history_edexcel_4mark: {
      subjectLabel: 'History',
      board: 'Edexcel IGCSE',
      track: 'gcse',
      questionTypeLabel: '4-mark Describe',
      markMax: 4,
      fullDescriptor:
        'One mark per developed point. Two developed points = 4 marks. A developed point states a fact AND provides specific supporting detail or elaboration. Generic or vague statements score 0. No analysis is required or rewarded. Length beyond two developed points does not score additional marks.',
      levelDescriptors: [
        { level: '0', markRange: '0', description: 'No accurate or relevant content.' },
        { level: 'Simple', markRange: '1', description: 'Simple statement with no development. E.g. "The government introduced social reforms."' },
        { level: 'Developed point', markRange: '2', description: 'One specific point with clear development. E.g. "The Liberal government introduced old age pensions [point], providing 5 shillings a week to those over 70 who earned less than £21 a year [development]."' },
        { level: 'Two developed points', markRange: '3–4', description: 'Two specific, developed points each with distinct factual support. 3 marks if second point is less developed. 4 marks if both fully developed.' },
      ],
      hardRules: [
        'Generic statements without specific detail score 0.',
        'A single very long developed point cannot exceed 2 marks.',
        'Analysis, argument, or explanation is not rewarded — this is a knowledge recall question.',
        'Maximum 4 marks for two developed points, regardless of how many additional points are made.',
      ],
    },

    history_edexcel_6mark: {
      subjectLabel: 'History',
      board: 'Edexcel IGCSE',
      track: 'gcse',
      questionTypeLabel: '6-mark Explain Why',
      markMax: 6,
      fullDescriptor:
        'Three levels. Rewards causal explanation with development. Must use the words or intent of "explain why" — description of events without causal reasoning is Level 1. Full marks require two well-explained causes each with clear causal chain.',
      levelDescriptors: [
        { level: 'Level 1', markRange: '1–2', description: 'Simple or generalised causes stated without explanation. Describes what happened rather than why. No causal links. E.g. "There were many problems that caused..."' },
        { level: 'Level 2', markRange: '3–4', description: 'One cause explained with development. Clear causal chain: cause → mechanism → consequence. May make additional points but only one is developed.' },
        { level: 'Level 3', markRange: '5–6', description: 'Two or more causes each explained with clear causal chains. Both causes linked explicitly to the outcome asked about. 5 if second cause is less developed. 6 if both fully and precisely explained.' },
      ],
      hardRules: [
        'Maximum Level 1 for answers that describe events without explaining causation.',
        'A cause must explain the mechanism — "X happened because of Y" alone is insufficient without the causal link.',
        'Two causes each with partial explanation can reach Level 3 at 5 marks; both must be fully developed for 6.',
        'Narrative of events without causation cannot exceed Level 1.',
      ],
    },

    history_edexcel_16mark: {
      subjectLabel: 'History',
      board: 'Edexcel IGCSE',
      track: 'gcse',
      questionTypeLabel: '16-mark How Far Do You Agree Essay',
      markMax: 16,
      fullDescriptor:
        'Four levels. Rewards analytical argument addressing both sides with three distinct aspects and a justified conclusion. This is the most demanding question type. Level 4 requires: both sides addressed, three distinct aspects explored, sustained analytical argument throughout, justified conclusion.',
      levelDescriptors: [
        { level: 'Level 1', markRange: '1–4', description: 'Simple, generalised statements. Mostly descriptive with no argument. May list facts without connecting them to the question. No sense of weighing evidence.' },
        { level: 'Level 2', markRange: '5–8', description: 'Some explanation present. One-sided or poorly developed argument. May address both sides superficially. Judgement absent or unsupported. Knowledge present but not analytically deployed.' },
        { level: 'Level 3', markRange: '9–12', description: 'Both sides explained. Argument developed but judgement asserted rather than justified. Fewer than three distinct aspects or aspects not clearly distinguished. Knowledge is accurate and relevant.' },
        { level: 'Level 4', markRange: '13–16', description: 'Fully analytical argument. Both sides addressed with three or more distinct aspects each supported by specific knowledge. Sustained analytical argument throughout. Conclusion clearly justified with reference to the weight of evidence examined.' },
      ],
      hardRules: [
        'HARD CAP: Maximum Level 3 (max 12 marks) if fewer than three distinct aspects are addressed.',
        'HARD CAP: Maximum Level 2 (max 8 marks) if only one side is addressed.',
        'A "conclusion" that merely summarises what has been said is Level 3 ceiling; it must justify a judgement.',
        'Named, specific examples are required for Level 4. Generic references to "the government" without specifics cannot access Level 4.',
        'Length alone does not push into Level 4 — analytical argument and justified conclusion are the gatekeepers.',
        'Three aspects must be genuinely distinct — variations on the same point do not count as three aspects.',
      ],
    },

    history_edexcel_source: {
      subjectLabel: 'History',
      board: 'Edexcel IGCSE',
      track: 'gcse',
      questionTypeLabel: 'Source Question',
      markMax: 8,
      fullDescriptor:
        'Source utility/reliability question. Must address content, provenance (origin + purpose), and usefulness explicitly. Top marks require direct quotation from the named source. Provenance analysis must be specific to this source, not generic.',
      levelDescriptors: [
        { level: 'Level 1', markRange: '1–2', description: 'Simple reference to source content or vague comment on reliability. No structured analysis. Generic comments ("all sources are biased") without application to this source.' },
        { level: 'Level 2', markRange: '3–4', description: 'Some analysis of content or provenance. Either content OR provenance addressed but not both fully. Limited development.' },
        { level: 'Level 3', markRange: '5–6', description: 'Both content and provenance addressed with development. Direct reference to source content. Provenance analysis is partially specific to this source.' },
        { level: 'Level 4', markRange: '7–8', description: 'Detailed analysis of content with direct quotation AND specific provenance analysis (origin, purpose, and limitation). Utility conclusion justified. Fully specific to this source.' },
      ],
      hardRules: [
        'Direct quotation from the named source is mandatory for Level 4.',
        'Paraphrase alone cannot achieve Level 4.',
        '"This source is biased because it was written by…" without explaining the specific bias = Level 2.',
        'Must address both content AND provenance for Level 3+.',
      ],
    },
  },

  // ─── CLASSICAL CIVILISATION OCR ──────────────────────────────────────────────

  classciv_ocr: {
    classciv_ocr_short: {
      subjectLabel: 'Classical Civilisation',
      board: 'OCR GCSE',
      track: 'gcse',
      questionTypeLabel: 'Short Answer (AO1)',
      markMax: 5,
      fullDescriptor:
        'AO1 knowledge and understanding. Named primary source or named artefact required for secure top marks. Generic knowledge without named ancient evidence is capped.',
      levelDescriptors: [
        { level: 'Level 1', markRange: '1–2', description: 'Simple, generally accurate statements. No named ancient evidence.' },
        { level: 'Level 2', markRange: '3–4', description: 'Accurate knowledge with some reference to primary material. May name source or artefact but without developed engagement.' },
        { level: 'Level 3', markRange: '5', description: 'Accurate, specific knowledge with named primary source, artefact, or archaeological evidence used to support the point.' },
      ],
      hardRules: [
        '"The Greeks believed…" or "The Romans used…" without a named source = Level 1 ceiling.',
        'Named primary source required for Level 3.',
      ],
    },

    classciv_ocr_source: {
      subjectLabel: 'Classical Civilisation',
      board: 'OCR GCSE',
      track: 'gcse',
      questionTypeLabel: 'Source Utility',
      markMax: 10,
      fullDescriptor:
        'Must address content, origin, purpose, and limitation (COPL). All four elements needed for Level 4. Generic "bias" comments score Level 1. Must be specific to this source.',
      levelDescriptors: [
        { level: 'Level 1', markRange: '1–2', description: 'Simple comment on content or generic reliability statement. "This source is biased" without specificity.' },
        { level: 'Level 2', markRange: '3–5', description: 'Some consideration of content or origin/purpose. Not fully developed across all four elements.' },
        { level: 'Level 3', markRange: '6–8', description: 'Content and at least two of origin/purpose/limitation addressed with specific reference to the source.' },
        { level: 'Level 4', markRange: '9–10', description: 'Detailed, specific engagement with content (direct quotation/reference), origin, purpose, AND limitation. Everything anchored to this specific source.' },
      ],
      hardRules: [
        '"This is useful because it tells us about..." without content quotation = Level 2.',
        'Generic provenance comment (e.g. "written by a Greek so biased") = Level 1.',
        'Must quote or closely reference specific content from the source for Level 3+.',
        'All four COPL elements needed for Level 4.',
      ],
    },

    classciv_ocr_essay: {
      subjectLabel: 'Classical Civilisation',
      board: 'OCR GCSE',
      track: 'gcse',
      questionTypeLabel: 'Extended Essay (AO1 + AO2)',
      markMax: 20,
      fullDescriptor:
        'AO1 (knowledge, 10 marks) and AO2 (analysis and evaluation, 10 marks) marked separately. Named set texts and named artefacts required throughout. "The Greeks believed" without named source = AO1 Level 1 ceiling. AO2 requires analytical argument with evaluation, not description.',
      levelDescriptors: [
        { level: 'AO1 Level 1', markRange: '1–3', description: 'Simple or generalised knowledge. No named primary sources or artefacts.' },
        { level: 'AO1 Level 2', markRange: '4–6', description: 'Some accurate knowledge. Some named primary sources but not consistently.' },
        { level: 'AO1 Level 3', markRange: '7–10', description: 'Accurate, detailed knowledge throughout. Named primary sources and/or artefacts used to support every main point.' },
        { level: 'AO2 Level 1', markRange: '1–3', description: 'Describes rather than analyses. No evaluation or weighing of evidence.' },
        { level: 'AO2 Level 2', markRange: '4–6', description: 'Some analytical argument. Limited evaluation. May be one-sided.' },
        { level: 'AO2 Level 3', markRange: '7–10', description: 'Sustained analytical argument throughout. Evidence weighed. Justified conclusion that evaluates the question.' },
      ],
      hardRules: [
        '"The Greeks believed…" without named source = AO1 Level 1 ceiling.',
        'Named primary sources (Homer, Thucydides, Pliny, Virgil, specific artefacts) required for AO1 Level 3.',
        'AO2 cannot exceed Level 2 if argument is purely one-sided.',
        'Plot summary or description of ancient sources without analysis = AO2 Level 1.',
      ],
      aoBreakdown: ['AO1: Knowledge and Understanding (10 marks)', 'AO2: Analysis and Evaluation (10 marks)'],
    },
  },

  // ─── ENGLISH LANGUAGE EDUQAS ─────────────────────────────────────────────────

  englang_eduqas: {
    englang_eduqas_reading: {
      subjectLabel: 'English Language',
      board: 'Eduqas GCSE',
      track: 'gcse',
      questionTypeLabel: 'Reading Question',
      markMax: 15,
      fullDescriptor:
        'Reading comprehension and language analysis. Lower marks reward retrieval and identification. Upper marks require named technique + embedded evidence + effect + wider meaning. Vague effect comments without language-level analysis cannot access Band 4+.',
      levelDescriptors: [
        { level: 'Band 1', markRange: '1–3', description: 'Simple retrieval. Points not developed. May identify features without comment.' },
        { level: 'Band 2', markRange: '4–6', description: 'Some identification of technique or language features. Effect commented on but vaguely. Evidence present but not embedded.' },
        { level: 'Band 3', markRange: '7–10', description: 'Named technique with embedded evidence and explanation of effect. Some connection to purpose/audience. Language-level comment present.' },
        { level: 'Band 4', markRange: '11–13', description: 'Precise language-level analysis: connotation, syntax, sound. Effect fully explained with reference to reader impact and wider meaning. Consistent embedded evidence.' },
        { level: 'Band 5', markRange: '14–15', description: 'Perceptive, nuanced analysis. Multiple layers of meaning explored. Precise technical vocabulary. Effect linked to theme, context, and purpose.' },
      ],
      hardRules: [
        'Vague effect comment ("this makes the reader feel scared") without language-level analysis = Band 2 ceiling.',
        '"The writer uses a metaphor" without identifying what the metaphor does = Band 2.',
        'Quotation without analysis = Band 2 ceiling.',
        'Must embed quotation (not block-quote) for Band 3+.',
        'Effect must be connected to wider meaning/theme for Band 4+.',
      ],
      commandTerms: {
        analyse: 'Name technique + show effect + connect to meaning.',
        explain: 'Cause → effect chain, not just description.',
        compare: 'Explicit link between two items required, not parallel points.',
      },
    },

    englang_eduqas_writing: {
      subjectLabel: 'English Language',
      board: 'Eduqas GCSE',
      track: 'gcse',
      questionTypeLabel: 'Writing Task (AO5 + AO6)',
      markMax: 40,
      fullDescriptor:
        'AO5 (communication, organisation) and AO6 (vocabulary, grammar, punctuation) marked separately at 24 and 16 marks respectively. Top band requires sophisticated structural choices. Technically correct but generic writing is capped at mid-band.',
      levelDescriptors: [
        { level: 'AO5 Band 1', markRange: '1–6', description: 'Simple communication. Limited organisation. Ideas undeveloped.' },
        { level: 'AO5 Band 2', markRange: '7–12', description: 'Some successful communication. Attempts organisation. Some variety in sentence structure.' },
        { level: 'AO5 Band 3', markRange: '13–18', description: 'Mostly effective communication. Clear organisation with paragraphing. Attempts structural choices.' },
        { level: 'AO5 Band 4', markRange: '19–24', description: 'Sophisticated communication. Deliberate structural choices (withholding, non-linear, contrast, bathos, anaphora). Consistent voice and tone for purpose/audience.' },
        { level: 'AO6 Band 1', markRange: '1–4', description: 'Limited vocabulary. Frequent errors in grammar, punctuation, spelling.' },
        { level: 'AO6 Band 2', markRange: '5–8', description: 'Some vocabulary variety. Mostly accurate with errors. Attempts punctuation for effect.' },
        { level: 'AO6 Band 3', markRange: '9–12', description: 'Varied vocabulary used deliberately. Generally accurate. Punctuation used for effect.' },
        { level: 'AO6 Band 4', markRange: '13–16', description: 'Ambitious, precise vocabulary. Sophisticated grammar and syntax. Punctuation wielded confidently for effect. Near-faultless accuracy.' },
      ],
      hardRules: [
        'Technically correct but generic writing without structural choices = AO5 Band 2–3 ceiling.',
        'Required structural device for Band 4: withholding information, non-linear narrative, structural contrast, deliberate bathos, or anaphora.',
        'AO5 and AO6 are marked independently — strong vocabulary with weak structure stays in respective bands.',
        'Narrative or descriptive writing must show awareness of form and audience.',
      ],
      aoBreakdown: ['AO5: Communication and Organisation (24 marks)', 'AO6: Vocabulary, Grammar, Punctuation (16 marks)'],
    },
  },

  // ─── ENGLISH LITERATURE CAMBRIDGE ────────────────────────────────────────────

  englit_cambridge: {
    englit_cambridge_extract: {
      subjectLabel: 'English Literature',
      board: 'Cambridge IGCSE',
      track: 'gcse',
      questionTypeLabel: 'How Does the Writer Present X',
      markMax: 15,
      fullDescriptor:
        'The analytical method is: technique → embedded quotation → language-level analysis (connotation, sound, syntax, structure) → effect on reader → link to theme/wider meaning. Plot summary is Level 1 regardless of length. Quotation without analysis is Level 2 ceiling. Personal response required for top band.',
      levelDescriptors: [
        { level: 'Level 1', markRange: '1–4', description: 'Narrative/plot retelling with little or no analysis. No technique identified. May include quotation without comment. Very limited engagement with the question.' },
        { level: 'Level 2', markRange: '5–8', description: 'Some identification of techniques or quotation use. Effect described but not analysed at language level. Limited engagement with how language creates effect.' },
        { level: 'Level 3', markRange: '9–12', description: 'Named techniques with some language-level analysis. Effect explained with reference to language choices. Some thematic connection.' },
        { level: 'Level 4', markRange: '13–15', description: 'Sustained personal response with perceptive, language-level analysis throughout. Embedded quotation consistently. Technique → effect → theme chain fully realised. Convincing interpretation.' },
      ],
      hardRules: [
        'Plot summary = Level 1 regardless of accuracy or length.',
        'Quotation without analysis = Level 2 ceiling.',
        'Must embed quotation (not block-quote) for Level 3+.',
        'Technique must be named precisely (not just "language" or "imagery") for Level 3+.',
        'Language-level analysis required for Level 4: comment on connotation, sound, syntax, punctuation.',
        'Effect must connect to theme or wider meaning for Level 4.',
      ],
    },

    englit_cambridge_essay: {
      subjectLabel: 'English Literature',
      board: 'Cambridge IGCSE',
      track: 'gcse',
      questionTypeLabel: 'Extended Essay',
      markMax: 25,
      fullDescriptor:
        'Extended analytical essay. Must demonstrate independent critical thinking throughout. Personal response, sustained argument, well-selected evidence, and language-level analysis required for top band. Summary of plot penalised at every level.',
      levelDescriptors: [
        { level: 'Level 1', markRange: '1–6', description: 'Narrative retelling. Little or no analytical engagement. Quotation may be present but not analysed.' },
        { level: 'Level 2', markRange: '7–12', description: 'Some analysis. Argument present but not sustained. Evidence used but not always analytically.' },
        { level: 'Level 3', markRange: '13–18', description: 'Analytical argument developed. Language-level analysis present. Some independent interpretation. Evidence well-selected and embedded.' },
        { level: 'Level 4', markRange: '19–22', description: 'Convincing, sustained argument throughout. Perceptive interpretation supported by well-chosen, embedded evidence. Language-level analysis consistent.' },
        { level: 'Level 5', markRange: '23–25', description: 'Insightful personal response. Nuanced argument. Precise language analysis with layers of meaning. Convincing personal viewpoint defended through close textual reading.' },
      ],
      hardRules: [
        'Plot summary is penalised at every level — reduce by one full level if more than 20% of response is narrative.',
        'Must demonstrate personal interpretation, not just explanation of obvious meaning.',
        'Quotation must be embedded and analysed for Level 3+.',
        'Language-level analysis required throughout for Level 4+.',
      ],
    },
  },

  // ─── MATHS EDEXCEL ───────────────────────────────────────────────────────────

  maths_edexcel: {
    maths_edexcel_problem: {
      subjectLabel: 'Maths',
      board: 'Edexcel IGCSE A Higher',
      track: 'gcse',
      questionTypeLabel: 'Problem-Solving Question',
      markMax: 5,
      fullDescriptor:
        'Method marks (M) are awarded independently of accuracy marks (A). Correct method with arithmetic error still scores M marks. Must show all working to access method marks. Correct setup of equation/formula scores M mark even if subsequent calculation fails.',
      levelDescriptors: [
        { level: 'M marks', markRange: 'Method marks', description: 'Awarded for correct method regardless of arithmetic accuracy. E.g. correct formula selected and substituted, correct algebraic setup, correct process identified.' },
        { level: 'A marks', markRange: 'Accuracy marks', description: 'Awarded for correct final answer, usually contingent on correct method (ft = follow-through from a previous answer).' },
        { level: 'B marks', markRange: 'Independent marks', description: 'Awarded independently for specific correct statements, values, or features (e.g. correct equation of a line, correct reading from a graph).' },
      ],
      hardRules: [
        'No working shown = no method marks, even if final answer is correct (unless clearly a mental arithmetic result).',
        '"Show that" questions: answer given, so no marks for stating it — method must be shown fully.',
        'Correct formula selected and substituted correctly = M mark even if arithmetic is wrong.',
        'Units must be correct for accuracy marks in applied questions.',
      ],
    },

    maths_edexcel_showtthat: {
      subjectLabel: 'Maths',
      board: 'Edexcel IGCSE A Higher',
      track: 'gcse',
      questionTypeLabel: '"Show That" Question',
      markMax: 4,
      fullDescriptor:
        '"Show that" questions provide the answer and require the full method. No marks for stating the conclusion — every step of the working is what is marked. Rigorous algebraic or numerical chain required.',
      levelDescriptors: [
        { level: 'Full marks', markRange: 'All M+A marks', description: 'Complete, rigorous working chain from start to given conclusion with every step shown.' },
        { level: 'Partial', markRange: 'M marks only', description: 'Correct method attempted but steps missing or arithmetic error.' },
        { level: '0', markRange: '0', description: 'Conclusion stated without method, or completely incorrect approach.' },
      ],
      hardRules: [
        'Stating the conclusion without method = 0 marks.',
        'Every algebraic manipulation must be shown.',
        'Circular argument (assuming the conclusion to prove it) = 0 marks.',
      ],
    },
  },

  // ─── SCIENCES EDEXCEL ────────────────────────────────────────────────────────

  chemistry_edexcel: {
    chemistry_edexcel_6mark: {
      subjectLabel: 'Chemistry',
      board: 'Edexcel IGCSE',
      track: 'gcse',
      questionTypeLabel: '6-mark Extended Writing',
      markMax: 6,
      fullDescriptor:
        '1 mark per correct, precise scientific statement in continuous prose, up to 6 marks. A mark scheme list of indicative content is used — one mark per point matched. Must use correct scientific terminology throughout.',
      levelDescriptors: [
        { level: '0 marks', markRange: '0', description: 'No relevant scientific content.' },
        { level: '1–2 marks', markRange: '1–2', description: 'Some relevant scientific statements but limited. Terminology may be imprecise.' },
        { level: '3–4 marks', markRange: '3–4', description: 'Several accurate statements covering key aspects. Terminology mostly correct.' },
        { level: '5–6 marks', markRange: '5–6', description: 'Comprehensive, precise scientific statements covering all main points. Correct scientific terminology throughout. Continuous prose.' },
      ],
      hardRules: [
        'Bullet points instead of continuous prose may be penalised — note in Examiner Notes.',
        'Each point must match indicative content; near-misses are not awarded unless clearly equivalent.',
        'Incorrect scientific terminology is not rewarded even if the concept is implied.',
        'Required practical questions: must name equipment AND describe procedure AND explain validity.',
      ],
    },
  },

  biology_edexcel: {
    biology_edexcel_6mark: {
      subjectLabel: 'Biology',
      board: 'Edexcel IGCSE',
      track: 'gcse',
      questionTypeLabel: '6-mark Extended Writing',
      markMax: 6,
      fullDescriptor:
        '1 mark per correct, precise scientific statement in continuous prose, up to 6 marks. Correct biological terminology required throughout.',
      levelDescriptors: [
        { level: '0 marks', markRange: '0', description: 'No relevant scientific content.' },
        { level: '1–2 marks', markRange: '1–2', description: 'Some relevant biological statements. Terminology may be imprecise.' },
        { level: '3–4 marks', markRange: '3–4', description: 'Several accurate statements. Correct biological terminology mostly present.' },
        { level: '5–6 marks', markRange: '5–6', description: 'Comprehensive, precise biological statements with correct terminology. Continuous prose throughout.' },
      ],
      hardRules: [
        'Incorrect biological terminology is not awarded even if concept implied.',
        'Required practical: must name equipment, describe procedure, explain validity.',
        'Continuous prose required — note if student used bullet points.',
      ],
    },
  },

  physics_edexcel: {
    physics_edexcel_6mark: {
      subjectLabel: 'Physics',
      board: 'Edexcel IGCSE',
      track: 'gcse',
      questionTypeLabel: '6-mark Extended Writing',
      markMax: 6,
      fullDescriptor:
        '1 mark per correct, precise scientific statement in continuous prose, up to 6 marks. Correct physics terminology required throughout. Required practical questions demand specific equipment naming and validity explanation.',
      levelDescriptors: [
        { level: '0 marks', markRange: '0', description: 'No relevant scientific content.' },
        { level: '1–2 marks', markRange: '1–2', description: 'Some relevant physics statements. Terminology may be imprecise.' },
        { level: '3–4 marks', markRange: '3–4', description: 'Several accurate statements. Physics terminology mostly correct.' },
        { level: '5–6 marks', markRange: '5–6', description: 'Comprehensive, precise physics statements with correct terminology. Continuous prose throughout.' },
      ],
      hardRules: [
        'Incorrect physics terminology is not awarded.',
        'Required practical: name equipment + describe procedure + explain validity control.',
        'Continuous prose required.',
      ],
    },

    physics_edexcel_calc: {
      subjectLabel: 'Physics',
      board: 'Edexcel IGCSE',
      track: 'gcse',
      questionTypeLabel: 'Calculation Question',
      markMax: 4,
      fullDescriptor:
        'Method marks independent of accuracy. Show all working: formula selection, substitution, calculation. Units must be correct for accuracy marks.',
      levelDescriptors: [
        { level: 'M mark', markRange: '1', description: 'Correct formula selected and/or correctly substituted.' },
        { level: 'A mark', markRange: '1', description: 'Correct final numerical answer with correct units.' },
        { level: 'Further M/A', markRange: '1–2', description: 'Additional method or accuracy marks for multi-step calculations.' },
      ],
      hardRules: [
        'No working = no method marks even if answer correct.',
        'Wrong units = no accuracy mark for that quantity.',
        'Correct formula with substitution error still scores the formula M mark.',
      ],
    },
  },

  // ─── GEOGRAPHY EDEXCEL ───────────────────────────────────────────────────────

  geography_edexcel: {
    geography_edexcel_casestudy: {
      subjectLabel: 'Geography',
      board: 'Edexcel IGCSE',
      track: 'gcse',
      questionTypeLabel: 'Case Study / Extended Answer',
      markMax: 8,
      fullDescriptor:
        'Named case study with specific data required for top band. Generic references to unnamed locations are capped at Level 2. Command term compliance is strictly applied.',
      levelDescriptors: [
        { level: 'Level 1', markRange: '1–2', description: 'Simple, generalised statements. No named case study or named location.' },
        { level: 'Level 2', markRange: '3–4', description: 'Some geographical knowledge. Location may be vaguely referenced ("a city in Africa") but not named. Limited use of specific data.' },
        { level: 'Level 3', markRange: '5–6', description: 'Named location. Some specific knowledge but data/statistics not consistently used. Command term partially met.' },
        { level: 'Level 4', markRange: '7–8', description: 'Named location with specific data and/or statistics. Command term fully met. Coherent geographical argument.' },
      ],
      hardRules: [
        '"A city in a developing country" = Level 2 ceiling. Location must be named.',
        'Statistics or data must be specific and plausible for Level 4.',
        'explain = cause-effect chain. assess = weigh factors with evidence. evaluate = justified conclusion with evidence.',
        'Command term compliance is mandatory — a response that ignores the command term cannot exceed Level 2.',
      ],
      commandTerms: {
        explain: 'Cause → mechanism → consequence chain. Not description.',
        assess: 'Weigh multiple factors against each other with evidence.',
        evaluate: 'Justified conclusion that uses evidence to weigh arguments.',
        describe: 'Accurate identification with specific detail. No explanation needed.',
        compare: 'Explicit similarities AND differences between named examples.',
      },
    },
  },

  // ─── ECONOMICS HL ────────────────────────────────────────────────────────────

  econ_hl: {
    econ_hl_paper1a: {
      subjectLabel: 'Economics HL',
      board: 'IB Diploma',
      track: 'ib',
      questionTypeLabel: 'Paper 1A (10 marks)',
      markMax: 10,
      fullDescriptor:
        'Part A requires: (1) definition of key terms in opening sentence, (2) fully labelled diagram with title + labelled axes + labelled curves + shifts with directional arrows, (3) theoretical explanation linked directly to diagram. Evaluation is not required for Part A.',
      levelDescriptors: [
        { level: '1–4', markRange: '1–4', description: 'Descriptive answer. Diagram absent, incorrect, or unlabelled. Key terms not defined or poorly defined. Theory not linked to diagram.' },
        { level: '5–7', markRange: '5–7', description: 'Some explanation present. Diagram present but incomplete (missing labels, wrong shifts, no arrows). Key terms defined but imprecisely. Theory partially linked to diagram.' },
        { level: '8–10', markRange: '8–10', description: 'Full, clear theoretical explanation. Fully labelled diagram (title + axes + all curves + directional shift arrows). Key terms precisely defined at the start. Explanation consistently linked to diagram.' },
      ],
      hardRules: [
        'Define key terms in the opening sentence — not the conclusion.',
        'Every diagram must have: title, labelled axes (including units where applicable), labelled curves, and directional arrows on all shifts.',
        '"A European country" or "a developing country" as the real-world example = 0 marks for application.',
        'Evaluation is not required or rewarded in Part A.',
        'A diagram that exists but is missing labels, title, or shift arrows = maximum 7 marks.',
      ],
    },

    econ_hl_paper1b: {
      subjectLabel: 'Economics HL',
      board: 'IB Diploma',
      track: 'ib',
      questionTypeLabel: 'Paper 1B (15 marks)',
      markMax: 15,
      fullDescriptor:
        'All Paper 1A requirements plus: genuine two-sided evaluation, named real-world example (country + approximate year), and justified conclusion that weighs evidence rather than summarising.',
      levelDescriptors: [
        { level: '1–4', markRange: '1–4', description: 'Descriptive. Diagram absent or incorrect. No evaluation. Real world absent.' },
        { level: '5–7', markRange: '5–7', description: 'Some explanation. Diagram incomplete. Evaluation one-sided or superficial. Real world vague or unnamed.' },
        { level: '8–10', markRange: '8–10', description: 'Full theory + accurate labelled diagram. Evaluation present but limited. Real world named.' },
        { level: '11–13', markRange: '11–13', description: 'Both-sides evaluation. Named real-world example with country and year. Conclusion present but not fully justified by weighing.' },
        { level: '14–15', markRange: '14–15', description: 'Precise, fully labelled diagram. Strong, named real-world example (country + year). Balanced two-sided evaluation. Well-reasoned conclusion that explicitly weighs arguments.' },
      ],
      hardRules: [
        'Real-world example must be named country + approximate year. "A European country" = 0 for application.',
        'Conclusion must weigh arguments — a summary of what was said is not a justified conclusion.',
        'Evaluation must be genuinely two-sided; one-sided evaluation = max 10 marks.',
        'All diagram requirements from Part A still apply.',
        'Define key terms at the start.',
      ],
    },

    econ_hl_paper2: {
      subjectLabel: 'Economics HL',
      board: 'IB Diploma',
      track: 'ib',
      questionTypeLabel: 'Paper 2 (Data Response)',
      markMax: 15,
      fullDescriptor:
        'All Paper 1B requirements plus explicit, specific reference to the stimulus material throughout. Ignoring the extract entirely = cannot access top markband.',
      levelDescriptors: [
        { level: '1–7', markRange: '1–7', description: 'Limited or no reference to stimulus. May have theoretical content but treats question as a Paper 1 essay.' },
        { level: '8–11', markRange: '8–11', description: 'Some reference to stimulus. Theory linked to data. Real world present. Evaluation present.' },
        { level: '12–15', markRange: '12–15', description: 'Theory integrated with specific stimulus references throughout. Named real world beyond the stimulus where relevant. Full evaluation with justified conclusion.' },
      ],
      hardRules: [
        'Explicit reference to the stimulus is mandatory — data, quotes, or context from the extract must appear.',
        'A response that ignores the stimulus entirely cannot exceed 7 marks.',
        'All Paper 1B requirements still apply.',
      ],
    },

    econ_hl_paper3: {
      subjectLabel: 'Economics HL',
      board: 'IB Diploma',
      track: 'ib',
      questionTypeLabel: 'Paper 3 HL (Policy/Quantitative)',
      markMax: 20,
      fullDescriptor:
        'Must engage with quantitative data provided. Generic policy arguments without quantitative reference are heavily penalised. Real-world named examples still required.',
      levelDescriptors: [
        { level: '1–8', markRange: '1–8', description: 'Generic policy statements. No engagement with numerical data. Theory present but not applied to the specific context.' },
        { level: '9–14', markRange: '9–14', description: 'Some engagement with data. Policy linked to quantitative context. Real world present.' },
        { level: '15–20', markRange: '15–20', description: 'Quantitative data explicitly cited and integrated into argument. Policy options weighed using the given data. Named real world. Justified conclusion.' },
      ],
      hardRules: [
        'Generic policy argument without specific quantitative reference = maximum 8 marks.',
        'Must cite specific numbers from the data provided.',
        'All standard IB Economics requirements (definitions, diagram, real world, evaluation) still apply.',
      ],
    },
  },

  // ─── HISTORY HL IB ───────────────────────────────────────────────────────────

  history_hl: {
    history_hl_paper2: {
      subjectLabel: 'History HL',
      board: 'IB Diploma',
      track: 'ib',
      questionTypeLabel: 'Paper 2 Essay (15 marks)',
      markMax: 15,
      fullDescriptor:
        'Analytical historical essay. Must have a clear, sustained argument throughout. Counter-argument must be integrated and addressed at 14–15 marks, not merely acknowledged. Precise factual knowledge required.',
      levelDescriptors: [
        { level: '1–4', markRange: '1–4', description: 'Descriptive. No argument. Mostly narrates historical events. May have factual knowledge but it is not analytically deployed.' },
        { level: '5–9', markRange: '5–9', description: 'Some analysis. Mostly narrative with moments of argument. Argument not sustained. Counter-argument absent or superficial. Knowledge accurate.' },
        { level: '10–13', markRange: '10–13', description: 'Analytical. Sustained argument throughout. Some counter-argument acknowledged. Knowledge is accurate and precise. Conclusion present.' },
        { level: '14–15', markRange: '14–15', description: 'Fully analytical. Counter-argument integrated and addressed (not just acknowledged). Precise factual knowledge with dates, named individuals, specific events. Justified conclusion.' },
      ],
      hardRules: [
        'Narrative account of events without analytical argument = maximum Level 5–9.',
        'Counter-argument must be addressed, not merely acknowledged, for 14–15.',
        'Vague knowledge ("in the mid-twentieth century") where precise dates exist = does not access 14–15.',
        'Conclusion must justify the argument, not summarise.',
        'Breadth across the topic rewarded; single-event focus is penalised.',
      ],
    },

    history_hl_paper1_source: {
      subjectLabel: 'History HL',
      board: 'IB Diploma',
      track: 'ib',
      questionTypeLabel: 'Paper 1 Source Skills (OPCVL)',
      markMax: 9,
      fullDescriptor:
        'Origin, Purpose, Content, Value, Limitation (OPCVL). Every element must be specific to the named source. Generic comments that could apply to any source score Level 1. Compare/contrast requires explicit linkage between sources.',
      levelDescriptors: [
        { level: '1–3', markRange: '1–3', description: 'Simple or generic comments. OPCVL elements attempted but not developed. "This source is biased" without specificity.' },
        { level: '4–6', markRange: '4–6', description: 'Some OPCVL elements addressed with partial specificity. Value and Limitation attempted but one element not fully addressed.' },
        { level: '7–9', markRange: '7–9', description: 'All OPCVL elements addressed specifically for this named source. Value and Limitation grounded in origin AND purpose AND content. Compare/contrast: explicit link between sources.' },
      ],
      hardRules: [
        'OPCVL must be specific to this named source — generic comments score Level 1.',
        'Value must be grounded in origin, purpose, and content — not just "it tells us…".',
        'Limitation must be specific: why this particular origin or purpose limits the source\'s value for this purpose.',
        'Compare/contrast: parallel analysis without explicit linking between sources = Level 2 ceiling.',
        'Must address all of origin, purpose, AND content for secure Level 3 (7–9).',
      ],
    },
  },

  // ─── ENGLISH LITERATURE SL IB ────────────────────────────────────────────────

  englit_sl: {
    englit_sl_paper1: {
      subjectLabel: 'English Literature SL',
      board: 'IB Diploma',
      track: 'ib',
      questionTypeLabel: 'Paper 1 Guided Literary Analysis (20 marks)',
      markMax: 20,
      fullDescriptor:
        'Four criteria of 5 marks each: Criterion A (Literary features and effects), Criterion B (Organisation), Criterion C (Development of ideas), Criterion D (Language). All four assessed independently.',
      levelDescriptors: [
        { level: 'Criterion A — 1–2', markRange: '1–2', description: 'Simple identification of features. "The author uses imagery" without specificity.' },
        { level: 'Criterion A — 3–4', markRange: '3–4', description: 'Named techniques with some analysis of effect. Not fully developed.' },
        { level: 'Criterion A — 5', markRange: '5', description: 'Precise named techniques with clear analysis of effect on meaning. Language-level analysis throughout.' },
        { level: 'Criterion B — 1–2', markRange: '1–2', description: 'List of observations. No clear argument structure.' },
        { level: 'Criterion B — 3–4', markRange: '3–4', description: 'Some argument structure. Paragraphing present. Not fully coherent.' },
        { level: 'Criterion B — 5', markRange: '5', description: 'Clear, developing argument. Each paragraph builds on the previous. Logical progression.' },
        { level: 'Criterion C — 1–2', markRange: '1–2', description: 'Ideas repeated, not developed. Same point made multiple times.' },
        { level: 'Criterion C — 3–4', markRange: '3–4', description: 'Ideas develop but not consistently. Some repetition.' },
        { level: 'Criterion C — 5', markRange: '5', description: 'Ideas genuinely build throughout. No repetition. Each paragraph adds a new layer.' },
        { level: 'Criterion D — 1–2', markRange: '1–2', description: 'Informal language, imprecise vocabulary, frequent errors.' },
        { level: 'Criterion D — 3–4', markRange: '3–4', description: 'Mostly accurate, appropriate vocabulary. Some imprecision.' },
        { level: 'Criterion D — 5', markRange: '5', description: 'Precise academic language. Avoids "the author tries to show" / "this is effective because" / "we can see that". Confident critical register throughout.' },
      ],
      hardRules: [
        '"The author uses imagery" without naming type or specifying effect = Criterion A Band 2 ceiling.',
        '"We can see that..." / "This is effective because..." / "The author tries to show..." = Criterion D Band 2 ceiling.',
        'A list of analytical observations without developing an argument = Criterion B Band 2.',
        'Repeating the same analytical point in different paragraphs = Criterion C Band 2.',
        'Criterion D: flag all uses of banned phrases and note them in Examiner Notes.',
      ],
      aoBreakdown: [
        'Criterion A: Literary features and effects (5 marks)',
        'Criterion B: Organisation (5 marks)',
        'Criterion C: Development of ideas (5 marks)',
        'Criterion D: Language (5 marks)',
      ],
    },

    englit_sl_oral: {
      subjectLabel: 'English Literature SL',
      board: 'IB Diploma',
      track: 'ib',
      questionTypeLabel: 'Individual Oral',
      markMax: 40,
      fullDescriptor:
        'Individual Oral assessed on four criteria. Global issue must be specific and debatable. Both literary text and body of work must be addressed with specific textual evidence.',
      levelDescriptors: [
        { level: 'Low band', markRange: '1–16', description: 'Global issue vague or undebatable. Only one text addressed. Limited textual evidence.' },
        { level: 'Mid band', markRange: '17–28', description: 'Global issue present but imprecisely stated. Both texts addressed. Some textual evidence.' },
        { level: 'High band', markRange: '29–40', description: 'Specific, debatable global issue. Both literary text and body of work addressed with specific evidence from each. Analytical throughout.' },
      ],
      hardRules: [
        'Global issue must be specific and debatable — "power" or "identity" alone is not acceptable.',
        'Both the literary text and the body of work must be addressed for top marks.',
        'Generic thematic statements without textual grounding = mid-band ceiling.',
        'Specific evidence from each text required for high band.',
      ],
    },
  },

  // ─── PHYSICS HL IB ───────────────────────────────────────────────────────────

  physics_hl: {
    physics_hl_data: {
      subjectLabel: 'Physics HL',
      board: 'IB Diploma',
      track: 'ib',
      questionTypeLabel: 'Data-Based Question',
      markMax: 8,
      fullDescriptor:
        'Must quote specific values from the graph or table with correct units. Vague reference to trends without values = Level 2 ceiling.',
      levelDescriptors: [
        { level: 'Low', markRange: '1–3', description: 'Vague trend described ("it increases") without values. No units. No specific data quoted.' },
        { level: 'Mid', markRange: '4–6', description: 'Some specific values quoted. Trend identified correctly. Units partially present.' },
        { level: 'High', markRange: '7–8', description: 'Specific values quoted with correct units. Trend explained with reference to physics principles. Uncertainty or error bar addressed if relevant.' },
      ],
      hardRules: [
        'Must quote specific values from the graph/table.',
        '"The graph shows an increase" without specific values = Level 2 ceiling.',
        'Units must be correct and included with all quoted values.',
      ],
    },

    physics_hl_suggest: {
      subjectLabel: 'Physics HL',
      board: 'IB Diploma',
      track: 'ib',
      questionTypeLabel: '"Suggest" Question',
      markMax: 3,
      fullDescriptor:
        '"Suggest" rewards scientifically reasonable, physically plausible explanations. Not required to be on the syllabus — scientific reasoning is what is marked.',
      levelDescriptors: [
        { level: '0', markRange: '0', description: 'Physically implausible or scientifically incoherent suggestion.' },
        { level: '1–2', markRange: '1–2', description: 'Reasonable suggestion but insufficiently developed or partially correct.' },
        { level: '3', markRange: '3', description: 'Scientifically reasonable, physically plausible, clearly explained suggestion.' },
      ],
      hardRules: [
        'Suggestion must be physically plausible — marks are not limited to syllabus content.',
        'Must provide reasoning, not just state the suggestion.',
      ],
    },

    physics_hl_ia: {
      subjectLabel: 'Physics HL',
      board: 'IB Diploma',
      track: 'ib',
      questionTypeLabel: 'Internal Assessment (IA)',
      markMax: 24,
      fullDescriptor:
        'Five criteria: Personal Engagement (2), Exploration (6), Analysis (6), Evaluation (6), Communication (4). Evaluation must include specific, realistic improvements. "Repeat the experiment" alone is not acceptable.',
      levelDescriptors: [
        { level: 'Personal Engagement 0–1', markRange: '0–1', description: 'No evidence of personal interest or creativity. Standard textbook investigation.' },
        { level: 'Personal Engagement 2', markRange: '2', description: 'Clear evidence of personal interest. Original angle or creative approach.' },
        { level: 'Exploration 1–2', markRange: '1–2', description: 'Research question present but not focused. Variables not clearly identified.' },
        { level: 'Exploration 3–4', markRange: '3–4', description: 'Focused research question. Variables identified. Background theory partially relevant.' },
        { level: 'Exploration 5–6', markRange: '5–6', description: 'Well-focused RQ. Variables clearly identified and controlled. Methodology scientifically justified. Risk assessment present.' },
        { level: 'Analysis 1–2', markRange: '1–2', description: 'Data presented but not processed appropriately.' },
        { level: 'Analysis 3–4', markRange: '3–4', description: 'Data processed. Some uncertainty analysis. Graph present.' },
        { level: 'Analysis 5–6', markRange: '5–6', description: 'Data processed correctly with full uncertainty propagation. Well-presented graphs with axes, units, error bars. Conclusion drawn from analysis.' },
        { level: 'Evaluation 1–2', markRange: '1–2', description: 'Conclusion stated. No evaluation of methodology. Generic improvements.' },
        { level: 'Evaluation 3–4', markRange: '3–4', description: 'Conclusion evaluated. Some limitations identified. Improvements somewhat specific.' },
        { level: 'Evaluation 5–6', markRange: '5–6', description: 'Conclusion fully evaluated with reference to literature or accepted value. Specific, realistic limitations identified. Specific improvements that address those limitations.' },
        { level: 'Communication 1–2', markRange: '1–2', description: 'Report unclear. Format inconsistent. Major elements missing.' },
        { level: 'Communication 3–4', markRange: '3–4', description: 'Clear report. All sections present. Appropriate format and notation.' },
      ],
      hardRules: [
        '"Repeat the experiment more times" without specifying what to change = Evaluation Level 2 ceiling.',
        'Improvements must specifically address identified limitations.',
        'Graph axes must be labelled with quantity and units.',
        'Error bars required for repeated measurements.',
        'Uncertainty must be propagated through calculations for Analysis Level 5–6.',
      ],
      aoBreakdown: [
        'Personal Engagement (2 marks)',
        'Exploration (6 marks)',
        'Analysis (6 marks)',
        'Evaluation (6 marks)',
        'Communication (4 marks)',
      ],
    },
  },

  // ─── MATHS AA HL IB ──────────────────────────────────────────────────────────

  maths_aa_hl: {
    maths_aa_hl_paper1: {
      subjectLabel: 'Maths AA HL',
      board: 'IB Diploma',
      track: 'ib',
      questionTypeLabel: 'Paper 1 (No Calculator)',
      markMax: 120,
      fullDescriptor:
        'Method marks independent of accuracy marks. Show all working with every algebraic step. State theorems and rules explicitly. Exact answers required unless stated otherwise.',
      levelDescriptors: [
        { level: 'M marks', markRange: 'Method', description: 'Correct method used, regardless of arithmetic accuracy.' },
        { level: 'A marks', markRange: 'Accuracy', description: 'Correct numerical or algebraic answer, usually contingent on M mark.' },
        { level: 'R marks', markRange: 'Reasoning', description: 'Correct reasoning or statement of a theorem/rule.' },
        { level: 'AG', markRange: 'Answer given', description: '"Show that" sub-questions — answer given, method must be shown.' },
      ],
      hardRules: [
        'Exact answers required unless the question specifies a decimal or approximation.',
        'Every algebraic step must be shown — intermediate steps implied but not written = no A mark.',
        'State the theorem or rule being applied explicitly.',
        '"Show that" sub-questions: circular argument (assuming conclusion) = 0.',
      ],
    },

    maths_aa_hl_showtthat: {
      subjectLabel: 'Maths AA HL',
      board: 'IB Diploma',
      track: 'ib',
      questionTypeLabel: '"Show That" Question',
      markMax: 5,
      fullDescriptor:
        'Full rigorous working required. Every algebraic step must appear. Conclusion is given — no marks for stating it. State all theorems and rules used.',
      levelDescriptors: [
        { level: 'Full', markRange: 'All marks', description: 'Complete chain of deductions, each step shown, theorems stated, conclusion reached.' },
        { level: 'Partial', markRange: 'M marks', description: 'Correct method but steps missing or single arithmetic error.' },
        { level: '0', markRange: '0', description: 'Conclusion stated without method, or circular argument.' },
      ],
      hardRules: [
        'Stating the conclusion without proof = 0.',
        'Circular argument = 0.',
        'Missing algebraic steps = loss of A marks.',
        'Theorems must be named (e.g. "By the factor theorem…", "Applying de Moivre\'s theorem…").',
      ],
    },

    maths_aa_hl_paper3: {
      subjectLabel: 'Maths AA HL',
      board: 'IB Diploma',
      track: 'ib',
      questionTypeLabel: 'Paper 3 Extended Problem',
      markMax: 55,
      fullDescriptor:
        'Sustained logical development required throughout. Partial credit for correct sub-methods even if overall conclusion wrong. State all theorems and rules explicitly. Exact answers preferred.',
      levelDescriptors: [
        { level: 'M marks', markRange: 'Method', description: 'Correct method used at each step.' },
        { level: 'A marks', markRange: 'Accuracy', description: 'Correct numerical/algebraic result.' },
        { level: 'R marks', markRange: 'Reasoning', description: 'Correct reasoning, theorem stated.' },
      ],
      hardRules: [
        'Sustained logical development — do not jump steps.',
        'Partial credit awarded for correct sub-methods even if final answer wrong.',
        'Exact answers required unless specified.',
        'All theorems must be stated explicitly by name.',
      ],
    },
  },

  // ─── SPANISH CAMBRIDGE ───────────────────────────────────────────────────────

  spanish_cambridge: {
    spanish_cambridge_writing: {
      subjectLabel: 'Spanish',
      board: 'Cambridge IGCSE',
      track: 'gcse',
      questionTypeLabel: 'Writing Task',
      markMax: 20,
      fullDescriptor:
        'Communication (content) and Language (accuracy, range, complexity) assessed. Top marks require accurate, varied vocabulary and grammatical structures. Communication must be clear and appropriate to the task.',
      levelDescriptors: [
        { level: 'Band 1', markRange: '1–5', description: 'Very limited communication. Frequent errors. Very basic vocabulary.' },
        { level: 'Band 2', markRange: '6–10', description: 'Some successful communication. Errors frequent but not impeding meaning. Limited vocabulary range.' },
        { level: 'Band 3', markRange: '11–15', description: 'Generally clear communication. Some errors. Reasonable vocabulary range. Some complex structures attempted.' },
        { level: 'Band 4', markRange: '16–20', description: 'Clear, effective communication. Accurate with varied vocabulary. Complex grammatical structures used correctly.' },
      ],
      hardRules: [
        'Content must address all bullet points in the task for full marks.',
        'Repeated use of only simple structures caps at Band 2–3.',
        'Serious grammatical errors that impede communication reduce band.',
      ],
    },
  },

  // ─── HINDI B SL IB ───────────────────────────────────────────────────────────

  hindi_b_sl: {
    hindi_b_sl_writing: {
      subjectLabel: 'Hindi B SL',
      board: 'IB Diploma',
      track: 'ib',
      questionTypeLabel: 'Written Assignment',
      markMax: 25,
      fullDescriptor:
        'Language B assessed on language use, message, and format. All three must be addressed for top marks. Register must be appropriate to the text type.',
      levelDescriptors: [
        { level: 'Low', markRange: '1–8', description: 'Limited language use. Message unclear. Format not followed.' },
        { level: 'Mid', markRange: '9–16', description: 'Some effective language use. Message mostly clear. Format partially followed.' },
        { level: 'High', markRange: '17–25', description: 'Effective, accurate language use. Clear message. Correct register and format for text type.' },
      ],
      hardRules: [
        'Register must match the required text type (formal letter, blog post, etc.).',
        'All required structural elements of the text type must be present.',
      ],
    },
  },
}

export function getRubric(subjectId: string, questionTypeId: string): Rubric | undefined {
  return RUBRICS[subjectId]?.[questionTypeId]
}

export function buildRubricSystemPrompt(subjectId: string, questionTypeId: string): string {
  const rubric = getRubric(subjectId, questionTypeId)
  if (!rubric) return ''

  const lines: string[] = [
    `SUBJECT: ${rubric.subjectLabel} (${rubric.board})`,
    `QUESTION TYPE: ${rubric.questionTypeLabel} — Maximum marks: ${rubric.markMax}`,
    '',
    '=== MARK SCHEME ===',
    rubric.fullDescriptor,
    '',
    '=== LEVEL DESCRIPTORS ===',
  ]

  for (const ld of rubric.levelDescriptors) {
    lines.push(`${ld.level} (${ld.markRange}): ${ld.description}`)
  }

  if (rubric.hardRules.length > 0) {
    lines.push('')
    lines.push('=== HARD RULES (non-negotiable) ===')
    for (const rule of rubric.hardRules) {
      lines.push(`• ${rule}`)
    }
  }

  if (rubric.commandTerms) {
    lines.push('')
    lines.push('=== COMMAND TERM DEFINITIONS ===')
    for (const [term, definition] of Object.entries(rubric.commandTerms)) {
      lines.push(`${term.toUpperCase()}: ${definition}`)
    }
  }

  if (rubric.aoBreakdown) {
    lines.push('')
    lines.push('=== ASSESSMENT OBJECTIVE BREAKDOWN ===')
    for (const ao of rubric.aoBreakdown) {
      lines.push(`• ${ao}`)
    }
  }

  return lines.join('\n')
}
