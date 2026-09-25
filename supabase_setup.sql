-- Run this once in Supabase SQL Editor for the shared visitor counter.
-- It makes the counter shared across visitors and persistent when the site is closed.

create table if not exists public.site_counter (
  id integer primary key check (id = 1),
  started_at timestamptz not null default now(),
  reload_count bigint not null default 0
);

insert into public.site_counter (id, started_at, reload_count)
values (1, now(), 0)
on conflict (id) do nothing;

alter table public.site_counter enable row level security;

drop function if exists public.register_page_load();

create or replace function public.register_page_load()
returns bigint
language plpgsql
security definer
set search_path = public
as $$
declare
  n bigint;
  elapsed_seconds bigint;
begin
  update public.site_counter
  set reload_count = reload_count + 1
  where id = 1
  returning reload_count into n;

  select floor(extract(epoch from (now() - started_at)))::bigint
    into elapsed_seconds
  from public.site_counter
  where id = 1;

  return 1000 + n + (greatest(elapsed_seconds,0) * 2);
end;
$$;

revoke all on function public.register_page_load() from public;
grant execute on function public.register_page_load() to anon, authenticated;
