import Link from "next/link";
import { getShowtimeById } from "@/lib/data/cinemas";
import { getMovieDetails } from "@/lib/tmdb/client";
import { generateAuditoriumLayout, calculateBookingTotal } from "@/lib/data/seats";
import { DemoCheckoutForm } from "@/components/checkout/DemoCheckoutForm";
import {
  ArrowLeft,
  Clock,
  Film,
  MapPin,
  Lock,
  AlertCircle,
} from "lucide-react";

interface CheckoutPageProps {
  searchParams: Promise<{
    showId?: string;
    seats?: string;
    movieId?: string;
  }>;
}

export default async function CheckoutPage({ searchParams }: CheckoutPageProps) {
  const { showId, seats: seatsParam, movieId } = await searchParams;

  const show = showId ? getShowtimeById(showId) : null;
  const movie = movieId ? await getMovieDetails(movieId) : null;

  const seatIds = seatsParam ? seatsParam.split(",").map((s) => s.trim()).filter(Boolean) : [];

  // Empty or invalid state handler
  if (!show || seatIds.length === 0) {
    return (
      <div className="w-full min-h-[75vh] flex flex-col items-center justify-center p-4 bg-[#F8F7FC]">
        <div className="max-w-md w-full bg-white rounded-2xl border border-[#E9E5F0] p-8 text-center shadow-sm space-y-4">
          <div className="w-14 h-14 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center mx-auto">
            <AlertCircle className="w-7 h-7" />
          </div>
          <h1 className="text-xl font-bold text-[#181522]">No Seats Selected</h1>
          <p className="text-xs text-[#777387] leading-relaxed">
            Your booking session does not have any reserved seats. This can happen if the page was refreshed or accessed directly.
          </p>
          <div className="pt-2">
            <Link
              href={showId ? `/booking/${showId}${movieId ? `?movieId=${movieId}` : ""}` : "/"}
              className="w-full py-3 rounded-xl bg-[#6D28D9] hover:bg-[#4C1D95] text-white text-xs font-semibold shadow-sm inline-flex items-center justify-center gap-1.5 transition-all"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Seat Selection</span>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Recalculate authoritative price from server-side seat layout
  const allSeats = generateAuditoriumLayout(show.id);
  const { selectedSeats, ticketCount, subtotal, convenienceFee, grandTotal } =
    calculateBookingTotal(seatIds, allSeats);

  const movieTitle = movie?.title || "Feature Presentation";

  return (
    <div className="w-full min-h-[85vh] bg-[#F8F7FC] py-8 sm:py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 space-y-6">
        {/* Top Back Action */}
        <div>
          <Link
            href={`/booking/${show.id}${movieId ? `?movieId=${movieId}` : ""}`}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#777387] hover:text-[#6D28D9] transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Modify Selected Seats</span>
          </Link>
        </div>

        {/* Page Title */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-[#181522] tracking-tight">
              Review &amp; Demo Checkout
            </h1>
            <p className="text-xs text-[#777387] mt-0.5">
              Review your ticket reservation details before confirming
            </p>
          </div>

          <div className="flex items-center gap-1.5 text-xs font-semibold text-[#16A34A] bg-[#DCFCE7] px-3 py-1.5 rounded-xl border border-green-200 self-start sm:self-auto">
            <Lock className="w-3.5 h-3.5" />
            <span>Secure Demo Checkout</span>
          </div>
        </div>

        {/* Two-Column Review Layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
          {/* Left: Booking Details & Contact Form (2 columns) */}
          <div className="md:col-span-2 space-y-6">
            {/* Movie & Venue Card */}
            <div className="bg-white rounded-2xl border border-[#E9E5F0] p-6 shadow-sm space-y-4">
              <div className="flex items-start justify-between gap-4 border-b border-[#E9E5F0] pb-4">
                <div>
                  <span className="px-2.5 py-0.5 rounded-full bg-[#6D28D9] text-white text-[10px] font-bold uppercase tracking-wider">
                    {show.format}
                  </span>
                  <h2 className="text-xl font-extrabold text-[#181522] mt-1.5">
                    {movieTitle}
                  </h2>
                  <p className="text-xs text-[#777387] mt-0.5">
                    {movie?.genres?.join(" • ") || "Cinema"} • {movie?.runtimeFormatted || "2h 30m"}
                  </p>
                </div>

                <div className="w-12 h-12 rounded-xl bg-[#F3E8FF] flex items-center justify-center text-[#6D28D9] shrink-0">
                  <Film className="w-6 h-6" />
                </div>
              </div>

              {/* Venue & Schedule Matrix */}
              <div className="grid grid-cols-2 gap-4 text-xs">
                <div className="space-y-1">
                  <span className="text-[#777387] font-semibold block">Cinema Venue</span>
                  <div className="font-bold text-[#181522] flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-[#6D28D9]" />
                    <span>{show.cinemaName}</span>
                  </div>
                  <span className="text-[#777387] text-[11px] block">{show.cinemaLocation}</span>
                </div>

                <div className="space-y-1">
                  <span className="text-[#777387] font-semibold block">Date &amp; Showtime</span>
                  <div className="font-bold text-[#181522] flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-[#6D28D9]" />
                    <span>{show.time}</span>
                  </div>
                  <span className="text-[#777387] text-[11px] block">{show.screenName}</span>
                </div>
              </div>
            </div>

            {/* Selected Seats Card */}
            <div className="bg-white rounded-2xl border border-[#E9E5F0] p-6 shadow-sm space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold text-[#181522]">Reserved Seats</h3>
                <span className="text-xs font-bold text-[#6D28D9] bg-[#F3E8FF] px-2.5 py-0.5 rounded-full">
                  {ticketCount} {ticketCount === 1 ? "Ticket" : "Tickets"}
                </span>
              </div>

              <div className="flex flex-wrap gap-2 pt-1">
                {selectedSeats.map((seat) => (
                  <div
                    key={seat.id}
                    className="flex items-center gap-2 px-3 py-2 rounded-xl bg-[#FAF7FF] border border-[#6D28D9]/20 text-xs font-bold text-[#181522]"
                  >
                    <span className="w-2 h-2 rounded-full bg-[#6D28D9]" />
                    <span>Seat {seat.id}</span>
                    <span className="text-[10px] text-[#777387] font-normal">
                      ({seat.tier === "RECLINER" ? "Recliner" : seat.tier === "PRIME_PLUS" ? "Prime Plus" : "Classic"} - ₹{seat.price})
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Interactive Demo Checkout Form with Contact Inputs */}
            <DemoCheckoutForm
              show={show}
              movie={movie}
              selectedSeats={selectedSeats}
              subtotal={subtotal}
              convenienceFee={convenienceFee}
              grandTotal={grandTotal}
            />
          </div>

          {/* Right: Authoritative Price Summary (1 column) */}
          <div className="space-y-6">
            <div className="bg-white rounded-2xl border border-[#E9E5F0] p-6 shadow-sm space-y-6 sticky top-24">
              <h3 className="text-base font-bold text-[#181522] border-b border-[#E9E5F0] pb-3">
                Order Summary
              </h3>

              <div className="space-y-3 text-xs text-[#777387]">
                <div className="flex items-center justify-between">
                  <span>Ticket Subtotal:</span>
                  <span className="font-bold text-[#181522]">₹{subtotal.toFixed(2)}</span>
                </div>

                <div className="flex items-center justify-between">
                  <span>Convenience Fee (incl. GST):</span>
                  <span className="font-bold text-[#181522]">₹{convenienceFee.toFixed(2)}</span>
                </div>

                <div className="pt-3 border-t border-[#E9E5F0] flex items-center justify-between text-sm">
                  <span className="font-bold text-[#181522]">Total Payable:</span>
                  <span className="text-xl font-extrabold text-[#6D28D9]">
                    ₹{grandTotal.toFixed(2)}
                  </span>
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-[#FAF7FF] border border-[#6D28D9]/20 text-[11px] text-[#777387] space-y-1">
                <span className="font-bold text-[#181522] block">Demo Mode Notice</span>
                <p>
                  No payment gateway or card details are required. Click confirm below to generate your simulated turnstile pass.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
