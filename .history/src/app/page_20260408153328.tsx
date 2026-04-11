import { HeroSection, SkillsSection, ProjectsSection, ExperienceSection, ContactSection } from "@/sections";

export default function Home() {
  return (
    <>
      <HeroSection />
      {/* BrandStrip will be inserted here */}
      <SkillsSection />
      <ProjectsSection />
      <ExperienceSection />
      <ContactSection />
    </>
  );
}
