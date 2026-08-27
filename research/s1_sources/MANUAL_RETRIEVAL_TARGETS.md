# Manual retrieval list — what I need from you, with exact links

Everything below defeated automated retrieval for a **specific, diagnosed reason**. Ranked by what
it would actually do for the essay. Format that works best: plain text or markdown; if it's a scan,
flag OCR (Internet Archive OCR drops leading digits — "1949"→"949", "£1,169m"→"£169m" — prose is
reliable, numerals need checking).

**Two of the four "gaps" you asked about turned out to already be done** — see the top section
before reading the rest.

---

## Already complete — no need to chase these

### The Lok Sabha, 31 August 1957, full sitting
**Done, full text, 4,647 lines:** `primary_docs/LokSabha_1957-08-31_FERA_Amendment_Bill_debate.md`
Retrieved via the Internet Archive mirror of the eParlib scan (`eparlib.sansad.in` itself 403s at
this session's egress gateway; the IA copy at `archive.org/details/eparlib.nic.in.1807` does not).
Keyword counts across the whole sitting: sterling 12 · Britain 0 · British 5 · London 29. Pandit
Thakur Das Bhargava's floor protest that the Bill was "rushed through" is in there too.

### The 26 July 1957 Gazette SOR
**Done, full text:** `primary_docs/GAZETTE_1957-07-26_FERA_Amendment_Bill_47_of_1957_SOR_FULLTEXT.md`
This is the complete Bill No. 47 of 1957 as gazetted — every clause, plus the Statement of Objects
and Reasons signed by T. T. Krishnamachari (13 July 1957), the Financial Memorandum, and the
Memorandum Regarding Delegated Legislation. The SOR's stated reasons: continued foreign exchange
shortage with "no reason to visualise" an end, and "the development programme under the Second Five
Year Plan." No Britain, no sterling — consistent with everything else found in the project.

### Speaker political context
**New this pass:** `primary_docs/RS_1957-09-06_speakers_political_context.md` — bios for Bhupesh
Gupta (CPI, West Bengal, ex-Anushilan Samiti underground, RS 1952–81), B. R. Bhagat (Congress,
Deputy Finance Minister 1956–63 — TTK's own deputy for the whole permanence period), P. D.
Himatsingka (Congress, Bihar; possible but unconfirmed Marwari business-family link), and Kishen
Chand (likely PSP, Hyderabad — this one flagged as the least certain identification).

---

## TIER A — genuinely still open

### A1. T. T. Krishnamachari, other 1957 statements
**Live lead, not yet fetched (Firecrawl ran out of credits mid-session):**
```
https://nehruarchive.in/people/t-t-krishnamachari/page/3
```
Search-result snippet shows: *"Speech Statement to the Press. Minister for Finance, 1956-58,
Devaluation of the Rupee — Friends and Comrades, I am addressing you tonight..."* — this is a press
statement, not the IMF speech already in the project, and worth the full page. The Nehru Memorial
archive site indexes TTK's speeches by page; page 3 is where this one surfaced, but paging through
neighbouring pages (`/page/1`, `/page/2`, `/page/4`...) on the same URL pattern would likely surface
more 1957 material.

Also worth a look, already known to exist from earlier searches: TTK's other Budget-adjacent
speeches are on `indiabudget.gov.in/doc/bspeech/` — the 1957-58 final Budget (15 May 1957) is
already in the project (`BudgetSpeech_1957-58_TTK_OFFICIAL_TEXT.md`); the Interim Budget (19 March
1957) is also in (`BudgetSpeech_1957-58_INTERIM_TTK_19March1957.md`). What's *not* in the project is
anything **between** those and the September IMF statement — i.e., anything from June–August 1957,
which is exactly the runup to permanence.

### A2. IMF AREAER 1958 (Ninth) and 1959 (Tenth) — India chapters
```
1958 (Ninth):  https://www.elibrary.imf.org/downloadpdf/display/book/9781475549317/9781475549317.pdf
```
20.7 MB, ISBN **9781475549317**. **Ceiling measured precisely this pass: 100 pages succeeds, 150
pages times out.** India's chapter is at printed p. 164 ≈ PDF p. 180 — **out of reach regardless of
`maxPages` value**, same wall as 1955/1956.

**1959 (Tenth) ISBN not yet located** — ran out of search budget. Find it at
`https://www.elibrary.imf.org/subject/012` (browse the AREAER series list) and apply the same URL
pattern once you have it.

**What I need from either:** whether/when the basic travel allowance was restored after its 1 Jan
1957 abolition, and how the Fund described India's position after FERA permanence (31 Aug) and the
RBI Ordinance (31 Oct). No source in the project currently covers this period.

### A3. IMF AREAER 1955 and 1956 (1956 partial only) — unchanged from before
```
1955 (Sixth):  https://www.elibrary.imf.org/downloadpdf/display/book/9781475548662/9781475548662.pdf
```
391 pp./33.5 MB — fails even at 12 pages, no `maxPages` value will work.
```
1956 (Seventh): https://www.elibrary.imf.org/downloadpdf/display/book/9781475549188/9781475549188.pdf
```
384 pp./16.4 MB — I got pp. 1–120 (Afghanistan through Egypt, including the Ceylon/Australia/Burma
comparators already extracted into `IMF_AREAER_1956_sterling_area_comparators_Australia_Burma_Ceylon.md`).
India (printed p.162 ≈ PDF p.177) is just past the measured ceiling (120 succeeds / 150 fails).

---

## TIER B — would close open evidential gaps

### B1. Pakistan Act 1 of 1952, section 2 — the amending Act's own text
**New lead this pass, not yet fetched:**
```
https://pakistancode.gov.pk/english/UY2FqaJw1-apaUY2Fqa-apaUY2Npaplm-sg-jjjjjjjjjjjjj
```
This is the Pakistan Code's own page for "Foreign Exchange Regulation Act, 1947" — it should list
the full amendment history including the 1952 Act, and may link to the amending Act's own text or
at least give a proper citation to chase further. The site's own year-browse tool is here if that
page doesn't pan out: `https://pakistancode.gov.pk/english/LGu0xBD?year` (filter to 1952).

Still what I don't have: the actual text of **Act 1 of 1952, section 2** itself. Everything held so
far is a consolidated/footnoted text (Pakistan and Bangladesh both), not the amending Act.

### B2. NAC records — the 1957 US Treasury argument on IMF drawing rights
No web link — an archival pointer, not a URL. Two concrete leads:
- **"The Economic Problem of India"** report, Interdepartmental Working Group on India
  (State/Treasury/ICA), completed 2 May 1957: **Washington National Records Center, ICA Director's
  File: FRC 61 A 32**.
- **NAC** (National Advisory Council on International Monetary and Financial Problems), chaired by
  George M. Humphrey, 1957.

FRUS Vol. VIII's India chapter (Docs 143–184, fully read) contains no Treasury argument about IMF
subscription composition — this claim still rests on Balachandran alone.

### B3. Panagariya, *India: The Emerging Giant* (2008), pp. ~444–51
Unchanged — not available in full text through any route tried (ResearchGate/Scribd listings only).
Needs library access. Target: how the different Licence-Raj control mechanisms (industrial
licensing, import licensing, exchange control, Controller of Capital Issues) interacted with each
other — Target 1.4, whether any scholar ranks FERA as load-bearing for the others.

---

## TIER C — your own local files, unchanged

Still on your Mac, not in this repo:

| File | What I'd use it for |
|---|---|
| `S1_Evidence_Comb_Findings.md` | exact format/numbering to match; what Locks A/B already say verbatim |
| `c1019.md` (Bhagwati, *Foreign Trade Regimes*) | capital-goods licensing procedure; dating of the "inoperative in the 1950s" non-convertibility rationale |
| Balachandran, RBI history vol. (1951–67) | the original double-gate passage; BTQ-era material Vol. 1 doesn't reach |
| Kamtekar | the five-pillars framing, to check I'm not misstating it |

Volume-number trap, still unresolved: your notes call the 1951–67 volume "Volume 3," it presents
itself as "Volume 2." What I hold is unambiguously **Volume 1** (founding-to-1951, 915pp).
