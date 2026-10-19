"use client";

import { useState } from "react";
import Link from "next/link";
import { Showtime } from "@/lib/data/cinemas";
import { Seat, calculateBookingTotal } from "@/lib/data/seats";
import { ReservationTimer } from "./ReservationTimer";
import { SeatMap } from "./SeatMap";
import { BookingLedger } from "./BookingLedger";
import { ArrowRight, Ticket } from "lucide-react";

interface SeatSelectionExperienceProps {
  show: Showtime;
  movieId?: string;
  initialSeats: Seat[];
}

export function SeatSelectionExperience({
  show,
  movieId,
  initialSeats,
}: SeatSelectionExperienceProps) {
  const [selectedSeatIds, setSelectedSeatIds] = useState<string[]>([]);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleToggleSeat = (seat: Seat) => {
    setErrorMessage(null);

    if (seat.isOccupied) {
      setErrorMessage(`Seat ${seat.id} is already occupied.`);
      return;
    }

    if (selectedSeatIds.includes(seat.id)) {
      // Deselect
      setSelectedSeatIds((prev) => prev.filter((id) => id !== seat.id));
    } else {
      // Check 6-seat limit
      if (selectedSeatIds.length >= 6) {
        setErrorMessage("You can select a maximum of 6 tickets per booking.");
        return;
      }
      // Select
      setSelectedSeatIds((prev) => [...prev, seat.id]);
    }
  };

  const handleRemoveSeat = (seatId: string) => {
    setSelectedSeatIds((prev) => prev.filter((id) => id !== seatId));
  };

  const { ticketCount, grandTotal } = calculateBookingTotal(selectedSeatIds, initialSeats);
  const checkoutHref = `/checkout?showId=${show.id}&seats=${selectedSeatIds.join(",")}${
    movieId ? `&movieId=${movieId}` : ""
  }`;

  return (
    <div className="w-full space-y-6">
      {/* Countdown Hold Timer */}
      <ReservationTimer initialMinutes={10} />

      {/* Split Pane: Seat Map (8 cols) & Booking Ledger (4 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left: Seat Map (8 columns) */}
        <div className="lg:col-span-8 space-y-4">
          <SeatMap
            allSeats={initialSeats}
            selectedSeatIds={selectedSeatIds}
            onToggleSeat={handleToggleSeat}
            errorMessage={errorMessage}
          />
        </div>

        {/* Right: Booking Summary Ledger (4 columns) */}
        <div className="hidden lg:block lg:col-span-4">
          <BookingLedger
            show={show}
            movieId={movieId}
            selectedSeatIds={selectedSeatIds}
            allSeats={initialSeats}
            onRemoveSeat={handleRemoveSeat}
          />
        </div>
      </div>

      {/* Mobile Sticky Bottom Checkout Bar (Visible only on mobile/tablet) */}
      <div className="lg:hidden fixed bottom-0 inset-x-0 z-40 bg-white/95 backdrop-blur-md border-t border-[#E9E5F0] p-4 shadow-xl">
        <div className="max-w-md mx-auto flex items-center justify-between gap-4">
          <div>
            <div className="text-[11px] text-[#777387] font-semibold">
              {ticketCount > 0
                ? `${ticketCount} ${ticketCount === 1 ? "Seat" : "Seats"}: ${selectedSeatIds.join(", ")}`
                : "No seats selected"}
            </div>
            <div className="text-lg font-extrabold text-[#181522]">
              ₹{grandTotal}
            </div>
          </div>

          {ticketCount > 0 ? (
            <Link
              href={checkoutHref}
              className="px-5 py-3 rounded-xl bg-[#6D28D9] text-white text-xs font-bold shadow-md shadow-[#6D28D9]/30 active:scale-95 transition-all flex items-center gap-1.5"
            >
              <span>Continue</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          ) : (
            <button
              type="button"
              disabled
              className="px-4 py-3 rounded-xl bg-[#E9E5F0] text-[#777387] text-xs font-bold cursor-not-allowed flex items-center gap-1"
            >
              <Ticket className="w-3.5 h-3.5" />
              <span>Select Seats</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
