create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text,
  full_name text,
  role text not null default 'customer' check (role in ('customer', 'admin')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.profiles enable row level security;

do $$
begin
  if not exists (
    select 1
    from pg_policies
    where schemaname = 'public'
      and tablename = 'profiles'
      and policyname = 'profiles_select_own'
  ) then
    create policy profiles_select_own
      on public.profiles
      for select
      to authenticated
      using (auth.uid() = id);
  end if;

  if not exists (
    select 1
    from pg_policies
    where schemaname = 'public'
      and tablename = 'profiles'
      and policyname = 'profiles_update_own'
  ) then
    create policy profiles_update_own
      on public.profiles
      for update
      to authenticated
      using (auth.uid() = id)
      with check (auth.uid() = id);
  end if;
end $$;

create or replace function public.set_profiles_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists profiles_set_updated_at on public.profiles;
create trigger profiles_set_updated_at
before update on public.profiles
for each row
execute function public.set_profiles_updated_at();

create or replace function public.handle_new_auth_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
declare
  incoming_name text;
  normalized_email text;
begin
  incoming_name := coalesce(new.raw_user_meta_data ->> 'full_name', new.raw_user_meta_data ->> 'name');
  normalized_email := lower(coalesce(new.email, ''));

  insert into public.profiles (id, email, full_name, role)
  values (
    new.id,
    new.email,
    incoming_name,
    case
      when normalized_email = 'horidesignstudio@gmail.com' then 'admin'
      else 'customer'
    end
  )
  on conflict (id) do update
  set
    email = excluded.email,
    full_name = coalesce(excluded.full_name, public.profiles.full_name),
    role = case
      when lower(coalesce(excluded.email, '')) = 'horidesignstudio@gmail.com' then 'admin'
      else public.profiles.role
    end,
    updated_at = now();

  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
after insert on auth.users
for each row
execute function public.handle_new_auth_user();

insert into public.profiles (id, email, full_name, role)
select
  u.id,
  u.email,
  coalesce(u.raw_user_meta_data ->> 'full_name', u.raw_user_meta_data ->> 'name') as full_name,
  case
    when lower(coalesce(u.email, '')) = 'horidesignstudio@gmail.com' then 'admin'
    else 'customer'
  end as role
from auth.users u
on conflict (id) do update
set
  email = excluded.email,
  full_name = coalesce(excluded.full_name, public.profiles.full_name),
  role = case
    when lower(coalesce(excluded.email, '')) = 'horidesignstudio@gmail.com' then 'admin'
    else public.profiles.role
  end,
  updated_at = now();

notify pgrst, 'reload schema';
