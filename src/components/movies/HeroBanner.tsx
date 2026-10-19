"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Star, Clock, Ticket, Play, Info } from "lucide-react";
import { Movie } from "@/lib/tmdb/types";
import { TrailerModal } from "./TrailerModal";

interface HeroBannerProps {
  movie: Movie;
}

export function HeroBanner({ movie }: HeroBannerProps) {
  const [isTrailerOpen, setIsTrailerOpen] = useState(false);
  const [backdropSrc, setBackdropSrc] = useState(movie.backdropUrl);

  const fallbackBackdrop =
    "https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?w=1280&auto=format&fit=crop&q=80";

  return (
    <>
      <section className="relative w-full overflow-hidden bg-[#181522] text-white">
        {/* Cinematic Backdrop Image */}
        <div className="relative w-full h-[480px] sm:h-[540px] md:h-[600px] overflow-hidden">
          <Image
            src={backdropSrc}
            alt={movie.title}
            fill
            sizes="100vw"
            priority
            onError={() => setBackdropSrc(fallbackBackdrop)}
            className="object-cover object-top opacity-50 scale-105 animate-in fade-in zoom-in-95 duration-1000"
            unoptimized
          />

          {/* Luxury Layered Gradients */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#181522] via-[#181522]/60 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#181522] via-[#181522]/70 to-transparent max-w-3xl" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#6D28D9]/20 via-transparent to-transparent pointer-events-none" />

          {/* Hero Content Container */}
          <div className="absolute inset-0 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col justify-end pb-12 sm:pb-16">
            <div className="max-w-2xl space-y-4">
              {/* Badges Rail */}
              <div className="flex flex-wrap items-center gap-2">
                <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-[#6D28D9] text-white shadow-md shadow-[#6D28D9]/30">
                  {movie.formats?.[0] || "IMAX 3D EXCLUSIVE"}
                </span>

                <div className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-white/15 backdrop-blur-md text-white text-xs font-bold border border-white/10">
                  <Star className="w-3.5 h-3.5 text-[#F59E0B] fill-[#F59E0B]" />
                  <span>{movie.rating.toFixed(1)} Rating</span>
                </div>

                <div className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-white/10 backdrop-blur-md text-white/90 text-xs font-medium border border-white/5">
                  <Clock className="w-3.5 h-3.5" />
                  <span>{movie.runtimeFormatted}</span>
                </div>

                <span className="px-2 py-0.5 rounded text-[11px] font-semibold bg-white/10 text-white/80">
                  {movie.certification || "UA 16+"}
                </span>
              </div>

              {/* Title */}
              <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-white leading-[1.1] drop-shadow-md">
                {movie.title}
              </h1>

              {/* Genres */}
              <p className="text-sm font-semibold text-[#F3E8FF] uppercase tracking-wider">
                {movie.genres.join(" • ")}
              </p>

              {/* Overview */}
              <p className="text-sm sm:text-base text-white/80 leading-relaxed line-clamp-2 sm:line-clamp-3 max-w-xl">
                {movie.overview}
              </p>

              {/* CTAs */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                {/* Book Tickets */}
                <Link
                  href={`/movies/${movie.id}`}
                  className="px-6 py-3.5 rounded-xl bg-[#6D28D9] hover:bg-[#4C1D95] text-white text-sm font-semibold shadow-lg shadow-[#6D28D9]/30 hover:shadow-xl hover:shadow-[#6D28D9]/40 active:scale-95 transition-all inline-flex items-center gap-2"
                >
                  <Ticket className="w-4 h-4" />
                  <span>Book Tickets</span>
                </Link>

                {/* Watch Trailer CTA (Rendered only if trailer key is available) */}
                {movie.trailerKey && (
                  <button
                    type="button"
                    onClick={() => setIsTrailerOpen(true)}
                    className="px-5 py-3.5 rounded-xl bg-white/15 hover:bg-white/25 text-white text-sm font-semibold backdrop-blur-md border border-white/20 active:scale-95 transition-all inline-flex items-center gap-2"
                  >
                    <Play className="w-4 h-4 fill-white" />
                    <span>Watch Trailer</span>
                  </button>
                )}

                {/* View Details */}
                <Link
                  href={`/movies/${movie.id}`}
                  className="px-4 py-3.5 rounded-xl bg-transparent hover:bg-white/10 text-white/90 hover:text-white text-sm font-semibold transition-all inline-flex items-center gap-1.5"
                >
                  <Info className="w-4 h-4" />
                  <span>View Details</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trailer Modal */}
      {movie.trailerKey && (
        <TrailerModal
          isOpen={isTrailerOpen}
          onClose={() => setIsTrailerOpen(false)}
          videoKey={movie.trailerKey}
          movieTitle={movie.title}
        />
      )}
    </>
  );
}
