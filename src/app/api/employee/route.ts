import { NextResponse } from "next/server";

const API_EMPLOYEE_URL =
  "https://script.google.com/macros/s/AKfycbzRtulRAVCjj1gsHQfeKWxyNlSHlv-g5uw6oGvPnnG6jDw9uL0LmV8qHc6T_-USNYs/exec";

export async function GET() {
  try {
    const res = await fetch(API_EMPLOYEE_URL, {
      //   cache: "no-store",
      method: "GET",
      headers: { Accept: "application/json" },
    });

    const data = await res.json();
    return NextResponse.json(data);
  } catch (error) {}

  return NextResponse.json(
    { error: "Не удалось получить данные employee" },
    { status: 500 }
  );
}
