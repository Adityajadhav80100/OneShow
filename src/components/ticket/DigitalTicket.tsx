"use client";

import Image from "next/image";
import { StoredBooking } from "@/lib/storage/bookings";
import { MapPin, DoorClosed, Coffee } from "lucide-react";

interface DigitalTicketProps {
  booking: StoredBooking;
}

export function DigitalTicket({ booking }: DigitalTicketProps) {
  // Extract row labels from seats
  const rows = Array.from(new Set(booking.seats.map((s) => s.id.charAt(0)))).join(", ");
  const seatIds = booking.seats.map((s) => s.id).join(", ");
  const primaryTier = booking.seats[0]?.tier === "RECLINER" ? "Recliner Lounge" : "Prime Plus";

  return (
    <div className="relative w-full max-w-md mx-auto bg-white rounded-2xl shadow-xl border border-[#E9E5F0] overflow-hidden print:border-none print:shadow-none">
      {/* 1. Movie Media Header Section */}
      <div className="relative w-full h-44 bg-[#181522] overflow-hidden">
        <Image
          src={booking.backdropUrl}
          alt={booking.movieTitle}
          fill
          sizes="400px"
          className="object-cover opacity-75"
          unoptimized
        />
        <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-black/40" />

        {/* Top Badges */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
          <span className="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-black/60 text-white backdrop-blur-md">
            {booking.format}
          </span>
          <span className="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-white/90 text-[#6D28D9] backdrop-blur-md shadow-xs">
            {booking.screenName}
          </span>
        </div>

        {/* Title Overlay */}
        <div className="absolute bottom-2 left-4 right-4 text-[#181522]">
          <span className="text-[10px] font-bold uppercase tracking-wider text-[#6D28D9] block">
            Verified Presentation
          </span>
          <h3 className="text-xl font-extrabold text-[#181522] leading-tight truncate">
            {booking.movieTitle}
          </h3>
        </div>
      </div>

      {/* 2. Venue & Timing Card */}
      <div className="p-5 space-y-4">
        <div className="bg-[#FAF7FF] p-3.5 rounded-xl border border-[#E9E5F0] flex items-start justify-between gap-3">
          <div className="flex items-start gap-2.5 min-w-0">
            <div className="w-8 h-8 rounded-lg bg-[#F3E8FF] flex items-center justify-center text-[#6D28D9] shrink-0 mt-0.5">
              <MapPin className="w-4 h-4" />
            </div>
            <div className="min-w-0">
              <p className="text-sm font-bold text-[#181522] truncate">{booking.cinemaName}</p>
              <p className="text-xs text-[#777387] truncate">{booking.cinemaLocation}</p>
            </div>
          </div>
          <div className="text-right shrink-0">
            <p className="text-sm font-bold text-[#6D28D9]">{booking.showTime}</p>
            <p className="text-xs text-[#777387]">{booking.showDate}</p>
          </div>
        </div>

        {/* 3. Seating Breakdown Bento */}
        <div className="grid grid-cols-3 gap-2">
          <div className="bg-[#F8F7FC] p-2.5 rounded-xl border border-[#E9E5F0] text-center flex flex-col justify-center">
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#777387]">Row</span>
            <span className="text-base font-extrabold text-[#181522]">{rows}</span>
          </div>

          <div className="bg-[#FAF7FF] p-2.5 rounded-xl border border-[#6D28D9]/25 text-center flex flex-col justify-center">
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#6D28D9]">Seats</span>
            <span className="text-base font-extrabold text-[#6D28D9] truncate px-1">
              {seatIds}
            </span>
          </div>

          <div className="bg-[#F8F7FC] p-2.5 rounded-xl border border-[#E9E5F0] text-center flex flex-col justify-center">
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#777387]">Tier</span>
            <span className="text-xs font-bold text-[#181522] truncate">{primaryTier}</span>
          </div>
        </div>

        {/* 4. Logistic Badges */}
        <div className="flex items-center justify-between text-xs text-[#777387] bg-[#F8F7FC] px-3 py-2 rounded-xl border border-[#E9E5F0]">
          <div className="flex items-center gap-1.5">
            <DoorClosed className="w-4 h-4 text-[#6D28D9]" />
            <span>Gate Opens: 20m Prior</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Coffee className="w-4 h-4 text-[#6D28D9]" />
            <span>F&amp;B: Counter 2</span>
          </div>
        </div>
      </div>

      {/* 5. Perforation Strip With Realistic Radial Cutout Notches */}
      <div className="relative w-full flex items-center justify-between my-1">
        {/* Left Cutout Notch */}
        <div className="w-5 h-8 bg-[#F8F7FC] rounded-r-full -ml-1 border-y border-r border-[#E9E5F0]" />
        {/* Dashed Line Divider */}
        <div className="flex-1 border-t-2 border-dashed border-[#CCC3D7] mx-2" />
        {/* Right Cutout Notch */}
        <div className="w-5 h-8 bg-[#F8F7FC] rounded-l-full -mr-1 border-y border-l border-[#E9E5F0]" />
      </div>

      {/* 6. High-Contrast QR Code Section */}
      <div className="p-6 pt-2 flex flex-col items-center text-center space-y-3">
        <div className="relative bg-white p-3.5 rounded-2xl border border-[#E9E5F0] shadow-sm flex flex-col items-center">
          {/* Subtle Live Scan Animation Line */}
          <div className="absolute inset-x-3 h-0.5 bg-[#6D28D9] shadow-[0_0_8px_#6d28d9] rounded-full animate-pulse top-8 pointer-events-none" />

          {/* High-Contrast Vector QR Representation */}
          <svg className="w-40 h-40 text-[#181522]" fill="currentColor" viewBox="0 0 160 160">
            {/* Corner Marker Top-Left */}
            <path d="M12 12h36v36H12z M18 18v24h24V18H18z M24 24h12v12H24z" />
            {/* Corner Marker Top-Right */}
            <path d="M112 12h36v36h-36z M118 18v24h24V18h-24z M124 24h12v12h-12z" />
            {/* Corner Marker Bottom-Left */}
            <path d="M12 112h36v36H12z M18 118v24h24v-24H18z M24 124h12v12H24z" />
            {/* Scannable Mosaic Elements */}
            <rect height="8" width="8" x="54" y="16" />
            <rect height="8" width="16" x="68" y="16" />
            <rect height="8" width="8" x="90" y="16" />
            <rect height="6" width="14" x="54" y="32" />
            <rect height="12" width="10" x="74" y="30" />
            <rect height="6" width="14" x="90" y="32" />
            <rect height="8" width="8" x="16" y="54" />
            <rect height="6" width="14" x="30" y="54" />
            <rect height="14" width="6" x="16" y="68" />
            <rect height="12" width="12" x="32" y="70" />
            <rect height="6" width="14" x="16" y="90" />
            <rect height="14" width="8" x="36" y="88" />
            <rect height="10" width="10" x="54" y="54" />
            <rect height="18" width="8" x="70" y="54" />
            <rect height="8" width="12" x="84" y="54" />
            <rect height="8" width="14" x="102" y="54" />
            <rect height="14" width="8" x="122" y="54" />
            <rect height="8" width="10" x="136" y="54" />
            <rect height="8" width="12" x="54" y="72" />
            <rect height="14" width="14" x="72" y="78" />
            <rect height="14" width="14" x="92" y="68" />
            <rect height="8" width="18" x="112" y="74" />
            <rect height="18" width="8" x="136" y="70" />
            <rect height="14" width="12" x="54" y="88" />
            <rect height="8" width="14" x="72" y="98" />
            <rect height="16" width="8" x="92" y="88" />
            <rect height="6" width="18" x="106" y="90" />
            <rect height="12" width="14" x="130" y="94" />
            <rect height="14" width="8" x="54" y="112" />
            <rect height="8" width="14" x="68" y="118" />
            <rect height="12" width="12" x="88" y="112" />
            <rect height="18" width="8" x="106" y="112" />
            <rect height="8" width="14" x="120" y="112" />
            <rect height="12" width="6" x="140" y="118" />
            <rect height="14" width="18" x="54" y="132" />
            <rect height="8" width="14" x="78" y="132" />
            <rect height="10" width="16" x="98" y="136" />
            <rect height="20" width="8" x="120" y="126" />
            <rect height="10" width="12" x="134" y="136" />
          </svg>
        </div>

        <p className="text-xs font-mono font-bold text-[#6D28D9] tracking-wider">
          {booking.bookingReference}
        </p>
        <p className="text-[11px] text-[#777387] max-w-xs">
          Scan this digital ticket at cinema turnstiles or usher scanners for entry.
        </p>
      </div>

      {/* 7. Bottom Price Confirmation */}
      <div className="bg-[#FAF7FF] border-t border-[#E9E5F0] px-5 py-3 flex items-center justify-between text-xs">
        <span className="text-[#777387]">Total Paid (Demo):</span>
        <span className="text-sm font-extrabold text-[#181522]">
          ₹{booking.totalAmount.toFixed(2)}
        </span>
      </div>
    </div>
  );
}
