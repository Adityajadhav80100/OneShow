import { ReactNode } from "react";
import { Movie } from "@/lib/tmdb/types";
import { MovieCard } from "./MovieCard";
import { Film } from "lucide-react";

interface MovieSectionProps {
  id?: string;
  title: string;
  subtitle?: string;
  movies: Movie[];
  icon?: ReactNode;
  badge?: string;
  isLive?: boolean;
}

export function MovieSection({
  id,
  title,
  subtitle,
  movies,
  icon,
  badge,
  isLive = false,
}: MovieSectionProps) {
  return (
    <section id={id} className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-12">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
        <div>
          <div className="flex items-center gap-2.5">
            {isLive && (
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#6D28D9] opacity-75" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#6D28D9]" />
              </span>
            )}
            {icon}
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#181522] tracking-tight">
              {title}
            </h2>
            {badge && (
              <span className="hidden sm:inline-flex px-2.5 py-0.5 rounded-full bg-[#F3E8FF] text-[#6D28D9] text-xs font-bold border border-[#6D28D9]/20">
                {badge}
              </span>
            )}
          </div>
          {subtitle && <p className="text-sm text-[#777387] mt-1">{subtitle}</p>}
        </div>

        <div className="text-xs font-semibold text-[#777387] self-start sm:self-auto">
          Showing {movies.length} {movies.length === 1 ? "film" : "films"}
        </div>
      </div>

      {/* Movies Grid */}
      {movies.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {movies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      ) : (
        /* Empty State */
        <div className="w-full py-16 bg-white rounded-2xl border border-dashed border-[#E9E5F0] flex flex-col items-center justify-center text-center p-6 space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-[#F8F7FC] flex items-center justify-center text-[#777387]">
            <Film className="w-6 h-6" />
          </div>
          <h3 className="text-base font-bold text-[#181522]">No movies found</h3>
          <p className="text-xs text-[#777387] max-w-sm">
            We couldn&apos;t find any screenings matching your selected filters. Try choosing a different genre or searching for another title.
          </p>
        </div>
      )}
    </section>
  );
}
