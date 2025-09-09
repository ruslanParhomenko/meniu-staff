import { NextRequest, NextResponse } from "next/server";
import { get } from "@vercel/edge-config";

export const config = {
  matcher: ["/((?!_next|api|favicon.ico).*)"],
};

export async function middleware(req: NextRequest) {
  const mainMode = await get("mainMode");

  console.log("mainMode", mainMode);

  // Если mainMode === false → редиректим на /loading
  if (mainMode === false && !req.nextUrl.pathname.startsWith("/loading")) {
    return NextResponse.redirect(new URL("/loading", req.url));
  }

  // Если mainMode === true → пропускаем
  return NextResponse.next();
}
