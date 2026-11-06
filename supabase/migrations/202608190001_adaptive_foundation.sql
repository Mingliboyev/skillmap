-- Additive Phase 1 foundation. Existing questions and responses retain valid empty metadata.
alter table public.questions add column if not exists adaptive_metadata jsonb not null default '{}'::jsonb;
alter table public.pilot_responses add column if not exists evidence jsonb not null default '{}'::jsonb;
create index if not exists questions_assessment_role_idx on public.questions((adaptive_metadata->>'assessmentRole'));
create index if not exists questions_parent_core_idx on public.questions((adaptive_metadata->>'parentCoreItemId')) where adaptive_metadata ? 'parentCoreItemId';
