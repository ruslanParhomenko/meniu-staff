import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { date, rows } = body;

    if (!rows || !Array.isArray(rows)) {
      return NextResponse.json(
        { error: "'rows' is missing or is not an array" },
        { status: 400 }
      );
    }

    const breakeList = await prisma.breakeList.create({
      data: {
        date: new Date(date),
        rows: {
          create: rows.map((row: any) => ({
            externalId: row.id,
            name: row.name || null,
            hours: {
              create: Object.entries(row.hours || {}).map(([hour, value]) => ({
                hour,
                value: String(value),
              })),
            },
          })),
        },
      },
      include: {
        rows: { include: { hours: true } },
      },
    });

    return NextResponse.json(breakeList);
  } catch (error: any) {
    console.error(error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function GET() {
  const breakeList = await prisma.breakeList.findMany();
  return NextResponse.json(breakeList);
}
