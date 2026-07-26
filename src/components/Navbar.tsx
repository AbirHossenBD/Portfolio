"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { navLinks } from "@/components/layout/nav-links";

const SCROLL_THRESHOLD = 500; // Past hero section height

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Handle scroll detection & auto-collapse on scroll
  useEffect(() => {
    const handleScroll = () => {
      const pastHero = window.scrollY > SCROLL_THRESHOLD;
      setIsScrolled(pastHero);
      
      // Close open menu whenever user scrolls
      setIsMenuOpen(false);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Handle escape key
  useEffect(() => {
    if (!isMenuOpen) return;

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsMenuOpen(false);
    };

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [isMenuOpen]);

  return (
    <>
      {/* 1. TOP-LEFT MENU BUTTON (Shows when menu is CLOSED and scrolled past hero) */}
      <AnimatePresence>
        {isScrolled && !isMenuOpen && (
          <motion.button
            type="button"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.2 }}
            onClick={() => setIsMenuOpen(true)}
            className="fixed top-5 left-5 z-50 flex items-center justify-center p-3 rounded-full bg-surface-elevated/80 backdrop-blur-md border border-border/40 shadow-md hover:bg-surface-elevated transition-colors cursor-pointer"
            aria-label="Open menu"
          >
            <div className="flex flex-col gap-1 w-4">
              <span className="block h-0.5 w-4 bg-foreground/80 rounded-sm" />
              <span className="block h-0.5 w-4 bg-foreground/80 rounded-sm" />
              <span className="block h-0.5 w-4 bg-foreground/80 rounded-sm" />
            </div>
          </motion.button>
        )}
      </AnimatePresence>

      {/* 2. CENTERED FLOATING PILL NAVBAR (Shows when menu is OPEN) */}
      <AnimatePresence>
        {isMenuOpen && (
          <div className="fixed top-5 left-1/2 -translate-x-1/2 z-50 flex items-center justify-center max-w-[95vw]">
            <motion.div
              initial={{ opacity: 0, y: -20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.95 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="relative flex items-center gap-2 sm:gap-4 px-3.5 sm:px-5 py-2 rounded-full bg-surface-elevated/90 backdrop-blur-md border border-border/40 shadow-xl overflow-x-auto scrollbar-none [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
            >
              {/* Close Button Inside Center Pill */}
              <button
                type="button"
                onClick={() => setIsMenuOpen(false)}
                className="flex items-center justify-center p-1.5 rounded-full hover:bg-white/10 transition-colors shrink-0 cursor-pointer"
                aria-label="Close menu"
              >
                <div className="relative w-4 h-4 flex items-center justify-center">
                  <span className="absolute h-0.5 w-4 bg-foreground/80 rotate-45 rounded-sm" />
                  <span className="absolute h-0.5 w-4 bg-foreground/80 -rotate-45 rounded-sm" />
                </div>
              </button>

              {/* Vertical Divider */}
              <div className="h-4 w-px bg-border/60 shrink-0" />

              {/* Centered Nav Links */}
              <div className="flex items-center gap-1 sm:gap-2 shrink-0">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="whitespace-nowrap text-xs sm:text-sm font-medium text-foreground/80 transition-colors hover:text-accent focus-visible:outline-none rounded-md px-2.5 py-1"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {link.label}
                  </Link>
                ))}

                {/* Resume Link */}
                <a
                  href="/resume.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="whitespace-nowrap text-xs sm:text-sm font-semibold text-accent transition-all hover:text-accent/80 rounded-md px-2.5 py-1"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Resume
                </a>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}