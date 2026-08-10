import { spawnSync } from "node:child_process";
import { questions } from "../constants/questions";

const password=process.env.SUPABASE_DB_PASSWORD;
if(!password)throw new Error("SUPABASE_DB_PASSWORD is required for direct seeding");
const literal=(value:unknown)=>`'${String(value).replaceAll("'","''")}'`;
const json=(value:unknown)=>`${literal(JSON.stringify(value))}::jsonb`;
const textArray=(values:string[])=>values.length?`array[${values.map(literal).join(",")}]::text[]`:"'{}'::text[]";
const statements=["begin;"];
for(const item of questions){
  const eligible=item.reviewStatus==="approved"&&item.publishable;
  const status=item.status==="archived"?"archived":item.status==="active"&&eligible?"published":"draft";
  statements.push(`insert into public.questions(stable_id,version,status,review_status,review_notes,category,competency_code,competency_name,question_type,difficulty,estimated_time_seconds,prompt_en,prompt_uz,learning_objective,roadmap_skill_mapping,misconception_id,misconception_description,tags,correct_answer,explanation_en,explanation_uz,distractor_analysis,publishable)
values(${literal(item.id)},${item.version},${literal(status)},${literal(item.reviewStatus??"needs_review")},${textArray(item.reviewNotes??[])},${literal(item.category)},${literal(item.competencyCode)},${literal(item.competencyName)},${literal(item.type)},${literal(item.difficulty)},${item.estimatedTimeSeconds},${literal(item.prompt.en)},${literal(item.prompt.uz)},${json(item.learningObjective)},${literal(item.roadmapSkillMapping)},${literal(item.misconceptionId)},${json(item.misconceptionDescription)},${textArray(item.tags)},${json(item.correctAnswer)},${literal(item.explanation.en)},${literal(item.explanation.uz)},${item.distractorAnalysis?json(item.distractorAnalysis):"null"},${eligible})
on conflict(stable_id,version) do update set status=excluded.status,review_status=excluded.review_status,review_notes=excluded.review_notes,category=excluded.category,competency_code=excluded.competency_code,competency_name=excluded.competency_name,question_type=excluded.question_type,difficulty=excluded.difficulty,estimated_time_seconds=excluded.estimated_time_seconds,prompt_en=excluded.prompt_en,prompt_uz=excluded.prompt_uz,learning_objective=excluded.learning_objective,roadmap_skill_mapping=excluded.roadmap_skill_mapping,misconception_id=excluded.misconception_id,misconception_description=excluded.misconception_description,tags=excluded.tags,correct_answer=excluded.correct_answer,explanation_en=excluded.explanation_en,explanation_uz=excluded.explanation_uz,distractor_analysis=excluded.distractor_analysis,publishable=excluded.publishable,updated_at=now();`);
  statements.push(`delete from public.question_options where question_id=(select id from public.questions where stable_id=${literal(item.id)} and version=${item.version});`);
  for(const [position,option] of item.options.entries()){
    const isCorrect=typeof item.correctAnswer==="string"?item.correctAnswer===option.id:Array.isArray(item.correctAnswer)?item.correctAnswer.includes(option.id):false;
    statements.push(`insert into public.question_options(question_id,label_en,label_uz,is_correct,position) select id,${literal(option.label.en)},${literal(option.label.uz)},${isCorrect},${position} from public.questions where stable_id=${literal(item.id)} and version=${item.version};`);
  }
}
statements.push("commit;");
const result=spawnSync("psql",["--host=aws-0-eu-central-1.pooler.supabase.com","--port=5432","--username=postgres.yqycqeluizswvkcrdvqe","--dbname=postgres","--set=ON_ERROR_STOP=1","--quiet"],{input:statements.join("\n"),encoding:"utf8",env:{...process.env,PGPASSWORD:password,PGSSLMODE:"require"}});
if(result.status!==0)throw new Error(result.stderr||"Direct seed failed");
console.log(`Seeded ${questions.length} versioned questions (${questions.filter(item=>item.reviewStatus==="approved"&&item.publishable).length} pilot-eligible).`);
