# ProjectorFirst — Cleanup Candidates
**Nothing on this list has been deleted or changed. Every item needs an owner decision.**
*Everything in the repo deploys to the public internet via Netlify, so junk and duplicates are live URLs today.*

How to use this file: mark each item **KEEP**, **ARCHIVE** (move to a non-deployed folder), or **DELETE**. When in doubt, ARCHIVE — it's reversible.

---

## Category A — Junk files (safe to remove; verified empty or accidental)

| File | What it is | Recommendation |
|---|---|---|
| `New Text Document.txt` | Empty (0 bytes) | Delete |
| `fortune-spin1` | 1 byte, no extension | Delete |
| `bingo1.txt` | Text copy of a bingo page | Delete |
| `spin wheel.txt` | Byte-identical copy of `spin wheel.html` | Delete |

## Category B — Confirmed duplicates (verified by comparing content)

| File | Duplicate of | Notes | Recommendation |
|---|---|---|---|
| `bingo-classic1.html` | `bingo-classic.html` | Byte-identical | Delete one |
| `bingo1.html` | `bingo.html` | Same game/title, older variant; `bingo.html` is the one linked from apps.html | Archive `bingo1.html` |
| `bingo-classic.html` | `bingo.html` | Same title "Classic Bingo Caller"; needs owner eyes to pick the keeper | Owner review |
| `memory-match.html` | `memory.html` | Same title; `memory.html` is linked from apps.html | Archive `memory-match.html` |
| `family-feud1.html` | `family-feud.html` | Same title | Owner review |
| `feud.html` | `resident-feud.html` | Both titled "Resident Feud"; neither linked from apps.html | Owner review |
| `spot-the-difference.html` | `spot-difference.html` | Different titles — may be two different games, not duplicates | Owner review |
| `pledge1.html` | `pledge.html` | Same page, minor title difference | Owner review |
| `index-mobiletest.html` | `index.html` | Test copy of the homepage — live at a public URL | Archive |
| `page-2.html` | `apps-preview.html` | Same title "Preview the Apps" | Owner review |
| `word-scrambler.html` | — | Misleading name: it's actually "Pop the Balloon — Word Guess," not a scrambler. Possible naming mix-up with `word-scramble.html` (the real scrambler) and `balloon.html` | Owner review |

## Category C — Unlinked game pages (possibly finished games not yet in the library — do NOT delete without checking)

These work as public URLs but nothing links to them. Each one is either an unreleased game (opportunity!) or an abandoned draft. Owner should open each and decide: add to apps.html, archive, or delete.

`armchair-travel.html`, `build-it.html`, `calendar-maker.html`, `coin.html`, `emojiguess.html`, `family-feud.html`, `finishsong.html`, `guess-the-price.html`, `guess-the-sound.html`, `how-much.html`, `lucky-horses.html` (has its own asset folder + track images), `magic-pot.html`, `movies.html`, `name-that-tune.html`, `number-picker.html`, `pledge.html`, `remember-the-list.html`, `remember-this.html`, `reminisce.html`, `singalong.html`, `slot.html`, `spin wheel.html`, `spinner.html`, `wheel.html`, `word-builder.html`

Note: `spinner.html`, `wheel.html`, and `spin wheel.html` may be three versions of the same spinner concept — owner review.

## Category D — Looks orphaned but is probably USED. Keep all of these.

| File | Why it looks orphaned | Why to keep |
|---|---|---|
| `404.html` | Nothing links to it | Netlify serves it automatically for missing pages |
| `success.html`, `thank-you.html`, `thanks.html`, `cancel.html`, `welcome.html`, `purchase.html`, `free-trial-expired.html` | No internal links | Likely redirect targets configured in Stripe/Memberstack dashboards. Verify before touching — three "thanks" pages suggests at least one is unused, but which one is defined outside the repo |
| `login.html`, `tester.html` | No internal links | `login.html` is a `_redirects` target-adjacent page; `tester.html` grants tester access — may be shared by direct link |
| `header.html`, `footer.html`, `nav.html`, `include.js` | Zero pages use `data-include` | Unused today, but they're the seed of a future shared-header system. Archive rather than delete |

## Category E — Stray assets in the root folder

| File | Notes | Recommendation |
|---|---|---|
| `LuckyHorses_Track.jpg` + `.png` | Duplicated in root; a `lucky-horses/` folder exists | Owner review — check which one the game loads |
| `frank sinatra.mp3` (194KB, root) | A `/music` folder exists; also: commercial recordings raise licensing questions worth reviewing for a paid product | Owner review |
| `coffee.png`, `ruby.png` | Loose images in root | Owner review — check what references them before moving |

## Category F — Folders

| Folder | Notes | Recommendation |
|---|---|---|
| `ORIGINAL PAGES/` | One old bingo backup — publicly deployed | Archive outside the deployed site (git history already preserves everything) |
| `GAMES FROM ENGAGED SENIORS/` | `BIBLE.html`, `devotional-preview.html` — publicly deployed; folder name with spaces makes ugly/fragile URLs | Owner review: launch, rename, or archive |

---

## Safety rules for executing any cleanup (future milestone)

1. Git history preserves every file forever — nothing is truly lost.
2. Before deleting any page, search the repo for links to it AND check Stripe/Memberstack/Netlify dashboards for redirects pointing at it.
3. Archive means moving into a folder excluded from deployment, not deletion.
4. One category at a time, with a test of the live site after each deploy.
