import { NextResponse } from "next/server";

const EDGE_CONFIG_ID = process.env.EDGE_CONFIG_ID!;
const VERCEL_API_TOKEN = process.env.VERCEL_API_TOKEN!;

export async function GET() {
  const res = await fetch(
    `https://api.vercel.com/v2/edge-config/${EDGE_CONFIG_ID}/items/mainMode`,
    {
      headers: {
        Authorization: `Bearer ${VERCEL_API_TOKEN}`,
      },
    }
  );

  const data = await res.json();
  // возвращаем boolean
  return NextResponse.json({ mainMode: data.value });
}

export async function POST(req: Request) {
  const { mode } = await req.json();

  const res = await fetch(
    `https://api.vercel.com/v2/edge-config/${EDGE_CONFIG_ID}/items`,
    {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${VERCEL_API_TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        items: [{ operation: "update", key: "mainMode", value: mode }],
      }),
    }
  );

  if (!res.ok)
    return NextResponse.json({ error: "Ошибка обновления" }, { status: 500 });

  return NextResponse.json({ mainMode: mode });
}
