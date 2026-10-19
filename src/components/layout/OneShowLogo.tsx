import Link from "next/link";

interface OneShowLogoProps {
  className?: string;
  size?: "sm" | "md" | "lg";
}

export function OneShowLogo({ className = "", size = "md" }: OneShowLogoProps) {
  const iconSizes = {
    sm: "w-7 h-7",
    md: "w-9 h-9",
    lg: "w-11 h-11",
  };

  const textSizes = {
    sm: "text-lg",
    md: "text-xl",
    lg: "text-2xl",
  };

  return (
    <Link href="/" className={`inline-flex items-center gap-2.5 group select-none ${className}`}>
      {/* Cinematic Ticket / Aperture Icon */}
      <div
        className={`${iconSizes[size]} rounded-xl bg-gradient-to-tr from-[#4C1D95] via-[#6D28D9] to-[#8B5CF6] flex items-center justify-center text-white shadow-md shadow-[#6D28D9]/25 group-hover:scale-105 transition-transform duration-200`}
      >
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="w-5 h-5 text-white"
        >
          {/* Cinema ticket icon with perforated notch */}
          <path d="M2 9a3 3 0 0 1 0 6v2a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-2a3 3 0 0 1 0-6V7a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2z" />
          <path d="M13 5v2" />
          <path d="M13 17v2" />
          <path d="M13 11v2" />
        </svg>
      </div>

      {/* Brand Name: OneShow */}
      <div className="flex flex-col">
        <span
          className={`font-bold tracking-tight text-[#181522] leading-none ${textSizes[size]} flex items-center`}
        >
          One<span className="text-[#6D28D9]">Show</span>
        </span>
        <span className="text-[10px] font-semibold text-[#777387] tracking-wider uppercase">
          Movie Platform
        </span>
      </div>
    </Link>
  );
}
