import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const record = await prisma.stopListRecord.findFirst();

  return NextResponse.json(record || null, {
    headers: {
      "Cache-Control": "s-maxage=30, stale-while-revalidate=60",
    },
  });
}

export async function POST(req: Request) {
  const data = await req.json();

  const record = await prisma.stopListRecord.upsert({
    where: { id: data.id ?? 1 },
    update: {
      stopList: data.stopList,
      stopListCucina: data.stopListCucina,
    },
    create: {
      stopList: data.stopList,
      stopListCucina: data.stopListCucina,
    },
  });

  return NextResponse.json(record);
}

export async function PUT(req: Request) {
  const data = await req.json();

  if (!data.id)
    return NextResponse.json({ error: "No ID provided" }, { status: 400 });

  const existing = await prisma.stopListRecord.findUnique({
    where: { id: data.id },
  });

  if (!existing)
    return NextResponse.json({ error: "Record not found" }, { status: 404 });

  const noChanges =
    JSON.stringify(existing.stopList) === JSON.stringify(data.stopList) &&
    JSON.stringify(existing.stopListCucina) ===
      JSON.stringify(data.stopListCucina);

  if (noChanges) {
    return NextResponse.json(existing);
  }

  const updated = await prisma.stopListRecord.update({
    where: { id: data.id },
    data: {
      stopList: data.stopList,
      stopListCucina: data.stopListCucina,
    },
  });

  return NextResponse.json(updated);
}
