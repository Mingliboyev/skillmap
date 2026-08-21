import type { V2EvidenceSummary } from "@/lib/assessment/v2-results";
import type { ParticipantProfile } from "@/types/domain";

export type AttemptStatus="none"|"in_progress"|"completed";
export type StoredProgress={stage?:"core"|"isolation";index?:number;answers?:Record<string,string>;timings?:Record<string,number>;isolationItemIds?:string[];participant?:ParticipantProfile};
export type AssessmentAttemptState={status:AttemptStatus;attemptId?:string;startedAt?:string;completedAt?:string;overallScore?:number;result?:V2EvidenceSummary;progress?:StoredProgress};

export function attemptCta(status:AttemptStatus,locale:"en"|"uz"){
  const copy={en:{none:"Start assessment",in_progress:"Continue assessment",completed:"View results"},uz:{none:"Baholashni boshlash",in_progress:"Baholashni davom ettirish",completed:"Natijalarni ko‘rish"}};
  return copy[locale][status];
}
