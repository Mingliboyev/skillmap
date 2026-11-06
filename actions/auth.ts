"use server";
import { redirect } from "next/navigation";
import { createSupabaseServerClient } from "@/lib/supabase/server";
<<<<<<< HEAD
import { authSchema, forgotSchema, resendSignupOtpSchema, signupOtpSchema } from "@/validation/schemas";

export type ActionState = { ok: boolean; message: string; next?: "verify" };

export async function signInAction(locale: string, input: unknown): Promise<ActionState> {
  const uz = locale === "uz", parsed = authSchema.safeParse(input);
  if (!parsed.success) return { ok: false, message: uz ? "Email yoki parol formati noto‘g‘ri." : parsed.error.issues[0].message };
  const supabase = await createSupabaseServerClient();
  if (!supabase) return { ok: false, message: uz ? "Kirish xizmati sozlanmagan. Pilotda mehmon sifatida davom eting." : "Sign-in is not configured. Continue as a guest for this pilot." };
  const { error } = await supabase.auth.signInWithPassword(parsed.data);
  if (error) {
    const isUnconfirmed = error.message.toLowerCase().includes("email not confirmed");
    return {
      ok: false,
      message: uz
        ? (isUnconfirmed ? "Email manzilingiz hali tasdiqlanmagan. Iltimos, emailingizni tekshiring." : "Email yoki parol noto‘g‘ri.")
        : error.message
    };
  }
  redirect(`/${locale}`);
}

export async function signUpAction(locale: string, input: unknown): Promise<ActionState> {
  const uz = locale === "uz", parsed = authSchema.safeParse(input);
  if (!parsed.success) return { ok: false, message: uz ? "Email yoki parol formati noto‘g‘ri." : parsed.error.issues[0].message };
  const supabase = await createSupabaseServerClient();
  if (!supabase) return { ok: false, message: uz ? "Ro‘yxatdan o‘tish xizmati sozlanmagan. Pilotda mehmon sifatida davom eting." : "Registration is not configured. Continue as a guest for this pilot." };
  const { data, error } = await supabase.auth.signUp({
    email: parsed.data.email,
    password: parsed.data.password,
    options: {
      emailRedirectTo: `${process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"}/${locale}/auth/callback`
    }
  });
  if (error) {
    return { ok: false, message: uz ? "Hisobni yaratib bo‘lmadi. Ma’lumotlarni tekshirib, qayta urinib ko‘ring." : error.message };
  }
  if (data?.user && Array.isArray(data.user.identities) && data.user.identities.length === 0) {
    return {
      ok: false,
      message: uz ? "Bu email bilan allaqachon ro‘yxatdan o‘tilgan. Iltimos, tizimga kiring." : "This email is already registered. Please sign in."
    };
  }
  if (data?.session) {
    return { ok: true, message: uz ? "Muvaffaqiyatli ro‘yxatdan o‘tdingiz." : "Registration successful." };
  }
  return { ok: true, next: "verify", message: uz ? "Tasdiqlash kodi emailingizga yuborildi." : "A verification code was sent to your email." };
}

export async function verifySignupOtpAction(locale: string, input: unknown): Promise<ActionState> {
  const safeLocale = locale === "uz" ? "uz" : "en", uz = safeLocale === "uz", parsed = signupOtpSchema.safeParse(input);
  if (!parsed.success) return { ok: false, message: uz ? "6–8 xonali tasdiqlash kodini kiriting." : "Enter the 6–8 digit verification code." };
  const supabase = await createSupabaseServerClient();
  if (!supabase) return { ok: false, message: uz ? "Tasdiqlash xizmati sozlanmagan." : "Verification is not configured." };
  let { error } = await supabase.auth.verifyOtp({ email: parsed.data.email, token: parsed.data.token, type: "email" });
  if (error) {
    const retry = await supabase.auth.verifyOtp({ email: parsed.data.email, token: parsed.data.token, type: "signup" });
    if (!retry.error) error = null;
  }
  if (error) return { ok: false, message: uz ? "Kod noto‘g‘ri yoki amal qilish muddati tugagan. Yangi kod so‘rab ko‘ring." : "The code is invalid or expired. Request a new code and try again." };
  redirect(`/${safeLocale}`);
}

export async function resendSignupOtpAction(locale: string, input: unknown): Promise<ActionState> {
  const uz = locale === "uz", parsed = resendSignupOtpSchema.safeParse(input);
  if (!parsed.success) return { ok: false, message: uz ? "To‘g‘ri email manzilini kiriting." : "Enter a valid email address." };
  const supabase = await createSupabaseServerClient();
  if (!supabase) return { ok: false, message: uz ? "Tasdiqlash xizmati sozlanmagan." : "Verification is not configured." };
  const { error } = await supabase.auth.resend({ type: "signup", email: parsed.data.email });
  return error ? { ok: false, message: uz ? "Kodni qayta yuborib bo‘lmadi. Birozdan keyin urinib ko‘ring." : "The code could not be resent. Try again shortly." } : { ok: true, message: uz ? "Yangi tasdiqlash kodi yuborildi." : "A new verification code was sent." };
}

export async function forgotAction(locale: string, input: unknown): Promise<ActionState> {
  const uz = locale === "uz", parsed = forgotSchema.safeParse(input);
  if (!parsed.success) return { ok: false, message: uz ? "To‘g‘ri email manzilini kiriting." : parsed.error.issues[0].message };
  const supabase = await createSupabaseServerClient();
  if (!supabase) return { ok: false, message: uz ? "Parolni tiklash xizmati sozlanmagan." : "Password reset is not configured." };
  const { error } = await supabase.auth.resetPasswordForEmail(parsed.data.email);
  return error ? { ok: false, message: uz ? "Tiklash havolasini yuborib bo‘lmadi. Keyinroq qayta urinib ko‘ring." : error.message } : { ok: true, message: uz ? "Parolni tiklash ko‘rsatmalari yuborildi." : "Password reset instructions have been sent." };
}

export async function signOutAction(locale: string) {
  const supabase = await createSupabaseServerClient();
  await supabase?.auth.signOut();
  redirect(`/${locale}`);
}
=======
import { authSchema,forgotSchema,resendSignupOtpSchema,signupOtpSchema } from "@/validation/schemas";
export type ActionState={ok:boolean;message:string;next?:"verify"};
export async function signInAction(locale:string,input:unknown):Promise<ActionState>{const uz=locale==="uz",parsed=authSchema.safeParse(input);if(!parsed.success)return {ok:false,message:uz?"Email yoki parol formati noto‘g‘ri.":parsed.error.issues[0].message};const supabase=await createSupabaseServerClient();if(!supabase)return {ok:false,message:uz?"Kirish xizmati sozlanmagan. Pilotda mehmon sifatida davom eting.":"Sign-in is not configured. Continue as a guest for this pilot."};const {error}=await supabase.auth.signInWithPassword(parsed.data);if(error)return {ok:false,message:uz?"Email yoki parol noto‘g‘ri.":error.message};redirect(`/${locale}`)}
export async function signUpAction(locale:string,input:unknown):Promise<ActionState>{const uz=locale==="uz",parsed=authSchema.safeParse(input);if(!parsed.success)return {ok:false,message:uz?"Email yoki parol formati noto‘g‘ri.":parsed.error.issues[0].message};const supabase=await createSupabaseServerClient();if(!supabase)return {ok:false,message:uz?"Ro‘yxatdan o‘tish xizmati sozlanmagan. Pilotda mehmon sifatida davom eting.":"Registration is not configured. Continue as a guest for this pilot."};const {error}=await supabase.auth.signUp({email:parsed.data.email,password:parsed.data.password,options:{emailRedirectTo:`${process.env.NEXT_PUBLIC_APP_URL||"http://localhost:3000"}/${locale}/auth/callback`}});return error?{ok:false,message:uz?"Hisobni yaratib bo‘lmadi. Ma’lumotlarni tekshirib, qayta urinib ko‘ring.":error.message}:{ok:true,next:"verify",message:uz?"Tasdiqlash kodi emailingizga yuborildi.":"A verification code was sent to your email."}}
export async function verifySignupOtpAction(locale:string,input:unknown):Promise<ActionState>{const safeLocale=locale==="uz"?"uz":"en",uz=safeLocale==="uz",parsed=signupOtpSchema.safeParse(input);if(!parsed.success)return{ok:false,message:uz?"6–8 xonali tasdiqlash kodini kiriting.":"Enter the 6–8 digit verification code."};const supabase=await createSupabaseServerClient();if(!supabase)return{ok:false,message:uz?"Tasdiqlash xizmati sozlanmagan.":"Verification is not configured."};const{error}=await supabase.auth.verifyOtp({email:parsed.data.email,token:parsed.data.token,type:"email"});if(error)return{ok:false,message:uz?"Kod noto‘g‘ri yoki amal qilish muddati tugagan. Yangi kod so‘rab ko‘ring.":"The code is invalid or expired. Request a new code and try again."};redirect(`/${safeLocale}`)}
export async function resendSignupOtpAction(locale:string,input:unknown):Promise<ActionState>{const uz=locale==="uz",parsed=resendSignupOtpSchema.safeParse(input);if(!parsed.success)return{ok:false,message:uz?"To‘g‘ri email manzilini kiriting.":"Enter a valid email address."};const supabase=await createSupabaseServerClient();if(!supabase)return{ok:false,message:uz?"Tasdiqlash xizmati sozlanmagan.":"Verification is not configured."};const{error}=await supabase.auth.resend({type:"signup",email:parsed.data.email});return error?{ok:false,message:uz?"Kodni qayta yuborib bo‘lmadi. Birozdan keyin urinib ko‘ring.":"The code could not be resent. Try again shortly."}:{ok:true,message:uz?"Yangi tasdiqlash kodi yuborildi.":"A new verification code was sent."}}
export async function forgotAction(locale:string,input:unknown):Promise<ActionState>{const uz=locale==="uz",parsed=forgotSchema.safeParse(input);if(!parsed.success)return {ok:false,message:uz?"To‘g‘ri email manzilini kiriting.":parsed.error.issues[0].message};const supabase=await createSupabaseServerClient();if(!supabase)return {ok:false,message:uz?"Parolni tiklash xizmati sozlanmagan.":"Password reset is not configured."};const {error}=await supabase.auth.resetPasswordForEmail(parsed.data.email);return error?{ok:false,message:uz?"Tiklash havolasini yuborib bo‘lmadi. Keyinroq qayta urinib ko‘ring.":error.message}:{ok:true,message:uz?"Parolni tiklash ko‘rsatmalari yuborildi.":"Password reset instructions have been sent."}}
export async function signOutAction(locale:string){const supabase=await createSupabaseServerClient();await supabase?.auth.signOut();redirect(`/${locale}`)}
>>>>>>> b5f5cc6a2d1b2769b7b52f64961832ba40907e93
