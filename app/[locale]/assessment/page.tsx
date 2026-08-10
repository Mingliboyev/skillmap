import { notFound } from "next/navigation";
import { AssessmentFlow } from "@/features/assessment/assessment-flow";
import { isLocale } from "@/lib/i18n/dictionaries";
export const metadata={title:"Assessment"};
export default async function AssessmentPage({params}:{params:Promise<{locale:string}>}){const {locale}=await params;if(!isLocale(locale))notFound();return <AssessmentFlow locale={locale}/>}
