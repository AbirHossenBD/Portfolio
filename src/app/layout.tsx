import type { Metadata } from "next";
import Script from "next/script";
import { DM_Sans, JetBrains_Mono, Syne, Playfair_Display } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import { RootWrapper } from "@/components/root-wrapper";
import { GlobalParticles } from "@/components/GlobalParticles";
import "./globals.css";

const syne = Syne({
  variable: "--font-syne",
  subsets: ["latin"],
  display: "swap",
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  display: "swap",
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Abir Hossen | Software Engineering Student",
  description:
    "Portfolio of Abir Hossen — Software Engineering student, front-end developer, and creative technologist.",
};

const themeInitScript = `
(() => {
  try {
    const stored = localStorage.getItem("portfolio-theme");
    const theme = stored === "light" || stored === "dark" ? stored : "dark";
    const root = document.documentElement;
    root.classList.toggle("dark", theme === "dark");
    root.style.colorScheme = theme;
  } catch {}
})();
`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${syne.variable} ${dmSans.variable} ${jetbrainsMono.variable} ${playfair.variable} dark h-full`}
      suppressHydrationWarning
    >
      <body className="relative min-h-full bg-background text-foreground">
        <Script
          id="theme-init"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{ __html: themeInitScript }}
        />
        <GlobalParticles />
        <ThemeProvider>
          <RootWrapper>{children}</RootWrapper>
        </ThemeProvider>
      </body>
    </html>
  );
}