const links = [
  {
    label: "Email",
    href: "mailto:abir.hossen@example.com",
    detail: "abir.hossen@example.com",
  },
  {
    label: "LinkedIn",
    href: "https://linkedin.com/in/",
    detail: "linkedin.com/in/",
  },
  {
    label: "GitHub",
    href: "https://github.com/",
    detail: "github.com/",
  },
  {
    label: "Facebook",
    href: "https://facebook.com/",
    detail: "facebook.com/",
  },
] as const;

export default function Contact() {
  return (
    <section
      id="contact"
      className="section-pad"
      aria-labelledby="contact-heading"
    >
      <div className="section-shell">
        <div className="mb-10 max-w-2xl space-y-3">
          <p className="text-sm font-medium tracking-[0.16em] text-accent uppercase">
            Contact
          </p>
          <h2
            id="contact-heading"
            className="font-display text-3xl font-semibold tracking-tight text-foreground sm:text-4xl"
          >
            Let&apos;s connect
          </h2>
          <p className="text-base text-muted sm:text-lg">
            Open to collaborations, freelance creative work, and front-end
            opportunities.
          </p>
        </div>

        <ul className="grid gap-3 sm:grid-cols-2">
          {links.map((link) => (
            <li key={link.label}>
              <a
                href={link.href}
                target={link.href.startsWith("http") ? "_blank" : undefined}
                rel={
                  link.href.startsWith("http")
                    ? "noopener noreferrer"
                    : undefined
                }
                className="flex items-center justify-between gap-4 rounded-2xl border border-border bg-surface px-5 py-4 transition hover:border-accent/40 hover:bg-surface-elevated focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                <span>
                  <span className="block text-sm font-semibold text-foreground">
                    {link.label}
                  </span>
                  <span className="mt-1 block text-sm text-muted">
                    {link.detail}
                  </span>
                </span>
                <span className="text-accent" aria-hidden>
                  →
                </span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
