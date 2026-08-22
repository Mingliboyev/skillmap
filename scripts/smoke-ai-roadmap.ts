import { readFileSync } from "node:fs";

for (const line of readFileSync(".env.local", "utf8").split(/\r?\n/)) {
  const match = line.match(/^([A-Za-z_][A-Za-z0-9_]*)=(.*)$/);
  if (match && !process.env[match[1]]) process.env[match[1]] = match[2].trim().replace(/^['"]|['"]$/g, "");
}

const { v2CoreItems } = await import("../lib/assessment/v2-bank");
const { scoreV2 } = await import("../lib/assessment/v2-results");
const { generateV2Roadmap } = await import("../lib/ai/v2-roadmap");
const answers = Object.fromEntries(v2CoreItems.map((item, index) => [item.itemId, index < 7 ? (item.correctOption === "A" ? "B" : "A") : item.correctOption]));
const evidence = scoreV2(v2CoreItems.map((item) => item.itemId), answers, "uz", "grade_10_11", "software-engineering");
const generated = await generateV2Roadmap(evidence);
console.log(`AI_ROADMAP_MODE=${generated.mode}`);
console.log(`AI_GUIDANCE_WEEKS=${generated.roadmap.threeMonthGuidance.length}`);
if (generated.mode !== "ai") process.exitCode = 1;
