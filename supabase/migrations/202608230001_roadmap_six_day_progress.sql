-- Extend the additive 12-week plan with a sixth review/project checkpoint.
-- Existing w*-d1..d5 progress rows remain valid and unchanged.
alter table public.roadmap_task_progress
  drop constraint if exists roadmap_task_progress_task_id_check;

alter table public.roadmap_task_progress
  add constraint roadmap_task_progress_task_id_check
  check (task_id ~ '^w([1-9]|1[0-2])-d[1-6]$');
