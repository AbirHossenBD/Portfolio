// Path: src/components/ContactClient.tsx
'use client';

import { useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowUpRight,
  Copy,
  Check,
  MapPin,
  Sparkles,
  Globe
} from "lucide-react";

export interface SocialLink {
  label: string;
  detail: string;
  url: string;
  iconUrl?: string; 
  accentColor?: string;
}

export interface ContactData {
  badgeTagline?: string;
  heading?: string;
  subheading?: string;
  email?: string;
  availabilityStatus?: string;
  locationText?: string;
  socialLinks?: SocialLink[];
}

export default function ContactClient({ contactData }: { contactData?: ContactData }) {
  const [copied, setCopied] = useState(false);

  const primaryEmail = contactData?.email || "abir.hossen@example.com";
  const badgeTagline = contactData?.badgeTagline || "CONTACT";
  const heading = contactData?.heading || "Let's connect.";
  const subheading =
    contactData?.subheading ||
    "Open to collaborations, freelance creative work, and software engineering roles.";
  const availabilityStatus =
    contactData?.availabilityStatus || "Available for new opportunities";
  const locationText = contactData?.locationText || "Dhaka, Bangladesh";

  // Fallback links if none are added in Sanity yet
  const links: SocialLink[] = contactData?.socialLinks?.length
    ? contactData.socialLinks
    : [
        {
          label: "Email",
          detail: primaryEmail,
          url: `mailto:${primaryEmail}`,
          accentColor: "#A855F7",
        }
      ];

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(primaryEmail);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <section
      id="contact"
      className="relative py-20 lg:py-28 overflow-hidden"
      aria-labelledby="contact-heading"
    >
      {/* Background Ambient Glow */}
      <div
        aria-hidden
        className="absolute left-1/2 bottom-10 -translate-x-1/2 -z-10 h-96 w-[90%] max-w-5xl rounded-full bg-purple-600/10 blur-[150px] pointer-events-none"
      />

      <div className="mx-auto w-full max-w-6xl px-6 sm:px-12 lg:px-16 xl:px-20">
        {/* Header Block */}
        <div className="mb-12 max-w-3xl space-y-4">
          <p className="text-xs font-semibold tracking-[0.2em] text-purple-400 uppercase flex items-center gap-2">
            <Sparkles className="size-3.5" />
            <span>{badgeTagline}</span>
          </p>
          <h2
            id="contact-heading"
            className="font-serif-display text-4xl sm:text-5xl lg:text-6xl font-normal tracking-tight text-white"
          >
            {heading.replace(".", "")}
            <span className="text-purple-400">.</span>
          </h2>
          <p className="text-base text-slate-400 sm:text-lg font-light leading-relaxed">
            {subheading}
          </p>
        </div>

        {/* Live Status & Copy Bar */}
        <div className="mb-10 flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-slate-800/80 bg-slate-900/40 p-5 backdrop-blur-md">
          <div className="flex items-center gap-3">
            <span className="relative flex size-3">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex size-3 rounded-full bg-emerald-500" />
            </span>
            <span className="text-sm font-medium text-slate-200">
              {availabilityStatus}
            </span>
          </div>

          <div className="flex items-center gap-4 text-xs sm:text-sm text-slate-400">
            {locationText && (
              <span className="hidden sm:flex items-center gap-1.5 text-slate-400">
                <MapPin className="size-4 text-purple-400" />
                {locationText}
              </span>
            )}
            <button
              onClick={handleCopyEmail}
              className="inline-flex items-center gap-2 rounded-xl border border-slate-700 bg-slate-800/60 px-4 py-2 text-xs font-semibold text-slate-200 transition-all hover:border-purple-500/50 hover:bg-slate-800 hover:text-white"
            >
              {copied ? (
                <>
                  <Check className="size-3.5 text-emerald-400" />
                  <span className="text-emerald-400">Email Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="size-3.5 text-purple-400" />
                  <span>Copy Email</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Links Grid */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {links.map((link) => (
            <SocialCard key={link.label} link={link} />
          ))}
        </div>
      </div>
    </section>
  );
}

// ---------------------------------------------------------------------------
// Social Card Component - Handles independent hover states and glowing
// ---------------------------------------------------------------------------
function SocialCard({ link }: { link: SocialLink }) {
  const [isHovered, setIsHovered] = useState(false);
  const hex = link.accentColor || "#A855F7";
  const isExternal = link.url.startsWith("http");

  return (
    <motion.a
      href={link.url}
      target={isExternal ? "_blank" : undefined}
      rel={isExternal ? "noopener noreferrer" : undefined}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative flex flex-col justify-between overflow-hidden rounded-2xl border bg-slate-900/40 p-6 backdrop-blur-md transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500"
      style={{
        borderColor: isHovered ? hex : "rgba(30, 41, 59, 0.8)", // slate-800/80
        boxShadow: isHovered 
          ? `0 0 24px -4px ${hex}66, inset 0 0 12px -4px ${hex}33` // Outer and inner border glow
          : "none",
      }}
    >
      <div className="flex items-center justify-between">
        <div
          className="flex size-11 items-center justify-center rounded-xl border border-slate-800 bg-slate-900 text-slate-300 transition-colors duration-300"
          style={{
            borderColor: isHovered ? `${hex}60` : "rgba(30, 41, 59, 0.8)",
          }}
        >
          {link.iconUrl ? (
            <img 
              src={link.iconUrl} 
              alt={`${link.label} icon`} 
              className="size-5 object-contain" 
            />
          ) : (
            <Globe className="size-5" />
          )}
        </div>
        
        {/* Glow Arrow */}
        <ArrowUpRight 
          className={`size-5 transition-transform duration-300 ${
            isHovered ? "translate-x-0.5 -translate-y-0.5" : ""
          }`} 
          style={{
            color: isHovered ? hex : "#64748b", // slate-500
            filter: isHovered ? `drop-shadow(0 0 6px ${hex}99)` : "none"
          }}
        />
      </div>

      <div className="mt-8 space-y-1">
        {/* Glow Title */}
        <span 
          className="block text-base font-semibold transition-colors duration-300"
          style={{
            color: isHovered ? hex : "#f1f5f9", // slate-100
            textShadow: isHovered ? `0 0 16px ${hex}80` : "none"
          }}
        >
          {link.label}
        </span>
        <span className="block text-xs font-mono text-slate-400 truncate">
          {link.detail}
        </span>
      </div>
    </motion.a>
  );
}