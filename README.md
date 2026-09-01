# KITAABIA — Phase 5 Real Platform

Connected to the dedicated KITAABIA Supabase project.

## Features
- Real Supabase Auth
- Books + categories database
- Admin role authorization
- Admin cover/eBook upload
- Public cover bucket + private eBook bucket
- Signed eBook reader URLs
- Personal library/favorites database
- Reading activity heartbeat
- Next.js App Router + Supabase SSR

## Setup
1. Copy `.env.example` to `.env.local`.
2. Put your Supabase publishable key in `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`.
3. Run `npm install`.
4. Run `npm run dev`.
5. Create an account at `/signup`.
6. Promote that account to admin using `scripts/promote-admin.sql`.
7. Open `/admin` and upload your first book.

Only upload books you own, have permission to distribute, or that are public domain/licensed.
Never put a Supabase secret/service key in `.env.local` for the browser.
