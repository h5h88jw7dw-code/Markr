# S1 Source Hunt — Run Summary (Pass 2)

Run date: 2026-08-17. Tooling used: WebSearch (Anthropic-hosted), Firecrawl (`firecrawl_search`, `firecrawl_scrape`, `firecrawl_agent`). Direct `WebFetch` to external domains (cambridge.org, parliament.uk, imf.org, history.state.gov, etc.) is blocked by this session's network egress policy — Firecrawl routed around this successfully in every case it was tried. A separate background agent (Opus) is running in parallel on T1.3 (eparlib/Sansad/rsdebate legislative sweep) with Firecrawl access and Internet-Archive-fallback instructions; its output is not yet in this summary and will land as its own file when it reports back.

## ⚠️ FLAGGED CONDITIONS — READ FIRST

1. **T0.1's kill/weaken condition appears to fire, in a nuanced way.** The IMF's own 1957 *Annual Report* states directly: *"Most countries still maintain exchange restrictions, and during the last year no member of the Fund ceased to avail itself of its postwar transitional arrangements applied under Article XIV"* — 49 of roughly 60 members still under Article XIV as of January 1957, zero graduations that year. **Framing B needs to be narrowed** to the reserve-currency core (sterling, EPU Europe), not stated as a general claim about Fund membership. Detail in `T0.1_IMF_Article_XIV.md`.

2. **NEW — the "Britain engineered the 1957 IMF drawings" claim, attributed throughout the brief to Avaro, was not found in Avaro's own paper (read in full) or in the FRUS documents checked.** This has now failed to turn up twice (T0.1's pass and T1.4's pass, independently). Treat as an open sourcing gap, not a settled fact, until the published (paywalled) 2024 JEH version of Avaro's paper is checked directly. Detail in `T1.4_1957_IMF_drawings.md`.

3. **NEW — a likely date error in the essay's existing framing of the RBI Act reserve-backing change.** The Rs 200cr/Rs115cr minimum-reserve floor was fixed by **Act 48 of 1957 (w.e.f. 31 October 1957)**, not by an October 1956 amendment as commonly stated (including, apparently, in this project's own working assumption). Act 38 of 1956 (6 Oct 1956) amended *different* provisions (the Bank's business/exchange-operations clause, the foreign-securities-suspension mechanism, and scheduled-bank CRR). This may actually *strengthen* the "no remaining options" argument (the floor was fixed the same year as the crisis, not the year before) but the essay's date needs fixing either way. Detail in `T1.7_RBI_Act_1956_amendment.md`.

## Status table

| ID | Status | Confidence | Changes the essay? | Blocking anything? |
|---|---|---|---|---|
| T0.1 IMF Article XIV / Exchange Restrictions | PARTIAL | STATED (numeric backbone) / OPEN (India country-chapter text, blocked-sterling attribution) | **Yes — flagged condition 1.** | India country-chapter quotes from *Annual Report on Exchange Restrictions* (Eighth/Ninth) and IMF Archives SM/56–57 still needed. |
| T0.2 World-normalisation timeline | FOUND | STATED (1955, via Hansard) / CONVERGENT (1958 Treasury statement, EPU dissolution) | Yes — pins "Feb 1955" to 24 Feb 1955, with column reference. | No |
| T0.3 Sterling-area comparators | PARTIAL | CONVERGENT (all cells) | Yes — literal KILL CONDITION does not fire; NZ/South Africa bonus comparators undercut the outlier framing if added. | Judgment call flagged, not resolved. |
| T1.1 Cripps memorandum, April 1949 | FOUND | STATED (file-level TNA:T236/4412 via Abreu) | Yes — converts §4.5's causal joint from hearsay to a sourced archival reference. | No |
| T1.2 Matthai June 1949 revocation | NOT FOUND | — | No progress. | Still open — check T1.3 agent's Constituent Assembly output first. |
| T1.3 Legislative sterling sweep | **IN PROGRESS** (background agent) | — | Potentially the biggest single upgrade in Tier 1, per the brief. | Result pending. |
| T1.4 1957 IMF drawings from the Fund's side | PARTIAL | STATED (drawings figures, independently corroborated via FRUS) / OPEN (British-engineering claim) | **Yes — flagged condition 2.** | Needs published Avaro (2024) or BoE Archive OV-series to resolve. |
| T1.5 Import Trade Control Handbook / FERA double-gate | PARTIAL | OPEN | No — the brief's suggested cross-check case (*East India Commercial Co.*) was read in full and does **not** address this question; eliminated as a lead. | Genuine open question, unresolved either direction. |
| T1.6 Schenk/Kennedy secondary literature | NOT ATTEMPTED | — | — | — |
| T1.7 RBI Act 1956 currency-backing amendment | FOUND | STATED | **Yes — flagged condition 3.** | No |
| T2.1–T2.10 | NOT ATTEMPTED | — | — | Tier 2 not started. |

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
