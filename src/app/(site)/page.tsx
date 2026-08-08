import Contact from "@/components/Contact";
import Experience from "@/components/Experience";
import Hero from "@/components/Hero";
import Projects from "@/components/Projects";
import Skills from "@/components/Skills";
import { getHeroData } from "@/sanity/lib/queries";
import { urlFor } from "@/sanity/lib/image";

export default async function Home() {
  const hero = await getHeroData();
  const heroImageUrl = hero?.portrait
    ? urlFor(hero.portrait).width(640).height(800).fit("crop").url()
    : undefined;

  return (
    <>
      <Hero heroImageUrl={heroImageUrl} heroImageAlt={hero?.portraitAlt ?? undefined} />
      <Skills />
      <Projects />
      <Experience />
      <Education />
      <Contact />
    </>
  );
}
