-- Core schema for LTC Hiring Platform (Phase 1)
create extension if not exists "pgcrypto";

create table if not exists facilities (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  care_type text not null check (care_type in ('nursing_home', 'assisted_living', 'memory_care', 'rehab')),
  city text not null,
  state text not null,
  created_at timestamptz not null default now()
);

create table if not exists jobs (
  id uuid primary key default gen_random_uuid(),
  facility_id uuid not null references facilities(id) on delete cascade,
  slug text unique not null,
  title text not null,
  employment_type text not null check (employment_type in ('full_time', 'part_time', 'per_diem')),
  shift text not null check (shift in ('day', 'evening', 'night', 'weekend', 'mixed')),
  pay_min numeric(10,2),
  pay_max numeric(10,2),
  description text not null,
  active boolean not null default true,
  created_at timestamptz not null default now()
);

create table if not exists fit_questions (
  id uuid primary key default gen_random_uuid(),
  job_id uuid not null references jobs(id) on delete cascade,
  prompt text not null,
  ordinal int not null,
  created_at timestamptz not null default now(),
  unique(job_id, ordinal)
);

create table if not exists applications (
  id uuid primary key default gen_random_uuid(),
  job_id uuid not null references jobs(id) on delete cascade,
  full_name text not null,
  email text not null,
  phone text,
  experience_years int,
  certifications text,
  resume_url text,
  status text not null default 'submitted' check (status in ('submitted', 'under_review', 'interview', 'rejected', 'hired')),
  created_at timestamptz not null default now()
);

create table if not exists application_fit_answers (
  id uuid primary key default gen_random_uuid(),
  application_id uuid not null references applications(id) on delete cascade,
  fit_question_id uuid not null references fit_questions(id) on delete cascade,
  answer text not null,
  created_at timestamptz not null default now(),
  unique(application_id, fit_question_id)
);

create index if not exists idx_jobs_active on jobs(active);
create index if not exists idx_jobs_facility on jobs(facility_id);
create index if not exists idx_applications_job on applications(job_id);
