import { notFound } from "next/navigation";
import { CsRoadmap } from "@/features/roadmap/cs-roadmap";
import { buildCsRoadmap, buildPersonalizedNodePath } from "@/lib/cs-roadmap";
import { isLocale } from "@/lib/i18n/dictionaries";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { V2_SUPPORTED_VERSIONS } from "@/lib/assessment/v2-bank";
import type { V2EvidenceSummary } from "@/lib/assessment/v2-results";
import { buildTwelveWeekPlan } from "@/lib/twelve-week-plan";

export const metadata = { title: "Computer Science Roadmap" };

export default async function RoadmapPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const supabase = await createSupabaseServerClient();
  let evidence: V2EvidenceSummary | null = null;
  let attemptId: string | null = null;
  let completed: string[] = [];

  if (supabase) {
    const { data: { user } } = await supabase.auth.getUser();
    if (user) {
      const { data } = await supabase.from("assessment_attempts")
        .select("id,result_summary,roadmaps(plan)")
        .eq("student_id", user.id)
        .in("assessment_version", [...V2_SUPPORTED_VERSIONS])
        .eq("status", "completed")
        .order("completed_at", { ascending: false })
        .limit(1)
        .maybeSingle();
      evidence = (data?.result_summary as V2EvidenceSummary | null) ?? null;
      attemptId = data?.id ?? null;
      if (attemptId) {
        const { data: rows } = await supabase.from("roadmap_task_progress").select("task_id").eq("attempt_id", attemptId);
        completed = (rows ?? []).map((row) => row.task_id);
      }
    }
  }

  const stages=buildCsRoadmap(evidence),weeks=evidence?buildTwelveWeekPlan(evidence):[];
  return <div id="long-term-roadmap" className="scroll-mt-24"><CsRoadmap locale={locale} stages={stages} personalized={Boolean(evidence)} recommendedNodeIds={evidence?buildPersonalizedNodePath(evidence,stages):[]} weeks={weeks} attemptId={attemptId} initialCompleted={completed}/></div>;
}
