'use client';

import { motion, AnimatePresence } from "framer-motion";
import { FaGithub, FaXmark } from "react-icons/fa6";
import { FiExternalLink } from "react-icons/fi";
import { useEffect, useState, useRef } from "react";

type Project = {
  id: number;
  title: string;
  description: string;
  techStack: string[];
  githubUrl: string;
  liveUrl: string;
  sections: { text: string; image: string }[];
};

export default function ProjectModal({ 
  project, 
  onClose 
}: { 
  project: Project | null; 
  onClose: () => void 
}) {
  const [activeIndex, setActiveIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRefs = useRef<(HTMLDivElement | null)[]>([]);
  const isScrollingRef = useRef(false);

  if (project && imageRefs.current.length !== project.sections.length) {
    imageRefs.current = Array(project.sections.length).fill(null);
  }

  // Handle body scroll lock
  useEffect(() => {
    if (project) {
      document.body.style.overflow = "hidden";
    }
    return () => { document.body.style.overflow = "unset"; };
  }, [project]);

  // Shared navigation logic: moves to the given section index with the
  // same smooth snap + cooldown used by both the wheel handler and the
  // up/down triangle controls.
  const goToIndex = (nextIndex: number) => {
    if (!project) return;
    if (isScrollingRef.current) return;
    if (nextIndex < 0 || nextIndex >= project.sections.length) return;

    isScrollingRef.current = true;
    setActiveIndex(nextIndex);

    imageRefs.current[nextIndex]?.scrollIntoView({
      behavior: "smooth",
      block: "center",
    });

    setTimeout(() => {
      isScrollingRef.current = false;
    }, 500); // 500ms lock matches the smooth transition duration
  };

  // Custom Wheel Handler for smooth, click-to-slide snapping behavior
  useEffect(() => {
    const container = containerRef.current;
    if (!container || !project) return;

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      const direction = e.deltaY > 0 ? 1 : -1;
      goToIndex(activeIndex + direction);
    };

    container.addEventListener("wheel", handleWheel, { passive: false });
    return () => container.removeEventListener("wheel", handleWheel);
  }, [activeIndex, project]);

  if (!project) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
      
      {/* Backdrop */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-slate-950/60 backdrop-blur-sm"
      />

      {/* Glassmorphism Modal Container */}
      <motion.div 
        initial={{ opacity: 0, y: 20, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 20, scale: 0.95 }}
        className="relative flex flex-col w-full max-w-7xl h-[90vh] overflow-hidden rounded-2xl border border-slate-700/50 bg-[#0F172A]/40 backdrop-blur-2xl shadow-2xl lg:flex-row"
      >
        
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute left-6 top-6 z-20 rounded-full bg-slate-800/80 p-2.5 text-slate-400 transition-colors hover:bg-slate-700 hover:text-white"
        >
          <FaXmark className="text-xl" />
        </button>

        {/* LEFT PANEL: Fixed Layout, Dynamic Text */}
        <div className="flex w-full flex-col p-10 pt-24 pb-32 lg:w-1/2 lg:border-r lg:border-slate-800/50">
          
          <h2 className="mb-4 text-4xl font-extrabold tracking-tight text-white sm:text-5xl">
            {project.title}
          </h2>
          
          <div className="mb-10 flex flex-wrap gap-2">
            {project.techStack.map((tech) => (
              <span 
                key={tech} 
                className="rounded-full bg-blue-500/10 px-4 py-1.5 text-xs font-semibold text-blue-400 border border-blue-500/20"
              >
                {tech}
              </span>
            ))}
          </div>

          <div className="relative flex-1">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIndex}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="prose prose-invert max-w-none text-slate-300 leading-relaxed text-lg"
              >
                <p>{project.sections[activeIndex].text}</p>
              </motion.div>
            </AnimatePresence>
          </div>

        </div>

        {/* RIGHT PANEL: Controlled Scrollable Images */}
        <div 
          ref={containerRef}
          className="relative flex w-full flex-1 flex-col overflow-y-auto overflow-x-hidden hide-scrollbar lg:w-1/2"
        >
          <div className="space-y-32 py-[30vh] px-8 lg:px-14">
            {project.sections.map((section, index) => (
              <motion.div 
                key={index} 
                // @ts-ignore
                ref={(el) => (imageRefs.current[index] = el)}
                animate={{ 
                  scale: activeIndex === index ? 1.05 : 0.85,
                  opacity: activeIndex === index ? 1 : 0.4,
                }}
                transition={{ 
                  duration: 0.6, 
                  ease: [0.16, 1, 0.3, 1] 
                }}
                className="overflow-hidden rounded-2xl border border-slate-700/60 bg-slate-900 shadow-2xl origin-center shrink-0"
              >
                <img 
                  src={section.image} 
                  alt={`${project.title} section ${index + 1}`} 
                  className="w-full h-auto object-cover"
                />
              </motion.div>
            ))}
          </div>
        </div>

        {/* Section Nav: up/down triangle control, replaces the scrollbar */}
        {project.sections.length > 1 && (
          <div className="pointer-events-none absolute inset-y-0 right-3 z-20 hidden items-center lg:right-5 lg:flex">
            <div className="pointer-events-auto flex flex-col items-center gap-1 rounded-full border border-slate-700/50 bg-slate-900/60 p-1.5 backdrop-blur-md shadow-lg">
              <button
                type="button"
                onClick={() => goToIndex(activeIndex - 1)}
                disabled={activeIndex === 0}
                aria-label="Previous section"
                className="group flex h-8 w-8 items-center justify-center rounded-full transition-colors disabled:cursor-default hover:enabled:bg-slate-700/60"
              >
                <svg
                  width="10"
                  height="7"
                  viewBox="0 0 10 7"
                  className={`transition-colors ${
                    activeIndex === 0
                      ? "fill-slate-600"
                      : "fill-slate-400 group-hover:fill-accent"
                  }`}
                >
                  <path d="M5 0L10 7H0L5 0Z" />
                </svg>
              </button>

              <div className="flex flex-col items-center gap-1.5 py-1">
                {project.sections.map((_, index) => (
                  <span
                    key={index}
                    className={`rounded-full transition-all duration-300 ${
                      activeIndex === index
                        ? "h-3.5 w-1 bg-accent"
                        : "h-1 w-1 bg-slate-600"
                    }`}
                  />
                ))}
              </div>

              <button
                type="button"
                onClick={() => goToIndex(activeIndex + 1)}
                disabled={activeIndex === project.sections.length - 1}
                aria-label="Next section"
                className="group flex h-8 w-8 items-center justify-center rounded-full transition-colors disabled:cursor-default hover:enabled:bg-slate-700/60"
              >
                <svg
                  width="10"
                  height="7"
                  viewBox="0 0 10 7"
                  className={`transition-colors ${
                    activeIndex === project.sections.length - 1
                      ? "fill-slate-600"
                      : "fill-slate-400 group-hover:fill-accent"
                  }`}
                >
                  <path d="M5 7L0 0H10L5 7Z" />
                </svg>
              </button>
            </div>
          </div>
        )}

        {/* BOTTOM FIXED PANEL: Links */}
        <div className="absolute inset-x-0 bottom-0 z-20 flex justify-center gap-6 p-6 bg-linear-to-t from-[#0F172A]/90 to-transparent">
          <a 
            href={project.liveUrl} 
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2.5 rounded-2xl bg-blue-600 px-8 py-3.5 text-base font-semibold text-white transition-colors hover:bg-blue-500 shadow-lg"
          >
            Live Demo
            <FiExternalLink className="text-xl" />
          </a>
          <a 
            href={project.githubUrl} 
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2.5 rounded-2xl bg-slate-800/90 px-8 py-3.5 text-base font-semibold text-white transition-colors hover:bg-slate-700 shadow-lg backdrop-blur-sm"
          >
            <FaGithub className="text-xl" />
            Source Code
          </a>
        </div>
        
      </motion.div>
    </div>
  );
}