import { HeroSection, SkillsSection, ProjectsSection, ExperienceSection, ContactSection } from "@/sections";
import FeaturesSection from "@/sections/FeaturesSection";
import BrandStrip from "@/components/BrandStrip";
import BrandStripReverse from "@/components/BrandStripReverse";

export default function Home() {
  return (
    <>
      <HeroSection />
      <BrandStrip />
      <BrandStripReverse />
      <FeaturesSection />
      <SkillsSection />
      <ProjectsSection />
      <ExperienceSection />
      <ContactSection />
    </>
  );
}
