# Remaining documents — exact download links, one per item

Every item still outstanding across both search passes, in one place. Each entry is marked:

- **✅ DIRECT** — exact file URL, click and download.
- **🔎 LEAD** — I searched for it this pass (WebSearch, since Firecrawl is out of credits and
  WebFetch is blocked on every relevant host from this session — archive.org, indiacode.nic.in,
  sansad.in, elibrary.sansad.in, docs.wto.org, api.parliament.uk all refused the connection). This
  is the best entry point I could find; it is a search page or index, not the document itself.
- **❌ NONE** — searched, nothing found beyond what's already documented; only a description of
  where it should exist.

---

## 1. IMF *Eighth Annual Report on Exchange Restrictions* (1957) — pages 184–388

**✅ DIRECT** — full 388-page PDF, open, no login, born-digital:
```
https://www.elibrary.imf.org/downloadpdf/display/book/9781475549263/9781475549263.pdf
```
I have pages 1–183 (the complete India chapter). Unretrieved: **UK** (~pp. 330–345), **Pakistan**
(~pp. 230–240), **Ceylon**, **Australia**, **New Zealand**, **South Africa**. Table of contents
with exact printed page numbers already saved at
`primary_docs/IMF_8th_Annual_Report_Exchange_Restrictions_1957_PART1_and_TOC.md`.

## 2. IMF *Ninth Annual Report on Exchange Restrictions* (1958)

**🔎 LEAD.** Confirmed to exist — transmitted to Fund governors 5 May 1958, covering May 1957–April
1958. Its ISBN was not locatable this pass (searched directly; only the *general* Annual Report
1958, ISBN `9781616351700`, a different and less detailed publication, surfaced). Best entry point:
```
https://www.elibrary.imf.org/subject/012
```
This is the AREAER periodicals index page — browse it for the 1958 edition's own ISBN, then swap
it into the pattern `https://www.elibrary.imf.org/downloadpdf/display/book/<ISBN>/<ISBN>.pdf`.
Fallback (different, less detailed publication, but free and direct today):
```
https://www.imf.org/external/pubs/ft/ar/archive/pdf/ar1958.pdf
```

## 3. Rajya Sabha, FERA (Amendment) Bill 1957 debate

**✅ DIRECT** (browser-only; both `rsdebate.nic.in` and its sibling `elibrary.sansad.in` reject
every fetch tool available to this session, so these are for you to open directly):
```
https://rsdebate.nic.in/bitstream/123456789/572037/2/ID_18_06091957_17_p3928_p3954_5.pdf   (6 Sept 1957, pp.3928–3954)
https://rsdebate.nic.in/bitstream/123456789/572013/2/ID_18_02091957_13_p2850_p2953_5.pdf   (2 Sept 1957, pp.2850–2953)
```
If those specific bitstream IDs 404 (they sometimes shift), the modern **DSpace 7 API mirror** is
the better search tool — open in a browser:
```
https://elibrary.sansad.in/server/api/discover/search/objects?configuration=default&scope=5682601f-dead-479f-8711-6ee52738ab13&dsoType=ITEM&query=%2206-09-1957%22&page=0&size=10
```
(scope UUID above is the Rajya Sabha collection; swap the quoted date to page through September
1957). Each hit's `_links.bitstreams.href` → bitstream `_links.content.href` is the direct PDF.

## 4. The 1948 White Paper on Sterling Balances Negotiations (H5)

**✅ Practically superseded this pass** — the actual treaty text (not the White Paper compilation,
but the operative agreement itself) was found at India's MEA archive. See
`NEW_FINDS_this_pass.md` §1 and `primary_docs/MEA_1948_Financial_Agreement_Sterling_Balances_PARTIAL.md`.
The literal White Paper is still not located; the notes below on the Command Paper number are kept
for anyone who wants the parliamentary-compilation version specifically.

**🔎 LEAD.** The debate that cites the White Paper page-by-page (already saved,
`primary_docs/CAD_Legislative_1948-08-12_...md`) is itself a UK-side echo of a **UK Command
Paper**. This pass found the Command Paper number for the *original* August 1947 agreement:
**Cmd. 7195**. Chetty's February 1948 Budget speech (already saved, `U10`) states the 1948
arrangement was "the second interim agreement," an *extension* of the 14 August 1947 agreement
"with some modifications" — so the 1948 White Paper is very likely published as a Command Paper
in the same series, numbered somewhere close to but after 7195 (searched but not pinned down —
try 7300–7500 range).

**Direct route to search it yourself:**
```
https://api.parliament.uk/historic-hansard/commons/1948/jul/15/india-sterling-balances
```
This is the UK Commons debate of **15 July 1948** on the sterling balances arrangement — almost
certainly names the Command Paper number for the 1948 agreement directly (this session's WebFetch
is blocked on `api.parliament.uk`, but it is a normal public Hansard page in any browser).

Also try the UK Parliament's own Command Papers catalogue:
```
https://hansard.parliament.uk/search/Contributions?startDate=1948-07-01&endDate=1948-08-31&searchTerm=India%20sterling%20balances
```

## 5. Statement of Objects and Reasons, 1952 FERA amendment

**✅ DIRECT, corrected.** The previous version of this file said the Act was "Act I of 1952,"
based on a misread search snippet. **That was wrong — retract it.** The original local-session
note was right: it is **Act VIII of 1952**, confirmed directly from indiacode.nic.in's own text:
```
https://www.indiacode.nic.in/repealedfileopen?rfilename=A1952-8.pdf
```
> "No. VIII of 1952 — 1. Short title.—This Act may be called the Foreign Exchange Regulation
> (Amendment) Act, 1952."

That's the **Act's own bare text**, confirmed and directly downloadable. Still outstanding: the
**Statement of Objects and Reasons** (the Bill document, distinct from the enacted Act) —

**🔎 LEAD** for that — page two of the 1952 Extraordinary Gazette index, which a first pass didn't
reach (`archive.org`'s API is blocked for direct fetch this session):
```
https://archive.org/advancedsearch.php?q=identifier:in.gazette.e.1952*&fl[]=identifier&fl[]=date&fl[]=description&rows=500&start=500&output=json
```
Grep the `description` field for "FOREIGN EXCHANGE" once you have it open.

## 6. IMF Archives — India country consultation file

**🔎 LEAD** (browse only; the catalog's full-text search is WAF-blocked to automated tools):
```
https://archivescatalog.imf.org/index.php/search/detail?fieldname=Field_parentobjectnumber&value=132014&database=archive
```
Page through `/resultsnavigate/N` — India's Country Consultation Files (series 132014,
1952–2002) sit roughly at page 7 of 53, alphabetically.

## 7. GATT — India's 1957 balance-of-payments consultation

**🔎 LEAD.** Confirmed context via this pass's search: India began consulting under **GATT Article
XVIII:B** in the Committee on Balance-of-Payments Restrictions **"regularly since 1957."** No
specific 1957 document symbol (the `BOP/` or `L/` series number) was found. Two archives to search
directly:
```
https://docs.wto.org/gattdocs/q/index5.htm
https://importlicensing.wto.org/archived-gatt-documents
```
Both are the GATT Documents Online index at Centre William Rappard; search "India" + "1957" +
"balance of payments" or "import restrictions" once inside — `docs.wto.org` rejected this
session's fetch tools, so this needs a browser.

## 8. Iengar's September 1957 IMF Annual Meetings statement

**🔎 LEAD.** Note: the *IMF/World Bank Annual Meeting actually held in India* was **October 1958**
(New Delhi — Nehru's welcome address is on the World Bank archive, confirmed this pass), not 1957.
The **1957 meeting** was Washington, and the printed record is the IMF's own *Summary Proceedings*
volume for that year:
```
https://www.elibrary.imf.org/search?q=Summary+Proceedings+1957+Annual+Meeting
```
Search inside for India / Iengar / B. K. Nehru's statement. (The 1958 Delhi meeting's own Summary
Proceedings, if the essay wants the India-hosted meeting instead, would be worth checking too —
same search page, year 1958.)

## 9. I. G. Patel, *Glimpses of Indian Economic Policy*

**❌ NONE.** Confirmed in the earlier pass: no ebook edition exists anywhere online. Library or
purchase only — not a web-retrieval problem.

## 10. Paywalled secondary literature

**❌ NONE — behind logins, no free route found.**
- de Bromhead/Abreu/Avaro/decolonisation article: **already have full open-access text**, no
  action needed.
- Cambridge Core / *Economic History Review* published versions: `https://doi.org/10.1111/ehr.13175`
  — I hold the accepted-manuscript OA copy already; the published version differs only in
  pagination.
- B. R. Tomlinson, *The Political Economy of the Raj*: not online anywhere found; library copy
  needed.
- JSTOR/EBSCO items generally: `https://search.ebscohost.com/...` — institutional login required.

---

## Session note on why so much of this is "search, don't fetch"

Every domain this project depends on — `archive.org`, `indiacode.nic.in`, `sansad.in`,
`elibrary.sansad.in`, `docs.wto.org`, `api.parliament.uk` — is blocked by this session's egress
proxy for direct `WebFetch`/`curl`. The entire project up to now ran on **Firecrawl**, whose own
servers do the fetching instead of this container. **Both Firecrawl connectors available to this
session are currently out of credits** (HTTP 402 on every call). `WebSearch` (a third, separate
tool) is unaffected and is what produced every lead above — but it returns snippets and links, not
full page fetches, so it cannot substitute for Firecrawl on a known target URL.

**Once either Firecrawl connector has credits again**, every 🔎 LEAD above becomes a two-call job:
fetch the search/index page, then fetch the specific document it points to — exactly the pattern
that found the Ordinance X of 1951 and the 26 July 1948 notice earlier this session.
