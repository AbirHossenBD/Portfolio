"use client";

import { useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Mail, Sparkles } from "lucide-react";
import { motion, useReducedMotion, type Variants } from "framer-motion";

const HEADLINE = "Abir Hossen";
const INITIALS = "AH";

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.06, delayChildren: 0.15 },
  },
};

const wordVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
};

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1], delay: 0.4 },
  },
};

const imageReveal: Variants = {
  hidden: { opacity: 0, scale: 0.94, y: 20 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.25 },
  },
};

function Particles({ disabled }: { disabled: boolean }) {
  const dots = useMemo(
    () =>
      Array.from({ length: 18 }, (_, index) => ({
        id: index,
        left: `${(index * 17 + 9) % 100}%`,
        top: `${(index * 23 + 11) % 100}%`,
        size: 2 + (index % 3),
        duration: 6 + (index % 5),
        delay: (index % 7) * 0.35,
      })),
    [],
  );

  if (disabled) return null;

  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      {dots.map((dot) => (
        <motion.span
          key={dot.id}
          className="absolute rounded-full bg-accent/50"
          style={{
            left: dot.left,
            top: dot.top,
            width: dot.size,
            height: dot.size,
          }}
          animate={{ opacity: [0.15, 0.7, 0.15], y: [0, -12, 0] }}
          transition={{
            duration: dot.duration,
            delay: dot.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}

function ProfileCard({
  disabled,
  imageUrl,
  imageAlt,
}: {
  disabled: boolean;
  imageUrl?: string;
  imageAlt?: string;
}) {
  return (
    <motion.div
      initial={disabled ? false : "hidden"}
      animate="visible"
      variants={imageReveal}
      className="relative w-full max-w-sm sm:max-w-md lg:max-w-lg"
    >
      {/* Floating Badges */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.5 }}
        className="absolute -top-3 -right-2 sm:-right-4 z-20 flex items-center gap-2.5 rounded-2xl border border-border/60 bg-surface-elevated/80 px-3.5 py-2 shadow-xl backdrop-blur-md"
      >
        <span className="relative flex h-2.5 w-2.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
          <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
        </span>
        <span className="text-xs font-semibold text-foreground">
          Available for Hire
        </span>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: -15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.75, duration: 0.5 }}
        className="absolute -bottom-3 -left-2 sm:-left-4 z-20 flex items-center gap-2.5 rounded-2xl border border-border/60 bg-surface-elevated/80 px-3.5 py-2 shadow-xl backdrop-blur-md"
      >
        <div className="flex items-center justify-center rounded-lg bg-accent/20 p-1.5 text-accent">
          <Sparkles className="size-3.5" />
        </div>
        <div>
          <p className="text-[10px] font-bold uppercase tracking-wider text-muted">Focus</p>
          <p className="text-xs font-semibold text-foreground">React • Next.js • AI</p>
        </div>
      </motion.div>

      {/* Floating Portrait Image Container */}
      <motion.div
        animate={disabled ? undefined : { y: [0, -10, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        className="relative w-full"
      >
        <div className="relative aspect-4/5 w-full overflow-hidden rounded-[2.5rem]">
          {imageUrl ? (
            <Image
              src={imageUrl}
              alt={imageAlt || "Portrait"}
              fill
              sizes="(min-width: 1280px) 480px, (min-width: 1024px) 400px, 100vw"
              className="object-cover"
              style={{
                WebkitMaskImage: 'linear-gradient(to bottom, black 75%, transparent 100%)',
                maskImage: 'linear-gradient(to bottom, black 75%, transparent 100%)',
                filter: 'drop-shadow(0 10px 25px rgba(56, 189, 248, 0.15))',
              }}
              priority
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center bg-linear-to-br from-accent to-accent-secondary bg-clip-text font-display text-7xl font-semibold text-transparent">
              {INITIALS}
            </div>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function Hero({
  heroImageUrl,
  heroImageAlt,
}: {
  heroImageUrl?: string;
  heroImageAlt?: string;
}) {
  const reduceMotion = useReducedMotion();
  const words = HEADLINE.split(" ");

  return (
    <section
      id="about"
      className="relative flex min-h-[calc(100dvh-4rem)] w-full items-center justify-center overflow-hidden py-12 lg:py-20"
      aria-labelledby="hero-heading"
    >
      {/* Background Grid Pattern */}
      <div 
        aria-hidden
        className="absolute inset-0 -z-20 h-full w-full bg-[radial-gradient(#80808022_1px,transparent_1px)] [bg-size:32px_32px] mask-[radial-gradient(ellipse_70%_60%_at_50%_50%,#000_75%,transparent_100%)]" 
      />

      {/* Ambient Glows */}
      <div 
        aria-hidden 
        className="absolute -left-28 top-1/4 -z-10 h-112.5 w-112.5 lg:h-150wlg:w-150nded-full bg-accent/20 blur-[140px] pointer-events-none" 
      />
      <div 
        aria-hidden 
        className="absolute -right-28 bottom-1/4 -z-10 h-112.5 w-112.5 lg:h-150 lg:w-150 rounded-full bg-accent-secondary/15 blur-[150px] pointer-events-none" 
      />

      <Particles disabled={!!reduceMotion} />

      {/* --- FULL-BLEED ULTRA-WIDE CONTAINER --- */}
      <div className="relative z-10 mx-auto w-full max-w-[1600px] px-6 sm:px-12 lg:px-16 xl:px-20 grid gap-12 py-16 sm:py-20 lg:grid-cols-[1.25fr_0.75fr] lg:items-center lg:gap-12 xl:gap-20">
        
        {/* FAR LEFT: Text Block (Expands up to max-w-3xl to fill middle space) */}
        <motion.div
          initial={reduceMotion ? false : "hidden"}
          animate="visible"
          className="order-2 flex flex-col gap-6 lg:order-1 lg:max-w-3xl xl:max-w-4xl"
        >
          <motion.h1
            id="hero-heading"
            variants={containerVariants}
            className="font-display text-5xl leading-[1.02] font-semibold tracking-tight text-foreground sm:text-6xl lg:text-7xl xl:text-8xl 2xl:text-9xl"
          >
            {words.map((word, index) => (
              <motion.span
                key={`${word}-${index}`}
                variants={wordVariants}
                className="mr-[0.28em] inline-block last:mr-0"
              >
                {word}
              </motion.span>
            ))}
          </motion.h1>

          <motion.p
            variants={fadeUp}
            className="text-base font-medium text-accent sm:text-lg lg:text-xl xl:text-2xl"
          >
            Software Engineering Student | Front-End Developer | Creative
            Technologist
          </motion.p>

          <motion.p
            variants={fadeUp}
            className="text-base leading-relaxed text-muted sm:text-lg lg:text-xl xl:text-2xl max-w-3xl"
          >
            I build thoughtful digital experiences at the intersection of
            software engineering and creative technology — from polished web
            interfaces to cinematic visual storytelling.
          </motion.p>

          <motion.p
            variants={fadeUp}
            className="text-base leading-relaxed text-muted sm:text-lg lg:text-xl xl:text-2xl max-w-3xl"
          >
            Currently a Software Engineering student at Daffodil International
            University, I turn ideas into reliable, user-first products —
            breaking complex problems into clear systems, then shipping
            interfaces that feel intuitive and intentional. My toolkit spans
            web development, Python, and emerging AI workflows.
          </motion.p>

          <motion.div
            variants={fadeUp}
            className="flex flex-col gap-3 pt-4 sm:flex-row sm:items-center"
          >
            <Link
              href="#projects"
              className="group inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-accent px-7 text-base font-semibold text-accent-foreground shadow-lg transition hover:brightness-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              View Projects
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
            <Link
              href="#contact"
              className="group inline-flex h-12 items-center justify-center gap-2 rounded-xl border border-border bg-surface px-7 text-base font-medium text-foreground transition hover:border-accent/40 hover:bg-surface-elevated focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              <Mail className="size-4" />
              Contact Me
            </Link>
          </motion.div>
        </motion.div>

        {/* FAR RIGHT: Image Column (Anchored to the right margin) */}
        <div className="order-1 flex justify-center lg:order-2 lg:justify-self-end w-full">
          <ProfileCard disabled={!!reduceMotion} imageUrl={heroImageUrl} imageAlt={heroImageAlt} />
        </div>

      </div>
    </section>
  );
}