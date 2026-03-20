# Renno

Renno is a warm, editorial home-services marketplace built with Next.js 14, TypeScript, Tailwind, Framer Motion, Supabase, and Stripe Connect.

## Included in this scaffold

- Marketing landing page with the requested editorial serif-led direction
- App Router product shell for client and pro workflows
- Mock data for projects, pros, quotes, milestones, and messaging
- Supabase migration starter and environment variable template
- Stripe and API route stubs for onboarding, payments, release, matching, and AI scoping

## Local setup

1. Install dependencies with `npm install`.
2. Copy `.env.local.example` to `.env.local` and fill in Supabase, Stripe, and Resend keys.
3. Run the SQL in [supabase/migrations/001_initial.sql](/Users/oscar/Desktop/renno/supabase/migrations/001_initial.sql) and [supabase/migrations/002_auth_and_client_rls.sql](/Users/oscar/Desktop/renno/supabase/migrations/002_auth_and_client_rls.sql) in your Supabase project.
4. In Supabase Auth, enable Google under Authentication -> Providers and add your site URL plus `/auth/callback` to the redirect allow list.
5. Run `npm run dev`.

## What is scaffolded vs. production-ready

The repo currently includes polished UI, route structure, design system, typed mock data, and backend integration entry points.

The following are intentionally stubbed and should be wired to live services next:

- Supabase auth/session persistence
- Supabase auth trigger and RLS migration execution inside your hosted Supabase project
- Storage uploads and realtime subscriptions
- Stripe Connect onboarding and milestone escrow logic
- React Hook Form and Zod-backed submission flows
- Resend transactional email delivery
- Leaflet map picker and geocoding

## Data model

The SQL schema lives at [supabase/migrations/001_initial.sql](/Users/oscar/Desktop/renno/supabase/migrations/001_initial.sql).
