'use client';

import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import { 
  ArrowRight, 
  ExternalLink, 
  Calendar, 
  User, 
  Rocket, 
  DollarSign, 
  Gamepad2, 
  Puzzle, 
  Brain 
} from "lucide-react";
import ProjectModal from "./ProjectModal";

const CATEGORIES = ["All Projects", "Software", "AI & Automation", "Creative", "Game Dev"];

export default function ProjectsClient({ projects }: { projects: any[] }) {
  const [selectedCategory, setSelectedCategory] = useState("All Projects");
  const [selectedModalProject, setSelectedModalProject] = useState<any | null>(null);

  const filteredProjects = projects.filter((p) => {
    if (selectedCategory === "All Projects") return true;
    return p.category?.toLowerCase() === selectedCategory.toLowerCase();
  });

  const featuredProjects = filteredProjects.filter((p) => p.isFeatured !== false);
  const minorProjects = filteredProjects.filter((p) => p.isFeatured === false);

  return (
    <section id="projects" className="py-16 lg:py-24" aria-labelledby="projects-heading">
      <div className="mx-auto w-full max-w-375 px-6 sm:px-12 lg:px-16 xl:px-20">
        
        {/* Header Section */}
        <div className="relative mb-10 flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
          <div className="max-w-2xl space-y-3">
            <p className="text-xs font-semibold tracking-[0.2em] text-purple-400 uppercase">
              PROJECTS
            </p>
            <h2 id="projects-heading" className="font-serif-display text-5xl sm:text-6xl font-normal tracking-tight text-white">
              Things I&apos;ve Built<span className="text-purple-400">.</span>
            </h2>
            <p className="text-base sm:text-lg leading-relaxed text-slate-400 font-light">
              Every project represents a challenge, something I learned, or a problem I genuinely wanted to solve.
            </p>
          </div>

          <div className="hidden sm:block select-none pointer-events-none transform rotate-[-4deg]">
            <span className="block font-handwriting text-3xl sm:text-4xl text-indigo-300/80 tracking-wide">
              Building ideas.
            </span>
            <span className="block font-handwriting text-3xl sm:text-4xl text-indigo-300/80 tracking-wide pl-4">
              One project at a time.
            </span>
            <div className="h-0.5 w-28 bg-indigo-500/40 mt-1 ml-4 rounded-full" />
          </div>
        </div>

        {/* Filter Pills */}
        <div className="mb-12 flex flex-wrap gap-2.5">
          {CATEGORIES.map((cat) => {
            const isActive = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`rounded-full px-5 py-2 text-xs font-medium transition-all duration-300 ${
                  isActive
                    ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/30"
                    : "border border-slate-800 bg-slate-900/50 text-slate-400 hover:border-slate-700 hover:bg-slate-800/60 hover:text-slate-200"
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* Featured Large Cards */}
        <div className="space-y-8">
          {featuredProjects.map((project, index) => (
            <FeaturedCard
              key={project._id}
              project={project}
              index={index}
              onClick={() => setSelectedModalProject(project)}
            />
          ))}
        </div>

        {/* Minor Projects Section */}
        {minorProjects.length > 0 && (
          <div className="mt-16 space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-bold tracking-[0.2em] text-slate-400 uppercase">
                MORE PROJECTS
              </h3>
              <a href="#contact" className="group inline-flex items-center gap-1.5 text-xs font-semibold text-purple-400 hover:text-purple-300">
                <span>View all projects</span>
                <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-1" />
              </a>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {minorProjects.map((proj) => (
                <MinorCard
                  key={proj._id}
                  project={proj}
                  onClick={() => setSelectedModalProject(proj)}
                />
              ))}
            </div>
          </div>
        )}

        {/* Bottom Banner */}
        <div className="mt-12 flex flex-col sm:flex-row items-center justify-between gap-6 rounded-2xl border border-slate-800/80 bg-slate-900/40 p-6 sm:p-8 backdrop-blur-sm">
          <div className="flex items-center gap-4">
            <div className="flex size-12 shrink-0 items-center justify-center rounded-xl border border-slate-800 bg-slate-800/50 text-purple-400">
              <Rocket className="size-6" />
            </div>
            <div>
              <h4 className="text-lg font-semibold text-white">More projects coming soon.</h4>
              <p className="text-sm text-slate-400">I&apos;m always learning and building new things.</p>
            </div>
          </div>
          <a
            href="#contact"
            className="group inline-flex h-11 shrink-0 items-center justify-center gap-2 rounded-xl bg-indigo-600 px-6 text-sm font-medium text-white shadow-lg shadow-indigo-600/20 transition-all hover:bg-indigo-500"
          >
            <span>Let&apos;s Connect</span>
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
          </a>
        </div>

      </div>

      {/* Project Detail Modal */}
      <AnimatePresence>
        {selectedModalProject && (
          <ProjectModal
            project={selectedModalProject}
            onClose={() => setSelectedModalProject(null)}
          />
        )}
      </AnimatePresence>
    </section>
  );
}

// ---------------------------------------------------------------------------
// Featured Project Card Component
// ---------------------------------------------------------------------------
function FeaturedCard({ project, index, onClick }: { project: any; index: number; onClick: () => void }) {
  const [isHovered, setIsHovered] = useState(false);
  const isEven = index % 2 === 1;
  const displayIndex = String(index + 1).padStart(2, '0');
  
  // Custom theme color per project (defaults to purple if missing)
  const hexColor = project.color || '#A855F7';

  return (
    <div
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group relative cursor-pointer overflow-hidden rounded-2xl border backdrop-blur-sm transition-all duration-500"
      style={{
        borderColor: isHovered ? `${hexColor}50` : "rgba(30, 41, 59, 0.8)", // slate-800/80
        backgroundColor: isHovered ? `${hexColor}08` : "rgba(15, 23, 42, 0.4)", // slate-900/40
        boxShadow: isHovered ? `0 10px 40px -10px ${hexColor}30` : "none",
      }}
    >
      <div className={`grid gap-6 p-6 sm:p-8 lg:grid-cols-12 lg:items-center ${isEven ? 'lg:flex-row-reverse' : ''}`}>
        
        {/* THUMBNAIL PANEL */}
        <div className={`relative aspect-16/10 w-full overflow-hidden rounded-xl bg-slate-950 border border-slate-800/60 lg:col-span-6 ${isEven ? 'lg:order-2' : 'lg:order-1'}`}>
          {project.mainImage ? (
            <img
              src={project.mainImage}
              alt={project.title}
              className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center text-slate-600">No Image</div>
          )}

          {/* Bottom Status Ticker Overlay */}
          <div className="absolute inset-x-3 bottom-3 flex flex-wrap items-center gap-3 rounded-lg border border-slate-800/80 bg-slate-950/80 p-2.5 text-xs text-slate-300 backdrop-blur-md">
            <div className="flex items-center gap-1.5">
              <span className="size-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>{project.status || "Completed"}</span>
            </div>
            {project.dateLabel && (
              <>
                <span className="text-slate-700">|</span>
                <div className="flex items-center gap-1.5 text-slate-400">
                  <Calendar className="size-3.5 text-slate-500" />
                  <span>{project.dateLabel}</span>
                </div>
              </>
            )}
            {project.projectType && (
              <>
                <span className="text-slate-700">|</span>
                <div className="flex items-center gap-1.5 text-slate-400">
                  <User className="size-3.5 text-slate-500" />
                  <span>{project.projectType}</span>
                </div>
              </>
            )}
          </div>
        </div>

        {/* DETAILS PANEL */}
        <div className={`flex flex-col justify-between space-y-5 lg:col-span-6 ${isEven ? 'lg:order-1' : 'lg:order-2'}`}>
          
          <div className="flex items-center justify-between">
            <span 
              className="text-sm font-bold transition-colors duration-300"
              style={{ color: isHovered ? hexColor : '#c084fc' }}
            >
              {displayIndex}
            </span>
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="flex size-9 items-center justify-center rounded-lg border border-slate-800 bg-slate-900 text-slate-400 transition-all duration-300 hover:text-white"
                style={{
                  borderColor: isHovered ? `${hexColor}50` : "rgba(30, 41, 59, 1)"
                }}
              >
                <ExternalLink className="size-4" />
              </a>
            )}
          </div>

          <div>
            <h3 
              className="font-serif-display text-2xl sm:text-3xl font-semibold text-white transition-colors duration-300"
              style={{ color: isHovered ? hexColor : '#ffffff' }}
            >
              {project.title}
            </h3>
            <p className="mt-2 text-sm text-slate-400 leading-relaxed line-clamp-3">
              {project.summary}
            </p>
          </div>

          {/* Dynamic Tech Tags */}
          {project.technologies && project.technologies.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {project.technologies.map((tech: string) => (
                <span
                  key={tech}
                  className="rounded-lg border px-3 py-1 text-xs font-mono transition-all duration-300"
                  style={{
                    backgroundColor: isHovered ? `${hexColor}15` : "rgba(30, 41, 59, 0.4)",
                    borderColor: isHovered ? `${hexColor}40` : "rgba(30, 41, 59, 0.8)",
                    color: isHovered ? hexColor : "#cbd5e1"
                  }}
                >
                  {tech}
                </span>
              ))}
            </div>
          )}

          {/* Highlights */}
          {project.highlights && project.highlights.length > 0 && (
            <div className="space-y-1.5 pt-1">
              <p 
                className="text-xs font-semibold transition-colors duration-300"
                style={{ color: isHovered ? hexColor : '#c084fc' }}
              >
                {project.highlightsTitle || "What I focused on"}
              </p>
              <ul className="space-y-1">
                {project.highlights.map((item: string, i: number) => (
                  <li key={i} className="flex items-center gap-2 text-xs text-slate-400">
                    <span 
                      className="size-1 rounded-full transition-colors duration-300" 
                      style={{ backgroundColor: isHovered ? hexColor : '#c084fc' }}
                    />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Dynamic CTA Link */}
          <div 
            className="inline-flex items-center gap-2 pt-2 text-xs font-semibold transition-colors duration-300"
            style={{ color: isHovered ? hexColor : '#c084fc' }}
          >
            <span>{project.ctaText || "Explore Project"}</span>
            <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-1" />
          </div>

        </div>

      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Minor Project Card Component
// ---------------------------------------------------------------------------
function MinorCard({ project, onClick }: { project: any; onClick: () => void }) {
  const [isHovered, setIsHovered] = useState(false);
  const hexColor = project.color || '#A855F7';

  const renderIcon = (iconKey?: string) => {
    switch (iconKey) {
      case "dollar": return <DollarSign className="size-5 text-emerald-400" />;
      case "gamepad": return <Gamepad2 className="size-5 text-purple-400" />;
      case "puzzle": return <Puzzle className="size-5 text-amber-400" />;
      case "brain": return <Brain className="size-5 text-sky-400" />;
      default: return <Rocket className="size-5 text-purple-400" />;
    }
  };

  return (
    <div
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group relative flex flex-col justify-between cursor-pointer rounded-xl border bg-slate-900/40 p-5 backdrop-blur-sm transition-all duration-300"
      style={{
        borderColor: isHovered ? `${hexColor}50` : "rgba(30, 41, 59, 0.8)",
        backgroundColor: isHovered ? `${hexColor}08` : "rgba(15, 23, 42, 0.4)",
        boxShadow: isHovered ? `0 8px 25px -5px ${hexColor}25` : "none",
      }}
    >
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex size-10 items-center justify-center rounded-lg border border-slate-800 bg-slate-900">
            {renderIcon(project.icon)}
          </div>
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="text-slate-500 hover:text-slate-300"
            >
              <ExternalLink className="size-4" />
            </a>
          )}
        </div>

        <div>
          <h4 
            className="text-base font-semibold text-white transition-colors duration-300"
            style={{ color: isHovered ? hexColor : '#ffffff' }}
          >
            {project.title}
          </h4>
          <p className="mt-1 text-xs text-slate-400 line-clamp-2">
            {project.summary}
          </p>
        </div>
      </div>

      <div className="mt-4 flex flex-wrap items-center gap-2 pt-3 border-t border-slate-800/60 text-[11px] font-mono text-slate-500">
        {project.technologies?.slice(0, 3).join(" • ")}
      </div>
    </div>
  );
}