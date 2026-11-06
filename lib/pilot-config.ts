export type FeedbackMode="research-safe"|"diagnostic";
const positiveInteger=(value:string|undefined,fallback:number)=>{const parsed=Number(value);return Number.isInteger(parsed)&&parsed>=3?parsed:fallback};
export const pilotConfig={
  name:process.env.PILOT_NAME?.trim()||"SkillMap internal pilot",
  startDate:process.env.PILOT_START_DATE||null,
  endDate:process.env.PILOT_END_DATE||null,
  minimumResearchGroupSize:positiveInteger(process.env.MIN_RESEARCH_GROUP_SIZE,5),
  feedbackMode:(process.env.FEEDBACK_MODE==="diagnostic"?"diagnostic":"research-safe") as FeedbackMode,
};
export function permitsAnswerKey(mode:FeedbackMode){return mode==="diagnostic"}
