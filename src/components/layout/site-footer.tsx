import Link from "next/link";
import { Globe, Mail, Share2 } from "lucide-react";

const socialLinks = [
  { href: "mailto:hello@example.com", label: "Email", icon: Mail },
  { href: "https://github.com", label: "GitHub", icon: Globe },
  { href: "https://linkedin.com", label: "LinkedIn", icon: Share2 },
] as const;

export function SiteFooter() {
  return (
    <footer className="mt-auto border-t border-border/70 bg-surface/40">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-4 py-10 sm:px-6 md:flex-row md:items-center md:justify-between lg:px-8">
        <div className="space-y-2">
          <p className="font-display text-base font-semibold text-foreground">
            Portfolio
          </p>
          <p className="max-w-sm text-sm text-muted">
            A dark-mode-first layout template for building a responsive personal
            site.
          </p>
        </div>

        <div className="flex items-center gap-3">
          {socialLinks.map(({ href, label, icon: Icon }) => (
            <Link
              key={label}
              href={href}
              aria-label={label}
              className="inline-flex size-10 items-center justify-center rounded-lg border border-border bg-surface text-muted transition-colors hover:bg-surface-elevated hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              target={href.startsWith("http") ? "_blank" : undefined}
              rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
            >
              <Icon className="size-4" />
            </Link>
          ))}
        </div>
      </div>
    </footer>
  );
}
