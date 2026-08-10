import { notFound } from "next/navigation";
import { ResultsReport } from "@/features/results/results-report";
import { isLocale } from "@/lib/i18n/dictionaries";
export default async function Results({params}:{params:Promise<{locale:string}>}){const {locale}=await params;if(!isLocale(locale))notFound();return <ResultsReport locale={locale}/>}
