// --- Path: src/components/Skills.tsx ---
import { getSkillCategories } from "@/sanity/lib/queries";
import { SkillsClient } from "./SkillsClient";

const fallbackCategories = [
  {
    _id: "engineering",
    title: "ENGINEERING",
    categoryId: "engineering",
    description: "Core technologies I use to build scalable and modern web applications.",
    badgeIcon: { provider: "lu", name: "LuCode2" },
    themeColor: "#3B82F6",
    skills: [
      { name: "Python", subtitle: "3+ Projects", icon: "python" },
      { name: "JavaScript", subtitle: "3+ Projects", icon: "javascript" },
      { name: "TypeScript", subtitle: "Learning", icon: "typescript" },
      { name: "HTML/CSS", subtitle: "4+ Years", icon: "html-css" },
      { name: "React", subtitle: "Learning", icon: "react" },
      { name: "Next.js", subtitle: "Learning", icon: "nextjs" },
      { name: "Git", subtitle: "Daily Use", icon: "git" },
    ],
  },
  {
    _id: "creative",
    title: "CREATIVE WORKFLOW",
    categoryId: "creative",
    description: "Design, edit, and bring ideas to life.",
    badgeIcon: { provider: "lu", name: "LuFeather" },
    themeColor: "#EC4899",
    skills: [
      { name: "Figma", subtitle: "UI/UX Design", icon: "figma" },
      { name: "Blender", subtitle: "3D & Motion", icon: "blender" },
      { name: "Video Editing", subtitle: "Premiere/DaVinci", icon: "video-editing" },
    ],
  },
];

export default async function Skills() {
  let categories = [];
  try {
    categories = await getSkillCategories();
  } catch (err) {
    console.error("Error fetching skill categories from Sanity:", err);
  }

  const finalCategories = categories && categories.length > 0 ? categories : fallbackCategories;

  return <SkillsClient categories={finalCategories} />;
}