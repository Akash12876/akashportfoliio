import { HeroSection, SkillsSection, ProjectsSection, ContactSection, TechStackSection } from "@/sections";
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
      <TechStackSection />
      <SkillsSection />
      <ProjectsSection />
      <ContactSection />
    </>
  );
}
