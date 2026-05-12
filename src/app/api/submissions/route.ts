import { NextResponse } from "next/server";
import { getConsultationSubmissions } from "@/lib/submissions";

export async function GET() {
  const submissions = await getConsultationSubmissions();
  return NextResponse.json({ submissions });
}
