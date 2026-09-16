import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { getAppServerSession } from "@/lib/server-auth";
import type { UserSession } from "@/components/user/types";

export const metadata: Metadata = {
  title: "User Area - Pijarivo",
  description: "Aplikasi user untuk pembelian produk digital langsung.",
};

type SessionShape = {
  user?: UserSession;
  backendToken?: string;
};

export default async function UserLayout({ children }: { children: React.ReactNode }) {
  const session = (await getAppServerSession()) as SessionShape | null;
  const role = String(session?.user?.role || "").trim().toLowerCase();
  const isRetailRole = role === "user" || role === "agent" || role === "master" || role === "marketing";

  if (!session?.backendToken) {
    redirect("/login");
  }

  if (session?.backendToken && role && !isRetailRole) {
    redirect("/user");
  }

  return <div className="min-h-dvh bg-[#fff7f1] text-[#32172d]">{children}</div>;
}
