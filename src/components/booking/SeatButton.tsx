"use client";

import { Seat } from "@/lib/data/seats";
import { Armchair, X } from "lucide-react";

interface SeatButtonProps {
  seat: Seat;
  isSelected: boolean;
  onToggle: (seat: Seat) => void;
}

export function SeatButton({ seat, isSelected, onToggle }: SeatButtonProps) {
  const isRecliner = seat.tier === "RECLINER";

  if (seat.isOccupied) {
    return (
      <button
        type="button"
        disabled
        aria-label={`Seat ${seat.id} (Occupied)`}
        className={`relative rounded-md flex items-center justify-center bg-[#E9E5F0] text-[#777387] opacity-60 cursor-not-allowed select-none transition-all ${
          isRecliner ? "w-8 h-8 sm:w-9 sm:h-9" : "w-7 h-7 sm:w-8 sm:h-8 text-xs font-semibold"
        }`}
      >
        <span className="text-[10px] leading-none opacity-50">{seat.number}</span>
        <X className="w-2.5 h-2.5 absolute text-[#777387] opacity-60" />
      </button>
    );
  }

  if (isSelected) {
    return (
      <button
        type="button"
        onClick={() => onToggle(seat)}
        aria-label={`Seat ${seat.id} (Selected - ₹${seat.price})`}
        className={`relative rounded-md flex items-center justify-center bg-[#6D28D9] text-white font-bold border border-[#4C1D95] shadow-md shadow-[#6D28D9]/40 active:scale-95 transition-all cursor-pointer ${
          isRecliner ? "w-8 h-8 sm:w-9 sm:h-9" : "w-7 h-7 sm:w-8 sm:h-8 text-xs"
        }`}
      >
        <span className="text-xs leading-none">{seat.number}</span>
      </button>
    );
  }

  // Available State
  return (
    <button
      type="button"
      onClick={() => onToggle(seat)}
      aria-label={`Seat ${seat.id} - ${seat.tier} - ₹${seat.price}`}
      className={`group relative rounded-md flex flex-col items-center justify-center transition-all duration-150 active:scale-95 cursor-pointer shadow-2xs hover:shadow-sm ${
        isRecliner
          ? "w-8 h-8 sm:w-9 sm:h-9 bg-[#FAF7FF] border-1.5 border-[#6D28D9]/50 hover:border-[#6D28D9] hover:bg-[#F3E8FF] text-[#6D28D9]"
          : "w-7 h-7 sm:w-8 sm:h-8 bg-white border border-[#E9E5F0] hover:border-[#6D28D9] hover:bg-[#F3E8FF] text-[#181522] hover:text-[#6D28D9]"
      }`}
    >
      <span className="text-xs font-semibold leading-none">{seat.number}</span>
      {isRecliner && (
        <Armchair className="w-2.5 h-2.5 opacity-60 group-hover:opacity-100 group-hover:scale-110 transition-transform -mt-0.5" />
      )}
    </button>
  );
}
