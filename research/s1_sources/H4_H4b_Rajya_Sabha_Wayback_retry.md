# H4 / H4b — Rajya Sabha, Vol. 18, 6 Sept and 2 Sept 1957 — Wayback retry

### H4/H4b — DEAD END (confirmed, not transient)
**Route that worked:** N/A — this is a negative finding. `web.archive.org` (Wayback Machine) queried directly for the exact bitstream URLs and for the URL-prefix listing.

**What was checked:**
1. `web.archive.org/web/2018/https://rsdebate.nic.in/bitstream/123456789/572037/2/ID_18_06091957_17_p3928_p3954_5.pdf` → HTTP 404, "The Wayback Machine has not archived that URL."
2. `web.archive.org/web/*/https://rsdebate.nic.in/bitstream/123456789/572037/2/*` (the URL-prefix listing, which shows every capture Wayback has ever made under that path, at any timestamp) → **"No URL has been captured for this URL prefix." / "No URLs" in the results table.**

**Confidence tag:** STATED. This is not the same failure mode as the "IA temporarily offline, 503" seen in a previous session — that was a service outage; this is Wayback's own index confirming it has **never once crawled anything under this path**, at any time in its history. rsdebate.nic.in was evidently never added to any crawl scope Wayback covers (likely because it long sat behind bot-exclusion / was never linked from a page Wayback's crawlers followed).

**Verdict against acceptance criterion:** failed — this specific route is now conclusively closed, not just temporarily blocked. Retrying it again in a future pass would waste a call.

**What this changes:** removes Wayback from the list of viable routes to the Rajya Sabha 1957 debate text. The citation coordinates (Vol. 18, 6 Sept 1957 pp. 3928–3954 for the substantive debate; 2 Sept 1957 pp. 2850–2953 for the Bill-as-passed-by-Lok-Sabha being laid on the table) remain solid from T1.3c's earlier work — only the full text is unreachable.

**Remaining routes, in order of promise:**
1. A real interactive browser session against the current `sansad.in` Rajya Sabha digital library search UI (the `browser-use` skill), to find wherever the debate has been re-hosted after the `rsdebate.nic.in` → `sansad.in` migration. Not yet attempted with an actual browser in this project.
2. Direct email/contact to the Rajya Sabha Secretariat Library, or a research-library copy of the printed *Rajya Sabha Debates*, Vol. 18 — outside the scope of what any of these tools can do.
3. Check whether the Internet Archive's `rsdebate.nic.in.*` mirror (confirmed to exist for ~1985 onward) has since been extended backward — worth a single re-check in a future session, not now (already checked once and returned 0 results for 1957).
