import type { AssessmentCategory,AssessmentDifficulty,AssessmentQuestionType,CompetencyCode,LocalizedText } from "@/constants/methodology";
export type Locale="en"|"uz";
export type SkillCategory=AssessmentCategory;
export type Difficulty=AssessmentDifficulty;
export type QuestionType=AssessmentQuestionType;
export type ItemStatus="draft"|"active"|"archived";
export type ReviewStatus="approved"|"needs_review"|"do_not_publish";
export interface QuestionOption{id:string;label:LocalizedText}
export type AssessmentRole="core"|"adaptive"|"isolation";
export type CognitiveLevel="understand"|"apply"|"evaluate_create";
export type RecommendedGradeBand="grade_8_9"|"grade_10_11"|"advanced_adaptive";
export type AssessmentDomain="digital-information-literacy"|"computational-thinking-algorithms"|"programming-fundamentals"|"systems-networks-cybersecurity"|"data-databases"|"ai-literacy";
export interface DistractorMapping{misconceptionId:string;description?:LocalizedText}
export interface AdaptiveItemMetadata{domain:AssessmentDomain;subCompetency:string|null;assessmentRole:AssessmentRole;cognitiveLevel:CognitiveLevel;recommendedGradeBand:RecommendedGradeBand;parentCoreItemId:string|null;targetMisconception:string|null;distractorMappings:Record<string,DistractorMapping>;prerequisites:string[];goalWeights:Record<string,number>;source:string|null;sourceCitation:string|null;visualRequired:boolean}
export type StructuredAnswer=string|string[]|{order:string[]}|{matches:Record<string,string>};
export interface AssessmentItem{
 id:string;version:number;status:ItemStatus;reviewStatus?:ReviewStatus;reviewNotes?:string[];category:AssessmentCategory;competencyCode:CompetencyCode;competencyName:string;
 difficulty:AssessmentDifficulty;type:AssessmentQuestionType;estimatedTimeSeconds:number;learningObjective:LocalizedText;
 roadmapSkillMapping:string;misconceptionId:string;misconceptionDescription:LocalizedText;tags:string[];
 prompt:LocalizedText;options:QuestionOption[];correctAnswer:StructuredAnswer;explanation:LocalizedText;
 distractorAnalysis?:Record<string,LocalizedText>;adaptiveMetadata?:AdaptiveItemMetadata;code?:string;publishable:boolean;correctOptionId?:string;
}
export type Question=AssessmentItem;
export interface ItemResponse{questionId:string;answer:StructuredAnswer|null;responseTimeMs:number;presentedAt?:string;answeredAt?:string}
export interface ResponseEvidence{questionId:string;questionVersion:number;domain:AssessmentDomain|AssessmentCategory;competencyCode:CompetencyCode;subCompetency:string|null;assessmentRole:AssessmentRole|"legacy";cognitiveLevel:CognitiveLevel|null;correct:boolean;itemScore:number;selectedOptionIds:string[];selectedDistractorIds:string[];misconceptionIds:string[];parentCoreItemId:string|null;presentationOrder:number;recordedAt:string}
export interface CategoryScore{category:AssessmentCategory;score:number;earned:number;possible:number;correct:number;total:number}
export interface CompetencyScore{competencyCode:CompetencyCode;competencyName:string;category:AssessmentCategory;score:number;earned:number;possible:number;answered:number;total:number}
export interface DetectedMisconception{id:string;description:LocalizedText;count:number;priority:"monitor"|"high"}
export interface AssessmentResult{overall:number;level:"Foundation"|"Developing"|"Proficient"|"Advanced";coverage:number;coverageLabel:"Limited"|"Partial"|"Good";strongest:AssessmentCategory;weakest:AssessmentCategory;strongestCompetency:CompetencyCode;weakestCompetency:CompetencyCode;categories:CategoryScore[];competencies:CompetencyScore[];misconceptions:DetectedMisconception[];answeredCount:number;totalCount:number;rapidResponseFlags:string[]}
export interface AssessmentForm{seed:string;itemRefs:{id:string;version:number}[];createdAt:string;blueprintVersion:string}
export interface RoadmapWeek{week:number;focus:AssessmentCategory;targetCompetencies:CompetencyCode[];goals:string[];exercises:string[];project:string;resources:string[];milestone:string;estimatedMinutes:number;acceleration:boolean}
export type CareerGoal="software-engineering"|"web-development"|"mobile-development"|"ai-ml"|"data-science"|"cybersecurity"|"cloud-devops"|"university-cs"|"competitive-programming"|"game-development"|"general-digital-skills"|"not-sure";
export interface ParticipantProfile{participantCode:string;firstName:string;lastName:string;grade:8|9|10|11;region:string;district:string;schoolType:"public"|"private"|"specialized"|"other";schoolCode?:string;cohortCode?:string;englishLevel:"beginner"|"elementary"|"intermediate"|"advanced";deviceAccess:"personal"|"shared"|"school-only"|"none";internetAccess:"reliable"|"limited"|"rare"|"none";programmingExperience:"none"|"less-than-year"|"one-to-two"|"more-than-two";careerGoal?:CareerGoal;preferredLocale:Locale;consentedAt:string;externalApprovalHandled:boolean}
