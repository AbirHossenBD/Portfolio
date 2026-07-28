'use client';

import { motion } from "framer-motion";
import { FaXmark } from "react-icons/fa6";
import { FiExternalLink } from "react-icons/fi";
import { DynamicIcon } from "@/components/DynamicIcon";
import Image from "next/image";
import { useEffect } from "react";

export interface SkillProject {
  title: string;
  link?: string;
  role?: string;
}

export interface SkillDetail {
  name: string;
  subtitle?: string;
  icon?: { name?: string; provider?: string };
  customIconUrl?: string;
  proficiency?: string;
  experienceTime?: string;
  detailedDescription?: string;
  projectsBuilt?: SkillProject[];
}

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

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-slate-950/70 backdrop-blur-md"
      />

      {/* Modal Container */}
      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 20, scale: 0.95 }}
        className="relative w-full max-w-2xl overflow-hidden rounded-2xl border border-slate-700/60 bg-[#0F172A]/90 p-6 sm:p-8 backdrop-blur-2xl shadow-2xl"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute right-5 top-5 rounded-full bg-slate-800/80 p-2 text-slate-400 transition-colors hover:bg-slate-700 hover:text-white focus:outline-none"
        >
          <FaXmark className="text-lg" />
        </button>

        {/* Header Section */}
        <div className="flex items-center gap-4 mb-6">
          <div className="flex size-14 shrink-0 items-center justify-center rounded-2xl bg-slate-800/80 border border-slate-700/50 p-3">
            {skill.customIconUrl ? (
              <div className="relative size-9 flex items-center justify-center">
                <Image
                  src={skill.customIconUrl}
                  alt={skill.name}
                  fill
                  sizes="36px"
                  className="object-contain"
               />
              </div>
            ) : (
             <DynamicIcon icon={skill.icon} className="size-8 text-purple-400" />
            )}
          </div>

          <div>
            <h3 className="font-serif-display text-3xl font-bold text-white">
              {skill.name}
            </h3>
            {skill.subtitle && (
              <p className="text-sm text-purple-400 font-medium mt-0.5">
                {skill.subtitle}
              </p>
            )}
          </div>
        </div>

        {/* Badges Row */}
        <div className="flex flex-wrap gap-3 mb-6">
          {skill.proficiency && (
            <div className="rounded-lg border border-purple-500/20 bg-purple-500/10 px-3 py-1 text-xs font-semibold text-purple-300">
              {skill.proficiency}
            </div>
          )}
          {skill.experienceTime && (
            <div className="rounded-lg border border-indigo-500/20 bg-indigo-500/10 px-3 py-1 text-xs font-semibold text-indigo-300">
              {skill.experienceTime}
            </div>
          )}
        </div>

        {/* Detailed Breakdown */}
        {skill.detailedDescription && (
          <div className="mb-6 space-y-2">
            <h4 className="text-xs font-semibold tracking-wider text-slate-400 uppercase">
              Expertise & Workflow
            </h4>
            <p className="text-sm leading-relaxed text-slate-300 font-light">
              {skill.detailedDescription}
            </p>
          </div>
        )}

        {/* Projects List */}
        {skill.projectsBuilt && skill.projectsBuilt.length > 0 && (
          <div className="space-y-3 pt-4 border-t border-slate-800">
            <h4 className="text-xs font-semibold tracking-wider text-slate-400 uppercase">
              Built With {skill.name}
            </h4>
            <div className="grid gap-2 sm:grid-cols-2">
              {skill.projectsBuilt.map((proj, idx) => (
                <a
                  key={idx}
                  href={proj.link || "#"}
                  target={proj.link ? "_blank" : undefined}
                  rel="noreferrer"
                  className="group flex items-center justify-between rounded-xl border border-slate-800 bg-slate-900/60 p-3 transition-all hover:border-purple-500/40 hover:bg-slate-800/60"
                >
                  <div>
                    <span className="block text-sm font-semibold text-slate-200 group-hover:text-purple-300">
                      {proj.title}
                    </span>
                    {proj.role && (
                      <span className="block text-xs text-slate-400 mt-0.5">
                        {proj.role}
                      </span>
                    )}
                  </div>
                  {proj.link && (
                    <FiExternalLink className="text-slate-500 group-hover:text-purple-400 transition-colors" />
                  )}
                </a>
              ))}
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
}