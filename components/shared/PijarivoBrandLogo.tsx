type PijarivoBrandLogoProps = {
  wordmarkClassName?: string;
  markClassName?: string;
  showWordmark?: boolean;
  tone?: "light" | "dark";
};

export function PijarivoLogoMark({ className = "" }: { className?: string }) {
  return (
    <span className={`relative grid place-items-center overflow-hidden rounded-[18px] bg-[linear-gradient(135deg,#ff4f3e_0%,#ff7a1a_56%,#ffc857_100%)] shadow-[0_18px_44px_rgba(255,122,26,0.34)] ${className}`}>
      <span className="absolute inset-0 bg-[radial-gradient(circle_at_28%_18%,rgba(255,255,255,0.44),transparent_30%)]" />
      <svg viewBox="0 0 64 64" aria-hidden="true" className="relative h-[76%] w-[76%]">
        <path
          d="M20 49V17h17.8c8.4 0 14.2 5.1 14.2 12.5S46.2 42 37.8 42H30v7H20Z"
          fill="white"
        />
        <path
          d="M30 25v9h7.2c3.1 0 5.1-1.8 5.1-4.5S40.3 25 37.2 25H30Z"
          fill="#ff7a1a"
        />
        <path
          d="M46.5 10 43 20.2l9.8-2.2-13.3 24 3.3-13.1-8.2 2.1L46.5 10Z"
          fill="#3a1734"
        />
      </svg>
    </span>
  );
}

export function PijarivoBrandLogo({
  wordmarkClassName = "",
  markClassName = "h-12 w-12",
  showWordmark = true,
  tone = "light",
}: PijarivoBrandLogoProps) {
  return (
    <span className="inline-flex items-center gap-3">
      <PijarivoLogoMark className={markClassName} />
      {showWordmark ? (
        <span className={`font-black tracking-normal ${tone === "light" ? "text-white" : "text-[#32172d]"} ${wordmarkClassName}`}>
          Pijarivo
        </span>
      ) : null}
    </span>
  );
}
