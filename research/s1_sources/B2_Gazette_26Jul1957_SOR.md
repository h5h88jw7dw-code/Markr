# B2 — Statement of Objects and Reasons, FERA (Amendment) Bill 1957

> # ⚠️ SUPERSEDED — **B2 WAS SUBSEQUENTLY FOUND.**
>
> Everything below this box is the *obsolete* "not found" record from an earlier pass. It is retained only as an elimination log — do not act on its recommendations.
>
> **The document was recovered.** Full text: `primary_docs/GAZETTE_1957-07-26_FERA_Amendment_Bill_47_of_1957_SOR_FULLTEXT.md`
>
> **Route that worked:** the Internet Archive's Gazette `description` metadata field is queryable (it carries Ministry + Subject). Item `in.gazette.e.1957.235`, fetched at
> `https://archive.org/cors/in.gazette.e.1957.235/E-2142-1957-0034-97071_djvu.txt`
>
> **The load-bearing quotation, T. T. Krishnamachari, 13 July 1957:**
>
> > "India still continues to be short of foreign exchange... the shortage is likely to continue for an indefinite period... Another important factor is the development programme under the Second Five Year Plan..."
>
> **The finding is negative for the essay's thesis: the Statement of Objects and Reasons contains no mention of Britain, sterling, the sterling balances, or the sterling agreement.** The reasons the Government itself gave for making exchange control permanent are (a) an indefinite foreign-exchange shortage and (b) the Second Five Year Plan. This is one of five independent 1956–57 documents now checked and found silent on Britain — see `README_and_summary.md`.
>
> The obsolete note below (point 2) states that the Gazette collection's numbering "is not date-sequential, so brute-force number-guessing is not viable." That remains true and is *why* the metadata-description route was necessary. That observation is the only part of the record below still worth keeping.

---

### B2 — NOT FOUND
**Route that worked:** N/A. Multiple routes attempted; none located the specific item.

**What was tried:**
1. `firecrawl_search` for exact phrase matches ("Statement of Objects and Reasons" + "Foreign Exchange Regulation" + 1957, various combinations) — returned only unrelated later citations of *other* Acts' Statements of Objects and Reasons (income tax, domestic violence, etc.), and general secondary discussions of the 1947/1973 Acts, none the actual 1957 Bill document.
2. `archive.org/advancedsearch.php` against the `in.gazette.e.1957.*` identifier prefix — confirmed this collection exists and is large (**1,123 items** for 1957 alone), but the numbering is **not date-sequential** (a spot-check found items numbered both far below and far above 1000 with no visible pattern), so brute-force number-guessing from a July date is not viable.
3. IA's full-text-search API (`ia-pub-fts-api.archive.org`) — **DNS resolution failure**, consistent with a prior session's finding that this endpoint is unreachable from this environment. There is currently no working corpus-wide OCR full-text search across the Gazette collection available to these tools — only per-item `_djvu.txt` fetches once an item is already identified.
4. Search for other bills/gazette notifications independently dated "26th July, 1957" to try to triangulate a nearby gazette number — found several (Manipur Gazette republication, a Home Ministry hand-cuffing circular, an SPA administrative order) but none gave a usable `in.gazette.e.1957.[N]` identifier to anchor a numeric search near.

**Confidence tag:** N/A — target not reached.

**Verdict against acceptance criterion:** failed. The document almost certainly exists in the mirrored collection (1,123 items for 1957 alone strongly suggests good coverage), but locating the *specific* item among them requires either (a) a working full-text search tool this session doesn't have access to, or (b) a different anchor — e.g., if any other already-fetched source cites this specific Gazette notification by its **item number** (not just date/page), that would let a direct fetch succeed immediately.

**What this changes:** nothing yet — this remains the single highest-priority unretrieved document per the master list's own ranking (B2), and TTK's oral introduction of the Bill on 26 July 1957 (already captured, see `primary_docs/LokSabha_1957-07-26_FERA_Bill_introduction.md`) gives **no** content beyond the bare motion — the SOR is genuinely not available anywhere else already fetched in this project.

**Recommended next steps, in order:**
1. Try Google Books or HathiTrust for a bound volume of "Gazette of India, Extraordinary, 1957" that might have a browsable index/table of contents by date rather than by item number.
2. Try a direct request to a librarian/researcher with India Code or National Archives of India access — this may simply be outside what remote web tools can do.
3. If a future search anywhere in this project surfaces a **secondary source that quotes the SOR's actual text** (even a sentence), that would partially substitute for the primary document and should be captured immediately rather than continuing to hunt for the primary Gazette page.
