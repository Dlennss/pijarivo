import type { Metadata } from "next";
import { PrivacyPolicyPageContent } from "@/components/site/PrivacyPolicyPageContent";
import { CANONICAL_SITE_URL } from "@/lib/seo-articles";

const pageTitle = "Syarat & Ketentuan Pijarivo | Layanan Produk Digital";
const pageDescription =
  "Syarat dan ketentuan penggunaan Pijarivo untuk transaksi produk digital, saldo, agent, marketing, dan kredit agent.";

export const metadata: Metadata = {
  title: pageTitle,
  description: pageDescription,
  alternates: {
    canonical: `${CANONICAL_SITE_URL}/kebijakan-privasi`,
  },
  openGraph: {
    title: pageTitle,
    description: pageDescription,
    url: `${CANONICAL_SITE_URL}/kebijakan-privasi`,
    siteName: "Pijarivo",
    type: "article",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Syarat dan Ketentuan Pijarivo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: pageTitle,
    description: pageDescription,
    images: ["/twitter-image"],
  },
};

type PageProps = {
  searchParams?: Promise<{ from?: string }>;
};

export default async function KebijakanPrivasiPage({ searchParams }: PageProps) {
  const params = searchParams ? await searchParams : undefined;
  const backHref = params?.from === "account" ? "/user" : "/";
  return <PrivacyPolicyPageContent backHref={backHref} />;
}
