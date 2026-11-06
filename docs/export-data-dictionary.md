# Pilot export data dictionary

All exports must be UTF-8 CSV, exclude database UUIDs and direct identifiers, and use stable snake_case headers.

- Participant summary: `participant_code`, grade, region, district, school type, cohort, access metadata, completion state, duration, overall score.
- Answer data: participant code, attempt sequence, stable question ID/version, presentation order, structured selected answer, response time, item score, rapid flag.
- Score summary: participant code, category/competency code, normalized score, earned and possible points, item coverage.
- Question analytics: stable item ID/version, response count, success rate, timing, omissions, rapid rate, option distribution, discrimination estimate, recommendation.
- Misconceptions: misconception ID, occurrence count, affected anonymous participants, priority.

Groups smaller than the configured minimum must be suppressed from public research summaries. Participant- and answer-level exports are admin-only research files and must not be published as open data.
