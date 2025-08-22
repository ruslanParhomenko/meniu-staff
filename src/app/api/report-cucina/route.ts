import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  const dailyReport = await prisma.dailyReportCucina.findMany();
  return NextResponse.json(dailyReport);
}
