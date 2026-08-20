# New finds this pass — everything not previously given to you (Firecrawl fully working)

Six new primary documents recovered and saved in full, plus one significant negative-finding
close-out. This pass had a working `firecrawl_scrape`, so — unlike the previous search-only pass —
everything below is a clean direct fetch, not a stitched search snippet.

## 1. The Deshmukh 1952 debate — the actual origin of the "31 December 1957" date

`primary_docs/ProvisionalParliament_1952-02-14_Deshmukh_FERA_Amendment_Bill_FULLTEXT.md`

Full floor speech, 14 February 1952, C. D. Deshmukh moving the Foreign Exchange Regulation
(Amendment) Bill — the debate that became **Act VIII of 1952** and set the intended sunset date
that FERA permanence later legislated away: *"the present intention is to continue it up to the
31st December, 1957."* Two reasons given, neither Britain-related: IMF membership obligations
("India may be able to take advantage of the facilities which are open to her as a member of the
International Monetary Fund... These facilities can only be availed of if the member exercises
control over outward movements of capital") and an *ultra vires* concern about the original Bill's
delegated extension power. Word count across the FERA section: sterling 0, Britain 0, British 0,
United Kingdom 1 (a design comparison, not a justification). Recovered via the DSpace API at
`elibrary.sansad.in` — a working alternative to `rsdebate.nic.in`, whose bitstream links now 404.

## 2. GATT L/648/Add.1 — India's 6 August 1957 statement to GATT

`primary_docs/GATT_L648_Add1_1957-08-06_India_Statement_Import_Restrictions_FULLTEXT.md`

Three weeks before FERA permanence. **The closest documentary link found anywhere in the project
between "sterling" and the 1957 restriction decision** — but read carefully: "India's sterling
balances, which constitute the country's foreign exchange reserve, have been declining at the rate
of about Rs.10 million per day." This is accounting terminology (India's reserves happened to be
sterling-denominated), not a claim of British constraint — flagged explicitly in the writeup so it
isn't misquoted.

## 3. GATT L/719 — India's 23 October 1957 statement, eight days before the RBI Ordinance

`primary_docs/GATT_L719_1957-10-23_India_Statement_Licensing_Policy_FULLTEXT.md`

**The standout find of this pass.** States outright, eight days before the RBI Ordinance (31
October 1957): *"The reserves today stand substantially below the minimum prescribed by law, namely
Rupees 4,000 million which the Reserve Bank is required to maintain. The law permits Government to
give a temporary relaxation under which the Reserve Bank can permit its external balances to
decline to Rupees 3,000 million subject to a time limit of twelve months."* This upgrades H7 from
an arithmetic estimate (extrapolated from TTK's May 1957 speech) to a documented fact, and shows
the Ordinance's exact mechanism (Rs 400cr floor → temporary Rs 300cr relaxation, 12-month limit)
already being described as lawful and necessary before it was formalised.

## 4. GATT L-series document index

`primary_docs/GATT_L-series_1957_India_document_index.md`

The working index (`https://www.wto.org/gatt_docs/l.htm`) that made 2 and 3 findable — resolves the
project's "GATT 1957 India consultation" target. Lists every India-related 1957 filing with direct
PDF links.

## 5. T. T. Krishnamachari's statement to the IMF, September 1957

`primary_docs/IMF_TwelfthAnnualMeeting_1957-09_TTK_Governor_Statement_FULLTEXT.md`

Resolves the "Iengar 1957 statement" target — **with a correction**: the speaker was TTK himself, as
Governor for India, not Iengar. Washington, 23–26 September 1957 — three weeks after FERA
permanence, five weeks before the RBI Ordinance. TTK's account to the Fund: declining reserves, IMF
drawings "to the extent of half our quota," the Second Five-Year Plan, deficit-financing cuts.
**Sterling 0, Britain 0, British 0, United Kingdom 0** — the seventh primary source in the project
in which an Indian minister gives entirely non-British reasons for the exchange squeeze, this time
speaking directly to the international body most likely to hear a British-constraint argument if
one existed.

## 6. A closed negative finding: the Rajya Sabha September 1957 FERA debate remains unlocated

Tried this pass: the `elibrary.sansad.in` DSpace API (a working alternative platform, confirmed via
items 1 and 5 above), scoped first to "Council of States Debates" (`03f8bb6e-d5fc-4375-bb09-868f07f57cd6`,
zero hits for "Foreign Exchange Regulation") and then unscoped across the whole repository (444
hits, none from 1957 — the closest is 1959). This closes off the DSpace route as thoroughly as the
`rsdebate.nic.in` bitstream route (which now 404s on both previously-known URLs) — the debate is
either not digitised on this platform under any searchable term, or filed under a collection name
not yet identified. Still the largest open gap in the project's primary-source record. See
`REMAINING_DOCUMENTS_EXACT_LINKS.md` §3 for the manual browser route.

## Not attempted further this pass

- MEA's 1948 Financial Agreement (item from the prior pass) — still only partially recovered; the
  page is a JavaScript SPA that `firecrawl_scrape` cannot render even with `waitFor`, so the partial
  version from the previous pass stands.
- IMF Ninth Annual Report on Exchange Restrictions (1958) ISBN — not re-attempted.
- The individual chapter-XML shortcut that worked for the IMF's Summary Proceedings volume
  (9781475581959) does **not** work for the AREAER Eighth Report (9781475549263, confirmed 404 on
  `ch014.xml`) — that book is not chaptered the same way, so the UK/Pakistan/Ceylon/Australia/NZ/
  South Africa chapters (pp.184–388) remain reachable only via the same 183-page PDF ceiling as
  before.
