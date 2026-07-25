import type { IconType } from "react-icons";
import {
  SiJavascript,
  SiTypescript,
  SiPython,
  SiHtml5,
  SiReact,
  SiNextdotjs,
  SiGit,
  SiFigma,
  SiTailwindcss,
  SiSanity,
  SiVercel,
  SiBlender,
} from "react-icons/si";
import { VscCode } from "react-icons/vsc";
import {
  FaRobot,
  FaNetworkWired,
  FaWandMagicSparkles,
  FaServer,
  FaClapperboard,
  FaCamera,
  FaVideo,
  FaPenFancy,
  FaCode,
} from "react-icons/fa6";

// Keyed by the `icon` value chosen in the Sanity Studio dropdown
// (src/sanity/schemaTypes/skill.ts). Add a new entry here whenever a new
// icon option is added to that schema's list.
export const skillIconMap: Record<string, { icon: IconType; color: string }> = {
  javascript: { icon: SiJavascript, color: "text-[#F7DF1E]" },
  typescript: { icon: SiTypescript, color: "text-[#3178C6]" },
  python: { icon: SiPython, color: "text-[#3776AB]" },
  "html-css": { icon: SiHtml5, color: "text-[#E34F26]" },
  react: { icon: SiReact, color: "text-[#61DAFB]" },
  nextjs: { icon: SiNextdotjs, color: "text-white" },
  git: { icon: SiGit, color: "text-[#F05032]" },
  vscode: { icon: VscCode, color: "text-[#007ACC]" },
  figma: { icon: SiFigma, color: "text-[#F24E1E]" },
  tailwind: { icon: SiTailwindcss, color: "text-[#06B6D4]" },
  sanity: { icon: SiSanity, color: "text-[#F03E2F]" },
  vercel: { icon: SiVercel, color: "text-white" },
  blender: { icon: SiBlender, color: "text-[#F5792A]" },
  ai: { icon: FaRobot, color: "text-emerald-400" },
  "system-design": { icon: FaNetworkWired, color: "text-emerald-400" },
  "motion-design": { icon: FaWandMagicSparkles, color: "text-emerald-400" },
  backend: { icon: FaServer, color: "text-emerald-400" },
  "video-editing": { icon: FaClapperboard, color: "text-amber-400" },
  "photo-editing": { icon: FaCamera, color: "text-amber-400" },
  "video-creation": { icon: FaVideo, color: "text-amber-400" },
  "script-writing": { icon: FaPenFancy, color: "text-amber-400" },
  generic: { icon: FaCode, color: "text-slate-400" },
};

export function getSkillIcon(key: string | null | undefined) {
  return skillIconMap[key ?? "generic"] ?? skillIconMap.generic;
}