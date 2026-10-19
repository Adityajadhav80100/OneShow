"use client";

import Link from "next/link";
import { Showtime } from "@/lib/data/cinemas";

interface ShowtimeButtonProps {
  show: Showtime;
  movieId: string | number;
}

export function ShowtimeButton({ show, movieId }: ShowtimeButtonProps) {
  const statusBadges = {
    AVAILABLE: {
      text: "Available",
      className: "bg-[#DCFCE7] text-[#16A34A] border-green-200",
    },
    FILLING_FAST: {
      text: "Filling Fast",
      className: "bg-[#FEF3C7] text-[#D97706] border-amber-200",
    },
    ALMOST_FULL: {
      text: "Almost Full",
      className: "bg-[#FEE2E2] text-[#DC2626] border-red-200",
    },
    SOLD_OUT: {
      text: "Sold Out",
      className: "bg-[#F1F5F9] text-[#64748B] border-slate-200",
    },
  };

  const badge = statusBadges[show.status] || statusBadges.AVAILABLE;
  const isSoldOut = show.status === "SOLD_OUT";

  if (isSoldOut) {
    return (
      <div className="flex flex-col items-center justify-center p-2.5 rounded-xl bg-[#F8F7FC] border border-dashed border-[#E9E5F0] opacity-50 cursor-not-allowed text-center select-none">
        <span className="text-sm font-bold text-[#777387]">{show.time}</span>
        <span className="text-[10px] text-[#777387] mt-0.5">{show.format}</span>
        <span className="mt-1 px-1.5 py-0.5 rounded-full text-[9px] font-semibold bg-gray-200 text-gray-700">
          Sold Out
        </span>
      </div>
    );
  }

  return (
    <Link
      href={`/booking/${show.id}?movieId=${movieId}`}
      className="group relative flex flex-col items-center justify-center p-3 rounded-xl bg-[#F8F7FC] hover:bg-white border border-[#E9E5F0] hover:border-[#6D28D9] hover:shadow-md hover:shadow-[#6D28D9]/15 transition-all duration-200 text-center active:scale-95"
    >
      {/* Time */}
      <span className="text-sm sm:text-base font-extrabold text-[#181522] group-hover:text-[#6D28D9] transition-colors">
        {show.time}
      </span>

      {/* Format & Screen */}
      <span className="text-[11px] font-semibold text-[#777387] mt-0.5">
        {show.format}
      </span>

      {/* Status Badge */}
      <div className="mt-1 flex items-center gap-1">
        <span
          className={`px-1.5 py-0.5 rounded-full text-[9px] font-bold border ${badge.className}`}
        >
          {badge.text}
        </span>
      </div>

      {/* Starting Price tooltip / subtle text */}
      <span className="text-[10px] font-bold text-[#181522] mt-1 opacity-70 group-hover:opacity-100">
        ₹{show.basePrice}
      </span>
    </Link>
  );
}
