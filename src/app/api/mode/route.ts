import { NextResponse } from "next/server";
import { get } from "@vercel/edge-config";

export async function GET() {
  const mainMode = await get("mainMode");
  return NextResponse.json({ mainMode });
}

export async function POST(req: Request) {
  const { mode } = await req.json();

  try {
    // ⚠️ Нативного set у Edge Config НЕТ!
    // Нужно использовать REST API для изменения
    await fetch(process.env.EDGE_CONFIG as string, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${process.env.VERCEL_API_TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        items: [{ operation: "update", key: "mainMode", value: mode }],
      }),
    });

    return NextResponse.json({ mainMode: mode });
  } catch (error) {
    return NextResponse.json({ error: "Ошибка обновления" }, { status: 500 });
  }
}
