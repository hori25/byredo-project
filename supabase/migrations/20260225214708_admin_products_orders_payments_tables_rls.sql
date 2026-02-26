create extension if not exists pgcrypto;

create or replace function public.is_admin()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1
    from public.profiles p
    where p.id = auth.uid()
      and p.role = 'admin'
  );
$$;

create table if not exists public.products (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  name text not null,
  description text,
  price numeric(12,2) not null check (price >= 0),
  is_active boolean not null default true
);

create table if not exists public.orders (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  user_id uuid not null references auth.users(id) on delete restrict,
  product_id uuid not null references public.products(id) on delete restrict,
  quantity integer not null default 1 check (quantity > 0),
  total_amount numeric(12,2) not null check (total_amount >= 0)
);

create index if not exists idx_orders_user_id on public.orders(user_id);
create index if not exists idx_orders_product_id on public.orders(product_id);

create table if not exists public.payments (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  order_id uuid not null references public.orders(id) on delete cascade,
  amount numeric(12,2) not null check (amount >= 0),
  status text not null default 'pending'
    check (status in ('pending', 'paid', 'refunded', 'canceled')),
  provider text,
  payment_key text
);

create index if not exists idx_payments_order_id on public.payments(order_id);
create index if not exists idx_payments_status on public.payments(status);

alter table public.products enable row level security;
alter table public.orders enable row level security;
alter table public.payments enable row level security;

drop policy if exists "products_admin_all" on public.products;
drop policy if exists "orders_admin_all" on public.orders;
drop policy if exists "orders_user_select_own" on public.orders;
drop policy if exists "payments_admin_all" on public.payments;

create policy "products_admin_all"
on public.products
for all
to authenticated
using (public.is_admin())
with check (public.is_admin());

create policy "orders_admin_all"
on public.orders
for all
to authenticated
using (public.is_admin())
with check (public.is_admin());

create policy "orders_user_select_own"
on public.orders
for select
to authenticated
using (auth.uid() = user_id);

create policy "payments_admin_all"
on public.payments
for all
to authenticated
using (public.is_admin())
with check (public.is_admin());

notify pgrst, 'reload schema';
