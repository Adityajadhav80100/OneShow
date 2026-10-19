"use client";

import { useState } from "react";
import { MapPin, Check, Search, X } from "lucide-react";

export interface City {
  id: string;
  name: string;
  state: string;
  isPopular?: boolean;
}

export const SUPPORTED_CITIES: City[] = [
  { id: "mumbai", name: "Mumbai", state: "Maharashtra", isPopular: true },
  { id: "delhi", name: "Delhi", state: "NCR", isPopular: true },
  { id: "bengaluru", name: "Bengaluru", state: "Karnataka", isPopular: true },
  { id: "hyderabad", name: "Hyderabad", state: "Telangana", isPopular: true },
  { id: "pune", name: "Pune", state: "Maharashtra", isPopular: true },
  { id: "chennai", name: "Chennai", state: "Tamil Nadu" },
  { id: "kolkata", name: "Kolkata", state: "West Bengal" },
  { id: "ahmedabad", name: "Ahmedabad", state: "Gujarat" },
  { id: "chandigarh", name: "Chandigarh", state: "Punjab" },
];

interface CitySelectorModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedCity: string;
  onSelectCity: (cityName: string) => void;
}

export function CitySelectorModal({
  isOpen,
  onClose,
  selectedCity,
  onSelectCity,
}: CitySelectorModalProps) {
  const [searchQuery, setSearchQuery] = useState("");

  if (!isOpen) return null;

  const filteredCities = SUPPORTED_CITIES.filter(
    (c) =>
      c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.state.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#181522]/50 backdrop-blur-sm animate-in fade-in duration-200">
      {/* Modal Dialog Card */}
      <div
        className="w-full max-w-lg bg-white rounded-2xl shadow-2xl border border-[#E9E5F0] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-6 py-4 border-b border-[#E9E5F0] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-[#F3E8FF] flex items-center justify-center text-[#6D28D9]">
              <MapPin className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-bold text-[#181522] text-lg">Select Your City</h3>
              <p className="text-xs text-[#777387]">Choose your city to view nearby cinemas and shows</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full flex items-center justify-center text-[#777387] hover:bg-[#F8F7FC] hover:text-[#181522] transition-colors"
            aria-label="Close dialog"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search Input */}
        <div className="p-6 pb-3">
          <div className="relative flex items-center">
            <Search className="w-4 h-4 absolute left-3.5 text-[#777387]" />
            <input
              type="text"
              placeholder="Search for your city or region..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full h-11 pl-10 pr-4 bg-[#FAF7FF] border border-[#E9E5F0] rounded-xl text-sm text-[#181522] placeholder-[#777387] focus:outline-none focus:border-[#6D28D9] focus:bg-white focus:ring-2 focus:ring-[#6D28D9]/15 transition-all"
              autoFocus
            />
          </div>
        </div>

        {/* Popular Cities Quick Selection */}
        {!searchQuery && (
          <div className="px-6 py-2">
            <span className="text-[11px] font-bold text-[#777387] uppercase tracking-wider">
              Popular Cities
            </span>
            <div className="grid grid-cols-3 sm:grid-cols-5 gap-2 mt-2">
              {SUPPORTED_CITIES.filter((c) => c.isPopular).map((city) => {
                const isSelected = selectedCity.toLowerCase() === city.name.toLowerCase();
                return (
                  <button
                    key={city.id}
                    onClick={() => {
                      onSelectCity(city.name);
                      onClose();
                    }}
                    className={`h-10 px-3 rounded-xl text-xs font-semibold flex items-center justify-center gap-1 transition-all ${
                      isSelected
                        ? "bg-[#6D28D9] text-white shadow-md shadow-[#6D28D9]/25"
                        : "bg-[#F8F7FC] text-[#181522] hover:bg-[#F3E8FF] hover:text-[#6D28D9] border border-[#E9E5F0]"
                    }`}
                  >
                    <span>{city.name}</span>
                    {isSelected && <Check className="w-3.5 h-3.5" />}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* All / Filtered Cities List */}
        <div className="px-6 py-3 max-h-60 overflow-y-auto divide-y divide-[#E9E5F0]">
          <span className="text-[11px] font-bold text-[#777387] uppercase tracking-wider block mb-1">
            {searchQuery ? `Search Results (${filteredCities.length})` : "All Cities"}
          </span>
          {filteredCities.length > 0 ? (
            filteredCities.map((city) => {
              const isSelected = selectedCity.toLowerCase() === city.name.toLowerCase();
              return (
                <button
                  key={city.id}
                  onClick={() => {
                    onSelectCity(city.name);
                    onClose();
                  }}
                  className={`w-full py-2.5 px-2 flex items-center justify-between text-left rounded-lg transition-colors ${
                    isSelected ? "bg-[#F3E8FF]/60 text-[#6D28D9] font-semibold" : "hover:bg-[#F8F7FC] text-[#181522]"
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <MapPin className={`w-4 h-4 ${isSelected ? "text-[#6D28D9]" : "text-[#777387]"}`} />
                    <span className="text-sm font-medium">{city.name}</span>
                    <span className="text-xs text-[#777387]">({city.state})</span>
                  </div>
                  {isSelected && <Check className="w-4 h-4 text-[#6D28D9]" />}
                </button>
              );
            })
          ) : (
            <div className="py-6 text-center text-sm text-[#777387]">
              No cities found matching &quot;{searchQuery}&quot;
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-3 bg-[#FAF7FF] border-t border-[#E9E5F0] flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold text-[#777387] hover:text-[#181522] rounded-lg transition-colors"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
