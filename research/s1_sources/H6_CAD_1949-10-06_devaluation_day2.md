# H6 — CAD (Legislative), 6 October 1949: day two of the devaluation debate

### H6 — FOUND
**Route that worked:** The item that a previous pass reported as "indexed but does not resolve" **does resolve** — the earlier failure was a transient Internet Archive error, not a missing item. Recovered by querying IA's metadata date range for the eParlib mirror, which returns the exact bitstream filename in the `eparlib_document_url` field:

```
https://archive.org/advancedsearch.php?q=identifier:eparlib.nic.in.* AND date:[1949-10-01 TO 1949-10-10]
  &fl[]=identifier&fl[]=date&fl[]=title&fl[]=eparlib_document_url&rows=40&output=json
```
→ `eparlib.nic.in.760757` / `cald_05_06-10-1949.pdf` / "Constituent Assembly of India (Legislative) Debates (6-Oct-1949)"

Then: `https://archive.org/cors/eparlib.nic.in.760757/cald_05_06-10-1949_djvu.txt`

Full text saved to `primary_docs/CAD_Legislative_1949-10-06_devaluation_debate_DAY2_FULLTEXT.md`. **Internet Archive OCR of the official volume (Volume V, 1949, Fifth Session, Part II — Proceedings other than Questions and Answers), not a read of the printed page.**

**Keyword counts (whole sitting):** sterling **58**, devaluation **82**, British **26**, balances **17**, Britain **4**, London **0**.

---

**Verbatim extracts — the load-bearing passages:**

**1. The Minister states that import policy is bounded by what can be drawn from the sterling balances.** Shri K. C. Neogy (Minister for Commerce), replying:

> "A good deal of comment has been made on our drawing upon the sterling balances. If the sterling balances can be legitimately put to any use, it is for the purpose of meeting an emergency of this character so as to enable us to tide over what I consider to be a mere transitional phase in our economy.
>
> Now, Sir, it is necessary for me to give very briefly an idea about our policy in regard to foreign trade. As the House is already aware, **we have already tightened up the controls and re-imposed our import control very severely of late. It is our desire to ensure that the gap in our payments does not exceed the amount we may draw from our sterling balances in the year.**"

This is the second ministerial statement of the same rule found in this project — it matches Matthai's Budget speech of 28 February 1949 almost exactly ("India should not have an overall deficit in her balance of payments on current account during any particular period of time of more than the amount by which it has been agreed with the United Kingdom Government that India's sterling balances should be drawn upon"). Two different ministers, seven months apart, describe the same binding constraint.

Neogy also dates the import-control tightening relative to devaluation:
> "It is a coincidence that just about a couple of days before the decision was taken on devaluation, we published our latest policy regarding more stringent import control."

And on the trend:
> "Since May, however, our drawal from the sterling balances has been declining month by month and actually in the month of September we had a favourable balance of payment."

**2. A member on the blocked account and how the balances were earned.** (Speaker not captured in the OCR span; the passage sits in the general debate.)

> "During the five years of the war, we wiped out all our sterling debt and in addition we accumulated sterling balances to the tune of nearly £[1,0]00 million but **unfortunately for us, after the war a large portion of that has been put into a blocked account by the U. K. Government and only a small portion has been released.** We built up those reserves with large hopes that we would be able to utilise them. **Those resources were accumulated through our blood, sweat and starvation and at the sacrifice of 3 millions of men in Bengal who died of famine conditions artificially created.** We hoped that they would be useful for us to build up, restore or replace worn-out machinery and also worn-out workmen in factories which had worked two shifts and three shifts during the war."

*(OCR digit-dropping: "£ i0@ million" — the figure is almost certainly £1,000 million or similar. **Verify against print before quoting the number.** The prose is reliable.)*

**3. Shri B. Das, on Britain and on why India stays in the sterling area anyway:**

> "…[the Government] has had to admit for the first time in its history that England has behaved most tyrannically, mischievously, against India. Sir, I do not wish to be severe on Sir Stafford Cripps. But in the Shankar's Weekly… we saw that unique cartoon where according to devaluation Sir Stafford Cripps is swimming with a gleam of merriment on his face and India is represented by my friend Dr. Matthai with the water almost near his lips—almost sinking under the strain of devaluation. That is my condition, that is India's condition.
>
> **We are going to save India from further perfidious action of Britain.** … Let us recall our High Commissioner. **I have no objection in the present circumstances as we stand, to remain in the sterling area until I feel strong to surmount the sterling area and be independent** and stand high, higher than the U.S.A. stands in the world of finance. But that will take time. I do not want to have anything to do with the U. K."

**4. The trap stated plainly, by another member:**

> "I share the view of some friends who said that **it is impossible to cut away from the sterling areas. All talk about our breaking our relations with the sterling areas may be a matter of hope, may be a matter of aspiration; but as far as realities are concerned, we cannot break away from the sterling area unless we are prepared to court complete economic disaster.**"

**5. Mr. Hossain Imam, on the legal (non-)basis of the sterling link** — directly relevant to the essay's mechanism, and consistent with Matthai's own statement the previous day (5 Oct) that the Reserve Bank Act provisions creating the link "have now been deleted":

> "**India has no legal or statutory concern with the sterling. It is only by means of a directive of the Central Government that we have linked with the sterling.**"

*(Followed by an interjection from Shri T. T. Krishnamachari — "Their Act follows our Reserve Bank Act" — on Pakistan's State Bank Act.)*

**6. A member defending the timing, on the constraint of sterling-area membership:**

> "…as the Honourable Finance Minister explained yesterday, **though we are not linked to the sterling as such we do belong to the sterling area** and it is not only the sterling area countries but also other soft currency areas that have devalued their currencies today. Had India put off this decision much longer it might have been that instead of the thirty per cent value that has gone down, we might have had to devaluate it even further."

Also recorded, on the Commonwealth question:
> "There is in this country a feeling amongst certain people, which has been greatly increased because there have been contending viewpoints, that **it is because we have remained a member of the Commonwealth that we today have had to devaluate**…"

**7. A dispute over the trade-share figure** (useful, because it shows the sterling-area share was contested on the floor):
> Shri M. Ananthasayanam Ayyangar: "The argument of the Honourable the Finance Minister was that devaluation was inevitable, since 75 per cent of our trade is with the soft currency areas or the sterling areas… but I have got the latest figures and **it is only 5[1] per cent. and not 75 per cent.**"
> Mr. Hossain Imam: "Does he include Pakistan in the soft currency area or the sterling area?"
> Shri M. Ananthasayanam Ayyangar: "In the soft currency area."

---

**Confidence tag:** STATED (official report, recovered verbatim via IA OCR of the official volume).

**Verdict against acceptance criterion:** met. H6 was the highest-value *missing* legislative document after B2 and H4; it is now recovered in full.

**What this changes:** supplies a **second** ministerial statement (Neogy, October 1949) of the rule that India's import policy was bounded by permitted sterling drawings, independent of Matthai's February 1949 Budget statement — so that claim no longer rests on a single speech. Adds the "blocked account by the U. K. Government" characterisation and the "we cannot break away from the sterling area unless we are prepared to court complete economic disaster" formulation, both from the floor.

**Routes tried that failed:** the previous pass's report that `eparlib.nic.in.760757` "does not resolve" is **superseded** — that was a transient IA failure. Note for future passes: a `Couldn't locate item` from `archive.org/metadata` should be retried at least once on a different day before being logged as permanent, and the `advancedsearch` date-range query above is a more reliable way to confirm an item's existence and get its filename than guessing at metadata.
