"use client";

import { useMemo } from "react";
import Link from "next/link";
import { ArrowRight, Mail } from "lucide-react";
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
      <div className="absolute -top-24 left-1/4 h-72 w-72 rounded-full bg-accent/20 blur-[100px]" />
      <div className="absolute top-1/3 -right-16 h-80 w-80 rounded-full bg-accent-secondary/15 blur-[110px]" />
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

// Placeholder portrait card. Swap this out once a real photo is ready:
// replace the monogram <div> block below with
//   <Image src="/profile.jpg" alt="Abir Hossen" fill className="object-cover" priority />
// (import Image from "next/image" at the top) and drop the file into /public.
function ProfileCard({ disabled }: { disabled: boolean }) {
  return (
    <motion.div
      initial={disabled ? false : "hidden"}
      animate="visible"
      variants={imageReveal}
      className="relative"
    >
      {/* ambient glow behind the card */}
      <div
        aria-hidden
        className="absolute -inset-6 -z-10 rounded-4xl bg-linear-to-br from-accent/25 via-accent-secondary/15 to-transparent blur-2xl"
      />

      <motion.div
        animate={disabled ? undefined : { y: [0, -10, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        className="relative aspect-4/5 w-64 overflow-hidden rounded-3xl border border-border bg-surface/70 shadow-2xl shadow-black/40 backdrop-blur-sm sm:w-72 lg:w-80"
      >
        {/* corner accents for a technical / creative-portfolio feel */}
        <span aria-hidden className="absolute top-4 left-4 h-6 w-6 rounded-tl-lg border-t-2 border-l-2 border-accent/60" />
        <span aria-hidden className="absolute top-4 right-4 h-6 w-6 rounded-tr-lg border-t-2 border-r-2 border-accent/60" />
        <span aria-hidden className="absolute bottom-4 left-4 h-6 w-6 rounded-bl-lg border-b-2 border-l-2 border-accent-secondary/60" />
        <span aria-hidden className="absolute bottom-4 right-4 h-6 w-6 rounded-br-lg border-b-2 border-r-2 border-accent-secondary/60" />

        {/* monogram placeholder */}
        <div className="absolute inset-0 flex items-center justify-center bg-linear-to-br from-surface via-surface to-surface-elevated">
          <span className="bg-linear-to-br from-accent to-accent-secondary bg-clip-text font-display text-7xl font-semibold text-transparent sm:text-8xl">
            {INITIALS}
          </span>
        </div>

        {/* bottom status chip */}
        <div className="absolute inset-x-4 bottom-4 flex items-center gap-2 rounded-full border border-border/60 bg-background/70 px-3 py-1.5 backdrop-blur-md">
          <span className="relative flex size-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-75" />
            <span className="relative inline-flex size-2 rounded-full bg-accent" />
          </span>
          <span className="text-xs font-medium text-muted">Open to opportunities</span>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function Hero() {
  const reduceMotion = useReducedMotion();
  const words = HEADLINE.split(" ");

  return (
    <section
      id="about"
      className="relative flex min-h-[calc(100dvh-4rem)] w-full items-center overflow-hidden"
      aria-labelledby="hero-heading"
    >
      <Particles disabled={!!reduceMotion} />

      <div className="section-shell relative z-10 grid gap-12 py-16 sm:py-20 lg:grid-cols-[1.15fr_0.85fr] lg:items-center lg:gap-16 lg:py-24">
        <motion.div
          initial={reduceMotion ? false : "hidden"}
          animate="visible"
          className="order-2 flex max-w-2xl flex-col gap-6 lg:order-1"
        >
          <motion.h1
            id="hero-heading"
            variants={containerVariants}
            className="font-display text-5xl leading-[1.05] font-semibold tracking-tight text-foreground sm:text-6xl lg:text-6xl xl:text-7xl"
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
            className="text-base font-medium text-accent sm:text-lg"
          >
            Software Engineering Student | Front-End Developer | Creative
            Technologist
          </motion.p>

          <motion.p
            variants={fadeUp}
            className="text-base leading-relaxed text-muted sm:text-lg"
          >
            I build thoughtful digital experiences at the intersection of
            software engineering and creative technology — from polished web
            interfaces to cinematic visual storytelling.
          </motion.p>

          <motion.p
            variants={fadeUp}
            className="text-base leading-relaxed text-muted sm:text-lg"
          >
            Currently a Software Engineering student at Daffodil International
            University, I turn ideas into reliable, user-first products —
            breaking complex problems into clear systems, then shipping
            interfaces that feel intuitive and intentional. My toolkit spans
            web development, Python, and emerging AI workflows.
          </motion.p>

          <motion.div
            variants={fadeUp}
            className="flex flex-col gap-3 pt-1 sm:flex-row sm:items-center"
          >
            <Link
              href="#projects"
              className="group inline-flex h-12 items-center justify-center gap-2 rounded-lg bg-accent px-6 text-sm font-semibold text-accent-foreground transition hover:brightness-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              View Projects
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
            <Link
              href="#contact"
              className="group inline-flex h-12 items-center justify-center gap-2 rounded-lg border border-border bg-surface px-6 text-sm font-medium text-foreground transition hover:border-accent/40 hover:bg-surface-elevated focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              <Mail className="size-4" />
              Contact Me
            </Link>
          </motion.div>
        </motion.div>

        <div className="order-1 flex justify-center lg:order-2 lg:justify-end">
          <ProfileCard disabled={!!reduceMotion} />
        </div>
      </div>
    </section>
  );
}
