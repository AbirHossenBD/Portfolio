// Path: src/components/Navbar.tsx
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { navLinks } from "@/components/layout/nav-links";
import { motion, AnimatePresence } from "framer-motion";
import { Menu } from "lucide-react";

export interface NavbarProps {
  logoText?: string;
  logoImageUrl?: string;
}

export function Navbar({ logoText = "AH", logoImageUrl }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(true); // Open by default

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-[#05060A]/80 backdrop-blur-md border-b border-slate-800/60 py-4"
          : "bg-transparent py-6"
      }`}
    >
      <div className="mx-auto w-full max-w-375 px-6 sm:px-12 lg:px-16 xl:px-20 flex items-center justify-between">
        {/* Dynamic Top-Left Logo */}
        <Link href="/" className="group flex items-center gap-1 z-50">
          {logoImageUrl ? (
            <div className="relative h-8 w-auto min-w-8">
              <Image
                src={logoImageUrl}
                alt="Site Logo"
                width={32}
                height={32}
                className="object-contain"
                priority
              />
            </div>
          ) : (
            <span className="font-serif-display text-2xl font-bold tracking-tighter text-white transition-colors group-hover:text-indigo-400">
              {logoText}
            </span>
          )}
          <span className="h-1.5 w-1.5 rounded-full bg-purple-400" />
        </Link>

        {/* Top-Right Navigation Links & Toggle */}
        <div className="flex items-center">
          <AnimatePresence initial={false}>
            {isOpen && (
              <motion.nav
                initial={{ width: 0, opacity: 0 }}
                animate={{ width: "auto", opacity: 1 }}
                exit={{ width: 0, opacity: 0 }}
                transition={{ duration: 0.4, ease: "easeInOut" }}
                className="overflow-hidden whitespace-nowrap"
              >
                {/* On mobile (sm < 640px) no padding needed since dot is hidden. On desktop, pr-8 replaces the gap between links and dot */}
                <div className="flex items-center gap-6 sm:gap-8 pr-0 sm:pr-8">
                  {navLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className="text-xs sm:text-sm font-medium text-slate-300 transition-colors hover:text-white"
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>
              </motion.nav>
            )}
          </AnimatePresence>

          {/* Status Dot / Toggle Button (Hidden on Mobile, same as original) */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="hidden sm:flex shrink-0 items-center justify-center size-8 rounded-full border border-slate-800 bg-slate-900/50 transition-colors hover:bg-slate-800 focus:outline-none"
            aria-label="Toggle navigation menu"
          >
            {isOpen ? (
              <span className="size-2 rounded-full bg-purple-400 animate-pulse" />
            ) : (
              <Menu className="size-3.5 text-purple-400" />
            )}
          </button>
        </div>
      </div>
    </header>
  );
}