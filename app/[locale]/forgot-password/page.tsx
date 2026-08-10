import {notFound} from "next/navigation";import {isLocale} from "@/lib/i18n/dictionaries";import {ForgotForm} from "@/features/auth/forgot-form";
export default async function Page({params}:{params:Promise<{locale:string}>}){const {locale}=await params;if(!isLocale(locale))notFound();return <div className="container-shell grid min-h-[650px] place-items-center"><ForgotForm locale={locale}/></div>}
