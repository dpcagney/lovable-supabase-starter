
create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text,
  avatar_url text,
  created_at timestamptz default now()
);
alter table public.profiles enable row level security;
create policy "Read own profile" on public.profiles
  for select using (auth.uid() = id);
create policy "Update own profile" on public.profiles
  for update using (auth.uid() = id);

create table if not exists public.metrics (
  ts timestamptz primary key,
  value numeric not null
);
alter table public.metrics enable row level security;
create policy "Read metrics" on public.metrics
  for select using (auth.role() = 'authenticated');
