import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import {
  ArrowRight,
  BadgeCheck,
  Banknote,
  CheckCircle2,
  Clock3,
  LockKeyhole,
  MessageCircle,
  ReceiptText,
  Smartphone,
  Sparkles,
  UserRound,
} from "lucide-react";
import { PijarivoTopupFinder } from "./PijarivoTopupFinder";
import { PijarivoBrandLogo } from "@/components/shared/PijarivoBrandLogo";
import { getAppServerSession } from "@/lib/server-auth";
import type { UserSession } from "@/components/user/types";

const siteTitle = "Pijarivo | Top Up Digital";
const siteDescription =
  "Pijarivo adalah website transaksi digital untuk isi pulsa, paket data, e-wallet, token listrik, game, dan PPOB dengan alur cepat dan tampilan modern.";

export const metadata: Metadata = {
  title: siteTitle,
  description: siteDescription,
  keywords: [
    "Pijarivo",
    "website isi pulsa",
    "top up pulsa online",
    "paket data",
    "e-wallet",
    "top up game",
    "PPOB",
  ],
  openGraph: {
    title: siteTitle,
    description: siteDescription,
    siteName: "Pijarivo",
    type: "website",
    images: [
      {
        url: "/pijarivo-assets/hero-topup-3d.png",
        width: 1340,
        height: 1024,
        alt: "Ilustrasi layanan digital Pijarivo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteTitle,
    description: siteDescription,
    images: ["/pijarivo-assets/hero-topup-3d.png"],
  },
};

const quickStats = [
  { label: "Produk digital", value: "250+" },
  { label: "Status jelas", value: "Real-time" },
  { label: "Alur bayar", value: "3 langkah" },
];

const steps = [
  {
    title: "Pilih layanan",
    copy: "Cari kategori yang dibutuhkan, pilih nominal, lalu lanjutkan tanpa layar yang bertele-tele.",
    icon: ReceiptText,
  },
  {
    title: "Isi tujuan",
    copy: "Nomor HP, ID pelanggan, atau user game dibuat jelas agar transaksi lebih minim salah input.",
    icon: Smartphone,
  },
  {
    title: "Pantau transaksi",
    copy: "Status sukses, diproses, atau perlu dicek ulang tampil rapi dari awal sampai akhir.",
    icon: Clock3,
  },
];

const benefits = [
  "Navigasi ringan untuk pembeli baru",
  "Tampilan siap dipakai di desktop dan mobile",
  "Cocok untuk website jualan, konter, dan reseller",
  "Riwayat transaksi mudah dibaca",
];

type SessionShape = {
  user?: UserSession;
  backendToken?: string;
};

function displayName(value?: string | null) {
  const clean = String(value || "").trim();
  return clean || "Akun";
}

export default async function PijarivoHomePage() {
  const session = (await getAppServerSession()) as SessionShape | null;
  const isLoggedIn = Boolean(session?.backendToken);
  const accountName = displayName(session?.user?.name || session?.user?.email);

  return (
    <main className="min-h-screen bg-[#f6f8f3] text-[#15201c]">
      <section className="relative isolate min-h-screen overflow-hidden bg-[#0b1615] text-white">
        <Image
          src="/pijarivo-assets/hero-topup-3d.png"
          alt="Ilustrasi transaksi digital Pijarivo"
          fill
          priority
          sizes="100vw"
          className="absolute inset-0 -z-20 object-cover object-[70%_45%] opacity-95"
        />
        <div className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,#071210_0%,#071210_34%,rgba(7,18,16,0.88)_52%,rgba(7,18,16,0.36)_76%,rgba(7,18,16,0.10)_100%)]" />
        <div className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,rgba(7,18,16,0.20)_0%,rgba(7,18,16,0)_42%,rgba(7,18,16,0.76)_100%)]" />
        <div className="absolute inset-x-0 bottom-0 -z-10 h-24 bg-linear-to-t from-[#071210] to-transparent" />

        <header className="mx-auto pt-3 sm:pt-5">
          <div className="mx-auto flex h-[70px] w-[min(1180px,calc(100%-32px))] items-center justify-between gap-4 rounded-[26px] border border-[#ead8cf] bg-white/78 px-5 shadow-[0_18px_50px_rgba(58,23,52,0.10)] backdrop-blur md:px-6">
            <Link href="/" className="flex items-center gap-3" aria-label="Pijarivo">
              <PijarivoBrandLogo tone="dark" markClassName="h-10 w-10 rounded-[14px]" wordmarkClassName="text-lg sm:text-xl" />
            </Link>

            <nav className="hidden items-center gap-7 text-sm font-black text-[#725365] md:flex">
              <a href="#topup" className="transition hover:text-[#ff583f]">Produk</a>
              <a href="#cara-beli" className="transition hover:text-[#ff583f]">Cara beli</a>
              <a href="#keunggulan" className="transition hover:text-[#ff583f]">Keunggulan</a>
              <Link href="/transaksi" className="transition hover:text-[#ff583f]">Transaksi</Link>
              {!isLoggedIn ? <Link href="/login" className="transition hover:text-[#ff583f]">Masuk</Link> : null}
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

        <div className="mx-auto grid w-[min(1180px,calc(100%-32px))] content-center gap-8 pb-24 pt-16 md:min-h-[calc(100vh-98px)] md:pb-32 md:pt-10">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-[#ffc857]/30 bg-[#ffc857]/12 px-4 py-2 text-sm font-black text-[#ffd98a] backdrop-blur">
              <Sparkles className="h-4 w-4" />
              Top up cepat dengan tampilan website yang lebih matang
            </div>
            <h1 className="mt-7 max-w-3xl text-6xl font-black leading-[0.94] tracking-normal md:text-8xl">
              Pijarivo
            </h1>
            <p className="mt-7 max-w-2xl text-lg font-semibold leading-8 text-white/76 md:text-xl md:leading-9">
              Website transaksi digital untuk pulsa, paket data, e-wallet, token listrik, game, dan PPOB. Dibuat lebih tegas, modern, dan enak dipakai dari layar kecil sampai desktop.
            </p>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Link
                href="#topup"
                className="inline-flex h-13 items-center justify-center gap-2 rounded-full bg-[#ff7a1a] px-7 text-base font-black text-[#211307] shadow-[0_22px_54px_rgba(255,122,26,0.34)] transition hover:bg-[#ffc857]"
              >
                Jelajahi produk
                <ArrowRight className="h-5 w-5" />
              </Link>
              <Link
                href="/transaksi"
                className="inline-flex h-13 items-center justify-center gap-2 rounded-full border border-white/18 bg-white/10 px-7 text-base font-black text-white backdrop-blur transition hover:bg-white/16"
              >
                Cek transaksi
              </Link>
            </div>
          </div>

          <div className="grid max-w-3xl gap-3 sm:grid-cols-3">
            {quickStats.map((item) => (
              <div key={item.label} className="rounded-[8px] border border-white/16 bg-[#071210]/70 p-4 shadow-[0_18px_42px_rgba(0,0,0,0.24)] backdrop-blur">
                <p className="text-2xl font-black text-white">{item.value}</p>
                <p className="mt-1 text-sm font-bold text-white/76">{item.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <PijarivoTopupFinder />

      <section id="cara-beli" className="bg-[#f6f8f3] py-16">
        <div className="mx-auto grid w-[min(1180px,calc(100%-32px))] gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
          <div className="lg:sticky lg:top-8">
            <p className="text-sm font-black uppercase tracking-[0.18em] text-[#178f87]">Cara beli</p>
            <h2 className="mt-3 text-4xl font-black tracking-normal text-[#15201c] md:text-5xl">
              Lebih cepat dari pilih produk sampai status transaksi.
            </h2>
            <p className="mt-5 text-base font-semibold leading-7 text-[#66746d]">
              Alur website dibuat seperti kasir digital: fokus, jelas, dan tidak terasa seperti aplikasi yang penuh menu.
            </p>
          </div>

          <div className="grid gap-4">
            {steps.map((step, index) => {
              const Icon = step.icon;
              return (
                <div key={step.title} className="grid gap-5 rounded-[8px] border border-[#d9e4dc] bg-white p-5 shadow-[0_14px_38px_rgba(14,31,25,0.06)] sm:grid-cols-[84px_1fr]">
                  <span className="grid h-16 w-16 place-items-center rounded-[8px] bg-[#10211d] text-[#ffc857]">
                    <Icon className="h-8 w-8" />
                  </span>
                  <span>
                    <span className="text-sm font-black text-[#ff6b35]">0{index + 1}</span>
                    <h3 className="mt-1 text-2xl font-black text-[#15201c]">{step.title}</h3>
                    <p className="mt-2 text-sm font-semibold leading-6 text-[#66746d]">{step.copy}</p>
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section id="keunggulan" className="bg-[#10211d] py-16 text-white">
        <div className="mx-auto grid w-[min(1180px,calc(100%-32px))] gap-8 lg:grid-cols-[1fr_0.95fr] lg:items-center">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.18em] text-[#ffc857]">Keunggulan</p>
            <h2 className="mt-3 text-4xl font-black tracking-normal md:text-5xl">Website yang terlihat niat, bukan sekadar halaman tempelan.</h2>
            <div className="mt-8 grid gap-3 sm:grid-cols-2">
              {benefits.map((benefit) => (
                <div key={benefit} className="flex items-center gap-3 rounded-[8px] border border-white/10 bg-white/7 p-4">
                  <CheckCircle2 className="h-5 w-5 shrink-0 text-[#8bd450]" />
                  <p className="text-sm font-bold leading-6 text-white/76">{benefit}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-[8px] border border-white/12 bg-[#172d27] p-5 shadow-[0_24px_70px_rgba(0,0,0,0.24)]">
            <div className="flex items-start justify-between gap-4 border-b border-white/10 pb-5">
              <div>
                <p className="text-sm font-bold text-white/58">Live monitor</p>
                <p className="mt-1 text-3xl font-black">Transaksi masuk</p>
              </div>
              <span className="grid h-12 w-12 place-items-center rounded-[8px] bg-[#ffc857] text-[#10211d]">
                <Banknote className="h-6 w-6" />
              </span>
            </div>

            <div className="mt-5 grid gap-3">
              {[
                { item: "Pulsa Telkomsel 50K", status: "Sukses", icon: BadgeCheck },
                { item: "Token PLN 100K", status: "Sukses", icon: LockKeyhole },
                { item: "Top Up E-Wallet", status: "Diproses", icon: Clock3 },
              ].map(({ item, status, icon: RowIcon }) => (
                <div key={item} className="flex items-center justify-between gap-3 rounded-[8px] bg-white px-4 py-3 text-[#15201c]">
                  <span className="flex min-w-0 items-center gap-3">
                    <RowIcon className="h-5 w-5 shrink-0 text-[#178f87]" />
                    <span className="truncate text-sm font-black">{item}</span>
                  </span>
                  <span className="shrink-0 rounded-full bg-[#e9fff2] px-3 py-1 text-xs font-black text-[#137d43]">{status}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#f6f8f3] py-14">
        <div className="mx-auto flex w-[min(1180px,calc(100%-32px))] flex-col items-start justify-between gap-5 rounded-[8px] bg-[#ff7a1a] px-6 py-7 text-[#211307] md:flex-row md:items-center md:px-8">
          <div>
            <h2 className="text-3xl font-black tracking-normal">Pijarivo siap dipakai sebagai website transaksi.</h2>
            <p className="mt-2 max-w-2xl text-sm font-bold leading-6 text-[#4f2c12]">
              Tampilan baru ini dibuat berbeda dari versi lama: lebih kuat, lebih modern, dan lebih cocok untuk brand mandiri.
            </p>
          </div>
          <Link
            href={isLoggedIn ? "/user" : "/register"}
            className="inline-flex h-12 shrink-0 items-center justify-center gap-2 rounded-full bg-[#10211d] px-6 text-sm font-black text-white"
          >
            {isLoggedIn ? "Buka akun" : "Daftar sekarang"}
            <MessageCircle className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </main>
  );
}
