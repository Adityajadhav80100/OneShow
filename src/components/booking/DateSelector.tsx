"use client";

import { BookingDate } from "@/lib/data/cinemas";
import { Calendar } from "lucide-react";

interface DateSelectorProps {
  dates: BookingDate[];
  selectedDateId: string;
  onSelectDate: (id: string) => void;
}

export function DateSelector({ dates, selectedDateId, onSelectDate }: DateSelectorProps) {
  return (
    <div className="w-full flex flex-col space-y-2">
      <div className="flex items-center gap-2 text-xs font-bold text-[#181522] uppercase tracking-wider">
        <Calendar className="w-4 h-4 text-[#6D28D9]" />
        <span>Select Screening Date</span>
      </div>

      <div className="flex items-center gap-2.5 overflow-x-auto pb-2 no-scrollbar scrollbar-none -mx-4 px-4 sm:mx-0 sm:px-0">
        {dates.map((d) => {
          const isSelected = selectedDateId === d.id;
          return (
            <button
              key={d.id}
              type="button"
              onClick={() => onSelectDate(d.id)}
              className={`flex flex-col items-center justify-center min-w-[90px] sm:min-w-[100px] py-2.5 px-3 rounded-2xl transition-all duration-200 cursor-pointer select-none ${
                isSelected
                  ? "bg-[#6D28D9] text-white shadow-md shadow-[#6D28D9]/30 scale-102"
                  : "bg-white text-[#181522] hover:bg-[#F3E8FF] hover:border-[#6D28D9]/40 border border-[#E9E5F0] shadow-2xs"
              }`}
            >
              <span
                className={`text-[11px] font-bold uppercase tracking-wider ${
                  isSelected ? "text-[#F3E8FF]" : "text-[#777387]"
                }`}
              >
                {d.isToday ? "Today" : d.dayName}
              </span>
              <span className="text-base sm:text-lg font-extrabold leading-tight mt-0.5">
                {d.formattedDate}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
