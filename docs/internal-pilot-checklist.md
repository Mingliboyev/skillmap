# Internal pilot checklist (5–10 participants)

Use a non-production cohort code such as `INTERNAL-01`. Record observations by participant code only; never add names, phone numbers, usernames, or exact addresses.

## Before the session

- [ ] Apply all three migrations in timestamp order and run `npm run db:seed`.
- [ ] Confirm the seed reports 66 items and 48 pilot-eligible items.
- [ ] Create one editor/research admin and verify a normal student cannot open `/en/admin` or `/uz/admin`.
- [ ] Set `PILOT_NAME`, dates, minimum group size, and `FEEDBACK_MODE=research-safe`.
- [ ] Confirm the research dashboard says live/insufficient—not demo—when Supabase is configured.
- [ ] Open both `/en/assessment` and `/uz/assessment` on a clean browser profile.

## Participant trial

For each participant, record pass/fail and a short observation.

- [ ] Understands voluntary participation, anonymous use, and external minor-approval wording.
- [ ] Completes grade, location, access, language, and experience fields without entering a personal identifier.
- [ ] Starts the assessment and understands single-choice and select-multiple questions.
- [ ] Moves backward and confirms prior answers remain selected.
- [ ] Closes/reopens or refreshes once and resumes the same form, page, and answers.
- [ ] Completes all 48 questions and submits once.
- [ ] Double-clicks or retries submit; only one attempt exists for the submission key.
- [ ] Understands overall score, diagnostic coverage, strengths, gaps, misconceptions, and next action.
- [ ] Confirms competencies with fewer than two answered items say “insufficient coverage.”
- [ ] Confirms consecutive roadmap weeks do not repeat goals, practice, project, or milestone.
- [ ] Switches between English and Uzbek and finds no mixed instructional language.
- [ ] Tests at 320 px and 375 px widths; no horizontal page overflow or clipped controls.
- [ ] Tests one tablet/desktop width (768, 1024, or 1440 px).
- [ ] Tests throttled “Slow 3G”: progress remains recoverable after a failed request.
- [ ] Prints results; cards remain legible and page breaks do not cut primary headings.

## Data and privacy verification

- [ ] `pilot_participants` contains participant code and approved context fields only.
- [ ] `pilot_responses` stores question ID/version, selected response, fractional score, order, and timing.
- [ ] Category, competency, misconception, duration, locale, and roadmap rows exist for each completed attempt.
- [ ] Public/student requests cannot select raw participant rows, responses, correct answers, or explanations.
- [ ] Research groups below `MIN_RESEARCH_GROUP_SIZE` are suppressed.
- [ ] CSV exports require an authenticated admin and contain no name, phone, email, passport, or exact address.

## Stop conditions

Do not expand beyond 10 users if any submission loses answers, creates unexplained duplicates, exposes an answer key in research-safe mode, leaks raw data, or produces a materially mixed-language student experience. Fix and repeat the internal trial first.
