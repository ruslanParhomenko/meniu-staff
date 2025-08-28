import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params;

  await prisma.user.delete({
    where: { id: Number(id) },
  });

  return NextResponse.json({ message: "User deleted successfully" });
}
