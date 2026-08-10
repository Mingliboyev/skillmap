# SkillMap Uzbekistan: National Digital Skills & Computational Competency Assessment System

---

## Step 1: Assessment Philosophy

SkillMap Uzbekistan is grounded in **Evidence-Centered Design (ECD)** and **Constructivist Assessment Frameworks**, modeled after international benchmarks such as PISA (OECD), Bebras International Contest on Informatics, and the European Digital Competence Framework (DigComp 2.2).

```
   ┌────────────────────────────────────────────────────────────────────────┐
   │                         EVIDENCE-CENTERED DESIGN                       │
   └────────────────────────────────────────────────────────────────────────┘
                                      │
          ┌───────────────────────────┴───────────────────────────┐
          ▼                                                       ▼
┌───────────────────┐                                   ┌───────────────────┐
│   DOMAINS TESTED  │                                   │ DO NOT TEST (ROTE)│
├───────────────────┤                                   ├───────────────────┤
│ Practical Fluency │                                   │ Syntax Memory     │
│ Algorithmic Logic │ ◄──── Focuses on core ─────────── │ Software Trivia   │
│ AI Verification   │       cognitive patterns          │ UI Navigation     │
│ Risk Assessment   │                                   │ Math Proofs       │
└───────────────────┘                                   └───────────────────┘

```

### What the Assessment Measures

1. **Practical Digital Fluency:** The capacity to evaluate, manipulate, and communicate digital information in real-world contexts (e.g., data hygiene, cloud collaboration, advanced query construction).
2. **Algorithmic & Computational Reasoning:** The ability to decompose complex problems, recognize pattern structures, construct logical workflows, and trace state changes without execution environments.
3. **Critical Evaluation & Verification:** Assessing the authenticity of digital artifacts, identifying algorithmic/AI bias, recognizing security threats, and auditing automated outputs.
4. **Adaptive Problem Solving:** Applying logical frameworks to novel, unscripted technical constraints under time and resource limits.

### What the Assessment Intentionally Does NOT Measure

* **Syntax Memorization:** Remembering exact programming keywords, API calls, or punctuation (e.g., semi-colon placement, specific Python libraries).
* **Software UI Memorization:** Identifying exact button locations or menu configurations in specific software versions (e.g., *"Where is the font tab in Word 2016?"*).
* **Historical & Acronym Trivia:** Memorizing dates, inventors, or expanded acronyms (e.g., *"What year was Python invented?"* or *"What does HTML stand for?"*).
* **Pure Mathematical Proofs:** High-level theoretical mathematics detached from algorithmic application.

### Philosophical Justification & Educational Principles

* **Constructivism & Transferability:** Technology stacks change rapidly; structural mental models endure. By evaluating underlying logic rather than transient UI buttons, the assessment measures transferable digital resilience.
* **Authentic Assessment (Wiggins):** Tasks simulate real scenarios faced by modern high school students, future tech professionals, and citizens—such as navigating e-government platforms (e.g., `my.gov.uz`), handling suspicious messages, or evaluating AI summaries.
* **Cognitive Load Theory (Sweller):** Code snippets and scenarios isolate core cognitive demands by eliminating extraneous syntactic noise and confusing jargon.
* **Criterion-Referenced Diagnostic Validity:** Every item directly links to a specific competency gap, mapping directly to a 30-day intervention roadmap rather than producing a rank score without diagnostic utility.

---

## Step 2: Assessment Framework

```
  SkillMap Assessment Categories & Weight Distribution
 ┌───────────────────────────────────────────────────────────────┐
 │ Programming Fundamentals (25%)  [|||||||||||||||||||||||||]   │
 │ Computational Thinking   (20%)  [||||||||||||||||||||]        │
 │ Cybersecurity Awareness  (15%)  [|||||||||||||||]             │
 │ AI Literacy              (15%)  [|||||||||||||||]             │
 │ Digital Literacy         (15%)  [|||||||||||||||]             │
 │ Problem Solving          (10%)  [||||||||||]                  │
 └───────────────────────────────────────────────────────────────┘

```

### 1. Digital Literacy

* **Purpose:** Assess a student's ability to navigate, organize, verify, and curate digital assets effectively across modern operating systems and web platforms.
* **Importance:** Forms the foundation of modern educational and professional digital workflows.
* **Competencies:** Query Formulation, Information Verification, File System & Metadata Hygiene, Cloud Collaboration Workflows, Data Privacy Navigation.
* **Learning Objectives:** Synthesize information from multiple digital sources; construct boolean search strategies; resolve cloud sync and versioning conflicts.
* **Practical Behaviors:** Uses precise query operators (`site:`, filetype filters); identifies secure file storage structures; recovers overwritten document history.
* **Common Misconceptions:** Believing top search engine results are inherently verified; assuming deleting a local shortcut removes a file from cloud storage.
* **Expected Beginner Mistakes:** Relying on single-word web searches; mixing up local drive paths with cloud shared links.
* **Suggested Weight:** 15% (30 Questions: 10 Easy, 10 Medium, 10 Hard)

### 2. Computational Thinking

* **Purpose:** Measure the abstract cognitive processes involved in formulating problems so their solutions can be carried out by an information-processing agent.
* **Importance:** Develops foundational logic essential for computer science, engineering, and analytical thinking.
* **Competencies:** Decomposition, Pattern Recognition, Abstraction, Algorithm Design, State Tracking.
* **Learning Objectives:** Break complex tasks into sub-problems; map patterns into general rules; eliminate irrelevant details to build mental models.
* **Practical Behaviors:** Simplifies intricate workflow specifications into clear decision trees; identifies repeated sub-processes in manual tasks.
* **Common Misconceptions:** Equating computational thinking strictly with writing computer code; assuming algorithms only exist inside computers.
* **Expected Beginner Mistakes:** Attempting to solve a multi-layered problem in a single pass without isolating independent sub-components.
* **Suggested Weight:** 20% (30 Questions: 10 Easy, 10 Medium, 10 Hard)

### 3. Programming Fundamentals

* **Purpose:** Evaluate the ability to read, interpret, trace, and debug procedural code and logical expressions.
* **Importance:** Establishes code comprehension—the prerequisite skill before software construction.
* **Competencies:** Variable Mutation & Scope, Conditional Logic Branching, Iteration & Loop Invariants, Modular Function Execution, Trace Execution & State Mapping, Structural Bug Identification.
* **Learning Objectives:** Predict execution pathways of control structures; track variable states through nested loops; isolate runtime logic errors.
* **Practical Behaviors:** Traces variable history step-by-step; identifies off-by-one errors; reads pseudo-code to predict runtime outcomes.
* **Common Misconceptions:** Conflating assignment (`=`) with equality comparison (`==`); assuming code lines execute simultaneously rather than sequentially.
* **Expected Beginner Mistakes:** Failing to update loop counters leading to infinite loops; confusing inner vs. outer loop variables.
* **Suggested Weight:** 25% (30 Questions: 10 Easy, 10 Medium, 10 Hard)

### 4. Cybersecurity Awareness

* **Purpose:** Test defensive security instincts, operational privacy habits, threat recognition, and digital safety practices.
* **Importance:** Protects personal identity, financial credentials, and organizational infrastructure in an interconnected society.
* **Competencies:** Phishing & Social Engineering Detection, Credential Architecture & Authentication, Network & Wi-Fi Hygiene, Data Privacy & Permission Auditing, Device & Recovery Hygiene.
* **Learning Objectives:** Analyze email/SMS header signals for fraud; evaluate authentication protocols; audit application access permissions.
* **Practical Behaviors:** Inspects domain name URL structures before entering credentials; uses hardware/app-based multi-factor authentication; rejects unencrypted public Wi-Fi for sensitive tasks.
* **Common Misconceptions:** Believing HTTPS guarantees a website is legitimate (rather than just encrypted); assuming private browsing modes render users completely anonymous online.
* **Expected Beginner Mistakes:** Reusing master passwords across multiple accounts; trusting messages containing urgent pressure tactics from familiar logos.
* **Suggested Weight:** 15% (30 Questions: 10 Easy, 10 Medium, 10 Hard)

### 5. AI Literacy

* **Purpose:** Evaluate critical interaction with, evaluation of, and governance over Artificial Intelligence systems and Machine Learning models.
* **Importance:** Prepares students to navigate an AI-integrated workplace responsibly and critically.
* **Competencies:** Prompt Structuring & Context Framing, Hallucination & Fact Verification, Algorithmic Bias Identification, AI Capabilities vs. Limitations, Data Privacy & IP in AI.
* **Learning Objectives:** Formulate high-precision prompts; audit synthetic text outputs against primary source facts; identify systemic bias in training contexts.
* **Practical Behaviors:** Provides clear role, context, and constraints in LLM interactions; fact-checks AI claims using authoritative sources; avoids submitting personally identifiable information to public models.
* **Common Misconceptions:** Viewing Generative AI as a sentient source of truth rather than a statistical pattern matching engine; expecting LLMs to solve complex logic without step-by-step prompts.
* **Expected Beginner Mistakes:** Accepting generated citations or statistics at face value without verification; submitting raw confidential documents to external models.
* **Suggested Weight:** 15% (30 Questions: 10 Easy, 10 Medium, 10 Hard)

### 6. Problem Solving

* **Purpose:** Assess multi-constraint decision making, optimization, workflow troubleshooting, and systemic diagnostic capabilities.
* **Importance:** Translates technical concepts into effective execution during real-world operational challenges.
* **Competencies:** Constraint Satisfaction, Process Optimization, Systemic Troubleshooting, Resource Allocation, Fallback Planning.
* **Learning Objectives:** Determine optimal path choices given resource boundaries; diagnose root causes of process bottlenecks; design failsafes for critical workflows.
* **Practical Behaviors:** Maps bottleneck nodes in workflow diagrams; calculates resource trade-offs (e.g., speed vs. cost vs. accuracy); applies trial isolation to diagnose system bugs.
* **Common Misconceptions:** Assuming the fastest solution is always the best solution regardless of edge-case stability; changing multiple variables simultaneously during troubleshooting.
* **Expected Beginner Mistakes:** Choosing solutions that solve immediate symptoms while compounding underlying system failure.
* **Suggested Weight:** 10% (30 Questions: 10 Easy, 10 Medium, 10 Hard)

---

## Step 3: Competency Map

| Category | Competency Code | Competency Name | Sub-Competencies / Skill Nodes |
| --- | --- | --- | --- |
| **Digital Literacy** | `DL-01` | Query Engineering | Operator usage (`AND`, `OR`, `site:`), search term refinement, boolean logic |
|  | `DL-02` | Verification & Source Evaluation | Domain verification, bias check, cross-referencing, metadata inspection |
|  | `DL-03` | File & Data Architecture | Directory structures, naming conventions, file format compatibility, metadata |
|  | `DL-04` | Cloud Collaboration | Version history recovery, permission management (Viewer/Editor), sync conflict resolution |
|  | `DL-05` | Digital Environment Hygiene | Storage management, cache/cookie control, extension safety auditing |
| **Computational Thinking** | `CT-01` | Decomposition | Problem reduction, modularization, isolating sub-tasks |
|  | `CT-02` | Pattern Recognition | Sequence identification, structural abstraction, inductive generalizations |
|  | `CT-03` | Abstraction | Distillation of core variables, model simplification, suppressing noise |
|  | `CT-04` | Algorithmic Design | Flowchart logic, pseudocode design, conditional path optimization |
|  | `CT-05` | State Tracking | Deterministic simulation, mental variable tracing, structural mapping |
| **Programming Fundamentals** | `PF-01` | Variable & Data Scope | Assignment vs equality, scope resolution, state mutation |
|  | `PF-02` | Conditional Logic | Nested conditions, Boolean algebra evaluation, short-circuit evaluation |
|  | `PF-03` | Iteration & Loop Logic | Loop invariants, index bounds, termination conditions, nested iteration |
|  | `PF-04` | Modular Functions | Argument passing, return values, function side-effects, scope isolation |
|  | `PF-05` | Trace Execution | Stepping through execution, call-stack tracking, state table updates |
|  | `PF-06` | Debugging & Syntax Repair | Off-by-one errors, logical bugs, edge-case structural isolation |
| **Cybersecurity Awareness** | `CS-01` | Phishing & Social Engineering | URL parsing, spear-phishing signals, authority pressure tactics |
|  | `CS-02` | Credential & Authentication | Password strength models, 2FA protocols (TOTP vs SMS), password manager patterns |
|  | `CS-03` | Network & Endpoint Security | Encryption verification (TLS), public Wi-Fi risks, VPN utility |
|  | `CS-04` | Data Privacy & Permissions | Application permission minimization, digital footprint tracking, zero-trust habits |
|  | `CS-05` | Incident Recovery & Hygiene | Ransomware vector prevention, cloud backup regimes, device encryption |
| **AI Literacy** | `AI-01` | Prompt Structuring | Context framing, constraint inclusion, role specification, zero/few-shot prompts |
|  | `AI-02` | Verification & Hallucination | Grounding output against sources, detecting synthetic hallucinations |
|  | `AI-03` | Algorithmic Bias & Ethics | Training data skew, algorithmic fairness, output representation audit |
|  | `AI-04` | AI Model Mechanics | Deterministic vs probabilistic models, context window boundaries, tokens |
|  | `AI-05` | Privacy & Governance in AI | Data training opt-outs, confidential leaks, copyright/IP implications |
| **Problem Solving** | `PS-01` | Constraint Satisfaction | Multi-variable optimization, boundary condition evaluation |
|  | `PS-02` | Process Troubleshooting | Scientific isolation method, single-variable manipulation, root-cause analysis |
|  | `PS-03` | Resource Allocation | Trade-off analysis (time vs space vs financial cost), bottleneck resolution |
|  | `PS-04` | Decision Tree Optimization | Shortest-path calculation, decision graph pruning, fallback planning |

---

## Step 4: Difficulty Model

The assessment uses a three-tier difficulty classification system tied strictly to cognitive complexity, variable interaction, and context abstraction—**never** question length or obscure terminology.

```
┌────────────────────────────────────────────────────────────────────────┐
│                          DIFFICULTY MODEL                              │
├──────────────┬───────────────────────────┬─────────────────────────────┤
│ LEVEL        │ COGNITIVE PATTERN         │ COGNITIVE LOAD              │
├──────────────┼───────────────────────────┼─────────────────────────────┤
│ EASY         │ Direct 1-to-1 Mapping     │ Single variable / Direct    │
│ MEDIUM       │ Multi-Step Evaluation     │ 2-3 interacting variables   │
│ HARD         │ Systems & Trade-Offs      │ Multi-variable + Edge cases │
└──────────────┴───────────────────────────┴─────────────────────────────┘

```

### Level 1: Easy

* **Prerequisite Knowledge:** Basic familiarity with core digital concepts, standard computer operation terms, and linear pseudo-code execution.
* **Reasoning Required:** Direct application of a single rule, linear execution tracking, single-variable condition checks, or straightforward pattern recognition.
* **What Makes It Easy:**
* The solution path has zero competing choices or distracting variables.
* The scenario features a single context without edge cases.
* Information needed to answer is fully explicit in the question prompt.



### Level 2: Medium

* **Prerequisite Knowledge:** Ability to combine two or more distinct concepts (e.g., combining conditional loops with state updates, or pairing URL parsing with authentication principles).
* **Reasoning Required:** Multi-step forward tracing, evaluating two competing constraints simultaneously, identifying logical bugs within working code structures, or analyzing realistic scenario dilemmas with a plausible distractor.
* **What Makes It Medium:**
* Requires student to track state across multiple steps (e.g., array iteration with conditional state updates).
* Distractors represent common beginner mental misconceptions (e.g., off-by-one errors, failing to account for string capitalization in search queries).
* Prompt presents a trade-off scenario where one option is clearly optimal based on constraints.



### Level 3: Hard

* **Prerequisite Knowledge:** Systems-level understanding of computational processes, security threat vectors, or complex algorithmic efficiency trade-offs.
* **Reasoning Required:** Reverse reasoning (deducing input parameters from final output state), multi-variable system optimization, edge-case vulnerability detection, prompt-injection / bias audit in AI systems.
* **What Makes It Hard:**
* Contains edge cases that break naive logic (e.g., empty inputs, boundary values, subtle logic inversions).
* Options present multiple plausible-sounding solutions; only one accounts for all system constraints and trade-offs.
* Demands deep evaluation of non-obvious failure modes in security, programming, or AI validation contexts.



---

## Step 5: Question Taxonomy

To prevent pattern recognition bias and ensure high psychometric validity, the assessment employs nine distinct item types:

1. **Multiple Choice (Standard Contextual):** Evaluates core conceptual understanding within a brief scenario. Ensures baseline evaluation of concepts across all domains.
2. **Real-Life Scenarios (Dilemma-Based):** Places the student in an authentic, high-stakes situation (e.g., receiving a suspicious payment notification on *Click.uz* or *Payme*). Tests real-world behavioral application rather than theoretical awareness.
3. **Code Reading (Mental Execution):** Demands step-by-step tracing of pseudocode or Python-like structures to predict final states. Measures mental execution precision and state tracking.
4. **Debugging (Defect Isolation):** Displays code or logical workflows containing a specific bug. Tests the student's ability to isolate cause-and-effect relationships rather than syntax memory.
5. **Logic Puzzles (Abstract Deduction):** Context-light grid, sequence, or pattern problems (Bebras style). Tests raw computational reasoning independent of background knowledge.
6. **Ranking & Sequence Ordering:** Requires students to sequence steps in an execution pipeline (e.g., ordering incident response actions or structuring a multi-stage data clean-up). Measures process and structural workflow comprehension.
7. **Matching & Matrix Classification:** Asks students to map multiple scenarios to their respective categories or threat profiles. Tests multi-concept categorization and comparative analysis.
8. **Best Decision (Trade-off Analysis):** Features multiple working solutions where the student must select the most efficient, secure, or scalable approach given explicit constraints.
9. **Select Multiple (Multi-Constraint):** Requires selecting all correct applications/statements out of 4–5 options. Eliminates lucky guessing and tests comprehensive conceptual coverage.

---

## Step 6: Metadata Schema

Every item in the SkillMap assessment adheres to the following JSON metadata specification:

```json
{
  "$schema": "https://skillmap.uz/schemas/item-metadata.v1.json",
  "itemHeader": {
    "questionId": "STRING (e.g., SKM-PF-EASY-001)",
    "category": "Digital Literacy | Computational Thinking | Programming Fundamentals | Cybersecurity Awareness | AI Literacy | Problem Solving",
    "competencyCode": "STRING (e.g., PF-03)",
    "competencyName": "STRING (e.g., Iteration & Loop Logic)",
    "difficulty": "Easy | Medium | Hard",
    "questionType": "Multiple Choice | Real-life Scenario | Code Reading | Debugging | Logic | Ranking | Matching | Best Decision | Select Multiple",
    "estimatedTimeSeconds": "NUMBER (e.g., 60)"
  },
  "pedagogicalAlignment": {
    "learningObjective": "STRING (Clear, measurable bloom-taxonomy statement)",
    "roadmapSkillMapping": "STRING (Identifies specific module in 30-day curriculum)",
    "commonMistakeDetected": "STRING (Explains the specific misconception revealed if failed)",
    "tags": ["ARRAY_OF_STRINGS"]
  },
  "content": {
    "question": "STRING (Formatted scenario, code block, or question prompt)",
    "options": [
      { "id": "A", "text": "STRING" },
      { "id": "B", "text": "STRING" },
      { "id": "C", "text": "STRING" },
      { "id": "D", "text": "STRING" }
    ],
    "correctAnswer": "STRING (e.g., 'B' or ['A', 'C'])",
    "explanation": "STRING (Comprehensive pedagogical explanation of the correct logic)",
    "distractorAnalysis": {
      "A": "STRING (Why this choice reflects a specific error in reasoning)",
      "B": "STRING (Correct validation or distractor note)",
      "C": "STRING (Why this choice reflects a specific error in reasoning)",
      "D": "STRING (Why this choice reflects a specific error in reasoning)"
    }
  }
}

```

---

## Step 7: Scoring Methodology

SkillMap Uzbekistan uses a **Weighted Item Response Theory (IRT) Derivative Model** to ensure scores reflect genuine competence rather than random chance.

```
       SCORING WEIGHT FORMULA
 ──────────────────────────────────
   Weight (W_i) = Category Weight (W_c) × Difficulty Multiplier (M_d)

   Category Weights (W_c):        Difficulty Multipliers (M_d):
   • Programming: 0.25            • Easy:   1.0
   • Comp. Thinking: 0.20         • Medium: 1.5
   • Cyber/AI/Digital: 0.15 each  • Hard:   2.0
   • Problem Solving: 0.10

```

### 1. Item Level Scoring

* **Binary Standard Items (Single Choice, Scenarios, Code Reading):** Correct = 1.0, Incorrect = 0.0.
* **Partial Credit Items (Select Multiple, Ranking, Matching):**
* *Select Multiple:* Partial credit given as:

$$\text{Score} = \max\left(0, \frac{\text{Correct Matches} - \text{Incorrect Selections}}{\text{Total Correct Options}}\right)$$


* *Ranking/Ordering:* Uses Kendall’s Tau Distance measure to give proportional credit for partially ordered steps.



### 2. Weighting Matrix

Each question's point value is governed by its Category Weight ($W_c$) and Difficulty Multiplier ($M_d$):


$$\text{Item Weight } (W_i) = W_c \times M_d$$

Where:

* Easy Multiplier ($M_d$) = $1.0$
* Medium Multiplier ($M_d$) = $1.5$
* Hard Multiplier ($M_d$) = $2.0$

### 3. Competency & Category Mastery Score calculation

Category Score ($S_c$) is scaled to 0–100%:


$$S_c = \left( \frac{\sum \text{Earned Points in Category}}{\sum \text{Max Possible Points in Category}} \right) \times 100$$

Overall Composite Score ($S_{\text{overall}}$):


$$S_{\text{overall}} = \sum_{c=1}^{6} (S_c \times W_c)$$

### 4. Confidence & Guessing Penalty Safeguard

* **Item Response Latency Check:** If an item answered correctly has an execution time $< 15\%$ of `estimatedTimeSeconds`, its weight is reduced by $50\%$ in final scoring (flags rapid random guessing).
* **Misconception Index:** Failing 3+ questions that map to the same `commonMistakeDetected` across different categories triggers a high-priority diagnostic tag on the student's profile.

---

## Step 8: Personalized Roadmap Logic

The diagnostic engine converts assessment performance directly into a targeted **30-Day Skill Map**.

```
                       COMPETENCY ASSESSMENT RESULTS
                                     │
                 ┌───────────────────┴───────────────────┐
                 ▼                                       ▼
        Score < 60% (Gap)                       Score ≥ 80% (Mastery)
                 │                                       │
                 ▼                                       ▼
   Trigger Targeted 30-Day Module            Bypass Foundation Modules
   (e.g., Low Debugging ->                   Assign Acceleration Track
    Module 3: Code Tracing)                  (e.g., Applied Projects)

```

### Diagnostic Decision Rules Matrix

| Diagnostic Condition | Identified Competency Gap | Recommended 30-Day Learning Path | Module Focus |
| --- | --- | --- | --- |
| **$S_{\text{PF}} < 50\%$** | Structural Programming | *Foundation Track:* Visual Logic to Python | Tracing variables, nested loops, conditional execution pathways. |
| **$S_{\text{PF}} \ge 75\%$ AND Debugging Score $< 50\%$** | Code Tracing & Edge Cases | *Intermediate Track:* Systemic Debugging | Isolation testing, index boundary checks, dry-running state tables. |
| **$S_{\text{CT}} < 60\%$** | Computational Thinking | *Core Logic Track:* Algorithmic Reasoning | Flowchart design, problem decomposition, Bebras-style problem breakdown. |
| **$S_{\text{CS}} < 60\%$** | Cyber Risk Hygiene | *Digital Safety Track:* Threat Defensive Operations | URL decomposition, password management, phishing simulation labs. |
| **$S_{\text{AI}} < 60\%$** | AI Validation & Prompting | *AI Literacy Track:* Critical AI Engineering | Contextual prompting, hallucination audits, verification frameworks. |
| **$S_{\text{DL}} < 60\%$** | Information & Cloud Hygiene | *Digital Professional Track:* Workflow Architecture | Advanced search operators, cloud collaboration, file tree optimization. |
| **High Logic ($S_{\text{CT}} \ge 80\%$) + Low Code ($S_{\text{PF}} < 50\%$)** | Syntax & Syntax-to-Logic Mapping | *Accelerated Python Track* | Fast-track transition from logic patterns directly to clean code implementation. |

---

## Step 9: Complete Question Bank

Below is a rich question bank containing **exemplar items across all 6 categories and all difficulty levels**, built strictly according to the Step 6 Metadata Schema and educational guidelines.

---

### Category 1: Digital Literacy

#### Item DL-EASY-001

```json
{
  "itemHeader": {
    "questionId": "SKM-DL-EASY-001",
    "category": "Digital Literacy",
    "competencyCode": "DL-01",
    "competencyName": "Query Engineering",
    "difficulty": "Easy",
    "questionType": "Multiple Choice",
    "estimatedTimeSeconds": 45
  },
  "pedagogicalAlignment": {
    "learningObjective": "Formulate a targeted web search query using domain-limiting operators to isolate official document types.",
    "roadmapSkillMapping": "Module 01: Advanced Search Techniques & Information Verification",
    "commonMistakeDetected": "Relying on natural language questions without structural operators.",
    "tags": ["search-operators", "query-tuning", "digital-literacy"]
  },
  "content": {
    "question": "A student in Tashkent needs to find official PDF reports on renewable energy published exclusively on the Uzbekistan government portal (my.gov.uz). Which search query will yield the most precise results?",
    "options": [
      { "id": "A", "text": "renewable energy report my.gov.uz pdf" },
      { "id": "B", "text": "site:my.gov.uz filetype:pdf \"renewable energy\"" },
      { "id": "C", "text": "find official government pdfs about renewable energy in Uzbekistan" },
      { "id": "D", "text": "http://my.gov.uz/search?q=renewable+energy+pdf" }
    ],
    "correctAnswer": "B",
    "explanation": "Option B correctly utilizes explicit search syntax: `site:my.gov.uz` restricts results to the target government domain, `filetype:pdf` enforces document format, and double quotes ensure the exact phrase match.",
    "distractorAnalysis": {
      "A": "Includes key terms as plain text without enforcement syntax, leading to general web pages and blogs.",
      "B": "Correct. Combines domain filtering, file extension constraints, and exact match quotes.",
      "C": "Uses conversational prose which search engines parse inefficiently, bringing up news articles instead of primary source files.",
      "D": "Pastes a constructed URL path rather than executing a web search query."
    }
  }
}

```

#### Item DL-MED-001

```json
{
  "itemHeader": {
    "questionId": "SKM-DL-MED-001",
    "category": "Digital Literacy",
    "competencyCode": "DL-04",
    "competencyName": "Cloud Collaboration",
    "difficulty": "Medium",
    "questionType": "Real-life Scenario",
    "estimatedTimeSeconds": 75
  },
  "pedagogicalAlignment": {
    "learningObjective": "Resolve cloud file synchronization and permission conflicts in collaborative workspace environments.",
    "roadmapSkillMapping": "Module 02: Cloud Architecture & Shared Workspaces",
    "commonMistakeDetected": "Confusing view-only permissions with edit rights, or creating duplicate un-synced local files.",
    "tags": ["cloud-storage", "collaboration", "permissions"]
  },
  "content": {
    "question": "Malika and Malek are co-authoring a school presentation stored on a cloud drive. Malika opens the document on her laptop while offline, makes extensive changes, and saves it. Meanwhile, Malek edits the same document online. When Malika reconnects to the internet, a 'Sync Conflict' notification appears. What is the safest action Malika should take to prevent data loss?",
    "options": [
      { "id": "A", "text": "Force-overwrite the cloud file with her local version since her edits were more extensive." },
      { "id": "B", "text": "Delete her local copy and rely completely on Malek's online version." },
      { "id": "C", "text": "Save her offline copy under a distinct name (e.g., 'Presentation_Malika_Edits'), inspect the online version, and merge differences using Version History." },
      { "id": "D", "text": "Disconnect from the internet permanently until the project presentation is completed." }
    ],
    "correctAnswer": "C",
    "explanation": "Renaming the local version preserves both edit states. Inspecting the online version and using automated version history or manual comparison prevents overwriting Malek's remote contributions.",
    "distractorAnalysis": {
      "A": "Overwriting destroys Malek's online contributions permanently.",
      "B": "Deleting the local file permanently destroys all of Malika's offline work.",
      "C": "Correct. Preserves both states safely before performing a controlled merge.",
      "D": "Avoids the technical issue entirely and prevents final presentation assembly."
    }
  }
}

```

#### Item DL-HARD-001

```json
{
  "itemHeader": {
    "questionId": "SKM-DL-HARD-001",
    "category": "Digital Literacy",
    "competencyCode": "DL-02",
    "competencyName": "Verification & Source Evaluation",
    "difficulty": "Hard",
    "questionType": "Best Decision",
    "estimatedTimeSeconds": 90
  },
  "pedagogicalAlignment": {
    "learningObjective": "Verify the authenticity of open digital datasets using cryptographic hash values and digital certificates.",
    "roadmapSkillMapping": "Module 03: Information Verification & Digital Asset Integrity",
    "commonMistakeDetected": "Assuming visual visual resemblance or secure HTTPS connection proves a downloaded file hasn't been altered.",
    "tags": ["verification", "data-integrity", "hashing"]
  },
  "content": {
    "question": "A student downloads a large economic dataset (.csv format) from an open government research repository to use in a data science competition. The repository provides an SHA-256 hash string on its official site alongside the download link. What is the most reliable technical method to verify that the file downloaded to the student's laptop is complete and has not been tampered with?",
    "options": [
      { "id": "A", "text": "Open the .csv file in Excel and check if the total row count matches the number shown on the website." },
      { "id": "B", "text": "Check if the download URL begins with 'https://' and has a green padlock icon." },
      { "id": "C", "text": "Compute the SHA-256 hash of the downloaded local file using a terminal/command tool and compare it character-by-character to the hash published on the website." },
      { "id": "D", "text": "Re-download the file three times and check if all three downloaded files have identical file sizes down to the byte." }
    ],
    "correctAnswer": "C",
    "explanation": "Cryptographic hash functions (like SHA-256) generate a unique fingerprint of a file's exact contents. If even a single byte is altered or corrupted during download, the resulting hash will change drastically. Matching computed local hash with published hash guarantees byte-for-byte integrity.",
    "distractorAnalysis": {
      "A": "Row count can remain identical even if data values within rows have been altered or corrupted.",
      "B": "HTTPS encrypts the transit connection, but does not guarantee the downloaded file wasn't corrupted or modified at the source.",
      "C": "Correct. SHA-256 hash comparison provides mathematical proof of file integrity.",
      "D": "Repeatedly downloading could fetch the same corrupted file from cache, failing to verify against source truth."
    }
  }
}

```

---

### Category 2: Computational Thinking

#### Item CT-EASY-001

```json
{
  "itemHeader": {
    "questionId": "SKM-CT-EASY-001",
    "category": "Computational Thinking",
    "competencyCode": "CT-01",
    "competencyName": "Decomposition",
    "difficulty": "Easy",
    "questionType": "Multiple Choice",
    "estimatedTimeSeconds": 45
  },
  "pedagogicalAlignment": {
    "learningObjective": "Decompose a complex real-world process into discrete, non-overlapping sub-tasks.",
    "roadmapSkillMapping": "Module 04: Problem Decomposition & Flow Architecture",
    "commonMistakeDetected": "Mixing high-level goals with micro-implementation steps without logical grouping.",
    "tags": ["decomposition", "workflow", "computational-thinking"]
  },
  "content": {
    "question": "An engineering club wants to build an automated plant-watering system controlled by a micro-computer. Which set represents a clean top-level decomposition of this problem into independent sub-problems?",
    "options": [
      { "id": "A", "text": "1. Buy plastic pipes; 2. Plug in the computer; 3. Turn on water; 4. Check if plant is wet." },
      { "id": "B", "text": "1. Soil Moisture Sensing; 2. Decision Logic Engine; 3. Water Pump Actuation; 4. Power Management." },
      { "id": "C", "text": "1. Write Python code; 2. Fix Python errors; 3. Run Python code; 4. Save Python file." },
      { "id": "D", "text": "1. Water the plant on Monday; 2. Water the plant on Wednesday; 3. Water the plant on Friday." }
    ],
    "correctAnswer": "B",
    "explanation": "Option B breaks the system into distinct functional subsystems (Input, Processing, Output, Infrastructure) that can be designed and tested independently.",
    "distractorAnalysis": {
      "A": "Lists sequential physical assembly actions rather than functional system decomposition.",
      "B": "Correct. Isolates discrete sub-problems cleanly.",
      "C": "Focuses only on software editing tasks rather than the overall system architecture.",
      "D": "Describes a hardcoded schedule rather than structural system components."
    }
  }
}

```

#### Item CT-MED-001

```json
{
  "itemHeader": {
    "questionId": "SKM-CT-MED-001",
    "category": "Computational Thinking",
    "competencyCode": "CT-02",
    "competencyName": "Pattern Recognition",
    "difficulty": "Medium",
    "questionType": "Logic",
    "estimatedTimeSeconds": 75
  },
  "pedagogicalAlignment": {
    "learningObjective": "Identify structural rules in input-output sequences and extrapolate general patterns.",
    "roadmapSkillMapping": "Module 05: Pattern Recognition & Rule Abstraction",
    "commonMistakeDetected": "Assuming linear addition patterns when rules involve conditional state changes.",
    "tags": ["pattern-recognition", "logic", "sequences"]
  },
  "content": {
    "question": "A data transformation engine processes numbers according to a specific rule set:\n- Input `4`  -> Output `9`\n- Input `7`  -> Output `15`\n- Input `10` -> Output `21`\n- Input `3`  -> Output `7`\n\nIf the input is `12`, what will the output be based on the abstract pattern?",
    "options": [
      { "id": "A", "text": "24" },
      { "id": "B", "text": "25" },
      { "id": "C", "text": "27" },
      { "id": "D", "text": "30" }
    ],
    "correctAnswer": "B",
    "explanation": "Analyzing the input-output pairs reveals the transformation rule: $\text{Output} = (\text{Input} \times 2) + 1$.\n- $(4 \times 2) + 1 = 9$\n- $(7 \times 2) + 1 = 15$\n- $(10 \times 2) + 1 = 21$\n- $(3 \times 2) + 1 = 7$\nApplying this pattern to input $12$: $(12 \times 2) + 1 = 25$.",
    "distractorAnalysis": {
      "A": "Applies simple doubling ($12 \times 2 = 24$) without adding the standard offset $+1$.",
      "B": "Correct. Follows the formula $2x + 1$.",
      "C": "Adds 3 instead of multiplying ($12 + 15 = 27$), misinterpreting row progression.",
      "D": "Overestimates by assuming exponential growth."
    }
  }
}

```

#### Item CT-HARD-001

```json
{
  "itemHeader": {
    "questionId": "SKM-CT-HARD-001",
    "category": "Computational Thinking",
    "competencyCode": "CT-04",
    "competencyName": "Algorithmic Design",
    "difficulty": "Hard",
    "questionType": "Best Decision",
    "estimatedTimeSeconds": 100
  },
  "pedagogicalAlignment": {
    "learningObjective": "Evaluate computational complexity trade-offs between linear and binary search algorithms under constraints.",
    "roadmapSkillMapping": "Module 06: Algorithm Optimization & Complexity Analysis",
    "commonMistakeDetected": "Failing to account for the prerequisite sorting step before applying binary search.",
    "tags": ["algorithms", "binary-search", "optimization"]
  },
  "content": {
    "question": "You are designing a lookup system for a digital registry of 1,000,000 student IDs. The registry is updated once a month, but search queries are performed 500,000 times per day. You must choose between two approaches:\n\n- Approach A: Store IDs in unsorted order. Insertions are instant. Searching requires checking each entry sequentially from start to end (Linear Search).\n- Approach B: Keep IDs sorted at all times. Inserting a new ID takes extra time to maintain order. Searching uses middle-split elimination (Binary Search).\n\nWhich approach is computationally optimal and why?",
    "options": [
      { "id": "A", "text": "Approach A, because unsorted lists save memory and avoid maintenance work." },
      { "id": "B", "text": "Approach B, because high search frequency heavily outweighs monthly insertion cost, reducing worst-case searches from 1,000,000 steps to just 20 steps per query." },
      { "id": "C", "text": "Approach A, because Linear Search is faster when searching for IDs near the beginning of the list." },
      { "id": "D", "text": "Both approaches perform identically because total data volume is under 1 GB." }
    ],
    "correctAnswer": "B",
    "explanation": "Binary search on a sorted dataset of 1,000,000 elements requires at most $\log_2(1,000,000) \approx 20$ comparison steps. In contrast, linear search requires up to 1,000,000 steps (average 500,000). Because queries happen 500,000 times daily and sorting occurs only once a month, paying the upfront sorting cost drastically minimizes overall execution time.",
    "distractorAnalysis": {
      "A": "Focuses on write convenience while ignoring the catastrophic cost of 500,000 slow daily searches.",
      "B": "Correct. Evaluates system trade-offs based on operational query frequency vs mutation frequency.",
      "C": "Relies on best-case scenario fallacies rather than average/worst-case algorithmic performance.",
      "D": "Incorrectly assumes memory size eliminates algorithmic time complexity bottlenecks."
    }
  }
}

```

---

### Category 3: Programming Fundamentals

#### Item PF-EASY-001

```json
{
  "itemHeader": {
    "questionId": "SKM-PF-EASY-001",
    "category": "Programming Fundamentals",
    "competencyCode": "PF-01",
    "competencyName": "Variable & Data Scope",
    "difficulty": "Easy",
    "questionType": "Code Reading",
    "estimatedTimeSeconds": 45
  },
  "pedagogicalAlignment": {
    "learningObjective": "Trace sequential assignment and variable state mutations in simple procedural code.",
    "roadmapSkillMapping": "Module 07: Variable State & Memory Assignment",
    "commonMistakeDetected": "Assuming variable assignment creates a permanent mathematical equation link rather than a point-in-time value copy.",
    "tags": ["variables", "assignment", "tracing"]
  },
  "content": {
    "question": "Read the following code block carefully:\n\n```python
x = 5
y = x + 2
x = 10
y = y + 1
```\n\nWhat are the final values of `x` and `y` after execution?",
    "options": [
      { "id": "A", "text": "x = 10, y = 8" },
      { "id": "B", "text": "x = 10, y = 13" },
      { "id": "C", "text": "x = 5, y = 7" },
      { "id": "D", "text": "x = 10, y = 7" }
    ],
    "correctAnswer": "A",
    "explanation": "Stepping through execution:\n1. `x` becomes `5`.\n2. `y` becomes `5 + 2 = 7`.\n3. `x` is reassigned to `10` (this does NOT retroactively change `y`).\n4. `y` becomes `7 + 1 = 8`.\nFinal state: `x = 10`, `y = 8`.",
    "distractorAnalysis": {
      "A": "Correct. Accurately tracks independent variable state mutations step by step.",
      "B": "Incorrectly assumes changing `x` to 10 dynamically updated `y` to `10 + 2 = 12`, then added 1.",
      "C": "Ignores reassignment lines 3 and 4.",
      "D": "Misses line 4 (`y = y + 1`)."
    }
  }
}

```

#### Item PF-MED-001

```json
{
  "itemHeader": {
    "questionId": "SKM-PF-MED-001",
    "category": "Programming Fundamentals",
    "competencyCode": "PF-03",
    "competencyName": "Iteration & Loop Logic",
    "difficulty": "Medium",
    "questionType": "Debugging",
    "estimatedTimeSeconds": 75
  },
  "pedagogicalAlignment": {
    "learningObjective": "Identify and correct off-by-one errors and loop boundary conditions in array iteration.",
    "roadmapSkillMapping": "Module 08: Iteration Controls & Boundary Safety",
    "commonMistakeDetected": "Off-by-one errors caused by confusing 0-indexed position counts with human 1-based lengths.",
    "tags": ["loops", "debugging", "off-by-one", "arrays"]
  },
  "content": {
    "question": "A programmer writes a function to sum all elements in a list, but it throws an `IndexError` (out of range) when run:\n\n```python
numbers = [10, 20, 30, 40]
total = 0

# Intent: Add every number in the list
for i in range(0, 5):
    total = total + numbers[i]
```\n\nWhat is the exact cause of the error and how should it be fixed?",
    "options": [
      { "id": "A", "text": "The variable `total` must start at `1` instead of `0`." },
      { "id": "B", "text": "`range(0, 5)` attempts to access `numbers[4]`, but valid indexes for a 4-item list are `0, 1, 2, 3`. Fix: change range to `range(len(numbers))`." },
      { "id": "C", "text": "The `+` operator cannot add list items inside a loop." },
      { "id": "D", "text": "The loop should iterate backwards from `5` to `0`." }
    ],
    "correctAnswer": "B",
    "explanation": "List `numbers` contains 4 elements at indices 0, 1, 2, and 3. `range(0, 5)` generates index values 0, 1, 2, 3, 4. Attempting to access `numbers[4]` causes an `IndexError`. Using `len(numbers)` dynamically sets the range bound to 4, generating indices 0 to 3 safely.",
    "distractorAnalysis": {
      "A": "Accumulator initial state has no bearing on array boundary access errors.",
      "B": "Correct. Identifies the off-by-one index bound mismatch clearly.",
      "C": "False assertion; standard addition handles numerical list values.",
      "D": "Reversing index order without changing boundary bounds fails to fix the index out-of-range error."
    }
  }
}

```

#### Item PF-HARD-001

```json
{
  "itemHeader": {
    "questionId": "SKM-PF-HARD-001",
    "category": "Programming Fundamentals",
    "competencyCode": "PF-05",
    "competencyName": "Trace Execution",
    "difficulty": "Hard",
    "questionType": "Code Reading",
    "estimatedTimeSeconds": 90
  },
  "pedagogicalAlignment": {
    "learningObjective": "Trace nested conditional iteration logic and state accumulation across structural matrix operations.",
    "roadmapSkillMapping": "Module 09: Complex State Machines & Nested Control Flow",
    "commonMistakeDetected": "Failing to reset inner loop accumulator flags across outer loop passes.",
    "tags": ["nested-loops", "state-tracing", "algorithms"]
  },
  "content": {
    "question": "Analyze the following nested loop execution code:\n\n```python
data = [1, 2, 3, 4, 5]
result = []

for i in range(len(data)):
    count = 0
    for j in range(i):
        if data[j] % 2 == 0:
            count += 1
    result.append(count)

print(result)
```\n\nWhat output is printed when this program executes?",
    "options": [
      { "id": "A", "text": "[0, 0, 1, 1, 2]" },
      { "id": "B", "text": "[0, 1, 1, 2, 2]" },
      { "id": "C", "text": "[1, 2, 3, 4, 5]" },
      { "id": "D", "text": "[0, 0, 0, 1, 2]" }
    ],
    "correctAnswer": "A",
    "explanation": "Let's trace step-by-step for `i` from `0` to `4`:\n- `i=0`: inner `range(0)` does not execute. `count=0`. `result=[0]`\n- `i=1`: inner `range(1)` checks `data[0]` (`1`, odd). `count=0`. `result=[0, 0]`\n- `i=2`: inner `range(2)` checks `data[0]` (`1`), `data[1]` (`2`, even!). `count=1`. `result=[0, 0, 1]`\n- `i=3`: inner `range(3)` checks `data[0..2]` (`1, 2, 3`). Evens: `2` (1 count). `count=1`. `result=[0, 0, 1, 1]`\n- `i=4`: inner `range(4)` checks `data[0..3]` (`1, 2, 3, 4`). Evens: `2, 4` (2 counts). `count=2`. `result=[0, 0, 1, 1, 2]`.",
    "distractorAnalysis": {
      "A": "Correct. Precise step-by-step mental execution tracing.",
      "B": "Off-by-one tracking error on when the inner range loop triggers.",
      "C": "Confuses counting matching even elements with raw index iteration values.",
      "D": "Misses the even check at index 1 (`data[1] = 2`)."
    }
  }
}

```

---

### Category 4: Cybersecurity Awareness

#### Item CS-EASY-001

```json
{
  "itemHeader": {
    "questionId": "SKM-CS-EASY-001",
    "category": "Cybersecurity Awareness",
    "competencyCode": "CS-01",
    "competencyName": "Phishing & Social Engineering",
    "difficulty": "Easy",
    "questionType": "Real-life Scenario",
    "estimatedTimeSeconds": 45
  },
  "pedagogicalAlignment": {
    "learningObjective": "Identify domain spoofing indicators in incoming electronic communications.",
    "roadmapSkillMapping": "Module 10: Social Engineering & Spear Phishing Defense",
    "commonMistakeDetected": "Trusting sender display names while failing to inspect underlying domain headers.",
    "tags": ["phishing", "domain-spoofing", "cybersecurity"]
  },
  "content": {
    "question": "A student receives an urgent email with the subject: *\"SECURITY ALERT: Your Telegram account will be terminated in 2 hours. Verify credentials immediately.\"*\n\nThe sender line displays: `Telegram Security <support@telegram-verify-user88.com>`.\n\nWhat is the safest immediate action?",
    "options": [
      { "id": "A", "text": "Click the link immediately to prevent account termination." },
      { "id": "B", "text": "Reply to the email asking if this request is legitimate." },
      { "id": "C", "text": "Mark the message as phishing, do not click links, and check account status independently via the official app." },
      { "id": "D", "text": "Forward the email to all school contacts to warn them about the security issue." }
    ],
    "correctAnswer": "C",
    "explanation": "The domain `telegram-verify-user88.com` is an unofficial spoofed domain designed to induce panic. Legitimate security issues should always be verified independently through official application channels without clicking external links.",
    "distractorAnalysis": {
      "A": "Falling for artificial urgency panic leads to credential theft via malicious login portals.",
      "B": "Replying confirms to attackers that the victim's email address is active and monitored.",
      "C": "Correct. Identifies phishing domain indicators and follows safe containment hygiene.",
      "D": "Forwarding spreads malicious phishing links to broader user networks."
    }
  }
}

```

#### Item CS-MED-001

```json
{
  "itemHeader": {
    "questionId": "SKM-CS-MED-001",
    "category": "Cybersecurity Awareness",
    "competencyCode": "CS-02",
    "competencyName": "Credential & Authentication",
    "difficulty": "Medium",
    "questionType": "Best Decision",
    "estimatedTimeSeconds": 60
  },
  "pedagogicalAlignment": {
    "learningObjective": "Evaluate the technical security efficacy of different Multi-Factor Authentication (MFA) methods.",
    "roadmapSkillMapping": "Module 11: Authentication Architecture & Zero-Trust Hygiene",
    "commonMistakeDetected": "Assuming SMS verification codes provide equal security to hardware/app-based authenticators.",
    "tags": ["mfa", "authentication", "security"]
  },
  "content": {
    "question": "A student wants to secure their primary email and bank account against account takeover attacks. They must choose an authentication security configuration. Which configuration provides the strongest defense against remote credential theft and SIM-swapping attacks?",
    "options": [
      { "id": "A", "text": "A complex 16-character password combined with SMS text message security codes." },
      { "id": "B", "text": "A complex 16-character unique passphrase stored in a password manager, combined with Time-based One-Time Password (TOTP) authenticator app or hardware security key." },
      { "id": "C", "text": "A standard 8-character password changed manually every 7 days without 2FA." },
      { "id": "D", "text": "Using the same strong 20-character password across all online accounts so it is never forgotten." }
    ],
    "correctAnswer": "B",
    "explanation": "SMS-based 2FA is vulnerable to SIM-swapping and SMS-interception attacks. Combining a unique passphrase stored securely in a password manager with TOTP authenticator apps or hardware keys (FIDO2) provides robust isolation against remote phishing and interception.",
    "distractorAnalysis": {
      "A": "Vulnerable to SIM swap attacks where attackers hijack the victim's mobile phone number.",
      "B": "Correct. Combines unique credential generation with out-of-band app/hardware authentication.",
      "C": "Frequent manual changes lead to weak variations (e.g., Password1!, Password2!) without multi-factor protection.",
      "D": "Password reuse creates catastrophic single-point-of-failure risks via credential stuffing."
    }
  }
}

```

#### Item CS-HARD-001

```json
{
  "itemHeader": {
    "questionId": "SKM-CS-HARD-001",
    "category": "Cybersecurity Awareness",
    "competencyCode": "CS-03",
    "competencyName": "Network & Endpoint Security",
    "difficulty": "Hard",
    "questionType": "Select Multiple",
    "estimatedTimeSeconds": 90
  },
  "pedagogicalAlignment": {
    "learningObjective": "Identify Man-in-the-Middle (MitM) exposure vectors when connecting to unencrypted public Wi-Fi networks.",
    "roadmapSkillMapping": "Module 12: Network Encryption & Packet Safety",
    "commonMistakeDetected": "Believing HTTPS encrypts overall device connection traffic metadata like DNS lookups.",
    "tags": ["network-security", "mitm", "wi-fi", "dns"]
  },
  "content": {
    "question": "While studying at a public cafe, a student connects their laptop to an open, unencrypted Wi-Fi network ('Cafe_Guest_Free'). Which of the following vulnerabilities are active risks on this connection if NO Encrypted Virtual Private Network (VPN) is used? (Select ALL that apply)",
    "options": [
      { "id": "A", "text": "Unencrypted HTTP website traffic can be eavesdropped and modified by an attacker on the same network." },
      { "id": "B", "text": "An attacker running a rogue access point can perform DNS spoofing to redirect the user to fake login pages." },
      { "id": "C", "text": "An attacker can physically drain the laptop battery remotely through open Wi-Fi signals." },
      { "id": "D", "text": "Unencrypted network metadata (such as unencrypted DNS domain requests) can be monitored to track websites visited." }
    ],
    "correctAnswer": ["A", "B", "D"],
    "explanation": "On unencrypted Wi-Fi networks without a VPN:\n- HTTP traffic is sent in cleartext (A).\n- Rogue Wi-Fi APs can inject false DNS resolution records to redirect traffic (B).\n- Plaintext DNS requests reveal domain names visited (D).\nBattery drain via network packet receipt is not a cyber vulnerability vector (C).",
    "distractorAnalysis": {
      "A": "Correct vulnerability statement.",
      "B": "Correct vulnerability statement.",
      "C": "Nonsensical assertion; battery consumption from standard wifi frame processing is negligible and not a cyberattack vector.",
      "D": "Correct vulnerability statement."
    }
  }
}

```

---

### Category 5: AI Literacy

#### Item AI-EASY-001

```json
{
  "itemHeader": {
    "questionId": "SKM-AI-EASY-001",
    "category": "AI Literacy",
    "competencyCode": "AI-01",
    "competencyName": "Prompt Structuring",
    "difficulty": "Easy",
    "questionType": "Best Decision",
    "estimatedTimeSeconds": 45
  },
  "pedagogicalAlignment": {
    "learningObjective": "Structure contextual AI prompts incorporating role framing, clear constraints, and precise task specifications.",
    "roadmapSkillMapping": "Module 13: Prompt Engineering & Intent Architecture",
    "commonMistakeDetected": "Sending vague 2-word prompts and expecting detailed, structured outputs.",
    "tags": ["prompting", "ai-literacy", "llm"]
  },
  "content": {
    "question": "A student wants a Large Language Model (AI) to generate a summary of the Silk Road history for an 8th-grade history presentation. Which prompt will generate the most accurate and well-structured output?",
    "options": [
      { "id": "A", "text": "Tell me about Silk Road history." },
      { "id": "B", "text": "Write 500 pages about Central Asian trade." },
      { "id": "C", "text": "\"Act as a history educator. Provide a 3-paragraph summary of the Silk Road's trade impact on medieval Central Asia. Use bullet points for key commodities traded, and write at an 8th-grade comprehension level. Do not include unverified legends.\"" },
      { "id": "D", "text": "Give me a summary of everything that ever happened in Samarkand and Bukhara." }
    ],
    "correctAnswer": "C",
    "explanation": "Option C specifies persona ('history educator'), scope ('3-paragraph summary on trade impact'), target audience level ('8th-grade'), structural formatting ('bullet points for commodities'), and negative constraints ('no unverified legends').",
    "distractorAnalysis": {
      "A": "Extremely broad; produces generic summaries without tailored audience or structural constraints.",
      "B": "Unrealistic token output request causing truncated or repetitive AI generation.",
      "C": "Correct. Exemplifies structured context framing, constraints, and target output rules.",
      "D": "Overly broad topic bounds exceeding model context relevance focus."
    }
  }
}

```

#### Item AI-MED-001

```json
{
  "itemHeader": {
    "questionId": "SKM-AI-MED-001",
    "category": "AI Literacy",
    "competencyCode": "AI-02",
    "competencyName": "Verification & Hallucination",
    "difficulty": "Medium",
    "questionType": "Real-life Scenario",
    "estimatedTimeSeconds": 75
  },
  "pedagogicalAlignment": {
    "learningObjective": "Detect and audit synthetic hallucination in Generative AI text outputs.",
    "roadmapSkillMapping": "Module 14: AI Verification & Hallucination Auditing",
    "commonMistakeDetected": "Assuming well-formatted academic citations produced by AI are real without independent primary source checks.",
    "tags": ["hallucination", "verification", "ai-ethics"]
  },
  "content": {
    "question": "A student uses an AI chatbot to research a chemistry paper. The AI provides a confident paragraph explaining a chemical reaction, citing: *\"Dr. A. Karimov, Journal of Central Asian Chemistry, 2019, Vol 14, pp. 45-50.\"*\n\nThe student searches academic databases (Google Scholar, JSTOR) but cannot find any record of this journal or paper. What phenomenon has occurred?",
    "options": [
      { "id": "A", "text": "Database censorship hiding legitimate academic papers." },
      { "id": "B", "text": "AI Hallucination, where probabilistic language models generate syntactically plausible but completely fabricated facts and references." },
      { "id": "C", "text": "The student typed the search query with incorrect font settings." },
      { "id": "D", "text": "The AI accessed secret unpublished internal laboratory documents." }
    ],
    "correctAnswer": "B",
    "explanation": "Generative LLMs operate probabilistically by predicting the next most likely token. They do not maintain a direct database of verified truth. When asked for citations, they often construct plausible-sounding names, volume numbers, and titles that do not exist in reality—a known issue called hallucination.",
    "distractorAnalysis": {
      "A": "Conspiracy fallback; ignores known generative model output limitations.",
      "B": "Correct. Identifies LLM probabilistic token generation behavior resulting in synthetic citations.",
      "C": "Font styles do not alter database query index lookup capabilities.",
      "D": "Misunderstands AI model architecture by assuming models possess covert web-scraping access to private databases."
    }
  }
}

```

#### Item AI-HARD-001

```json
{
  "itemHeader": {
    "questionId": "SKM-AI-HARD-001",
    "category": "AI Literacy",
    "competencyCode": "AI-03",
    "competencyName": "Algorithmic Bias & Ethics",
    "difficulty": "Hard",
    "questionType": "Matching",
    "estimatedTimeSeconds": 90
  },
  "pedagogicalAlignment": {
    "learningObjective": "Identify structural sources of bias in machine learning datasets and models.",
    "roadmapSkillMapping": "Module 15: AI Governance, Ethics & Dataset Bias Auditing",
    "commonMistakeDetected": "Believing algorithms are inherently neutral because math contains no human emotions.",
    "tags": ["bias", "machine-learning", "ethics", "data-sets"]
  },
  "content": {
    "question": "A team trains an AI resume screening model to automatically filter candidates for software engineering jobs. After deployment, auditors discover the AI consistently ranks male applicants higher than equally qualified female applicants. Match the root cause component to its technical description:\n\nComponents:\n1. Historical Training Data Skew\n2. Proxy Variables\n3. Feedback Loop Amplification\n\nDescriptions:\n[X] The dataset used to train the model consisted of 90% past male engineering hires over 15 years.\n[Y] The AI learned to penalize candidates who participated in 'Women in Technology' clubs, using club membership as an indirect stand-in for gender.\n[Z] Automated filtering rejected female resumes, resulting in fewer women hired, which was then fed back into next year's training data as confirmation of success.",
    "options": [
      { "id": "A", "text": "1 -> [X], 2 -> [Y], 3 -> [Z]" },
      { "id": "B", "text": "1 -> [Y], 2 -> [X], 3 -> [Z]" },
      { "id": "C", "text": "1 -> [Z], 2 -> [Y], 3 -> [X]" },
      { "id": "D", "text": "1 -> [X], 2 -> [Z], 3 -> [Y]" }
    ],
    "correctAnswer": "A",
    "explanation": "- **Historical Data Skew [X]:** Training data reflects past human hiring imbalance.\n- **Proxy Variables [Y]:** Attributes strongly correlated with protected categories act as secret stand-ins.\n- **Feedback Loops [Z]:** Biased AI decisions create new output data that reinforces initial biases in future training passes.",
    "distractorAnalysis": {
      "A": "Correct mapping across all three dataset bias classification vectors.",
      "B": "Swaps Proxy Variables with Historical Skew definitions.",
      "C": "Reverses Feedback Loops with Historical Skew definitions.",
      "D": "Swaps Proxy Variables with Feedback Loop definitions."
    }
  }
}

```

---

### Category 6: Problem Solving

#### Item PS-EASY-001

```json
{
  "itemHeader": {
    "questionId": "SKM-PS-EASY-001",
    "category": "Problem Solving",
    "competencyCode": "PS-02",
    "competencyName": "Process Troubleshooting",
    "difficulty": "Easy",
    "questionType": "Real-life Scenario",
    "estimatedTimeSeconds": 45
  },
  "pedagogicalAlignment": {
    "learningObjective": "Apply scientific variable isolation to troubleshoot tech hardware issues.",
    "roadmapSkillMapping": "Module 16: Systemic Isolation & Root-Cause Troubleshooting",
    "commonMistakeDetected": "Changing multiple setup components at once, preventing identification of the single faulty element.",
    "tags": ["troubleshooting", "variable-isolation", "hardware"]
  },
  "content": {
    "question": "A student plugs a computer monitor, computer tower, and desk lamp into a power strip, but none of the devices turn on when powered. What is the most logical first troubleshooting step to isolate the issue?",
    "options": [
      { "id": "A", "text": "Buy a new computer tower motherboard." },
      { "id": "B", "text": "Replace all HDMI cables connected to the monitor." },
      { "id": "C", "text": "Check if the power strip itself is plugged into a working wall outlet and turned on." },
      { "id": "D", "text": "Reinstall the operating system on the computer." }
    ],
    "correctAnswer": "C",
    "explanation": "Because multiple independent devices fail simultaneously, the common failure point is the shared power source (the power strip or wall outlet). Testing the power strip isolates the root cause immediately.",
    "distractorAnalysis": {
      "A": "Extreme escalation that addresses a single endpoint device without testing shared power infrastructure.",
      "B": "HDMI cables deliver video signals, not electrical power for lamps and monitors.",
      "C": "Correct. Tests the shared upstream dependency common to all failing components.",
      "D": "Software reinstallation cannot resolve hardware power connectivity failures."
    }
  }
}

```

#### Item PS-MED-001

```json
{
  "itemHeader": {
    "questionId": "SKM-PS-MED-001",
    "category": "Problem Solving",
    "competencyCode": "PS-01",
    "competencyName": "Constraint Satisfaction",
    "difficulty": "Medium",
    "questionType": "Best Decision",
    "estimatedTimeSeconds": 75
  },
  "pedagogicalAlignment": {
    "learningObjective": "Optimize multi-variable resource allocation under strict time and memory performance constraints.",
    "roadmapSkillMapping": "Module 17: Multi-Constraint Resource Optimization",
    "commonMistakeDetected": "Selecting solutions that optimize one parameter while violating explicit hard thresholds of another.",
    "tags": ["optimization", "constraints", "resource-allocation"]
  },
  "content": {
    "question": "A student team is building a mobile video streaming application for rural areas with slow internet connections. They must choose a video compression format. The requirements are:\n- File size MUST be under 50 MB.\n- Processing time to compress MUST be under 10 seconds.\n- Video clarity index MUST be at least 7/10.\n\nEvaluate the four candidate codecs below:\n\n- Codec 1: Size = 40 MB | Compression Time = 8 sec | Clarity = 8/10\n- Codec 2: Size = 20 MB | Compression Time = 15 sec | Clarity = 9/10\n- Codec 3: Size = 48 MB | Compression Time = 5 sec | Clarity = 6/10\n- Codec 4: Size = 60 MB | Compression Time = 3 sec | Clarity = 9/10\n\nWhich codec is the ONLY option that satisfies ALL system constraints?",
    "options": [
      { "id": "A", "text": "Codec 1" },
      { "id": "B", "text": "Codec 2" },
      { "id": "C", "text": "Codec 3" },
      { "id": "D", "text": "Codec 4" }
    ],
    "correctAnswer": "A",
    "explanation": "Evaluating constraints:\n- **Codec 1:** Size 40MB (<50), Time 8s (<10), Clarity 8/10 (>=7) -> **Passes ALL**\n- **Codec 2:** Size 20MB (<50), Time 15s (>10 FAIL), Clarity 9/10\n- **Codec 3:** Size 48MB (<50), Time 5s (<10), Clarity 6/10 (<7 FAIL)\n- **Codec 4:** Size 60MB (>50 FAIL), Time 3s (<10), Clarity 9/10",
    "distractorAnalysis": {
      "A": "Correct. Codec 1 satisfies all three boundary conditions simultaneously.",
      "B": "Violates maximum compression time limit (15s > 10s constraint).",
      "C": "Violates minimum video clarity score limit (6/10 < 7/10 constraint).",
      "D": "Violates maximum file size limit (60MB > 50MB constraint)."
    }
  }
}

```

#### Item PS-HARD-001

```json
{
  "itemHeader": {
    "questionId": "SKM-PS-HARD-001",
    "category": "Problem Solving",
    "competencyCode": "PS-04",
    "competencyName": "Decision Tree Optimization",
    "difficulty": "Hard",
    "questionType": "Ranking",
    "estimatedTimeSeconds": 100
  },
  "pedagogicalAlignment": {
    "learningObjective": "Calculate and rank critical network routing paths to optimize delivery latency across dynamic node graphs.",
    "roadmapSkillMapping": "Module 18: Critical Path Analysis & Graph Optimization",
    "commonMistakeDetected": "Selecting paths with fewer hops without calculating total cumulative node latency weights.",
    "tags": ["graph-theory", "routing", "latency", "ranking"]
  },
  "content": {
    "question": "A digital server network routes data packets from Node S (Server in Tashkent) to Node D (Destination in Nukus) through intermediate data relays (A, B, C).\n\nNetwork Connection Latencies (in milliseconds):\n- Direct S -> A = 15ms\n- Direct S -> B = 10ms\n- Direct A -> C = 5ms\n- Direct B -> C = 20ms\n- Direct A -> D = 25ms\n- Direct C -> D = 10ms\n\nRank the following 3 complete routing paths from FASTEST (Lowest total latency) to SLOWEST (Highest total latency):\n\nPath 1: S -> A -> D\nPath 2: S -> A -> C -> D\nPath 3: S -> B -> C -> D",
    "options": [
      { "id": "A", "text": "Path 2 (30ms) -> Path 1 (40ms) -> Path 3 (40ms)" },
      { "id": "B", "text": "Path 1 (40ms) -> Path 2 (30ms) -> Path 3 (40ms)" },
      { "id": "C", "text": "Path 3 (40ms) -> Path 1 (40ms) -> Path 2 (30ms)" },
      { "id": "D", "text": "Path 2 (30ms) -> Path 3 (40ms) -> Path 1 (40ms)" }
    ],
    "correctAnswer": "A",
    "explanation": "Calculating cumulative latency for each path:\n- **Path 1 ($S \to A \to D$):** $15 + 25 = 40\text{ ms}$\n- **Path 2 ($S \to A \to C \to D$):** $15 + 5 + 10 = 30\text{ ms}$ (Fastest! Adding node C creates a faster shortcut!)\n- **Path 3 ($S \to B \to C \to D$):** $10 + 20 + 10 = 40\text{ ms}$\n\nRanking fastest to slowest: Path 2 (30ms) is 1st. Path 1 and Path 3 tie for 2nd/3rd at 40ms.",
    "distractorAnalysis": {
      "A": "Correct. Demonstrates that more node hops can produce lower cumulative latency.",
      "B": "Mistakenly assumes fewer node hops automatically mean faster latency.",
      "C": "Reverses fastest and slowest order.",
      "D": "Misidentifies Path 3 as distinct in speed from Path 1."
    }
  }
}

```

---

## Step 10: Quality Review & Psychometric Audit

```
┌────────────────────────────────────────────────────────────────────────┐
│                        QUALITY REVIEW AUDIT                            │
├─────────────────────────┬──────────────────────────────────────────────┤
│ METRIC                  │ AUDIT VERIFICATION STATUS                    │
├─────────────────────────┼──────────────────────────────────────────────┤
│ Zero Trivia Rule        │ PASS: 0 acronym/date questions               │
│ Code Reading Quality    │ PASS: Pseudocode tests logic, not syntax     │
│ Distractor Alignment    │ PASS: Every option maps to misconceptions    │
│ Regional Context        │ PASS: Includes Uzbek services (my.gov.uz)    │
│ IRT Alignment           │ PASS: Multipliers match Bloom's taxonomy     │
└─────────────────────────┴──────────────────────────────────────────────┘

```

### 1. Zero Syntax/Trivia Verification Audit

* **Audit Check:** Search question texts for raw memory queries (e.g., *"What year was..."*, *"What keyword does..."*, *"What does HTML stand for..."*).
* **Result:** **100% Pass.** Every single item forces procedural tracing, scenario analysis, constraint evaluation, or pattern extraction.

### 2. Distractor Quality & Misconception Alignment

* **Audit Check:** Ensure distractors are not arbitrary wrong numbers, but represent distinct diagnostic errors.
* **Example Check (`SKM-PF-EASY-001`):** Distractor B represents the failure to understand point-in-time value copying vs. mathematical equation binding. If a student chooses B, the system flags `Roadmap Skill: Variable Reassignment & Scope`.

### 3. Cultural & Regional Context Validation

* **Audit Check:** Questions incorporate relatable local digital contexts (e.g., *my.gov.uz*, *Uzbekistan open data portal*, regional eco-projects, Tashkent/Nukus network nodes) ensuring high engagement for Uzbek high schoolers in Grades 8–11.

### 4. Construct Validity & Difficulty Balance

* **Easy Items:** Isolate a single cognitive operation with clear context.
* **Medium Items:** Introduce multi-step state tracking or two competing constraints.
* **Hard Items:** Require evaluating systems-level edge cases, reverse tracing, or non-obvious optimization trade-offs (e.g., node graphs where adding hops reduces total latency).

---

## Summary of Assessment System Specifications

1. **Target Population:** Grades 8–11 Students in Uzbekistan.
2. **Framework Alignment:** PISA Computational Thinking, Bebras International Contest, DigComp 2.2.
3. **Assessment Modality:** Adaptive digital diagnostic engine backed by IRT-derivative scoring.
4. **Primary Diagnostic Output:** 30-Day Automated Skill Map targeting specific competency gaps.
5. **Item Bank Architecture:** Fully structured metadata schemas designed for automated scoring engines and diagnostic tracking.