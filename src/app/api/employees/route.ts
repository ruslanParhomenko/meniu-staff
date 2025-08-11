import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const employees = await prisma.employee.findMany();
  return NextResponse.json(employees);
}

export async function POST(req: Request) {
  const data = await req.json();

  const newEmployee = await prisma.employee.create({
    data: {
      name: data.name,
      position: data.position,
    },
  });

  return NextResponse.json(newEmployee, { status: 201 });
}
