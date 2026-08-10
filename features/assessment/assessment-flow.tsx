"use client";
import { useState } from "react";
import type { Locale, ParticipantProfile } from "@/types/domain";
import { ParticipantOnboarding } from "@/features/assessment/participant-onboarding";
import { AssessmentRunner } from "@/features/assessment/assessment-runner";
export function AssessmentFlow({locale}:{locale:Locale}){const [profile,setProfile]=useState<ParticipantProfile|null>(()=>{if(typeof window==="undefined")return null;try{return JSON.parse(sessionStorage.getItem("skillmap-participant")||"null")}catch{return null}}),uz=locale==="uz";if(!profile)return <ParticipantOnboarding locale={locale} onComplete={(value)=>{sessionStorage.setItem("skillmap-participant",JSON.stringify(value));setProfile(value)}}/>;const stored=Boolean(process.env.NEXT_PUBLIC_SUPABASE_URL);return <><div className="container-shell mt-5 rounded-lg border border-blue-300 bg-blue-50 p-3 text-sm text-blue-950">{profile.participantCode} · {stored?(uz?"Pilot ma’lumotlari rejimi":"Pilot data mode"):(uz?"Mahalliy namoyish rejimi — javoblar pilot bazasida saqlanmaydi.":"Local demo mode — responses are not stored in the pilot database.")}</div><AssessmentRunner locale={locale}/></>}
