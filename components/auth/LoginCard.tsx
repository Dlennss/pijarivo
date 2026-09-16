"use client";

import { useEffect, useState, type FormEvent } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { signIn } from "next-auth/react";
import { ArrowRight, CheckCircle2, Eye, EyeOff, LockKeyhole, Mail, ShieldCheck } from "lucide-react";
import TurnstileWidget from "@/components/TurnstileWidget";
import { decodeJwt } from "@/lib/jwt";
import { PijarivoBrandLogo } from "@/components/shared/PijarivoBrandLogo";

const SITE_KEY = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY || "";
const TURNSTILE_ENABLED = /^(1|true|yes|on)$/i.test(process.env.NEXT_PUBLIC_TURNSTILE_ENABLED || "");
const GOOGLE_LOGIN_ENABLED = String(process.env.NEXT_PUBLIC_GOOGLE_LOGIN_ENABLED ?? "true").toLowerCase() === "true";

type PasswordLoginResp = { ok?: boolean; token?: string; role?: string; error?: string };
type GoogleStatusResp = { ok?: boolean; enabled?: boolean; configured?: boolean };

function cn(...v: Array<string | false | null | undefined>) {
  return v.filter(Boolean).join(" ");
}

async function persistLoginToken(token: string) {
  const response = await fetch("/api/auth/persist", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify({ token }),
    cache: "no-store",
  }).catch(() => null);

  return Boolean(response?.ok);
}

function normalizeGoogleNext(raw: string, fallback = "/user") {
  let current = (raw || "").trim() || fallback;
  for (let i = 0; i < 6; i += 1) {
    try {
      const url = current.startsWith("http://") || current.startsWith("https://")
        ? new URL(current)
        : new URL(current, "https://pijarivo.local");
      if (url.pathname === "/login") {
        const nested = (url.searchParams.get("callbackUrl") || "").trim();
        if (nested) { current = nested; continue; }
      }
      if (url.pathname === "/auth/google/complete") {
        const nested = (url.searchParams.get("next") || "").trim();
        if (nested) { current = nested; continue; }
      }
      return `${url.pathname}${url.search}${url.hash}` || fallback;
    } catch {
      return current.startsWith("/") ? current : fallback;
    }
  }
  return current.startsWith("/") ? current : fallback;
}

function toDashboardByRole(role?: string | null) {
  void role;
  return "/user";
}

export function LoginCard() {
  const searchParams = useSearchParams();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember] = useState(true);
  const [turnstileToken, setTurnstileToken] = useState("");
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");
  const [googleAvailable, setGoogleAvailable] = useState(false);
  const [shake, setShake] = useState(false);
  const loginCallbackUrl = normalizeGoogleNext((searchParams.get("callbackUrl") || "").trim(), "/user");
  const googleCallbackUrl = `/auth/google/complete?${new URLSearchParams({ next: loginCallbackUrl }).toString()}`;
  const canUseGoogleLogin = GOOGLE_LOGIN_ENABLED && googleAvailable && !loading;

  useEffect(() => {
    setTurnstileToken(TURNSTILE_ENABLED ? "" : "dev-bypass");
  }, []);

  useEffect(() => {
    if (!GOOGLE_LOGIN_ENABLED) return;
    void (async () => {
      const response = await fetch("/api/auth/google-status", { cache: "no-store" }).catch(() => null);
      if (!response?.ok) {
        setGoogleAvailable(false);
        return;
      }
      const body = (await response.json().catch(() => ({}))) as GoogleStatusResp;
      setGoogleAvailable(Boolean(body.ok && body.enabled && body.configured));
    })();
  }, []);

  useEffect(() => {
    if (!err) return;
    setShake(true);
    const t = setTimeout(() => setShake(false), 520);
    return () => clearTimeout(t);
  }, [err]);

  useEffect(() => {
    const googleStatus = (searchParams.get("google") || "").trim();
    const authError = (searchParams.get("error") || "").trim();
    if (googleStatus === "not_configured") {
      setErr("Login Google belum tersambung. Isi Client ID dan Client Secret Google terlebih dulu.");
      return;
    }
    if (authError) {
      setErr("Login Google gagal atau dibatalkan. Coba masuk ulang.");
    }
  }, [searchParams]);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setErr("");
    if (TURNSTILE_ENABLED && !turnstileToken) {
      setErr("Selesaikan verifikasi keamanan.");
      return;
    }
    setLoading(true);
    try {
      const loginResponse = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ email, password, turnstileToken }),
        cache: "no-store",
      });
      const loginBody = (await loginResponse.json().catch(() => ({}))) as PasswordLoginResp;
      const backendToken = String(loginBody.token || "").trim();
      if (!loginResponse.ok || !loginBody.ok || !backendToken) {
        setErr(loginResponse.status === 429 || loginResponse.status === 503
          ? loginBody.error || "Layanan login sedang tidak tersedia. Coba lagi nanti."
          : "Email atau password salah.");
        return;
      }

      if (!(await persistLoginToken(backendToken))) {
        setErr("Sesi login belum tersimpan. Silakan coba lagi.");
        return;
      }

      localStorage.setItem("auth_token", backendToken);
      localStorage.setItem("auth_source", "password");

      // `/api/auth/login` sudah membuat cookie HttpOnly dan mengembalikan token
      // backend. Jangan jalankan login NextAuth kedua karena dua perubahan sesi
      // bersamaan memicu kedipan/navigasi ganda terutama di Safari mobile.
      window.location.replace(toDashboardByRole(loginBody.role || decodeJwt(backendToken)?.role || "member"));
    } catch {
      setErr("Koneksi login gagal. Periksa jaringan lalu coba lagi.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className={cn("min-h-svh overflow-hidden bg-[#fff7f1] text-[#32172d]", shake && "auth-shake")}>
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(circle_at_8%_8%,rgba(255,122,26,0.18),transparent_30%),radial-gradient(circle_at_88%_18%,rgba(255,200,87,0.30),transparent_28%),linear-gradient(120deg,#fff7f1_0%,#fffaf6_52%,#f7fff8_100%)]" />
      <div className="relative mx-auto grid min-h-svh w-[min(1180px,calc(100%-32px))] gap-8 py-6 lg:grid-cols-[minmax(0,1fr)_minmax(420px,0.92fr)] lg:items-center lg:py-10">
        <div className="flex min-h-0 flex-col justify-between py-4 lg:min-h-[520px]">
          <Link href="/" className="inline-flex w-fit items-center gap-3" aria-label="Pijarivo">
            <PijarivoBrandLogo tone="dark" wordmarkClassName="text-2xl" />
          </Link>

          <div className="max-w-[620px] py-8 lg:py-10">
            <p className="text-sm font-black uppercase tracking-[0.24em] text-[#ff583f]">Selamat datang kembali</p>
            <h1 className="mt-6 text-[clamp(2.6rem,8vw,4.8rem)] font-black leading-[1.05] tracking-normal text-[#3a1734] lg:mt-8 lg:text-[clamp(3.5rem,5vw,5.6rem)]">
              Masuk dan lanjutkan top up-mu.
            </h1>
            <p className="mt-7 max-w-xl text-base font-semibold leading-8 text-[#876579]">
              Gunakan akun Pijarivo untuk melanjutkan transaksi, cek status pesanan, dan mengelola kebutuhan digitalmu dengan aman.
            </p>

            <div className="mt-9 grid gap-4 text-sm font-semibold text-[#876579]">
              {["Riwayat transaksi tersimpan rapi", "Pembayaran saldo dan produk digital", "Sesi terenkripsi dan lebih aman"].map((item) => (
                <div key={item} className="flex items-center gap-3">
                  <CheckCircle2 className="h-5 w-5 shrink-0 text-[#ff583f]" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          <p className="hidden text-xs font-bold uppercase tracking-[0.22em] text-[#b99baa] lg:block">Pijarivo digital transaction website</p>
        </div>

        <div className="relative min-w-0">
          <div className="absolute -inset-4 rounded-[44px] bg-white/42 blur-2xl" />
          <div className="relative rounded-[28px] border border-[#f1dcd2] bg-white/88 p-5 shadow-[0_30px_90px_rgba(58,23,52,0.12)] backdrop-blur sm:rounded-[34px] md:p-8 lg:p-10">
            <div className="flex items-start gap-4">
              <span className="grid h-14 w-14 shrink-0 place-items-center rounded-[16px] bg-[#ff7a1a] text-white shadow-[0_16px_34px_rgba(255,122,26,0.26)]">
                <LockKeyhole className="h-7 w-7" />
              </span>
              <div>
                <h2 className="text-3xl font-black leading-none tracking-normal text-[#3a1734] sm:text-5xl">Masuk ke akun</h2>
                <p className="mt-3 text-sm font-semibold text-[#876579]">Gunakan akun Pijarivo yang sudah terdaftar.</p>
              </div>
            </div>

            {err && (
              <div className="mt-7 flex items-start gap-3 rounded-[18px] border border-[#ffc8b9] bg-[#fff1ea] px-4 py-3">
                <div className="mt-1 h-2 w-2 shrink-0 rounded-full bg-[#ff583f]" />
                <p className="text-sm font-semibold text-[#8e2d23]">{err}</p>
              </div>
            )}

            <form onSubmit={onSubmit} className="mt-8 space-y-5">
              <div>
                <label className="text-sm font-black text-[#3a1734]">Email / Username</label>
                <div className="mt-2 flex min-h-[58px] items-center gap-3 rounded-[16px] border border-[#ead8cf] bg-[#fffaf6] px-4 transition focus-within:border-[#ff7a1a] focus-within:ring-4 focus-within:ring-[#ff7a1a]/12">
                  <Mail className="h-5 w-5 shrink-0 text-[#ff583f]" />
                  <input
                    className="h-10 w-full min-w-0 bg-transparent text-base font-bold text-[#3a1734] outline-none placeholder:text-sm placeholder:font-bold placeholder:text-[#8f7d83]"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="contoh: user@gmail.com"
                    autoComplete="username"
                    type="text"
                  />
                </div>
                <p className="mt-2 text-xs font-semibold text-[#876579]">Masukkan email yang terhubung dengan akun Pijarivo.</p>
              </div>

              <div>
                <label className="text-sm font-black text-[#3a1734]">Password</label>
                <div className="relative mt-2 flex min-h-[58px] items-center gap-3 rounded-[16px] border border-[#ead8cf] bg-[#fffaf6] px-4 transition focus-within:border-[#ff7a1a] focus-within:ring-4 focus-within:ring-[#ff7a1a]/12">
                  <LockKeyhole className="h-5 w-5 shrink-0 text-[#ff583f]" />
                  <input
                    className="h-10 w-full min-w-0 bg-transparent pr-10 text-base font-bold text-[#3a1734] outline-none placeholder:text-sm placeholder:font-bold placeholder:text-[#8f7d83]"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Minimal 8 karakter"
                    autoComplete="current-password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 rounded-lg p-1.5 text-[#876579] transition hover:bg-[#fff0e4] hover:text-[#3a1734]"
                    tabIndex={-1}
                    aria-label={showPassword ? "Sembunyikan password" : "Tampilkan password"}
                  >
                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between gap-4">
                <label className="flex items-center gap-3 text-sm font-bold text-[#725365]">
                  <input
                    type="checkbox"
                    checked={remember}
                    onChange={(event) => setRemember(event.target.checked)}
                    className="h-5 w-5 rounded border-[#ead8cf] accent-[#ff7a1a]"
                  />
                  Ingat saya
                </label>
                <Link href="#" className="text-sm font-black text-[#ff583f] hover:underline">
                  Lupa password?
                </Link>
              </div>

              {TURNSTILE_ENABLED && !turnstileToken && (
                <div className="overflow-hidden rounded-xl">
                  <TurnstileWidget
                    siteKey={SITE_KEY}
                    onToken={setTurnstileToken}
                    onExpire={() => setTurnstileToken("")}
                    onError={() => setTurnstileToken("")}
                    appearance="interaction-only"
                  />
                </div>
              )}

              <button
                className="group flex h-[56px] w-full items-center justify-center gap-3 rounded-full bg-[linear-gradient(90deg,#ff583f_0%,#ff7a1a_58%,#ff9f1c_100%)] text-base font-black text-white shadow-[0_18px_42px_rgba(255,122,26,0.28)] transition hover:brightness-105 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60"
                disabled={(TURNSTILE_ENABLED && !turnstileToken) || loading}
                type="submit"
              >
                {loading ? (
                  <>
                    <div className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                    <span>Memproses...</span>
                  </>
                ) : (
                  <>
                    <span>Masuk sekarang</span>
                    <ArrowRight className="h-5 w-5 transition group-hover:translate-x-1" />
                  </>
                )}
              </button>

              <p className="text-center text-sm font-semibold text-[#876579]">
                Belum punya akun?{" "}
                <Link href="/register" className="font-black text-[#ff583f] hover:underline">
                  Daftar gratis
                </Link>
              </p>

              <div className="flex items-center gap-4">
                <div className="h-px flex-1 bg-[#ead8cf]" />
                <span className="text-xs font-black uppercase tracking-[0.18em] text-[#b99baa]">atau</span>
                <div className="h-px flex-1 bg-[#ead8cf]" />
              </div>

              <button
                type="button"
                className="flex h-[54px] w-full items-center justify-center gap-3 rounded-full border border-[#ead8cf] bg-white text-sm font-black text-[#3a1734] shadow-[0_10px_24px_rgba(58,23,52,0.05)] transition hover:bg-[#fffaf6] active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60"
                disabled={!canUseGoogleLogin}
                onClick={() => {
                  if (!canUseGoogleLogin) {
                    setErr(GOOGLE_LOGIN_ENABLED ? "Login Google belum dikonfigurasi." : "Login Google belum aktif.");
                    return;
                  }
                  void signIn("google", { callbackUrl: googleCallbackUrl });
                }}
              >
                <Image src="/google.svg" alt="" width={22} height={22} aria-hidden="true" />
                {googleAvailable ? "Masuk dengan Google" : "Google belum dikonfigurasi"}
              </button>
            </form>

            <div className="mt-7 border-t border-[#ead8cf] pt-5">
              <p className="flex items-center justify-center gap-2 text-center text-xs font-semibold leading-5 text-[#876579]">
                <ShieldCheck className="h-4 w-4 shrink-0 text-[#ff583f]" />
                Dilindungi sesi terenkripsi dan cookie HTTP-only.
              </p>
            </div>
          </div>

          <p className="px-8 pt-6 text-center text-sm font-semibold leading-6 text-[#876579]">
            Dengan masuk, Anda menyetujui{" "}
            <Link href="/privacy-policy" className="font-black text-[#ff583f]">
              Syarat & Ketentuan
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
}
