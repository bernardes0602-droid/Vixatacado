create extension if not exists pgcrypto;

do $$ begin
  create type public.user_role as enum ('admin', 'manager', 'seller', 'customer');
exception
  when duplicate_object then null;
end $$;

do $$ begin
  create type public.customer_status as enum ('pending', 'approved', 'blocked');
exception
  when duplicate_object then null;
end $$;

do $$ begin
  create type public.order_status as enum (
    'quote_sent',
    'review',
    'confirmed',
    'invoiced',
    'separation',
    'sent',
    'transport',
    'delivered',
    'cancelled'
  );
exception
  when duplicate_object then null;
end $$;

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  role public.user_role not null default 'customer',
  full_name text not null,
  email text not null,
  phone text,
  avatar_url text,
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.managers (
  id uuid primary key default gen_random_uuid(),
  profile_id uuid not null unique references public.profiles(id) on delete cascade,
  team_name text not null,
  created_at timestamptz not null default now()
);

create table if not exists public.sellers (
  id uuid primary key default gen_random_uuid(),
  profile_id uuid not null unique references public.profiles(id) on delete cascade,
  manager_id uuid references public.managers(id) on delete set null,
  display_name text not null,
  whatsapp text not null,
  email text,
  active boolean not null default true,
  created_at timestamptz not null default now()
);

create table if not exists public.customers (
  id uuid primary key default gen_random_uuid(),
  profile_id uuid unique references public.profiles(id) on delete set null,
  seller_id uuid references public.sellers(id) on delete set null,
  company_name text not null,
  document text,
  phone text not null,
  email text,
  city text,
  state text default 'ES',
  segment text,
  status public.customer_status not null default 'pending',
  approved_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.categories (
  id uuid primary key default gen_random_uuid(),
  parent_id uuid references public.categories(id) on delete set null,
  name text not null,
  slug text not null unique,
  description text,
  sort_order integer not null default 100,
  active boolean not null default true,
  seo_title text,
  seo_description text,
  created_at timestamptz not null default now()
);

create table if not exists public.brands (
  id uuid primary key default gen_random_uuid(),
  name text not null unique,
  slug text not null unique,
  logo_url text,
  active boolean not null default true,
  created_at timestamptz not null default now()
);

create table if not exists public.products (
  id uuid primary key default gen_random_uuid(),
  category_id uuid references public.categories(id) on delete set null,
  brand_id uuid references public.brands(id) on delete set null,
  name text not null,
  slug text not null unique,
  short_description text not null,
  full_description text,
  sku text not null unique,
  internal_code text,
  manufacturer_code text,
  stock integer not null default 0,
  price numeric(12,2) not null default 0,
  promo_price numeric(12,2),
  weight_kg numeric(10,3),
  height_cm numeric(10,2),
  width_cm numeric(10,2),
  length_cm numeric(10,2),
  featured boolean not null default false,
  novelty boolean not null default false,
  best_seller boolean not null default false,
  priority integer not null default 100,
  tags text[] not null default '{}',
  specifications jsonb not null default '{}'::jsonb,
  seo_title text,
  seo_description text,
  image_url text,
  gallery_urls text[] not null default '{}',
  active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.vehicle_applications (
  id uuid primary key default gen_random_uuid(),
  product_id uuid not null references public.products(id) on delete cascade,
  automaker text not null,
  model text not null,
  version text,
  year_start integer,
  year_end integer,
  engine text,
  notes text,
  cross_references text[] not null default '{}'
);

create table if not exists public.carts (
  id uuid primary key default gen_random_uuid(),
  customer_id uuid not null references public.customers(id) on delete cascade,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.cart_items (
  id uuid primary key default gen_random_uuid(),
  cart_id uuid not null references public.carts(id) on delete cascade,
  product_id uuid not null references public.products(id) on delete restrict,
  quantity integer not null check (quantity > 0),
  created_at timestamptz not null default now(),
  unique (cart_id, product_id)
);

create table if not exists public.shipping_methods (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  description text,
  active boolean not null default true,
  base_price numeric(12,2) not null default 0
);

create table if not exists public.carriers (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  tracking_url_template text,
  phone text,
  active boolean not null default true
);

create table if not exists public.orders (
  id uuid primary key default gen_random_uuid(),
  public_code text not null unique,
  customer_id uuid not null references public.customers(id) on delete restrict,
  seller_id uuid references public.sellers(id) on delete set null,
  status public.order_status not null default 'quote_sent',
  subtotal numeric(12,2) not null default 0,
  freight_value numeric(12,2) not null default 0,
  total numeric(12,2) not null default 0,
  shipping_method_id uuid references public.shipping_methods(id) on delete set null,
  carrier_id uuid references public.carriers(id) on delete set null,
  tracking_code text,
  tracking_url text,
  delivery_estimate date,
  notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.order_items (
  id uuid primary key default gen_random_uuid(),
  order_id uuid not null references public.orders(id) on delete cascade,
  product_id uuid references public.products(id) on delete set null,
  sku text not null,
  product_name text not null,
  quantity integer not null check (quantity > 0),
  unit_price numeric(12,2) not null,
  total numeric(12,2) not null
);

create table if not exists public.order_tracking (
  id uuid primary key default gen_random_uuid(),
  order_id uuid not null references public.orders(id) on delete cascade,
  carrier_id uuid references public.carriers(id) on delete set null,
  tracking_code text,
  tracking_url text,
  current_location text,
  delivery_estimate date,
  updated_at timestamptz not null default now()
);

create table if not exists public.order_status_history (
  id uuid primary key default gen_random_uuid(),
  order_id uuid not null references public.orders(id) on delete cascade,
  status public.order_status not null,
  note text,
  changed_by uuid references public.profiles(id) on delete set null,
  created_at timestamptz not null default now()
);

create table if not exists public.banners (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  subtitle text,
  cta_label text,
  cta_url text,
  image_url text,
  active boolean not null default true,
  sort_order integer not null default 100,
  created_at timestamptz not null default now()
);

create table if not exists public.blog_posts (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  slug text not null unique,
  image_url text,
  excerpt text,
  body text,
  category text,
  author_id uuid references public.profiles(id) on delete set null,
  status text not null default 'draft' check (status in ('draft', 'published')),
  seo_title text,
  seo_description text,
  published_at timestamptz,
  created_at timestamptz not null default now()
);

create table if not exists public.pages (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  title text not null,
  body jsonb not null default '{}'::jsonb,
  seo_title text,
  seo_description text,
  published boolean not null default true,
  updated_at timestamptz not null default now()
);

create table if not exists public.settings (
  key text primary key,
  value jsonb not null,
  updated_at timestamptz not null default now()
);

create table if not exists public.instagram_posts (
  id uuid primary key default gen_random_uuid(),
  image_url text not null,
  caption text,
  target_url text,
  active boolean not null default true,
  sort_order integer not null default 100,
  created_at timestamptz not null default now()
);

create or replace function public.current_role()
returns public.user_role
language sql
stable
security definer
set search_path = public
as $$
  select role from public.profiles where id = auth.uid() and is_active = true
$$;

create or replace function public.is_admin()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select public.current_role() = 'admin'
$$;

create or replace function public.is_manager()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select public.current_role() in ('admin', 'manager')
$$;

create or replace function public.is_seller()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select public.current_role() in ('admin', 'manager', 'seller')
$$;

alter table public.profiles enable row level security;
alter table public.managers enable row level security;
alter table public.sellers enable row level security;
alter table public.customers enable row level security;
alter table public.categories enable row level security;
alter table public.brands enable row level security;
alter table public.products enable row level security;
alter table public.vehicle_applications enable row level security;
alter table public.carts enable row level security;
alter table public.cart_items enable row level security;
alter table public.shipping_methods enable row level security;
alter table public.carriers enable row level security;
alter table public.orders enable row level security;
alter table public.order_items enable row level security;
alter table public.order_tracking enable row level security;
alter table public.order_status_history enable row level security;
alter table public.banners enable row level security;
alter table public.blog_posts enable row level security;
alter table public.pages enable row level security;
alter table public.settings enable row level security;
alter table public.instagram_posts enable row level security;

create policy "profiles read own or staff" on public.profiles
for select using (id = auth.uid() or public.is_seller());

create policy "profiles update own or admin" on public.profiles
for update using (id = auth.uid() or public.is_admin())
with check (id = auth.uid() or public.is_admin());

create policy "staff read managers" on public.managers
for select using (public.is_seller());

create policy "admin manage managers" on public.managers
for all using (public.is_admin())
with check (public.is_admin());

create policy "public read active sellers" on public.sellers
for select using (active = true or public.is_seller());

create policy "admin manage sellers" on public.sellers
for all using (public.is_admin())
with check (public.is_admin());

create policy "customers read by ownership" on public.customers
for select using (
  public.is_manager()
  or profile_id = auth.uid()
  or seller_id in (select id from public.sellers where profile_id = auth.uid())
);

create policy "customers insert own pending" on public.customers
for insert with check (profile_id = auth.uid() and status = 'pending');

create policy "staff manage customers" on public.customers
for update using (public.is_seller())
with check (public.is_seller());

create policy "public read active categories" on public.categories
for select using (active = true or public.is_seller());

create policy "admin manage categories" on public.categories
for all using (public.is_admin())
with check (public.is_admin());

create policy "public read active brands" on public.brands
for select using (active = true or public.is_seller());

create policy "admin manage brands" on public.brands
for all using (public.is_admin())
with check (public.is_admin());

create policy "public read active products" on public.products
for select using (active = true or public.is_seller());

create policy "admin manage products" on public.products
for all using (public.is_admin())
with check (public.is_admin());

create policy "public read applications for active products" on public.vehicle_applications
for select using (
  exists (
    select 1 from public.products
    where products.id = vehicle_applications.product_id
    and (products.active = true or public.is_seller())
  )
);

create policy "admin manage applications" on public.vehicle_applications
for all using (public.is_admin())
with check (public.is_admin());

create policy "customers manage own carts" on public.carts
for all using (
  customer_id in (select id from public.customers where profile_id = auth.uid() and status = 'approved')
)
with check (
  customer_id in (select id from public.customers where profile_id = auth.uid() and status = 'approved')
);

create policy "customers manage own cart items" on public.cart_items
for all using (
  cart_id in (
    select carts.id from public.carts
    join public.customers on customers.id = carts.customer_id
    where customers.profile_id = auth.uid() and customers.status = 'approved'
  )
)
with check (
  cart_id in (
    select carts.id from public.carts
    join public.customers on customers.id = carts.customer_id
    where customers.profile_id = auth.uid() and customers.status = 'approved'
  )
);

create policy "public read shipping methods" on public.shipping_methods
for select using (active = true or public.is_seller());

create policy "admin manage shipping methods" on public.shipping_methods
for all using (public.is_admin())
with check (public.is_admin());

create policy "public read carriers" on public.carriers
for select using (active = true or public.is_seller());

create policy "admin manage carriers" on public.carriers
for all using (public.is_admin())
with check (public.is_admin());

create policy "orders read by ownership" on public.orders
for select using (
  public.is_manager()
  or customer_id in (select id from public.customers where profile_id = auth.uid())
  or seller_id in (select id from public.sellers where profile_id = auth.uid())
);

create policy "approved customers create orders" on public.orders
for insert with check (
  customer_id in (select id from public.customers where profile_id = auth.uid() and status = 'approved')
  or public.is_seller()
);

create policy "staff update orders" on public.orders
for update using (public.is_seller())
with check (public.is_seller());

create policy "order items read by order access" on public.order_items
for select using (
  order_id in (
    select id from public.orders
    where public.is_manager()
    or customer_id in (select id from public.customers where profile_id = auth.uid())
    or seller_id in (select id from public.sellers where profile_id = auth.uid())
  )
);

create policy "order items insert by order access" on public.order_items
for insert with check (
  order_id in (
    select id from public.orders
    where public.is_seller()
    or customer_id in (select id from public.customers where profile_id = auth.uid() and status = 'approved')
  )
);

create policy "tracking read by order access" on public.order_tracking
for select using (
  order_id in (
    select id from public.orders
    where public.is_manager()
    or customer_id in (select id from public.customers where profile_id = auth.uid())
    or seller_id in (select id from public.sellers where profile_id = auth.uid())
  )
);

create policy "staff manage tracking" on public.order_tracking
for all using (public.is_seller())
with check (public.is_seller());

create policy "status history read by order access" on public.order_status_history
for select using (
  order_id in (
    select id from public.orders
    where public.is_manager()
    or customer_id in (select id from public.customers where profile_id = auth.uid())
    or seller_id in (select id from public.sellers where profile_id = auth.uid())
  )
);

create policy "staff insert status history" on public.order_status_history
for insert with check (public.is_seller());

create policy "public read active banners" on public.banners
for select using (active = true or public.is_seller());

create policy "admin manage banners" on public.banners
for all using (public.is_admin())
with check (public.is_admin());

create policy "public read published posts" on public.blog_posts
for select using (status = 'published' or public.is_seller());

create policy "admin manage blog posts" on public.blog_posts
for all using (public.is_admin())
with check (public.is_admin());

create policy "public read published pages" on public.pages
for select using (published = true or public.is_seller());

create policy "admin manage pages" on public.pages
for all using (public.is_admin())
with check (public.is_admin());

create policy "public read settings" on public.settings
for select using (true);

create policy "admin manage settings" on public.settings
for all using (public.is_admin())
with check (public.is_admin());

create policy "public read instagram posts" on public.instagram_posts
for select using (active = true or public.is_seller());

create policy "admin manage instagram posts" on public.instagram_posts
for all using (public.is_admin())
with check (public.is_admin());

create index if not exists idx_products_search on public.products using gin (
  to_tsvector('portuguese', coalesce(name, '') || ' ' || coalesce(short_description, '') || ' ' || coalesce(full_description, '') || ' ' || coalesce(sku, '') || ' ' || coalesce(manufacturer_code, ''))
);

create index if not exists idx_products_category on public.products(category_id);
create index if not exists idx_products_brand on public.products(brand_id);
create index if not exists idx_vehicle_applications_product on public.vehicle_applications(product_id);
create index if not exists idx_orders_customer on public.orders(customer_id);
create index if not exists idx_orders_seller on public.orders(seller_id);
create index if not exists idx_customers_seller on public.customers(seller_id);
