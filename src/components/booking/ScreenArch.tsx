import { Video } from "lucide-react";

export function ScreenArch() {
  return (
    <div className="relative w-full flex flex-col items-center pt-2 pb-6 overflow-hidden select-none">
      {/* Light Projector Beam */}
      <div className="absolute top-0 w-3/4 max-w-lg h-24 bg-gradient-to-b from-[#6D28D9]/15 via-[#6D28D9]/5 to-transparent blur-lg pointer-events-none rounded-t-[120px]" />

      {/* Curved Screen SVG Arch */}
      <div className="relative w-11/12 max-w-md flex flex-col items-center">
        <svg
          className="w-full h-8 overflow-visible drop-shadow-[0_4px_12px_rgba(109,40,217,0.35)]"
          fill="none"
          viewBox="0 0 300 24"
        >
          <path
            d="M 10 20 Q 150 2 290 20"
            stroke="url(#screenGrad)"
            strokeLinecap="round"
            strokeWidth="5"
          />
          <defs>
            <linearGradient id="screenGrad" x1="0%" x2="100%" y1="0%" y2="0%">
              <stop offset="0%" stopColor="#DAC5FF" stopOpacity="0.3" />
              <stop offset="25%" stopColor="#6D28D9" />
              <stop offset="50%" stopColor="#B188FF" />
              <stop offset="75%" stopColor="#6D28D9" />
              <stop offset="100%" stopColor="#DAC5FF" stopOpacity="0.3" />
            </linearGradient>
          </defs>
        </svg>

        {/* Screen Indicator Text */}
        <div className="flex items-center gap-1.5 mt-2 text-[#777387]">
          <Video className="w-3.5 h-3.5 text-[#6D28D9]" />
          <span className="text-[11px] font-bold uppercase tracking-widest text-[#6D28D9]">
            Cinema Screen This Way
          </span>
        </div>
      </div>
    </div>
  );
}
