import { notFound } from "next/navigation";
import Link from "next/link";
import { getShowtimeById } from "@/lib/data/cinemas";
import { getMovieDetails } from "@/lib/tmdb/client";
import { generateAuditoriumLayout } from "@/lib/data/seats";
import { SeatSelectionExperience } from "@/components/booking/SeatSelectionExperience";
import {
  ArrowLeft,
  Clock,
  Film,
  MapPin,
  ShieldCheck,
  CheckCircle2,
} from "lucide-react";

interface BookingPageProps {
  params: Promise<{ showId: string }>;
  searchParams: Promise<{ movieId?: string }>;
}

export default async function BookingPage({ params, searchParams }: BookingPageProps) {
  const { showId } = await params;
  const { movieId } = await searchParams;

  const show = getShowtimeById(showId);
  const movie = movieId ? await getMovieDetails(movieId) : null;

  if (!show) {
    notFound();
  }

  const initialSeats = generateAuditoriumLayout(showId);
  const movieTitle = movie?.title || "Feature Presentation";

  return (
    <div className="w-full min-h-[85vh] flex flex-col items-center bg-[#F8F7FC] py-6 sm:py-10 pb-24 lg:pb-12">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        {/* Top Back Action */}
        <div>
          <Link
            href={movieId ? `/movies/${movieId}#showtimes-section` : "/"}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#777387] hover:text-[#6D28D9] transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Cinema Showtimes</span>
          </Link>
        </div>

        {/* Selected Show Context Header Card */}
        <div className="bg-white rounded-2xl border border-[#E9E5F0] p-5 sm:p-6 shadow-sm space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#E9E5F0] pb-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full bg-[#6D28D9] text-white text-xs font-bold uppercase tracking-wider">
                  {show.format}
                </span>
                <h1 className="text-xl sm:text-2xl font-extrabold text-[#181522]">
                  {movieTitle}
                </h1>
              </div>
              <div className="flex items-center gap-1.5 text-xs text-[#777387]">
                <MapPin className="w-3.5 h-3.5 text-[#6D28D9]" />
                <span className="font-semibold text-[#181522]">{show.cinemaName}</span>
                <span>•</span>
                <span>{show.cinemaLocation}</span>
              </div>
            </div>

            <div className="flex items-center gap-2 self-start sm:self-auto">
              <span className="px-3 py-1.5 rounded-xl bg-[#F3E8FF] text-[#6D28D9] text-xs font-bold flex items-center gap-1 border border-[#6D28D9]/20">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>{show.screenName}</span>
              </span>
            </div>
          </div>

          {/* Quick Meta Row */}
          <div className="flex flex-wrap items-center gap-4 sm:gap-8 text-xs text-[#777387]">
            <div className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-[#6D28D9]" />
              <span className="font-semibold text-[#181522]">{show.time}</span>
              <span>Screening</span>
            </div>

            <div className="flex items-center gap-1.5">
              <Film className="w-3.5 h-3.5 text-[#6D28D9]" />
              <span>Format:</span>
              <span className="font-semibold text-[#181522]">{show.format}</span>
            </div>

            <div className="flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-[#6D28D9]" />
              <span>Language:</span>
              <span className="font-semibold text-[#181522]">{show.language}</span>
            </div>
          </div>
        </div>

        {/* Interactive Theatre Seating Experience */}
        <SeatSelectionExperience
          show={show}
          movieId={movieId}
          initialSeats={initialSeats}
        />
      </div>
    </div>
  );
}
