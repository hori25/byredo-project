alter table public.products
  add column if not exists slug text,
  add column if not exists category text,
  add column if not exists image text,
  add column if not exists size text,
  add column if not exists size_info text,
  add column if not exists try_it_first boolean not null default false,
  add column if not exists display_order integer not null default 0;

update public.products
set slug = lower(regexp_replace(coalesce(name, id::text), '[^a-zA-Z0-9]+', '-', 'g'))
where slug is null;

alter table public.products
  alter column slug set not null;

create unique index if not exists idx_products_slug_unique on public.products(slug);
create index if not exists idx_products_display_order on public.products(display_order);

drop policy if exists "products_public_select_active" on public.products;
create policy "products_public_select_active"
on public.products
for select
to anon, authenticated
using (is_active = true or public.is_admin());

insert into public.products (
  name,
  description,
  price,
  is_active,
  slug,
  category,
  image,
  size,
  size_info,
  try_it_first,
  display_order
)
select *
from (
  values
    ('MOJAVE GHOST', null, 420, true, 'mojave-ghost', 'EAU DE PARFUM', '/images/products/shop_1.png', '250 ml', '+2 SIZE', true, 1),
    ('CASABLANCA LILY', null, 340, true, 'casablanca-lily', 'PERFUME EXTRACT', '/images/products/shop_2.png', '', '', true, 2),
    ('LA SÉLECTION BYREDO', null, 129, true, 'la-selection-byredo', 'TRAVEL SIZE', '/images/products/shop_3.png', '', '', true, 3),
    ('BLACK SAFFRON', null, 420, true, 'black-saffron', 'EAU DE PARFUM', '/images/products/shop_4.png', '250 ml', '+2 SIZE', true, 4),
    ('BIBLIOTHÈQUE', null, 185, true, 'bibliotheque', 'EAU DE PARFUM', '/images/products/shop_5.png', '100 ml', '+2 SIZE', true, 5),
    ('VANILLE ANTIQUE', null, 275, true, 'vanille-antique', 'NIGHT VEILS', '/images/products/shop_6.png', '75 ml', '', true, 6),
    ('GYPSY WATER', null, 185, true, 'gypsy-water', 'EAU DE PARFUM', '/images/products/shop_7.png', '100 ml', '+2 SIZE', true, 7),
    ('BOIS OBSCUR', null, 275, true, 'bois-obscur', 'NIGHT VEILS', '/images/products/shop_8.png', '75 ml', '', true, 8)
) as seed_data(
  name,
  description,
  price,
  is_active,
  slug,
  category,
  image,
  size,
  size_info,
  try_it_first,
  display_order
)
where not exists (select 1 from public.products)
on conflict (slug) do nothing;

notify pgrst, 'reload schema';
