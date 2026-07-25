"use client";

import { useMemo } from "react";
import Link from "next/link";
import { ArrowRight, Mail } from "lucide-react";
import { motion, useReducedMotion, type Variants } from "framer-motion";

const HEADLINE = "Abir Hossen";

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

export default function Hero() {
  const reduceMotion = useReducedMotion();
  const words = HEADLINE.split(" ");

  return (
    <section
      className="relative flex min-h-[calc(100dvh-4rem)] w-full items-center overflow-hidden"
      aria-labelledby="hero-heading"
    >
      <Particles disabled={!!reduceMotion} />

      <div className="section-shell relative z-10 py-16 sm:py-20 lg:py-24">
        <motion.div
          initial={reduceMotion ? false : "hidden"}
          animate="visible"
          className="flex max-w-3xl flex-col gap-7"
        >
          <motion.h1
            id="hero-heading"
            variants={containerVariants}
            className="font-display text-5xl leading-[1.05] font-semibold tracking-tight text-foreground sm:text-6xl md:text-7xl"
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
            className="max-w-2xl text-base leading-relaxed text-muted sm:text-lg"
          >
            I build thoughtful digital experiences at the intersection of
            software engineering and creative technology — from polished web
            interfaces to cinematic visual storytelling.
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
      </div>
    </section>
  );
}
