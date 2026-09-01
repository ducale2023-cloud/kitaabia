-- KITAABIA production schema.
-- Apply to a NEW KITAABIA Supabase project, not an unrelated existing project.

create extension if not exists pgcrypto;

create table if not exists public.categories (
  id uuid primary key default gen_random_uuid(),
  name text not null unique,
  slug text not null unique,
  description text,
  created_at timestamptz not null default now()
);

create table if not exists public.books (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  slug text not null unique,
  author text not null,
  description text,
  category_id uuid references public.categories(id) on delete set null,
  cover_url text,
  file_path text,
  file_type text not null default 'pdf',
  language text not null default 'English',
  is_featured boolean not null default false,
  is_published boolean not null default false,
  views integer not null default 0,
  downloads integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  display_name text,
  avatar_url text,
  created_at timestamptz not null default now()
);

create table if not exists public.user_books (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  book_id uuid not null references public.books(id) on delete cascade,
  progress integer not null default 0 check(progress between 0 and 100),
  last_read_at timestamptz not null default now(),
  unique(user_id,book_id)
);

create table if not exists public.favorites (
  user_id uuid not null references auth.users(id) on delete cascade,
  book_id uuid not null references public.books(id) on delete cascade,
  created_at timestamptz not null default now(),
  primary key(user_id,book_id)
);

alter table public.categories enable row level security;
alter table public.books enable row level security;
alter table public.profiles enable row level security;
alter table public.user_books enable row level security;
alter table public.favorites enable row level security;

create policy "public read categories" on public.categories for select to anon,authenticated using(true);
create policy "public read published books" on public.books for select to anon,authenticated using(is_published=true);
create policy "own profile select" on public.profiles for select to authenticated using((select auth.uid())=id);
create policy "own profile update" on public.profiles for update to authenticated using((select auth.uid())=id) with check((select auth.uid())=id);
create policy "own reading progress" on public.user_books for all to authenticated using((select auth.uid())=user_id) with check((select auth.uid())=user_id);
create policy "own favorites" on public.favorites for all to authenticated using((select auth.uid())=user_id) with check((select auth.uid())=user_id);

insert into public.categories(name,slug) values
('Business','business'),('Self-Development','self-development'),('Psychology','psychology'),
('History','history'),('Science','science'),('Technology','technology'),
('Fiction','fiction'),('Somali Books','somali-books')
on conflict(slug) do nothing;

-- Storage buckets should be created/configured separately:
-- book-covers: public or signed URLs depending on your policy
-- ebooks: PRIVATE recommended for controlled access
