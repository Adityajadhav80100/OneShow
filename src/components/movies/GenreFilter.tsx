"use client";

interface GenreFilterProps {
  genres: string[];
  selectedGenre: string;
  onSelectGenre: (genre: string) => void;
}

export function GenreFilter({ genres, selectedGenre, onSelectGenre }: GenreFilterProps) {
  return (
    <div className="w-full flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none no-scrollbar py-1">
      {genres.map((genre) => {
        const isSelected = selectedGenre.toLowerCase() === genre.toLowerCase();
        return (
          <button
            key={genre}
            type="button"
            onClick={() => onSelectGenre(genre)}
            className={`px-4 py-2 rounded-full text-xs sm:text-sm font-semibold whitespace-nowrap transition-all duration-200 cursor-pointer ${
              isSelected
                ? "bg-[#6D28D9] text-white shadow-md shadow-[#6D28D9]/25 scale-102"
                : "bg-white text-[#777387] hover:text-[#181522] hover:bg-[#F3E8FF] border border-[#E9E5F0]"
            }`}
          >
            {genre}
          </button>
        );
      })}
    </div>
  );
}
