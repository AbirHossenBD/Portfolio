"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Download, Atom, Sparkles, Code2 } from "lucide-react";
import { motion, useReducedMotion, type Variants } from "framer-motion";

const NAME_FIRST = "Abir";
const NAME_LAST = "Hossen";
const INITIALS = "AH";

const DEFAULT_TAGLINE = "HI, I'M";
const DEFAULT_SUBHEADING = "I'm building my future through software.";
const DEFAULT_HIGHLIGHT = "future";
const DEFAULT_DESC =
  "The digital world feels like home to me. I enjoy creating things people can experience. From websites to AI and someday games, I love learning how great software is created—one project at a time.";
const DEFAULT_WATERMARK = `// curious mind
// patient enough
// to solve problems
// honest in the process

while (learning) {
  build();
  grow();
  repeat();
}`;

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08, delayChildren: 0.1 },
  },
};

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
  },
};

export interface StatusItem {
  label: string;
  iconType?: "atom" | "sparkles" | "code" | string;
}

export interface HeroProps {
  topTagline?: string;
  subheadingText?: string;
  highlightedWord?: string;
  description?: string;
  statusItems?: StatusItem[];
  primaryCtaText?: string;
  primaryCtaLink?: string;
  secondaryCtaText?: string;
  secondaryCtaLink?: string;
  watermarkCode?: string;
  heroImageUrl?: string;
  heroImageAlt?: string;
  backgroundImageUrl?: string;
  glowColor?: string;
}

function renderStatusIcon(type?: string) {
  switch (type) {
    case "atom":
      return <Atom className="size-4 text-indigo-400" />;
    case "sparkles":
      return <Sparkles className="size-4 text-purple-400" />;
    default:
      return <Code2 className="size-4 text-indigo-400" />;
  }
}

export default function Hero({
  topTagline = DEFAULT_TAGLINE,
  subheadingText = DEFAULT_SUBHEADING,
  highlightedWord = DEFAULT_HIGHLIGHT,
  description = DEFAULT_DESC,
  statusItems = [
    { label: "Learning React", iconType: "atom" },
    { label: "Exploring AI", iconType: "sparkles" },
    { label: "Building this portfolio", iconType: "code" },
  ],
  primaryCtaText = "Explore My Work",
  primaryCtaLink = "#projects",
  secondaryCtaText = "Download Resume",
  secondaryCtaLink = "/resume.pdf",
  watermarkCode = DEFAULT_WATERMARK,
  heroImageUrl,
  heroImageAlt,
  backgroundImageUrl,
  glowColor = "rgba(147, 51, 234, 0.12)",
}: HeroProps) {
  const reduceMotion = useReducedMotion();

  const renderSubheading = () => {
    if (!highlightedWord || !subheadingText.includes(highlightedWord)) {
      return subheadingText;
    }
    const parts = subheadingText.split(highlightedWord);
    return (
      <>
        {parts[0]}
        <span className="italic font-serif-display text-purple-400 font-normal">
          {highlightedWord}
        </span>
        {parts[1]}
      </>
    );
  };

  return (
    <section
      id="about"
      className="relative flex min-h-[calc(100dvh-4rem)] w-full items-center justify-center overflow-hidden py-12 lg:py-20 bg-transparent"
      aria-labelledby="hero-heading"
    >
      {/* Dynamic Purple Ambient Glow */}
      <div
        aria-hidden
        className="absolute right-[10%] top-1/2 -translate-y-1/2 -z-10 h-125 w-125 rounded-full blur-[160px] pointer-events-none"
        style={{ backgroundColor: glowColor }}
      />

      {/* Main Grid */}
      <div className="relative z-10 mx-auto w-full max-w-375 px-6 sm:px-12 lg:px-16 xl:px-20 grid gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:items-center xl:gap-16">
        
        {/* LEFT COLUMN */}
        <motion.div
          initial={reduceMotion ? false : "hidden"}
          animate="visible"
          variants={containerVariants}
          className="order-2 flex flex-col gap-6 lg:order-1 lg:max-w-3xl"
        >
          <motion.p
            variants={fadeUp}
            className="text-xs font-semibold uppercase tracking-[0.2em] text-purple-400"
          >
            {topTagline}
          </motion.p>

          <motion.h1
            id="hero-heading"
            variants={fadeUp}
            className="font-serif-display text-6xl sm:text-7xl lg:text-8xl xl:text-9xl font-normal leading-[0.92] tracking-tight text-white"
          >
            {NAME_FIRST}<br />
            {NAME_LAST}
            <span className="inline-block text-indigo-500 ml-1">.</span>
          </motion.h1>

          <motion.p
            variants={fadeUp}
            className="text-xl sm:text-2xl font-light text-slate-200 tracking-wide"
          >
            {renderSubheading()}
          </motion.p>

          <div className="h-px w-12 bg-slate-800 my-1" />

          <motion.p
            variants={fadeUp}
            className="text-sm sm:text-base leading-relaxed text-slate-400 font-normal max-w-lg"
          >
            {description}
          </motion.p>

          {statusItems && statusItems.length > 0 && (
            <motion.div
              variants={fadeUp}
              className="flex flex-wrap items-center gap-3 text-xs sm:text-sm text-slate-300 py-1"
            >
              {statusItems.map((item, idx) => (
                <div key={idx} className="flex items-center gap-2">
                  {renderStatusIcon(item.iconType)}
                  <span>{item.label}</span>
                  {idx < statusItems.length - 1 && (
                    <span className="text-slate-700 ml-2">•</span>
                  )}
                </div>
              ))}
            </motion.div>
          )}

          <motion.div
            variants={fadeUp}
            className="flex flex-wrap items-center gap-4 pt-2"
          >
            <Link
              href={primaryCtaLink || "#projects"}
              className="group inline-flex h-12 items-center justify-center gap-2.5 rounded-xl bg-indigo-600 px-6 text-sm font-medium text-white shadow-lg shadow-indigo-600/30 transition-all hover:bg-indigo-500 hover:shadow-indigo-500/40 focus:outline-none"
            >
              {primaryCtaText}
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
            </Link>

            <a
              href={secondaryCtaLink || "/resume.pdf"}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-12 items-center justify-center gap-2 rounded-xl border border-slate-800 bg-slate-900/50 px-5 text-sm font-medium text-slate-200 transition-all hover:border-slate-700 hover:bg-slate-800 focus:outline-none"
            >
              <Download className="size-4 text-slate-400" />
              {secondaryCtaText}
            </a>
          </motion.div>
        </motion.div>

        {/* RIGHT COLUMN */}
        <div className="order-1 flex justify-center lg:order-2 lg:justify-self-end w-full relative">
          
          {/* Watermark Code */}
          {watermarkCode && (
            <div
              aria-hidden
              className="absolute -right-50 top-30 hidden lg:block font-mono text-xs leading-relaxed text-slate-600/25 select-none pointer-events-none z-0 whitespace-pre"
              style={{
                      WebkitMaskImage: "linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 100%)",
                      maskImage: "linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 100%)",
                    }}
            >
              {watermarkCode}
            </div>
          )}

          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative w-full max-w-sm lg:max-w-md xl:max-w-lg z-10"
          >
            {/* Optional Background Landscape/Art Layer behind Portrait */}
            {backgroundImageUrl && (
              <div aria-hidden className="absolute inset-0 -z-10 overflow-hidden opacity-30">
                <Image
                  src={backgroundImageUrl}
                  alt="Background atmosphere"
                  fill
                  className="object-cover object-center filter blur-[1px]"
                  style={{
                    WebkitMaskImage:
                      "radial-gradient(circle, black 40%, transparent 80%)",
                    maskImage:
                      "radial-gradient(circle, black 40%, transparent 80%)",
                  }}
                />
              </div>
            )}

            {/* Borderless Cutout Portrait */}
            <div className="relative aspect-4/5 w-full overflow-hidden">
              {heroImageUrl ? (
                <Image
                  src={heroImageUrl}
                  alt={heroImageAlt || `Portrait of ${NAME_FIRST} ${NAME_LAST}`}
                  fill
                  sizes="(min-width: 1280px) 520px, (min-width: 1024px) 440px, 100vw"
                  className="object-cover object-top filter contrast-[1.05]"
                  style={{
                    WebkitMaskImage:
                      "linear-gradient(to bottom, black 70%, transparent 100%)",
                    maskImage:
                      "linear-gradient(to bottom, black 70%, transparent 100%)",
                  }}
                  priority
                />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center font-serif-display text-8xl font-light text-slate-700/50">
                  {INITIALS}
                </div>
              )}
            </div>
          </motion.div>
        </div>

      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-8 hidden lg:flex flex-col items-center gap-2 z-20">
        <span className="text-[10px] tracking-[0.25em] font-mono text-slate-500 uppercase -rotate-90 origin-left translate-x-3 mb-6">
          SCROLL
        </span>
        <div className="h-2 w-2 rounded-full border border-slate-700 flex items-center justify-center">
          <div className="h-1 w-1 rounded-full bg-purple-400" />
        </div>
      </div>
    </section>
  );
}