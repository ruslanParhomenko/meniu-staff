import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(
  request: Request,
  context: { params: Record<string, string | string[]> }
) {
  let id = context.params.id;

  if (Array.isArray(id)) id = id[0];

  const employee = await prisma.employee.findUnique({
    where: { id: Number(id) },
  });

  if (!employee) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  return NextResponse.json(employee);
}

export async function DELETE(
  request: Request,
  context: { params: Record<string, string | string[]> }
) {
  let id = context.params.id;

  if (Array.isArray(id)) id = id[0];

  try {
    await prisma.employee.delete({
      where: { id: Number(id) },
    });

    return NextResponse.json({ message: "Deleted successfully" });
  } catch (error) {
    return NextResponse.json(
      { error: "Not found or already deleted" },
      { status: 404 }
    );
  }
}
