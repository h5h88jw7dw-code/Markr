# H1 — **FOUND.** The IMF India country chapter, 1957. And it settles T1.5 against the essay.

### H1 — FOUND, complete.

**Route that worked, after ~10 failed attempts across three sessions:** `firecrawl_scrape` on the full PDF with **`pdfOptions: {maxPages: 183}`**. The parse ceiling under the tool's 60-second timeout sits between **183 (succeeds) and 184 (times out)**. The India chapter begins at PDF p.~181 and the whole of it, including "Changes during 1956", fits inside 183 pages. Earlier passes failed because they tried 186–192 to be safe, which always times out; the trick was to come *down* to the boundary rather than up to it.

Full text at `primary_docs/IMF_8th_Annual_Report_1957_INDIA_CHAPTER_FULLTEXT.md`. This is the IMF's own published text machine-parsed from the official PDF, **not an OCR scan** — reliable for direct quotation.

---

## ⚠️ FINDING 1 — This resolves T1.5, and it resolves it AGAINST the essay's "FERA is the binding gate" paragraph.

T1.5 asked (the brief's own words): *"was a foreign-exchange release under FERA a separate discretionary decision from an import licence, or automatic on production of one? If separate, the 'FERA is the binding gate' paragraph is proven. **If automatic, that paragraph must be cut.**"*

The IMF's description, under **Imports and Import Payments**, is unambiguous:

> "**Where a valid import license is held, the required exchange is released by authorized banks on presentation of the exchange control copy of the license.** The license holder may effect payments by opening letters of credit or by making remittances against sight drafts. Advance remittances in payment of imports before shipping documents are received are not normally permitted; but in special cases, e.g., imports of machinery and capital goods, where deposits have to be made with overseas manufacturers, the Reserve Bank grants special authorization for advance payment for a part of the value of the import."

**The exchange release was automatic on production of the licence.** It was performed by authorised commercial banks, not by the Reserve Bank exercising discretion, and it was triggered by presentation of a document — the exchange control copy of the import licence. There is no second discretionary gate. The only reserved discretion is the narrow exception for *advance* payment before shipping documents, which is a timing concession, not a gate on the transaction itself.

**Recommendation: the "FERA is the binding gate" paragraph must be cut**, per the brief's own stated acceptance criterion. The binding constraint on imports was the **licence** — issued by the Chief Controller of Imports and Exports under the import-control regime, on a half-yearly quota policy announced in the "Red Book" — not the FERA exchange release. This is a real correction to the essay's mechanism, and it is stated by a neutral third party (the Fund) describing India's system as it stood at end-1956.

*(Note this also retrospectively vindicates the decision recorded in `T1.5_import_trade_control_handbook.md` to eliminate* East India Commercial Co. *as a source: that case was about licence end-use conditions, and licences — not exchange releases — turn out to be exactly where the binding constraint lived.)*

---

## ⚠️ FINDING 2 — The "blocked sterling" upgrade the brief hoped for does NOT appear. And the chapter's silences are as significant as its content.

The brief's T0.1 named as *"potentially the biggest available upgrade"* the possibility that Fund staff would attribute India's Article XIV status to blocked sterling — *"any Fund staff sentence to the effect that India's reserve position is inadequate, or its usable reserves smaller than its gross reserves, by reason of blocked, non-transferable, or agreement-restricted sterling balances."*

**No such sentence exists in this chapter.** Read in full:

- There is **no statement that India's reserves are inadequate**, blocked, or restricted.
- There is **no mention of the sterling balances**, the No. 1 Account, or the No. 2 Account.
- There is **no reason or justification given at all** for India maintaining restrictions. The chapter is purely descriptive of mechanism — rates, administration, prescription of currency, accounts, licences, allowances — with no causal or evaluative language anywhere.
- The word "blocked" appears only in a *different and unrelated* sense: blocked accounts holding **nonresidents'** capital proceeds that may not be remitted out of India. That is India blocking foreigners' money, the mirror image of the essay's subject.

This is now the **fifth** independent 1956–57 document in the project containing no attribution of India's exchange control to Britain or sterling, alongside TTK's Interim Budget (Mar 1957), his final Budget (May 1957), the FERA Bill's Statement of Objects and Reasons (Jul 1957), and his Lok Sabha speech (Aug 1957).

---

## FINDING 3 — What the chapter DOES say about the UK link, verbatim

The sterling-area relationship is described, but as **institutional similarity and administrative conformity**, not as constraint or coercion:

> "**Like other Sterling Area countries, India has an exchange control system similar to that in operation in the United Kingdom but adapted to suit local requirements.** The administrative work and decisions on exchange control matters are handled by the Reserve Bank of India, in accordance with the general policy laid down by the Indian Government in consultation with the Reserve Bank."

> "Transactions with nonresidents are subject to the prescription of currency requirements: i.e., payments to or from foreign countries must be effected in the currency prescribed by the exchange control authority, **for the most part in conformity with the exchange control regulations of the United Kingdom.**"

This is genuinely useful and quotable — it is a neutral third party confirming that India's exchange-control architecture was modelled on and administratively aligned with the UK's. **But note carefully what it supports and what it does not.** It supports "India's system was British in design and stayed in conformity with British regulations." It does **not** support "Britain compelled India to make exchange control permanent in 1957." The essay should not let the first do the work of the second. It also independently corroborates TTK's own remark in the 31 August 1957 debate that a seizure provision "is exactly on the lines of the British Exchange Control Act" — Britain as *model*, which is now attested from both the Indian and the Fund side.

---

## FINDING 4 — The currency-zone machinery, described operationally (useful for the essay's Act II)

> "Goods may be imported into India under either open general licenses or individual licenses… **There are three open general licenses, listing goods which may be imported freely from (1) all countries except the Union of South Africa, (2) all soft currency countries except the Union of South Africa, and (3) Pakistan.** Individual licensing can be by quotas allocated to established importers in accordance with their imports in a base period and to actual users on the basis of their current requirements or by ad hoc licensing. **Currency-wise, there are two kinds of license, those for imports from soft currency countries and those for imports from all countries. The licenses for soft currency countries are automatically available to the extent of 50 per cent (and for some commodities, more than 50 per cent) for imports from hard currency countries.** No distinction is made between one country and another within either currency area, except that imports from the Union of South Africa are prohibited and certain imports from Pakistan are admitted on a more liberal basis than from other countries. At the beginning of each half-yearly licensing period, an announcement on import control policy is made in the form of a **Red Book**, which gives in detail the policy for established importers, actual users, and newcomers."

Two points the essay can use: by end-1956 the elaborate four-zone taxonomy of the 1948 notice had **collapsed to a two-way soft/hard currency split**, with a standing 50 per cent hard-currency convertibility built into every soft-currency licence; and the operative policy document was the half-yearly **Red Book**, not FERA.

On the sterling-area privilege in capital transfers:
> "Repatriation of capital owned by persons residing in Sterling Area countries other than Pakistan, and of capital invested in India by residents of Denmark, Norway, and Sweden, is freely authorized."
> "Indian nationals (including persons domiciled in India) who emigrate to a Sterling Area country may transfer their assets in full at the time of emigration. Indian nationals… who emigrate to a country outside the Sterling Area may transfer up to Rs 75,000 for emigration to the dollar area and up to Rs 125,000 for emigration to any other country; any remaining assets are blocked."

---

## FINDING 5 — "Changes during 1956": India was LIBERALISING through most of 1956, and only turned in late December

The chapter's chronological log of 1956 changes is, until December, **a list of relaxations** — which independently corroborates T2.2's finding from Deshmukh's February 1956 Budget speech:

> **May 20.** Authorized dealers were allowed to approve remittances for such expenses related to exports… without reference to the Reserve Bank.
> **June 21.** Authorized dealers were allowed to deal in spot exchange transactions, and forward transactions for up to six months' delivery, with authorized banks in Belgium, Denmark, France, the Federal Republic of Germany, Italy, the Netherlands, Norway, Sweden, and Switzerland…
> **June 29.** Authorized dealers were allowed to approve remittances for payment of examination fees to educational institutions outside India up to a limit of Rs 150…
> **September 3.** **Authorized dealers in India were allowed to deal in U.S. and Canadian dollars at rates to be determined by market conditions, as in the case of other currencies.** … Authorized dealers were also permitted to deal in forward exchange transactions in these currencies at market rates.
> **October 1.** New open general licenses for imports were issued… valid until June 30, 1957.

Then the turn, in the last five days of the year:
> **December 27.** It was announced that **beginning January 1, 1957 there would be no basic allowance of foreign exchange for travel abroad for pleasure or personal convenience.**
> **December 29.** It was announced that all soft currency licenses issued for the period January–June 1957 would be automatically valid for imports from the dollar area to the extent of 50 per cent…

**The dating is significant.** As late as 3 September 1956 India was *loosening* dollar dealing. The first restrictive measure in the log is 27 December 1956 — and TTK's Interim Budget of March 1957 dates the import-policy stiffening to "January", consistent with this. The reversal is therefore compressed into roughly **eight weeks around the turn of 1956–57**, and the trigger the Government itself names is the Second Plan's import surge (plus, per TTK's March 1957 speech, the Suez closure and the 1955-56 harvest).

One item of note for a different thread — an *Egypt*-related tightening in August 1956, the month of the Suez nationalisation:
> **August 24.** The full proceeds (100 per cent) of import bills for goods shipped from Egypt to India had to be paid to the "B" Account… Previously, this requirement had applied to only 40 per cent of such proceeds, **the balance being remittable in sterling.**

---

## Confidence and verdict

**Confidence tag:** STATED (the Fund's own published country survey, describing India's system as at end-1956 with changes into early 1957, machine-parsed from the official PDF).

**Verdict against acceptance criterion:** **met in full.** T0.1/H1 asked for "the India country chapter… quoted verbatim on (a) the restrictions maintained and (b) the stated reason." (a) is now complete and verbatim. (b) is answered definitively in the negative: **the chapter gives no reason at all** — it is descriptive throughout. That is itself the finding, and it should be reported as such rather than as a gap.

**Net effect on the essay:** one paragraph must be cut (the FERA double-gate), one hoped-for upgrade is confirmed absent (blocked sterling as the Fund's explanation), and one genuinely useful quotation is gained (India's system as a UK-modelled, UK-conformant one). The chapter strengthens the "British in design" claim and weakens the "British in 1957 causation" claim — the same direction every other primary source recovered in this project has pointed.

**Still outstanding:** the Ninth Annual Report (1958), covering May 1957–April 1958, which would show the position *after* the FERA permanence and the RBI Ordinance. Not yet attempted; would need its own ISBN/URL located first.
