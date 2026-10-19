export function MovieCardSkeleton() {
  return (
    <div className="bg-white rounded-2xl border border-[#E9E5F0] overflow-hidden shadow-sm animate-pulse flex flex-col justify-between">
      <div className="aspect-[2/3] w-full bg-[#E9E5F0]/60 relative">
        <div className="absolute top-3 left-3 w-16 h-5 rounded-full bg-[#DED7EA]/50" />
        <div className="absolute top-3 right-3 w-10 h-5 rounded-full bg-[#DED7EA]/50" />
      </div>
      <div className="p-4 space-y-3">
        <div className="w-1/2 h-3 rounded bg-[#E9E5F0]" />
        <div className="w-3/4 h-5 rounded bg-[#E9E5F0]" />
        <div className="pt-2 flex items-center justify-between">
          <div className="w-16 h-4 rounded bg-[#E9E5F0]" />
          <div className="w-24 h-8 rounded-xl bg-[#E9E5F0]" />
        </div>
      </div>
    </div>
  );
}
