import { GraduationCap } from "lucide-react";

export default function Education() {
  return (
    <section
      id="education"
      className="section-pad"
      aria-labelledby="education-heading"
    >
      <div className="section-shell">
        <div className="mb-8 max-w-2xl space-y-3">
          <p className="text-sm font-medium tracking-[0.16em] text-accent uppercase">
            Education
          </p>
          <h2
            id="education-heading"
            className="font-display text-3xl font-semibold tracking-tight text-foreground sm:text-4xl"
          >
            Academic path
          </h2>
        </div>

        <article className="max-w-2xl rounded-2xl border border-border bg-surface p-6 sm:p-8">
          <div className="flex items-start gap-4">
            <span className="inline-flex size-11 shrink-0 items-center justify-center rounded-xl border border-border bg-surface-elevated text-accent">
              <GraduationCap className="size-5" />
            </span>
            <div className="space-y-2">
              <h3 className="font-display text-xl font-semibold text-foreground">
                BSc in Software Engineering
              </h3>
              <p className="text-sm font-medium text-accent">
                Daffodil International University
              </p>
              <p className="text-sm text-muted">2026 – Present</p>
            </div>
          </div>
        </article>
      </div>
    </section>
  );
}
