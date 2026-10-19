export function SeatLegend() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-8 py-3 px-4 bg-[#F8F7FC] rounded-xl border border-[#E9E5F0] text-xs font-medium text-[#777387] select-none">
      {/* 1. Available Standard */}
      <div className="flex items-center gap-2">
        <div className="w-5 h-5 rounded-md bg-white border border-[#E9E5F0] shadow-2xs" />
        <span>Available</span>
      </div>

      {/* 2. Available Recliner */}
      <div className="flex items-center gap-2">
        <div className="w-5 h-5 rounded-md bg-[#FAF7FF] border-1.5 border-[#6D28D9] shadow-2xs" />
        <span>Recliner VIP</span>
      </div>

      {/* 3. Selected */}
      <div className="flex items-center gap-2">
        <div className="w-5 h-5 rounded-md bg-[#6D28D9] border border-[#4C1D95] shadow-xs shadow-[#6D28D9]/40 flex items-center justify-center text-[10px] text-white font-bold">
          ✓
        </div>
        <span className="font-semibold text-[#6D28D9]">Selected</span>
      </div>

      {/* 4. Occupied */}
      <div className="flex items-center gap-2">
        <div className="w-5 h-5 rounded-md bg-[#E9E5F0] border border-transparent cursor-not-allowed flex items-center justify-center text-[9px] text-[#777387]">
          ✕
        </div>
        <span>Occupied</span>
      </div>
    </div>
  );
}
