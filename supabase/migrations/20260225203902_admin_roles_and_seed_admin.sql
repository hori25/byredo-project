create table if not exists public.admin_roles (
  user_id uuid primary key references auth.users(id) on delete cascade,
  created_at timestamptz not null default now()
);

insert into public.admin_roles (user_id)
select id
from auth.users
where lower(coalesce(email, '')) = 'horidesignstudio@gmail.com'
on conflict (user_id) do nothing;

notify pgrst, 'reload schema';
