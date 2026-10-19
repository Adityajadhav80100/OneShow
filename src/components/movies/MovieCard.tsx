"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Star, Clock, Ticket } from "lucide-react";
import { Movie } from "@/lib/tmdb/types";

interface MovieCardProps {
  movie: Movie;
  priority?: boolean;
}

const FALLBACK_POSTER =
  "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=500&auto=format&fit=crop&q=80";

export function MovieCard({ movie }: MovieCardProps) {
  const [imgSrc, setImgSrc] = useState(movie.posterUrl || FALLBACK_POSTER);

  return (
    <div className="group relative bg-white rounded-2xl border border-[#E9E5F0] overflow-hidden shadow-sm hover:shadow-xl hover:shadow-[#6D28D9]/10 hover:border-[#6D28D9]/40 transition-all duration-300 flex flex-col justify-between">
      {/* Poster Image Container */}
      <Link href={`/movies/${movie.id}`} className="relative block aspect-[2/3] w-full overflow-hidden bg-[#181522]">
        <Image
          src={imgSrc}
          alt={movie.title}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          onError={() => setImgSrc(FALLBACK_POSTER)}
          className="object-cover group-hover:scale-105 transition-transform duration-500"
          unoptimized
        />

        {/* Ambient Dark Gradient for Legibility */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />

        {/* Top Badges */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between gap-2 pointer-events-none">
          {/* Format Badge */}
          {movie.formats && movie.formats[0] && (
            <span className="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-white/90 text-[#6D28D9] backdrop-blur-md shadow-sm">
              {movie.formats[0]}
            </span>
          )}

          {/* Rating Badge */}
          <div className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#181522]/80 backdrop-blur-md text-white text-xs font-bold shadow-sm">
            <Star className="w-3.5 h-3.5 text-[#F59E0B] fill-[#F59E0B]" />
            <span>{movie.rating.toFixed(1)}</span>
          </div>
        </div>

        {/* Poster Bottom Overlay Info */}
        <div className="absolute bottom-3 left-3 right-3 text-white pointer-events-none">
          <div className="flex items-center gap-2 text-white/80 text-[11px] font-medium mb-1">
            <span className="truncate">{movie.genres.slice(0, 2).join(" • ")}</span>
            {movie.runtimeFormatted && (
              <span className="flex items-center gap-0.5 shrink-0">
                <Clock className="w-3 h-3" />
                {movie.runtimeFormatted}
              </span>
            )}
          </div>
          <h3 className="font-bold text-base text-white leading-snug line-clamp-1 group-hover:text-[#F3E8FF] transition-colors">
            {movie.title}
          </h3>
        </div>
      </Link>

      {/* Card Footer Actions */}
      <div className="p-3.5 bg-white border-t border-[#E9E5F0] flex items-center justify-between gap-2">
        <div className="min-w-0">
          <span className="text-[11px] text-[#777387] block uppercase tracking-wide font-medium">
            Starting from
          </span>
          <span className="text-sm font-extrabold text-[#181522]">
            ₹{movie.startingPrice || 250}
          </span>
        </div>

        <Link
          href={`/movies/${movie.id}`}
          className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#6D28D9] hover:bg-[#4C1D95] text-white text-xs font-semibold shadow-sm hover:shadow-md hover:shadow-[#6D28D9]/25 active:scale-95 transition-all"
        >
          <Ticket className="w-3.5 h-3.5" />
          <span>Book Tickets</span>
        </Link>
      </div>
    </div>
  );
}
