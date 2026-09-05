create extension if not exists "pgcrypto";

create table if not exists facilities (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  city text not null,
  state text not null,
  address text not null,
  description text,
  active boolean not null default true
);

create table if not exists jobs (
  id uuid primary key default gen_random_uuid(),
  facility_id uuid not null references facilities(id) on delete cascade,
  title text not null,
  category text not null,
  employment_type text not null check (employment_type in ('Full-Time', 'Part-Time', 'PRN', 'Baylor')),
  shift text not null check (shift in ('Day', 'Evening', 'Night')),
  city text not null,
  state text not null,
  description text not null,
  requirements text not null,
  status text not null default 'active' check (status in ('active', 'inactive')),
  created_at timestamptz not null default now()
);

create table if not exists applicants (
  id uuid primary key default gen_random_uuid(),
  first_name text not null,
  last_name text not null,
  email text not null,
  phone text not null,
  resume_url text not null,
  created_at timestamptz not null default now()
);

create table if not exists applications (
  id uuid primary key default gen_random_uuid(),
  applicant_id uuid not null references applicants(id) on delete cascade,
  job_id uuid not null references jobs(id) on delete cascade,
  status text not null default 'New' check (status in ('New', 'Reviewed', 'Contacted', 'Interview', 'Hired', 'Rejected')),
  applied_at timestamptz not null default now(),
  screening_answers jsonb not null default '{}'::jsonb
);

create index if not exists idx_jobs_status_city on jobs(status, city);
create index if not exists idx_applications_status on applications(status);

alter table facilities enable row level security;
alter table jobs enable row level security;
alter table applicants enable row level security;
alter table applications enable row level security;

create policy "public can view active facilities" on facilities
for select using (active = true);

create policy "public can view active jobs" on jobs
for select using (status = 'active');

-- Applicant insert/update is handled by server-side API with service role key.
