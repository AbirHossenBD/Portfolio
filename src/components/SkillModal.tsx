'use client';

import { motion, Variants } from "framer-motion";
import { FaXmark } from "react-icons/fa6";
import { FiArrowRight } from "react-icons/fi";
import { DynamicIcon } from "@/components/DynamicIcon";
import Image from "next/image";
import { useEffect, useState } from "react";
import { getSkillIcon } from "@/sanity/lib/skill-icons";

export interface SkillProject {
  title: string;
  link?: string;
  role?: string;
}

export interface SkillDetail {
  name: string;
  subtitle?: string;
  description?: string;
  themeColor?: string;
  icon?: string | { name?: string; provider?: string };
  customIconUrl?: string;
  proficiency?: string;
  experienceTime?: string;
  projectsBuilt?: SkillProject[];
}

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.15,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

export default function SkillModal({
  skill,
  onClose,
}: {
  skill: SkillDetail | null;
  onClose: () => void;
}) {
  useEffect(() => {
    if (skill) {
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [skill]);

  if (!skill) return null;

  // Fallback to a neutral slate if no theme color is provided
  const dynamicColor = skill.themeColor || "#94a3b8";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-12">
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        onClick={onClose}
        className="absolute inset-0 bg-slate-950/80 backdrop-blur-md"
      />

      {/* Modal Container */}
      <motion.div
        initial={{ opacity: 0, y: 40, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 20, scale: 0.95 }}
        transition={{ type: "spring", duration: 0.7, bounce: 0.3 }}
        className="relative flex w-full max-w-3xl max-h-[90vh] flex-col overflow-hidden rounded-4xl border bg-[#0A0F1C]/95"
        style={{
          borderColor: `${dynamicColor}40`,
          boxShadow: `0 25px 50px -12px ${dynamicColor}33`,
        }}
      >
        {/* Decorative Top Gradient Line */}
        <div
          className="absolute top-0 inset-x-0 h-1.5 opacity-90"
          style={{
            background: `linear-gradient(to right, transparent, ${dynamicColor}, transparent)`,
          }}
        />

        {/* Glowing orb effect behind the header */}
        <div
          className="absolute top-0 left-0 w-full h-64 pointer-events-none"
          style={{
            background: `linear-gradient(to bottom, ${dynamicColor}15, transparent)`,
          }}
        />

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute right-5 top-5 z-20 flex size-10 items-center justify-center rounded-full bg-slate-800/50 text-slate-400 backdrop-blur-md transition-all hover:bg-slate-700 hover:text-white hover:rotate-90 focus:outline-none"
          aria-label="Close modal"
        >
          <FaXmark className="text-xl" />
        </button>

        {/* Scrollable Content Area */}
        <div className="overflow-y-auto px-6 py-8 sm:px-10 sm:py-12 [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:bg-slate-700/50 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:bg-transparent">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="relative z-10"
          >
            {/* Header Section */}
            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row sm:items-start gap-6 mb-8"
            >
              {/* Icon Box */}
              <div
                className="relative flex size-20 sm:size-24 shrink-0 items-center justify-center rounded-3xl bg-slate-800/80 border p-5 overflow-hidden group"
                style={{
                  borderColor: `${dynamicColor}40`,
                  boxShadow: `0 0 40px ${dynamicColor}25`,
                }}
              >
                <div
                  className="absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                  style={{
                    background: `linear-gradient(to bottom right, ${dynamicColor}20, transparent)`,
                  }}
                />

                {skill.customIconUrl ? (
                  <div className="relative size-full flex items-center justify-center">
                    <Image
                      src={skill.customIconUrl}
                      alt={skill.name}
                      fill
                      sizes="64px"
                      className="object-contain drop-shadow-lg transition-transform duration-500 group-hover:scale-110"
                    />
                  </div>
                ) : typeof skill.icon === "string" ? (
                  (() => {
                    const { icon: MappedIcon, color } = getSkillIcon(skill.icon);
                    return (
                      <MappedIcon
                        className={`size-12 sm:size-14 ${color} drop-shadow-lg transition-transform duration-500 group-hover:scale-110`}
                      />
                    );
                  })()
                ) : (
                  <span style={{ color: dynamicColor }} className="flex items-center justify-center">
                    <DynamicIcon
                      icon={skill.icon}
                      className="size-12 sm:size-14 drop-shadow-lg transition-transform duration-500 group-hover:scale-110"
                    />
                  </span>
                )}
              </div>

              <div className="pt-2">
                <h3 className="font-serif-display text-4xl sm:text-5xl font-bold text-white tracking-tight">
                  {skill.name}
                </h3>

                {/* Dynamic Subtitle Color */}
                {skill.subtitle && (
                  <p
                    className="text-base sm:text-lg font-medium mt-2"
                    style={{ color: dynamicColor }}
                  >
                    {skill.subtitle}
                  </p>
                )}

                {/* Editable Description in Off-White */}
                {skill.description && (
                  <p className="text-sm sm:text-base text-slate-200/90 font-light mt-4 leading-relaxed max-w-xl">
                    {skill.description}
                  </p>
                )}
              </div>
            </motion.div>

            {/* Badges Row */}
            {(skill.proficiency || skill.experienceTime) && (
              <motion.div
                variants={itemVariants}
                className="flex flex-wrap gap-3 mb-10"
              >
                {skill.proficiency && (
                  <div
                    className="flex items-center gap-2.5 rounded-full border px-4 py-2 text-sm font-medium backdrop-blur-sm"
                    style={{
                      backgroundColor: `${dynamicColor}15`,
                      borderColor: `${dynamicColor}35`,
                      color: dynamicColor,
                    }}
                  >
                    <span
                      className="size-2 rounded-full"
                      style={{
                        backgroundColor: dynamicColor,
                        boxShadow: `0 0 10px ${dynamicColor}cc`,
                      }}
                    />
                    {skill.proficiency}
                  </div>
                )}
                {skill.experienceTime && (
                  <div
                    className="flex items-center gap-2.5 rounded-full border px-4 py-2 text-sm font-medium backdrop-blur-sm"
                    style={{
                      backgroundColor: `${dynamicColor}10`,
                      borderColor: `${dynamicColor}25`,
                      color: dynamicColor,
                    }}
                  >
                    <span
                      className="size-2 rounded-full"
                      style={{
                        backgroundColor: dynamicColor,
                        boxShadow: `0 0 10px ${dynamicColor}99`,
                      }}
                    />
                    {skill.experienceTime}
                  </div>
                )}
              </motion.div>
            )}

            {/* Projects List */}
            {skill.projectsBuilt && skill.projectsBuilt.length > 0 && (
              <motion.div variants={itemVariants} className="space-y-5">
                <div className="flex items-center gap-4">
                  <h4 className="text-xs font-bold tracking-[0.2em] text-slate-500 uppercase">
                    Featured Projects
                  </h4>
                  <div className="h-px flex-1 bg-slate-800/80" />
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  {skill.projectsBuilt.map((proj, idx) => (
                    <ProjectCard
                      key={idx}
                      proj={proj}
                      dynamicColor={dynamicColor}
                    />
                  ))}
                </div>
              </motion.div>
            )}
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}

// Sub-component to cleanly handle the hover states of individual project cards
function ProjectCard({
  proj,
  dynamicColor,
}: {
  proj: SkillProject;
  dynamicColor: string;
}) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <a
      href={proj.link || "#"}
      target={proj.link ? "_blank" : undefined}
      rel="noreferrer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative flex flex-col justify-center overflow-hidden rounded-2xl border transition-all duration-500 hover:-translate-y-1 p-5"
      style={{
        borderColor: isHovered ? `${dynamicColor}60` : "rgba(51, 65, 85, 0.4)", // slate-700/40
        backgroundColor: isHovered ? `${dynamicColor}10` : "rgba(30, 41, 59, 0.2)", // slate-800/20
        boxShadow: isHovered ? `0 8px 30px ${dynamicColor}20` : "none",
      }}
    >
      <div
        className="absolute inset-0 transition-opacity duration-500 pointer-events-none"
        style={{
          opacity: isHovered ? 1 : 0,
          background: `linear-gradient(to bottom right, ${dynamicColor}15, transparent)`,
        }}
      />

      <div className="relative flex items-center justify-between gap-4">
        <div className="flex-1 min-w-0">
          <span
            className="block text-base font-semibold transition-colors truncate"
            style={{ color: isHovered ? dynamicColor : "#e2e8f0" }} // slate-200
          >
            {proj.title}
          </span>
          {proj.role && (
            <span className="block text-sm text-slate-400 mt-1 font-medium truncate">
              {proj.role}
            </span>
          )}
        </div>
        
        {proj.link && (
          <div
            className="flex size-8 shrink-0 items-center justify-center rounded-full transition-all duration-300"
            style={{
              backgroundColor: isHovered ? dynamicColor : "rgba(30, 41, 59, 0.8)", // slate-800/80
              color: isHovered ? "#ffffff" : "#94a3b8", // white : slate-400
            }}
          >
            <FiArrowRight
              className={`size-4 transition-transform duration-300 ${
                isHovered ? "rotate-0" : "-rotate-45"
              }`}
            />
          </div>
        )}
      </div>
    </a>
  );
}