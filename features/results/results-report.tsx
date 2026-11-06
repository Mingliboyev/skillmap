"use client";

import Link from "next/link";
import { Award, CalendarDays, Printer, Target } from "lucide-react";
import type { Locale } from "@/types/domain";
import type { V2EvidenceSummary } from "@/lib/assessment/v2-results";
import type { V2Roadmap } from "@/lib/ai/v2-roadmap";
import { Badge } from "@/components/ui/badge";
import { Button, buttonClass } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { studentTopicLabel } from "@/lib/student-topic-labels";

const domains: Record<string, string> = {
  "Digital & Information Literacy": "Raqamli va axborot savodxonligi",
  "Computational Thinking & Algorithms": "Hisoblash tafakkuri va algoritmlar",
  "Programming Fundamentals": "Dasturlash asoslari",
  "Systems, Networks & Cybersecurity": "Tizimlar, tarmoqlar va kiberxavfsizlik",
  "Data & Databases": "Ma’lumotlar va ma’lumotlar bazalari",
  "AI Literacy": "Sun’iy intellekt savodxonligi",
};

function local(value: string, uz: boolean) { return studentTopicLabel(value, uz ? "uz" : "en"); }
function browserResult() {
  if (typeof window === "undefined") return null;
  try { return JSON.parse(sessionStorage.getItem("skillmap-v2-result") || "null") as { result: V2EvidenceSummary; roadmap: V2Roadmap } | null; } catch { return null; }
}

export function ResultsReport({ locale, initial }: { locale: Locale; initial?: { result: V2EvidenceSummary; roadmap: V2Roadmap } | null }) {
  const uz = locale === "uz";
  const payload = initial ?? browserResult();
  if (!payload) return <div className="container-shell py-16 text-center"><h1 className="display text-3xl">{uz ? "Natija hali tayyor emas" : "Your result is not ready yet"}</h1><p className="mt-3 text-secondary-text">{uz ? "Hisobotni ko‘rish uchun baholashni tugating." : "Complete the assessment to view your report."}</p><Link className={`${buttonClass("primary")} mt-6`} href={`/${locale}`}>{uz ? "Bosh sahifaga qaytish" : "Return home"}</Link></div>;
  const { result, roadmap } = payload;
  const label = (kind: string) => kind === "demonstrated" ? (uz ? "Namoyish etildi" : "Demonstrated") : (uz ? "Mashq tavsiya etiladi" : "Practice recommended");

  return <div className="container-shell py-10 lg:py-16"><div className="mx-auto max-w-6xl">
    <header className="flex flex-wrap items-end justify-between gap-5"><div><Badge>{uz ? "Sizning natijangiz" : "Your result"}</Badge><h1 className="display mt-4 text-4xl">{uz ? "Nimalarni bilasiz, keyin nima qilasiz" : "What you know and what to do next"}</h1></div><div className="no-print flex flex-wrap gap-2"><Button onClick={() => print()}><Printer size={17}/>{uz ? "Chop etish" : "Print"}</Button><Link className={buttonClass("primary")} href={`/${locale}/roadmap#twelve-week-plan`}><CalendarDays size={17}/>{uz ? "12 haftalik rejamni boshlash" : "Start my 12-week plan"}</Link></div></header>

    <section className="mt-8 grid gap-5 lg:grid-cols-[.7fr_1.3fr]"><Card className="bg-teal-900 text-white"><p>{uz ? "Umumiy natija" : "Overall result"}</p><p className="mt-2 font-serif text-7xl font-semibold">{result.overallScore}<span className="text-2xl">/100</span></p><h2 className="mt-5 text-sm font-bold uppercase tracking-wider text-teal-200">{uz ? "AI xulosasi" : "AI summary"}</h2><p className="mt-2 leading-6 text-teal-50">{roadmap.summary}</p><p className="mt-5 text-sm text-teal-100">{roadmap.confidenceNote}</p></Card><Card><h2 className="text-xl font-bold">{uz ? "6 yo‘nalish bo‘yicha" : "Six domain scores"}</h2><div className="mt-4 space-y-4">{result.domainScores.map((domain) => <div key={domain.domain}><div className="flex justify-between gap-3 text-sm"><span>{uz ? domains[domain.domain] ?? domain.domain : domain.domain}</span><strong>{domain.correct}/{domain.total} · {domain.score}%</strong></div><Progress value={domain.score}/></div>)}</div></Card></section>

    <section className="mt-5 grid gap-5 md:grid-cols-2"><Card><Award className="text-teal-700"/><h2 className="mt-3 text-xl font-bold">{uz ? "Top 3 kuchli tomon" : "Top 3 strengths"}</h2>{roadmap.strengths.length ? <ul className="mt-4 space-y-3">{roadmap.strengths.slice(0, 3).map((strength) => <li className="rounded-lg bg-teal-50 p-3" key={strength.competency}><strong>{local(strength.competency, uz)}</strong><p className="mt-1 text-sm text-secondary-text">{strength.evidence}</p></li>)}</ul> : <p className="mt-3 text-secondary-text">{uz ? "Bu baholashda alohida kuchli signal yetarli bo‘lmadi; reja asoslardan boshlanadi." : "No individual strength signal was strong enough; the plan starts with foundations."}</p>}</Card><Card><Target className="text-amber-700"/><h2 className="mt-3 text-xl font-bold">{uz ? "Top 3 ustuvor yo‘nalish" : "Top 3 priorities"}</h2>{roadmap.priorities.length ? <ul className="mt-4 space-y-3">{roadmap.priorities.slice(0, 3).map((priority) => <li className="rounded-lg bg-amber-50 p-3" key={priority.competency}><strong>{local(priority.competency, uz)}</strong><p className="mt-1 text-sm text-secondary-text">{priority.reason}</p></li>)}</ul> : <p className="mt-3 text-secondary-text">{uz ? "Ustuvor asosiy bo‘shliq kuzatilmadi." : "No priority foundational gap was observed."}</p>}</Card></section>

    <Card className="mt-8 border-teal-300 bg-teal-50"><div className="flex flex-wrap items-center justify-between gap-5"><div><Badge>{uz ? "3 oylik ekotizim" : "3-month learning system"}</Badge><h2 className="mt-3 text-2xl font-bold">{uz ? "12 hafta · 72 aniq vazifa · saqlanadigan progress" : "12 weeks · 72 concrete tasks · saved progress"}</h2><p className="mt-2 max-w-3xl leading-7 text-secondary-text">{uz ? "Har bir vazifada aniq ko‘rsatma, tekshirilgan havola, vaqt va tayyor mezoni bor. AI murabbiy natijalaringiz asosida haftalik urg‘uni moslashtiradi." : "Every task has clear instructions, a verified link, a time estimate, and a done criterion. The AI coach adapts weekly emphasis to your results."}</p></div><div className="flex flex-wrap gap-3"><Link className={buttonClass("primary")} href={`/${locale}/roadmap#twelve-week-plan`}>{uz ? "12 haftalik rejani boshlash" : "Start the 12-week plan"}</Link><Link className={buttonClass("secondary")} href={`/${locale}/roadmap#long-term-roadmap`}>{uz ? "Uzoq muddatli CS yo‘lini ko‘rish" : "View long-term CS roadmap"}</Link></div></div></Card>

    <details className="mt-5 rounded-2xl border border-ui-border bg-surface p-5"><summary className="cursor-pointer font-bold text-teal-900">{uz ? "Batafsil natijalar" : "Detailed results"}</summary><p className="mt-3 text-sm text-secondary-text">{uz ? "Bu bo‘lim har bir savolda ko‘ringan ko‘nikmani batafsil ko‘rsatadi." : "This section shows the skill observed in each question."}</p><div className="mt-4 grid gap-3 md:grid-cols-2">{result.diagnostics.map((diagnostic) => <div className="rounded-xl border border-slate-200 p-4 text-sm" key={diagnostic.coreItemId}><strong>{local(diagnostic.competency, uz)}</strong><p className="mt-1">{local(diagnostic.subCompetency, uz)}</p><p className="mt-2 font-semibold text-teal-800">{label(diagnostic.classification)}</p></div>)}</div></details>
  </div></div>;
}
