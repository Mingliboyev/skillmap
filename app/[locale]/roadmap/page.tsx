import { notFound } from "next/navigation";
import { CsRoadmap } from "@/features/roadmap/cs-roadmap";
import { buildCsRoadmap } from "@/lib/cs-roadmap";
import { isLocale } from "@/lib/i18n/dictionaries";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { V2_BANK_VERSION } from "@/lib/assessment/v2-bank";
import type { V2EvidenceSummary } from "@/lib/assessment/v2-results";
export const metadata={title:"Computer Science Roadmap"};
export default async function RoadmapPage({params}:{params:Promise<{locale:string}>}){const{locale}=await params;if(!isLocale(locale))notFound();const supabase=await createSupabaseServerClient();let evidence:V2EvidenceSummary|null=null;if(supabase){const{data:{user}}=await supabase.auth.getUser();if(user){const{data}=await supabase.from("assessment_attempts").select("result_summary").eq("student_id",user.id).eq("assessment_version",V2_BANK_VERSION).eq("status","completed").order("completed_at",{ascending:false}).limit(1).maybeSingle();evidence=(data?.result_summary as V2EvidenceSummary|null)??null}}return <CsRoadmap locale={locale} stages={buildCsRoadmap(evidence)} personalized={Boolean(evidence)}/>}
