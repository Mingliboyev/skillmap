# SkillMap Uzbekistan — Phase 2: Bilingual v2 Bank + AI Roadmap Integration

You are working inside the EXISTING SkillMap Uzbekistan repository.

Phase 1 adaptive foundation is COMPLETE and must remain intact.
Do not redesign methodology, authentication, RLS, admin, analytics, or unrelated UI.
Do not enter a refactoring/improvement loop.

A seed-ready file is provided:

`skillmap-v2-core-isolation-bank.json`

It contains exactly:
- 30 Common Core v2 items
- 30 one-to-one Misconception-Isolation items
- professional English and Uzbek student-facing content
- stable item IDs
- source citations
- parent-core mappings
- diagnostic metadata

The old 66-item bank MUST be preserved for historical attempts, but it must not remain the active v2 pilot bank.

## PHASE 2 GOALS

1. Import and seed the bilingual 60-item v2 Core + Isolation bank.
2. Make v2 content fully locale-aware (`en` / `uz`).
3. Activate deterministic Core → Isolation branching using the Phase 1 engine.
4. Add a production-safe AI roadmap generator based on assessment EVIDENCE, not raw quiz percentages.
5. Preserve deterministic fallback behavior when AI is unavailable.

Do NOT seed/generate Adaptive Layer B questions in this phase unless a compatible v2 adaptive-bank file already exists in the repository.

---

## 1. VALIDATE THE INPUT BANK FIRST

Load `skillmap-v2-core-isolation-bank.json` and fail loudly if any invariant is broken.

Required checks:
- exactly 60 items
- exactly 30 `core`
- exactly 30 `isolation`
- exactly 5 Core items per each of the 6 domains
- exactly 5 Isolation items per each domain
- every isolation item has a valid `parentCoreItemId`
- every Core item maps to exactly one Isolation item
- each item has English and Uzbek context/question/options/explanation
- exactly four options A/B/C/D
- `correctOption` exists in the option set
- no duplicate stable `itemId`
- no missing source citation

Add automated tests for these invariants.

Do not silently repair malformed bank content in application code.

---

## 2. SEED V2 WITHOUT DESTROYING LEGACY DATA

Inspect the existing seed/version architecture and use its existing conventions where possible.

Requirements:
- preserve all 66 legacy questions and historical attempts
- seed v2 items idempotently
- stable IDs must remain `DLIT-01`, `PROG-I-01`, etc.
- mark/identify the new bank as `skillmap-v2-pilot`
- old items must remain queryable for historical results
- active pilot question selection must use the v2 bank only
- re-running the seed must not create duplicates
- do not rewrite old responses

Use existing metadata JSON where appropriate rather than adding unnecessary columns.

Populate Phase 1 `adaptive_metadata` with, at minimum:
- assessment role
- domain
- competency
- sub-competency
- recommended grade band
- parent core item ID
- possible failure/isolation target where present
- source + source citation
- difficulty

If the current schema has localized-content fields, reuse them. Otherwise implement the least destructive locale-aware structure.

---

## 3. PROFESSIONAL BILINGUAL DELIVERY

The JSON is the authoritative wording for v2.

Student UI requirements:
- `/uz/...` displays Uzbek content
- `/en/...` displays English content
- answer keys are language-independent
- switching locale must not change item identity, branch mapping, scoring, or evidence
- preserve technical tokens such as RAM, OS, MFA, SQL, IF, ELSE, AND, OR, NOT when present
- code/pseudocode must not be translated in a way that changes semantics

Do not machine-retranslate the provided Uzbek text at runtime.

Add tests confirming one item has identical ID/correct answer in both locales but different localized text.

---

## 4. CORE → ISOLATION PILOT FLOW

Use the Phase 1 centralized branching resolver.

Required v2 behavior:

For each Common Core item:
- store the response evidence
- if correct: expose adaptive eligibility only (do not invent an adaptive question)
- if incorrect: make its corresponding isolation item eligible

Isolation items:
- must never recursively branch into another isolation item
- must preserve the parent Core ID in response evidence
- must not independently produce a firm misconception diagnosis

Evidence language must stay conservative:
- evidence of competency
- Developing Competency
- Possible Weakness
- Possible Misconception Pattern
- Insufficient Evidence

Do NOT output `Identified Misconception` from a single Core + Isolation pair.

---

## 5. AI ROADMAP INTEGRATION

Implement AI as a SERVER-ONLY personalization layer after evidence aggregation.

The deterministic assessment engine remains the source of truth.
AI must NOT:
- decide whether answers are correct
- rewrite scores
- change Core answer keys
- invent misconceptions
- change branching history
- receive passwords, email addresses, names, raw auth tokens, or unnecessary PII

### Provider architecture

Inspect the repository first.

If an AI provider abstraction already exists, reuse it.
If not, create a small provider interface so the roadmap engine is not coupled to UI code.

If OpenAI is used, use the official server-side SDK and the Responses API with Structured Outputs / JSON Schema rather than free-form JSON parsing. Keep model selection environment-configurable; do not hardcode credentials or expose API keys client-side.

Use environment variables, e.g.:
- `OPENAI_API_KEY`
- `OPENAI_MODEL`

Never invent values.

### AI input

Send only normalized assessment evidence such as:
- preferred output language (`uz` / `en`)
- grade band
- stated student goal
- domain/competency/sub-competency evidence
- item IDs attempted
- assessment role
- cognitive/difficulty level reached
- correct/incorrect evidence counts
- selected diagnostic failure-pattern IDs/labels where available
- evidence sufficiency

Do not send student email/name unless there is a demonstrated product need. There is none for roadmap generation.

### AI output schema

Create a strict schema similar to:

```ts
{
  summary: string,
  strengths: Array<{
    competency: string,
    evidence: string
  }>,
  priorities: Array<{
    competency: string,
    reason: string,
    severity: "high" | "medium" | "low"
  }>,
  roadmap: Array<{
    week: 1 | 2 | 3 | 4,
    focus: string,
    why: string,
    actions: string[],
    resourceIds: string[],
    practiceItemIds: string[],
    successCheck: string
  }>,
  questionsToWorkOn: Array<{
    competency: string,
    prompt: string
  }>,
  insufficientEvidence: string[],
  confidenceNote: string
}
```

Use Zod/JSON Schema consistent with the project's TypeScript stack.

### Critical grounding rule

AI may explain and prioritize EVIDENCE already produced by SkillMap.
It may not fabricate performance claims.

Bad:
`You are weak at recursion.`
when recursion was never tested.

Good:
`There is insufficient evidence about recursion, so it is not included as a diagnosed weakness.`

### Resources

AI must NOT invent URLs, books, courses, or resource IDs.

If the project has a curated resource catalog, pass allowed resource IDs and let AI select only from them.
If no catalog exists yet:
- generate roadmap actions without external links
- return `resourceIds: []`
- do not hallucinate resources

### Practice questions

For this phase, `practiceItemIds` may only reference existing seeded SkillMap items.
Do not ask the model to invent new scored assessment questions.

---

## 6. DETERMINISTIC FALLBACK

AI failure must not break results.

Implement a fallback roadmap built deterministically from:
1. goal relevance
2. weakest supported competencies
3. possible misconception patterns
4. prerequisites
5. strongest demonstrated competencies
6. insufficient-evidence flags

If AI is unavailable, timed out, rate-limited, malformed, or refused:
- persist/use fallback roadmap
- show results normally
- log safe operational metadata
- never expose stack traces/API details to students

---

## 7. CACHE / PERSISTENCE

Avoid regenerating the same roadmap on every page load.

Use the existing results/data model if suitable; otherwise add the minimum schema needed to store:
- attempt ID
- bank/methodology version
- roadmap payload
- generation mode: `ai` | `fallback`
- provider/model identifier if AI was used
- generated timestamp
- evidence fingerprint/hash so roadmap can be regenerated only when evidence changes

Do not persist API keys or unnecessary raw prompts.

---

## 8. RESULT UI

Do not redesign the whole results page.

Replace/extend the existing weak static roadmap so the student can clearly see:
- What I demonstrated well
- What needs work
- Why SkillMap thinks that
- 4-week personalized plan
- Questions/skills to work on next
- Areas with insufficient evidence

Uzbek output must be natural and understandable, not literal machine translation.

If AI generated Uzbek content, instruct the model to write clear modern Uzbek suitable for Grades 8–11 while retaining standard technical terms where needed.

---

## 9. TESTS

Add tests for at least:

### Bank
1. 60-item bank invariant validation
2. 30 Core / 30 Isolation
3. all parent mappings valid
4. no duplicate IDs
5. bilingual content exists
6. stable correct answer across locales
7. idempotent seed
8. legacy items preserved

### Branching
9. failed Core resolves correct Isolation
10. passed Core does not trigger Isolation
11. Isolation cannot recurse
12. response evidence preserves selected distractor/failure metadata

### AI
13. AI receives no email/name/PII
14. structured response is schema-validated
15. AI output cannot reference unknown resource/item IDs
16. fallback executes on provider failure
17. repeated result load does not unnecessarily call AI again
18. evidence fingerprint change permits regeneration
19. AI cannot invent an untested weakness in mocked output without validation/filtering

Run:
- relevant tests
- full test suite if practical
- typecheck
- lint
- production build
- `git diff --check`

Fix implementation-caused failures only.

---

## DEFINITION OF DONE

Phase 2 is complete when:

✓ bilingual 30 Core + 30 Isolation v2 bank is seeded
✓ legacy 66 remain intact
✓ v2 is the active pilot bank
✓ `/uz` and `/en` render correct localized wording
✓ all 30 Core → Isolation mappings resolve
✓ response evidence persists correctly
✓ AI roadmap service is server-only and evidence-grounded
✓ structured output is schema validated
✓ deterministic fallback works
✓ result page shows useful personalized roadmap + questions to work on
✓ no invented external resources
✓ tests/typecheck/lint/build pass

Do NOT begin generating or inventing Layer B content after completion.
Return a concise implementation report and any genuine blocker for the next phase.
