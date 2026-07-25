export default function About() {
  return (
    <section id="about" className="section-pad" aria-labelledby="about-heading">
      <div className="section-shell">
        <div className="mb-8 max-w-2xl space-y-3">
          <p className="text-sm font-medium tracking-[0.16em] text-accent uppercase">
            About
          </p>
          <h2
            id="about-heading"
            className="font-display text-3xl font-semibold tracking-tight text-foreground sm:text-4xl"
          >
            Building with code and creativity
          </h2>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <p className="text-base leading-relaxed text-muted sm:text-lg">
            I am a Software Engineering student at Daffodil International
            University (DIU), focused on turning ideas into reliable, user-first
            digital products. Problem-solving sits at the center of how I work —
            breaking complex challenges into clear systems, then shipping
            interfaces that feel intuitive and intentional.
          </p>
          <p className="text-base leading-relaxed text-muted sm:text-lg">
            My toolkit spans web development, Python, and emerging AI workflows,
            paired with a background in creative technology. That mix lets me
            move between engineering rigor and visual storytelling — building
            experiences that are both technically sound and creatively
            expressive.
          </p>
        </div>
      </div>
    </section>
  );
}
