import { notFound } from "next/navigation";
import { ResultsReport } from "@/features/results/results-report";
import { isLocale } from "@/lib/i18n/dictionaries";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { V2_BANK_VERSION } from "@/lib/assessment/v2-bank";
import type { V2EvidenceSummary } from "@/lib/assessment/v2-results";
import type { V2Roadmap } from "@/lib/ai/v2-roadmap";
export default async function Results({params}:{params:Promise<{locale:string}>}){const {locale}=await params;if(!isLocale(locale))notFound();const supabase=await createSupabaseServerClient();let initial:null|{result:V2EvidenceSummary;roadmap:V2Roadmap}=null;if(supabase){const{data:{user}}=await supabase.auth.getUser();if(user){const{data}=await supabase.from("assessment_attempts").select("result_summary,roadmaps(plan)").eq("student_id",user.id).eq("assessment_version",V2_BANK_VERSION).eq("status","completed").order("completed_at",{ascending:false}).limit(1).maybeSingle();const roadmap=(data?.roadmaps as unknown as{plan:V2Roadmap}[]|null)?.[0]?.plan;if(data?.result_summary&&roadmap)initial={result:data.result_summary as V2EvidenceSummary,roadmap}}}return <ResultsReport locale={locale} initial={initial}/>}
