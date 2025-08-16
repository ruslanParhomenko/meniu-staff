import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const record = await prisma.stopListRecord.findFirst(); // только один объект
  return NextResponse.json(record || null);
}

export async function POST(req: Request) {
  const data = await req.json();
  const existing = await prisma.stopListRecord.findFirst();
  if (existing) return NextResponse.json(existing);

  const newRecord = await prisma.stopListRecord.create({
    data,
  });

  return NextResponse.json(newRecord);
}

export async function PUT(req: Request) {
  const data = await req.json();

  if (!data.id)
    return NextResponse.json({ error: "No ID provided" }, { status: 400 });

  const updated = await prisma.stopListRecord.update({
    where: { id: data.id },
    data: { stopList: data.stopList },
  });

  return NextResponse.json(updated);
}
