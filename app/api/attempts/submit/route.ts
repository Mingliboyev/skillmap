import { z } from "zod";
import { NextResponse } from "next/server";
import { questions } from "@/constants/questions";
import { resolveAssessmentForm, validateAssessmentForm } from "@/lib/assessment/assembly";
import { scoreAssessment, scoreItem } from "@/lib/scoring";
import { generateRoadmap } from "@/lib/roadmap";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import { profileSchema } from "@/validation/schemas";
import { isDuplicateSubmissionError } from "@/lib/submission";

const answer=z.union([z.string(),z.array(z.string()),z.object({order:z.array(z.string())}),z.object({matches:z.record(z.string(),z.string())})]);
const bodySchema=z.object({submissionKey:z.string().uuid(),participant:profileSchema.omit({consent:true}).extend({participantCode:z.string().regex(/^SM-\d{4}-\d{6}$/),consent:z.literal(true)}),form:z.object({seed:z.string().min(1),itemRefs:z.array(z.object({id:z.string(),version:z.number().int().positive()})).length(48),createdAt:z.string().datetime(),blueprintVersion:z.string()}),answers:z.record(z.string(),answer),timings:z.record(z.string(),z.number().nonnegative())});
export async function POST(request:Request){
  const parsed=bodySchema.safeParse(await request.json().catch(()=>null));if(!parsed.success)return NextResponse.json({error:"Invalid submission",issues:parsed.error.issues},{status:400});
  const {participant,form,answers,timings,submissionKey}=parsed.data,validation=validateAssessmentForm(form,questions);if(!validation.valid)return NextResponse.json({error:"Invalid assessment form",issues:validation.errors},{status:400});
  const items=resolveAssessmentForm(form,questions),result=scoreAssessment(items,answers,timings),roadmap=generateRoadmap(result,participant.preferredLocale),admin=createSupabaseAdminClient();
  if(!admin)return NextResponse.json({mode:"demo",stored:false,result,roadmap});
  const existing=await admin.from("assessment_attempts").select("id").eq("submission_key",submissionKey).maybeSingle();if(existing.data)return NextResponse.json({stored:true,duplicate:true,attemptId:existing.data.id,result,roadmap});
  let participantId:string;
  const inserted=await admin.from("pilot_participants").insert({participant_code:participant.participantCode,grade:participant.grade,region:participant.region,district:participant.district,school_type:participant.schoolType,school_code:participant.schoolCode||null,cohort_code:participant.cohortCode||null,english_level:participant.englishLevel,device_access:participant.deviceAccess,internet_access:participant.internetAccess,programming_experience:participant.programmingExperience,preferred_locale:participant.preferredLocale,consented_at:participant.consentedAt,external_approval_handled:participant.externalApprovalHandled}).select("id").single();
  if(isDuplicateSubmissionError(inserted.error)){const prior=await admin.from("pilot_participants").select("id").eq("participant_code",participant.participantCode).single();if(prior.error||!prior.data)return NextResponse.json({error:"Could not resolve participant"},{status:500});participantId=prior.data.id}else if(inserted.error||!inserted.data)return NextResponse.json({error:"Could not store participant"},{status:500});else participantId=inserted.data.id;
  const startedAt=new Date(form.createdAt),attemptInsert=await admin.from("assessment_attempts").insert({anonymous_id:participantId,status:"completed",locale:participant.preferredLocale,form_seed:form.seed,form_blueprint_version:form.blueprintVersion,form_items:form.itemRefs,submission_key:submissionKey,overall_score:result.overall,skill_level:result.level,confidence:result.coverage/100,started_at:startedAt.toISOString(),completed_at:new Date().toISOString(),duration_seconds:Math.max(0,Math.round((Date.now()-startedAt.getTime())/1000))}).select("id").single();
  if(isDuplicateSubmissionError(attemptInsert.error)){const duplicate=await admin.from("assessment_attempts").select("id").eq("submission_key",submissionKey).single();return NextResponse.json({stored:true,duplicate:true,attemptId:duplicate.data?.id,result,roadmap})}
  if(attemptInsert.error||!attemptInsert.data)return NextResponse.json({error:"Could not store attempt"},{status:500});const attemptId=attemptInsert.data.id;
  const responseRows=items.map((item,index)=>({attempt_id:attemptId,question_stable_id:item.id,question_version:item.version,presentation_order:index+1,selected_answer:answers[item.id]??null,response_time_ms:timings[item.id]??0,item_score:scoreItem(item,answers[item.id]??null),rapid_response:(timings[item.id]??Infinity)<item.estimatedTimeSeconds*1000*.15}));
  const responseInsert=await admin.from("pilot_responses").insert(responseRows);if(responseInsert.error)return NextResponse.json({error:"Attempt stored but response persistence failed",recoveryAttemptId:attemptId},{status:500});
  const writes=await Promise.all([admin.from("category_scores").insert(result.categories.map((item)=>({attempt_id:attemptId,category:item.category,score:item.score,correct_count:item.correct,question_count:item.total}))),admin.from("competency_scores").insert(result.competencies.map((item)=>({attempt_id:attemptId,competency_code:item.competencyCode,score:item.score,earned_points:item.earned,possible_points:item.possible,answered_count:item.answered,item_count:item.total}))),result.misconceptions.length?admin.from("misconception_flags").insert(result.misconceptions.map((item)=>({attempt_id:attemptId,misconception_id:item.id,occurrence_count:item.count,priority:item.priority}))):Promise.resolve({error:null}),admin.from("roadmaps").insert({attempt_id:attemptId,rules_version:"pilot-v2",plan:roadmap})]);
  const failed=writes.find((write)=>write.error);if(failed?.error)return NextResponse.json({error:"Attempt stored but derived data persistence failed",recoveryAttemptId:attemptId},{status:500});
  return NextResponse.json({stored:true,attemptId,result,roadmap});
}
