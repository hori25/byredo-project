-- Allow guest/anonymous checkout (no auth.users account required)
alter table public.orders alter column user_id drop not null;

-- Allow catalog-based products (not stored in public.products table)
alter table public.orders alter column product_id drop not null;

-- Product display name for catalog orders
alter table public.orders add column if not exists product_name text;

-- TossPayments order ID for idempotency and lookup
alter table public.orders add column if not exists toss_order_id text;
create unique index if not exists idx_orders_toss_order_id
  on public.orders(toss_order_id)
  where toss_order_id is not null;

-- TossPayments order ID in payments for direct lookup
alter table public.payments add column if not exists toss_order_id text;

notify pgrst, 'reload schema';
