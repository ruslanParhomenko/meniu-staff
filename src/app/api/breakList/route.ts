import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const body = await req.json();
  const { date, rows } = body;
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
}

export async function GET() {
  const breakeList = await prisma.breakeList.findMany();
  return NextResponse.json(breakeList);
}
