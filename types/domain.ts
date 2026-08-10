import type { AssessmentCategory,AssessmentDifficulty,AssessmentQuestionType,CompetencyCode,LocalizedText } from "@/constants/methodology";
export type Locale="en"|"uz";
export type SkillCategory=AssessmentCategory;
export type Difficulty=AssessmentDifficulty;
export type QuestionType=AssessmentQuestionType;
export type ItemStatus="draft"|"active"|"archived";
export type ReviewStatus="approved"|"needs_review"|"do_not_publish";
export interface QuestionOption{id:string;label:LocalizedText}
export type StructuredAnswer=string|string[]|{order:string[]}|{matches:Record<string,string>};
export interface AssessmentItem{
 id:string;version:number;status:ItemStatus;reviewStatus?:ReviewStatus;reviewNotes?:string[];category:AssessmentCategory;competencyCode:CompetencyCode;competencyName:string;
 difficulty:AssessmentDifficulty;type:AssessmentQuestionType;estimatedTimeSeconds:number;learningObjective:LocalizedText;
 roadmapSkillMapping:string;misconceptionId:string;misconceptionDescription:LocalizedText;tags:string[];
 prompt:LocalizedText;options:QuestionOption[];correctAnswer:StructuredAnswer;explanation:LocalizedText;
 distractorAnalysis?:Record<string,LocalizedText>;code?:string;publishable:boolean;correctOptionId?:string;
}
export type Question=AssessmentItem;
export interface ItemResponse{questionId:string;answer:StructuredAnswer|null;responseTimeMs:number;presentedAt?:string;answeredAt?:string}
export interface CategoryScore{category:AssessmentCategory;score:number;earned:number;possible:number;correct:number;total:number}
export interface CompetencyScore{competencyCode:CompetencyCode;competencyName:string;category:AssessmentCategory;score:number;earned:number;possible:number;answered:number;total:number}
export interface DetectedMisconception{id:string;description:LocalizedText;count:number;priority:"monitor"|"high"}
export interface AssessmentResult{overall:number;level:"Foundation"|"Developing"|"Proficient"|"Advanced";coverage:number;coverageLabel:"Limited"|"Partial"|"Good";strongest:AssessmentCategory;weakest:AssessmentCategory;strongestCompetency:CompetencyCode;weakestCompetency:CompetencyCode;categories:CategoryScore[];competencies:CompetencyScore[];misconceptions:DetectedMisconception[];answeredCount:number;totalCount:number;rapidResponseFlags:string[]}
export interface AssessmentForm{seed:string;itemRefs:{id:string;version:number}[];createdAt:string;blueprintVersion:string}
export interface RoadmapWeek{week:number;focus:AssessmentCategory;targetCompetencies:CompetencyCode[];goals:string[];exercises:string[];project:string;resources:string[];milestone:string;estimatedMinutes:number;acceleration:boolean}
export interface ParticipantProfile{participantCode:string;grade:8|9|10|11;region:string;district:string;schoolType:"public"|"private"|"specialized"|"other";schoolCode?:string;cohortCode?:string;englishLevel:"beginner"|"elementary"|"intermediate"|"advanced";deviceAccess:"personal"|"shared"|"school-only"|"none";internetAccess:"reliable"|"limited"|"rare"|"none";programmingExperience:"none"|"less-than-year"|"one-to-two"|"more-than-two";preferredLocale:Locale;consentedAt:string;externalApprovalHandled:boolean}
