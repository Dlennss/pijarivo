import Link from "next/link";
import { ArrowRight, ReceiptText, ShieldCheck, UserRound } from "lucide-react";
import type { UserSession } from "@/components/user/types";
import { PijarivoBrandLogo } from "@/components/shared/PijarivoBrandLogo";
import { getAppServerSession } from "@/lib/server-auth";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Transaksi",
  description: "Masuk ke akun Pijarivo untuk melihat riwayat top up dan status transaksi.",
};

type SessionShape = {
  user?: UserSession;
  backendToken?: string;
};

export default async function GuestTransactionsPage() {
  const session = (await getAppServerSession()) as SessionShape | null;
  const isLoggedIn = Boolean(session?.backendToken);
  const accountName = String(session?.user?.name || session?.user?.email || "Akun").trim();

  if (isLoggedIn) {
    return (
      <main className="min-h-screen bg-[#fff7f1] text-[#32172d]">
        <div className="mx-auto flex min-h-screen w-[min(920px,calc(100%-32px))] flex-col items-center justify-center py-16 text-center">
          <PijarivoBrandLogo tone="dark" wordmarkClassName="text-2xl" />
          <div className="mt-10 grid h-18 w-18 place-items-center rounded-[22px] bg-[linear-gradient(135deg,#ff4f3e,#ff7a1a,#ffc857)] text-white shadow-[0_18px_42px_rgba(255,122,26,0.28)]">
            <ReceiptText className="h-9 w-9" />
          </div>
          <h1 className="mt-7 text-4xl font-black leading-tight tracking-normal sm:text-6xl">
            Lihat riwayat transaksimu.
          </h1>
          <p className="mt-4 max-w-xl text-base font-semibold leading-7 text-[#876579]">
            Akunmu sudah aktif. Buka area akun untuk melihat daftar top up, pembayaran, dan status pesanan.
          </p>
          <Link
            href="/user"
            className="mt-8 inline-flex h-13 items-center justify-center gap-2 rounded-full bg-[linear-gradient(90deg,#ff583f,#ff7a1a,#ff9f1c)] px-7 text-base font-black text-white shadow-[0_18px_42px_rgba(255,122,26,0.28)] transition hover:brightness-105"
          >
            Buka akun
            <ArrowRight className="h-5 w-5" />
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#fff4ec] text-[#32172d]">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_14%_12%,rgba(255,88,63,0.32),transparent_32%),radial-gradient(circle_at_84%_20%,rgba(255,159,28,0.38),transparent_30%),radial-gradient(circle_at_50%_88%,rgba(23,143,135,0.16),transparent_34%),linear-gradient(135deg,#fff1e7_0%,#fffaf4_46%,#f4fff8_100%)]" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-1 bg-[linear-gradient(90deg,#3a1734,#ff583f,#ff7a1a,#ffc857)]" />
      <div className="pointer-events-none absolute left-[-140px] top-24 h-80 w-80 rounded-full bg-[#ff583f]/18 blur-3xl" />
      <div className="pointer-events-none absolute right-[-120px] top-10 h-96 w-96 rounded-full bg-[#ff9f1c]/22 blur-3xl" />
      <header className="relative mx-auto pt-3 sm:pt-5">
        <div className="mx-auto flex h-[70px] w-[min(1180px,calc(100%-32px))] items-center justify-between gap-4 rounded-[26px] border border-[#ead8cf] bg-white/78 px-5 shadow-[0_18px_50px_rgba(58,23,52,0.10)] backdrop-blur md:px-6">
          <Link href="/" aria-label="Pijarivo">
            <PijarivoBrandLogo tone="dark" markClassName="h-10 w-10 rounded-[14px]" wordmarkClassName="text-lg sm:text-xl" />
          </Link>

          <nav className="hidden items-center gap-7 text-sm font-black text-[#725365] md:flex">
            <Link href="/#topup" className="transition hover:text-[#ff583f]">Produk</Link>
            <Link href="/#cara-beli" className="transition hover:text-[#ff583f]">Cara beli</Link>
            <Link href="/#keunggulan" className="transition hover:text-[#ff583f]">Keunggulan</Link>
            <Link href="/transaksi" className="text-[#3a1734]">Transaksi</Link>
            {!isLoggedIn ? <Link href="/login?callbackUrl=%2Ftransaksi" className="transition hover:text-[#ff583f]">Masuk</Link> : null}
          </nav>

          <Link
            href={isLoggedIn ? "/user" : "/register"}
            className={
              isLoggedIn
                ? "inline-flex h-11 max-w-[42vw] shrink-0 items-center justify-center gap-2 rounded-full bg-[#3a1734] px-5 text-sm font-black text-white shadow-[0_14px_32px_rgba(58,23,52,0.18)] ring-1 ring-[#3a1734]/10 transition hover:bg-[#ff583f]"
                : "inline-flex h-11 shrink-0 items-center justify-center rounded-full bg-[linear-gradient(90deg,#ff583f,#ff7a1a,#ff9f1c)] px-5 text-sm font-black text-white shadow-[0_14px_32px_rgba(255,122,26,0.24)] transition hover:brightness-105"
            }
          >
            {isLoggedIn ? (
              <>
                <UserRound className="h-4 w-4 shrink-0" />
                <span className="truncate">{accountName}</span>
              </>
            ) : "Daftar gratis"}
          </Link>
        </div>
      </header>

      <div className="relative mx-auto flex min-h-[calc(100vh-98px)] w-[min(1040px,calc(100%-32px))] flex-col items-center justify-center pb-20 pt-10 text-center">
        <div className="px-5 py-8 md:px-12 md:py-12">
        <div className="mx-auto grid h-20 w-20 place-items-center rounded-[24px] bg-[linear-gradient(135deg,#ff4f3e_0%,#ff7a1a_55%,#ffc857_100%)] text-white shadow-[0_18px_42px_rgba(255,122,26,0.36)]">
          <UserRound className="h-10 w-10" />
        </div>

        <h1 className="mt-8 max-w-4xl text-5xl font-black leading-[1.04] tracking-normal text-[#3a1734] sm:text-6xl lg:text-7xl">
          Masuk untuk melihat akun
        </h1>
        <p className="mt-5 max-w-xl text-base font-semibold leading-7 text-[#876579]">
          Riwayat top up Pijarivo tersimpan aman di akunmu.
        </p>

        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link
            href="/login?callbackUrl=%2Ftransaksi"
            className="inline-flex h-13 items-center justify-center gap-2 rounded-full bg-[linear-gradient(90deg,#ff583f,#ff7a1a,#ff9f1c)] px-7 text-base font-black text-white shadow-[0_18px_42px_rgba(255,122,26,0.28)] transition hover:brightness-105"
          >
            Masuk
            <ArrowRight className="h-5 w-5" />
          </Link>
          <Link
            href="/register"
            className="inline-flex h-13 items-center justify-center rounded-full border border-[#ead8cf] bg-white/70 px-7 text-base font-black text-[#3a1734] shadow-[0_12px_30px_rgba(58,23,52,0.06)] backdrop-blur transition hover:bg-white"
          >
            Daftar gratis
          </Link>
        </div>

        <div className="mt-10 flex items-center gap-2 rounded-full border border-[#ead8cf] bg-white/58 px-4 py-2 text-sm font-bold text-[#876579] shadow-[0_10px_28px_rgba(58,23,52,0.05)] backdrop-blur">
          <ShieldCheck className="h-4 w-4 text-[#ff583f]" />
          Status transaksi hanya ditampilkan setelah masuk.
        </div>
        </div>
      </div>
    </main>
  );
}
