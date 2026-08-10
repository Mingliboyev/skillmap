create extension if not exists pgcrypto;
create type public.question_status as enum ('draft','published','archived');
create type public.attempt_status as enum ('in_progress','completed','abandoned');

create table public.students (
  id uuid primary key references auth.users(id) on delete cascade,
  grade smallint check (grade between 8 and 11), region text, school_type text,
  english_level text, programming_experience text, device_availability text,
  preferred_locale text not null default 'uz' check (preferred_locale in ('uz','en')),
  created_at timestamptz not null default now(), updated_at timestamptz not null default now()
);
create table public.admins (
  user_id uuid primary key references auth.users(id) on delete cascade,
  role text not null default 'editor' check (role in ('editor','researcher','super_admin')),
  created_at timestamptz not null default now()
);
create table public.questions (
  id uuid primary key default gen_random_uuid(), category text not null,
  question_type text not null, difficulty text not null check (difficulty in ('easy','medium','hard')),
  prompt_en text not null, prompt_uz text not null, explanation_en text, explanation_uz text,
  status public.question_status not null default 'draft', position integer not null default 0,
  created_by uuid references public.admins(user_id), created_at timestamptz not null default now(), updated_at timestamptz not null default now()
);
create table public.question_options (
  id uuid primary key default gen_random_uuid(), question_id uuid not null references public.questions(id) on delete cascade,
  label_en text not null, label_uz text not null, is_correct boolean not null default false, position smallint not null
);
create table public.assessment_attempts (
  id uuid primary key default gen_random_uuid(), student_id uuid references public.students(id) on delete cascade,
  anonymous_id uuid, status public.attempt_status not null default 'in_progress', locale text not null check(locale in ('uz','en')),
  overall_score numeric(5,2), skill_level text, confidence numeric(4,3), started_at timestamptz not null default now(), completed_at timestamptz,
  constraint attempt_owner check (student_id is not null or anonymous_id is not null)
);
create table public.answers (
  id uuid primary key default gen_random_uuid(), attempt_id uuid not null references public.assessment_attempts(id) on delete cascade,
  question_id uuid not null references public.questions(id), selected_option_id uuid references public.question_options(id),
  is_correct boolean not null, awarded_weight numeric(4,2) not null default 0, answered_at timestamptz not null default now(),
  unique(attempt_id,question_id)
);
create table public.category_scores (
  id uuid primary key default gen_random_uuid(), attempt_id uuid not null references public.assessment_attempts(id) on delete cascade,
  category text not null, score numeric(5,2) not null check(score between 0 and 100), correct_count smallint not null, question_count smallint not null,
  unique(attempt_id,category)
);
create table public.roadmaps (
  id uuid primary key default gen_random_uuid(), attempt_id uuid not null unique references public.assessment_attempts(id) on delete cascade,
  rules_version text not null, plan jsonb not null, created_at timestamptz not null default now()
);
create table public.activity_logs (
  id bigint generated always as identity primary key, actor_id uuid references auth.users(id) on delete set null,
  action text not null, entity_type text not null, entity_id text, metadata jsonb not null default '{}'::jsonb, created_at timestamptz not null default now()
);
create index attempts_student_completed_idx on public.assessment_attempts(student_id,completed_at desc);
create index attempts_completed_region_idx on public.assessment_attempts(completed_at) where status='completed';
create index questions_status_category_idx on public.questions(status,category,position);
create index answers_attempt_idx on public.answers(attempt_id);
create index category_scores_category_idx on public.category_scores(category,score);
create index activity_logs_actor_created_idx on public.activity_logs(actor_id,created_at desc);
create unique index one_correct_option_per_question on public.question_options(question_id) where is_correct;

alter table public.students enable row level security; alter table public.admins enable row level security;
alter table public.questions enable row level security; alter table public.question_options enable row level security;
alter table public.assessment_attempts enable row level security; alter table public.answers enable row level security;
alter table public.category_scores enable row level security; alter table public.roadmaps enable row level security; alter table public.activity_logs enable row level security;
create policy "students read own profile" on public.students for select using(auth.uid()=id);
create policy "students update own profile" on public.students for update using(auth.uid()=id) with check(auth.uid()=id);
create policy "students insert own profile" on public.students for insert with check(auth.uid()=id);
create policy "published questions readable" on public.questions for select using(status='published' or exists(select 1 from public.admins where user_id=auth.uid()));
create policy "published options readable" on public.question_options for select using(exists(select 1 from public.questions q where q.id=question_id and (q.status='published' or exists(select 1 from public.admins where user_id=auth.uid()))));
create policy "admins manage questions" on public.questions for all using(exists(select 1 from public.admins where user_id=auth.uid())) with check(exists(select 1 from public.admins where user_id=auth.uid()));
create policy "admins manage options" on public.question_options for all using(exists(select 1 from public.admins where user_id=auth.uid())) with check(exists(select 1 from public.admins where user_id=auth.uid()));
create policy "students manage own attempts" on public.assessment_attempts for all using(student_id=auth.uid()) with check(student_id=auth.uid());
create policy "students read own answers" on public.answers for select using(exists(select 1 from public.assessment_attempts a where a.id=attempt_id and a.student_id=auth.uid()));
create policy "students read own scores" on public.category_scores for select using(exists(select 1 from public.assessment_attempts a where a.id=attempt_id and a.student_id=auth.uid()));
create policy "students read own roadmaps" on public.roadmaps for select using(exists(select 1 from public.assessment_attempts a where a.id=attempt_id and a.student_id=auth.uid()));
create policy "admins read all attempts" on public.assessment_attempts for select using(exists(select 1 from public.admins where user_id=auth.uid()));
create policy "admins read all answers" on public.answers for select using(exists(select 1 from public.admins where user_id=auth.uid()));
create policy "admins read all scores" on public.category_scores for select using(exists(select 1 from public.admins where user_id=auth.uid()));
create policy "admins read logs" on public.activity_logs for select using(exists(select 1 from public.admins where user_id=auth.uid()));

create view public.anonymous_research_summary as
select s.region,s.grade,s.school_type,s.english_level,s.programming_experience,s.device_availability,
       count(*) participant_count,round(avg(a.overall_score),2) average_score
from public.assessment_attempts a join public.students s on s.id=a.student_id
where a.status='completed' group by s.region,s.grade,s.school_type,s.english_level,s.programming_experience,s.device_availability
having count(*) >= 5;
