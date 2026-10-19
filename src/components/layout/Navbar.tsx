"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  MapPin,
  Search,
  Ticket,
  ChevronDown,
  Menu,
  X,
  Sparkles,
  Film,
  User,
} from "lucide-react";
import { OneShowLogo } from "./OneShowLogo";
import { CitySelectorModal } from "./CitySelectorModal";

export function Navbar() {
  const pathname = usePathname();
  const [selectedCity, setSelectedCity] = useState("Mumbai");
  const [isCityModalOpen, setIsCityModalOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const navLinks = [
    { label: "Movies", href: "/#now-showing", icon: Film },
    { label: "Offers", href: "/offers", icon: Sparkles, badge: "Save 20%" },
    { label: "My Bookings", href: "/bookings", icon: Ticket },
  ];

  return (
    <>
      <header className="sticky top-0 z-40 w-full bg-white/95 backdrop-blur-md border-b border-[#E9E5F0] shadow-sm shadow-[#6D28D9]/5 transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20 gap-4">
            {/* Left: Brand Logo & City Selector */}
            <div className="flex items-center gap-6">
              <OneShowLogo size="md" />

              {/* Desktop City Selector Button */}
              <button
                type="button"
                onClick={() => setIsCityModalOpen(true)}
                className="hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#F8F7FC] border border-[#E9E5F0] text-[#181522] hover:bg-[#F3E8FF] hover:border-[#6D28D9]/30 transition-all text-xs font-semibold group cursor-pointer"
                aria-label="Change city"
              >
                <MapPin className="w-4 h-4 text-[#6D28D9]" />
                <span className="font-semibold text-sm">{selectedCity}</span>
                <ChevronDown className="w-3.5 h-3.5 text-[#777387] group-hover:text-[#6D28D9] transition-transform duration-200 group-hover:translate-y-0.5" />
              </button>
            </div>

            {/* Center: Search Field (Desktop & Tablet) */}
            <div className="hidden lg:flex flex-1 max-w-md mx-4">
              <div className="relative w-full flex items-center">
                <Search className="w-4 h-4 absolute left-3.5 text-[#777387] pointer-events-none" />
                <input
                  type="text"
                  placeholder="Search movies, cinemas, genres..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full h-10 pl-10 pr-4 bg-[#F8F7FC] border border-[#E9E5F0] rounded-xl text-sm text-[#181522] placeholder-[#777387] focus:outline-none focus:border-[#6D28D9] focus:bg-white focus:ring-2 focus:ring-[#6D28D9]/15 transition-all"
                />
              </div>
            </div>

            {/* Right: Desktop Navigation Links & Action */}
            <div className="hidden md:flex items-center gap-5">
              <nav className="flex items-center gap-1">
                {navLinks.map((link) => {
                  const Icon = link.icon;
                  const isActive = pathname === link.href;
                  return (
                    <Link
                      key={link.label}
                      href={link.href}
                      className={`relative flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-sm font-medium transition-all ${
                        isActive
                          ? "text-[#6D28D9] bg-[#F3E8FF]/60 font-semibold"
                          : "text-[#181522] hover:text-[#6D28D9] hover:bg-[#F8F7FC]"
                      }`}
                    >
                      <Icon className="w-4 h-4 text-[#6D28D9]" />
                      <span>{link.label}</span>
                      {link.badge && (
                        <span className="px-1.5 py-0.5 rounded-full bg-[#F3E8FF] text-[#6D28D9] text-[10px] font-bold tracking-tight border border-[#6D28D9]/20">
                          {link.badge}
                        </span>
                      )}
                    </Link>
                  );
                })}
              </nav>

              <div className="h-6 w-px bg-[#E9E5F0]" />

              {/* Sign In CTA */}
              <Link
                href="/auth/login"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#6D28D9] hover:bg-[#4C1D95] text-white text-sm font-semibold shadow-md shadow-[#6D28D9]/25 hover:shadow-lg hover:shadow-[#6D28D9]/30 active:scale-95 transition-all"
              >
                <User className="w-4 h-4" />
                <span>Sign In</span>
              </Link>
            </div>

            {/* Mobile Actions: City Badge & Mobile Menu Hamburger */}
            <div className="flex md:hidden items-center gap-2">
              <button
                type="button"
                onClick={() => setIsCityModalOpen(true)}
                className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-[#F8F7FC] border border-[#E9E5F0] text-xs font-semibold text-[#181522]"
              >
                <MapPin className="w-3.5 h-3.5 text-[#6D28D9]" />
                <span>{selectedCity}</span>
              </button>

              <button
                type="button"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="w-10 h-10 rounded-xl bg-[#F8F7FC] border border-[#E9E5F0] flex items-center justify-center text-[#181522] hover:text-[#6D28D9] transition-colors"
                aria-label="Toggle navigation menu"
              >
                {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>

          {/* Mobile Search Input (Visible below top row on small screens) */}
          <div className="lg:hidden pb-3">
            <div className="relative w-full flex items-center">
              <Search className="w-4 h-4 absolute left-3.5 text-[#777387] pointer-events-none" />
              <input
                type="text"
                placeholder="Search movies, cinemas, genres..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full h-10 pl-10 pr-4 bg-[#F8F7FC] border border-[#E9E5F0] rounded-xl text-sm text-[#181522] placeholder-[#777387] focus:outline-none focus:border-[#6D28D9] focus:bg-white"
              />
            </div>
          </div>
        </div>

        {/* Mobile Slide-down Drawer Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-[#E9E5F0] bg-white px-4 pt-4 pb-6 space-y-4 shadow-xl animate-in slide-in-from-top-2 duration-200">
            {/* City Selector in Mobile Menu */}
            <div className="flex items-center justify-between p-3 rounded-xl bg-[#F8F7FC] border border-[#E9E5F0]">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-[#6D28D9]" />
                <span className="text-xs text-[#777387]">Current City:</span>
                <span className="text-sm font-semibold text-[#181522]">{selectedCity}</span>
              </div>
              <button
                type="button"
                onClick={() => {
                  setIsCityModalOpen(true);
                  setIsMobileMenuOpen(false);
                }}
                className="text-xs font-semibold text-[#6D28D9] hover:underline"
              >
                Change
              </button>
            </div>

            {/* Navigation Links */}
            <div className="space-y-1">
              {navLinks.map((link) => {
                const Icon = link.icon;
                return (
                  <Link
                    key={link.label}
                    href={link.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex items-center justify-between p-3 rounded-xl text-sm font-medium text-[#181522] hover:bg-[#F3E8FF] hover:text-[#6D28D9] transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <Icon className="w-4 h-4 text-[#6D28D9]" />
                      <span>{link.label}</span>
                    </div>
                    {link.badge && (
                      <span className="px-2 py-0.5 rounded-full bg-[#F3E8FF] text-[#6D28D9] text-[10px] font-bold border border-[#6D28D9]/20">
                        {link.badge}
                      </span>
                    )}
                  </Link>
                );
              })}
            </div>

            {/* Mobile Sign In Button */}
            <div className="pt-2">
              <Link
                href="/auth/login"
                onClick={() => setIsMobileMenuOpen(false)}
                className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-[#6D28D9] text-white text-sm font-semibold shadow-md shadow-[#6D28D9]/25 hover:bg-[#4C1D95] transition-all"
              >
                <User className="w-4 h-4" />
                <span>Sign In to OneShow</span>
              </Link>
            </div>
          </div>
        )}
      </header>

      {/* City Selector Modal */}
      <CitySelectorModal
        isOpen={isCityModalOpen}
        onClose={() => setIsCityModalOpen(false)}
        selectedCity={selectedCity}
        onSelectCity={(city) => setSelectedCity(city)}
      />
    </>
  );
}
