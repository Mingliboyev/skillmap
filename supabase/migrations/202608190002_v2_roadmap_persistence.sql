-- Additive Phase 2 roadmap provenance. Existing legacy roadmaps remain valid.
alter table public.roadmaps add column if not exists generation_mode text not null default 'fallback' check(generation_mode in('ai','fallback'));
alter table public.roadmaps add column if not exists provider_model text;
alter table public.roadmaps add column if not exists evidence_fingerprint text;
create index if not exists roadmaps_evidence_fingerprint_idx on public.roadmaps(evidence_fingerprint) where evidence_fingerprint is not null;
