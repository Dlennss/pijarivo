import { NextResponse } from "next/server";
import { createLocalUser } from "@/lib/local-auth";

export async function POST(req: Request) {
  const body = await req.text();
  const payload = JSON.parse(body || "{}") as {
    nama?: string;
    email?: string;
    phone?: string;
    password?: string;
  };

  const localUser = await createLocalUser({
    nama: String(payload.nama || ""),
    email: String(payload.email || ""),
    phone: String(payload.phone || ""),
    password: String(payload.password || ""),
  });
  if (localUser.ok) {
    return NextResponse.json({
      ok: true,
      member_id: localUser.user.id,
      role: localUser.user.role,
    });
  }
  if (localUser.error === "Email sudah terdaftar.") {
    return NextResponse.json({ ok: false, error: localUser.error }, { status: 409 });
  }

  const base = process.env.NEXT_PUBLIC_API_BASE || process.env.API_BASE || "http://127.0.0.1:8080";
  const r = await fetch(`${base}/v1/auth/register/public`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body,
    cache: "no-store",
  });
  const text = await r.text();
  return new NextResponse(text, { status: r.status, headers: { "Content-Type": "application/json" } });
}
