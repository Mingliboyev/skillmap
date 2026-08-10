"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Activity, BarChart3, ClipboardList, Download, LayoutDashboard, Menu, Settings, Users, X } from "lucide-react";
import { useState } from "react";
import { signOutAction } from "@/actions/auth";
import type { Locale } from "@/types/domain";

const nav=[
  ["",LayoutDashboard,"Overview","Umumiy ko‘rinish"],
  ["/questions",ClipboardList,"Questions","Savollar"],
  ["/participants",Users,"Participants & attempts","Ishtirokchilar va urinishlar"],
  ["/analytics",BarChart3,"Item analytics","Savol tahlili"],
  ["/settings",Settings,"Pilot settings","Pilot sozlamalari"],
  ["/exports",Download,"Exports","Eksportlar"],
  ["/activity",Activity,"Activity log","Faoliyat jurnali"],
] as const;
export function AdminShell({children,locale,role,pilotName}:{children:React.ReactNode;locale:Locale;role:string;pilotName:string}){
  const pathname=usePathname(),[open,setOpen]=useState(false),uz=locale==="uz",base=`/${locale}/admin`;
  const navigation=<nav aria-label={uz?"Administrator bo‘limlari":"Admin sections"} className="space-y-1">{nav.map(([suffix,Icon,en,uzLabel])=>{const href=`${base}${suffix}`,active=suffix?pathname.startsWith(href):pathname===base;return <Link key={href} href={href} onClick={()=>setOpen(false)} aria-current={active?"page":undefined} className={`flex min-h-10 items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors ${active?"bg-slate-900 text-white":"text-slate-700 hover:bg-slate-200 hover:text-slate-950"}`}><Icon size={17}/><span>{uz?uzLabel:en}</span></Link>})}</nav>;
  return <div className="admin-shell min-h-screen bg-slate-100 text-slate-950"><aside className="fixed inset-y-0 left-0 z-50 hidden w-64 flex-col border-r border-slate-300 bg-slate-50 lg:flex"><div className="border-b border-slate-300 px-5 py-5"><Link href={base} className="text-base font-extrabold tracking-tight">SkillMap Admin</Link><p className="mt-1 truncate text-xs text-slate-600">{pilotName}</p><span className="mt-3 inline-flex rounded-full border border-slate-300 bg-white px-2 py-1 text-[11px] font-bold uppercase tracking-wide text-slate-700">{role.replaceAll("_"," ")}</span></div><div className="flex-1 overflow-y-auto p-3">{navigation}</div><form action={()=>signOutAction(locale)} className="border-t border-slate-300 p-3"><button className="min-h-10 w-full rounded-md border border-slate-300 bg-white px-3 text-left text-sm font-semibold hover:bg-slate-100">{uz?"Chiqish":"Sign out"}</button></form></aside>
    <div className="lg:pl-64"><header className="sticky top-0 z-40 flex min-h-14 items-center justify-between border-b border-slate-300 bg-white/95 px-4 backdrop-blur lg:px-7"><div><strong className="text-sm">SkillMap Admin</strong><span className="ml-3 hidden text-xs text-slate-600 sm:inline">{pilotName}</span></div><div className="flex items-center gap-2"><span className="rounded-full bg-slate-100 px-2 py-1 text-[11px] font-bold uppercase text-slate-700">{role.replaceAll("_"," ")}</span><button onClick={()=>setOpen(true)} aria-label={uz?"Menyuni ochish":"Open menu"} className="grid size-10 place-items-center rounded-md border border-slate-300 lg:hidden"><Menu size={19}/></button></div></header>{open&&<div className="fixed inset-0 z-50 bg-slate-950/35 lg:hidden" onClick={()=>setOpen(false)}><aside className="h-full w-[min(19rem,88vw)] bg-slate-50 p-4" onClick={event=>event.stopPropagation()}><div className="mb-5 flex items-center justify-between"><strong>SkillMap Admin</strong><button onClick={()=>setOpen(false)} aria-label={uz?"Menyuni yopish":"Close menu"} className="grid size-10 place-items-center rounded-md"><X size={20}/></button></div>{navigation}<form action={()=>signOutAction(locale)} className="mt-5 border-t border-slate-300 pt-4"><button className="min-h-10 w-full rounded-md border border-slate-300 bg-white px-3 text-left text-sm font-semibold">{uz?"Chiqish":"Sign out"}</button></form></aside></div>}<main className="p-4 sm:p-6 lg:p-8">{children}</main></div>
  </div>;
}
