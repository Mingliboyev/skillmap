import { z } from "zod";
import { assessmentCategories, competencyDefinitions, difficulties, isCompetencyForCategory, questionTypes } from "@/constants/methodology";

const localized = z.object({ en: z.string().min(1), uz: z.string().min(1) });
const competencyCodes = Object.keys(competencyDefinitions) as [keyof typeof competencyDefinitions, ...(keyof typeof competencyDefinitions)[]];
const adaptiveMetadata=z.object({domain:z.enum(["digital-information-literacy","computational-thinking-algorithms","programming-fundamentals","systems-networks-cybersecurity","data-databases","ai-literacy"]),subCompetency:z.string().min(1).nullable(),assessmentRole:z.enum(["core","adaptive","isolation"]),cognitiveLevel:z.enum(["understand","apply","evaluate_create"]),recommendedGradeBand:z.enum(["grade_8_9","grade_10_11","advanced_adaptive"]),parentCoreItemId:z.string().min(1).nullable(),targetMisconception:z.string().min(1).nullable(),distractorMappings:z.record(z.string(),z.object({misconceptionId:z.string().min(1),description:localized.optional()})),prerequisites:z.array(z.string().min(1)),goalWeights:z.record(z.string(),z.number().nonnegative()),source:z.string().min(1).nullable(),sourceCitation:z.string().min(1).nullable(),visualRequired:z.boolean()});

export const assessmentItemSchema = z.object({
  id: z.string().regex(/^[A-Z][A-Z0-9]*(?:-[A-Z0-9]+)+$/), version: z.number().int().positive(),
  status: z.enum(["draft", "active", "archived"]), reviewStatus: z.enum(["approved", "needs_review", "do_not_publish"]).default("needs_review"), reviewNotes: z.array(z.string()).default([]),
  category: z.enum(assessmentCategories), competencyCode: z.enum(competencyCodes), competencyName: z.string().min(2), difficulty: z.enum(difficulties), type: z.enum(questionTypes),
  estimatedTimeSeconds: z.number().int().min(15).max(600), learningObjective: localized, roadmapSkillMapping: z.string().min(3),
  misconceptionId: z.string().min(3), misconceptionDescription: localized, tags: z.array(z.string().min(1)).min(1), prompt: localized,
  options: z.array(z.object({ id: z.string().min(1), label: localized })).min(2),
  correctAnswer: z.union([z.string(), z.array(z.string()).min(1), z.object({ order: z.array(z.string()).min(2) }), z.object({ matches: z.record(z.string(), z.string()) })]),
  explanation: localized, distractorAnalysis: z.record(z.string(), localized).optional(), adaptiveMetadata:adaptiveMetadata.optional(), code: z.string().optional(), publishable: z.boolean(),
}).superRefine((item, ctx) => {
  if (!isCompetencyForCategory(item.competencyCode, item.category)) ctx.addIssue({ code: "custom", message: "Competency does not belong to category", path: ["competencyCode"] });
  if(item.adaptiveMetadata?.assessmentRole==="isolation"&&!item.adaptiveMetadata.parentCoreItemId)ctx.addIssue({code:"custom",message:"Isolation items require a parent core item",path:["adaptiveMetadata","parentCoreItemId"]});
  if(item.adaptiveMetadata?.parentCoreItemId===item.id)ctx.addIssue({code:"custom",message:"An item cannot branch to itself",path:["adaptiveMetadata","parentCoreItemId"]});
  const ids = new Set(item.options.map((option) => option.id));
  const answers = typeof item.correctAnswer === "string" ? [item.correctAnswer] : Array.isArray(item.correctAnswer) ? item.correctAnswer : "order" in item.correctAnswer ? item.correctAnswer.order : Object.values(item.correctAnswer.matches);
  if (answers.some((answer) => !ids.has(answer)) && !(typeof item.correctAnswer === "object" && !Array.isArray(item.correctAnswer) && "matches" in item.correctAnswer)) ctx.addIssue({ code: "custom", message: "Correct answer references an unknown option", path: ["correctAnswer"] });
});
