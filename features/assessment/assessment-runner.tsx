"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, ArrowRight, Check, Clock3 } from "lucide-react";
import type { Locale } from "@/types/domain";
import type { PublicV2Item } from "@/lib/assessment/v2-bank";
import type { StoredProgress } from "@/lib/assessment/attempt-state";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/utils/cn";

function stored<T>(key: string, fallback: T) {
  if (typeof window === "undefined") return fallback;
  try { return JSON.parse(sessionStorage.getItem(key) || "") as T; } catch { return fallback; }
}

function looksLikeCode(item: PublicV2Item) {
  return item.questionType === "code_tracing" || /\b(IF|ELSE|ENDIF|FOR|NEXT)\b|←|:=|=>/.test(item.context);
}

function monotonicNow() { return performance.now(); }

export function AssessmentRunner({ locale, attemptId, initialProgress }: { locale: Locale; attemptId?: string; initialProgress?: StoredProgress }) {
  const uz = locale === "uz";
  const router = useRouter();
  const [items, setItems] = useState<PublicV2Item[]>([]);
  const [index, setIndex] = useState(() => Math.min(initialProgress?.index ?? stored("skillmap-v2-page", 0), 29));
  const [answers, setAnswers] = useState<Record<string, string>>(() => initialProgress?.answers ?? stored("skillmap-v2-answers", {}));
  const [version, setVersion] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const timings = useRef<Record<string, number>>(initialProgress?.timings ?? stored("skillmap-v2-timings", {}));
  const started = useRef(0);

  useEffect(() => {
    fetch(`/api/assessment/v2?locale=${locale}`).then((response) => response.json()).then((data) => {
      setItems(data.items.slice(0, 30));
      setVersion(data.assessmentVersion);
      sessionStorage.removeItem("skillmap-v2-isolation");
      sessionStorage.removeItem("skillmap-v2-stage");
      started.current = monotonicNow();
    });
  }, [locale]);

  useEffect(() => {
    if (!attemptId) return;
    const timer = setTimeout(() => {
      const participant = stored("skillmap-participant", null);
      void fetch("/api/attempts/state", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ action: "progress", attemptId, progress: { stage: "core", index, answers, timings: timings.current, isolationItemIds: [], participant } }) });
    }, 300);
    return () => clearTimeout(timer);
  }, [answers, attemptId, index]);

  const item = items[index];
  const answered = items.filter((candidate) => answers[candidate.itemId]).length;

  function choose(id: string, value: string) {
    const now = monotonicNow();
    timings.current[id] = (timings.current[id] ?? 0) + (started.current ? Math.max(0, now - started.current) : 0);
    started.current = now;
    const next = { ...answers, [id]: value };
    setAnswers(next);
    sessionStorage.setItem("skillmap-v2-answers", JSON.stringify(next));
  }

  function move(next: number) {
    setIndex(next);
    sessionStorage.setItem("skillmap-v2-page", JSON.stringify(next));
    started.current = monotonicNow();
    scrollTo(0, 0);
  }

  async function finish() {
    if (items.length !== 30 || items.some((candidate) => !answers[candidate.itemId])) {
      alert(uz ? "Yakunlashdan oldin barcha 30 savolga javob bering." : "Answer all 30 questions before finishing.");
      return;
    }
    setSubmitting(true);
    const participant = stored("skillmap-participant", null);
    const submissionKey = sessionStorage.getItem("skillmap-submission-key") || crypto.randomUUID();
    sessionStorage.setItem("skillmap-submission-key", submissionKey);
    sessionStorage.setItem("skillmap-v2-timings", JSON.stringify(timings.current));
    try {
      const response = await fetch("/api/attempts/submit", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ submissionKey, attemptId, participant, assessmentVersion: version, itemIds: items.map((candidate) => candidate.itemId), answers, timings: timings.current }) });
      if (!response.ok) throw new Error();
      const payload = await response.json();
      sessionStorage.setItem("skillmap-v2-result", JSON.stringify(payload));
      sessionStorage.setItem("skillmap-submitted", "true");
      router.push(`/${locale}/results`);
    } catch {
      alert(uz ? "Natijani yuborib bo‘lmadi. Jarayoningiz saqlanib qoldi." : "Submission failed. Your progress is preserved.");
      setSubmitting(false);
    }
  }

  if (!item) return <div className="container-shell py-16 text-center">{uz ? "Baholash yuklanmoqda…" : "Loading assessment…"}</div>;
  const final = index === items.length - 1;
  const selected = answers[item.itemId];

  return <div className="container-shell py-8 lg:py-14"><div className="mx-auto max-w-3xl">
    <div className="flex flex-wrap items-end justify-between gap-4"><div><Badge>{uz ? "Asosiy baholash" : "Core assessment"}</Badge><h1 className="display mt-4 text-3xl font-semibold">{uz ? `${index + 1}-savol, 30 tadan` : `Question ${index + 1} of 30`}</h1></div><div className="flex items-center gap-2 text-sm text-secondary-text"><Clock3 size={17}/>{uz ? "20–30 daqiqa" : "20–30 min"}</div></div>
    <div className="mt-7"><Progress value={Math.round((index + Number(Boolean(selected))) / 30 * 100)} label={`${answered} / 30`}/></div>
    <article className="mt-7 rounded-2xl border border-ui-border bg-surface p-5 sm:p-8"><p className="text-xs font-bold uppercase tracking-wider text-teal-800">{uz ? "Vaziyat" : "Context"}</p>{looksLikeCode(item) ? <pre className="mt-3 overflow-x-auto whitespace-pre-wrap rounded-xl bg-slate-950 p-4 font-mono text-sm leading-6 text-white"><code>{item.context.replaceAll("; ", ";\n")}</code></pre> : <p className="mt-3 whitespace-pre-wrap leading-7 text-secondary-text">{item.context}</p>}<div className="my-6 border-t border-slate-200"/><p className="text-xs font-bold uppercase tracking-wider text-teal-800">{uz ? "Savol" : "Question"}</p><h2 className="mt-3 text-xl font-bold leading-8 text-ink">{item.question}</h2><fieldset className="mt-7"><legend className="text-xs font-bold uppercase tracking-wider text-slate-600">{uz ? "Javob variantlari" : "Answer options"}</legend><div className="mt-3 grid gap-3">{item.options.map((option) => { const active = selected === option.id; return <label key={option.id} className={cn("flex min-h-14 cursor-pointer items-start gap-3 rounded-xl border p-4 text-sm leading-6 focus-within:ring-2 focus-within:ring-focus-ring", active ? "border-teal-800 bg-teal-50 font-semibold" : "border-strong-border bg-white hover:bg-slate-50")}><input className="sr-only" type="radio" name={item.itemId} checked={active} onChange={() => choose(item.itemId, option.id)}/><span aria-hidden className={cn("mt-0.5 grid size-5 shrink-0 place-items-center rounded-full border-2", active ? "border-teal-800 bg-teal-800 text-white" : "border-slate-500")}>{active && <Check size={12}/>}</span><span><strong className="mr-2">{option.id}.</strong>{option.label}</span></label>; })}</div></fieldset></article>
    <div className="mt-6 flex justify-between gap-3"><Button disabled={index === 0 || submitting} onClick={() => move(index - 1)}><ArrowLeft size={17}/>{uz ? "Orqaga" : "Back"}</Button>{!final ? <Button disabled={!selected || submitting} onClick={() => move(index + 1)}>{uz ? "Keyingi" : "Next"}<ArrowRight size={17}/></Button> : <Button disabled={submitting || !selected} onClick={finish}>{submitting ? (uz ? "Natija tayyorlanmoqda…" : "Preparing results…") : (uz ? "Natijani ko‘rish" : "View results")}<ArrowRight size={17}/></Button>}</div>
  </div></div>;
}
