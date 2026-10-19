"use client";

import { Cinema, Showtime } from "@/lib/data/cinemas";
import { ShowtimeButton } from "./ShowtimeButton";
import {
  MapPin,
  CheckCircle2,
  Coffee,
  Smartphone,
  Accessibility,
  Car,
} from "lucide-react";

interface CinemaCardProps {
  cinema: Cinema;
  showtimes: Showtime[];
  movieId: string | number;
}

export function CinemaCard({ cinema, showtimes, movieId }: CinemaCardProps) {
  const getAmenityIcon = (name: string) => {
    const lower = name.toLowerCase();
    if (lower.includes("food") || lower.includes("gourmet") || lower.includes("dining")) {
      return <Coffee className="w-3.5 h-3.5" />;
    }
    if (lower.includes("paperless") || lower.includes("ticket")) {
      return <Smartphone className="w-3.5 h-3.5" />;
    }
    if (lower.includes("wheelchair") || lower.includes("accessible")) {
      return <Accessibility className="w-3.5 h-3.5" />;
    }
    if (lower.includes("parking") || lower.includes("valet")) {
      return <Car className="w-3.5 h-3.5" />;
    }
    return <CheckCircle2 className="w-3.5 h-3.5" />;
  };

  return (
    <div className="bg-white rounded-2xl border border-[#E9E5F0] p-5 sm:p-6 shadow-sm hover:shadow-md transition-shadow flex flex-col gap-4">
      {/* Top Cinema Details */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#E9E5F0] pb-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <h3 className="text-base sm:text-lg font-bold text-[#181522]">
              {cinema.name}
            </h3>
            <CheckCircle2 className="w-4 h-4 text-[#6D28D9] shrink-0" />
          </div>

          <div className="flex items-center gap-1.5 text-xs text-[#777387]">
            <MapPin className="w-3.5 h-3.5 text-[#6D28D9] shrink-0" />
            <span>{cinema.location}</span>
            <span>•</span>
            <span className="font-semibold text-[#181522]">{cinema.distance}</span>
          </div>
        </div>

        {cinema.badge && (
          <span className="self-start sm:self-auto px-2.5 py-1 rounded-full bg-[#F3E8FF] text-[#6D28D9] text-xs font-bold uppercase tracking-wider border border-[#6D28D9]/20">
            {cinema.badge}
          </span>
        )}
      </div>

      {/* Showtimes Grid */}
      <div className="space-y-2">
        <span className="text-xs font-bold text-[#777387] uppercase tracking-wider">
          Available Screenings &amp; Auditoriums
        </span>

        {showtimes.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-4 gap-3 pt-1">
            {showtimes.map((show) => (
              <ShowtimeButton key={show.id} show={show} movieId={movieId} />
            ))}
          </div>
        ) : (
          <div className="py-6 text-center text-xs text-[#777387] bg-[#F8F7FC] rounded-xl border border-dashed border-[#E9E5F0]">
            No screenings available for this format on the selected date.
          </div>
        )}
      </div>

      {/* Amenities Row */}
      <div className="pt-2 border-t border-[#E9E5F0] flex flex-wrap items-center gap-4 text-xs text-[#777387]">
        {cinema.amenities.map((amenity) => (
          <div key={amenity} className="flex items-center gap-1.5">
            <span className="text-[#6D28D9]">{getAmenityIcon(amenity)}</span>
            <span>{amenity}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
