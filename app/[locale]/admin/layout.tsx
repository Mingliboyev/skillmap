import { redirect } from "next/navigation";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import { AdminShell } from "@/features/admin/admin-shell";
import { isLocale } from "@/lib/i18n/dictionaries";
export const dynamic="force-dynamic";
export default async function AdminLayout({children,params}:{children:React.ReactNode;params:Promise<{locale:string}>}){
  const {locale}=await params;if(!isLocale(locale))redirect("/en");const supabase=await createSupabaseServerClient(),admin=createSupabaseAdminClient();if(!supabase||!admin)redirect(`/${locale}/sign-in`);
  const {data}=await supabase.auth.getUser();if(!data.user)redirect(`/${locale}/sign-in`);
  const [{data:membership},{data:settings}]=await Promise.all([admin.from("admins").select("role").eq("user_id",data.user.id).maybeSingle(),admin.from("pilot_settings").select("pilot_name").eq("id",true).maybeSingle()]);if(!membership)redirect(`/${locale}`);
  return <AdminShell locale={locale} role={membership.role} pilotName={settings?.pilot_name??"SkillMap internal pilot"}>{children}</AdminShell>;
}
