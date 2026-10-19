"use client";

import { Seat } from "@/lib/data/seats";
import { ScreenArch } from "./ScreenArch";
import { SeatButton } from "./SeatButton";
import { SeatLegend } from "./SeatLegend";
import { Armchair, Stars, Ticket, AlertCircle } from "lucide-react";

interface SeatMapProps {
  allSeats: Seat[];
  selectedSeatIds: string[];
  onToggleSeat: (seat: Seat) => void;
  errorMessage: string | null;
}

export function SeatMap({
  allSeats,
  selectedSeatIds,
  onToggleSeat,
  errorMessage,
}: SeatMapProps) {
  // Group seats by row
  const rowA = allSeats.filter((s) => s.row === "A");
  const rowB = allSeats.filter((s) => s.row === "B");
  const rowC = allSeats.filter((s) => s.row === "C");
  const rowD = allSeats.filter((s) => s.row === "D");
  const rowE = allSeats.filter((s) => s.row === "E");
  const rowF = allSeats.filter((s) => s.row === "F");

  const renderStandardRow = (rowLabel: string, seats: Seat[]) => {
    const leftBlock = seats.filter((s) => s.number <= 6);
    const rightBlock = seats.filter((s) => s.number > 6);

    return (
      <div key={rowLabel} className="flex items-center justify-between gap-2 sm:gap-4 w-full">
        {/* Left Row Indicator */}
        <span className="w-5 text-center text-xs font-bold text-[#777387]">
          {rowLabel}
        </span>

        {/* Seats Container */}
        <div className="flex-1 flex items-center justify-center gap-2 sm:gap-4 max-w-lg mx-auto">
          {/* Left Block (Seats 1-6) */}
          <div className="flex items-center gap-1 sm:gap-1.5">
            {leftBlock.map((seat) => (
              <SeatButton
                key={seat.id}
                seat={seat}
                isSelected={selectedSeatIds.includes(seat.id)}
                onToggle={onToggleSeat}
              />
            ))}
          </div>

          {/* Central Aisle Gap */}
          <div className="w-3 sm:w-6 flex items-center justify-center text-[10px] text-[#A39EB0] select-none font-mono">
            |
          </div>

          {/* Right Block (Seats 7-12) */}
          <div className="flex items-center gap-1 sm:gap-1.5">
            {rightBlock.map((seat) => (
              <SeatButton
                key={seat.id}
                seat={seat}
                isSelected={selectedSeatIds.includes(seat.id)}
                onToggle={onToggleSeat}
              />
            ))}
          </div>
        </div>

        {/* Right Row Indicator */}
        <span className="w-5 text-center text-xs font-bold text-[#777387]">
          {rowLabel}
        </span>
      </div>
    );
  };

  return (
    <div className="bg-white rounded-2xl border border-[#E9E5F0] p-4 sm:p-6 shadow-sm flex flex-col gap-6 overflow-hidden">
      {/* 1. Curved Cinema Screen */}
      <ScreenArch />

      {/* Error / Max Selection Alert Toast */}
      {errorMessage && (
        <div className="p-3 rounded-xl bg-amber-50 border border-amber-200 text-amber-800 text-xs font-medium flex items-center gap-2 animate-in fade-in duration-200">
          <AlertCircle className="w-4 h-4 text-amber-600 shrink-0" />
          <span>{errorMessage}</span>
        </div>
      )}

      {/* 2. Interactive Seating Grid Container (horizontally scrollable on small screens) */}
      <div className="w-full overflow-x-auto pb-4 pt-2 -mx-2 px-2 scrollbar-none no-scrollbar">
        <div className="min-w-[420px] sm:min-w-[540px] flex flex-col gap-6 mx-auto">
          {/* Category 1: Recliner Lounge (₹650) */}
          <div className="space-y-2 border-b border-[#E9E5F0] pb-4">
            <div className="flex items-center justify-between px-2 text-xs">
              <div className="flex items-center gap-1.5 text-[#6D28D9] font-bold">
                <Armchair className="w-4 h-4" />
                <span className="uppercase tracking-wider">Recliner Lounge</span>
              </div>
              <span className="font-extrabold text-[#6D28D9]">₹650</span>
            </div>

            {/* Row A */}
            <div className="flex items-center justify-between gap-2 sm:gap-4 w-full">
              <span className="w-5 text-center text-xs font-bold text-[#777387]">A</span>
              <div className="flex-1 flex items-center justify-center gap-1.5 sm:gap-2 max-w-md mx-auto">
                {rowA.map((seat) => (
                  <SeatButton
                    key={seat.id}
                    seat={seat}
                    isSelected={selectedSeatIds.includes(seat.id)}
                    onToggle={onToggleSeat}
                  />
                ))}
              </div>
              <span className="w-5 text-center text-xs font-bold text-[#777387]">A</span>
            </div>
          </div>

          {/* Category 2: Prime Plus (₹420) */}
          <div className="space-y-2.5 border-b border-[#E9E5F0] pb-4">
            <div className="flex items-center justify-between px-2 text-xs">
              <div className="flex items-center gap-1.5 text-[#181522] font-bold">
                <Stars className="w-4 h-4 text-[#6D28D9]" />
                <span className="uppercase tracking-wider">Prime Plus</span>
              </div>
              <span className="font-extrabold text-[#181522]">₹420</span>
            </div>

            <div className="space-y-2">
              {renderStandardRow("B", rowB)}
              {renderStandardRow("C", rowC)}
              {renderStandardRow("D", rowD)}
            </div>
          </div>

          {/* Category 3: Classic (₹280) */}
          <div className="space-y-2.5">
            <div className="flex items-center justify-between px-2 text-xs">
              <div className="flex items-center gap-1.5 text-[#181522] font-bold">
                <Ticket className="w-4 h-4 text-[#777387]" />
                <span className="uppercase tracking-wider">Classic</span>
              </div>
              <span className="font-extrabold text-[#181522]">₹280</span>
            </div>

            <div className="space-y-2">
              {renderStandardRow("E", rowE)}
              {renderStandardRow("F", rowF)}
            </div>
          </div>
        </div>
      </div>

      {/* 3. Seat Legend */}
      <SeatLegend />
    </div>
  );
}
