create extension if not exists pgcrypto;

create table if not exists public.bookings (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  full_name text not null,
  phone text not null,
  email text,
  service text not null,
  barber text not null default 'Sin preferencia',
  appointment_date date not null,
  appointment_time time not null,
  description text,
  comments text,
  accept_terms boolean not null default false,
  wants_contact boolean not null default false,
  contact_method text,
  status text not null default 'received',
  calendar_event_id text,
  calendar_event_link text,
  calendar_error text
);

alter table public.bookings enable row level security;
