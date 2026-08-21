-- Authenticated assessment persistence. Guest pilot submissions remain supported.
alter table public.assessment_attempts add column if not exists assessment_version text;
alter table public.assessment_attempts add column if not exists progress jsonb not null default '{}'::jsonb;
alter table public.assessment_attempts add column if not exists result_summary jsonb;

create index if not exists attempts_student_version_status_idx
  on public.assessment_attempts(student_id,assessment_version,status,started_at desc)
  where student_id is not null;

-- Authenticated students may persist and resume only their own response evidence.
create policy "students read own pilot responses" on public.pilot_responses for select
  using(exists(select 1 from public.assessment_attempts a where a.id=attempt_id and a.student_id=auth.uid()));
create policy "students read own competency scores" on public.competency_scores for select
  using(exists(select 1 from public.assessment_attempts a where a.id=attempt_id and a.student_id=auth.uid()));

