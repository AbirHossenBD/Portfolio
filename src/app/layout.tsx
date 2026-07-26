import type { Metadata } from "next";
import { DM_Sans, JetBrains_Mono, Syne } from "next/font/google";
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
      className={`${syne.variable} ${dmSans.variable} ${jetbrainsMono.variable} dark h-full`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body className="relative min-h-full">
        {/* Full-screen interactive particle background */}
        <GlobalParticles />

        <ThemeProvider>
          <RootWrapper>{children}</RootWrapper>
        </ThemeProvider>
      </body>
    </html>
  );
}