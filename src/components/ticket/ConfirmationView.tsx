"use client";

import { useSyncExternalStore } from "react";
import Link from "next/link";
import { getBookingById, subscribeToBookings } from "@/lib/storage/bookings";
import { DigitalTicket } from "./DigitalTicket";
import {
  CheckCircle2,
  Printer,
  Ticket,
  ArrowLeft,
  AlertCircle,
  Home,
  ShieldCheck,
} from "lucide-react";

interface ConfirmationViewProps {
  bookingId: string;
}

export function ConfirmationView({ bookingId }: ConfirmationViewProps) {
  const isClient = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false
  );

  const booking = useSyncExternalStore(
    subscribeToBookings,
    () => getBookingById(bookingId),
    () => null
  );

  if (!isClient) {
    return (
      <div className="w-full min-h-[70vh] flex flex-col items-center justify-center p-6 space-y-3">
        <div className="w-10 h-10 border-3 border-[#6D28D9] border-t-transparent rounded-full animate-spin" />
        <p className="text-xs text-[#777387]">Loading verified digital ticket...</p>
      </div>
    );
  }

  // If booking does not exist
  if (!booking) {
    return (
      <div className="w-full min-h-[75vh] flex flex-col items-center justify-center p-4 bg-[#F8F7FC]">
        <div className="max-w-md w-full bg-white rounded-2xl border border-[#E9E5F0] p-8 text-center shadow-sm space-y-4">
          <div className="w-14 h-14 rounded-2xl bg-red-50 text-red-600 flex items-center justify-center mx-auto">
            <AlertCircle className="w-7 h-7" />
          </div>
          <h1 className="text-xl font-bold text-[#181522]">Booking Not Found</h1>
          <p className="text-xs text-[#777387] leading-relaxed">
            No active reservation was found matching reference identifier <code className="text-[#6D28D9] font-bold">&quot;{bookingId}&quot;</code>. This may happen if the booking expired or was created in a different browser session.
          </p>
          <div className="pt-2 flex flex-col gap-2">
            <Link
              href="/bookings"
              className="w-full py-3 rounded-xl bg-[#6D28D9] hover:bg-[#4C1D95] text-white text-xs font-semibold shadow-sm inline-flex items-center justify-center gap-1.5 transition-all"
            >
              <Ticket className="w-3.5 h-3.5" />
              <span>View My Bookings</span>
            </Link>
            <Link
              href="/"
              className="w-full py-2.5 rounded-xl bg-[#F8F7FC] hover:bg-[#F3E8FF] text-[#181522] text-xs font-semibold border border-[#E9E5F0] inline-flex items-center justify-center gap-1.5 transition-all"
            >
              <Home className="w-3.5 h-3.5" />
              <span>Return to Home</span>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full py-8 sm:py-12 bg-[#F8F7FC] print:bg-white print:py-0">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 space-y-8">
        {/* Top Success Banner (Hidden on print) */}
        <div className="flex flex-col items-center text-center space-y-3 print:hidden">
          <div className="relative flex items-center justify-center">
            <div className="w-16 h-16 rounded-full bg-[#DCFCE7] flex items-center justify-center text-[#16A34A] shadow-md shadow-green-500/20">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <span className="absolute -top-1 -right-1 flex h-4 w-4">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#16A34A] opacity-75" />
              <span className="relative inline-flex rounded-full h-4 w-4 bg-[#16A34A]" />
            </span>
          </div>

          <div className="space-y-1">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FAF7FF] border border-[#6D28D9]/25 text-[#6D28D9] text-xs font-bold uppercase tracking-wider mb-1">
              <span>Demo Booking Active</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-extrabold text-[#181522] tracking-tight">
              Booking Confirmed! 🎉
            </h1>
            <p className="text-xs sm:text-sm text-[#777387]">
              Your seats are successfully reserved. Present this digital ticket at the cinema usher gate.
            </p>
          </div>

          <div className="flex items-center gap-2 bg-white px-3.5 py-1.5 rounded-full border border-[#E9E5F0] shadow-2xs">
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#777387]">Reference:</span>
            <span className="text-xs font-mono font-bold text-[#6D28D9]">
              {booking.bookingReference}
            </span>
          </div>
        </div>

        {/* Digital Ticket Card */}
        <DigitalTicket booking={booking} />

        {/* Action Controls (Hidden on print) */}
        <div className="max-w-md mx-auto space-y-3 pt-2 print:hidden">
          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => window.print()}
              className="py-3 px-4 rounded-xl bg-white hover:bg-[#FAF7FF] border border-[#E9E5F0] text-xs font-bold text-[#181522] hover:text-[#6D28D9] hover:border-[#6D28D9]/40 shadow-sm flex items-center justify-center gap-2 transition-all cursor-pointer"
            >
              <Printer className="w-4 h-4 text-[#6D28D9]" />
              <span>Print / Save PDF</span>
            </button>

            <Link
              href="/bookings"
              className="py-3 px-4 rounded-xl bg-[#6D28D9] hover:bg-[#4C1D95] text-white text-xs font-bold shadow-md shadow-[#6D28D9]/25 flex items-center justify-center gap-2 transition-all"
            >
              <Ticket className="w-4 h-4" />
              <span>View in My Bookings</span>
            </Link>
          </div>

          <Link
            href="/"
            className="w-full py-2.5 rounded-xl text-center text-xs font-semibold text-[#777387] hover:text-[#181522] flex items-center justify-center gap-1.5 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Return to Movies</span>
          </Link>

          <div className="flex items-center justify-center gap-1.5 text-[11px] text-[#777387] pt-2">
            <ShieldCheck className="w-3.5 h-3.5 text-[#16A34A]" />
            <span>Saved in browser storage for this session</span>
          </div>
        </div>
      </div>
    </div>
  );
}
