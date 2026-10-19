"use client";

import { useSyncExternalStore } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  getAllBookings,
  cancelBooking,
  subscribeToBookings,
} from "@/lib/storage/bookings";
import {
  Ticket,
  MapPin,
  Clock,
  ArrowRight,
  ShieldCheck,
  ExternalLink,
  Ban,
} from "lucide-react";

export function MyBookingsView() {
  const isMounted = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false
  );

  const bookings = useSyncExternalStore(
    subscribeToBookings,
    getAllBookings,
    () => []
  );

  const handleCancelBooking = (bookingId: string) => {
    const confirmed = window.confirm(
      "Are you sure you want to cancel this reservation? The seats will be released."
    );
    if (!confirmed) return;

    cancelBooking(bookingId);
  };

  if (!isMounted) {
    return (
      <div className="w-full min-h-[60vh] flex flex-col items-center justify-center p-6 space-y-3">
        <div className="w-10 h-10 border-3 border-[#6D28D9] border-t-transparent rounded-full animate-spin" />
        <p className="text-xs text-[#777387]">Loading your bookings...</p>
      </div>
    );
  }

  const activeBookings = bookings.filter((b) => b.status === "CONFIRMED");
  const cancelledBookings = bookings.filter((b) => b.status === "CANCELLED");

  return (
    <div className="w-full min-h-[85vh] bg-[#F8F7FC] py-8 sm:py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#E9E5F0] pb-6">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#6D28D9]" />
              <h1 className="text-2xl sm:text-3xl font-extrabold text-[#181522] tracking-tight">
                My Bookings
              </h1>
            </div>
            <p className="text-xs sm:text-sm text-[#777387] mt-1">
              View your confirmed reservations, active digital passes, and ticket history
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs font-semibold text-[#777387] bg-white px-3.5 py-2 rounded-xl border border-[#E9E5F0] shadow-2xs self-start sm:self-auto">
            <span>{bookings.length} {bookings.length === 1 ? "booking" : "bookings"} recorded</span>
          </div>
        </div>

        {/* Demo Persistence Notice */}
        <div className="p-4 rounded-xl bg-[#FAF7FF] border border-[#6D28D9]/20 text-xs text-[#777387] flex items-start gap-3">
          <ShieldCheck className="w-4 h-4 text-[#6D28D9] shrink-0 mt-0.5" />
          <p className="leading-relaxed">
            <strong className="text-[#181522]">Local Storage Mode:</strong> These tickets are preserved in your current browser session. In the upcoming Milestone, Supabase Auth will synchronize your bookings securely across devices and user profiles.
          </p>
        </div>

        {/* Bookings List */}
        {bookings.length > 0 ? (
          <div className="space-y-8">
            {/* Active Bookings Section */}
            {activeBookings.length > 0 && (
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#16A34A]" />
                  <h2 className="text-sm font-bold uppercase tracking-wider text-[#181522]">
                    Upcoming Screenings ({activeBookings.length})
                  </h2>
                </div>

                <div className="space-y-4">
                  {activeBookings.map((booking) => (
                    <div
                      key={booking.id}
                      className="bg-white rounded-2xl border border-[#E9E5F0] p-5 sm:p-6 shadow-sm hover:shadow-md transition-shadow flex flex-col sm:flex-row gap-5 items-start sm:items-center justify-between"
                    >
                      {/* Left: Poster & Details */}
                      <div className="flex items-start gap-4 min-w-0">
                        <div className="w-16 h-24 sm:w-20 sm:h-28 rounded-xl overflow-hidden bg-[#181522] shrink-0 shadow-sm relative">
                          <Image
                            src={booking.posterUrl}
                            alt={booking.movieTitle}
                            fill
                            sizes="80px"
                            className="object-cover"
                            unoptimized
                          />
                        </div>

                        <div className="space-y-1.5 min-w-0">
                          <div className="flex items-center gap-2">
                            <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-[#F3E8FF] text-[#6D28D9]">
                              {booking.format}
                            </span>
                            <span className="text-xs font-mono font-bold text-[#777387]">
                              {booking.bookingReference}
                            </span>
                          </div>

                          <h3 className="text-base sm:text-lg font-bold text-[#181522] truncate">
                            {booking.movieTitle}
                          </h3>

                          <div className="flex items-center gap-1.5 text-xs text-[#777387]">
                            <MapPin className="w-3.5 h-3.5 text-[#6D28D9] shrink-0" />
                            <span className="truncate">{booking.cinemaName}</span>
                            <span>•</span>
                            <span className="font-semibold text-[#181522] shrink-0">
                              {booking.screenName}
                            </span>
                          </div>

                          <div className="flex flex-wrap items-center gap-2 text-xs text-[#777387] pt-1">
                            <div className="flex items-center gap-1">
                              <Clock className="w-3.5 h-3.5 text-[#6D28D9]" />
                              <span>{booking.showTime}</span>
                            </div>
                            <span>•</span>
                            <span>{booking.showDate}</span>
                            <span>•</span>
                            <span className="font-bold text-[#181522]">
                              Seats: {booking.seats.map((s) => s.id).join(", ")}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Right: Price & Actions */}
                      <div className="flex sm:flex-col items-center sm:items-end justify-between w-full sm:w-auto gap-3 pt-3 sm:pt-0 border-t sm:border-t-0 border-[#E9E5F0]">
                        <div className="text-left sm:text-right">
                          <span className="text-[10px] text-[#777387] block uppercase font-bold">
                            Total Paid
                          </span>
                          <span className="text-base sm:text-lg font-extrabold text-[#181522]">
                            ₹{booking.totalAmount.toFixed(2)}
                          </span>
                        </div>

                        <div className="flex items-center gap-2">
                          <Link
                            href={`/confirmation/${booking.id}`}
                            className="px-4 py-2 rounded-xl bg-[#6D28D9] hover:bg-[#4C1D95] text-white text-xs font-semibold shadow-sm hover:shadow-md flex items-center gap-1.5 transition-all"
                          >
                            <ExternalLink className="w-3.5 h-3.5" />
                            <span>View Ticket</span>
                          </Link>

                          <button
                            type="button"
                            onClick={() => handleCancelBooking(booking.id)}
                            className="px-3 py-2 rounded-xl text-xs font-semibold text-[#DC2626] hover:bg-red-50 border border-transparent hover:border-red-200 transition-colors cursor-pointer"
                            title="Cancel booking"
                          >
                            <Ban className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Cancelled Bookings Section */}
            {cancelledBookings.length > 0 && (
              <div className="space-y-4 pt-4 border-t border-[#E9E5F0]">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#DC2626]" />
                  <h2 className="text-sm font-bold uppercase tracking-wider text-[#777387]">
                    Cancelled Bookings ({cancelledBookings.length})
                  </h2>
                </div>

                <div className="space-y-3 opacity-75">
                  {cancelledBookings.map((booking) => (
                    <div
                      key={booking.id}
                      className="bg-white rounded-2xl border border-[#E9E5F0] p-4 flex items-center justify-between gap-4 text-xs"
                    >
                      <div className="flex items-center gap-3">
                        <span className="px-2 py-0.5 rounded bg-red-100 text-[#DC2626] font-bold text-[10px]">
                          CANCELLED
                        </span>
                        <div>
                          <span className="font-bold text-[#181522]">{booking.movieTitle}</span>
                          <span className="text-[#777387] ml-2">({booking.bookingReference})</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-4">
                        <span className="text-[#777387]">
                          Seats: {booking.seats.map((s) => s.id).join(", ")}
                        </span>
                        <span className="line-through text-[#777387]">
                          ₹{booking.totalAmount.toFixed(2)}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        ) : (
          /* Empty State */
          <div className="w-full py-20 bg-white rounded-2xl border border-dashed border-[#E9E5F0] p-8 text-center flex flex-col items-center justify-center space-y-4">
            <div className="w-16 h-16 rounded-2xl bg-[#FAF7FF] text-[#6D28D9] flex items-center justify-center border border-[#6D28D9]/20 shadow-2xs">
              <Ticket className="w-8 h-8" />
            </div>

            <div className="space-y-1">
              <h2 className="text-xl font-bold text-[#181522]">No Bookings Yet</h2>
              <p className="text-xs sm:text-sm text-[#777387] max-w-sm mx-auto leading-relaxed">
                You haven&apos;t reserved any movie tickets in this browser yet. Browse our now showing catalogue and select your favorite cinema recliners!
              </p>
            </div>

            <div className="pt-2">
              <Link
                href="/#now-playing"
                className="px-6 py-3 rounded-xl bg-[#6D28D9] hover:bg-[#4C1D95] text-white text-xs sm:text-sm font-semibold shadow-md shadow-[#6D28D9]/25 hover:shadow-lg inline-flex items-center gap-2 transition-all active:scale-95"
              >
                <span>Explore Movies Now</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
