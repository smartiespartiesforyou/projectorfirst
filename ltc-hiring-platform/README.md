# LTC Hiring Platform (Phase 1)

A calm, quality-first hiring platform for long-term care facilities.

## Stack
- Next.js App Router + React + Tailwind CSS
- Supabase (Postgres + Auth + Storage)

## Project Structure
- `app/` route pages and API handlers
- `components/` reusable UI components
- `lib/` Supabase clients and data access
- `supabase/schema.sql` database schema for phase 1

## Run locally
1. Install dependencies
   ```bash
   npm install
   ```
2. Configure environment
   ```bash
   cp .env.example .env.local
   ```
3. Add your Supabase keys and admin token.
4. Start dev server
   ```bash
   npm run dev
   ```

## Phase 1 included
- Homepage with minimal search
- Jobs list page
- Job detail page with fit check
- Application submit flow
- Admin-only job creation page (`/admin/jobs/new`)
