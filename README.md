# KITAABIA

Read. Learn. Grow.

## V4 fixes
- Login now redirects administrators to `/admin` and normal users to `/books`.
- Admin page clearly reports when the signed-in account has no admin role.
- TypeScript dependencies and Supabase SSR imports are included.

## Environment variables
NEXT_PUBLIC_SUPABASE_URL=https://uzpyfwavdwtkhcosqhrr.supabase.co
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=your_publishable_key

## Admin role
The signed-in admin account must have a row in `public.user_roles` with `role = 'admin'`. Run `scripts/promote-admin.sql` in Supabase SQL Editor after the account exists.
