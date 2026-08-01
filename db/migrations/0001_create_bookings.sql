-- Create bookings table
create table if not exists public.bookings (
  id uuid not null default gen_random_uuid(),
  package_id bigint not null,
  first_name text not null,
  second_name text null,
  travelers_no integer null default 1,
  total_amount numeric(10, 2) null default 0,
  payment_method jsonb null default '{"method": "", "details": ""}'::jsonb,
  booking_status text null default 'pending'::text,
  booking_date date null default CURRENT_DATE,
  created_at timestamp without time zone null default now(),
  updated_at timestamp without time zone null default now(),
  email text null,
  constraint bookings_pkey primary key (id),
  constraint bookings_package_id_fkey foreign KEY (package_id) references packages (id) on delete RESTRICT,
  constraint bookings_booking_status_check check (
    (
      booking_status = any (
        array[
          'pending'::text,
          'confirmed'::text,
          'cancelled'::text,
          'completed'::text
        ]
      )
    )
  )
) TABLESPACE pg_default;

create index IF not exists idx_bookings_package_id on public.bookings using btree (package_id) TABLESPACE pg_default;

create index IF not exists idx_bookings_booking_status on public.bookings using btree (booking_status) TABLESPACE pg_default;

create index IF not exists idx_bookings_created_at on public.bookings using btree (created_at) TABLESPACE pg_default;
