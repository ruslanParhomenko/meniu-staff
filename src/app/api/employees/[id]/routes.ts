// app/api/employees/[id]/route.ts
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  const employee = await prisma.employee.findUnique({
    where: { id: Number(params.id) },
  });

  if (!employee) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  return NextResponse.json(employee);
}

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    await prisma.employee.delete({
      where: { id: Number(params.id) },
    });

    return NextResponse.json({ message: "Deleted successfully" });
  } catch (error) {
    return NextResponse.json(
      { error: "Not found or already deleted" },
      { status: 404 }
    );
  }
}
