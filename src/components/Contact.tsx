import { ArrowUpRight } from "lucide-react";

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
      className="py-16 lg:py-24"
      aria-labelledby="contact-heading"
    >
      <div className="mx-auto w-full max-w-6xl px-6 sm:px-12 lg:px-16 xl:px-20">
        <div className="mb-10 max-w-2xl space-y-3">
          <p className="text-xs font-semibold tracking-[0.2em] text-purple-400 uppercase">
            Contact
          </p>
          <h2
            id="contact-heading"
            className="font-serif-display text-4xl sm:text-5xl font-normal tracking-tight text-white"
          >
            Let&apos;s connect
          </h2>
          <p className="text-base text-slate-400 sm:text-lg">
            Open to collaborations, freelance creative work, and front-end
            opportunities.
          </p>
        </div>

        <ul className="grid gap-4 max-w-4xl sm:grid-cols-2">
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
                className="group flex items-center justify-between gap-4 rounded-2xl border border-slate-800/80 bg-slate-900/40 p-5 transition-all hover:border-purple-500/40 hover:bg-slate-800/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500"
              >
                <div>
                  <span className="block text-base font-semibold text-slate-200 group-hover:text-purple-300 transition-colors">
                    {link.label}
                  </span>
                  <span className="mt-1 block text-sm text-slate-400">
                    {link.detail}
                  </span>
                </div>
                <ArrowUpRight className="size-5 text-slate-500 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-purple-400" />
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}