# H8 and H5 — status, and the December 1950 elimination log

## H8 — The 1951 six-year sterling agreement, and Deshmukh's statement to Parliament

**Status: PARTIAL. Terms documented; the parliamentary statement not located.**

**Already in hand (from T2.1, RBI's own institutional history):** the agreement's substantive terms — release of up to £35 million a year, unutilised amounts carried forward, the immediate transfer of £310 million (the Reserve Bank's Issue Department assets) from the No. 2 to the No. 1 account subject to consultation with the British government, a six-year term, and the transfer of any residual No. 2 balance to No. 1 at the end of six years. The RBI history states it was "presented to the Indian Parliament in December 1950."

**Search performed this pass.** The Provisional Parliament sitting-day volumes for December 1950 are all available on the Internet Archive eParlib mirror (21 items enumerated). **Four were fetched in full and keyword-counted:**

| Date | Item | "sterling" | "balances" | Result |
|---|---|---|---|---|
| 13 Dec 1950 | `eparlib.nic.in.760114` | **0** | 0 | eliminated |
| 18 Dec 1950 | `eparlib.nic.in.760118` | **0** | 0 | eliminated |
| 19 Dec 1950 | `eparlib.nic.in.760119` | 5 | 0 | eliminated — all five hits are unrelated (a fertiliser letter of credit; two speeches on the Khaddar Bill about "Dollar and Sterling hardships"; a cotton-cloth export exchange) |
| 20 Dec 1950 | `eparlib.nic.in.760121` | **0** | 0 | eliminated |

**Not yet checked (12 remaining sittings):** 1, 4, 5, 6, 7, 8, 11, 12, 14, 15, 21, 22 December 1950 — identifiers `760106`, `760102`, `760107`, `760108`, `760117`, `760109`, `760110`, `760113`, `760115`, `760375`, `760122`, `760120` respectively, each fetchable at `https://archive.org/cors/<identifier>/ppd_<DD-MM-1950>_djvu.txt`.

**Also noted:** `eparlib.nic.in.58245` — "Report of the Select Committee on the Reserve Bank of India (Amendment) Bill, 1950 (13-Dec-1950)" — a separate document, not fetched, possibly relevant to the currency-reserve thread rather than the sterling agreement.

**Recommendation:** the remaining twelve dates are cheap to sweep with the same method (one fetch + one grep each) once tool credits allow. Note that the RBI history's "December 1950" may refer to a *paper laid on the table* rather than a speech, in which case the mention may be a single line in the day's "Papers Laid" section and easy to miss on a low keyword count — search for "Financial Agreement", "United Kingdom", and "Papers Laid" as well as "sterling".

---

## H5 — The White Paper on Sterling Balances Negotiations (laid 9 August 1948)

**Status: NOT FOUND. Still the most-wanted missing primary document in the project.**

Confirmed to exist and confirmed to have been laid before the house — Shanmukham Chetty, 9 August 1948: *"Sir, I lay on the table the White Paper containing the documents relating to the recent Sterling Balances Negotiations with the United Kingdom"* (captured in `primary_docs/CAD_Legislative_1948-08-09_White_Paper_on_Sterling_Balances_Negotiations_laid.md`). Cited page-by-page by Z. H. Lari in the debate of 12 August 1948 ("page 68 of this book", "page 3 of the White Paper", the Wilson Smith→Chanda letter at "page 62").

A final search — the eParlib mirror for items whose *title* contains "sterling" or "White Paper" — **could not be run: Firecrawl credits were exhausted at this point.** That query is the obvious next step and is a single call:

```
https://archive.org/advancedsearch.php?q=(title:(sterling) OR title:("White Paper")) AND identifier:eparlib.nic.in.*
  &fl[]=identifier&fl[]=date&fl[]=title&fl[]=eparlib_document_url&rows=60&output=json
```

Other untried routes for H5: the `gazetteofindia` collection description field for August 1948 (the metadata-search technique that cracked B2); the National Archives of India; and the UK side — the same documents would have been laid before the UK Parliament as a Command Paper, so a Hansard/Command-Paper search for an Anglo-Indian financial agreement white paper of mid-1948 may find the same texts from the British end.

---

## Note on tooling

**Firecrawl credits were exhausted during this pass.** The largest single consumer was the IMF *Eighth Annual Report on Exchange Restrictions* PDF: one successful 172-page parse cost 172 credits, and several further attempts at 178–192 pages timed out (see `H1_IMF_exchange_restrictions.md`). Retrieval of large PDFs by `maxPages` is expensive and should be budgeted deliberately — prefer, in order: (1) a clean official text if one exists (e.g. `indiabudget.gov.in` for Budget speeches, which is free of both OCR error and credit cost per page), (2) the Internet Archive `cors` route for `_djvu.txt` derivatives at 1 credit each, (3) page-limited PDF parsing only as a last resort.

WebSearch (a separate, non-Firecrawl tool) remained available and is unaffected.
