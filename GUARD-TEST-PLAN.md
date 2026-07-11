# guard.js Test Plan
**Status: guard.js approved as draft. Not applied to any page. No tests run yet.**

---

## How we test WITHOUT risking the live site

We use a **Netlify Deploy Preview** — a private copy of the whole site that Netlify builds automatically from a branch. Real production at projectorfirst.com is never touched.

**Setup (one time, ~5 minutes, done in a future approved milestone):**

1. In GitHub, create a branch called `paywall-test` (Branch dropdown → type name → "Create branch").
2. On that branch only: add `guard.js` and add the gate to **one** game page (proposal: `dice.html` — simple, low-stakes).
3. Netlify automatically builds the branch into a preview site with its own private URL, something like `https://paywall-test--yoursite.netlify.app`. (Found in Netlify → Deploys → the branch deploy.)
4. All testing happens on that preview URL. The live site keeps running the old code, completely unaffected.
5. Only after every test below passes do we merge to the main branch — and even then, one small batch of games at a time.

**Rollback safety:** if anything ever goes wrong after a merge, reverting is one click in GitHub (Revert commit) and Netlify redeploys the old version in about a minute.

**Backup option** (if branch previews feel confusing): add a single unlinked test page (`gate-test-dice.html`) to the live site. Nobody can find it without the URL, and no real game page changes. Deploy Preview is still the better, cleaner method.

---

## Test accounts needed (created in Memberstack dashboard — free)

| # | Account | How to create it |
|---|---|---|
| T1 | Logged out | No account needed — use a private/incognito window |
| T2 | Active trial | Sign up fresh through the site's own Start Free Trial button using a test email |
| T3 | Paid subscriber | Your own real account, or a test account with the paid plan attached manually in the Memberstack dashboard (Members → select member → Add plan) |
| T4 | Expired trial | Take a trial account and, in Memberstack dashboard, cancel/remove its trial plan (simulates expiry). Also note any REAL expired-trial member already in your dashboard — testing with a genuinely expired account is the gold standard, because it shows the exact status label Memberstack uses (`ACTIVE` vs `TRIALING` vs something else). This is the single most important unknown in the whole plan. |
| T5 | Canceled subscriber | Test account with a paid plan added then canceled in the dashboard |
| T6 | Tester | Account created via tester.html's button (tester plan `pln_tester-access-pz107f5`) |

Tip: Gmail trick for test emails — yourname+trial@gmail.com, yourname+expired@gmail.com etc. all deliver to your normal inbox but count as separate accounts.

---

## The test matrix

Run each scenario against the gated test page on the Deploy Preview URL. Expected results:

| # | Scenario | Steps | PASS looks like |
|---|---|---|---|
| 1 | Logged-out visitor | Incognito window → open gated game URL directly | Redirected to homepage within ~2 seconds. Game never becomes playable. |
| 2 | Active trial (T2) | Log in → open gated game URL | Game loads and plays normally. No redirect, no visual difference, nothing weird in appearance. |
| 3 | Paid subscriber (T3) | Log in → open gated game URL | Same as #2 — plays normally. |
| 4 | Expired trial (T4) | Log in → open gated game URL | Redirected to checkout.html. **Also record:** the plan's exact status shown in Memberstack dashboard for this member (closes the ACTIVE/TRIALING question). |
| 5 | Canceled subscriber (T5) | Log in → open gated game URL | Redirected to checkout.html. |
| 6 | Tester (T6) | Log in → open gated game URL | Game plays normally (testers intentionally still pass — their fate is decided separately in Step 5 of the paywall plan). |
| 7 | Memberstack slow/fail | On the gated page, open browser DevTools → Network tab → right-click `static.memberstack.com` request → Block request domain → reload. (Or install an ad blocker that blocks it.) | Page redirects to homepage after ~10 seconds (fail-closed). It must NOT stay open and playable forever. |
| 8 | Devices | Repeat scenarios 1, 2, and 4 on: iPhone/Android phone, iPad/tablet, desktop (Chrome + one other browser, e.g. Safari or Edge) | Same behavior everywhere. On mobile, also confirm the redirect doesn't loop or flicker. |

**Extra checks during any PASS:**
- No new visual difference of any kind for members (compare gated test page side-by-side with the same live page).
- Browser console shows no red errors on member-visible pages.
- Back button after a redirect does NOT return to a playable game (guard uses location.replace — verify it worked).

## Recording results

Copy this line per test into PROJECT-LOG.md:
`[date] Test #N — device/browser — account — PASS/FAIL — notes`

**Rule: any FAIL stops rollout.** Fix, re-test on the preview, and only merge when the matrix is 100% green.

## Known open items this testing resolves

1. The exact Memberstack status string for trial and expired-trial members (scenario 4).
2. Whether the 10-second fail-close timeout is right, too slow, or too aggressive on bad connections (scenarios 7 + 8 on a phone with weak signal if possible).
3. Whether the brief content "flash" before redirect is noticeable enough to bother with a hide-then-reveal option (watch for it in scenarios 1, 4, 5).
