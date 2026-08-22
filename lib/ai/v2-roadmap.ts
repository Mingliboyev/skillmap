import "server-only";
import OpenAI from "openai";
import { zodTextFormat } from "openai/helpers/zod";
import { z } from "zod";
import type { V2EvidenceSummary } from "@/lib/assessment/v2-results";
import type { V2Domain } from "@/lib/assessment/v2-bank";
import { buildTwelveWeekPlan } from "@/lib/twelve-week-plan";

const shortWeek = z.object({
  week: z.number().int().min(1).max(4),
  focus: z.string().min(1),
  why: z.string().min(1),
  actions: z.array(z.string().min(1)).min(2).max(4),
  resourceIds: z.array(z.string()),
  practiceItemIds: z.array(z.string()),
  successCheck: z.string().min(1),
});

const guidance = z.object({
  week: z.number().int().min(1).max(12),
  focus: z.string().min(1),
  coachNote: z.string().min(1),
});

const aiPersonalizationSchema = z.object({
  summary: z.string().min(1),
  coaching: z.array(z.object({ week: z.number().int().min(1).max(12), coachNote: z.string().min(1) })).length(12),
});

export const roadmapSchema = z.object({
  summary: z.string().min(1),
  strengths: z.array(z.object({ competency: z.string(), evidence: z.string() })),
  priorities: z.array(z.object({ competency: z.string(), reason: z.string(), severity: z.enum(["high", "medium", "low"]) })),
  roadmap: z.array(shortWeek).length(4),
  threeMonthGuidance: z.array(guidance).length(12),
  questionsToWorkOn: z.array(z.object({ competency: z.string(), prompt: z.string() })),
  insufficientEvidence: z.array(z.string()),
  confidenceNote: z.string().min(1),
});

export type V2Roadmap = z.infer<typeof roadmapSchema>;

const friendlyDomains: Record<V2Domain, { en: string; uz: string }> = {
  "Digital & Information Literacy": { en: "finding and checking trustworthy information", uz: "ishonchli axborotni topish va tekshirish" },
  "Computational Thinking & Algorithms": { en: "breaking problems into logical steps", uz: "muammolarni mantiqiy qadamlarga ajratish" },
  "Programming Fundamentals": { en: "Python variables, conditions, loops, and functions", uz: "Python o‘zgaruvchilari, shartlar, sikllar va funksiyalar" },
  "Systems, Networks & Cybersecurity": { en: "internet and account safety", uz: "internet va hisob xavfsizligi" },
  "Data & Databases": { en: "tables, clean data, and SQL", uz: "jadvallar, toza ma’lumot va SQL" },
  "AI Literacy": { en: "using AI safely and checking its answers", uz: "AI’dan xavfsiz foydalanish va javoblarini tekshirish" },
};

const unique = <T,>(values: T[]) => [...new Set(values)];

export function deterministicRoadmap(evidence: V2EvidenceSummary): V2Roadmap {
  const uz = evidence.locale === "uz";
  const ranked = [...evidence.domainScores].sort((a, b) => a.score - b.score || a.domain.localeCompare(b.domain));
  const priorities = evidence.diagnostics.filter((item) => item.classification !== "demonstrated").slice(0, 4);
  const strengths = unique(evidence.diagnostics.filter((item) => item.classification === "demonstrated").map((item) => item.competency)).slice(0, 6);
  const twelveWeeks = buildTwelveWeekPlan(evidence);
  const shortRoadmap = ranked.slice(0, 4).map((result, index) => {
    const topic = friendlyDomains[result.domain][uz ? "uz" : "en"];
    return {
      week: index + 1,
      focus: topic,
      why: uz ? `${result.domain} natijasi ${result.score}%. Shu hafta sodda misollardan boshlab amaliy natijagacha borasiz.` : `${result.domain} scored ${result.score}%. This week moves from simple examples to a practical result.`,
      actions: uz ? [`${topic} bo‘yicha havoladagi darsni tugating.`, "Bitta kichik mashqni bajaring va yechim qadamlarini yozing.", "Natijani kamida uchta holatda tekshiring."] : [`Complete the linked lesson about ${topic}.`, "Finish one small exercise and record the solution steps.", "Verify the result with at least three cases."],
      resourceIds: [],
      practiceItemIds: [],
      successCheck: uz ? "Ishlaydigan natijani ko‘rsating va yechimingizni qaydlarsiz tushuntiring." : "Show a working result and explain your solution without notes.",
    };
  });

  return {
    summary: uz ? `30 savollik diagnostika natijangiz ${evidence.overallScore}%. 12 haftalik reja eng ko‘p yordam kerak bo‘lgan yo‘nalishlardan boshlanadi.` : `Your 30-question diagnostic result is ${evidence.overallScore}%. The 12-week plan starts with the areas where practice will help most.`,
    strengths: strengths.map((competency) => ({ competency, evidence: uz ? "30 savollik baholashda bu ko‘nikma bo‘yicha to‘g‘ri yechim ko‘rsatildi." : "A correct solution was demonstrated for this skill in the 30-question assessment." })),
    priorities: priorities.map((item) => ({ competency: item.competency, reason: uz ? `${friendlyDomains[item.domain].uz} bo‘yicha ko‘proq amaliy mashq foydali bo‘ladi.` : `More hands-on practice with ${friendlyDomains[item.domain].en} will be useful.`, severity: "high" as const })),
    roadmap: shortRoadmap,
    threeMonthGuidance: twelveWeeks.map((week) => ({ week: week.week, focus: uz ? week.focusUz : week.focusEn, coachNote: uz ? `Bu haftada ${week.tasks.length} ta aniq vazifa bor. Har kuni natijani saqlang; mukammallikdan ko‘ra izchillik muhim.` : `This week has ${week.tasks.length} concrete tasks. Save evidence each day; consistency matters more than perfection.` })),
    questionsToWorkOn: priorities.map((item) => ({ competency: item.competency, prompt: uz ? `${friendlyDomains[item.domain].uz} bo‘yicha yechimingizni qaysi test bilan tekshirasiz?` : `Which test will you use to verify your work on ${friendlyDomains[item.domain].en}?` })),
    insufficientEvidence: evidence.insufficientEvidence,
    confidenceNote: uz ? "Bu shaxsiy o‘quv yo‘nalishi, mutlaq hukm emas. Vazifalarni bajarganingiz sari progress yangilanadi." : "This is a personal learning direction, not an absolute judgment. Progress updates as you complete tasks.",
  };
}

export function validateGroundedRoadmap(value: unknown, evidence: V2EvidenceSummary) {
  const parsed = roadmapSchema.parse(value);
  const allowedCompetencies = new Set([...evidence.demonstratedStrengths, ...evidence.developmentAreas]);
  const guidanceWeeks = parsed.threeMonthGuidance.map((item) => item.week);
  if ([...parsed.strengths, ...parsed.priorities, ...parsed.questionsToWorkOn].some((item) => !allowedCompetencies.has(item.competency))) throw new Error("Roadmap contains an unmeasured competency");
  if (parsed.roadmap.some((week) => week.resourceIds.length || week.practiceItemIds.length)) throw new Error("AI may not invent resources or assessment items");
  if (new Set(guidanceWeeks).size !== 12 || guidanceWeeks.some((week) => week < 1 || week > 12)) throw new Error("Roadmap must cover each week exactly once");
  return parsed;
}

export function mergeAiPersonalization(value: unknown, fallback: V2Roadmap) {
  const parsed = aiPersonalizationSchema.parse(value);
  const weeks = parsed.coaching.map((item) => item.week);
  if (new Set(weeks).size !== 12) throw new Error("AI coaching must cover each week exactly once");
  return {
    ...fallback,
    summary: parsed.summary,
    threeMonthGuidance: fallback.threeMonthGuidance.map((item) => ({ ...item, coachNote: parsed.coaching.find((note) => note.week === item.week)!.coachNote })),
  } satisfies V2Roadmap;
}

export async function generateV2Roadmap(evidence: V2EvidenceSummary) {
  const fallback = deterministicRoadmap(evidence);
  const key = process.env.OPENAI_API_KEY;
  if (!key) return { roadmap: fallback, mode: "fallback" as const, provider: null, model: null };
  try {
    const model = process.env.OPENAI_MODEL || "gpt-5-mini";
    const client = new OpenAI({ apiKey: key, timeout: 20_000, maxRetries: 1 });
    const fixedPlan = buildTwelveWeekPlan(evidence).map((week) => ({ week: week.week, domain: week.domain, focus: evidence.locale === "uz" ? week.focusUz : week.focusEn, outcome: evidence.locale === "uz" ? week.outcomeUz : week.outcomeEn }));
    const response = await client.responses.parse({
      model,
      input: [
        { role: "system", content: `Write a short SkillMap result summary and one concise coach note for every week 1 through 12 in ${evidence.locale}. Use only the supplied measured evidence and fixed weekly focus. Write plain language for a high-school student. Do not invent skills, tasks, scores, resources, or links. Return every week exactly once.` },
        { role: "user", content: JSON.stringify({ evidence, fixedPlan }) },
      ],
      text: { format: zodTextFormat(aiPersonalizationSchema, "skillmap_roadmap_coaching") },
    });
    return { roadmap: mergeAiPersonalization(response.output_parsed, fallback), mode: "ai" as const, provider: "openai", model };
  } catch (error) {
    console.error("SkillMap roadmap fallback", { kind: error instanceof Error ? error.name : "unknown", message: error instanceof Error ? error.message : "Unknown AI error" });
    return { roadmap: fallback, mode: "fallback" as const, provider: null, model: null };
  }
}

export function sanitizedEvidence(evidence: V2EvidenceSummary) { return evidence; }
