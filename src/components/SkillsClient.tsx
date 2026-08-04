// --- Path: src/components/SkillsClient.tsx ---
'use client';

import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import { DynamicIcon } from "@/components/DynamicIcon";
import SkillModal, { SkillDetail } from "./SkillModal";
import { SubtleWobble } from "./SubtleWobble";
import { Code2, Feather, Sparkles, Rocket } from "lucide-react";
import Image from "next/image";
import { getSkillIcon } from "@/sanity/lib/skill-icons";

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
      <div className="mx-auto w-full max-w-6xl px-6 sm:px-12 lg:px-16 xl:px-20">
        
        {/* Header Section */}
        <div className="relative mb-16 flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
          <div className="max-w-2xl space-y-3">
            <p className="text-sm sm:text-base font-semibold tracking-[0.2em] text-purple-400 uppercase">
              SKILLS
            </p>
            <h2
              id="skills-heading"
              className="font-serif-display text-5xl sm:text-6xl font-normal tracking-tight text-white"
            >
              Things I Build With<span className="text-purple-400">.</span>
            </h2>
            <p className="text-base sm:text-lg leading-relaxed text-slate-400 font-light">
              I don&apos;t believe in measuring skills with percentages. These are the technologies and creative tools I rely on to turn ideas into real projects.
            </p>
          </div>

          <div className="hidden sm:block lg:self-center select-none pointer-events-none transform rotate-[-4deg]">
            <span className="block font-handwriting text-3xl sm:text-4xl text-indigo-300/80 tracking-wide">
              Still learning.
            </span>
            <span className="block font-handwriting text-3xl sm:text-4xl text-indigo-300/80 tracking-wide pl-4">
              Always building.
            </span>
            <div className="h-0.5 w-28 bg-indigo-500/40 mt-1 ml-4 rounded-full" />
          </div>
        </div>

        {/* Categories Stack */}
        <div className="space-y-12">
          {categories.map((category) => {
            const FallbackBadgeIcon = getFallbackBadgeIcon(category.categoryId);
            const hexColor = category.themeColor || "#A855F7"; 

            return (
              <div key={category._id || category.title} className="space-y-5">
                
                {/* Category Header Bar */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800/80 pb-3">
                  
                  {/* Icon and Category Title Container */}
                  <div className="flex items-center gap-3.5">
                    <div 
                      className="flex items-center justify-center size-10 rounded-full border backdrop-blur-md shrink-0"
                      style={{
                        backgroundColor: `${hexColor}1A`, 
                        borderColor: `${hexColor}40`,     
                        color: hexColor,
                      }}
                    >
                      {category.customBadgeIconUrl ? (
                        <div className="relative size-5 flex items-center justify-center">
                          <Image
                            src={category.customBadgeIconUrl}
                            alt={`${category.title} icon`}
                            fill
                            className="object-contain"
                          />
                        </div>
                      ) : category.badgeIcon?.name ? (
                        <DynamicIcon icon={category.badgeIcon} className="size-5" />
                      ) : (
                        <FallbackBadgeIcon className="size-5" />
                      )}
                    </div>
                    
                    <span 
                      className="text-base sm:text-lg font-bold tracking-wider uppercase"
                      style={{ color: hexColor }}
                    >
                      {category.title}
                    </span>
                  </div>
                  
                  {category.description && (
                    <p className="text-xs sm:text-sm text-slate-400 font-light">
                      {category.description}
                    </p>
                  )}
                </div>

                {/* Skills Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-7 gap-4">
                  {category.skills?.map((skill: SkillDetail) => (
                    <div
                      key={skill.name}
                      // INJECT THE CATEGORY COLOR HERE:
                      onClick={() => setSelectedSkill({ ...skill, themeColor: hexColor })}
                      className="cursor-pointer"
                    >
                      <SubtleWobble>
                        <div 
                          className="group flex h-36 flex-col items-center justify-center text-center gap-2 rounded-xl border bg-linear-to-b from-white/4 to-[#05060a] p-4 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1"
                          style={{ 
                            borderColor: "rgba(255, 255, 255, 0.1)",
                            // We inject the category hex color as a CSS variable here
                            "--hover-color": hexColor
                          } as React.CSSProperties} 
                          onMouseEnter={(e) => {
                            e.currentTarget.style.borderColor = hexColor; 
                            e.currentTarget.style.boxShadow = `0 10px 30px -10px ${hexColor}33`; 
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.1)"; 
                            e.currentTarget.style.boxShadow = "none";
                          }}
                        >
                          
                          {/* Icon wrapper */}
                          <div className="flex h-12 items-center justify-center group-hover:scale-110 transition-transform mb-1">
                            {skill.customIconUrl ? (
                              <Image
                                src={skill.customIconUrl}
                                alt={skill.name}
                                width={40}
                                height={40}
                                className="object-contain"
                              />
                            ) : typeof skill.icon === "string" ? (
                              (() => {
                                const { icon: MappedIcon, color } = getSkillIcon(skill.icon);
                                return <MappedIcon className={`size-10 ${color}`} />;
                              })()
                            ) : (
                              <DynamicIcon icon={skill.icon} className="size-10 text-slate-300" />
                            )}
                          </div>

                          <div className="flex flex-col gap-0.5">
                            {/* Skill Name: We use group-hover with the CSS variable we injected above! */}
                            <span className="text-sm font-semibold text-slate-100 transition-colors duration-300 group-hover:text-(--hover-color)">
                              {skill.name}
                            </span>
                            {skill.subtitle && (
                              <span className="text-xs text-slate-400 font-normal">
                                {skill.subtitle}
                              </span>
                            )}
                          </div>

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