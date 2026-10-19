"use client";

import { useState, useMemo } from "react";
import { Movie } from "@/lib/tmdb/types";
import { MovieSection } from "./MovieSection";
import { GenreFilter } from "./GenreFilter";
import { Search, Sparkles, Flame, Calendar, SlidersHorizontal } from "lucide-react";

interface MovieExplorerProps {
  nowPlaying: Movie[];
  popular: Movie[];
  upcoming: Movie[];
}

const AVAILABLE_GENRES = [
  "All",
  "Action",
  "Sci-Fi",
  "Adventure",
  "Animation",
  "Drama",
  "Comedy",
  "Thriller",
];

export function MovieExplorer({ nowPlaying, popular, upcoming }: MovieExplorerProps) {
  const [selectedGenre, setSelectedGenre] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredNowPlaying = useMemo(() => {
    return nowPlaying.filter((movie) => {
      const matchesGenre =
        selectedGenre === "All" ||
        movie.genres.some((g) => g.toLowerCase() === selectedGenre.toLowerCase());
      const matchesSearch =
        searchQuery.trim() === "" ||
        movie.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        movie.genres.some((g) => g.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchesGenre && matchesSearch;
    });
  }, [nowPlaying, selectedGenre, searchQuery]);

  const filteredPopular = useMemo(() => {
    return popular.filter((movie) => {
      const matchesGenre =
        selectedGenre === "All" ||
        movie.genres.some((g) => g.toLowerCase() === selectedGenre.toLowerCase());
      const matchesSearch =
        searchQuery.trim() === "" ||
        movie.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        movie.genres.some((g) => g.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchesGenre && matchesSearch;
    });
  }, [popular, selectedGenre, searchQuery]);

  const filteredUpcoming = useMemo(() => {
    return upcoming.filter((movie) => {
      const matchesGenre =
        selectedGenre === "All" ||
        movie.genres.some((g) => g.toLowerCase() === selectedGenre.toLowerCase());
      const matchesSearch =
        searchQuery.trim() === "" ||
        movie.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        movie.genres.some((g) => g.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchesGenre && matchesSearch;
    });
  }, [upcoming, selectedGenre, searchQuery]);

  const isFiltered = selectedGenre !== "All" || searchQuery.trim().length > 0;

  return (
    <div className="w-full flex flex-col">
      {/* Interactive Filter & Search Bar */}
      <div className="w-full bg-white border-y border-[#E9E5F0] sticky top-20 z-30 shadow-xs backdrop-blur-md bg-white/95 py-3">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-3">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
            {/* Search Input */}
            <div className="relative w-full md:max-w-sm flex items-center">
              <Search className="w-4 h-4 absolute left-3.5 text-[#777387] pointer-events-none" />
              <input
                type="text"
                placeholder="Filter movies by title or genre..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full h-10 pl-10 pr-4 bg-[#F8F7FC] border border-[#E9E5F0] rounded-xl text-sm text-[#181522] placeholder-[#777387] focus:outline-none focus:border-[#6D28D9] focus:bg-white focus:ring-2 focus:ring-[#6D28D9]/15 transition-all"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 text-xs text-[#777387] hover:text-[#181522]"
                >
                  Clear
                </button>
              )}
            </div>

            {/* Quick Filter Reset / Active Indicators */}
            {isFiltered && (
              <div className="flex items-center gap-2 self-start md:self-auto">
                <span className="text-xs text-[#777387]">Active filters:</span>
                {selectedGenre !== "All" && (
                  <span className="px-2.5 py-0.5 rounded-full bg-[#F3E8FF] text-[#6D28D9] text-xs font-semibold">
                    {selectedGenre}
                  </span>
                )}
                {searchQuery && (
                  <span className="px-2.5 py-0.5 rounded-full bg-[#F8F7FC] border border-[#E9E5F0] text-[#181522] text-xs font-medium">
                    &quot;{searchQuery}&quot;
                  </span>
                )}
                <button
                  type="button"
                  onClick={() => {
                    setSelectedGenre("All");
                    setSearchQuery("");
                  }}
                  className="text-xs font-bold text-[#6D28D9] hover:underline ml-1"
                >
                  Reset all
                </button>
              </div>
            )}
          </div>

          {/* Genre Pills */}
          <div className="flex items-center gap-2">
            <div className="hidden sm:flex items-center gap-1 text-xs font-semibold text-[#777387] shrink-0 mr-1">
              <SlidersHorizontal className="w-3.5 h-3.5" />
              <span>Genres:</span>
            </div>
            <GenreFilter
              genres={AVAILABLE_GENRES}
              selectedGenre={selectedGenre}
              onSelectGenre={(genre) => setSelectedGenre(genre)}
            />
          </div>
        </div>
      </div>

      {/* Movie Sections */}
      <div className="w-full space-y-4 py-4">
        {/* Section 1: Now Playing */}
        <MovieSection
          id="now-playing"
          title="Now Playing in Cinemas"
          subtitle="Real-time releases screening in premium theatre formats"
          movies={filteredNowPlaying}
          isLive={true}
          badge="Live Screenings"
          icon={<Flame className="w-5 h-5 text-[#6D28D9]" />}
        />

        {/* Section 2: Popular Blockbusters */}
        <MovieSection
          id="popular"
          title="Trending Blockbusters"
          subtitle="Top rated audience favorites and critically acclaimed releases"
          movies={filteredPopular}
          badge="Audience Choice"
          icon={<Sparkles className="w-5 h-5 text-[#F59E0B]" />}
        />

        {/* Section 3: Upcoming Premieres */}
        <MovieSection
          id="upcoming"
          title="Upcoming Premieres"
          subtitle="Upcoming cinematic events opening soon in theatres"
          movies={filteredUpcoming}
          badge="Coming Soon"
          icon={<Calendar className="w-5 h-5 text-[#6D28D9]" />}
        />
      </div>
    </div>
  );
}
