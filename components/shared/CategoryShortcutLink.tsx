"use client";

import Image from "next/image";
import Link from "next/link";

type CategoryVisual = {
  iconSrc: string;
};

type CategoryShortcutLinkProps = {
  href: string;
  label: string;
  visualName: string;
};

function normalizeName(name: string) {
  return name.trim().toLowerCase();
}

function getCategoryVisual(name: string): CategoryVisual {
  const value = normalizeName(name);

  switch (value) {
    case "pulsa":
    case "pulsa data":
    case "pulsa & data":
      return { iconSrc: "/pijarivo-assets/hero-topup-3d.png" };
    case "e-money":
    case "e-wallet":
      return { iconSrc: "/pijarivo-assets/hero-topup-3d.png" };
    case "paket data":
      return { iconSrc: "/pijarivo-assets/hero-topup-3d.png" };
    case "listrik":
    case "pln":
      return { iconSrc: "/pijarivo-assets/hero-topup-3d.png" };
    case "game":
      return { iconSrc: "/pijarivo-assets/hero-topup-3d.png" };
    case "tv":
      return { iconSrc: "/pijarivo-assets/hero-topup-3d.png" };
    case "pdam":
      return { iconSrc: "/pijarivo-assets/hero-topup-3d.png" };
    case "bpjs":
      return { iconSrc: "/pijarivo-assets/hero-topup-3d.png" };
    case "internet pascabayar":
      return { iconSrc: "/pijarivo-assets/hero-topup-3d.png" };
    case "hp pascabayar":
      return { iconSrc: "/pijarivo-assets/hero-topup-3d.png" };
    case "masa aktif":
      return { iconSrc: "/pijarivo-assets/hero-topup-3d.png" };
    case "paket telepon":
    case "telepon":
      return { iconSrc: "/pijarivo-assets/hero-topup-3d.png" };
    case "sms":
      return { iconSrc: "/pijarivo-assets/hero-topup-3d.png" };
    case "voucher":
      return { iconSrc: "/pijarivo-assets/hero-topup-3d.png" };
    case "aktivasi perdana":
      return { iconSrc: "/pijarivo-assets/hero-topup-3d.png" };
    case "gas negara":
      return { iconSrc: "/pijarivo-assets/hero-topup-3d.png" };
    case "transfer bank":
      return { iconSrc: "/pijarivo-assets/hero-topup-3d.png" };
    case "qris":
    case "pembayaran qris":
      return { iconSrc: "/pijarivo-assets/hero-topup-3d.png" };
    case "uang elektronik":
      return { iconSrc: "/pijarivo-assets/hero-topup-3d.png" };
    case "kartu kredit":
      return { iconSrc: "/pijarivo-assets/hero-topup-3d.png" };
    case "asuransi":
      return { iconSrc: "/pijarivo-assets/hero-topup-3d.png" };
    case "streaming":
    case "streaming & musik":
      return { iconSrc: "/pijarivo-assets/hero-topup-3d.png" };
    case "klinik":
    case "kesehatan":
    case "klinik & kesehatan":
      return { iconSrc: "/pijarivo-assets/hero-topup-3d.png" };
    case "uang sekolah":
      return { iconSrc: "/pijarivo-assets/hero-topup-3d.png" };
    case "cicilan kendaraan":
      return { iconSrc: "/pijarivo-assets/hero-topup-3d.png" };
    case "cicilan multifinance":
      return { iconSrc: "/pijarivo-assets/hero-topup-3d.png" };
    case "pbb":
      return { iconSrc: "/pijarivo-assets/hero-topup-3d.png" };
    case "pajak":
    case "pajak & negara":
      return { iconSrc: "/pijarivo-assets/hero-topup-3d.png" };
    case "tiket":
    case "tiket perjalanan":
      return { iconSrc: "/pijarivo-assets/hero-topup-3d.png" };
    case "saldo kartu tol":
      return { iconSrc: "/pijarivo-assets/hero-topup-3d.png" };
    case "parkir digital":
      return { iconSrc: "/pijarivo-assets/hero-topup-3d.png" };
    case "kurir":
    case "pengiriman":
    case "kurir & pengiriman":
      return { iconSrc: "/pijarivo-assets/hero-topup-3d.png" };
    case "zakat":
    case "donasi":
    case "zakat & donasi":
      return { iconSrc: "/pijarivo-assets/hero-topup-3d.png" };
    case "lainnya":
      return { iconSrc: "/pijarivo-assets/hero-topup-3d.png" };
    default:
      return { iconSrc: "/pijarivo-assets/hero-topup-3d.png" };
  }
}

export function CategoryShortcutLink({ href, label, visualName }: CategoryShortcutLinkProps) {
  const visual = getCategoryVisual(visualName);

  return (
    <Link
      href={href}
      prefetch={false}
      aria-label={label}
      className="group flex min-h-[88px] min-w-0 flex-col items-center justify-start gap-1 rounded-[12px] px-0.5 py-0.5 text-center transition duration-200 hover:-translate-y-0.5"
    >
      <div className="grid aspect-square w-full max-w-14 shrink-0 place-items-center rounded-[15px] bg-white shadow-[0_8px_18px_rgba(6,43,116,0.08)] ring-1 ring-sky-100/80 transition-transform duration-200 group-hover:scale-105">
        <Image
          src={visual.iconSrc}
          alt=""
          width={50}
          height={50}
          className="object-contain drop-shadow-[0_8px_10px_rgba(22,138,242,0.10)]"
        />
      </div>
      <span className="block px-0.5">
        <span className="line-clamp-2 text-[12px] font-bold leading-4 text-[#06184f]">
          {label}
        </span>
      </span>
    </Link>
  );
}
