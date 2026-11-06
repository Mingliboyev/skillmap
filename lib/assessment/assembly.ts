import { assessmentCategories, pilotBlueprint, publishableQuestionTypes, type AssessmentDifficulty } from "@/constants/methodology";
import type { AssessmentForm, AssessmentItem } from "@/types/domain";

function hashSeed(value:string){let hash=2166136261;for(let index=0;index<value.length;index++){hash^=value.charCodeAt(index);hash=Math.imul(hash,16777619)}return hash>>>0}
function random(seed:number){let value=seed||1;return()=>{value=(Math.imul(value,1664525)+1013904223)>>>0;return value/4294967296}}
function seededShuffle<T>(items:T[],seed:string){const result=[...items],next=random(hashSeed(seed));for(let index=result.length-1;index>0;index--){const swap=Math.floor(next()*(index+1));[result[index],result[swap]]=[result[swap],result[index]]}return result}
const eligible=(item:AssessmentItem)=>item.status==="active"&&item.reviewStatus==="approved"&&item.publishable&&publishableQuestionTypes.has(item.type);

export interface AssemblyValidation{valid:boolean;errors:string[]}
export function validateAssessmentForm(form:AssessmentForm,bank:AssessmentItem[]):AssemblyValidation{
  const errors:string[]=[],ids=form.itemRefs.map((ref)=>ref.id);
  if(new Set(ids).size!==ids.length)errors.push("Duplicate questions are not allowed");
  const items=form.itemRefs.map((ref)=>bank.find((item)=>item.id===ref.id&&item.version===ref.version));
  if(items.some((item)=>!item))errors.push("Form references missing question versions");
  const valid=items.filter((item):item is AssessmentItem=>Boolean(item));
  if(valid.some((item)=>!eligible(item)))errors.push("Only active, approved, publishable questions may be selected");
  for(const category of assessmentCategories){
    const categoryItems=valid.filter((item)=>item.category===category);
    if(categoryItems.length!==8)errors.push(`${category}: expected 8 questions`);
    for(const difficulty of Object.keys(pilotBlueprint.difficultyPerCategory) as AssessmentDifficulty[]){
      const expected=pilotBlueprint.difficultyPerCategory[difficulty];
      if(categoryItems.filter((item)=>item.difficulty===difficulty).length!==expected)errors.push(`${category}/${difficulty}: expected ${expected}`);
    }
    if(new Set(categoryItems.map((item)=>item.competencyCode)).size<pilotBlueprint.minimumCompetenciesPerCategory)errors.push(`${category}: too few competencies represented`);
  }
  return{valid:errors.length===0,errors};
}
function candidate(bank:AssessmentItem[],seed:string,attempt:number){
  const selected:AssessmentItem[]=[];
  for(const category of assessmentCategories)for(const difficulty of Object.keys(pilotBlueprint.difficultyPerCategory) as AssessmentDifficulty[]){
    const needed=pilotBlueprint.difficultyPerCategory[difficulty];
    const pool=seededShuffle(bank.filter((item)=>eligible(item)&&item.category===category&&item.difficulty===difficulty),`${seed}:${attempt}:${category}:${difficulty}`);
    if(pool.length<needed)throw new Error(`Insufficient approved items for ${category}/${difficulty}: need ${needed}, found ${pool.length}`);
    selected.push(...pool.slice(0,needed));
  }
  return seededShuffle(selected,`${seed}:${attempt}:presentation`);
}
export function assembleAssessment(bank:AssessmentItem[],seed:string):AssessmentForm{
  let last:string[]=[];
  for(let attempt=0;attempt<100;attempt++){
    const items=candidate(bank,seed,attempt),form:AssessmentForm={seed,itemRefs:items.map((item)=>({id:item.id,version:item.version})),createdAt:new Date().toISOString(),blueprintVersion:"pilot-v1"};
    const validation=validateAssessmentForm(form,bank);if(validation.valid)return form;last=validation.errors;
  }
  throw new Error(`Unable to assemble valid form: ${last.join("; ")}`);
}
export function resolveAssessmentForm(form:AssessmentForm,bank:AssessmentItem[]){return form.itemRefs.map((ref)=>{const item=bank.find((candidate)=>candidate.id===ref.id&&candidate.version===ref.version);if(!item)throw new Error(`Missing item ${ref.id}@${ref.version}`);return item})}
export const assessmentAssemblyInternals={hashSeed,seededShuffle};
