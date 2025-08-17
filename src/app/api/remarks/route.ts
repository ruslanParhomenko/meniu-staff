import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { date, remarks } = body;

    const report = await prisma.remarkReport.create({
      data: {
        date: new Date(body.date),
        remarks: {
          create: remarks.map((remark: any) => ({
            name: remark.name,
            dayHours: remark.dayHours,
            nightHours: remark.nightHours,
            reason: remark.reason,
            penality: remark.penality,
            reasonPenality: remark.reasonPenality,
          })),
        },
      },
      include: { remarks: true },
    });

    return NextResponse.json(report);
  } catch (error: any) {
    console.error(error);
    return NextResponse.json(
      { error: error.message || "Failed to create report" },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const reports = await prisma.remarkReport.findMany({
      include: { remarks: true },
      orderBy: { date: "desc" },
    });

    return NextResponse.json(reports);
  } catch (error: any) {
    console.error("❌ Prisma error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to fetch remarks" },
      { status: 500 }
    );
  }
}
