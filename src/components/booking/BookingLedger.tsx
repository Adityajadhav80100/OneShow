"use client";

import Link from "next/link";
import { Seat, calculateBookingTotal } from "@/lib/data/seats";
import { Showtime } from "@/lib/data/cinemas";
import { ArrowRight, Ticket, ShieldCheck } from "lucide-react";

interface BookingLedgerProps {
  show: Showtime;
  movieId?: string;
  selectedSeatIds: string[];
  allSeats: Seat[];
  onRemoveSeat: (seatId: string) => void;
}

export function BookingLedger({
  show,
  movieId,
  selectedSeatIds,
  allSeats,
  onRemoveSeat,
}: BookingLedgerProps) {
  const { selectedSeats, ticketCount, subtotal, convenienceFee, grandTotal } =
    calculateBookingTotal(selectedSeatIds, allSeats);

  const hasSeats = ticketCount > 0;
  const checkoutHref = hasSeats
    ? `/checkout?showId=${show.id}&seats=${selectedSeatIds.join(",")}${
        movieId ? `&movieId=${movieId}` : ""
      }`
    : "#";

  return (
    <div className="bg-white rounded-2xl border border-[#E9E5F0] p-6 shadow-sm space-y-6 sticky top-24">
      {/* Header */}
      <div className="border-b border-[#E9E5F0] pb-4">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-bold text-[#181522]">Booking Summary</h3>
          <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-[#F3E8FF] text-[#6D28D9]">
            {ticketCount} / 6 Seats
          </span>
        </div>
        <p className="text-xs text-[#777387] mt-1">
          {show.cinemaName} • {show.screenName}
        </p>
      </div>

      {/* Selected Seats Badges */}
      <div className="space-y-2">
        <span className="text-xs font-bold text-[#777387] uppercase tracking-wider block">
          Selected Seats
        </span>
        {hasSeats ? (
          <div className="flex flex-wrap gap-2">
            {selectedSeats.map((seat) => (
              <span
                key={seat.id}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#F8F7FC] border border-[#E9E5F0] text-xs font-bold text-[#181522] shadow-2xs group"
              >
                <span>{seat.id}</span>
                <span className="text-[10px] text-[#6D28D9]">({seat.tier === "RECLINER" ? "VIP" : "Std"})</span>
                <button
                  type="button"
                  onClick={() => onRemoveSeat(seat.id)}
                  className="w-4 h-4 rounded-full flex items-center justify-center text-[#777387] hover:text-[#DC2626] hover:bg-red-50 ml-0.5 transition-colors"
                  aria-label={`Remove seat ${seat.id}`}
                >
                  ✕
                </button>
              </span>
            ))}
          </div>
        ) : (
          <div className="p-4 rounded-xl bg-[#F8F7FC] border border-dashed border-[#E9E5F0] text-center text-xs text-[#777387]">
            Please click on available seats from the layout to select them.
          </div>
        )}
      </div>

      {/* Price Ledger Breakdown */}
      {hasSeats && (
        <div className="space-y-3 text-xs text-[#777387] border-y border-[#E9E5F0] py-4 animate-in fade-in duration-200">
          <div className="flex items-center justify-between">
            <span>Ticket Price ({ticketCount} {ticketCount === 1 ? "seat" : "seats"}):</span>
            <span className="font-bold text-[#181522]">₹{subtotal.toFixed(2)}</span>
          </div>

          <div className="flex items-center justify-between">
            <span className="flex items-center gap-1">
              <span>Integrated Convenience &amp; GST:</span>
            </span>
            <span className="font-bold text-[#181522]">₹{convenienceFee.toFixed(2)}</span>
          </div>

          <div className="pt-2 border-t border-[#E9E5F0] flex items-center justify-between text-sm">
            <span className="font-bold text-[#181522]">Total Amount:</span>
            <span className="text-xl font-extrabold text-[#6D28D9]">
              ₹{grandTotal.toFixed(2)}
            </span>
          </div>
        </div>
      )}

      {/* Checkout CTA Button */}
      {hasSeats ? (
        <Link
          href={checkoutHref}
          className="w-full py-3.5 rounded-xl bg-[#6D28D9] hover:bg-[#4C1D95] text-white text-sm font-semibold shadow-md shadow-[#6D28D9]/25 hover:shadow-lg flex items-center justify-center gap-2 active:scale-95 transition-all"
        >
          <span>Continue to Checkout</span>
          <span>•</span>
          <span>₹{grandTotal}</span>
          <ArrowRight className="w-4 h-4 ml-1" />
        </Link>
      ) : (
        <button
          type="button"
          disabled
          className="w-full py-3.5 rounded-xl bg-[#E9E5F0] text-[#777387] text-sm font-semibold cursor-not-allowed flex items-center justify-center gap-2 select-none"
        >
          <Ticket className="w-4 h-4" />
          <span>Select Seats to Proceed</span>
        </button>
      )}

      {/* Trust & Policy Badge */}
      <div className="flex items-start gap-2 text-[11px] text-[#777387] pt-1">
        <ShieldCheck className="w-4 h-4 text-[#16A34A] shrink-0 mt-0.5" />
        <span>
          Instant seat reservation. Free cancellation available up to 2 hours before showtime.
        </span>
      </div>
    </div>
  );
}
