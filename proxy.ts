import { createServerClient } from "@supabase/ssr";
import { createClient } from "@supabase/supabase-js";
import { NextResponse, type NextRequest } from "next/server";

export async function proxy(request:NextRequest){
  const url=process.env.NEXT_PUBLIC_SUPABASE_URL,anonKey=process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,serviceKey=process.env.SUPABASE_SERVICE_ROLE_KEY;
  if(!url||!anonKey)return NextResponse.next({request});
  let response=NextResponse.next({request});
  const supabase=createServerClient(url,anonKey,{cookies:{getAll:()=>request.cookies.getAll(),setAll(items){items.forEach(({name,value})=>request.cookies.set(name,value));response=NextResponse.next({request});items.forEach(({name,value,options})=>response.cookies.set(name,value,options))}}});
  const {data:{user}}=await supabase.auth.getUser();
  const adminMatch=request.nextUrl.pathname.match(/^\/(en|uz)\/admin(?:\/|$)/);
  if(adminMatch){
    const locale=adminMatch[1];
    if(!user)return NextResponse.redirect(new URL(`/${locale}/sign-in`,request.url));
    if(!serviceKey)return NextResponse.redirect(new URL(`/${locale}`,request.url));
    const admin=createClient(url,serviceKey,{auth:{persistSession:false,autoRefreshToken:false}});
    const {data:membership}=await admin.from("admins").select("role").eq("user_id",user.id).maybeSingle();
    if(!membership)return NextResponse.redirect(new URL(`/${locale}`,request.url));
  }
  return response;
}
export const config={matcher:["/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)"]};
