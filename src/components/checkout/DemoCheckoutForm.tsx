"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Showtime } from "@/lib/data/cinemas";
import { Movie } from "@/lib/tmdb/types";
import { Seat } from "@/lib/data/seats";
import {
  saveBooking,
  generateBookingReference,
  StoredBooking,
} from "@/lib/storage/bookings";
import {
  Ticket,
  ShieldCheck,
  CreditCard,
  Loader2,
  AlertCircle,
  User,
  Mail,
  Phone,
} from "lucide-react";

interface DemoCheckoutFormProps {
  show: Showtime;
  movie: Movie | null;
  selectedSeats: Seat[];
  subtotal: number;
  convenienceFee: number;
  grandTotal: number;
}

export function DemoCheckoutForm({
  show,
  movie,
  selectedSeats,
  subtotal,
  convenienceFee,
  grandTotal,
}: DemoCheckoutFormProps) {
  const router = useRouter();

  // Form states
  const [fullName, setFullName] = useState("Alex Johnson");
  const [email, setEmail] = useState("alex.johnson@example.com");
  const [phone, setPhone] = useState("+91 98765 43210");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleConfirmBooking = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (selectedSeats.length === 0) {
      setErrorMessage("No seats selected. Please go back to select seats.");
      return;
    }

    if (!fullName.trim() || !email.trim()) {
      setErrorMessage("Please provide a name and email for your digital ticket.");
      return;
    }

    setIsSubmitting(true);

    try {
      // Simulate network latency for realistic UX
      await new Promise((resolve) => setTimeout(resolve, 800));

      const bookingReference = generateBookingReference();
      const bookingId = bookingReference.toLowerCase().replace(/[^a-z0-9]/g, "-");

      const newBooking: StoredBooking = {
        id: bookingId,
        bookingReference,
        movieId: movie?.id || "movie-1",
        movieTitle: movie?.title || "Feature Presentation",
        posterUrl:
          movie?.posterUrl ||
          "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=500&auto=format&fit=crop&q=80",
        backdropUrl:
          movie?.backdropUrl ||
          "https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?w=1280&auto=format&fit=crop&q=80",
        cinemaId: show.cinemaId,
        cinemaName: show.cinemaName,
        cinemaLocation: show.cinemaLocation,
        showId: show.id,
        showDate: "Today, 24 Oct",
        showTime: show.time,
        screenName: show.screenName,
        format: show.format,
        seats: selectedSeats.map((s) => ({
          id: s.id,
          tier: s.tier,
          price: s.price,
        })),
        ticketCount: selectedSeats.length,
        subtotal,
        convenienceFee,
        totalAmount: grandTotal,
        createdAt: new Date().toISOString(),
        status: "CONFIRMED",
        isDemo: true,
      };

      const saved = saveBooking(newBooking);
      if (!saved) {
        throw new Error("Unable to save booking to local storage.");
      }

      // Navigate to confirmation page
      router.push(`/confirmation/${newBooking.id}`);
    } catch (err) {
      console.error("[OneShow Demo Checkout] Error creating booking:", err);
      setErrorMessage("Failed to process demo booking. Please try again.");
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleConfirmBooking} className="space-y-6">
      {/* Contact Details Card */}
      <div className="bg-white rounded-2xl border border-[#E9E5F0] p-6 shadow-sm space-y-4">
        <h3 className="text-base font-bold text-[#181522] border-b border-[#E9E5F0] pb-3">
          Contact Details for Digital Ticket
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Full Name */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-[#181522] flex items-center gap-1.5">
              <User className="w-3.5 h-3.5 text-[#6D28D9]" />
              <span>Full Name</span>
            </label>
            <input
              type="text"
              required
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              disabled={isSubmitting}
              className="w-full h-11 px-3.5 bg-[#F8F7FC] border border-[#E9E5F0] rounded-xl text-xs sm:text-sm text-[#181522] focus:outline-none focus:border-[#6D28D9] focus:bg-white focus:ring-2 focus:ring-[#6D28D9]/15 transition-all"
            />
          </div>

          {/* Email */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-[#181522] flex items-center gap-1.5">
              <Mail className="w-3.5 h-3.5 text-[#6D28D9]" />
              <span>Email Address</span>
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={isSubmitting}
              className="w-full h-11 px-3.5 bg-[#F8F7FC] border border-[#E9E5F0] rounded-xl text-xs sm:text-sm text-[#181522] focus:outline-none focus:border-[#6D28D9] focus:bg-white focus:ring-2 focus:ring-[#6D28D9]/15 transition-all"
            />
          </div>

          {/* Phone */}
          <div className="space-y-1.5 sm:col-span-2">
            <label className="text-xs font-semibold text-[#181522] flex items-center gap-1.5">
              <Phone className="w-3.5 h-3.5 text-[#6D28D9]" />
              <span>Mobile Number (for SMS &amp; WhatsApp ticket)</span>
            </label>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              disabled={isSubmitting}
              className="w-full h-11 px-3.5 bg-[#F8F7FC] border border-[#E9E5F0] rounded-xl text-xs sm:text-sm text-[#181522] focus:outline-none focus:border-[#6D28D9] focus:bg-white focus:ring-2 focus:ring-[#6D28D9]/15 transition-all"
            />
          </div>
        </div>
      </div>

      {/* Demo Mode Notice Banner */}
      <div className="p-4 rounded-xl bg-[#FAF7FF] border border-[#6D28D9]/25 text-xs text-[#181522] flex items-start gap-3 shadow-2xs">
        <CreditCard className="w-5 h-5 text-[#6D28D9] shrink-0 mt-0.5" />
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="font-bold text-xs text-[#6D28D9] uppercase tracking-wide">
              Demo Checkout Mode
            </span>
            <span className="px-2 py-0.2 rounded-full text-[9px] font-bold bg-[#6D28D9] text-white">
              No Real Charge
            </span>
          </div>
          <p className="text-[#777387] leading-relaxed">
            This application is in portfolio demonstration mode. Clicking confirm will simulate a validated transaction, save your reservation to browser storage, and generate a verified digital pass with turnstile QR code.
          </p>
        </div>
      </div>

      {/* Error Alert */}
      {errorMessage && (
        <div className="p-3.5 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs font-medium flex items-center gap-2 animate-in fade-in duration-200">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{errorMessage}</span>
        </div>
      )}

      {/* Confirm Button */}
      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full py-4 rounded-xl bg-[#6D28D9] hover:bg-[#4C1D95] text-white font-bold text-sm shadow-md shadow-[#6D28D9]/25 hover:shadow-lg hover:shadow-[#6D28D9]/30 active:scale-98 transition-all flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed cursor-pointer"
      >
        {isSubmitting ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" />
            <span>Reserving Seats &amp; Generating Pass...</span>
          </>
        ) : (
          <>
            <Ticket className="w-4 h-4" />
            <span>Confirm Demo Booking • ₹{grandTotal.toFixed(2)}</span>
          </>
        )}
      </button>

      <div className="flex items-center justify-center gap-1.5 text-[11px] text-[#777387]">
        <ShieldCheck className="w-3.5 h-3.5 text-[#16A34A]" />
        <span>100% Guaranteed reservation • Instant paperless digital ticket</span>
      </div>
    </form>
  );
}
