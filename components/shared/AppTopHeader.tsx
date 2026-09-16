"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { PijarivoBrandLogo } from "./PijarivoBrandLogo";

type AppTopHeaderProps = {
  isLoggedIn?: boolean;
  userName?: string | null;
  saldo?: number | null;
  role?: string | null;
};

export function AppTopHeader({ isLoggedIn = false, userName, saldo, role }: AppTopHeaderProps) {
  const pathname = usePathname() || "";
  const normalizedRole = String(role || "").trim().toLowerCase();
  const isRetailLoggedIn = isLoggedIn && (normalizedRole === "user" || normalizedRole === "agent" || normalizedRole === "master");
  const homeHref = isRetailLoggedIn ? "/user" : "/";
  void userName;
  void saldo;

  if (pathname === "/" || pathname === "/user" || pathname === "/transaksi") return null;

  return (
    <header className="sticky top-0 z-30 border-b border-[#ead8cf] bg-[#fff7f1]/92 px-4 py-2 text-[#32172d] shadow-[0_12px_28px_rgba(58,23,52,0.08)] backdrop-blur">
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1 bg-[linear-gradient(90deg,#3a1734,#ff583f,#ff7a1a,#ffc857)]" />
      <div className="relative flex h-12 items-center justify-between gap-3">
        <div className="flex min-w-0 flex-1 items-center">
          <Link
            href={homeHref}
            prefetch={false}
            className="inline-flex h-11 max-w-[68vw] min-w-0 items-center gap-3 rounded-[14px] bg-white/58 px-3 shadow-[0_10px_24px_rgba(58,23,52,0.06)] ring-1 ring-[#ead8cf]"
            aria-label="Pijarivo"
          >
            <PijarivoBrandLogo tone="dark" markClassName="h-8 w-8 shrink-0 rounded-[10px]" wordmarkClassName="truncate text-lg" />
          </Link>
        </div>

        <Link
          href={isLoggedIn ? "/user" : "/login?callbackUrl=%2Ftransaksi"}
          className="inline-flex h-10 shrink-0 items-center justify-center rounded-full bg-[#32172d] px-4 text-xs font-black text-white shadow-[0_12px_26px_rgba(58,23,52,0.16)] transition hover:bg-[#ff7a1a]"
        >
          {isLoggedIn ? "Akun" : "Masuk"}
        </Link>
      </div>
    </header>
  );
}
