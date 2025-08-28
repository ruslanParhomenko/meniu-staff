import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const data = await req.json();
    const newUser = await prisma.user.create({
      data: {
        mail: data.mail,
        role: data.role,
      },
    });

    return NextResponse.json(newUser, { status: 201 });
  } catch (error) {}
}

export async function GET() {
  const users = await prisma.user.findMany();
  return NextResponse.json(users);
}
