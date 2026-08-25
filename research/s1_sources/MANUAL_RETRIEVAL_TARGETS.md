# Manual retrieval list — what I need from you, with exact links

Everything below defeated automated retrieval for a **specific, diagnosed reason** (stated in each
entry, so you know it's not worth me retrying blind). Ranked by what it would actually do for the
essay. If you can get any of these to markdown — browser download, then any PDF→MD converter, or
just copy-paste the text — hand it back and I'll analyse it.

**Format that works best for me:** plain text or markdown. If it's a scan, OCR is fine but flag it,
because IA-style OCR drops leading digits (this project has already been bitten twice: "1949"→"949",
"£1,169m"→"£169m"). Prose survives OCR; **numerals must be verified against the printed page.**

---

## TIER A — would change what the essay can claim

### A1. Rajya Sabha, 6 September 1957 — the FERA debate (Bhupesh Gupta)
**This is the single largest gap in the whole project's primary record.**

```
https://rsdebate.nic.in/bitstream/123456789/572037/2/ID_18_06091957_17_p3928_p3954_5.pdf
```
Rajya Sabha Vol. 18, 6 Sept 1957, pp. 3928–3954.

**Why automation fails:** all Firecrawl engines fail on the host; **Wayback has never crawled it** —
verified this run by API, `{"archived_snapshots": {}}`, not merely assumed; `elibrary.sansad.in`'s
DSpace API returns zero 1957 FERA hits under every collection scope tried. It *is* indexed by search
engines, so the URL is live — it should simply open in a browser.

**Why it matters:** every other 1956–57 government document checked (seven now) gives non-British
reasons for exchange control. The upper house had longer speeches and more sceptical members, and
Bhupesh Gupta (CPI) is on record elsewhere calling the sterling balances a "forced accumulation" by
the British. **If a Britain/sterling justification for permanence survives anywhere, it is here.**
This is the decisive test of the essay's original thesis.

I recovered exactly one line through a search index — *"The Foreign Exchange Regulation Act, 1947,
is a temporary Act due to expire on the 31st December, 1957."* — which confirms the sitting is the
right one and that Gupta spoke, but establishes nothing about his argument.

**Also worth grabbing while you're on the site** (same session, adjacent sittings):
```
https://rsdebate.nic.in/bitstream/123456789/572013/2/ID_18_02091957_13_p2850_p2953_5.pdf   (2 Sept 1957)
```

### A2. IMF AREAER 1955 and 1956 — India chapters
```
1955 (Sixth):  https://www.elibrary.imf.org/downloadpdf/display/book/9781475548662/9781475548662.pdf
```
391 pp., 33.5 MB, ISBN 9781475548662. The 1956 (Seventh) edition is 371 pp.; find its ISBN at
`https://www.elibrary.imf.org/subject/012` and use the same URL pattern.

**Why automation fails — diagnosed precisely this run:** the whole file must download before any
page parses, and 33.5 MB does not complete inside the tool's hard 60-second timeout. **A 12-page
parse timed out exactly like a 183-page one.** No `maxPages` setting can ever work. The eLibrary
record also states "This publication is available in PDF format only" — there is no chapter-XML
shortcut like the one that worked for the 1957 Summary Proceedings.

**Free, no login, one click in a browser.** India's chapter should sit near printed **pp. 160–175**
(the 1957 edition put India at pp. 164–170).

**What I need from it — two specific things:**
1. **The pre-abolition basic travel allowance figure.** I have the abolition (nil, from 1 Jan 1957);
   I don't have what it was *before*. That figure would complete the BTQ chain in
   `BTQ_and_the_reserve_constraint.md` and give the essay a real number for the ordinary traveller.
2. **Whether 1955/56 show a more optimistic picture** than 1957 — Target 1.1, the "relaxation
   premise." Right now the essay assumes 1955–58 showed genuine easing; this would document it.

### A3. IMF AREAER 1958 (Ninth) and 1959 (Tenth) — India chapters
Same pattern; ISBNs findable at `https://www.elibrary.imf.org/subject/012`.
**What I need:** when the basic travel allowance was **restored** after 1 Jan 1957, and how the Fund
described India's position *after* FERA permanence and the RBI Ordinance. No source in the project
currently covers the aftermath.

---

## TIER B — would close open evidential gaps

### B1. Pakistan Act 1 of 1952 — the amending Act's own text
The Foreign Exchange Regulation (Amendment) Act, **1 of 1952**, **section 2** — the provision that
omitted Pakistan's sunset clause.

**Why automation fails:** targeted searches on the Act's title, number and operative section return
**zero results**. The Pakistan Code does not appear to expose pre-1958 amending Acts in any
web-reachable form. This will not yield to more searching.

**Where to try:** `pakistancode.gov.pk` (blocked to me, may work for you); a Pakistani law library;
or the *Gazette of Pakistan* 1952. **What I have** is two consolidated texts with editorial
footnotes — and they are *not* independent, since Bangladesh inherited Pakistan's statute book. The
Pakistan comparative is one of Classic's strongest pieces and currently rests on a footnote.

### B2. NAC records — the 1957 US Treasury argument on IMF drawing rights
**National Advisory Council on International Monetary and Financial Problems**, 1957.

**Why automation fails:** FRUS doesn't reproduce NAC minutes. I searched FRUS Vol. VIII's complete
India chapter (Docs 143–184, read 165/166/167) — **no Treasury argument about the
gold-vs-sterling-vs-dollar subscription split exists there.** Treasury's recorded position in FRUS
is about aid appropriations only.

**Two concrete leads I turned up:**
- **"The Economic Problem of India"** — report of the Interdepartmental Working Group on India
  (State/Treasury/ICA), completed **2 May 1957**, at the Washington National Records Center,
  **ICA Director's File: FRC 61 A 32**.
- NAC itself — Doc 149's editorial note records that an identical letter went to **George M.
  Humphrey, Chairman, NAC on International Monetary and Financial Problems**.

**Why it matters:** this claim currently rests on **Balachandran alone**, and I could not corroborate
it. Until it is, the essay must not present it as independently sourced.

### B3. Panagariya, *India: The Emerging Giant* (2008) — the pillars question
**Why automation fails:** not available in full text anywhere reachable (ResearchGate and Scribd
listings only, no readable body text).

**What I need:** the passages on **how the different control mechanisms interacted** — industrial
licensing, import licensing, exchange control, Controller of Capital Issues — not each in isolation.
This is Target 1.4: whether any scholar ranks FERA as functionally load-bearing for the other
pillars. Two findings already point *away* from that (exchange allocation was decided by a
Finance-chaired interdepartmental committee with the RBI as one voice among several; and the control
machinery predates FERA by seven years), so if Panagariya agrees, the essay should scale the
"chief enabler" claim down explicitly rather than quietly.

**Chapter to target:** the early-chapters treatment of the 1950s–60s control regime, roughly
pp. 444–51 per a citation I found.

---

## TIER C — your own local files, which I genuinely cannot see

The T2 brief referenced these as already in the project. **They are on your Mac, not in this repo** —
I have no access to that folder, so I worked around them. If you paste them in, they'd let me
verify rather than infer:

| File | What I'd use it for |
|---|---|
| `S1_Evidence_Comb_Findings.md` | the exact format/numbering to match, and what Locks A/B already say verbatim |
| `c1019.md` (Bhagwati, *Foreign Trade Regimes*) | Target 0.2 capital-goods licensing procedure; and the exact dating of the non-convertibility rationale becoming "inoperative in the 1950s" (Target 1.1) |
| Balachandran, RBI history vol. (1951–67) | the original double-gate passage that prompted the T2 brief; plus BTQ-era material my Vol. 1 doesn't reach |
| Kamtekar | the five-pillars framing, to check I'm not misstating it |

**Note on the RBI history volume number** — flagged in your own session notes as a citation trap and
still unresolved: the 1951–67 volume presents itself as **Volume 2**, but your working guide calls it
Volume 3. Settle this before citing. What I retrieved this run is unambiguously **Volume 1** (the
founding-to-1951 volume, 915 pp.).

---

## What I do NOT need

So you don't waste effort — these are done and in the repo:

- RBI *Exchange Control Manual* Ch. 7 (the primary regulatory text) — **retrieved in full**
- RBI official history **Vol. 1** Ch. 20 — **retrieved in full**
- IMF AREAER **1957** India chapter — retrieved (earlier pass)
- GATT L/648/Add.1 and **L/719** — retrieved in full
- Deshmukh's 14 Feb 1952 FERA debate — retrieved in full
- TTK's Sept 1957 IMF Annual Meeting statement — retrieved in full
- Pakistan FERA *consolidated* text — retrieved (it's the *amending Act* I still need, B1)
- FRUS Vol. VIII Docs 165, 166, 167 — retrieved
- All four Budget speeches 1948–57, the 1948/1949 Constituent Assembly sterling debates, both 1957
  Lok Sabha FERA sittings, the FERA Bill SOR, RBI Ordinance 6 of 1957, Ordinance X of 1951
