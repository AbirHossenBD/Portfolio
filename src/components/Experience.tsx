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
      className="section-pad"
      aria-labelledby="experience-heading"
    >
      <div className="section-shell">
        <div className="mb-10 max-w-2xl space-y-3">
          <p className="text-sm font-medium tracking-[0.16em] text-accent uppercase">
            Experience
          </p>
          <h2
            id="experience-heading"
            className="font-display text-3xl font-semibold tracking-tight text-foreground sm:text-4xl"
          >
            Timeline
          </h2>
        </div>

        <ol className="relative space-y-8 border-l border-border pl-6 sm:pl-8">
          {experiences.map((item) => (
            <li key={item.role} className="relative">
              <span
                aria-hidden
                className="absolute top-1.5 -left-[1.91rem] size-3 rounded-full border-2 border-accent bg-background sm:-left-[2.41rem]"
              />
              <div className="rounded-2xl border border-border bg-surface p-6">
                <div className="flex flex-col gap-2 sm:flex-row sm:items-baseline sm:justify-between">
                  <h3 className="font-display text-xl font-semibold text-foreground">
                    {item.role}
                  </h3>
                  <p className="text-sm font-medium text-accent-secondary">
                    {item.period}
                  </p>
                </div>
                <p className="mt-3 text-sm leading-relaxed text-muted sm:text-base">
                  {item.summary}
                </p>
                <ul className="mt-4 space-y-2">
                  {item.highlights.map((highlight) => (
                    <li
                      key={highlight}
                      className="flex gap-2 text-sm text-muted"
                    >
                      <span className="mt-2 size-1.5 shrink-0 rounded-full bg-accent" />
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
