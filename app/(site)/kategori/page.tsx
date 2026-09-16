import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowLeft,
  BadgeCheck,
  Gamepad2,
  Landmark,
  RadioTower,
  Smartphone,
  WalletCards,
  Zap,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Produk Pijarivo | Katalog Dummy Top Up dan PPOB",
  description:
    "Katalog dummy Pijarivo untuk pulsa, paket data, e-wallet, token listrik, game, dan PPOB.",
};

const productGroups = [
  {
    id: "pulsa",
    title: "Pulsa Reguler",
    subtitle: "Nominal cepat untuk semua operator",
    icon: Smartphone,
    accent: "#ff6b35",
    items: [
      { name: "Pulsa 10.000", provider: "Pijarivo Mobile", price: "Rp 11.250", status: "Aktif" },
      { name: "Pulsa 25.000", provider: "Pijarivo Mobile", price: "Rp 26.300", status: "Aktif" },
      { name: "Pulsa 50.000", provider: "Pijarivo Mobile", price: "Rp 51.200", status: "Aktif" },
    ],
  },
  {
    id: "data",
    title: "Paket Data",
    subtitle: "Kuota harian, mingguan, dan bulanan",
    icon: RadioTower,
    accent: "#17bebb",
    items: [
      { name: "Data 3GB 7 Hari", provider: "Pijarivo Net", price: "Rp 18.500", status: "Promo" },
      { name: "Data 8GB 30 Hari", provider: "Pijarivo Net", price: "Rp 42.000", status: "Aktif" },
      { name: "Data Unlimited Lite", provider: "Pijarivo Net", price: "Rp 67.500", status: "Aktif" },
    ],
  },
  {
    id: "ewallet",
    title: "Saldo E-Wallet",
    subtitle: "Top up dompet digital dummy",
    icon: WalletCards,
    accent: "#ffc857",
    items: [
      { name: "Saldo Wallet 20K", provider: "PijariPay", price: "Rp 20.750", status: "Aktif" },
      { name: "Saldo Wallet 50K", provider: "PijariPay", price: "Rp 50.800", status: "Aktif" },
      { name: "Saldo Wallet 100K", provider: "PijariPay", price: "Rp 100.900", status: "Aktif" },
    ],
  },
  {
    id: "pln",
    title: "Token Listrik",
    subtitle: "Token PLN dan tagihan dummy",
    icon: Zap,
    accent: "#8bd450",
    items: [
      { name: "Token 20.000", provider: "Pijarivo Energy", price: "Rp 21.100", status: "Aktif" },
      { name: "Token 50.000", provider: "Pijarivo Energy", price: "Rp 51.400", status: "Aktif" },
      { name: "Token 100.000", provider: "Pijarivo Energy", price: "Rp 101.700", status: "Aktif" },
    ],
  },
  {
    id: "game",
    title: "Top Up Game",
    subtitle: "Voucher game populer versi dummy",
    icon: Gamepad2,
    accent: "#ff4f81",
    items: [
      { name: "Diamond 86", provider: "Pijari Games", price: "Rp 21.900", status: "Aktif" },
      { name: "UC Pack 60", provider: "Pijari Games", price: "Rp 14.500", status: "Aktif" },
      { name: "Voucher Battle 100", provider: "Pijari Games", price: "Rp 29.000", status: "Promo" },
    ],
  },
  {
    id: "ppob",
    title: "PPOB Rumah",
    subtitle: "Tagihan bulanan dan pembayaran rutin",
    icon: Landmark,
    accent: "#7c5cff",
    items: [
      { name: "BPJS Keluarga", provider: "Pijarivo Bills", price: "Cek tagihan", status: "Aktif" },
      { name: "PDAM Kota", provider: "Pijarivo Bills", price: "Cek tagihan", status: "Aktif" },
      { name: "Internet Rumah", provider: "Pijarivo Bills", price: "Cek tagihan", status: "Aktif" },
    ],
  },
];

export default function PijarivoKategoriPage() {
  return (
    <main className="min-h-screen bg-[#f6f8f3] text-[#15201c]">
      <section className="bg-[#071210] px-4 pb-20 pt-10 text-white">
        <div className="mx-auto w-[min(1180px,100%)]">
          <Link href="/" className="inline-flex items-center gap-2 text-sm font-black text-white/74 hover:text-white">
            <ArrowLeft className="h-4 w-4" />
            Kembali ke beranda
          </Link>

          <div className="mt-10 grid gap-6 lg:grid-cols-[1fr_0.65fr] lg:items-end">
            <div>
              <p className="text-sm font-black uppercase tracking-[0.18em] text-[#ffc857]">Produk dummy</p>
              <h1 className="mt-3 max-w-3xl text-5xl font-black leading-tight tracking-normal md:text-7xl">
                Katalog Pijarivo
              </h1>
              <p className="mt-5 max-w-2xl text-base font-semibold leading-7 text-white/70 md:text-lg">
                Semua item di halaman ini adalah data dummy untuk kebutuhan tampilan website. Nama provider, harga, dan status dibuat khusus untuk Pijarivo.
              </p>
            </div>

            <div className="rounded-[8px] border border-white/12 bg-white/8 p-5 backdrop-blur">
              <div className="flex items-center gap-3">
                <span className="grid h-11 w-11 place-items-center rounded-[8px] bg-[#ff7a1a] text-[#211307]">
                  <BadgeCheck className="h-6 w-6" />
                </span>
                <div>
                  <p className="text-2xl font-black">18 produk</p>
                  <p className="text-sm font-bold text-white/62">Tersedia dalam 6 kategori dummy</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="relative -mt-10 px-4 pb-16">
        <div className="mx-auto grid w-[min(1180px,100%)] gap-4 lg:grid-cols-2">
          {productGroups.map((group) => {
            const Icon = group.icon;
            return (
              <article
                key={group.id}
                id={group.id}
                className="rounded-[8px] border border-[#d9e4dc] bg-white p-5 shadow-[0_18px_50px_rgba(14,31,25,0.08)]"
              >
                <div className="flex items-start gap-4">
                  <span className="grid h-14 w-14 shrink-0 place-items-center rounded-[8px] bg-[#f8fbf6]" style={{ color: group.accent }}>
                    <Icon className="h-7 w-7" strokeWidth={2.5} />
                  </span>
                  <div>
                    <h2 className="text-2xl font-black tracking-normal">{group.title}</h2>
                    <p className="mt-1 text-sm font-semibold text-[#66746d]">{group.subtitle}</p>
                  </div>
                </div>

                <div className="mt-5 overflow-hidden rounded-[8px] border border-[#e5ece7]">
                  {group.items.map((item) => (
                    <div key={item.name} className="grid gap-3 border-b border-[#e5ece7] bg-[#fbfdf9] p-4 last:border-b-0 sm:grid-cols-[1fr_auto] sm:items-center">
                      <div>
                        <p className="font-black text-[#15201c]">{item.name}</p>
                        <p className="mt-1 text-sm font-semibold text-[#66746d]">{item.provider}</p>
                      </div>
                      <div className="flex items-center justify-between gap-3 sm:justify-end">
                        <span className="font-black text-[#15201c]">{item.price}</span>
                        <span className="rounded-full bg-[#e9fff2] px-3 py-1 text-xs font-black text-[#137d43]">
                          {item.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </article>
            );
          })}
        </div>
      </section>
    </main>
  );
}
