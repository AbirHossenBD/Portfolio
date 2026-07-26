"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { navLinks } from "@/components/layout/nav-links";

export interface NavbarProps {
  logoText?: string;
  logoImageUrl?: string;
}

export function Navbar({ logoText = "AH", logoImageUrl }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);

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
        <Link href="/" className="group flex items-center gap-1">
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

        {/* Top-Right Navigation Links */}
        <nav className="flex items-center gap-6 sm:gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-xs sm:text-sm font-medium text-slate-300 transition-colors hover:text-white"
            >
              {link.label}
            </Link>
          ))}

          {/* Status Dot */}
          <div className="hidden sm:flex items-center justify-center size-8 rounded-full border border-slate-800 bg-slate-900/50">
            <span className="size-2 rounded-full bg-purple-400 animate-pulse" />
          </div>
        </nav>
      </div>
    </header>
  );
}