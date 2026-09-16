"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { PijarivoBrandLogo } from "./PijarivoBrandLogo";

function SkeletonBlock({ className = "" }: { className?: string }) {
  return <div className={`animate-pulse rounded-2xl bg-slate-200/85 ${className}`} />;
}

function PijarivoLogoSkeleton({ compact = false }: { compact?: boolean }) {
  return (
    <PijarivoBrandLogo showWordmark={!compact} wordmarkClassName="text-2xl" />
  );
}

function UserSkeletonScreen() {
  return (
    <div className="fixed inset-0 z-[2147483647] bg-[#f6f8f3] text-[#15201c] md:py-4">
      <div className="relative mx-auto min-h-dvh w-full max-w-md overflow-hidden bg-[#f6f8f3] md:w-97.5 md:max-w-none">
        <div className="bg-[linear-gradient(135deg,#10211d,#10211d_58%,#ff7a1a)] px-4 pb-5 pt-4 text-white">
          <div className="flex items-center justify-between gap-3">
            <PijarivoLogoSkeleton compact />
            <div className="min-w-0 flex-1">
              <div className="text-lg font-black text-white">Pijarivo</div>
              <SkeletonBlock className="mt-2 h-3 w-40 bg-white/25" />
            </div>
            <SkeletonBlock className="h-10 w-10 rounded-2xl bg-white/30" />
          </div>
          <div className="mt-5 rounded-[26px] bg-white/12 p-4 ring-1 ring-white/15">
            <SkeletonBlock className="h-4 w-24 bg-white/30" />
            <SkeletonBlock className="mt-3 h-9 w-44 bg-white/40" />
            <SkeletonBlock className="mt-3 h-3 w-56 max-w-full bg-white/25" />
          </div>
        </div>

        <div className="space-y-4 px-4 py-5 pb-28">
          <div className="grid grid-cols-4 gap-3">
            {[0, 1, 2, 3].map((item) => (
              <div key={item} className="rounded-[22px] bg-white p-3 shadow-[0_12px_28px_rgba(15,23,42,0.06)]">
                <SkeletonBlock className="mx-auto h-10 w-10 rounded-2xl bg-[#fff0e4]" />
                <SkeletonBlock className="mx-auto mt-2 h-3 w-10 bg-slate-200" />
              </div>
            ))}
          </div>

          <section className="rounded-[28px] border border-[#d9e4dc] bg-white p-4 shadow-[0_18px_42px_rgba(14,31,25,0.08)]">
            <div className="flex items-center justify-between gap-3">
              <div>
                <SkeletonBlock className="h-4 w-24 bg-sky-100" />
                <SkeletonBlock className="mt-2 h-6 w-44" />
              </div>
              <SkeletonBlock className="h-10 w-10 rounded-2xl bg-sky-100" />
            </div>
            <div className="mt-5 grid grid-cols-2 gap-3">
              {[0, 1, 2, 3].map((item) => (
                <SkeletonBlock key={item} className="h-20 rounded-[22px] bg-[#f8fbf6]" />
              ))}
            </div>
          </section>

          {[0, 1].map((item) => (
            <section key={item} className="rounded-[28px] border border-slate-100 bg-white p-4 shadow-[0_14px_34px_rgba(15,23,42,0.05)]">
              <SkeletonBlock className="h-5 w-36" />
              <SkeletonBlock className="mt-3 h-4 w-full bg-slate-100" />
              <SkeletonBlock className="mt-2 h-4 w-3/4 bg-slate-100" />
            </section>
          ))}
        </div>

        <div className="absolute inset-x-0 bottom-0 border-t border-slate-200 bg-white/95 px-6 py-3">
          <div className="grid grid-cols-4 gap-4">
            {[0, 1, 2, 3].map((item) => (
              <SkeletonBlock key={item} className="mx-auto h-9 w-9 rounded-2xl bg-slate-200" />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function SiteSkeletonScreen() {
  return (
    <div className="fixed inset-0 z-[2147483647] overflow-hidden bg-[#0b1615] text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_78%_18%,rgba(255,122,26,0.28),transparent_28%),linear-gradient(90deg,#071210_0%,#071210_48%,rgba(7,18,16,0.68)_100%)]" />
      <div className="relative mx-auto flex min-h-dvh w-[min(1180px,calc(100%-32px))] flex-col py-5">
        <header className="flex items-center justify-between">
          <PijarivoLogoSkeleton />
          <div className="hidden items-center gap-4 rounded-full border border-white/12 bg-white/8 px-5 py-3 backdrop-blur md:flex">
            {[0, 1, 2, 3].map((item) => (
              <SkeletonBlock key={item} className="h-3 w-16 rounded-full bg-white/18" />
            ))}
          </div>
          <SkeletonBlock className="h-12 w-32 rounded-full bg-[#ff7a1a]/70" />
        </header>

        <main className="grid flex-1 content-center gap-8 py-14">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-[#ffc857]/25 bg-[#ffc857]/12 px-4 py-2">
              <SkeletonBlock className="h-4 w-4 rounded-full bg-[#ffc857]/70" />
              <span className="text-sm font-black text-[#ffd98a]">Memuat website Pijarivo</span>
            </div>
            <SkeletonBlock className="mt-7 h-20 w-[min(520px,100%)] rounded-[18px] bg-white/18 md:h-28" />
            <div className="mt-7 max-w-2xl space-y-3">
              <SkeletonBlock className="h-5 w-full bg-white/18" />
              <SkeletonBlock className="h-5 w-10/12 bg-white/14" />
              <SkeletonBlock className="h-5 w-8/12 bg-white/10" />
            </div>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <SkeletonBlock className="h-13 w-44 rounded-full bg-[#ff7a1a]/75" />
              <SkeletonBlock className="h-13 w-40 rounded-full border border-white/18 bg-white/12" />
            </div>
          </div>

          <div className="grid max-w-3xl gap-3 sm:grid-cols-3">
            {[0, 1, 2].map((item) => (
              <div key={item} className="rounded-[8px] border border-white/16 bg-[#071210]/70 p-4 shadow-[0_18px_42px_rgba(0,0,0,0.24)] backdrop-blur">
                <SkeletonBlock className="h-7 w-20 bg-white/28" />
                <SkeletonBlock className="mt-3 h-4 w-28 bg-white/16" />
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}

type PijarivoLoadingScreenProps = {
  persistent?: boolean;
};

export function PijarivoLoadingScreen({ persistent = false }: PijarivoLoadingScreenProps) {
  const pathname = usePathname();
  const firstRender = useRef(true);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    if (persistent) {
      return;
    }

    const first = firstRender.current;
    firstRender.current = false;

    const resetTimer = window.setTimeout(() => setVisible(true), 0);
    const timer = window.setTimeout(() => setVisible(false), first ? 760 : 420);
    return () => {
      window.clearTimeout(resetTimer);
      window.clearTimeout(timer);
    };
  }, [pathname, persistent]);

  if (!persistent && !visible) return null;

  if (pathname.startsWith("/user")) return <UserSkeletonScreen />;
  return <SiteSkeletonScreen />;
}
