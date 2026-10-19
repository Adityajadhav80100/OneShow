"use client";

import { useState, useMemo } from "react";
import { getBookingDates, SAMPLE_CINEMAS, SAMPLE_SHOWTIMES } from "@/lib/data/cinemas";
import { DateSelector } from "./DateSelector";
import { CinemaCard } from "./CinemaCard";
import { SlidersHorizontal, AlertCircle } from "lucide-react";

interface CinemaShowtimeMatrixProps {
  movieId: string | number;
  movieTitle: string;
}

const FORMAT_OPTIONS = ["All Formats", "IMAX 3D", "4DX 3D", "2D Dolby Atmos"];

export function CinemaShowtimeMatrix({ movieId, movieTitle }: CinemaShowtimeMatrixProps) {
  const dates = useMemo(() => getBookingDates(), []);
  const [selectedDateId, setSelectedDateId] = useState<string>("today");
  const [selectedFormat, setSelectedFormat] = useState<string>("All Formats");

  // Filter shows by date and format
  const activeShows = useMemo(() => {
    return SAMPLE_SHOWTIMES.filter((s) => {
      const matchesDate = s.dateId === selectedDateId;
      const matchesFormat =
        selectedFormat === "All Formats" ||
        s.format.toLowerCase().includes(selectedFormat.toLowerCase());
      return matchesDate && matchesFormat;
    });
  }, [selectedDateId, selectedFormat]);

  // Group shows by cinema
  const cinemasWithShows = useMemo(() => {
    return SAMPLE_CINEMAS.map((cinema) => {
      const showsForCinema = activeShows.filter((s) => s.cinemaId === cinema.id);
      return {
        cinema,
        showtimes: showsForCinema,
      };
    });
  }, [activeShows]);

  const totalShowsAvailable = activeShows.length;

  return (
    <section id="showtimes-section" className="w-full bg-[#FAF7FF] border-t border-[#E9E5F0] py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#6D28D9] animate-pulse" />
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#181522] tracking-tight">
                Select Cinema &amp; Showtimes
              </h2>
            </div>
            <p className="text-sm text-[#777387] mt-1">
              Screening <span className="font-semibold text-[#181522]">{movieTitle}</span> across premier verified theatres
            </p>
          </div>

          <div className="text-xs font-semibold text-[#777387] bg-white px-3.5 py-2 rounded-xl border border-[#E9E5F0] shadow-2xs self-start md:self-auto">
            {totalShowsAvailable} {totalShowsAvailable === 1 ? "screening" : "screenings"} available
          </div>
        </div>

        {/* 1. Date Selector Strip */}
        <div className="bg-white rounded-2xl border border-[#E9E5F0] p-4 sm:p-6 shadow-sm">
          <DateSelector
            dates={dates}
            selectedDateId={selectedDateId}
            onSelectDate={(id) => setSelectedDateId(id)}
          />
        </div>

        {/* 2. Format Filter Rail */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
            <span className="text-xs font-bold text-[#777387] uppercase tracking-wider flex items-center gap-1 shrink-0 mr-1">
              <SlidersHorizontal className="w-3.5 h-3.5" />
              <span>Format:</span>
            </span>
            {FORMAT_OPTIONS.map((format) => {
              const isSelected = selectedFormat === format;
              return (
                <button
                  key={format}
                  type="button"
                  onClick={() => setSelectedFormat(format)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all duration-200 cursor-pointer ${
                    isSelected
                      ? "bg-[#6D28D9] text-white shadow-sm"
                      : "bg-white text-[#777387] hover:text-[#181522] hover:bg-[#F3E8FF] border border-[#E9E5F0]"
                  }`}
                >
                  {format}
                </button>
              );
            })}
          </div>

          {selectedFormat !== "All Formats" && (
            <button
              type="button"
              onClick={() => setSelectedFormat("All Formats")}
              className="text-xs font-semibold text-[#6D28D9] hover:underline self-start sm:self-auto"
            >
              Reset format filter
            </button>
          )}
        </div>

        {/* 3. Cinemas & Showtimes Matrix */}
        {totalShowsAvailable > 0 ? (
          <div className="space-y-6">
            {cinemasWithShows.map(({ cinema, showtimes }) => (
              <CinemaCard
                key={cinema.id}
                cinema={cinema}
                showtimes={showtimes}
                movieId={movieId}
              />
            ))}
          </div>
        ) : (
          /* Empty State */
          <div className="w-full py-16 bg-white rounded-2xl border border-dashed border-[#E9E5F0] p-8 text-center flex flex-col items-center justify-center space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-[#F8F7FC] flex items-center justify-center text-[#777387]">
              <AlertCircle className="w-6 h-6 text-[#6D28D9]" />
            </div>
            <h3 className="text-base font-bold text-[#181522]">
              No screenings found for {selectedFormat}
            </h3>
            <p className="text-xs text-[#777387] max-w-md leading-relaxed">
              There are no available showtimes matching your selected format on this date. Try switching to &quot;All Formats&quot; or selecting a different date.
            </p>
            <button
              type="button"
              onClick={() => {
                setSelectedFormat("All Formats");
                setSelectedDateId("today");
              }}
              className="px-4 py-2 rounded-xl bg-[#6D28D9] text-white text-xs font-semibold shadow-sm hover:bg-[#4C1D95] transition-all"
            >
              Show All Screenings
            </button>
          </div>
        )}

        {/* Sample Data Notice */}
        <div className="p-4 rounded-xl bg-white border border-[#E9E5F0] text-center text-xs text-[#777387]">
          <span className="font-semibold text-[#181522]">Notice:</span> Showtimes and ticket pricing are simulated demonstration data designed for the OneShow booking workflow.
        </div>
      </div>
    </section>
  );
}
