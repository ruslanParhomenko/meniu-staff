import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const report = await prisma.remarkReport.findUnique({
      where: { id: Number(params.id) },
      include: { remarks: true },
    });

    if (!report) {
      return NextResponse.json({ error: "Report not found" }, { status: 404 });
    }

    return NextResponse.json(report);
  } catch (error: any) {
    console.error("❌ Prisma error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to fetch report" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  _req: Request,
  { params }: { params: Promise<{ id: number }> }
) {
  try {
    const { id } = await params;

    await prisma.remarkReport.delete({
      where: { id: Number(id) },
      include: { remarks: true },
    });

    return NextResponse.json({ message: "Report deleted successfully" });
  } catch (error) {
    console.error("DELETE /api/remarks/[id] error:", error);
    return NextResponse.json(
      { error: "Failed to delete report" },
      { status: 500 }
    );
  }
}
