'use client';

import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import { SubtleWobble } from "./SubtleWobble";
import ProjectModal from "./ProjectModal";
import { FiExternalLink } from "react-icons/fi";

const projects = [
  {
    id: 1,
    title: "E-Commerce Platform",
    description: "A full-stack modern e-commerce solution with user authentication, Stripe payments, and a real-time admin dashboard.",
    techStack: ["Next.js", "TypeScript", "Tailwind", "Stripe"],
    githubUrl: "#",
    liveUrl: "#",
    color: "from-blue-500/20 to-purple-500/20",
    sections: [
      {
        text: "This project was built to solve the complexities of modern digital storefronts. It features a complete custom cart implementation, secure user authentication via NextAuth, and seamless checkout flows powered by Stripe.",
        image: "https://images.unsplash.com/photo-1557821552-17105176677c?q=80&w=1000&auto=format&fit=crop"
      },
      {
        text: "The admin dashboard allows store owners to track inventory in real-time, view sales metrics with interactive charts, and manage customer orders effortlessly.",
        image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1000&auto=format&fit=crop"
      },
      {
        text: "Fully responsive design ensures a seamless shopping experience across all devices, from mobile phones to ultra-wide desktop monitors.",
        image: "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?q=80&w=1000&auto=format&fit=crop"
      }
    ]
  },
  {
    id: 2,
    title: "AI Content Generator",
    description: "An AI-powered tool that helps creators generate blog posts, social media captions, and video scripts in seconds.",
    techStack: ["React", "Python", "OpenAI API", "Framer Motion"],
    githubUrl: "#",
    liveUrl: "#",
    color: "from-emerald-500/20 to-teal-500/20",
    sections: [
      {
        text: "Leveraging the power of Large Language Models, this application provides a streamlined interface for content creators facing writer's block.",
        image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=1000&auto=format&fit=crop"
      },
      {
        text: "Users can select various tones, formats, and target audiences to generate highly specific text tailored to their exact branding needs.",
        image: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=1000&auto=format&fit=crop"
      }
    ]
  },
];

export default function Projects() {
  const [selectedProject, setSelectedProject] = useState<typeof projects[0] | null>(null);

  return (
    <section id="projects" className="py-16 lg:py-24" aria-labelledby="projects-heading">
      {/* Aligned shell to max-w-[1500px] matching Hero, Experience, and Skills */}
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

        {/* Responsive Grid matching main container width */}
        <div className="grid gap-8 lg:grid-cols-2">
          {projects.map((project) => (
            <div 
              key={project.id} 
              onClick={() => setSelectedProject(project)}
              className="cursor-pointer"
            >
              <SubtleWobble>
                <div className="group flex h-full flex-col overflow-hidden rounded-2xl border border-slate-800/80 bg-slate-900/40 backdrop-blur-sm transition-all duration-300 hover:border-purple-500/40 hover:bg-slate-800/50">
                  <div className="relative h-64 sm:h-72 w-full overflow-hidden bg-slate-950">
                    <div className={`absolute inset-0 bg-linear-to-br opacity-50 z-10 ${project.color}`} />
                    <img 
                      src={project.sections[0].image} 
                      alt={project.title}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  
                  <div className="flex flex-1 flex-col p-6 sm:p-8">
                    <h3 className="text-2xl font-semibold text-white mb-3 group-hover:text-purple-300 transition-colors">
                      {project.title}
                    </h3>
                    <p className="mb-6 text-sm sm:text-base leading-relaxed text-slate-400">
                      {project.description}
                    </p>

                    <div className="mb-8 flex flex-wrap gap-2">
                      {project.techStack.map((tech) => (
                        <span 
                          key={tech} 
                          className="rounded-lg bg-slate-800/50 px-3 py-1 text-xs font-mono text-slate-300 border border-slate-800"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    <div className="mt-auto flex items-center gap-2 pt-4 border-t border-slate-800/80 text-sm font-medium text-purple-400 group-hover:text-purple-300 transition-colors">
                      <span>View Project Details</span>
                      <FiExternalLink className="text-base transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </div>
                  </div>
                </div>
              </SubtleWobble>
            </div>
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