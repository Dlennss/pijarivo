import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/nextauth";
import { isJwtValid } from "@/lib/jwt";
import { RegisterCard } from "@/components/auth/RegisterCard";
import { BackgroundAuth } from "@/components/auth/BackgroundAuth";

type SessionShape = { backendToken?: string; user?: { role?: string } };

export default async function RegisterPage() {
  const session = (await getServerSession(authOptions)) as SessionShape | null;
  const isValid = isJwtValid(session?.backendToken);
  if (session?.backendToken && isValid) {
    redirect("/user");
  }

  return (
    <BackgroundAuth variant="wide">
      <RegisterCard />
    </BackgroundAuth>
  );
}
