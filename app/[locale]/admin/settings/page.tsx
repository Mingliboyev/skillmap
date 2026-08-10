import { notFound } from "next/navigation";
import { getPilotSettings } from "@/lib/admin-data";
import { isLocale } from "@/lib/i18n/dictionaries";
import { PilotSettingsForm } from "@/features/admin/pilot-settings-form";
export default async function SettingsPage({params}:{params:Promise<{locale:string}>}){const {locale}=await params;if(!isLocale(locale))notFound();const settings=await getPilotSettings();return <div className="mx-auto max-w-[1500px]"><p className="text-xs font-bold uppercase tracking-wider text-slate-500">{locale==="uz"?"Pilot boshqaruvi":"Pilot operations"}</p><h1 className="mb-5 mt-1 text-2xl font-bold">{locale==="uz"?"Pilot sozlamalari":"Pilot settings"}</h1><PilotSettingsForm locale={locale} settings={settings}/></div>}
