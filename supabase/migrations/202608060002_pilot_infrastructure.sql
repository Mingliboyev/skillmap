-- Pilot-safe additive migration. Does not remove or rewrite existing MVP data.
create table if not exists public.pilot_participants (
 id uuid primary key default gen_random_uuid(), participant_code text not null unique check(participant_code ~ '^SM-[0-9]{4}-[0-9]{6}$'),
 grade smallint not null check(grade between 8 and 11), region text not null, district text not null, school_type text not null,
 school_code text, cohort_code text, english_level text not null, device_access text not null, internet_access text not null,
 programming_experience text not null, preferred_locale text not null check(preferred_locale in('uz','en')),
 consented_at timestamptz not null, external_approval_handled boolean not null default false, created_at timestamptz not null default now()
);
alter table public.questions add column if not exists stable_id text;
alter table public.questions add column if not exists version integer not null default 1;
alter table public.questions add column if not exists competency_code text;
alter table public.questions add column if not exists competency_name text;
alter table public.questions add column if not exists estimated_time_seconds integer;
alter table public.questions add column if not exists learning_objective jsonb;
alter table public.questions add column if not exists roadmap_skill_mapping text;
alter table public.questions add column if not exists misconception_id text;
alter table public.questions add column if not exists misconception_description jsonb;
alter table public.questions add column if not exists tags text[] not null default '{}';
alter table public.questions add column if not exists correct_answer jsonb;
alter table public.questions add column if not exists distractor_analysis jsonb;
alter table public.questions add column if not exists publishable boolean not null default false;
create unique index if not exists questions_stable_version_uidx on public.questions(stable_id,version) where stable_id is not null;
alter table public.assessment_attempts add column if not exists form_seed text;
alter table public.assessment_attempts add column if not exists form_blueprint_version text;
alter table public.assessment_attempts add column if not exists form_items jsonb;
alter table public.assessment_attempts add column if not exists submission_key uuid;
alter table public.assessment_attempts add column if not exists duration_seconds integer;
create unique index if not exists attempts_submission_key_uidx on public.assessment_attempts(submission_key) where submission_key is not null;
alter table public.assessment_attempts drop constraint if exists attempt_owner;
alter table public.assessment_attempts add constraint attempt_owner check(student_id is not null or anonymous_id is not null);
alter table public.assessment_attempts drop constraint if exists assessment_attempts_anonymous_id_fkey;
alter table public.assessment_attempts add constraint assessment_attempts_anonymous_id_fkey foreign key(anonymous_id) references public.pilot_participants(id) on delete restrict;
create table if not exists public.pilot_responses (
 id uuid primary key default gen_random_uuid(),attempt_id uuid not null references public.assessment_attempts(id) on delete cascade,
 question_stable_id text not null,question_version integer not null,presentation_order smallint not null,selected_answer jsonb,
 response_time_ms integer not null default 0,item_score numeric(6,4),rapid_response boolean not null default false,created_at timestamptz not null default now(),
 unique(attempt_id,question_stable_id)
);
create table if not exists public.competency_scores (
 id uuid primary key default gen_random_uuid(),attempt_id uuid not null references public.assessment_attempts(id) on delete cascade,
 competency_code text not null,score numeric(5,2) not null check(score between 0 and 100),earned_points numeric(8,3) not null,
 possible_points numeric(8,3) not null,answered_count smallint not null,item_count smallint not null,unique(attempt_id,competency_code)
);
create table if not exists public.misconception_flags (
 id uuid primary key default gen_random_uuid(),attempt_id uuid not null references public.assessment_attempts(id) on delete cascade,
 misconception_id text not null,occurrence_count smallint not null,priority text not null check(priority in('monitor','high')),unique(attempt_id,misconception_id)
);
create table if not exists public.pilot_cohorts(id uuid primary key default gen_random_uuid(),code text not null unique,title text not null,active boolean not null default true,created_at timestamptz not null default now());
create table if not exists public.pilot_settings(id boolean primary key default true check(id),minimum_group_size smallint not null default 5 check(minimum_group_size between 3 and 50),feedback_mode text not null default 'research-safe' check(feedback_mode in('diagnostic','research-safe')),updated_at timestamptz not null default now());
insert into public.pilot_settings(id) values(true) on conflict(id) do nothing;
create index if not exists pilot_participants_region_grade_idx on public.pilot_participants(region,grade);
create index if not exists pilot_responses_item_idx on public.pilot_responses(question_stable_id,question_version);
create index if not exists pilot_responses_attempt_idx on public.pilot_responses(attempt_id);
create index if not exists competency_scores_code_idx on public.competency_scores(competency_code,score);
alter table public.pilot_participants enable row level security;alter table public.pilot_responses enable row level security;
alter table public.competency_scores enable row level security;alter table public.misconception_flags enable row level security;
alter table public.pilot_cohorts enable row level security;alter table public.pilot_settings enable row level security;
-- Raw participant/response tables deliberately have no anon/authenticated SELECT policies.
create policy "admins read participants" on public.pilot_participants for select using(exists(select 1 from public.admins where user_id=auth.uid()));
create policy "admins read pilot responses" on public.pilot_responses for select using(exists(select 1 from public.admins where user_id=auth.uid()));
create policy "admins read competency scores" on public.competency_scores for select using(exists(select 1 from public.admins where user_id=auth.uid()));
create policy "admins read misconception flags" on public.misconception_flags for select using(exists(select 1 from public.admins where user_id=auth.uid()));
create policy "admins manage cohorts" on public.pilot_cohorts for all using(exists(select 1 from public.admins where user_id=auth.uid())) with check(exists(select 1 from public.admins where user_id=auth.uid()));
create policy "admins manage pilot settings" on public.pilot_settings for all using(exists(select 1 from public.admins where user_id=auth.uid())) with check(exists(select 1 from public.admins where user_id=auth.uid()));
create or replace view public.pilot_research_aggregates with(security_invoker=true) as
select p.region,p.district,p.grade,p.school_type,p.english_level,p.device_access,p.internet_access,p.programming_experience,
 count(*) filter(where a.status='completed') completed_attempts,count(*) attempts,round(avg(a.overall_score),2) average_score,
 round(avg(a.duration_seconds),1) average_duration_seconds
from public.pilot_participants p join public.assessment_attempts a on a.anonymous_id=p.id
group by p.region,p.district,p.grade,p.school_type,p.english_level,p.device_access,p.internet_access,p.programming_experience;
