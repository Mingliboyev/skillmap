import { NextResponse } from "next/server";
import { z } from "zod";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { V2_BANK_VERSION } from "@/lib/assessment/v2-bank";

const mutation=z.discriminatedUnion("action",[
 z.object({action:z.literal("start"),locale:z.enum(["en","uz"]),retake:z.boolean().default(false)}),
 z.object({action:z.literal("progress"),attemptId:z.string().uuid(),progress:z.object({stage:z.enum(["core","isolation"]),index:z.number().int().nonnegative(),answers:z.record(z.string(),z.string()),timings:z.record(z.string(),z.number().nonnegative()),isolationItemIds:z.array(z.string()),participant:z.unknown().optional()})})
]);

async function context(){const supabase=await createSupabaseServerClient();if(!supabase)return null;const{data:{user}}=await supabase.auth.getUser();return user?{supabase,user}:null}

export async function GET(){const ctx=await context();if(!ctx)return NextResponse.json({status:"none",authenticated:false});const{data}=await ctx.supabase.from("assessment_attempts").select("id,status,started_at,completed_at,overall_score,progress,result_summary").eq("student_id",ctx.user.id).eq("assessment_version",V2_BANK_VERSION).order("started_at",{ascending:false}).limit(1).maybeSingle();return NextResponse.json(data?{authenticated:true,status:data.status,attemptId:data.id,startedAt:data.started_at,completedAt:data.completed_at,overallScore:data.overall_score,progress:data.progress,result:data.result_summary}:{authenticated:true,status:"none"})}

export async function POST(request:Request){const parsed=mutation.safeParse(await request.json().catch(()=>null));if(!parsed.success)return NextResponse.json({error:"Invalid attempt request"},{status:400});const ctx=await context();if(!ctx)return NextResponse.json({error:"Authentication required"},{status:401});if(parsed.data.action==="progress"){const{data,error}=await ctx.supabase.from("assessment_attempts").update({progress:parsed.data.progress}).eq("id",parsed.data.attemptId).eq("student_id",ctx.user.id).eq("status","in_progress").select("id").maybeSingle();return error||!data?NextResponse.json({error:"Progress was not saved"},{status:400}):NextResponse.json({saved:true})}
 const current=await ctx.supabase.from("assessment_attempts").select("id,status").eq("student_id",ctx.user.id).eq("assessment_version",V2_BANK_VERSION).order("started_at",{ascending:false}).limit(1).maybeSingle();
 if(current.data?.status==="in_progress")return NextResponse.json({attemptId:current.data.id,status:"in_progress",existing:true});
 if(current.data?.status==="completed"&&!parsed.data.retake)return NextResponse.json({error:"Retake must be explicit"},{status:409});
 await ctx.supabase.from("students").upsert({id:ctx.user.id,preferred_locale:parsed.data.locale},{onConflict:"id"});
 const{data,error}=await ctx.supabase.from("assessment_attempts").insert({student_id:ctx.user.id,status:"in_progress",locale:parsed.data.locale,assessment_version:V2_BANK_VERSION,form_blueprint_version:V2_BANK_VERSION,progress:{stage:"core",index:0,answers:{},timings:{},isolationItemIds:[]}}).select("id").single();
 return error||!data?NextResponse.json({error:"Attempt could not be created"},{status:500}):NextResponse.json({attemptId:data.id,status:"in_progress"});
}
