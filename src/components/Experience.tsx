const experiences = [
  {
    role: "Freelance Creative Designer",
    period: "2022 — Present",
    summary:
      "Designing and delivering visual systems for brands — from social campaigns and motion ads to polished creative assets that support product launches and storytelling.",
    highlights: [
      "Campaign creatives and short-form video ads",
      "Brand-aligned visual direction for clients",
      "End-to-end delivery from brief to publish",
    ],
  },
] as const;

export default function Experience() {
  return (
    <section
      id="experience"
      className="py-16 lg:py-24"
      aria-labelledby="experience-heading"
    >
      <div className="mx-auto w-full max-w-375 px-6 sm:px-12 lg:px-16 xl:px-20">
        <div className="mb-10 max-w-2xl space-y-3">
          <p className="text-xs font-semibold tracking-[0.2em] text-purple-400 uppercase">
            Experience
          </p>
          <h2
            id="experience-heading"
            className="font-serif-display text-4xl sm:text-5xl font-normal tracking-tight text-white"
          >
            Timeline
          </h2>
        </div>

        <ol className="relative max-w-4xl space-y-8 border-l border-slate-800 pl-6 sm:pl-8 ml-2 sm:ml-4">
          {experiences.map((item) => (
            <li key={item.role} className="relative">
              <span
                aria-hidden
                className="absolute top-2 left-[-1.91rem] size-3 rounded-full border-2 border-indigo-500 bg-[#05060A] sm:left-[-2.41rem]"
              />
              <div className="rounded-2xl border border-slate-800/80 bg-slate-900/40 p-6 sm:p-8 backdrop-blur-sm">
                <div className="flex flex-col gap-2 sm:flex-row sm:items-baseline sm:justify-between">
                  <h3 className="text-xl font-semibold text-slate-100">
                    {item.role}
                  </h3>
                  <p className="text-sm font-medium text-purple-400">
                    {item.period}
                  </p>
                </div>
                <p className="mt-3 text-sm sm:text-base leading-relaxed text-slate-400">
                  {item.summary}
                </p>
                <ul className="mt-4 space-y-2">
                  {item.highlights.map((highlight) => (
                    <li
                      key={highlight}
                      className="flex items-center gap-2.5 text-sm text-slate-400"
                    >
                      <span className="size-1.5 shrink-0 rounded-full bg-indigo-500" />
                      {highlight}
                    </li>
                  ))}
                </ul>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}