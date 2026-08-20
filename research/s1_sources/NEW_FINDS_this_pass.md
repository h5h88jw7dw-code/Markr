# New this pass — everything not previously given to you

Tooling note: the new Firecrawl connector has **no page-fetch tool** (`firecrawl_scrape`/`firecrawl_map`
are gone — only `firecrawl_search`, a search index, is available). `WebFetch` is blocked on every
primary-source host this project touches (archive.org, indiacode.nic.in, mea.gov.in, sansad.in,
elibrary.sansad.in, docs.wto.org, api.parliament.uk, digitallibrary.un.org, web.archive.org). So this
pass worked entirely by repeated targeted `firecrawl_search` queries against known documents,
stitching together the text returned in result snippets/highlights. That's why some finds below are
marked partial — the content is real and quotable, but completeness isn't guaranteed the way a
direct fetch would give you.

---

## 1. The actual 1948 UK–India Financial Agreement — found, not previously in the project

**This is new and is a better document than the White Paper (H5) the project spent two passes
failing to find.** India's Ministry of External Affairs hosts the operative treaty text itself in
its official bilateral-documents archive:

```
https://www.mea.gov.in/bilateral-documents.htm?dtl/5073/Financial+Agreement+relating+to+Sterling+Balances
```

Partial text recovered and saved: `primary_docs/MEA_1948_Financial_Agreement_Sterling_Balances_PARTIAL.md`.
Confirmed content includes Article I (RBI's sterling assets fixed at **£1,160 million** for the
purposes of the agreement), Article VII (India's undertaking not to restrict acceptance of sterling
or availability of rupees for sterling-area residents), Article IX (Reserve Bank of India / Bank of
England given technical execution of the agreement), and Article X (definitions, including tying
"payments for current transactions" to Article XIX(i) of the IMF Articles of Agreement). Articles
III–VI, VIII, the exact signing date, and the signatories are still missing — the page needs a
direct fetch to get the rest.

**This also produced a correction to something implicit in the project's chronology.** Cripps's
statement to the Commons on 15 July 1948 (recovered via search highlights, not yet a full fetch)
says explicitly: **"the agreement is therefore to run for three years from 1st July, 1948"** —
i.e. to 30 June 1951, which is exactly when Deshmukh's six-year agreement (H8) took over. The
1948 agreement was *not* open-ended, and Cripps frames it as the fix for the "inconvenience...
caused... by short-term settlements" that Chetty had complained about five months earlier. Also
recovered: the £176¼ million India/Pakistan paid the UK under this arrangement, and Cripps's own
figure that the UK owed India "approximately £1,200 million sterling" at the close of the war.

Full Hansard debate for the rest: `https://api.parliament.uk/historic-hansard/commons/1948/jul/15/india-sterling-balances`

## 2. Correction — the 1952 FERA amendment IS Act VIII, not Act I

**Last pass I told you this was likely "Act I of 1952" based on a misread search snippet. That was
wrong, and I want to flag the correction explicitly rather than let it stand uncorrected.** This
pass found indiacode.nic.in's own text, confirmed directly:

```
https://www.indiacode.nic.in/repealedfileopen?rfilename=A1952-8.pdf
```
> "**No. VIII of 1952** — 1. Short title.—This Act may be called the Foreign Exchange Regulation
> (Amendment) Act, 1952."

So the local session's original note was right all along: **Act VIII of 1952.** Use this link and
this number going forward; disregard my "Act I" correction from the previous turn.

This is the **direct download link for the Act's own bare text** — not yet the Statement of
Objects and Reasons (the Gazette Bill document), which is still unlocated; see item 5 below.

## 3. A dead end, closed — mea.gov.in's *other* sterling-balances document is NOT relevant

The MEA archive has a second "sterling balances" treaty at a nearby item number:
```
https://www.mea.gov.in/bilateral-documents.htm?dtl/5823/Agreement+Regarding+Sterling+Balances+Of+India+With+UK
```
**Checked and eliminated for this project's purpose.** It's dated **21 September 1968** — a UK
dollar-value guarantee on eligible sterling balances, twenty years outside this project's 1947–57
window. Don't chase this one further; noted here only so a future pass doesn't re-open it.

## 4. GATT 1957 — no specific document found, but a working document-host pattern identified

Still no exact `L/` or `BOP/` document number for India's 1957 GATT consultation. One new lead: the
WTO's dispute-archive PDF host follows a clean pattern —
```
https://gatt-disputes.wto.org/sites/default/files/documents/Additional/L<number>.PDF
```
confirmed live with `L966.PDF` (a 1958 Germany restrictions consultation, found incidentally). If a
future search turns up India's document number, this pattern gives a direct PDF. Also try browsing
the resource index directly: `https://gatt-disputes.wto.org/resources`. Neither was pinned to
India/1957 specifically this pass.

## 5. Still nothing new on: 1952 SOR text, IMF Ninth Report ISBN, Iengar's 1957 statement

No progress on these three beyond what `REMAINING_DOCUMENTS_EXACT_LINKS.md` already told you — search
queries this pass returned nothing usable for the printed 1952 Statement of Objects and Reasons
text itself (as opposed to the Act, now found — see item 2), the Ninth Annual Report's ISBN, or
Iengar's September 1957 IMF Annual Meeting statement.
