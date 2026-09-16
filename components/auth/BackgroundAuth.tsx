type Props = {
  children: React.ReactNode;
  variant?: "compact" | "wide";
};

export function BackgroundAuth({ children, variant = "compact" }: Props) {
  if (variant === "wide") {
    return (
      <main className="relative min-h-svh overflow-x-hidden overflow-y-auto bg-[#fff7f1]">
        {children}
      </main>
    );
  }

  return (
    <main className="relative flex min-h-svh justify-center overflow-x-hidden overflow-y-auto bg-[#EFFBFF] auth-shell before:hidden">
      <div className="relative z-10 w-full max-w-[430px] bg-[#EFFBFF] sm:my-5 sm:self-start sm:overflow-hidden sm:rounded-[32px] sm:shadow-[0_6px_18px_-6px_rgba(22,138,242,0.12)]">
        {children}
      </div>
    </main>
  );
}
