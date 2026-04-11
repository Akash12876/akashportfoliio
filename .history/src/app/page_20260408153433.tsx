import { HeroSection, SkillsSection, ProjectsSection, ExperienceSection, ContactSection } from "@/sections";
import BrandStrip from "@/components/BrandStrip";

export default function Home() {
  return (
    <>
      <HeroSection />
      <BrandStrip />
      <SkillsSection />
      <ProjectsSection />
      <ExperienceSection />
      <ContactSection />
    </>
  );
}
