'use client';

import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import { DynamicIcon } from "@/components/DynamicIcon";
import SkillModal, { SkillDetail } from "./SkillModal";
import { SubtleWobble } from "./SubtleWobble";
import { Code2, Feather, Sparkles, Rocket } from "lucide-react";
import Image from "next/image";

interface SkillsClientProps {
  categories: any[];
}

function getFallbackBadgeIcon(categoryId?: string) {
  switch (categoryId) {
    case "creative":
      return Feather;
    case "ai":
      return Sparkles;
    case "exploring":
      return Rocket;
    default:
      return Code2;
  }
}

export function SkillsClient({ categories }: SkillsClientProps) {
  const [selectedSkill, setSelectedSkill] = useState<SkillDetail | null>(null);

  return (
    <section id="skills" className="py-16 lg:py-24" aria-labelledby="skills-heading">
      <div className="mx-auto w-full max-w-375 px-6 sm:px-12 lg:px-16 xl:px-20">
        
        {/* Header Section */}
        <div className="relative mb-16 flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
          <div className="max-w-2xl space-y-3">
            <p className="text-xs font-semibold tracking-[0.2em] text-purple-400 uppercase">
              SKILLS
            </p>
            <h2
              id="skills-heading"
              className="font-serif-display text-5xl sm:text-6xl font-normal tracking-tight text-white"
            >
              Things I Build With<span className="text-purple-400">.</span>
            </h2>
            <p className="text-base sm:text-lg leading-relaxed text-slate-400 font-light">
              I don't believe in measuring skills with percentages. Click any skill card to explore my experience level and related projects.
            </p>
          </div>

          <div className="hidden sm:block lg:self-center select-none pointer-events-none transform rotate-[-4deg]">
            <span className="block font-serif-display italic text-2xl sm:text-3xl text-indigo-300/80 tracking-wide">
              Still learning.
            </span>
            <span className="block font-serif-display italic text-2xl sm:text-3xl text-indigo-300/80 tracking-wide pl-4">
              Always building.
            </span>
            <div className="h-0.5 w-28 bg-indigo-500/40 mt-1 ml-4 rounded-full" />
          </div>
        </div>

        {/* Categories Stack */}
        <div className="space-y-12">
          {categories.map((category) => {
            const FallbackBadgeIcon = getFallbackBadgeIcon(category.categoryId);

            return (
              <div key={category._id || category.title} className="space-y-5">
                
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div className="inline-flex items-center gap-2.5 rounded-full border border-indigo-500/30 bg-indigo-950/20 px-3.5 py-1.5 backdrop-blur-md">
                    {category.badgeIcon?.name ? (
                      <DynamicIcon icon={category.badgeIcon} className="size-4 text-purple-400" />
                    ) : (
                      <FallbackBadgeIcon className="size-4 text-purple-400" />
                    )}
                    <span className="text-xs font-semibold tracking-wider text-purple-300 uppercase">
                      {category.title}
                    </span>
                  </div>
                  
                  {category.description && (
                    <p className="text-xs sm:text-sm text-slate-400 font-light">
                      {category.description}
                    </p>
                  )}
                </div>

                {/* Cards Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-3.5">
                  {category.skills?.map((skill: SkillDetail) => (
                    <div
                      key={skill.name}
                      onClick={() => setSelectedSkill(skill)}
                      className="cursor-pointer"
                    >
                      <SubtleWobble>
                        <div className="group flex h-full flex-col items-center justify-center text-center gap-2.5 rounded-2xl border border-slate-800/80 bg-slate-900/40 p-5 backdrop-blur-sm transition-all duration-300 hover:border-purple-500/50 hover:bg-slate-800/60 hover:-translate-y-1">
                          
                          <div className="flex size-11 items-center justify-center rounded-xl bg-slate-800/50 group-hover:scale-110 transition-transform relative overflow-hidden">
                            {skill.customIconUrl ? (
                              <Image
                                src={skill.customIconUrl}
                                alt={skill.name}
                                width={28}
                                height={28}
                                className="object-contain"
                              />
                            ) : (
                              <DynamicIcon icon={skill.icon} className="size-6 text-purple-400" />
                            )}
                          </div>

                          <span className="text-sm font-semibold text-slate-100 group-hover:text-purple-300 transition-colors">
                            {skill.name}
                          </span>

                          {skill.subtitle && (
                            <span className="text-xs text-slate-400 font-normal">
                              {skill.subtitle}
                            </span>
                          )}
                        </div>
                      </SubtleWobble>
                    </div>
                  ))}
                </div>

              </div>
            );
          })}
        </div>

      </div>

      <AnimatePresence>
        {selectedSkill && (
          <SkillModal skill={selectedSkill} onClose={() => setSelectedSkill(null)} />
        )}
      </AnimatePresence>
    </section>
  );
}