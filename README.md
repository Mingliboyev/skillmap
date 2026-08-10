# SkillMap Uzbekistan

SkillMap Uzbekistan is a bilingual pilot diagnostic for practical digital skills among grades 8–11. It administers reproducible balanced assessment forms, calculates category and competency evidence, produces a deterministic 30-day learning plan, and stores anonymous pilot data for descriptive research.

> This is a pilot diagnostic system. Its scores and recommendations have not yet been psychometrically validated on a nationally representative sample.

It is not an official government examination or national benchmark. It does not use AI to grade students.

## Authoritative methodology

[`docs/skillmap-assessment-methodology.md`](docs/skillmap-assessment-methodology.md) defines the categories, competency codes, difficulty model, item taxonomy, exemplars, scoring principles, misconceptions, and roadmap rules. The application uses a transparent pilot-safe weighted score—not Item Response Theory. Rapid responses are recorded as analytics flags and never reduce a correct score.

The document contains 18 complete exemplars. All were imported. The native matching and ranking exemplars are retained but not publishable because their dedicated interaction UI is not yet implemented. See [`docs/question-bank-coverage.md`](docs/question-bank-coverage.md).

## Architecture

- `app/`: locale routes, API submission/export endpoints, loading and error boundaries
- `constants/methodology.ts`: canonical categories, weights, competencies, item types, and blueprint
- `constants/methodology-items.ts`: approved exemplar migration
- `constants/questions.ts`: preserved legacy bank enriched with methodology metadata
- `lib/assessment/assembly.ts`: seeded form assembly and blueprint validation
- `lib/scoring.ts`: pure item/category/competency scoring
- `lib/roadmap.ts`: deterministic competency-gap roadmap selection
- `features/assessment/`: consent, participant metadata, resumable runner
- `lib/research.ts`, `lib/analytics.ts`: live aggregates, suppression, item diagnostics
- `actions/admin-pilot.ts`: authorized item and pilot-setting mutations
- `supabase/migrations/`: additive PostgreSQL schema and RLS
- `tests/`: core methodology, assembly, scoring, privacy, and export tests

## Assessment forms

The default form contains 48 items: eight per category and, within each category, three easy, three medium, and two hard. A stable seed determines selection and presentation order. Stored forms contain the seed plus stable question IDs and versions. Validation rejects missing categories, invalid difficulty balance, duplicates, insufficient competency coverage, and non-publishable items.

## Scoring

- Easy ×1.0, medium ×1.5, hard ×2.0.
- Binary items receive 1 or 0.
- Select-multiple: `max(0, (correct selected − incorrect selected) / total correct)`.
- Ranking: proportional credit from discordant pair count (Kendall-style distance).
- Matching: correctly matched pairs divided by total pairs.
- Category scores are normalized to 0–100.
- Overall score applies methodology category weights.
- Diagnostic coverage combines answered-item completion with the share of sampled competencies supported by at least two answers; it is not statistical confidence.
- Misconceptions are rules-based failure counts.

## Privacy and persistence

Participants receive display codes such as `SM-2026-000001`; database UUIDs are never shown. The onboarding flow collects only grade, regional/school context, access, experience, language, explicit consent timestamp, and external-approval acknowledgement. It never requests a name, passport, phone, Telegram identity, or exact address.

With Supabase and the server-only service-role key configured, final submissions are validated, assembled, and rescored on the server. The server stores question versions/order, structured answers, item timing, category and competency scores, rapid flags, misconceptions, and roadmap. A unique submission key prevents accidental duplicates. Without configuration, the UI clearly operates in local demo mode and does not claim persistence.

Raw participant and answer tables have no public read policy. Admin access is role checked server-side. Public research must use suppressed aggregates. See [`docs/export-data-dictionary.md`](docs/export-data-dictionary.md).

## Setup

1. `npm install`
2. Copy `.env.example` to `.env.local`.
3. Set `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, and server-only `SUPABASE_SERVICE_ROLE_KEY`.
4. Apply migrations in order:
   - `202608060001_initial_skillmap.sql`
   - `202608060002_pilot_infrastructure.sql`
   - `202608070001_pre_pilot_readiness.sql`
5. Run `npm run db:seed` with the server-only service-role key available.
6. Add an authenticated user to `public.admins` with `editor`, `researcher`, or `super_admin` role.
7. `npm run dev`

Never expose the service-role key through `NEXT_PUBLIC_*` variables.

## Feedback modes

`pilot_settings.feedback_mode` supports `research-safe` and `diagnostic`. Research-safe is the default; it does not expose an answer key. Explanations should only be enabled after pilot administrators confirm the diagnostic mode is appropriate.

## Testing and deployment

Run:

```bash
npm run typecheck
npm run lint
npm run test
npm run build
```

The app is compatible with Vercel. Apply database migrations before deploying server persistence.

## Current limitations

- The approved methodology provides only 18 exemplars. The pilot gate admits 32 reviewed legacy items and 16 publishable exemplars; 16 weaker legacy items remain withheld for educator review.
- Native ranking and matching interactions are not published yet.
- Full item analytics require sufficient live responses; discrimination is deliberately withheld below the configured threshold.
- The submission sequence is duplicate-safe but not implemented as a single PostgreSQL stored-procedure transaction; partial server failure returns a recovery attempt ID and can require administrator cleanup.
- No claim of national representativeness, statistical significance, government approval, or psychometric validation is made.
