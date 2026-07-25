import type { ReactNode } from "react";
import { SiteShell } from "@/components/layout/site-shell";

// This layout only applies to routes inside the (site) group — i.e. the
// actual portfolio pages. It's what adds the header/nav/footer chrome.
// /studio sits OUTSIDE this group (a sibling of the group folder), so
// Sanity Studio renders full-page without being squeezed inside <main>,
// which is what was breaking Studio's internal scrolling.
export default function SiteLayout({ children }: { children: ReactNode }) {
  return <SiteShell>{children}</SiteShell>;
}