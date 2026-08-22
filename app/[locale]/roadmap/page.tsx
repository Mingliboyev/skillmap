import { notFound } from "next/navigation";
import { CsRoadmap } from "@/features/roadmap/cs-roadmap";
import { buildCsRoadmap } from "@/lib/cs-roadmap";
import { isLocale } from "@/lib/i18n/dictionaries";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { V2_BANK_VERSION } from "@/lib/assessment/v2-bank";
import type { V2EvidenceSummary } from "@/lib/assessment/v2-results";
import { buildTwelveWeekPlan } from "@/lib/twelve-week-plan";
import { ThreeMonthPlan } from "@/features/roadmap/three-month-plan";
import type { V2Roadmap } from "@/lib/ai/v2-roadmap";
export const metadata={title:"Computer Science Roadmap"};
export default async function RoadmapPage({params}:{params:Promise<{locale:string}>}){const{locale}=await params;if(!isLocale(locale))notFound();const supabase=await createSupabaseServerClient();let evidence:V2EvidenceSummary|null=null,attemptId:string|null=null,completed:string[]=[],guidance:V2Roadmap["threeMonthGuidance"]=[];if(supabase){const{data:{user}}=await supabase.auth.getUser();if(user){const{data}=await supabase.from("assessment_attempts").select("id,result_summary,roadmaps(plan)").eq("student_id",user.id).eq("assessment_version",V2_BANK_VERSION).eq("status","completed").order("completed_at",{ascending:false}).limit(1).maybeSingle();evidence=(data?.result_summary as V2EvidenceSummary|null)??null;attemptId=data?.id??null;const saved=(data?.roadmaps as unknown as{plan:Partial<V2Roadmap>}[]|null)?.[0]?.plan;guidance=saved?.threeMonthGuidance??[];if(attemptId){const{data:rows}=await supabase.from("roadmap_task_progress").select("task_id").eq("attempt_id",attemptId);completed=(rows??[]).map(row=>row.task_id)}}}return <>{evidence&&attemptId&&<div id="twelve-week-plan" className="scroll-mt-24"><ThreeMonthPlan locale={locale} weeks={buildTwelveWeekPlan(evidence)} attemptId={attemptId} initialCompleted={completed} guidance={guidance}/></div>}<div id="long-term-roadmap" className="scroll-mt-24"><CsRoadmap locale={locale} stages={buildCsRoadmap(evidence)} personalized={Boolean(evidence)}/></div></>}
