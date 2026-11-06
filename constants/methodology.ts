import type { Locale } from "@/types/domain";

export const assessmentCategories = ["digital-literacy","computational-thinking","programming","cybersecurity","ai-literacy","problem-solving"] as const;
export type AssessmentCategory = typeof assessmentCategories[number];
export const difficulties = ["easy","medium","hard"] as const;
export type AssessmentDifficulty = typeof difficulties[number];
export const questionTypes = ["single-choice","select-multiple","real-life-scenario","code-reading","debugging","logic","best-decision","ranking","matching"] as const;
export type AssessmentQuestionType = typeof questionTypes[number];
export type LocalizedText = Record<Locale,string>;

export const categoryDefinitions = {
  "digital-literacy": { code:"DL", name:{en:"Digital Literacy",uz:"Raqamli savodxonlik"}, weight:.15, purpose:"Navigate, organize, verify, and curate digital assets." },
  "computational-thinking": { code:"CT", name:{en:"Computational Thinking",uz:"Hisoblash tafakkuri"}, weight:.20, purpose:"Formulate problems for information-processing solutions." },
  programming: { code:"PF", name:{en:"Programming Fundamentals",uz:"Dasturlash asoslari"}, weight:.25, purpose:"Read, interpret, trace, and debug procedural logic." },
  cybersecurity: { code:"CS", name:{en:"Cybersecurity Awareness",uz:"Kiberxavfsizlik"}, weight:.15, purpose:"Recognize threats and apply defensive privacy habits." },
  "ai-literacy": { code:"AI", name:{en:"AI Literacy",uz:"SI savodxonligi"}, weight:.15, purpose:"Critically interact with, evaluate, and govern AI systems." },
  "problem-solving": { code:"PS", name:{en:"Problem Solving",uz:"Muammo yechish"}, weight:.10, purpose:"Optimize decisions and troubleshoot multi-constraint systems." },
} as const satisfies Record<AssessmentCategory,{code:string;name:LocalizedText;weight:number;purpose:string}>;

export const competencyDefinitions = {
  "DL-01": {category:"digital-literacy",name:"Query Engineering",module:"Module 01: Advanced Search Techniques & Information Verification"},
  "DL-02": {category:"digital-literacy",name:"Verification & Source Evaluation",module:"Module 03: Information Verification & Digital Asset Integrity"},
  "DL-03": {category:"digital-literacy",name:"File & Data Architecture",module:"Digital Professional Track: File Architecture"},
  "DL-04": {category:"digital-literacy",name:"Cloud Collaboration",module:"Module 02: Cloud Architecture & Shared Workspaces"},
  "DL-05": {category:"digital-literacy",name:"Digital Environment Hygiene",module:"Digital Professional Track: Environment Hygiene"},
  "CT-01": {category:"computational-thinking",name:"Decomposition",module:"Module 04: Problem Decomposition & Flow Architecture"},
  "CT-02": {category:"computational-thinking",name:"Pattern Recognition",module:"Module 05: Pattern Recognition & Rule Abstraction"},
  "CT-03": {category:"computational-thinking",name:"Abstraction",module:"Core Logic Track: Abstraction"},
  "CT-04": {category:"computational-thinking",name:"Algorithmic Design",module:"Module 06: Algorithm Optimization & Complexity Analysis"},
  "CT-05": {category:"computational-thinking",name:"State Tracking",module:"Core Logic Track: State Tracking"},
  "PF-01": {category:"programming",name:"Variable & Data Scope",module:"Module 07: Variable State & Memory Assignment"},
  "PF-02": {category:"programming",name:"Conditional Logic",module:"Foundation Track: Conditional Logic"},
  "PF-03": {category:"programming",name:"Iteration & Loop Logic",module:"Module 08: Iteration Controls & Boundary Safety"},
  "PF-04": {category:"programming",name:"Modular Functions",module:"Foundation Track: Modular Functions"},
  "PF-05": {category:"programming",name:"Trace Execution",module:"Module 09: Complex State Machines & Nested Control Flow"},
  "PF-06": {category:"programming",name:"Debugging & Syntax Repair",module:"Intermediate Track: Systemic Debugging"},
  "CS-01": {category:"cybersecurity",name:"Phishing & Social Engineering",module:"Module 10: Social Engineering & Spear Phishing Defense"},
  "CS-02": {category:"cybersecurity",name:"Credential & Authentication",module:"Module 11: Authentication Architecture & Zero-Trust Hygiene"},
  "CS-03": {category:"cybersecurity",name:"Network & Endpoint Security",module:"Module 12: Network Encryption & Packet Safety"},
  "CS-04": {category:"cybersecurity",name:"Data Privacy & Permissions",module:"Digital Safety Track: Privacy & Permissions"},
  "CS-05": {category:"cybersecurity",name:"Incident Recovery & Hygiene",module:"Digital Safety Track: Recovery Hygiene"},
  "AI-01": {category:"ai-literacy",name:"Prompt Structuring",module:"Module 13: Prompt Engineering & Intent Architecture"},
  "AI-02": {category:"ai-literacy",name:"Verification & Hallucination",module:"Module 14: AI Verification & Hallucination Auditing"},
  "AI-03": {category:"ai-literacy",name:"Algorithmic Bias & Ethics",module:"Module 15: AI Governance, Ethics & Dataset Bias Auditing"},
  "AI-04": {category:"ai-literacy",name:"AI Model Mechanics",module:"AI Literacy Track: Model Mechanics"},
  "AI-05": {category:"ai-literacy",name:"Privacy & Governance in AI",module:"AI Literacy Track: Privacy & Governance"},
  "PS-01": {category:"problem-solving",name:"Constraint Satisfaction",module:"Module 17: Multi-Constraint Resource Optimization"},
  "PS-02": {category:"problem-solving",name:"Process Troubleshooting",module:"Module 16: Systemic Isolation & Root-Cause Troubleshooting"},
  "PS-03": {category:"problem-solving",name:"Resource Allocation",module:"Problem Solving Track: Resource Allocation"},
  "PS-04": {category:"problem-solving",name:"Decision Tree Optimization",module:"Module 18: Critical Path Analysis & Graph Optimization"},
} as const;
export type CompetencyCode = keyof typeof competencyDefinitions;

export const difficultyWeights:Record<AssessmentDifficulty,number>={easy:1,medium:1.5,hard:2};
export const scoringConfiguration={categoryWeights:Object.fromEntries(assessmentCategories.map(c=>[c,categoryDefinitions[c].weight])) as Record<AssessmentCategory,number>,difficultyWeights,rapidResponseThreshold:.15,misconceptionTriggerCount:3,confidence:{moderateCoverage:.65,strongCoverage:.9}} as const;
export const pilotBlueprint={questionsPerCategory:8,difficultyPerCategory:{easy:3,medium:3,hard:2},minimumCompetenciesPerCategory:3,totalQuestions:48} as const;
export const publishableQuestionTypes = new Set<AssessmentQuestionType>(["single-choice","select-multiple","real-life-scenario","code-reading","debugging","logic","best-decision"]);

export function isCompetencyForCategory(code:CompetencyCode,category:AssessmentCategory){return competencyDefinitions[code].category===category}
