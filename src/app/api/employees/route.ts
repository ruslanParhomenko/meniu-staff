import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const employees = await prisma.employee.findMany();
  return NextResponse.json(employees);
}

export async function POST(req: Request) {
  try {
    const data = await req.json();
    const newEmployee = await prisma.employee.create({
      data: {
        name: data.name,
        position: data.position,
        rate: data.rate,
      },
    });

    return NextResponse.json(newEmployee, { status: 201 });
  } catch (error) {
    console.error("Prisma create error:", error);
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 500 }
    );
  }
}
