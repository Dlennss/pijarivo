import Link from "next/link";
import { ReceiptText, RefreshCw, Smartphone, Timer, UserRound } from "lucide-react";
import { getAppServerSession } from "@/lib/server-auth";
import { getUserProfile } from "@/lib/api.auth";
import type { UserSession } from "@/components/user/types";
import { PijarivoBrandLogo } from "@/components/shared/PijarivoBrandLogo";
import { UserLogoutButton } from "@/components/user/UserLogoutButton";

type SessionShape = {
  user?: UserSession;
  backendToken?: string;
};

function displayName(value?: string | null) {
  const clean = String(value || "").trim();
  return clean || "pengguna";
}

export default async function UserAccountHomePage() {
  const session = (await getAppServerSession()) as SessionShape | null;
  const profile = session?.backendToken ? await getUserProfile(session.backendToken) : null;
  const name = displayName(profile?.nama || session?.user?.name || session?.user?.email);
  const memberId = Number(profile?.id || 1);

  const stats = [
    { label: "Transaksi terbaru", value: "0", icon: ReceiptText },
    { label: "Berhasil", value: "0", icon: Smartphone },
    { label: "Dalam proses", value: "0", icon: Timer },
    { label: "ID member", value: `#${String(memberId).padStart(4, "0")}`, icon: UserRound },
  ];

  return (
    <main className="min-h-screen overflow-hidden bg-[#fff7f1] text-[#32172d]">
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(circle_at_5%_4%,rgba(255,88,63,0.14),transparent_30%),radial-gradient(circle_at_88%_8%,rgba(255,200,87,0.34),transparent_30%),linear-gradient(120deg,#fff7f1_0%,#fffaf6_50%,#f9fff8_100%)]" />

      <header className="relative mx-auto pt-3 sm:pt-5">
        <div className="mx-auto flex h-[70px] w-[min(1180px,calc(100%-32px))] items-center justify-between gap-4 rounded-[26px] border border-[#ead8cf] bg-white/78 px-5 shadow-[0_18px_50px_rgba(58,23,52,0.10)] backdrop-blur md:px-6">
          <Link href="/" className="flex items-center gap-3" aria-label="Pijarivo">
            <PijarivoBrandLogo tone="dark" markClassName="h-10 w-10 rounded-[14px]" wordmarkClassName="text-lg sm:text-xl" />
          </Link>

          <nav className="hidden items-center gap-7 text-sm font-black text-[#725365] md:flex">
            <Link href="/#topup" className="transition hover:text-[#ff583f]">Produk</Link>
            <Link href="/#cara-beli" className="transition hover:text-[#ff583f]">Cara beli</Link>
            <Link href="/#keunggulan" className="transition hover:text-[#ff583f]">Keunggulan</Link>
            <Link href="/transaksi" className="transition hover:text-[#ff583f]">Transaksi</Link>
          </nav>

          <div className="inline-flex h-11 max-w-[42vw] items-center gap-2 rounded-full bg-[#3a1734] px-4 text-sm font-black text-white shadow-[0_14px_32px_rgba(58,23,52,0.18)]">
            <UserRound className="h-4 w-4 shrink-0" />
            <span className="truncate">{name}</span>
          </div>
        </div>
      </header>

      <section className="relative mx-auto w-[min(1180px,calc(100%-32px))] pb-16 pt-18 md:pt-22">
        <div className="flex flex-col gap-8 border-b border-[#ead8cf] pb-10 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.20em] text-[#ff583f]">Akun Pijarivo</p>
            <h1 className="mt-5 text-[clamp(3rem,7vw,5.4rem)] font-black leading-[0.98] tracking-normal text-[#3a1734]">
              Halo, {name}!
            </h1>
            <p className="mt-5 max-w-2xl text-base font-semibold leading-8 text-[#876579]">
              Pantau transaksi dan lanjutkan top up dari satu tempat.
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            <Link
              href="/#topup"
              className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-[linear-gradient(90deg,#ff583f,#ff7a1a,#ff9f1c)] px-6 text-sm font-black text-white shadow-[0_18px_42px_rgba(255,122,26,0.24)]"
            >
              <Smartphone className="h-4 w-4" />
              Top up lagi
            </Link>
            <UserLogoutButton className="h-12 rounded-full border border-[#ead8cf] bg-white px-6 text-sm font-black text-[#3a1734] shadow-none hover:bg-[#fffaf6]" />
          </div>
        </div>

        <div className="mt-7 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
          {stats.map((item) => {
            const Icon = item.icon;
            return (
              <div key={item.label} className="flex min-h-[84px] items-center gap-4 rounded-[18px] border border-[#ead8cf] bg-white/78 p-5 shadow-[0_14px_34px_rgba(58,23,52,0.06)] backdrop-blur">
                <span className="grid h-12 w-12 shrink-0 place-items-center rounded-[14px] bg-[#fff0e4] text-[#ff583f]">
                  <Icon className="h-5 w-5" />
                </span>
                <div className="min-w-0">
                  <p className="truncate text-2xl font-black text-[#3a1734]">{item.value}</p>
                  <p className="mt-1 text-xs font-semibold text-[#876579]">{item.label}</p>
                </div>
              </div>
            );
          })}
        </div>

        <section className="mt-7 overflow-hidden rounded-[26px] border border-[#ead8cf] bg-white/78 shadow-[0_18px_54px_rgba(58,23,52,0.08)] backdrop-blur">
          <div className="flex flex-col gap-4 border-b border-[#ead8cf] px-6 py-7 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm font-black uppercase tracking-[0.18em] text-[#ff583f]">Aktivitas akun</p>
              <h2 className="mt-2 text-3xl font-black tracking-normal text-[#3a1734]">Riwayat transaksi</h2>
            </div>
            <button type="button" className="inline-flex h-11 items-center justify-center gap-2 rounded-full px-4 text-sm font-black text-[#ff583f] transition hover:bg-[#fff0e4]">
              <RefreshCw className="h-4 w-4" />
              Perbarui
            </button>
          </div>

          <div className="grid min-h-[260px] place-items-center px-6 py-12 text-center">
            <div>
              <span className="mx-auto grid h-16 w-16 place-items-center rounded-[18px] bg-[#fff0e4] text-[#ff583f]">
                <ReceiptText className="h-8 w-8" />
              </span>
              <h3 className="mt-5 text-xl font-black text-[#3a1734]">Belum ada transaksi</h3>
              <p className="mt-2 text-sm font-semibold text-[#876579]">Riwayat pembelian kamu masih kosong.</p>
              <Link href="/#topup" className="mt-6 inline-flex h-11 items-center justify-center rounded-full bg-[#32172d] px-5 text-sm font-black text-white">
                Lihat layanan
              </Link>
            </div>
          </div>
        </section>
      </section>
    </main>
  );
}
