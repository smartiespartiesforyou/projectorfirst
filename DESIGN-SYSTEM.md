# ProjectorFirst Design System
**Status: PROTECTED — Do not change without owner approval.**
*Documented from the live codebase, July 2026. This file describes the design as it exists. It does not propose changes.*

---

## Design Philosophy

ProjectorFirst is built for seniors, activity directors, and care communities viewing on projectors and large TVs. Every design decision serves four rules:

1. **Big** — oversized text, oversized buttons, oversized targets.
2. **High contrast** — dark navy on white, white on navy. No subtle grays for important content.
3. **One-click simple** — no clutter, no nested menus, no confusion.
4. **Projector-readable** — legible from across a room.

Any new page or feature must follow these rules and match the tokens below exactly.

---

## Color Palette

| Role | Color | Tailwind class | Hex |
|---|---|---|---|
| Primary brand / headings / nav | Navy blue | `blue-900` / `text-blue-900` / `bg-blue-900` | `#1e3a8a` |
| Page background | White | `bg-white` | `#ffffff` |
| Body text | Black | `text-black` | `#000000` |
| Primary CTA (Start Free Trial) | Yellow | `bg-yellow-400`, hover `bg-yellow-300` | `#facc15` |
| CTA text | Near-black | `text-gray-900` | `#111827` |
| Sign Up / positive action | Green | `bg-green-700` | `#15803d` |
| Log Out / neutral action | Gray | `bg-gray-700` | `#374151` |
| Nav hover state | Lighter navy | `hover:bg-blue-800` | `#1e40af` |
| Theme color (browser chrome) | Navy | `<meta name="theme-color">` | `#1e3a8a` |

## Typography

- **Font stack:** system sans-serif — `ui-sans-serif, system-ui, -apple-system, sans-serif`. (Some pages use Arial or Inter; system stack is the dominant standard for new work. Do not "fix" existing pages without approval.)
- **H1:** `text-4xl sm:text-6xl font-extrabold text-blue-900 leading-snug` (game pages: ~2.5rem, weight 800, navy)
- **Hero subhead / lead paragraph:** `text-lg sm:text-2xl leading-relaxed`
- **Nav links / buttons:** `text-lg sm:text-xl font-bold`
- **Minimum body size:** never smaller than `text-lg` for content seniors will read.

## Shape & Spacing

- **Corners:** heavily rounded everywhere — `rounded-xl` for buttons/nav pills, `rounded-2xl` for cards and large CTAs. Never sharp corners.
- **Cards:** white background, `border-2 border-blue-900`, `rounded-2xl`, `p-8`, `shadow-sm`.
- **Buttons:** large padding (`px-6 py-3` minimum, up to `px-8 py-5` for primary actions), bold text, shadow, hover transition.
- **Content width:** `max-w-6xl mx-auto px-4`, centered text on marketing pages.

## Page Anatomy (marketing pages)

1. **Hero banner** — full-width navy (`bg-blue-900`) strip with white extrabold headline, lead text, and yellow CTA button. Sits above the header.
2. **Header** — sticky (`sticky top-0 z-40`), white, bottom border, subtle shadow. Logo (logo.svg, 48px) + "ProjectorFirst" wordmark in navy extrabold.
3. **Nav** — pill-shaped buttons, not text links: Home, Apps, About, Contact in navy; Sign up in green; Log in in navy; My Account (members) in green; Log out in gray. Membership visibility controlled by Memberstack `data-ms-content` attributes.
4. **Main content** — centered, generous vertical padding (`py-10 sm:py-14`).
5. **Feature cards** — 3-column grid on desktop (`sm:grid-cols-2 lg:grid-cols-3`), navy-bordered cards with emoji + bold navy label + short line.

## Game Page Anatomy

- Self-contained single HTML file, Tailwind CDN + inline `<style>` block.
- White background, black text, navy `#1e3a8a` headings (~2.5rem, weight 800).
- Flex column layout, content centered, `min-height: 100vh`, ~1rem padding.
- Controls are large, labeled, and few. Games are operated by one person (the activity director) at the front of a room.

## Accessibility Standards (already present — preserve them)

- Skip-to-content link (`.skip-link`) on marketing pages.
- Semantic landmarks: `role="banner"`, `<main id="main">`, `aria-label="Primary"` on nav.
- Visible focus rings: `focus:ring-4 focus:ring-blue-400`.
- Alt text on the logo image.

## Brand Assets

- **Logo:** `logo.svg` (also used as favicon and og:image).
- **Wordmark:** "ProjectorFirst" — one word, capital P and F, navy, extrabold.
- **Voice:** warm, plain, confidence-building. Speaks to activity directors and caregivers ("no prep, no stress," "residents actually enjoy").

## Technology Conventions (current state)

- Static HTML pages, no build system. Tailwind loaded from `cdn.tailwindcss.com`.
- Memberstack v2 script for auth/membership (`data-memberstack-app` in head).
- Stripe payment link for checkout.
- Netlify `_redirects` for friendly URLs.

---

## The Protection Rule

New pages must reuse these exact tokens and structures. If a change would *noticeably alter the appearance* of any existing page, stop and get owner approval first. Never modernize, restyle, or "improve" the design unprompted. The look is the product.
