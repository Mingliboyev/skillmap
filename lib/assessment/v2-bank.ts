import rawBank from "../../skillmap-v2-core-isolation-bank.json";
import type { Locale } from "../../types/domain";

export const V2_BANK_ID = "skillmap-v2-pilot";
export const LEGACY_V2_BANK_VERSION = rawBank.bankVersion;
export const V2_BANK_VERSION = `${rawBank.bankVersion}-24`;
export const V2_SUPPORTED_VERSIONS = [V2_BANK_VERSION, LEGACY_V2_BANK_VERSION] as const;
export const V2_EXCLUDED_CORE_IDS = ["DLIT-05", "CT-01", "PROG-03", "SYS-04", "DATA-05", "AI-05"] as const;
export const v2Domains = ["Digital & Information Literacy","Computational Thinking & Algorithms","Programming Fundamentals","Systems, Networks & Cybersecurity","Data & Databases","AI Literacy"] as const;
export type V2Domain = typeof v2Domains[number];
export type V2Role = "core"|"isolation";
export type V2OptionId = "A"|"B"|"C"|"D";
export interface V2LocalizedContent {context:string;question:string;options:Record<V2OptionId,string>;explanation:string}
export interface V2BankItem {itemId:string;assessmentRole:V2Role;parentCoreItemId:string|null;domain:V2Domain;domainUz:string;competency:string;subCompetency:string;source:{name:string;citation:string};difficulty:"foundation"|"standard"|"stretch";recommendedGradeBand:"grade_8_9"|"grade_10_11";questionType:string;isolationTarget:string|null;possibleFailurePattern:string|null;roadmapMapping:string|null;correctOption:V2OptionId;content:Record<Locale,V2LocalizedContent>}
export interface PublicV2Item {itemId:string;questionType:string;context:string;question:string;options:{id:V2OptionId;label:string}[]}

const optionIds:V2OptionId[]=["A","B","C","D"];
export function validateV2Bank(input:unknown=rawBank){
  const errors:string[]=[];const bank=input as typeof rawBank;const items=(bank?.items??[]) as V2BankItem[];
  if(items.length!==60)errors.push(`expected 60 items, received ${items.length}`);
  const ids=new Set<string>();for(const item of items){
    if(ids.has(item.itemId))errors.push(`duplicate itemId ${item.itemId}`);ids.add(item.itemId);
    if(!v2Domains.includes(item.domain))errors.push(`${item.itemId}: invalid domain`);
    if(item.assessmentRole!=="core"&&item.assessmentRole!=="isolation")errors.push(`${item.itemId}: invalid role`);
    if(!item.source?.citation?.trim())errors.push(`${item.itemId}: missing source citation`);
    for(const locale of ["en","uz"] as const){const c=item.content?.[locale];if(!c?.context?.trim()||!c.question?.trim()||!c.explanation?.trim())errors.push(`${item.itemId}: incomplete ${locale} content`);if(!c?.options||optionIds.some(id=>!c.options[id]?.trim())||Object.keys(c.options??{}).length!==4)errors.push(`${item.itemId}: invalid ${locale} options`)}
    if(!optionIds.includes(item.correctOption))errors.push(`${item.itemId}: invalid correct option`);
  }
  const cores=items.filter(i=>i.assessmentRole==="core"),isolations=items.filter(i=>i.assessmentRole==="isolation");if(cores.length!==30)errors.push(`expected 30 core, received ${cores.length}`);if(isolations.length!==30)errors.push(`expected 30 isolation, received ${isolations.length}`);
  for(const domain of v2Domains){if(cores.filter(i=>i.domain===domain).length!==5)errors.push(`${domain}: expected 5 core`);if(isolations.filter(i=>i.domain===domain).length!==5)errors.push(`${domain}: expected 5 isolation`)}
  for(const core of cores){const children=isolations.filter(i=>i.parentCoreItemId===core.itemId);if(children.length!==1)errors.push(`${core.itemId}: expected exactly one isolation child`)}
  for(const child of isolations)if(!child.parentCoreItemId||!cores.some(i=>i.itemId===child.parentCoreItemId))errors.push(`${child.itemId}: invalid parent`);
  if(errors.length)throw new Error(`Invalid v2 assessment bank:\n${errors.join("\n")}`);return items;
}
export const v2Bank=validateV2Bank();
export const v2CoreItems=v2Bank.filter(i=>i.assessmentRole==="core");
const excludedCoreIds = new Set<string>(V2_EXCLUDED_CORE_IDS);
export const v2ActiveCoreItems = v2CoreItems.filter((item) => !excludedCoreIds.has(item.itemId));
export function publicV2Item(item:V2BankItem,locale:Locale):PublicV2Item{const c=item.content[locale];return{itemId:item.itemId,questionType:item.questionType,context:c.context,question:c.question,options:optionIds.map(id=>({id,label:c.options[id]}))}}
export function publicV2Core(locale:Locale){return v2ActiveCoreItems.map(i=>publicV2Item(i,locale))}
export function v2Item(id:string){return v2Bank.find(i=>i.itemId===id)??null}
export function isolationForCore(id:string){return v2Bank.find(i=>i.assessmentRole==="isolation"&&i.parentCoreItemId===id)??null}
