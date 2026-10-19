import { notFound } from "next/navigation";
import Link from "next/link";
import { getMovieDetails } from "@/lib/tmdb/client";
import { Star, Clock, Calendar, ArrowLeft, Ticket, Film, ShieldCheck } from "lucide-react";
import { HeroBanner } from "@/components/movies/HeroBanner";
import { CinemaShowtimeMatrix } from "@/components/booking/CinemaShowtimeMatrix";

interface MovieDetailsPageProps {
  params: Promise<{ id: string }>;
}

export default async function MovieDetailsPage({ params }: MovieDetailsPageProps) {
  const { id } = await params;
  const movie = await getMovieDetails(id);

  if (!movie) {
    notFound();
  }

  return (
    <div className="w-full flex flex-col items-center">
      {/* Top Breadcrumb / Back Bar */}
      <div className="w-full bg-white border-b border-[#E9E5F0] py-3">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            href="/#now-playing"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#777387] hover:text-[#6D28D9] transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to All Movies</span>
          </Link>
        </div>
      </div>

      {/* Cinematic Hero Header with Trailer Integration */}
      <HeroBanner movie={movie} />

      {/* Movie Information & Quick Booking Card */}
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left 2 Cols: Synopsis & Formats */}
          <div className="lg:col-span-2 space-y-8">
            {/* Storyline */}
            <div className="bg-white rounded-2xl border border-[#E9E5F0] p-6 shadow-sm space-y-3">
              <h2 className="text-xl font-bold text-[#181522]">About the Movie</h2>
              <p className="text-[#777387] text-sm sm:text-base leading-relaxed">
                {movie.overview}
              </p>
            </div>

            {/* Screening Formats */}
            <div className="bg-white rounded-2xl border border-[#E9E5F0] p-6 shadow-sm space-y-4">
              <h2 className="text-xl font-bold text-[#181522]">Available Formats &amp; Sound</h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {movie.formats?.map((format) => (
                  <div
                    key={format}
                    className="p-3.5 rounded-xl bg-[#F8F7FC] border border-[#E9E5F0] flex items-center gap-2.5"
                  >
                    <div className="w-8 h-8 rounded-lg bg-[#F3E8FF] flex items-center justify-center text-[#6D28D9] shrink-0">
                      <Film className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="text-xs font-bold text-[#181522] block">{format}</span>
                      <span className="text-[10px] text-[#777387]">Ultra High Definition</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Col: Quick Ticket Booking Summary Card */}
          <div className="space-y-6">
            <div className="bg-white rounded-2xl border border-[#E9E5F0] p-6 shadow-sm space-y-6 sticky top-24">
              <div>
                <span className="text-xs font-bold text-[#777387] uppercase tracking-wider block">
                  Tickets From
                </span>
                <span className="text-3xl font-extrabold text-[#181522]">
                  ₹{movie.startingPrice || 250}
                </span>
                <span className="text-xs text-[#777387] block mt-1">
                  Inclusive of all standard cinema taxes
                </span>
              </div>

              <div className="space-y-3 text-xs text-[#777387] border-y border-[#E9E5F0] py-4">
                <div className="flex items-center justify-between">
                  <span>Rating:</span>
                  <span className="font-bold text-[#181522] flex items-center gap-1">
                    <Star className="w-3.5 h-3.5 text-[#F59E0B] fill-[#F59E0B]" />
                    {movie.rating.toFixed(1)} / 10
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Duration:</span>
                  <span className="font-bold text-[#181522] flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" />
                    {movie.runtimeFormatted}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Release Date:</span>
                  <span className="font-bold text-[#181522] flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5" />
                    {movie.releaseDate}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Certification:</span>
                  <span className="font-bold text-[#6D28D9] bg-[#F3E8FF] px-2 py-0.5 rounded">
                    {movie.certification || "UA 16+"}
                  </span>
                </div>
              </div>

              {/* Scroll To Showtimes CTA */}
              <a
                href="#showtimes-section"
                className="w-full py-3.5 rounded-xl bg-[#6D28D9] hover:bg-[#4C1D95] text-white text-sm font-semibold shadow-md shadow-[#6D28D9]/25 hover:shadow-lg flex items-center justify-center gap-2 transition-all active:scale-95"
              >
                <Ticket className="w-4 h-4" />
                <span>Select Cinema &amp; Showtimes</span>
              </a>

              <div className="flex items-center gap-2 text-[11px] text-[#777387] justify-center">
                <ShieldCheck className="w-3.5 h-3.5 text-[#16A34A]" />
                <span>Instant confirmation &amp; digital QR pass</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Cinema and Showtime Selection Section */}
      <CinemaShowtimeMatrix movieId={movie.id} movieTitle={movie.title} />
    </div>
  );
}
