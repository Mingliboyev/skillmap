-- Per-user completion state for the 12-week learning plan.
create table if not exists public.roadmap_task_progress (
  user_id uuid not null references auth.users(id) on delete cascade,
  attempt_id uuid not null references public.assessment_attempts(id) on delete cascade,
  task_id text not null check (task_id ~ '^w([1-9]|1[0-2])-d[1-5]$'),
  completed_at timestamptz not null default now(),
  primary key (user_id, attempt_id, task_id)
);

create index if not exists roadmap_task_progress_attempt_idx
  on public.roadmap_task_progress(attempt_id, completed_at desc);

alter table public.roadmap_task_progress enable row level security;

create policy "students manage own roadmap progress"
  on public.roadmap_task_progress for all
  using (
    user_id = auth.uid()
    and exists (
      select 1 from public.assessment_attempts attempt
      where attempt.id = attempt_id and attempt.student_id = auth.uid()
    )
  )
  with check (
    user_id = auth.uid()
    and exists (
      select 1 from public.assessment_attempts attempt
      where attempt.id = attempt_id and attempt.student_id = auth.uid()
    )
  );

create policy "admins read roadmap progress"
  on public.roadmap_task_progress for select
  using (exists(select 1 from public.admins where admins.user_id = auth.uid()));
