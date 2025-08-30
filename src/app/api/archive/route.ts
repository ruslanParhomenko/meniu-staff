import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const [dailyReportCucina, dailyReport, remarkReport, breakeList] =
    await prisma.$transaction([
      prisma.dailyReportCucina.findMany(),
      prisma.dailyReport.findMany(),
      prisma.remarkReport.findMany(),
      prisma.breakeList.findMany(),
    ]);

  return NextResponse.json({
    dailyReportCucina,
    dailyReport,
    remarkReport,
    breakeList,
  });
}
