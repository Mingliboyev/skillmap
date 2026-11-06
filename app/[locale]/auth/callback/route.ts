<<<<<<< HEAD
import { NextResponse } from "next/server";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import type { EmailOtpType } from "@supabase/supabase-js";

export async function GET(request: Request, { params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const safeLocale = locale === "uz" ? "uz" : "en";
  const url = new URL(request.url);
  const code = url.searchParams.get("code");
  const token_hash = url.searchParams.get("token_hash");
  const type = url.searchParams.get("type") as EmailOtpType | null;
  const next = url.searchParams.get("next") ?? `/${safeLocale}`;

  const error = url.searchParams.get("error");
  const errorDescription = url.searchParams.get("error_description");
  if (error) {
    return NextResponse.redirect(new URL(`/${safeLocale}/sign-in?error=${encodeURIComponent(errorDescription || error)}`, url.origin));
  }

  const supabase = await createSupabaseServerClient();
  if (supabase) {
    if (code) {
      await supabase.auth.exchangeCodeForSession(code);
    } else if (token_hash && type) {
      await supabase.auth.verifyOtp({ token_hash, type });
    }
  }

  const redirectTarget = next.startsWith("/") ? next : `/${safeLocale}`;
  return NextResponse.redirect(new URL(redirectTarget, url.origin));
}
=======
import {NextResponse} from "next/server";import {createSupabaseServerClient} from "@/lib/supabase/server";
export async function GET(request:Request,{params}:{params:Promise<{locale:string}>}){const {locale}=await params;const url=new URL(request.url);const code=url.searchParams.get("code");if(code){const supabase=await createSupabaseServerClient();await supabase?.auth.exchangeCodeForSession(code)}return NextResponse.redirect(new URL(`/${locale}`,url.origin))}
>>>>>>> b5f5cc6a2d1b2769b7b52f64961832ba40907e93
