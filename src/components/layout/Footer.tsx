import Link from "next/link";
import { OneShowLogo } from "./OneShowLogo";
import {
  Film,
  ShieldCheck,
  Headphones,
  Sparkles,
  Heart,
} from "lucide-react";

export function Footer() {
  const currentYear = 2026;

  const footerSections = [
    {
      title: "Explore",
      links: [
        { label: "Now Playing", href: "/#now-playing" },
        { label: "Popular Movies", href: "/#popular" },
        { label: "Upcoming Premieres", href: "/#upcoming" },
        { label: "Exclusive Offers", href: "/offers" },
      ],
    },
    {
      title: "Support & Help",
      links: [
        { label: "Help Center", href: "/support" },
        { label: "Booking FAQs", href: "/support" },
        { label: "Cancellation & Refunds", href: "/support" },
        { label: "Contact Us", href: "/support" },
      ],
    },
    {
      title: "Legal & Policies",
      links: [
        { label: "Terms of Service", href: "/legal/terms" },
        { label: "Privacy Policy", href: "/legal/privacy" },
        { label: "Security Safeguards", href: "/legal/security" },
      ],
    },
  ];

  return (
    <footer className="w-full bg-white border-t border-[#E9E5F0] mt-auto">
      {/* Top Highlights Banner */}
      <div className="bg-[#FAF7FF] border-b border-[#E9E5F0]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center sm:text-left">
            <div className="flex items-center gap-3 justify-center sm:justify-start">
              <div className="w-10 h-10 rounded-xl bg-[#F3E8FF] flex items-center justify-center text-[#6D28D9] shrink-0">
                <Film className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-[#181522]">Premium Theatres</h4>
                <p className="text-xs text-[#777387]">IMAX 3D, 4DX, and Dolby Atmos formats</p>
              </div>
            </div>

            <div className="flex items-center gap-3 justify-center sm:justify-start">
              <div className="w-10 h-10 rounded-xl bg-[#F3E8FF] flex items-center justify-center text-[#6D28D9] shrink-0">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-[#181522]">100% Verified Tickets</h4>
                <p className="text-xs text-[#777387]">Instant digital QR codes & turnstile entry</p>
              </div>
            </div>

            <div className="flex items-center gap-3 justify-center sm:justify-start">
              <div className="w-10 h-10 rounded-xl bg-[#F3E8FF] flex items-center justify-center text-[#6D28D9] shrink-0">
                <Headphones className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-[#181522]">24/7 Fast Support</h4>
                <p className="text-xs text-[#777387]">Hassle-free cancellations & quick resolutions</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-10">
          {/* Brand Info & Mission */}
          <div className="md:col-span-2 space-y-4">
            <OneShowLogo size="md" />
            <p className="text-sm text-[#777387] max-w-sm leading-relaxed">
              OneShow delivers a modern, elevated movie-ticket reservation experience. Discover blockbuster films, explore curated screenings, pick your favorite luxury recliners, and enjoy paperless entry with digital passes.
            </p>
            <div className="flex items-center gap-2 pt-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#F3E8FF] text-[#6D28D9] text-xs font-semibold">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Next-Gen Cinema Web Platform</span>
              </span>
            </div>

            {/* TMDB Attribution Badge */}
            <div className="pt-2">
              <div className="flex items-center gap-2 text-[11px] text-[#777387] bg-[#F8F7FC] p-2.5 rounded-xl border border-[#E9E5F0] max-w-sm">
                <span className="font-bold text-[#01B4E4] tracking-wide shrink-0">TMDB</span>
                <span>
                  This product uses the TMDB API but is not endorsed or certified by TMDB.
                </span>
              </div>
            </div>
          </div>

          {/* Navigation Columns */}
          {footerSections.map((section) => (
            <div key={section.title} className="space-y-3">
              <h4 className="text-xs font-bold text-[#181522] uppercase tracking-wider">
                {section.title}
              </h4>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-[#777387] hover:text-[#6D28D9] hover:underline transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar: Copyright & Attribution */}
        <div className="mt-12 pt-8 border-t border-[#E9E5F0] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#777387]">
          <div className="flex items-center gap-1">
            <span>© {currentYear} OneShow Technologies Inc. All rights reserved.</span>
          </div>

          <div className="flex items-center gap-1">
            <span>Designed with</span>
            <Heart className="w-3.5 h-3.5 text-[#DC2626] fill-[#DC2626]" />
            <span>for cinema lovers everywhere</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
