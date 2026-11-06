<<<<<<< HEAD
import { notFound, redirect } from "next/navigation";
=======
import { notFound } from "next/navigation";
>>>>>>> b5f5cc6a2d1b2769b7b52f64961832ba40907e93
import { AssessmentFlow } from "@/features/assessment/assessment-flow";
import { isLocale } from "@/lib/i18n/dictionaries";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { V2_BANK_VERSION } from "@/lib/assessment/v2-bank";
<<<<<<< HEAD
import type { StoredProgress } from "@/lib/assessment/attempt-state";

export const metadata = { title: "Assessment" };

export default async function AssessmentPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const supabase = await createSupabaseServerClient();
  if (supabase) {
    const { data: { user } } = await supabase.auth.getUser();
    if (user) {
      const { data } = await supabase
        .from("assessment_attempts")
        .select("id,status,progress")
        .eq("student_id", user.id)
        .eq("assessment_version", V2_BANK_VERSION)
        .order("started_at", { ascending: false })
        .limit(1)
        .maybeSingle();
      if (data?.status === "completed") {
        redirect(`/${locale}/results`);
      }
      if (data?.status === "in_progress") {
        return <AssessmentFlow locale={locale} attemptId={data.id} initialProgress={data.progress as StoredProgress} />;
      }
    }
  }
  return <AssessmentFlow locale={locale} />;
}
=======
import { redirect } from "next/navigation";
import type { StoredProgress } from "@/lib/assessment/attempt-state";
export const metadata={title:"Assessment"};
export default async function AssessmentPage({params}:{params:Promise<{locale:string}>}){const {locale}=await params;if(!isLocale(locale))notFound();const supabase=await createSupabaseServerClient();if(supabase){const{data:{user}}=await supabase.auth.getUser();if(user){const{data}=await supabase.from("assessment_attempts").select("id,status,progress").eq("student_id",user.id).eq("assessment_version",V2_BANK_VERSION).order("started_at",{ascending:false}).limit(1).maybeSingle();if(!data||data.status==="completed")redirect(`/${locale}`);return <AssessmentFlow locale={locale} attemptId={data.id} initialProgress={data.progress as StoredProgress}/>}}return <AssessmentFlow locale={locale}/>}
>>>>>>> b5f5cc6a2d1b2769b7b52f64961832ba40907e93
