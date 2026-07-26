import Contact from "@/components/Contact";
import Education from "@/components/Education";
import Experience from "@/components/Experience";
import Hero from "@/components/Hero";
import { Navbar } from "@/components/Navbar";
import Projects from "@/components/Projects";
import Skills from "@/components/Skills";
import { getHeroData } from "@/sanity/lib/queries";
import { urlFor } from "@/sanity/lib/image";

export default async function Home() {
  const hero = await getHeroData();

  const heroImageUrl = hero?.portrait
    ? urlFor(hero.portrait).width(640).height(800).fit("crop").url()
    : undefined;

  const logoImageUrl = hero?.logoImage
    ? urlFor(hero.logoImage).width(128).height(128).fit("max").url()
    : undefined;

  return (
    <>
      <Navbar logoText={hero?.logoText ?? "AH"} logoImageUrl={logoImageUrl} />
      <Hero
        topTagline={hero?.topTagline ?? "HI, I'M"}
        subheadingText={hero?.subheadingText ?? "I'm building my future through software."}
        highlightedWord={hero?.highlightedWord ?? "future"}
        description={
          hero?.description ??
          "The digital world feels like home to me. I enjoy creating things people can experience."
        }
        statusItems={hero?.statusItems}
        primaryCtaText={hero?.primaryCtaText ?? "Explore My Work"}
        primaryCtaLink={hero?.primaryCtaLink ?? "#projects"}
        secondaryCtaText={hero?.secondaryCtaText ?? "Download Resume"}
        secondaryCtaLink={hero?.secondaryCtaLink ?? "/resume.pdf"}
        watermarkCode={hero?.watermarkCode}
        glowColor={hero?.glowColor ?? "rgba(147, 51, 234, 0.12)"}
        heroImageUrl={heroImageUrl}
        heroImageAlt={hero?.portraitAlt ?? undefined}
      />
      <Skills />
      <Projects />
      <Experience />
      <Education />
      <Contact />
    </>
  );
}