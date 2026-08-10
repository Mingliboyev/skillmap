import { notFound } from "next/navigation";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { getDictionary,isLocale } from "@/lib/i18n/dictionaries";
export function generateStaticParams(){return [{locale:"en"},{locale:"uz"}]}
export default async function LocaleLayout({children,params}:{children:React.ReactNode;params:Promise<{locale:string}>}) { const {locale}=await params;if(!isLocale(locale))notFound();const d=getDictionary(locale);return <><SiteHeader locale={locale} d={d}/><main>{children}</main><SiteFooter locale={locale}/></> }
