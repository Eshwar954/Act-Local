-- Act-local database schema (Supabase / Postgres)
-- Run this entire file in Supabase SQL editor.

-- 0) Extensions (uuid generation)
create extension if not exists pgcrypto;

-- 1) PROFILES: app profile linked to auth.users
create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text unique,
  name text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- updated_at trigger
create or replace function public.trigger_set_timestamp()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end; $$;

drop trigger if exists set_timestamp_profiles on public.profiles;
create trigger set_timestamp_profiles
before update on public.profiles
for each row execute function public.trigger_set_timestamp();

-- auto-create profile after signup
create or replace function public.handle_new_user()
returns trigger language plpgsql security definer as $$
begin
  insert into public.profiles (id, email)
  values (new.id, new.email)
  on conflict (id) do nothing;
  return new;
end; $$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
after insert on auth.users
for each row execute function public.handle_new_user();

-- RLS for profiles
alter table public.profiles enable row level security;

drop policy if exists "profiles_read_own" on public.profiles;
create policy "profiles_read_own"
on public.profiles for select
using (auth.uid() = id);

drop policy if exists "profiles_update_own" on public.profiles;
create policy "profiles_update_own"
on public.profiles for update
using (auth.uid() = id);

drop policy if exists "profiles_insert_none" on public.profiles;
create policy "profiles_insert_none"
on public.profiles for insert
to authenticated
with check (false);

-- Backfill profiles for existing users (safe to run multiple times)
insert into public.profiles (id, email)
select id, email from auth.users
on conflict (id) do nothing;

-- 2) OPPORTUNITIES: posted by organizations (org_id = profile id)
create table if not exists public.opportunities (
  id uuid primary key default gen_random_uuid(),
  org_id uuid not null references public.profiles(id) on delete cascade,
  title text not null,
  cause text not null,
  city text not null,
  time text not null,
  type text not null check (type in ('In-person','Remote')),
  spots int not null default 0 check (spots >= 0),
  description text,
  live_days int not null default 30 check (live_days >= 1),
  created_at timestamptz not null default now(),
  expires_at timestamptz generated always as (
    created_at + (live_days || ' days')::interval
  ) stored
);

-- indexes for explore filters
create index if not exists idx_opps_cause on public.opportunities(cause);
create index if not exists idx_opps_city on public.opportunities(city);
create index if not exists idx_opps_time on public.opportunities(time);
create index if not exists idx_opps_created on public.opportunities(created_at desc);

-- active opportunities view
create or replace view public.v_opportunities_active as
select *
from public.opportunities
where expires_at > now();

-- RLS for opportunities
alter table public.opportunities enable row level security;

-- anyone can read (tighten later if needed)
drop policy if exists "opps_select_all" on public.opportunities;
create policy "opps_select_all"
on public.opportunities for select
using (true);

-- only owner can insert/update/delete
drop policy if exists "opps_insert_owner" on public.opportunities;
create policy "opps_insert_owner"
on public.opportunities for insert
to authenticated
with check (org_id = auth.uid());

drop policy if exists "opps_update_owner" on public.opportunities;
create policy "opps_update_owner"
on public.opportunities for update
using (org_id = auth.uid())
with check (org_id = auth.uid());

drop policy if exists "opps_delete_owner" on public.opportunities;
create policy "opps_delete_owner"
on public.opportunities for delete
using (org_id = auth.uid());

-- End of schema


