# ProjectorFirst — Project Log
*Running record of all work. Newest entries at the top of each section. Update every milestone.*

---

## Current Task

- **Milestone 3 ("Everyone pays $9.99") — CORE PROVEN end-to-end on preview, 2026-07-05.**
- Business decision: NO free trial. One plan: Monthly $9.99 (pln_monthly-48i7040z / prc_pro-monthly-2q6503uw), via Memberstack↔Stripe (already connected).
- Rewired on paywall-test branch: index.html (hero + CTA), checkout.html + subscribe.html (Memberstack checkout replaces raw buy.stripe.com link), signup.html + preview.html (wording + price wiring).
- **TEST PASSED:** incognito signup → Stripe sandbox checkout ($9.99 Monthly, test card) → Monthly plan auto-attached in Memberstack (test-mode member pftestbuyer2026@aol.com) → dice.html playable. Payment→access glue confirmed working.
- Findings: Memberstack has separate live/test member lists (toggle in Members view). Stripe business name displays as "AP MANAGEMENT" — cosmetic, owner may rename to ProjectorFirst in Stripe settings. 12 real live members exist, several recently active (warm leads for conversion email).
- **Milestone 4 (full rollout) BUILT 2026-07-05, awaiting upload + preview walkthrough:** all 53 remaining game pages gated with guard.js (39 previously open, 6 lock-check replaced, 6 login-only gates replaced, apps/balloon/pictionary trial-loophole gates replaced); welcome.html and free-trial-expired.html re-worded for the no-trial model (URLs kept — may be dashboard redirect targets); _redirects updated to hide internal .md docs from the public site; docs committed alongside.
- lock-check.js file itself left in repo as an orphan (nothing references it now) — listed in CLEANUP-CANDIDATES.
- **REMAINING before merge:** (1) owner uploads rollout batch to paywall-test; (2) full preview walkthrough (buyer plays several games; incognito bounces on several games incl. an ex-lock-check page); (3) tester.html decision; (4) conversion email to existing members; (5) owner checks Stripe for real paying subscribers → manually attach Monthly plan in Memberstack; (6) merge to main.
- **Do NOT merge to main yet. Production still untouched.**

## Completed Tasks

**2026-07-04 — Milestone 2 (partial): Paywall audit + gate built (production untouched)**
- Full paywall audit: only 9 pages truly gated (3 strong with plan checks, 6 login-only); 6 pages on broken lock-check.js that likely bounces PAYING members (nothing sets `pf_member`); 39 game pages fully open by direct URL; `tester.html` is a live public free-access backdoor (plan `pln_tester-access-pz107f5`); trial-expiry loophole found in apps.html gate logic.
- Owner set the paywall policy (no free games; trial is the preview).
- guard.js written, approved, syntax-checked, and smoke-tested against 5 simulated member states — all pass. Fixes trial loophole; adds 10s fail-closed timeout; testers intentionally still pass pending Step 5 review.
- GUARD-TEST-PLAN.md created: 8 scenarios, test-account recipes, Netlify Deploy Preview method so production is never at risk.
- Gated dice.html prepared for the `paywall-test` branch (verified minimal diff). Branch upload instructions and Test #1 steps delivered to owner.

**2026-07-04 — Milestone 1: Documentation (no code changes)**
- Full read-only analysis of the GitHub repo (`smartiespartiesforyou/projectorfirst`).
- Delivered architecture summary, file map, design protection summary, risk list, and milestone plan.
- Created `DESIGN-SYSTEM.md` (protected design spec), `PROJECT-LOG.md` (this file), `CLEANUP-CANDIDATES.md` (file review list — owner decision required, nothing deleted).

## Known Bugs / Issues

1. **Paywall gaps (revenue risk).** Most game pages are publicly reachable by direct URL with no membership check. Only ~20 of 82 pages load Memberstack at all.
2. **lock-check.js may lock out paying members.** Six games (family-feud, how-much, remember-this, spot-difference, word-builder, word-scrambler) redirect to checkout unless localStorage key `pf_member` is set — but no code in the repo ever sets `pf_member`. Needs verification: paying members may be bounced to checkout on these games.
3. **Unused include system.** `include.js`, `header.html`, `footer.html`, `nav.html` exist but zero pages use `data-include`. Every page hard-codes its own header, which causes drift.
4. **Font drift.** Pages variously use system fonts, Arial, and Inter.
5. **Sitemap lists only 5 URLs** — game pages invisible to search engines.
6. **Duplicate pages live in production** (see CLEANUP-CANDIDATES.md) — SEO duplication and stale-content risk.

## Open Questions

1. **What is running on Render?** Owner is not sure. No Render URLs or API calls exist anywhere in the codebase. Possibilities: an old/abandoned deployment, or a service not referenced by the site. Action: owner to check the Render dashboard when convenient.
2. **What sets `pf_member` in localStorage?** (Related to bug #2.) Possibly a Memberstack custom script configured in the Memberstack dashboard rather than the repo, or leftover from an abandoned approach.
3. **Are the orphaned game pages** (see CLEANUP-CANDIDATES.md, Category C) **finished games awaiting launch, or abandoned drafts?** Owner decision per game.
4. **Intended paywall model:** which games should be free previews vs. members-only? Needed before fixing bug #1.

## Future Improvements (proposed, NOT approved)

1. **Paywall integrity pass** — consistent Memberstack gating on members-only games; retire lock-check.js. (Recommended Milestone 2 — revenue impact.)
2. **Expand sitemap.xml** to include all public pages. (Small, zero visual impact, SEO win.)
3. **Shared stylesheet / header include** to stop design drift — must be pixel-identical to current look; requires approval and careful testing.
4. **Replace Tailwind CDN with a pinned production build** — identical appearance, faster loads, no risk of upstream changes. Requires approval.
5. **Repo cleanup** per CLEANUP-CANDIDATES.md once owner approves each item.
6. **Add unlinked finished games to apps.html** — instant catalog growth if they're launch-ready.

## Ideas Backlog

- Game library categories (music, memory, faith-based, physical activity, trivia) once the catalog grows.
- Activity Director onboarding page ("your first week with ProjectorFirst").
- Seasonal/holiday game bundles (Halloween bingo already exists — pattern to repeat).
- SEO content: blog targeting "nursing home activity ideas," "senior group games," etc.
- Communities to reach: Activity Director groups, therapy/recreation associations, church activity coordinators.

## Technical Debt Register

- Duplicated header/nav markup across ~80 pages (highest-impact debt).
- Two competing gating mechanisms (Memberstack attributes vs. lock-check.js).
- Media files (40 mp3s, ~11MB) stored in the git repo — acceptable now, revisit if the library grows.
- Junk/duplicate files deployed to production (tracked in CLEANUP-CANDIDATES.md).
- Filenames with spaces (`spin wheel.html`, folder names) — fragile for URLs and tooling.

## Architecture Decisions

- **2026-07-04:** GitHub repo is the single source of truth; Netlify serves production. Render status unknown (see Open Questions).
- **2026-07-04:** The existing design is frozen and documented in DESIGN-SYSTEM.md. All future work must match it. No redesigns without explicit owner approval.
- **2026-07-04:** Static-site architecture is retained deliberately — it is simple, fast, and appropriate. No framework migration is planned or desired.
- **2026-07-04:** Workflow: one milestone at a time → plan, build, test, document, summarize → owner approval before the next milestone.
