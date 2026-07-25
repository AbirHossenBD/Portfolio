import { SubtleWobble } from "./SubtleWobble";
import {
  SiJavascript, SiTypescript, SiPython, SiHtml5, SiReact, SiNextdotjs,
  SiGit, SiFigma, SiTailwindcss, SiSanity, SiVercel,
} from "react-icons/si";
import { VscCode } from "react-icons/vsc";
import { FaRobot, FaNetworkWired, FaWandMagicSparkles, FaServer, FaClapperboard, FaCamera, FaVideo, FaPenFancy } from "react-icons/fa6";
import { getSkills, type SkillCategory } from "@/sanity/lib/queries";
import { getSkillIcon } from "@/sanity/lib/skill-icons";

// Category display metadata — order here determines display order on the page.
const CATEGORY_META: Record<SkillCategory, { title: string; accent: string }> = {
  Programming: { title: "Programming", accent: "text-blue-400" },
  Tools: { title: "Tools", accent: "text-purple-400" },
  Creative: { title: "Creative & Media", accent: "text-amber-400" },
  "Currently Learning": { title: "Currently Learning", accent: "text-emerald-400" },
};
const CATEGORY_ORDER: SkillCategory[] = ["Programming", "Tools", "Creative", "Currently Learning"];

// Used only if nothing has been published in Sanity yet, so the section
// never renders empty.
const fallbackSkillCategories = [
  {
    title: "Programming",
    accent: "text-blue-400",
    skills: [
      { name: "JavaScript", icon: SiJavascript, color: "text-[#F7DF1E]" },
      { name: "TypeScript", icon: SiTypescript, color: "text-[#3178C6]" },
      { name: "Python", icon: SiPython, color: "text-[#3776AB]" },
      { name: "HTML/CSS", icon: SiHtml5, color: "text-[#E34F26]" },
      { name: "React", icon: SiReact, color: "text-[#61DAFB]" },
      { name: "Next.js", icon: SiNextdotjs, color: "text-white" },
    ],
  },
  {
    title: "Tools",
    accent: "text-purple-400",
    skills: [
      { name: "Git", icon: SiGit, color: "text-[#F05032]" },
      { name: "VS Code", icon: VscCode, color: "text-[#007ACC]" },
      { name: "Figma", icon: SiFigma, color: "text-[#F24E1E]" },
      { name: "Tailwind CSS", icon: SiTailwindcss, color: "text-[#06B6D4]" },
      { name: "Sanity", icon: SiSanity, color: "text-[#F03E2F]" },
      { name: "Vercel", icon: SiVercel, color: "text-white" },
    ],
  },
  {
    title: "Creative & Media",
    accent: "text-amber-400",
    skills: [
      { name: "Video Editing", icon: FaClapperboard, color: "text-amber-400" },
      { name: "Photo Editing", icon: FaCamera, color: "text-amber-400" },
      { name: "Video Creation", icon: FaVideo, color: "text-amber-400" },
      { name: "Script Writing", icon: FaPenFancy, color: "text-amber-400" },
    ],
  },
  {
    title: "Currently Learning",
    accent: "text-emerald-400",
    skills: [
      { name: "AI tooling", icon: FaRobot, color: "text-emerald-400" },
      { name: "System design", icon: FaNetworkWired, color: "text-emerald-400" },
      { name: "Motion design", icon: FaWandMagicSparkles, color: "text-emerald-400" },
      { name: "Backend APIs", icon: FaServer, color: "text-emerald-400" },
    ],
  },
];

export default async function Skills() {
  const skills = await getSkills();

  const skillCategories = skills.length
    ? CATEGORY_ORDER.map((categoryKey) => ({
        title: CATEGORY_META[categoryKey].title,
        accent: CATEGORY_META[categoryKey].accent,
        skills: skills
          .filter((skill) => skill.category === categoryKey)
          .map((skill) => {
            const { icon, color } = getSkillIcon(skill.icon);
            return { name: skill.name, icon, color };
          }),
      })).filter((category) => category.skills.length > 0)
    : fallbackSkillCategories;

  return (
    <section id="skills" className="py-24" aria-labelledby="skills-heading">
      <div className="mx-auto max-w-6xl px-6">
        
        {/* Section Header */}
        <div className="mb-16 max-w-2xl space-y-4">
          <p className="text-sm font-medium tracking-[0.16em] text-blue-400 uppercase">
            Skills
          </p>
          <h2
            id="skills-heading"
            className="text-3xl font-bold tracking-tight text-white sm:text-4xl"
          >
            Capabilities in motion
          </h2>
          <p className="text-lg text-slate-400">
            A practical stack shaped by coursework, freelance work, and
            hands-on projects — no percentage meters, just what I use.
          </p>
        </div>

        {/* Skills Grid Layout */}
        <div className="space-y-16">
          {skillCategories.map((category) => (
            <div key={category.title} className="space-y-6">
              
              {/* Clean Category Title */}
              <h3 className={`text-xl font-semibold border-b border-slate-800 pb-3 ${category.accent}`}>
                {category.title}
              </h3>
              
              {/* Individual Skill Cards */}
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
                {category.skills.map((skill) => (
                  <SubtleWobble key={skill.name}>
                    <div className="flex h-full flex-col items-center justify-center gap-3 rounded-2xl border border-slate-800/60 bg-[#1E293B]/50 p-6 transition-colors hover:border-slate-600 hover:bg-[#1E293B]">
                      <skill.icon className={`text-4xl transition-transform duration-300 hover:scale-110 ${skill.color}`} />
                      <span className="text-sm font-medium text-slate-300">
                        {skill.name}
                      </span>
                    </div>
                  </SubtleWobble>
                ))}
              </div>
              
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}