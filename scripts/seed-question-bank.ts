import { createClient } from "@supabase/supabase-js";
import { questions } from "../constants/questions";

const url=process.env.NEXT_PUBLIC_SUPABASE_URL,key=process.env.SUPABASE_SERVICE_ROLE_KEY;
if(!url||!key)throw new Error("NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY are required");
const client=createClient(url,key,{auth:{persistSession:false}});
for(const item of questions){
  const approved=item.reviewStatus==="approved"&&item.publishable;
  const {data:question,error}=await client.from("questions").upsert({stable_id:item.id,version:item.version,status:item.status==="active"&&approved?"published":item.status==="archived"?"archived":"draft",review_status:item.reviewStatus??"needs_review",review_notes:item.reviewNotes??[],category:item.category,competency_code:item.competencyCode,competency_name:item.competencyName,question_type:item.type,difficulty:item.difficulty,estimated_time_seconds:item.estimatedTimeSeconds,prompt_en:item.prompt.en,prompt_uz:item.prompt.uz,learning_objective:item.learningObjective,roadmap_skill_mapping:item.roadmapSkillMapping,misconception_id:item.misconceptionId,misconception_description:item.misconceptionDescription,tags:item.tags,correct_answer:item.correctAnswer,explanation_en:item.explanation.en,explanation_uz:item.explanation.uz,distractor_analysis:item.distractorAnalysis,publishable:approved},{onConflict:"stable_id,version"}).select("id").single();
  if(error||!question)throw error??new Error(`Failed ${item.id}`);
  await client.from("question_options").delete().eq("question_id",question.id);
  const {error:optionError}=await client.from("question_options").insert(item.options.map((option,index)=>({question_id:question.id,label_en:option.label.en,label_uz:option.label.uz,is_correct:typeof item.correctAnswer==="string"?item.correctAnswer===option.id:Array.isArray(item.correctAnswer)?item.correctAnswer.includes(option.id):false,position:index})));
  if(optionError)throw optionError;
}
console.log(`Seeded ${questions.length} versioned questions (${questions.filter((item)=>item.reviewStatus==="approved"&&item.publishable).length} pilot-eligible).`);
