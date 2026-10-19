"use client";

import { useState, useEffect } from "react";
import { Timer } from "lucide-react";

interface ReservationTimerProps {
  initialMinutes?: number;
}

export function ReservationTimer({ initialMinutes = 10 }: ReservationTimerProps) {
  const [timeLeft, setTimeLeft] = useState(initialMinutes * 60);

  useEffect(() => {
    if (timeLeft <= 0) return;

    const interval = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => clearInterval(interval);
  }, [timeLeft]);

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const formattedTime = `${minutes.toString().padStart(2, "0")}:${seconds
    .toString()
    .padStart(2, "0")}`;

  return (
    <div className="bg-[#FAF7FF] border border-[#6D28D9]/20 rounded-xl px-4 py-2 flex items-center justify-between shadow-2xs select-none">
      <div className="flex items-center gap-2">
        <span className="relative flex h-2.5 w-2.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#6D28D9] opacity-75" />
          <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#6D28D9]" />
        </span>
        <span className="text-xs font-semibold text-[#181522]">Reservation hold</span>
      </div>

      <div className="flex items-center gap-1.5 bg-white px-2.5 py-1 rounded-lg border border-[#E9E5F0] shadow-2xs">
        <Timer className="w-3.5 h-3.5 text-[#6D28D9]" />
        <span className="text-xs font-extrabold text-[#6D28D9] tracking-wider font-mono">
          {formattedTime}
        </span>
        <span className="text-[10px] text-[#777387]">left</span>
      </div>
    </div>
  );
}
