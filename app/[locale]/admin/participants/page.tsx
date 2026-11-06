import { notFound } from "next/navigation";
import { isLocale } from "@/lib/i18n/dictionaries";
import { getAdminParticipants } from "@/lib/admin-data";
import { ParticipantTable } from "@/features/admin/participant-table";
export default async function ParticipantsPage({params}:{params:Promise<{locale:string}>}){const {locale}=await params;if(!isLocale(locale))notFound();return <ParticipantTable locale={locale} rows={await getAdminParticipants()}/>}
