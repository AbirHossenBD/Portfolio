'use client';

import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import { SubtleWobble } from "./SubtleWobble";
import ProjectModal from "./ProjectModal";
import { FiExternalLink } from "react-icons/fi";

export default function ProjectsClient({ projects }: { projects: any[] }) {
  const [selectedProject, setSelectedProject] = useState<any | null>(null);

  return (
    <section id="projects" className="py-16 lg:py-24" aria-labelledby="projects-heading">
      <div className="mx-auto w-full max-w-375 px-6 sm:px-12 lg:px-16 xl:px-20">
        
        {/* Section Header */}
        <div className="mb-12 max-w-2xl space-y-3">
          <p className="text-xs font-semibold tracking-[0.2em] text-purple-400 uppercase">
            Projects
          </p>
          <h2 id="projects-heading" className="font-serif-display text-4xl sm:text-5xl font-normal tracking-tight text-white">
            Featured Work
          </h2>
          <p className="text-base text-slate-400">
            A selection of my recent builds. Exploring complex problems and turning them into simple, elegant digital experiences.
          </p>
        </div>

        {/* Responsive Grid */}
        <div className="grid gap-8 lg:grid-cols-2">
          {projects.map((project) => (
            <ProjectCard 
              key={project._id} 
              project={project} 
              onClick={() => setSelectedProject(project)} 
            />
          ))}
        </div>
      </div>
      
      <AnimatePresence>
        {selectedProject && (
          <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
        )}
      </AnimatePresence>
    </section>
  );
}

// Sub-component to manage the dynamic hover colors natively
function ProjectCard({ project, onClick }: { project: any; onClick: () => void }) {
  const [isHovered, setIsHovered] = useState(false);
  
  // Fallback to a neutral purple if no color is provided
  const hexColor = project.color || '#A855F7';

  return (
    <div 
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="cursor-pointer h-full"
    >
      <SubtleWobble>
        <div 
          className="group flex h-full flex-col overflow-hidden rounded-2xl border backdrop-blur-sm transition-all duration-500"
          style={{
            borderColor: isHovered ? `${hexColor}50` : "rgba(30, 41, 59, 0.8)", // slate-800/80
            backgroundColor: isHovered ? `${hexColor}10` : "rgba(15, 23, 42, 0.4)", // slate-900/40
            boxShadow: isHovered ? `0 10px 40px -10px ${hexColor}40` : "none",
          }}
        >
          
          {/* Thumbnail Image */}
          <div className="relative h-64 sm:h-72 w-full overflow-hidden bg-slate-950">
            {/* Dynamic Overlay Gradient */}
            <div 
              className="absolute inset-0 z-10 opacity-50 transition-opacity duration-500" 
              style={{
                background: `linear-gradient(to bottom right, ${hexColor}50, transparent)`
              }}
            />
            {project.mainImage ? (
              <img 
                src={project.mainImage} 
                alt={project.title}
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
            ) : (
              <div className="h-full w-full bg-slate-800 flex items-center justify-center text-slate-500">No Image</div>
            )}
          </div>
          
          <div className="flex flex-1 flex-col p-6 sm:p-8">
            <h3 
              className="text-2xl font-semibold mb-3 transition-colors duration-300"
              style={{ color: isHovered ? hexColor : '#f8fafc' }} // slate-50
            >
              {project.title}
            </h3>
            
            <p className="mb-6 text-sm sm:text-base leading-relaxed text-slate-400">
              {project.summary}
            </p>
            
            {/* Dynamic Tags */}
            <div className="mb-8 flex flex-wrap gap-2">
              {project.technologies?.map((tech: string) => (
                <span 
                  key={tech} 
                  className="rounded-lg px-3 py-1 text-xs font-mono border transition-all duration-300"
                  style={{
                    backgroundColor: isHovered ? `${hexColor}15` : "rgba(30, 41, 59, 0.5)", // slate-800/50
                    borderColor: isHovered ? `${hexColor}40` : "rgba(30, 41, 59, 1)", // slate-800
                    color: isHovered ? hexColor : "#cbd5e1" // slate-300
                  }}
                >
                  {tech}
                </span>
              ))}
            </div>
            
            {/* Call to action footer */}
            <div 
              className="mt-auto flex items-center gap-2 pt-4 border-t border-slate-800/80 text-sm font-medium transition-colors duration-300"
              style={{ color: isHovered ? hexColor : '#94a3b8' }} // slate-400
            >
              <span>View Project Details</span>
              <FiExternalLink className="text-base transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </div>
          </div>
        </div>
      </SubtleWobble>
    </div>
  );
}