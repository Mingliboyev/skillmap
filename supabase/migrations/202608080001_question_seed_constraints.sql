-- Allow stable version upserts and methodology select-multiple items.
drop index if exists public.questions_stable_version_uidx;
alter table public.questions drop constraint if exists questions_stable_version_key;
alter table public.questions add constraint questions_stable_version_key unique(stable_id,version);

drop index if exists public.one_correct_option_per_question;
create index if not exists question_options_correct_idx
  on public.question_options(question_id,is_correct)
  where is_correct;
