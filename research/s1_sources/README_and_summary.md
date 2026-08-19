# S1 Source Hunt — Run Summary (Pass 6)

## PASS 6 HEADLINE: H1 and H8 both FOUND. T1.5 is now answered — and it forces a cut.

Three things closed this pass, and one of them changes the essay's mechanism rather than just its evidence.

| Target | Result |
|---|---|
| **H1** — IMF *Eighth Annual Report on Exchange Restrictions* (1957), India chapter | **FOUND, complete.** Printed pp.164–170, recovered in full. **The Fund gives no reason at all** for India's restrictions — the chapter is purely descriptive of mechanism. The hoped-for "blocked sterling" attribution (T0.1 called it "potentially the biggest available upgrade") **does not exist**: no mention of the sterling balances, the No. 1 or No. 2 Account, or reserve inadequacy anywhere in the chapter. See `H1_INDIA_CHAPTER_FOUND_and_T1.5_RESOLVED.md`. |
| **T1.5** — the FERA double-gate | **RESOLVED, against the essay.** The Fund: "Where a valid import license is held, **the required exchange is released by authorized banks on presentation of the exchange control copy of the license**." Automatic, bank-executed, document-triggered. **The "FERA is the binding gate" paragraph must be cut** — the brief's own acceptance criterion. The binding constraint was the *licence* and the half-yearly Red Book quota policy, not the exchange release. |
| **H8** — the 1951 six-year sterling agreement | **FOUND.** Deshmukh's statement to the **Provisional Parliament, 7 December 1950**: £35m a year for six years from 1 July 1951, carry-forward of unused amounts, consultation required to exceed by more than £5m. Counterparty named: **Hugh Gaitskell**. Expiry therefore **30 June 1957** — eight weeks before TTK moved FERA permanence. See `H8_1951_six_year_agreement_FOUND.md`. |
| **H5** — the 1948 White Paper | **Still not found.** Two more routes eliminated this pass (eParlib title index → 84 modern White Papers, none 1948; 1948 Gazette `description` metadata → "Subject not available" throughout). Remaining routes are the UK side (Command Paper via Hansard) and the archives — see `MANUAL_SCRAPE_LINKS.md` §2.2. |

### A procedural finding worth using

The six-year agreement that governed India's access to its own reserves until June 1957 was **announced to the legislature in a four-paragraph ministerial statement and never debated.** Hussain Imam asked directly for a day to discuss "a very important financial arrangement"; Nehru replied, "We shall consider the matter, Sir, whether it should be discussed in the House or not," and the House adjourned. That parallels the 1957 FERA permanence passing in a single sitting (T2.3) and Chetty's 1948 complaint (U10) that six-monthly renegotiation made coherent policy impossible.

### The negative finding is now at five documents

Five independent 1956–57 documents have been checked and contain **no attribution of India's exchange control to Britain or sterling**: TTK's Interim Budget (Mar 1957), his final Budget (May 1957 — "sterling" appears zero times), the FERA Bill's Statement of Objects and Reasons (Jul 1957), his Lok Sabha speech (31 Aug 1957 — "Britain" appears zero times), and now the IMF's own India chapter. Meanwhile the 1948–50 record is saturated with exactly such attributions, from Chetty, Matthai, Neogy and Deshmukh in turn.

**This remains the project's central result, and it is a two-claim problem.** "Britain constrained India, 1948–50" is heavily documented. "Britain caused the 1957 permanence" is, so far, documented nowhere. The essay must not let the first carry the second.

**The one place that could still overturn it** is the Rajya Sabha's FERA debate of early September 1957 — the only substantial sitting on this Bill whose text nobody has read. It is browser-only; URLs are in `MANUAL_SCRAPE_LINKS.md` §2.1.

### What the IMF chapter *does* give the essay

Neutral third-party confirmation that India's system was **British in design and administratively conformant**: "Like other Sterling Area countries, India has an exchange control system similar to that in operation in the United Kingdom but adapted to suit local requirements," and payments were prescribed "for the most part in conformity with the exchange control regulations of the United Kingdom." That corroborates TTK's own remark in the 31 August 1957 debate that a seizure provision "is exactly on the lines of the British Exchange Control Act." Britain as **model** is now attested from both the Indian and the Fund side. Britain as **cause of permanence** is not.

Also: the chapter's 1956 change-log shows India **liberalising** as late as 3 September 1956 (dollar dealing freed to market rates) and turning restrictive only from **27 December 1956** — compressing the whole reversal into roughly eight weeks around the turn of the year.

### Tooling — the IMF parse ceiling, solved

The India chapter had failed across three sessions. The cause was never credits; it was the MCP tool's hard **60-second timeout**. Earlier passes tried `maxPages` 186, 188, 190, 192 "to be safe" — all time out. The fix was to come **down**: **183 succeeds, 184 times out.** The chapter fits inside 183. Pages 184–388 (including the UK, Pakistan, Ceylon and Australasia chapters) remain unretrieved and need a browser — see `MANUAL_SCRAPE_LINKS.md` §1.1.

### New this pass

- `H1_INDIA_CHAPTER_FOUND_and_T1.5_RESOLVED.md`
- `H8_1951_six_year_agreement_FOUND.md`
- `primary_docs/IMF_8th_Annual_Report_1957_INDIA_CHAPTER_FULLTEXT.md`
- `primary_docs/ProvisionalParliament_1950-12-07_Deshmukh_STERLING_BALANCES_STATEMENT_FULLTEXT.md`
- `MANUAL_SCRAPE_LINKS.md` — **exact URLs for every remaining blocked target**, plus the three reusable search techniques (IA Gazette metadata, eParlib mirror, indiabudget.gov.in) written up so they can be re-run without me.

`T1.5_import_trade_control_handbook.md` and `B2_Gazette_26Jul1957_SOR.md` now carry SUPERSEDED headers; their bodies are retained as elimination logs only.

---

# S1 Source Hunt — Run Summary (Pass 5, Opus)

## PASS 5 HEADLINE: the Gazette collection was cracked, and B2 — the project's #1 target — is FOUND.

**The key.** Internet Archive's `gazetteofindia` items carry `date` and `description` metadata fields. Identifier numbering is *not* date-sequential (which defeated every earlier pass), but the metadata is directly queryable:
```
archive.org/advancedsearch.php?q=collection:gazetteofindia AND description:"Foreign Exchange Regulation"
  &fl[]=identifier&fl[]=date&fl[]=description&rows=60&output=json
```
The same technique works on the eParlib mirror, where `fl[]=eparlib_document_url` returns the exact bitstream filename — which also proves that several items earlier logged as "indexed but will not resolve" (the 6 Oct 1949 volume; the whole Feb–Mar 1948 session) are in fact available; those were transient failures.

### What Pass 5 recovered

| Target | Result |
|---|---|
| **B2** — Statement of Objects and Reasons, FERA (Amendment) Bill 1957 | **FOUND.** `in.gazette.e.1957.284` = Bill No. 47 of 1957, introduced 26 July 1957, SOR signed **T. T. Krishnamachari, 13 July 1957**. Reasons given: world trade did not stabilise; shortage "likely to continue for an indefinite period"; the Second Five Year Plan. **No mention of Britain, sterling, or the sterling balances.** Its Financial Memorandum also independently corroborates T2.4 ("An Enforcement Unit with a Director at its head is already functioning"). Printed pages are **323–334**, not "1323–34" as the master list recorded. |
| **T1.7** — RBI currency-reserve change | **RESOLVED, and the earlier finding CORRECTED.** Act 38 of 1956 *did* amend s.33(2): Deshmukh's SOR replaces the proportional ratio with absolute minimums (Rs 400cr foreign securities + Rs 115cr gold) expressly to accommodate the Second Plan. India breached even that within 12 months, forcing **Presidential Ordinance No. 6 of 1957 on 31 October 1957** ("Parliament is not in session… immediate action"), which cut the floor to Rs 200cr and deleted the Rs 300cr backstop. TTK's replacement Bill concedes the Bank "cannot comply". |
| **H7** — the 1957 reserve position | **FOUND, and it closes the loop numerically.** TTK, May 1957: reserves "a little below Rs.500 crores", falling "Rs.5 to 6 crores a week", against a Rs.400cr floor → 17–20 weeks to breach. The Ordinance came at week ~22. |
| **B1/B3** — OCR numeral verification | **DONE, and it caught two live errors.** Against the Government's own text at `indiabudget.gov.in`, the UK convertibility limit for Jul 1948–Jun 1949 is **£15m/$60m** (OCR reconstruction said £25m/$100m) and the Apr–Sep 1948 hard-currency deficit is **$45m** (OCR said $145m). Both would have overstated the case in print. |
| **T2.2** — government optimism 1955–56 | **FOUND.** Feb 1956 (Deshmukh): payments *surplus*, sterling balances *rising*, IMF liability nearly repaid, dollar imports being *liberalised*, India a net *contributor* of $53m to the sterling area's central reserve. Eighteen months to "ad infinitum". |
| **U10 / Act I** — the 1948 Budget speech | **FOUND.** Chetty, Feb 1948, on losing full convertibility of Account No. 1: the £10m limit was "**forced upon us**", "very undesirable and harmful"; India had honoured its sterling pledge "**perhaps even beyond the bounds of prudence**". Cross-confirms Matthai's £10m figure. |
| **H6** — CAD 6 Oct 1949, devaluation day 2 | **FOUND** (previous "does not resolve" was transient). Yields a *second* minister — Neogy — stating import policy was bounded by permitted sterling drawings. |
| **H1** — IMF Exchange Restrictions 1957 | **PARTIAL.** Part I + full TOC recovered: **49 countries under Article XIV vs 11 under Article VIII**, India among the 49 — settles T0.1's count from the primary source. The India chapter (printed pp.164–170 ≈ PDF 181–188) is ~10 pages beyond the reachable parse ceiling. |
| **H8, H5** | Still open. Four Dec-1950 sittings eliminated for H8; H5 not found. See `H8_H5_status_and_December1950_search.md`. |

### The negative finding has hardened considerably

**"Sterling" appears zero times** in TTK's Interim Budget speech (Mar 1957), zero times in his final Budget speech (May 1957), zero times in the FERA Bill's Statement of Objects and Reasons (Jul 1957), and "Britain" zero times in the 31 August 1957 Lok Sabha debate. **Four independent 1957 documents by the same minister, none mentioning sterling or Britain.** Meanwhile the sterling constraint is stated explicitly and repeatedly by ministers across 1948–50 (Chetty Feb 1948 and Aug 1948; Matthai Feb 1949 and Oct 1949; Neogy Oct 1949).

The essay must treat these as two separate claims. "Britain constrained India, 1948–50" is now very strongly evidenced from primary sources. "Britain caused the 1957 permanence" is not evidenced in any 1957 government document recovered, and the Government's own stated cause throughout is the Second Five Year Plan's import surge.

### Two durable routes established

1. **`indiabudget.gov.in/doc/bspeech/bs<YYYYYY>.pdf`** — every Union Budget speech back to 1947 in clean official text. Free of OCR error. Supersedes scans for all Budget-speech quotation.
2. **IA metadata queries** (`date`, `description`, `eparlib_document_url` fields) — the way into both the Gazette and eParlib collections.

### Tooling note

**Firecrawl credits were exhausted at the end of this pass.** The IMF PDF was the main consumer (172 credits for one successful parse; further attempts timed out). Budget large-PDF fetches deliberately; prefer official texts, then IA `cors` `_djvu.txt` at 1 credit. WebSearch is a separate tool and unaffected.

---

# S1 Source Hunt — Run Summary (Pass 4)

**Pass 4 note:** worked against a much larger consolidated "Master Search Target List" spanning several unrelated candidate essays (China silver reform, Bombay 1865, Pakistan devaluation, Egypt precedent, Pittman Act, 1869 transport shock, Golden Gimmick, Iraq Development Board, Cabinda, Alexandria vs Cairo, soybean embargo, Aswan/cotton). This project has only ever built context on the **India/AD INFINITUM** essay (that list's Parts 2–3) — Parts 4–5 (other candidates) were left untouched rather than guessed at blind. Pass 4 results below are additions to the existing India-project findings, not a fresh start.

New this pass: B2 (Gazette SOR) — not found, genuine dead end without corpus-wide full-text search. H4/H4b (Rajya Sabha via Wayback) — confirmed dead end, not transient (Wayback has *never* crawled `rsdebate.nic.in`). H1 (IMF TOC) — not resolved. H5 (White Paper) — not found, but a strong adjacent primary source surfaced (Bank of England's own unpublished WWII history chapter, "India's Sterling Balances"). H8 (1951 agreement text) — largely already covered by the existing T2.1 finding; one adjacent paper fetched didn't add to it. See `B2_Gazette_26Jul1957_SOR.md`, `H4_H4b_Rajya_Sabha_Wayback_retry.md`, `H1_H5_H8_status.md`.

Run date: 2026-08-17. Tooling used: WebSearch (Anthropic-hosted), Firecrawl (`firecrawl_search`, `firecrawl_scrape`, `firecrawl_agent`). Direct `WebFetch` to external domains (cambridge.org, parliament.uk, imf.org, history.state.gov, etc.) is blocked by this session's network egress policy — Firecrawl routed around this successfully in every case it was tried. A background agent (Opus) completed T1.3 (eparlib/Sansad/rsdebate legislative sweep) and its full write-up is now folded in — see `T1.3_legislative_sterling_sweep.md`, the single richest file in this project.

## 🏆 T1.3 IS THE BIGGEST FIND OF THE PROJECT SO FAR

The background agent discovered that eParlib's entire 387,743-item corpus — including all 169 Constituent Assembly (Legislative) sitting-day volumes, 1947–49 — is mirrored on the Internet Archive, unlocking the pre-1952 corpus that had never been searched. Headlines:

- **A named two-day debate nobody had found**: "Failure of Government to secure Protection against scaling down of Sterling Balances" (12–13 Aug 1948), plus two Starred Questions with ministerial answers, plus a rich 5 Oct 1949 devaluation debate. The opposition-side sterling-pressure claim **no longer rests on Bhupesh Gupta alone** — Finance Ministers Chetty (1948) and Matthai (1949, 1950) said it themselves, on the floor: *"beginning from January 1948 the United Kingdom refused to carry this responsibility any further and insisted on limiting the convertibility of our sterling very rigidly… these limits bear no relation whatever to our needs."*
- **But a major negative finding for the 1957 causal claim**: TTK's own 31 August 1957 motion and speech — read in full — contains **zero occurrences of "Britain"** and gives permanence's rationale as (i) world trade never stabilised, (ii) "the shortage of foreign exchange is likely to continue ad infinitum," (iii) the Five Year Plan. The essay must treat "Britain constrained India, 1948–50" and "Britain caused 1957 permanence" as two separate claims — the second does not currently have 1957-record support and cannot free-ride on the first.
- Bhupesh Gupta's Rajya Sabha speech is now precisely citable (Vol. 18, 6 Sept 1957, pp. 3928–3954) even though the text itself remains unreachable (rsdebate.nic.in migrated to sansad.in; Wayback was down during the run).
- A reusable method for the whole pre-1952 corpus is documented in the file's "Reusable method" section — this is a durable unlock for any future pass, not a one-off.

## ⚠️ FLAGGED CONDITIONS — READ FIRST

1. **T0.1's kill/weaken condition appears to fire, in a nuanced way.** The IMF's own 1957 *Annual Report* states directly: *"Most countries still maintain exchange restrictions, and during the last year no member of the Fund ceased to avail itself of its postwar transitional arrangements applied under Article XIV"* — 49 of roughly 60 members still under Article XIV as of January 1957, zero graduations that year. **Framing B needs to be narrowed** to the reserve-currency core (sterling, EPU Europe), not stated as a general claim about Fund membership. Detail in `T0.1_IMF_Article_XIV.md`.

2. **NEW — the "Britain engineered the 1957 IMF drawings" claim, attributed throughout the brief to Avaro, was not found in Avaro's own paper (read in full) or in the FRUS documents checked.** This has now failed to turn up twice (T0.1's pass and T1.4's pass, independently). Treat as an open sourcing gap, not a settled fact, until the published (paywalled) 2024 JEH version of Avaro's paper is checked directly. Detail in `T1.4_1957_IMF_drawings.md`.

3. **NEW — a likely date error in the essay's existing framing of the RBI Act reserve-backing change.** The Rs 200cr/Rs115cr minimum-reserve floor was fixed by **Act 48 of 1957 (w.e.f. 31 October 1957)**, not by an October 1956 amendment as commonly stated (including, apparently, in this project's own working assumption). Act 38 of 1956 (6 Oct 1956) amended *different* provisions (the Bank's business/exchange-operations clause, the foreign-securities-suspension mechanism, and scheduled-bank CRR). This may actually *strengthen* the "no remaining options" argument (the floor was fixed the same year as the crisis, not the year before) but the essay's date needs fixing either way. Detail in `T1.7_RBI_Act_1956_amendment.md`.

4. **NEW — the No. 2 Account's June 1957 expiry was an amicable, mutually-agreed technical wind-down, not a dramatic release of blocked money.** RBI's own institutional history describes it as scheduled since the 1949–51 agreement, explicitly tied to India's *own* new currency-reserve provisions making the mechanism redundant, ending with a press release affirming India's "right to draw upon its sterling balances." If the essay's counterfactual (G1) imagined a large blocked sum becoming available right when needed, that framing is not well supported — the essay should either find an actual residual-balance figure (RBI *Report on Currency and Finance*, not yet fetched) or reframe the counterfactual. Detail in `T2.1_No2_Account_June1957.md`.

## Status table

| ID | Status | Confidence | Changes the essay? | Blocking anything? |
|---|---|---|---|---|
| T0.1 IMF Article XIV / Exchange Restrictions | PARTIAL | STATED (numeric backbone) / OPEN (India country-chapter text, blocked-sterling attribution) | **Yes — flagged condition 1.** | India country-chapter quotes from *Annual Report on Exchange Restrictions* (Eighth/Ninth) and IMF Archives SM/56–57 still needed. |
| T0.2 World-normalisation timeline | FOUND | STATED (1955, via Hansard) / CONVERGENT (1958 Treasury statement, EPU dissolution) | Yes — pins "Feb 1955" to 24 Feb 1955, with column reference. | No |
| T0.3 Sterling-area comparators | PARTIAL | CONVERGENT (all cells) | Yes — literal KILL CONDITION does not fire; NZ/South Africa bonus comparators undercut the outlier framing if added. | Judgment call flagged, not resolved. |
| T1.1 Cripps memorandum, April 1949 | FOUND | STATED (file-level TNA:T236/4412 via Abreu) | Yes — converts §4.5's causal joint from hearsay to a sourced archival reference. | No |
| T1.2 Matthai June 1949 revocation | PARTIAL | CONVERGENT (RBI's own institutional history, directly fetched) | Yes — now precisely dated and scoped ("revoked all Open General Licences for soft currency imports," not a vague "dollar import licence"), and closes the causal chain from T1.1's Cripps memorandum through to the August 1949 settlement. | Matthai's own words (vs. the RBI historian's account of him) still not located. |
| T1.3 Legislative sterling sweep | **FOUND — biggest find in the project.** See 🏆 above. | STATED | **Yes, in two directions at once.** | Outstanding: CAD 6 Oct 1949 (indexed, won't resolve on IA), Rajya Sabha 6 Sept 1957 text, 1948 budget session (dark on mirror), the White Paper on Sterling Balances Negotiations itself. |
| T1.4 1957 IMF drawings from the Fund's side | PARTIAL | STATED (drawings figures, independently corroborated via FRUS) / OPEN (British-engineering claim) | **Yes — flagged condition 2.** | Needs published Avaro (2024) or BoE Archive OV-series to resolve. |
| T1.5 Import Trade Control Handbook / FERA double-gate | PARTIAL | OPEN | No — the brief's suggested cross-check case (*East India Commercial Co.*) was read in full and does **not** address this question; eliminated as a lead. | Genuine open question, unresolved either direction. |
| T1.6 Schenk/Kennedy secondary literature | FOUND (citations) | STATED (citations) / OPEN (Newton full text, paywalled) | Yes — also produced a second independent citation into T2.10's restricted Symons memo (see below). | Milward/Tomlinson not yet searched. |
| T1.7 RBI Act 1956 currency-backing amendment | FOUND | STATED | **Yes — flagged condition 3.** | No |
| T2.1 No. 2 Account balance, 30 June 1957 | FOUND (date), but complicates the counterfactual | STATED | **Yes — see flagged condition 4 below.** | Actual residual-balance figure still needs RBI *Report on Currency and Finance*. |
| T2.2 Government optimism 1955-56 | NOT ATTEMPTED | -- | -- | -- |
| T2.3 Amendments negatived on 1957 Bill | FOUND (negative result) | STATED | Yes -- no date-substitution amendment was ever moved; Clause 1 passed silently, unamended. | No |
| T2.4 Enforcement Unit establishment date | FOUND | STATED | Yes -- pins 1 May 1956, from the Directorate's own history page. | No |
| T2.5-T2.9 | NOT ATTEMPTED | -- | -- | Tier 2 mostly untouched. |
| T2.10 Symons 1972 TNA memorandum | **PARTIAL -- mostly closed as a side-effect of T1.6.** | CONVERGENT (two independent scholarly citations, pp.78 and pp.96-8) | Yes -- directly supports the essay's causal claim: "India's experience with blocking led to its subsequent diversification." | Only a verbatim Symons quotation (vs. paraphrase) remains open. |

## What still isn't reachable without a real browser

- **rsdebate.nic.in, eparlib.sansad.in** — being attempted now by the background agent (Firecrawl + Internet Archive fallback); if that also fails, this genuinely needs the `browser-use` skill / an interactive Playwright session, which has not been invoked yet in this project.
- **archivescatalog.imf.org** (IMF Archives, SM/56–57 series), **Horsefield Vol. II**, **BoE Archive** (`bankofengland.co.uk/archive`) — not attempted.
- **TNA Discovery** direct catalogue search — not attempted (Abreu's paper supplies file references second-hand instead).

## Firecrawl credit usage note

One costly failed call from Pass 1: `firecrawl_scrape` in `query`/`directQuote` mode on the 388-page Eighth Annual Report on Exchange Restrictions PDF consumed **392 credits** and returned nothing. Avoided in Pass 2. Plain `markdown` scrapes of large PDFs/pages work reliably but sometimes exceed the harness's token-return limit and get saved to a file — pipe those through Bash/Python (decode `\n` escapes, then search) rather than the Read tool.

## Files in this folder

Finding blocks: `T0.1_IMF_Article_XIV.md`, `T0.2_world_normalisation_timeline.md`, `T0.3_comparators.md`, `T1.1_cripps_memorandum.md`, `T1.2_Matthai_June1949_revocation.md`, `T1.4_1957_IMF_drawings.md`, `T1.5_import_trade_control_handbook.md`, `T1.7_RBI_Act_1956_amendment.md`. (`T1.3_legislative_sterling_sweep.md` pending from the background agent.)

`primary_docs/` — full-text captures of every primary/secondary source actually fetched:
- `Hansard_1955-03-01_Transferable_Sterling.md` (primary, HC Deb)
- `IMF_Annual_Report_1957_FULLTEXT.md` (primary, IMF)
- `FRUS_1955-57_v08_Docs166-167.md` (primary, US State Dept)
- `RBI_Act_1934_as_amended_FULLTEXT.md` (primary, India Code)
- `EastIndiaCommercial_v_CollectorOfCustoms_1962_FULLTEXT.md` (primary, Supreme Court of India — checked and eliminated as a T1.5 lead)
- `Abreu_2017_India_as_a_Creditor_Sterling_Balances_FULLTEXT.md` (secondary, cites TNA files)
- `Avaro_2020_Zombie_International_Currency_FULLTEXT.md` (secondary, cites TNA/BoE/CBI files)

## Recommended next pass

1. Wait for the T1.3 background agent; fold its output in, then decide whether T1.2 (Matthai) can be closed from the same corpus before re-searching independently.
2. Close T0.1 properly: needs a page-targeted fetch of the Eighth/Ninth Annual Report on Exchange Restrictions India country chapter (388-page doc, blind scraping too costly — find the page number first, e.g. via the doc's own table of contents page).
3. Resolve the Avaro "Britain engineered the drawings" gap (flagged condition 2) — try to obtain the published 2024 JEH text, or downgrade/drop the claim.
4. T1.5: fetch the full 1952 Calcutta Gazette OCR text (`archive.org/stream/in.ernet.dli.2015.40377/...`) — promising unexplored lead.
5. T1.6 (Schenk/Kennedy secondary literature) not yet attempted at all — straightforward WebSearch/Firecrawl task for a future pass.
6. T2.x entirely untouched.
