import { NextResponse } from "next/server";
import { z } from "zod";
import { isolationForCore,publicV2Item,v2CoreItems } from "@/lib/assessment/v2-bank";
const schema=z.object({locale:z.enum(["en","uz"]),answers:z.record(z.string(),z.enum(["A","B","C","D"]))});
export async function POST(request:Request){const parsed=schema.safeParse(await request.json().catch(()=>null));if(!parsed.success)return NextResponse.json({error:"Invalid branch request"},{status:400});if(v2CoreItems.some(item=>!parsed.data.answers[item.itemId]))return NextResponse.json({error:"All Common Core items must be answered"},{status:400});const items=v2CoreItems.filter(item=>parsed.data.answers[item.itemId]!==item.correctOption).map(item=>isolationForCore(item.itemId)).filter(Boolean).map(item=>publicV2Item(item!,parsed.data.locale));return NextResponse.json({items})}
