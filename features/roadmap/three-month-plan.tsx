"use client";

import { useMemo, useState } from "react";
import { Check, ChevronDown, Clock3, ExternalLink, RotateCcw, Target } from "lucide-react";
import type { Locale } from "@/types/domain";
import type { LearningWeek } from "@/lib/twelve-week-plan";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/utils/cn";

export function ThreeMonthPlan({ locale, weeks, attemptId, initialCompleted, guidance = [] }: { locale: Locale; weeks: LearningWeek[]; attemptId: string; initialCompleted: string[]; guidance?: { week: number; focus: string; coachNote: string }[] }) {
  const uz = locale === "uz";
  const [completed, setCompleted] = useState(() => new Set(initialCompleted));
  const [saving, setSaving] = useState<string | null>(null);
  const total = useMemo(() => weeks.reduce((sum, week) => sum + week.tasks.length, 0), [weeks]);
  const percent = total ? Math.round(completed.size / total * 100) : 0;

  async function toggle(taskId: string) {
    if (saving) return;
    const wasCompleted = completed.has(taskId);
    const next = new Set(completed);
    if (wasCompleted) next.delete(taskId);
    else next.add(taskId);
    setCompleted(next);
    setSaving(taskId);
    try {
      const response = await fetch("/api/roadmap/progress", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ attemptId, taskId, completed: !wasCompleted }) });
      if (!response.ok) throw new Error();
    } catch {
      setCompleted(completed);
      alert(uz ? "Progress saqlanmadi. Internetni tekshirib, qayta urinib ko‘ring." : "Progress was not saved. Check your connection and try again.");
    } finally {
      setSaving(null);
    }
  }

  return <section className="container-shell py-10 lg:py-16" aria-labelledby="three-month-title">
    <div className="mx-auto max-w-4xl">
      <header className="rounded-3xl bg-slate-950 p-6 text-white sm:p-9">
        <div className="flex flex-wrap items-center justify-between gap-5"><div><p className="flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-teal-300"><Target size={17}/>{uz ? "Shaxsiy 3 oylik reja" : "Your 3-month plan"}</p><h2 id="three-month-title" className="display mt-3 text-3xl font-semibold sm:text-4xl">{uz ? "Har kuni nima qilish aniq" : "Know exactly what to do next"}</h2><p className="mt-3 max-w-2xl leading-7 text-slate-300">{uz ? "12 hafta: 5 kun o‘rganish va mashq, 1 kun haftalik tekshiruv, 1 kun dam yoki moslashuvchan vaqt. Belgilangan ishlar hisobingizda saqlanadi." : "12 weeks: 5 learning and practice days, 1 weekly checkpoint, and 1 rest or flexible day. Completed work is saved to your account."}</p></div><div className="grid size-28 shrink-0 place-items-center rounded-full border-8 border-teal-400 bg-slate-900 text-center"><span><strong className="block text-3xl">{percent}%</strong><small className="text-slate-300">{completed.size}/{total}</small></span></div></div>
        <div className="mt-6"><Progress value={percent} label={uz ? `${completed.size} ta vazifa bajarildi` : `${completed.size} tasks completed`}/></div>
      </header>

      <div className="mt-8 grid gap-5">
        {weeks.map((week) => {
          const weekDone = week.tasks.filter((task) => completed.has(task.id)).length;
          const coach = guidance.find((item) => item.week === week.week);
          return <details key={week.week} open={week.week === 1} className="group overflow-hidden rounded-2xl border border-ui-border bg-surface shadow-sm">
            <summary className="flex cursor-pointer list-none items-center gap-4 p-5 sm:p-6"><span className={cn("grid size-11 shrink-0 place-items-center rounded-xl font-bold", weekDone === week.tasks.length ? "bg-green-700 text-white" : "bg-teal-100 text-teal-900")}>{weekDone === week.tasks.length ? <Check size={21}/> : week.week}</span><span className="min-w-0 flex-1"><span className="block text-xs font-bold uppercase tracking-wider text-teal-700">{uz ? `${week.week}-hafta · ${weekDone}/${week.tasks.length} bajarildi · ${week.tasks.length - weekDone} qoldi` : `Week ${week.week} · ${weekDone}/${week.tasks.length} complete · ${week.tasks.length - weekDone} remaining`}</span><strong className="mt-1 block text-lg">{uz ? week.focusUz : week.focusEn}</strong><small className="mt-1 block text-secondary-text">{uz ? `Nega tanlandi: ${week.reasonUz}` : `Why this was selected: ${week.reasonEn}`}</small><small className="mt-1 block text-secondary-text">{uz ? `Hafta natijasi: ${week.outcomeUz}` : `Weekly outcome: ${week.outcomeEn}`}</small></span><ChevronDown className="shrink-0 transition group-open:rotate-180" size={20}/></summary>
            <div className="border-t border-ui-border bg-violet-50 px-5 py-3 text-sm leading-6 text-violet-950"><strong>{uz ? "AI murabbiy tavsiyasi:" : "AI coach note:"}</strong> {coach?.coachNote ?? (uz ? "Vazifalarni tartib bilan bajaring va har kuni natijani saqlang." : "Complete the tasks in order and save evidence every day.")}</div>
            <ol className="border-t border-ui-border bg-slate-50/60 p-4 sm:p-6">
              {week.tasks.map((task) => { const done = completed.has(task.id); return <li key={task.id} className={cn("mb-3 rounded-xl border bg-white p-4 last:mb-0", done ? "border-green-300" : "border-slate-200")}>
                <div className="flex items-start gap-3"><button type="button" disabled={Boolean(saving)} onClick={() => toggle(task.id)} aria-pressed={done} aria-label={done ? (uz ? `${task.titleUz} vazifasini bajarilmagan deb belgilash` : `Mark ${task.titleEn} incomplete`) : (uz ? `${task.titleUz} vazifasini bajarildi deb belgilash` : `Mark ${task.titleEn} complete`)} className={cn("mt-0.5 grid size-7 shrink-0 place-items-center rounded-lg border-2 focus:outline-none focus:ring-2 focus:ring-focus-ring", done ? "border-green-700 bg-green-700 text-white" : "border-slate-400 bg-white")}><Check size={16} className={done ? "opacity-100" : "opacity-0"}/></button><div className="min-w-0 flex-1"><div className="flex flex-wrap items-center justify-between gap-2"><h3 className={cn("font-bold", done && "text-secondary-text line-through")}>{uz ? task.titleUz : task.titleEn}</h3><span className="flex items-center gap-1 text-xs font-semibold text-secondary-text"><Clock3 size={14}/>{task.minutes} {uz ? "daqiqa" : "min"}</span></div><p className="mt-2 text-sm leading-6 text-secondary-text">{uz ? task.instructionsUz : task.instructionsEn}</p>{task.resourceUrl && <a href={task.resourceUrl} target="_blank" rel="noreferrer" className="mt-3 inline-flex items-center gap-2 text-sm font-bold text-teal-800 underline decoration-teal-300 underline-offset-4 hover:text-teal-950">{uz ? task.resourceTitleUz : task.resourceTitleEn}<ExternalLink size={14}/></a>}<div className="mt-3 rounded-lg bg-blue-50 px-3 py-2 text-xs leading-5 text-blue-950"><strong>{uz ? "Tayyor mezoni:" : "Done when:"}</strong> {uz ? task.successCheckUz : task.successCheckEn}</div></div></div>
              </li>; })}
            </ol>
          </details>;
        })}
      </div>
      <div className="mt-5 rounded-2xl border border-dashed border-teal-300 bg-teal-50 p-4 text-center text-sm text-teal-950"><strong>{uz ? "7-kun — dam yoki moslashuvchan kun." : "Day 7 — rest or flexible day."}</strong> {uz ? "Dam oling yoki haftada ulgurmagan bitta vazifani yakunlang; bu kun uchun checkbox talab qilinmaydi." : "Rest, or finish one task you missed during the week; no checkbox is required for this day."}</div>
      <p className="mt-6 flex items-center justify-center gap-2 text-center text-sm text-secondary-text"><RotateCcw size={15}/>{uz ? "Belgi qo‘yish yoki olib tashlash mumkin; foiz avtomatik yangilanadi." : "You can check or uncheck tasks; the percentage updates automatically."}</p>
    </div>
  </section>;
}
