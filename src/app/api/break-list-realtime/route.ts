import { supabase } from "@/lib/supabaseClient";

import { NextResponse } from "next/server";

export async function GET() {
  try {
    const { data, error } = await supabase
      .from("break_list_realtime")
      .select("form_data,user_email");

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(data);
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();

    if (!body.user_email) {
      return NextResponse.json(
        { error: "user_email is required" },
        { status: 400 }
      );
    }

    const { error } = await supabase.from("break_list_realtime").upsert(
      {
        user_email: body.user_email, // уникальный ключ
        form_data: body.form_data,
      },
      { onConflict: "user_email" } // теперь конфликты по email, а не по id
    );

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
