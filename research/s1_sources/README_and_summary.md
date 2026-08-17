# S1 Source Hunt — Run Summary (Pass 1)

Run date: 2026-08-17. Tooling used: WebSearch (Anthropic-hosted), Firecrawl (`firecrawl_search`, `firecrawl_scrape`, `firecrawl_agent`). Direct `WebFetch` to external domains (cambridge.org, parliament.uk, imf.org) is blocked by this session's network egress policy — Firecrawl routed around this successfully in every case it was tried.

## ⚠️ FLAGGED CONDITION — READ FIRST

**T0.1's kill/weaken condition appears to fire, in a nuanced way.** The brief states: *"If the 1957 or 1958 reports show a large majority of Fund members still maintaining Article XIV restrictions with no sign of imminent normalisation, the 'India diverged from a normalising world' framing weakens badly."* The IMF's own 1957 *Annual Report* states directly: *"Most countries still maintain exchange restrictions, and during the last year no member of the Fund ceased to avail itself of its postwar transitional arrangements applied under Article XIV"* — with 49 of roughly 60 members still under Article XIV as of January 1957, and **zero** graduations that year. This is not a full kill (T0.2's dates for sterling/EPU convertibility are independently solid), but **Framing B needs to be narrowed**: the "normalising world" claim holds for the reserve-currency core (sterling, EPU Europe, dated 1955/1958) but is directly contradicted by the Fund's own report if stated as a general claim about Fund membership at large. Full detail and a suggested rewrite are in `T0.1_IMF_Article_XIV.md`.

This is not the "Objection 1 becomes fatal" kill condition (no evidence the Fund pressed India *toward* permanence was found), but it is a required edit before Framing B can be used as currently worded.

## Status table

| ID | Status | Confidence | Changes the essay? | Blocking anything? |
|---|---|---|---|---|
| T0.1 IMF Article XIV / Exchange Restrictions | PARTIAL | STATED (numeric backbone) / OPEN (India country-chapter text, blocked-sterling attribution) | **Yes — see flagged condition above.** Narrows Framing B. | Yes — India-specific country-chapter quotes from the *Annual Report on Exchange Restrictions* (Eighth/Ninth) and IMF Archives SM/56–57 still needed before T0.1 can close. |
| T0.2 World-normalisation timeline | FOUND | STATED (1955 date, via Hansard) / CONVERGENT (1958 Treasury statement wording, EPU dissolution) | Yes — pins "Feb 1955" to the precise 24 Feb 1955 Commons statement, with column reference. | No |
| T0.3 Sterling-area comparators | PARTIAL | CONVERGENT (all cells) | Yes — literal KILL CONDITION does not fire, but NZ/South Africa (bonus comparators) undercut the "India is an outlier" framing if added to the table. Recommend keeping table to original 3 (Pakistan/Ceylon/Australia). | No, but needs a judgment call from whoever finalises the essay (flagged, not resolved, in the T0.3 file) |
| T1.1 Cripps memorandum, April 1949 | FOUND | STATED (file-level TNA:T236/4412 citation via Abreu) | Yes — converts the causal joint at §4.5 from hearsay to a sourced archival reference, independent of Balachandran. | No |
| T1.2–T1.7, T2.1–T2.10 | NOT ATTEMPTED this pass | — | — | Tier 1/2 not started; Tier 0 was not fully exhausted (T0.1 country-chapter detail outstanding), so per the brief's own sequencing rule ("do not start Tier 1 until every Tier 0 target has been either found or exhausted") this is compliant, but incomplete. |

## What was NOT reachable in this pass, and why

- **rsdebate.nic.in, eparlib.sansad.in** — flagged in the brief as browser-only / scraping-blocked. Not attempted via a real browser in this pass (no interactive browser session was driven). This blocks all of T1.3 (the highest-upside item in Tier 1, per the brief) and T2.3.
- **archivescatalog.imf.org** (IMF Archives, SM/56–57 series) — not attempted.
- **TNA Discovery** direct catalogue search — not attempted (Abreu's paper supplied file references second-hand instead; a direct TNA Discovery search could still add the memorandum's own catalogue description).
- **India Code** (`indiacode.nic.in`) — not attempted (relevant to T1.7, T2.5).
- **Horsefield Vol. II** — not fetched (relevant to T0.1's completion).

## Firecrawl credit usage note

One costly failed call: `firecrawl_scrape` in `query`/`directQuote` mode on the 388-page Eighth Annual Report on Exchange Restrictions PDF consumed **392 credits** and returned nothing ("query generation failed after all models"). Plain `markdown` scrapes of large PDFs work but return content that must be piped through Bash/Python to unescape and search (the harness's Read tool token-limits on files this large). Recommend future passes avoid `query` format on PDFs over ~100 pages.

## Files in this folder

- `T0.1_IMF_Article_XIV.md`, `T0.2_world_normalisation_timeline.md`, `T0.3_comparators.md`, `T1.1_cripps_memorandum.md` — finding blocks in the brief's required format.
- `primary_docs/` — full-text captures of every primary/secondary source actually fetched this pass:
  - `Hansard_1955-03-01_Transferable_Sterling.md` (primary, HC Deb)
  - `IMF_Annual_Report_1957_FULLTEXT.md` (primary, IMF)
  - `Abreu_2017_India_as_a_Creditor_Sterling_Balances_FULLTEXT.md` (secondary, cites TNA files)
  - `Avaro_2020_Zombie_International_Currency_FULLTEXT.md` (secondary, cites TNA/BoE/CBI files)

## Recommended next pass

1. Close T0.1 properly: Eighth/Ninth Annual Report on Exchange Restrictions India country chapter (needs a page-targeted fetch — the doc is 388 pages, blind scraping is too costly); IMF Archives SM/56–57; Horsefield Vol. II.
2. T1.3 (Constituent Assembly / Lok Sabha / Rajya Sabha sweeps) requires actual browser automation (the `browser-use` skill / Playwright), not just Firecrawl/WebSearch — this is the single highest-upside item still untouched.
3. T1.4 (IMF drawings from the Fund's side, Britain "engineering" the 1957 drawings) — note: this specific claim was **not** found in the Avaro paper actually fetched this pass, despite being attributed to "Avaro" throughout the brief. Either it is in a different/later version of her paper (published JEH 2024, paywalled) or a different work entirely (her PhD thesis?). This needs to be resolved before the essay leans on it further — flag as OPEN, not CONFIRMED.
