import { NextRequest, NextResponse } from "next/server";
import { get } from "@vercel/edge-config";

export const config = {
  matcher: ["/((?!_next|api|favicon.ico).*)"],
};

export default async function middleware(req: NextRequest) {
  const isMode = await get<boolean>("mainMode");
  if (isMode) {
    return NextResponse.redirect(new URL("/loading", req.url));
  }
  return NextResponse.next();
}
