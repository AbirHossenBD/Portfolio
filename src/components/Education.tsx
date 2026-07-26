import { GraduationCap } from "lucide-react";

export default function Education() {
  return (
    <section
      id="education"
      className="py-16 lg:py-24"
      aria-labelledby="education-heading"
    >
      <div className="mx-auto w-full max-w-375 px-6 sm:px-12 lg:px-16 xl:px-20">
        <div className="mb-8 max-w-2xl space-y-3">
          <p className="text-xs font-semibold tracking-[0.2em] text-purple-400 uppercase">
            Education
          </p>
          <h2
            id="education-heading"
            className="font-serif-display text-4xl sm:text-5xl font-normal tracking-tight text-white"
          >
            Academic path
          </h2>
        </div>

        <article className="max-w-4xl rounded-2xl border border-slate-800/80 bg-slate-900/40 p-6 sm:p-8 backdrop-blur-sm">
          <div className="flex items-start gap-4 sm:gap-6">
            <span className="inline-flex size-12 shrink-0 items-center justify-center rounded-xl border border-slate-800 bg-slate-800/50 text-purple-400">
              <GraduationCap className="size-6" />
            </span>
            <div className="space-y-1.5">
              <h3 className="text-xl font-semibold text-slate-100">
                BSc in Software Engineering
              </h3>
              <p className="text-sm font-medium text-indigo-400">
                Daffodil International University
              </p>
              <p className="text-sm text-slate-400">2026 – Present</p>
            </div>
          </div>
        </article>
      </div>
    </section>
  );
}