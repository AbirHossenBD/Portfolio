// Path: src/components/Footer.tsx
'use client';

import Link from "next/link";
import { ArrowUp } from "lucide-react";

interface FooterProps {
  footerText?: string;
  copyrightYear?: string;
  logoText?: string;
}

export default function Footer({
  footerText = "Designed & Developed by Abir Hossen",
  copyrightYear = "2026",
  logoText = "AH",
}: FooterProps) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="w-full border-t border-slate-800/80 bg-[#05060A]/80 backdrop-blur-md">
      <div className="mx-auto w-full max-w-6xl px-6 sm:px-12 lg:px-16 xl:px-20 py-8">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          {/* Logo & Copyright */}
          <div className="flex items-center gap-3">
            <span className="font-serif-display text-xl font-bold tracking-tighter text-white">
              {logoText}
            </span>
            <span className="size-1 rounded-full bg-purple-400" />
            <p className="text-xs text-slate-400 sm:text-sm font-light">
              {footerText} &copy; {copyrightYear}
            </p>
          </div>

          {/* Nav Anchors & Scroll to Top */}
          <div className="flex items-center gap-6">
            <nav className="flex items-center gap-4 text-xs sm:text-sm text-slate-400">
              <Link href="#about" className="transition-colors hover:text-white">
                About
              </Link>
              <Link href="#skills" className="transition-colors hover:text-white">
                Skills
              </Link>
              <Link href="#projects" className="transition-colors hover:text-white">
                Projects
              </Link>
              <Link href="#journey" className="transition-colors hover:text-white">
                Journey
              </Link>
            </nav>

            <button
              onClick={scrollToTop}
              aria-label="Back to top"
              className="flex size-9 items-center justify-center rounded-xl border border-slate-800 bg-slate-900/60 text-slate-400 transition-all hover:border-purple-500/40 hover:bg-slate-800 hover:text-purple-300"
            >
              <ArrowUp className="size-4" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}