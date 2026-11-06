import type { SkillCategory } from "@/types/domain";

export const APP_NAME = "SkillMap Uzbekistan";
export const locales = ["en", "uz"] as const;
export const categories: SkillCategory[] = ["digital-literacy", "computational-thinking", "programming", "cybersecurity", "ai-literacy", "problem-solving"];
export const categoryMeta: Record<SkillCategory, { color: string; short: string }> = {
  "digital-literacy": { color: "#12645a", short: "DL" },
  "computational-thinking": { color: "#2f6fcd", short: "CT" },
  programming: { color: "#7457c7", short: "PF" },
  cybersecurity: { color: "#c65b3c", short: "CS" },
  "ai-literacy": { color: "#ad7a13", short: "AI" },
  "problem-solving": { color: "#228456", short: "PS" },
};
