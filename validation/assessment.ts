import { z } from "zod";
import { assessmentCategories, competencyDefinitions, difficulties, isCompetencyForCategory, questionTypes } from "@/constants/methodology";

const localized = z.object({ en: z.string().min(1), uz: z.string().min(1) });
const competencyCodes = Object.keys(competencyDefinitions) as [keyof typeof competencyDefinitions, ...(keyof typeof competencyDefinitions)[]];

export const assessmentItemSchema = z.object({
  id: z.string().regex(/^SKM-[A-Z]{2}-[A-Z]+-\d{3}$/), version: z.number().int().positive(),
  status: z.enum(["draft", "active", "archived"]), reviewStatus: z.enum(["approved", "needs_review", "do_not_publish"]).default("needs_review"), reviewNotes: z.array(z.string()).default([]),
  category: z.enum(assessmentCategories), competencyCode: z.enum(competencyCodes), competencyName: z.string().min(2), difficulty: z.enum(difficulties), type: z.enum(questionTypes),
  estimatedTimeSeconds: z.number().int().min(15).max(600), learningObjective: localized, roadmapSkillMapping: z.string().min(3),
  misconceptionId: z.string().min(3), misconceptionDescription: localized, tags: z.array(z.string().min(1)).min(1), prompt: localized,
  options: z.array(z.object({ id: z.string().min(1), label: localized })).min(2),
  correctAnswer: z.union([z.string(), z.array(z.string()).min(1), z.object({ order: z.array(z.string()).min(2) }), z.object({ matches: z.record(z.string(), z.string()) })]),
  explanation: localized, distractorAnalysis: z.record(z.string(), localized).optional(), code: z.string().optional(), publishable: z.boolean(),
}).superRefine((item, ctx) => {
  if (!isCompetencyForCategory(item.competencyCode, item.category)) ctx.addIssue({ code: "custom", message: "Competency does not belong to category", path: ["competencyCode"] });
  const ids = new Set(item.options.map((option) => option.id));
  const answers = typeof item.correctAnswer === "string" ? [item.correctAnswer] : Array.isArray(item.correctAnswer) ? item.correctAnswer : "order" in item.correctAnswer ? item.correctAnswer.order : Object.values(item.correctAnswer.matches);
  if (answers.some((answer) => !ids.has(answer)) && !(typeof item.correctAnswer === "object" && !Array.isArray(item.correctAnswer) && "matches" in item.correctAnswer)) ctx.addIssue({ code: "custom", message: "Correct answer references an unknown option", path: ["correctAnswer"] });
});
