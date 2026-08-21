import { NextResponse } from "next/server";
import { z } from "zod";
import { publicV2Item,v2CoreItems } from "@/lib/assessment/v2-bank";
import { selectDiagnosticFollowUps } from "@/lib/assessment/v2-results";
const schema=z.object({locale:z.enum(["en","uz"]),answers:z.record(z.string(),z.enum(["A","B","C","D"])),goal:z.string().max(60).optional()});
export async function POST(request:Request){const parsed=schema.safeParse(await request.json().catch(()=>null));if(!parsed.success)return NextResponse.json({error:"Invalid branch request"},{status:400});if(v2CoreItems.some(item=>!parsed.data.answers[item.itemId]))return NextResponse.json({error:"All Common Core items must be answered"},{status:400});const items=selectDiagnosticFollowUps(parsed.data.answers,parsed.data.goal).map(item=>publicV2Item(item,parsed.data.locale));return NextResponse.json({items})}
