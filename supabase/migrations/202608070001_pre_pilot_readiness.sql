-- Final pre-pilot safety and operations metadata.
alter table public.questions add column if not exists review_status text not null default 'needs_review'
  check (review_status in ('approved','needs_review','do_not_publish'));
alter table public.questions add column if not exists review_notes text[] not null default '{}';
alter table public.questions drop constraint if exists questions_publishable_review_check;
alter table public.questions add constraint questions_publishable_review_check
  check (not publishable or review_status = 'approved');
create index if not exists questions_review_status_idx on public.questions(review_status,status,category,difficulty);

alter table public.pilot_settings add column if not exists pilot_name text not null default 'SkillMap internal pilot';
alter table public.pilot_settings add column if not exists pilot_start_date date;
alter table public.pilot_settings add column if not exists pilot_end_date date;
alter table public.pilot_settings add column if not exists updated_by uuid references public.admins(user_id) on delete set null;
alter table public.pilot_settings drop constraint if exists pilot_date_order_check;
alter table public.pilot_settings add constraint pilot_date_order_check
  check (pilot_start_date is null or pilot_end_date is null or pilot_start_date <= pilot_end_date);

-- Browser roles never write raw pilot records; the validated server endpoint uses
-- the service role. Admin SELECT remains subject to the existing RLS policies.
revoke all on public.pilot_participants,public.pilot_responses,public.competency_scores,public.misconception_flags from anon,authenticated;
grant select on public.pilot_participants,public.pilot_responses,public.competency_scores,public.misconception_flags to authenticated;

-- Public question reads exclude answer-bearing columns during a research-safe pilot.
revoke select on public.questions,public.question_options from anon,authenticated;
grant select(id,stable_id,version,category,question_type,difficulty,prompt_en,prompt_uz,status,position,competency_code,competency_name,estimated_time_seconds,tags) on public.questions to anon,authenticated;
grant select(id,question_id,label_en,label_uz,position) on public.question_options to anon,authenticated;
