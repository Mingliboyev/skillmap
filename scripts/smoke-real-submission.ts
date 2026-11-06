import { assembleAssessment, resolveAssessmentForm } from "../lib/assessment/assembly";
import { questions } from "../constants/questions";

const baseUrl=process.env.SMOKE_BASE_URL??"http://localhost:3214";
const suffix=String(990000+Math.floor(Math.random()*9999)).padStart(6,"0");
const participantCode=`SM-2026-${suffix}`;
const form=assembleAssessment(questions,`SYSTEM-SMOKE-${crypto.randomUUID()}`);
const items=resolveAssessmentForm(form,questions);
const answers=Object.fromEntries(items.map(item=>[item.id,item.correctAnswer]));
const timings=Object.fromEntries(items.map(item=>[item.id,item.estimatedTimeSeconds*1000]));
const requestBody={submissionKey:crypto.randomUUID(),participant:{participantCode,grade:8,region:"System smoke test",district:"System smoke test",schoolType:"other",cohortCode:"SYSTEM-SMOKE-20260808",englishLevel:"intermediate",deviceAccess:"personal",internetAccess:"reliable",programmingExperience:"none",preferredLocale:"en",consent:true,consentedAt:new Date().toISOString(),externalApprovalHandled:true},form,answers,timings};
const submit=()=>fetch(`${baseUrl}/api/attempts/submit`,{method:"POST",headers:{"content-type":"application/json"},body:JSON.stringify(requestBody)});
const response=await submit();
const payload=await response.json() as {stored?:boolean;duplicate?:boolean;attemptId?:string;result?:{overall:number;answeredCount:number};roadmap?:unknown[];error?:string};
if(!response.ok||!payload.stored||!payload.attemptId)throw new Error(`Submission smoke failed (${response.status}): ${payload.error??"not stored"}`);
const retry=await submit(),retryPayload=await retry.json() as {stored?:boolean;duplicate?:boolean;attemptId?:string};
if(!retry.ok||!retryPayload.stored||!retryPayload.duplicate||retryPayload.attemptId!==payload.attemptId)throw new Error("Duplicate submission protection failed");
console.log(JSON.stringify({status:response.status,stored:payload.stored,duplicateRetry:retryPayload.duplicate,sameAttempt:retryPayload.attemptId===payload.attemptId,attemptCreated:Boolean(payload.attemptId),overall:payload.result?.overall,answered:payload.result?.answeredCount,roadmapWeeks:payload.roadmap?.length,participantCode}));
