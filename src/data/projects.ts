export type ProjectCategory = "software" | "creative";

export type Project = {
  id: string;
  title: string;
  summary: string;
  description: string;
  tags: string[];
  category: ProjectCategory;
  demoUrl: string;
  repoUrl?: string;
  year: string;
};

export const projects: Project[] = [
  {
    id: "campus-connect",
    title: "Campus Connect",
    summary:
      "A student hub for announcements, clubs, and event discovery at DIU.",
    description:
      "Campus Connect centralizes campus life into a clean web experience — announcements, club discovery, and event RSVPs with a mobile-first layout. Built as a Software Engineering practice project focused on component architecture and accessible UI patterns.",
    tags: ["Next.js", "React", "Tailwind"],
    category: "software",
    demoUrl: "https://example.com/campus-connect",
    repoUrl: "https://github.com/",
    year: "2026",
  },
  {
    id: "taskflow",
    title: "TaskFlow",
    summary: "Lightweight task board with filters, tags, and keyboard shortcuts.",
    description:
      "TaskFlow is a front-end productivity board emphasizing snappy interactions and clear hierarchy. It explores state modeling, responsive layouts, and thoughtful empty states for everyday planning.",
    tags: ["React", "TypeScript", "Tailwind"],
    category: "software",
    demoUrl: "https://example.com/taskflow",
    repoUrl: "https://github.com/",
    year: "2025",
  },
  {
    id: "ai-notes",
    title: "AI Study Notes",
    summary: "Python-assisted note summarizer for lecture revision workflows.",
    description:
      "A small AI-assisted study utility that turns long lecture notes into concise revision cards. Combines Python scripting with a simple web front-end for quick review sessions.",
    tags: ["Python", "AI", "JavaScript"],
    category: "software",
    demoUrl: "https://example.com/ai-notes",
    year: "2025",
  },
  {
    id: "brand-reel",
    title: "Brand Launch Reel",
    summary: "Cinematic product launch edit with motion graphics and sound design.",
    description:
      "A short-form cinematic reel crafted for a brand launch — paced for social platforms with kinetic typography, color grading, and a clear narrative arc from problem to product reveal.",
    tags: ["Premiere Pro", "After Effects", "Color"],
    category: "creative",
    demoUrl: "https://example.com/brand-reel",
    year: "2025",
  },
  {
    id: "ad-campaign",
    title: "Seasonal Ad Campaign",
    summary: "Multi-format ad set for paid social and organic storytelling.",
    description:
      "End-to-end creative campaign including static frames, motion cuts, and platform-specific crops. Focused on conversion messaging while keeping a cohesive visual identity across placements.",
    tags: ["Campaign", "Motion", "Social Ads"],
    category: "creative",
    demoUrl: "https://example.com/ad-campaign",
    year: "2024",
  },
  {
    id: "event-aftermovie",
    title: "Campus Event Aftermovie",
    summary: "High-energy aftermovie capturing atmosphere, speakers, and crowd.",
    description:
      "An aftermovie documenting a campus tech event — interview bites, stage moments, and ambient footage shaped into a shareable story for organizers and attendees.",
    tags: ["Videography", "Editing", "Sound"],
    category: "creative",
    demoUrl: "https://example.com/aftermovie",
    year: "2024",
  },
];
