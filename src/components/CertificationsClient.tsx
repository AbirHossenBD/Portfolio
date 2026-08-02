'use client';

import { Award, ArrowUpRight } from "lucide-react";

export default function CertificationsClient({ certifications }: { certifications: any[] }) {
  // Hide the entire section if no certificates are published
  if (!certifications || certifications.length === 0) return null;

  return (
    <section id="certifications" className="py-16 lg:py-24" aria-labelledby="certifications-heading">
      <div className="mx-auto w-full max-w-375 px-6 sm:px-12 lg:px-16 xl:px-20">
        
        {/* Header */}
        <div className="mb-10 max-w-2xl space-y-3">
          <p className="text-xs font-semibold tracking-[0.2em] text-purple-400 uppercase">
            Achievements
          </p>
          <h2 id="certifications-heading" className="font-serif-display text-4xl sm:text-5xl font-normal tracking-tight text-white">
            Certifications
          </h2>
        </div>
        
        {/* Grid */}
        <div className="grid gap-4 max-w-4xl sm:grid-cols-2">
          {certifications.map((cert) => {
            // If there's a URL, make the card an anchor tag (<a>). Otherwise, a standard <div>.
            const CardWrapper = cert.credentialUrl ? "a" : "div";
            const wrapperProps = cert.credentialUrl 
              ? { href: cert.credentialUrl, target: "_blank", rel: "noopener noreferrer" } 
              : {};

            // Format the date nicely (e.g., "Aug 2026")
            const formattedDate = cert.issueDate 
              ? new Date(cert.issueDate).toLocaleDateString('en-US', { month: 'short', year: 'numeric' }) 
              : null;

            return (
              <CardWrapper 
                key={cert._id} 
                {...wrapperProps}
                className={`group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-slate-800/80 bg-slate-900/40 p-6 backdrop-blur-sm transition-all duration-300 hover:border-purple-500/40 hover:bg-slate-800/50 ${
                  cert.credentialUrl ? 'cursor-pointer hover:-translate-y-1 hover:shadow-[0_8px_30px_rgba(168,85,247,0.1)]' : ''
                }`}
              >
                {/* Subtle gradient overlay on hover */}
                <div className="absolute inset-0 bg-linear-to-br from-purple-500/0 via-transparent to-purple-500/5 opacity-0 transition-opacity duration-300 group-hover:opacity-100 pointer-events-none" />
                
                <div className="relative flex items-start gap-4">
                  <div className="flex size-12 shrink-0 items-center justify-center rounded-xl border border-slate-700/50 bg-slate-800/80 text-purple-400 shadow-inner group-hover:text-purple-300 transition-colors">
                    <Award className="size-6" />
                  </div>
                  <div className="flex-1 space-y-1 pt-1">
                    <h3 className="text-lg font-semibold text-slate-100 group-hover:text-purple-300 transition-colors line-clamp-2">
                      {cert.title}
                    </h3>
                    {cert.issuer && (
                      <p className="text-sm font-medium text-indigo-400">
                        {cert.issuer}
                      </p>
                    )}
                  </div>
                </div>
                
                {/* Footer with Date and Link Indicator */}
                <div className="relative mt-6 flex items-center justify-between border-t border-slate-800/80 pt-4">
                  <span className="text-sm text-slate-400">
                    {formattedDate || 'Ongoing'}
                  </span>
                  
                  {cert.credentialUrl && (
                    <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-500 transition-colors group-hover:text-purple-400">
                      <span>View Credential</span>
                      <ArrowUpRight className="size-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </div>
                  )}
                </div>
              </CardWrapper>
            );
          })}
        </div>
      </div>
    </section>
  );
}