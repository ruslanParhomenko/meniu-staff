import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

function parseDateToUTC(dateStr: string) {
  const d = new Date(dateStr);
  if (isNaN(d.getTime())) {
    throw new Error("Invalid date format: " + dateStr);
  }
  return new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { cashVerify, tobacco, expenses, date } = body;

    const parsedDate = parseDateToUTC(date);
    const report = await prisma.dailyReport.create({
      data: {
        date: parsedDate,
        cashVerify: {
          create: cashVerify.map((c: any) => ({
            hours: c.hours,
            value: c.value,
          })),
        },
        tobacco: {
          create: tobacco.map((t: any) => ({
            name: t.name,
            stock: t.stock,
            incoming: t.incoming,
            outgoing: t.outgoing,
            finalStock: t.finalStock,
          })),
        },
        expenses: {
          create: expenses.map((e: any) => ({
            name: e.name,
            sum: e.sum,
          })),
        },
      },
      include: {
        cashVerify: true,
        tobacco: true,
        expenses: true,
      },
    });

    return NextResponse.json(report);
  } catch (error: any) {
    console.error(error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
