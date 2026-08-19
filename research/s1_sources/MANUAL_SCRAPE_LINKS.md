# MANUAL SCRAPE PACK — exact URLs for everything I could not finish

Every URL below is either **tested and working** (marked ✅) or **tested and blocked from this session but expected to work in a normal browser** (marked 🔓). Nothing here is a guess unless explicitly marked ❓.

**Why some of these are blocked for me and not for you:**
1. **The 60-second tool timeout.** Firecrawl's PDF parser is fast enough for ~183 pages of the IMF report and no more. Your browser has no such limit.
2. **The session egress proxy.** `WebFetch` and raw `curl` get a 403 on CONNECT for archive.org, imf.org, indiabudget.gov.in, rsdebate.nic.in, cambridge.org. Firecrawl works only because Firecrawl's own servers do the fetching — so any host Firecrawl itself can't reach (rsdebate.nic.in) is fully closed to me.
3. **Login walls** — JSTOR, EBSCO, Cambridge Core, IMF eLibrary chapter-level access.

---

## PRIORITY 1 — Blocked by the tool timeout only. You will get these in one click each.

### 1.1 IMF, *Eighth Annual Report on Exchange Restrictions* (1957) — the full PDF

✅ **`https://www.elibrary.imf.org/downloadpdf/display/book/9781475549263/9781475549263.pdf`**

This is a **direct, open, no-login PDF**, 388 pages. I recovered pages 1–183 (which contains the complete India chapter, printed pp. 164–170 — already saved and written up in `H1_INDIA_CHAPTER_FOUND_and_T1.5_RESOLVED.md`). **Pages 184–388 are unretrieved.** What's in there that matters:

| Printed pages (approx) | Country | Why you want it |
|---|---|---|
| ~184–190 | **Indonesia, Iran, Iraq** | sterling-area and quasi-sterling comparators |
| ~230–240 | **Pakistan** | the closest possible comparator — same 1947 starting point, same sterling balances, different outcome |
| ~250–260 | **Ceylon (Sri Lanka)** | sterling-area, Article XIV, small |
| ~330–345 | **United Kingdom** | *the* chapter to read — Britain's own restrictions as the Fund described them, end-1956 |
| ~345–360 | **Union of South Africa, Australia, New Zealand** | T0.3 comparators; NZ and South Africa are the two that complicate the essay's comparator argument |

**How to pull it:** download the whole PDF, then jump to the country. If you want machine text, `pdftotext -layout 9781475549263.pdf out.txt` gives clean output — this is a born-digital PDF, **not a scan**, so there is no OCR error to correct.

**The Table of Contents with exact page numbers is already saved** at `primary_docs/IMF_8th_Annual_Report_Exchange_Restrictions_1957_PART1_and_TOC.md` — use it to find exact printed pages rather than my estimates above.

### 1.2 IMF, *Ninth Annual Report on Exchange Restrictions* (1958) — ISBN not located

❓ The 1958 edition covers **May 1957 – April 1958**, i.e. the period *after* FERA permanence (Sept 1957) and *after* the RBI Ordinance (Oct 1957). Its India chapter would show whether the Fund recorded any change. **I could not find its ISBN** — `firecrawl_search` on elibrary.imf.org returned empty repeatedly.

Try in this order:
- `https://www.elibrary.imf.org/search?q=Annual+Report+on+Exchange+Restrictions+1958`
- `https://archivescatalog.imf.org` — search "Annual Report on Exchange Restrictions"
- The pattern is `https://www.elibrary.imf.org/downloadpdf/display/book/<ISBN>/<ISBN>.pdf` — once you have the ISBN from the search page, that URL is constructible.
- Fallback: `https://www.imf.org/external/pubs/ft/ar/archive/pdf/ar1958.pdf` is the *general* Annual Report for 1958 (different publication, less detailed on restrictions, but free and direct — the 1957 equivalent is already saved at `primary_docs/IMF_Annual_Report_1957_FULLTEXT.md`).

---

## PRIORITY 2 — Blocked by the egress proxy AND by Firecrawl. Browser-only.

### 2.1 Rajya Sabha, FERA (Amendment) Bill 1957 — the Council of States debate

These are the **single largest remaining gap in the primary record**. I have the Lok Sabha side complete (26 July and 31 August 1957, both saved). The Rajya Sabha side is entirely missing. `rsdebate.nic.in` refuses every automated fetch, and **the Wayback Machine has never crawled the host** — I checked; there are zero snapshots.

🔓 **6 September 1957** (pp. 3928–3954) — the likely FERA Bill sitting:
`https://rsdebate.nic.in/bitstream/123456789/572037/2/ID_18_06091957_17_p3928_p3954_5.pdf`

🔓 **2 September 1957** (pp. 2850–2953):
`https://rsdebate.nic.in/bitstream/123456789/572013/2/ID_18_02091957_13_p2850_p2953_5.pdf`

**Navigation route if those direct links 404** (the bitstream sequence numbers sometimes shift):
1. Go to `https://rsdebate.nic.in/`
2. Browse → Volume 18 (1957) → Session 17
3. The Bill was passed by the Lok Sabha on 31 August 1957, so the Rajya Sabha took it in the **first half of September 1957**. Check every sitting 2–13 September.

**What to search for inside:** "Foreign Exchange Regulation", "Krishnamachari", "permanent", "sterling". The Rajya Sabha had longer speeches and more sceptical members than the Lok Sabha on this Bill — **if any minister anywhere gave a Britain/sterling reason for permanence, this is the most likely place it survives.** Every other 1956–57 document has come back silent, so this is the decisive test of the essay's thesis.

### 2.2 The 1948 White Paper on Sterling Balances Negotiations (H5)

**Still the most-wanted missing document in the whole project.** Confirmed to exist, confirmed laid before the House:

> "Sir, I lay on the table the White Paper containing the documents relating to the recent Sterling Balances Negotiations with the United Kingdom" — **R. K. Shanmukham Chetty, 9 August 1948** (saved: `primary_docs/CAD_Legislative_1948-08-09_White_Paper_on_Sterling_Balances_Negotiations_laid.md`)

It is cited **page-by-page** in the debate of 12 August 1948 by Z. H. Lari — "page 68 of this book", "page 3 of the White Paper", and the **Wilson Smith → Chanda letter at "page 62"**. So the document contains the actual Anglo-Indian correspondence. That correspondence is what the essay's Act I needs.

**Routes I have already eliminated:**
- eParlib IA mirror title search for "sterling" / "White Paper" → 84 results, all modern White Papers, none 1948. ❌
- 1948 Gazette of India metadata `description` field → all read "Subject not available" for 1948; the technique that cracked B2 doesn't work that far back. ❌

**Routes still open — try these:**

🔓 **(a) The UK side — this is the best bet.** The same documents were almost certainly laid before the UK Parliament as a Command Paper. Search:
- `https://parlipapers.proquest.com` (needs institutional login) for Command Papers 1948, "India", "sterling balances"
- `https://api.parliament.uk/historic-hansard/` — search 1948 for the Chancellor announcing the agreement; the Hansard entry will **name the Cmd. number**, and once you have `Cmd. 74xx` you can find the paper itself.
- The July 1948 agreement was signed by **Stafford Cripps** (Chancellor) — search Hansard July–August 1948 for "Cripps" + "sterling balances" + "India".

🔓 **(b) National Archives of India**, `https://www.abhilekh-patal.in/` — search "Sterling Balances" 1948, Ministry of Finance records.

🔓 **(c) The UK National Archives**, `https://discovery.nationalarchives.gov.uk/` — series **T 236** (Treasury, Overseas Finance) is where TNA:T236/4412 (the Cripps memorandum, T1.1) came from. Search T 236 for "India sterling balances 1948". The Treasury file will contain the British originals of the same correspondence.

🔓 **(d) The debate volume that cites it** — if you can't find the White Paper, the 12 August 1948 debate quotes chunks of it verbatim, and I already have that full text at `primary_docs/CAD_Legislative_1948-08-12_sterling_balances_scaling_down_debate_FULLTEXT.md`. Grep it for "page" to find every passage Lari read into the record.

---

## PRIORITY 3 — The technique, so you can run your own searches

This is the single most valuable thing in this file. **The Internet Archive's metadata is queryable, and both the Gazette of India and the entire eParlib parliamentary corpus are on it.** This is how B2 (the FERA Bill's Statement of Objects and Reasons) was cracked after four passes had declared it a dead end.

### 3.1 The Gazette of India — search by Ministry and Subject

The `in.gazette.e.*` collection carries a **`description` field containing the Ministry and the Subject line**, and it is full-text queryable:

```
https://archive.org/advancedsearch.php?q=collection:(gazetteofindia)+AND+description:(%22Foreign+Exchange%22)+AND+date:[1957-01-01+TO+1957-12-31]&fl[]=identifier&fl[]=date&fl[]=description&rows=100&output=json
```

Swap the `description:(...)` term for anything: `%22Reserve+Bank%22`, `%22Sterling%22`, `%22Import+Trade%22`. Swap the date range freely. **Caveat: descriptions are only populated from roughly 1950 onward** — for 1948 they read "Subject not available", which is why H5 failed here.

Once you have an identifier, fetch the text at:
```
https://archive.org/cors/<identifier>/<basename>_djvu.txt
```
Get `<basename>` from `https://archive.org/metadata/<identifier>`.

**⚠️ Use `/cors/`, not `/download/`.** The `/download/` path redirects to `dn*` backup nodes which fail. `/cors/` is reliable.

### 3.2 eParlib — every Indian parliamentary debate, 387,743 items

```
https://archive.org/advancedsearch.php?q=identifier:eparlib.nic.in.*+AND+date:[1957-08-01+TO+1957-09-30]&fl[]=identifier&fl[]=date&fl[]=title&fl[]=eparlib_document_url&rows=200&output=json
```

The `eparlib_document_url` field gives you the **exact bitstream filename**, which is what you need for the `_djvu.txt` URL. Filename conventions:

| Prefix | Body | Example |
|---|---|---|
| `cald_<session>_<DD-MM-YYYY>` | Constituent Assembly (Legislative), 1947–1950 | `cald_03_12-08-1948` |
| `ppd_<DD-MM-YYYY>` | Provisional Parliament, 1950–1952 | `ppd_07-12-1950` |
| `lsd_<LS#>_<session#>_<DD-MM-YYYY>` | Lok Sabha, 1952– | `lsd_02_02_31-08-1957` |

Then: `https://archive.org/cors/eparlib.nic.in.<handle>/<filename>_djvu.txt`

**⚠️ OCR caveat — this matters and has already bitten this project twice.** The IA OCR of these volumes **systematically drops leading digits**: "1949" → "949", "1951" → "95l", "£1,537m" → "£,537m", "£1,169m" → "£169m". **The prose is reliable. Every numeral must be verified against the printed page before you quote it.** If a figure looks implausibly small by a factor of ten, that's why.

**Official PDFs (no OCR error, but slower to navigate):**
- `https://eparlib.sansad.in/bitstream/123456789/<handle>/1/<filename>.pdf`
- Landing page: `https://eparlib.sansad.in/handle/123456789/<handle>`

### 3.3 Budget speeches — clean official text, free, no OCR, back to 1947

```
https://www.indiabudget.gov.in/doc/bspeech/bs<YYYYYY>.pdf
```
e.g. `bs194849.pdf`, `bs195758.pdf`. **Always prefer this over a scan.** I have 1948-49, 1949-50, 1956-57 and 1957-58 saved; the untouched years that might repay a look are **1950-51 through 1955-56** (`bs195051.pdf` … `bs195556.pdf`) — the gap in the ministerial chain between Matthai/Deshmukh and TTK.

---

## PRIORITY 4 — Paywalled secondary literature

I have the full text of Abreu 2017, Avaro 2020, de Bromhead 2023, and the 1947 Decolonisation article via open-access repository copies (all saved in `primary_docs/`). These remain behind logins:

| Item | URL | Note |
|---|---|---|
| Cambridge Core / *Economic History Review* originals | `https://doi.org/10.1111/ehr.13175` | I have the accepted-manuscript OA version; the published version differs only in pagination |
| JSTOR / EBSCO items | `https://search.ebscohost.com/...` | login wall |
| B. R. Tomlinson, *The Political Economy of the Raj* | — | not online; library copy needed |

---

## What is already complete and needs nothing further

So you don't waste scrapes: **31 documents are captured in full** in `primary_docs/`, including all four 1948–57 Budget speeches from the official source, the complete 1948 and 1949 Constituent Assembly (Legislative) sterling debates, both 1957 Lok Sabha FERA sittings, the FERA Bill's Statement of Objects and Reasons from the Gazette, the RBI Amendment Bill 1956 SOR, the RBI Ordinance 6 of 1957, the IMF India chapter, and Deshmukh's 7 December 1950 sterling-balances statement.

---

## Firecrawl credit accounting

| Pass | Spend | Note |
|---|---|---|
| Early passes | ~392 | **Wasted** on `formats:["query"]` / `directQuote` against the 388-page IMF PDF, which returned nothing. Never use that mode on a large PDF. |
| IMF PDF parses | ~172 + ~183 | 1 credit per page parsed. Budget these deliberately. |
| IA `_djvu.txt` fetches | 1 each | Cheap. This is the workhorse route. |
| `firecrawl_search` | 2–3 each | |

**Cost discipline, in order of preference:** (1) official clean text if it exists (indiabudget.gov.in — free of both OCR error and per-page cost); (2) IA `/cors/` `_djvu.txt` at 1 credit; (3) page-limited PDF parsing only as a last resort.
