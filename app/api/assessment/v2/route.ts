import { NextResponse } from "next/server";
import { publicV2Core,V2_BANK_VERSION } from "@/lib/assessment/v2-bank";
export async function GET(request:Request){const locale=new URL(request.url).searchParams.get("locale")==="uz"?"uz":"en";return NextResponse.json({assessmentVersion:V2_BANK_VERSION,items:publicV2Core(locale)})}
