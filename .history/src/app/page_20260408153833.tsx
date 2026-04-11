import { HeroSection, SkillsSection, ProjectsSection, ExperienceSection, ContactSection } from "@/sections";
import BrandStrip from "@/components/BrandStrip";
import BrandStripReverse from "@/components/BrandStripReverse";

export default function Home() {
  return (
    <>
      <HeroSection />
      <BrandStrip />
      <BrandStripReverse />
      <SkillsSection />
      <ProjectsSection />
      <ExperienceSection />
      <ContactSection />
    </>
  );
}
