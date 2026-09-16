import { NextResponse } from "next/server";
import { PK_AUTH_COOKIE } from "@/lib/server-auth";

export async function POST() {
  const response = NextResponse.json({ ok: true });

  const expiredCookie = {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 0,
  } as const;

  response.cookies.set(PK_AUTH_COOKIE, "", expiredCookie);
  response.cookies.set("next-auth.session-token", "", expiredCookie);
  response.cookies.set("__Secure-next-auth.session-token", "", expiredCookie);
  response.cookies.set("next-auth.csrf-token", "", expiredCookie);
  response.cookies.set("__Host-next-auth.csrf-token", "", expiredCookie);
  response.cookies.set("next-auth.callback-url", "", expiredCookie);
  response.cookies.set("__Secure-next-auth.callback-url", "", expiredCookie);

  return response;
}
