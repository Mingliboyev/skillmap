# Pre-pilot readiness notes

## Diagnostic coverage

“Diagnostic coverage” describes evidence sampled; it is not a statistical confidence interval. It is calculated as:

`round(100 × (answered item ratio + adequately sampled competency ratio) / 2)`

An adequately sampled competency has at least two answered items. Labels are Limited (below 50), Partial (50–79), and Good (80–100). Competency rows with fewer than two answers display insufficient coverage instead of a performance label.

## Question quality gate

The bank contains 66 items:

- 48 `approved`, active, publishable pilot items (32 reviewed legacy items and 16 complete methodology exemplars);
- 16 legacy items marked `needs_review` for distractor/roadmap or difficulty/overlap review;
- 2 methodology exemplars marked `do_not_publish` because native matching/ranking controls are not available.

The assembler and form validator require all three conditions: active status, approved review status, and publishability. The 48 eligible items preserve the per-category 3 easy / 3 medium / 2 hard blueprint.

## Persistence boundaries

Anonymous browsers submit only through `/api/attempts/submit`. The endpoint validates the full form, resolves exact item versions, recalculates scores, and writes with a server-only service role. Browser roles receive no raw-table write permission. Raw participant and response reads require an admin RLS membership; public question column grants exclude answer and explanation columns.

The submission key has a unique index and duplicate-key races are converted to the original attempt response. Multi-table persistence is still not a single PostgreSQL transaction: a failure after the attempt insert returns a recovery attempt ID for administrator cleanup.
