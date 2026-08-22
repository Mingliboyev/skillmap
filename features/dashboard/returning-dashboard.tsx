"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowRight, BarChart3, MapPinned, PlayCircle, RefreshCcw, Route } from "lucide-react";
import type { Locale } from "@/types/domain";
import type { AssessmentAttemptState } from "@/lib/assessment/attempt-state";
import { Button, buttonClass } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const domainUz: Record<string, string> = {
  "Digital & Information Literacy": "Raqamli va axborot savodxonligi",
  "Computational Thinking & Algorithms": "Hisoblash tafakkuri va algoritmlar",
  "Programming Fundamentals": "Dasturlash asoslari",
  "Systems, Networks & Cybersecurity": "Tizimlar, tarmoqlar va kiberxavfsizlik",
  "Data & Databases": "Ma’lumotlar va ma’lumotlar bazalari",
  "AI Literacy": "Sun’iy intellekt savodxonligi",
};

export function ReturningDashboard({ locale, state }: { locale: Locale; state: AssessmentAttemptState }) {
  const uz = locale === "uz";
  const router = useRouter();
  const [confirming, setConfirming] = useState(false);
  const [pending, setPending] = useState(false);
  const scores = state.result?.domainScores ?? [];
  const strong = [...scores].sort((a, b) => b.score - a.score)[0];
  const priority = [...scores].sort((a, b) => a.score - b.score)[0];
  const name = (value?: string) => !value ? "—" : uz ? domainUz[value] ?? value : value;

  async function start(retake = false) {
    setPending(true);
    const response = await fetch("/api/attempts/state", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ action: "start", locale, retake }),
    });
    if (response.ok) router.push(`/${locale}/assessment`);
    else setPending(false);
  }

  return <section className="min-h-[70vh] border-b border-slate-200 bg-cream"><div className="container-shell py-14 lg:py-20"><div className="mx-auto max-w-5xl">
    <p className="text-sm font-bold uppercase tracking-widest text-teal-800">{uz ? "Xush kelibsiz" : "Welcome back"}</p>
    <h1 className="display mt-3 text-4xl font-semibold sm:text-5xl">{state.status === "completed" ? (uz ? "Keyingi qadamingiz tayyor" : "Your next step is ready") : state.status === "in_progress" ? (uz ? "Baholash davom etmoqda" : "Assessment in progress") : (uz ? "Ko‘nikmalaringizni xaritalang" : "Map your skills")}</h1>

    {state.status === "completed" && state.result ? <>
      <div className="mt-8 grid gap-4 md:grid-cols-4">
        <Card><p className="text-sm text-secondary-text">{uz ? "Eng so‘nggi natija" : "Latest result"}</p><strong className="mt-2 block text-3xl text-teal-800">{state.overallScore}/100</strong></Card>
        <Card><p className="text-sm text-secondary-text">{uz ? "Tugallangan sana" : "Completed"}</p><strong className="mt-2 block">{state.completedAt ? new Intl.DateTimeFormat(locale, { dateStyle: "medium" }).format(new Date(state.completedAt)) : "—"}</strong></Card>
        <Card><p className="text-sm text-secondary-text">{uz ? "Eng kuchli yo‘nalish" : "Strongest domain"}</p><strong className="mt-2 block">{name(strong?.domain)}</strong></Card>
        <Card><p className="text-sm text-secondary-text">{uz ? "Ustuvor yo‘nalish" : "Priority domain"}</p><strong className="mt-2 block">{name(priority?.domain)}</strong></Card>
      </div>
      <div className="mt-7 flex flex-wrap gap-3">
        <Link className={buttonClass("primary")} href={`/${locale}/roadmap#twelve-week-plan`}><PlayCircle size={17}/>{uz ? "12 haftalik rejani davom ettirish" : "Continue 12-week plan"}</Link>
        <Link className={buttonClass("secondary")} href={`/${locale}/results`}><BarChart3 size={17}/>{uz ? "Natijalarni ko‘rish" : "View results"}</Link>
        <Link className={buttonClass("secondary")} href={`/${locale}/roadmap#long-term-roadmap`}><Route size={17}/>{uz ? "Uzoq muddatli CS yo‘li" : "Long-term CS roadmap"}</Link>
        <Button onClick={() => setConfirming(true)}><RefreshCcw size={16}/>{uz ? "Qayta topshirish" : "Retake assessment"}</Button>
      </div>
      {confirming && <div role="dialog" aria-modal="true" className="mt-6 max-w-xl rounded-xl border border-amber-300 bg-amber-50 p-5">
        <h2 className="font-bold">{uz ? "Yangi baholashni boshlaysizmi?" : "Start a new assessment?"}</h2>
        <p className="mt-2 text-sm text-secondary-text">{uz ? "Oldingi natijalaringiz va rejada bajargan ishlaringiz saqlanib qoladi." : "Your previous result and roadmap progress will remain saved."}</p>
        <div className="mt-4 flex gap-3"><Button disabled={pending} onClick={() => start(true)}>{uz ? "Boshlash" : "Start new assessment"}</Button><Button disabled={pending} onClick={() => setConfirming(false)}>{uz ? "Bekor qilish" : "Cancel"}</Button></div>
      </div>}
    </> : state.status === "in_progress" ? <div className="mt-8"><Link className={buttonClass("primary")} href={`/${locale}/assessment`}><PlayCircle size={18}/>{uz ? "Baholashni davom ettirish" : "Continue assessment"}<ArrowRight size={17}/></Link></div> : <div className="mt-8 flex flex-wrap gap-3">
      <Button disabled={pending} onClick={() => start()}>{uz ? "Baholashni boshlash" : "Start assessment"}<ArrowRight size={17}/></Button>
      <Link className={buttonClass("secondary")} href={`/${locale}/roadmap`}><MapPinned size={17}/>{uz ? "Standart yo‘l xaritasi" : "Default roadmap"}</Link>
    </div>}
  </div></div></section>;
}
