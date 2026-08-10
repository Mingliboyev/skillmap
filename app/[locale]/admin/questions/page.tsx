import { notFound } from "next/navigation";
import { isLocale } from "@/lib/i18n/dictionaries";
import { getAdminQuestions } from "@/lib/admin-data";
import { QuestionManager } from "@/features/admin/question-manager";
export default async function QuestionsPage({params}:{params:Promise<{locale:string}>}){const {locale}=await params;if(!isLocale(locale))notFound();return <QuestionManager locale={locale} items={await getAdminQuestions()}/>}
