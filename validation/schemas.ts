import { z } from "zod";
export const profileSchema=z.object({grade:z.number().int().min(8).max(11),region:z.string().min(2).max(80),district:z.string().min(2).max(100),schoolType:z.enum(["public","private","specialized","other"]),schoolCode:z.string().max(40).optional(),cohortCode:z.string().max(40).optional(),englishLevel:z.enum(["beginner","elementary","intermediate","advanced"]),programmingExperience:z.enum(["none","less-than-year","one-to-two","more-than-two"]),deviceAccess:z.enum(["personal","shared","school-only","none"]),internetAccess:z.enum(["reliable","limited","rare","none"]),preferredLocale:z.enum(["en","uz"]),consent:z.literal(true),externalApprovalHandled:z.boolean(),consentedAt:z.string().datetime()});
export const authSchema=z.object({email:z.string().email(),password:z.string().min(8).max(72)});
export const signupOtpSchema=z.object({email:z.string().email(),token:z.string().regex(/^\d{6,8}$/)});
export const resendSignupOtpSchema=z.object({email:z.string().email()});
export const forgotSchema=z.object({email:z.string().email()});
export const questionSchema=z.object({promptEn:z.string().min(10),promptUz:z.string().min(10),category:z.string().min(2),difficulty:z.enum(["easy","medium","hard"]),status:z.enum(["draft","published","archived"])});
