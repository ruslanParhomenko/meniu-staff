import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const {
      date,
      notes,
      shifts = [],
      remains = [],
      preparedSalads = [],
      preparedSeconds = [],
      preparedDesserts = [],
      cutting = [],
      staff = [],
      movement = [],
      writeOff = [],
    } = body;

    const report = await prisma.dailyReportCucina.create({
      data: {
        date: new Date(date),
        notes: notes || null,

        shifts: {
          create: shifts.map(
            (s: { name: any; time: any; over: any; employees: any }) => ({
              name: s.name,
              time: s.time,
              over: s.over,
              employees: s.employees,
            })
          ),
        },

        remains: {
          create: remains.map(
            (r: { product: any; portions: any; weight: any }) => ({
              product: r.product,
              portions: r.portions,
              weight: r.weight,
            })
          ),
        },

        preparedSalads: {
          create: preparedSalads.map(
            (p: { product: any; portions: any; weight: any; time: any }) => ({
              product: p.product,
              portions: p.portions,
              weight: p.weight,
              time: p.time,
            })
          ),
        },

        preparedSeconds: {
          create: preparedSeconds.map(
            (p: { product: any; portions: any; weight: any; time: any }) => ({
              product: p.product,
              portions: p.portions,
              weight: p.weight,
              time: p.time,
            })
          ),
        },

        preparedDesserts: {
          create: preparedDesserts.map(
            (p: { product: any; portions: any; weight: any; time: any }) => ({
              product: p.product,
              portions: p.portions,
              weight: p.weight,
              time: p.time,
            })
          ),
        },

        cutting: {
          create: cutting.map(
            (c: { product: any; portions: any; weight: any; time: any }) => ({
              product: c.product,
              portions: c.portions,
              weight: c.weight,
              time: c.time,
            })
          ),
        },

        staff: {
          create: staff.map(
            (s: { product: any; portions: any; weight: any; time: any }) => ({
              product: s.product,
              portions: s.portions,
              weight: s.weight,
              time: s.time,
            })
          ),
        },

        movement: {
          create: movement.map(
            (m: { nameOutside: any; nameInside: any; weight: any }) => ({
              nameOutside: m.nameOutside,
              nameInside: m.nameInside,
              weight: m.weight,
            })
          ),
        },

        writeOff: {
          create: writeOff.map(
            (w: { product: any; weight: any; reason: any }) => ({
              product: w.product,
              weight: w.weight,
              reason: w.reason,
            })
          ),
        },
      },
      include: {
        shifts: true,
        remains: true,
        preparedSalads: true,
        preparedSeconds: true,
        preparedDesserts: true,
        cutting: true,
        staff: true,
        movement: true,
        writeOff: true,
      },
    });

    return NextResponse.json(report);
  } catch (error: any) {
    console.error(error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function GET() {
  const dailyReport = await prisma.dailyReportCucina.findMany({
    include: {
      shifts: true,
      remains: true,
      preparedSalads: true,
      preparedSeconds: true,
      preparedDesserts: true,
      cutting: true,
      staff: true,
      movement: true,
      writeOff: true,
    },
    orderBy: {
      date: "desc",
    },
  });
  return NextResponse.json(dailyReport);
}
