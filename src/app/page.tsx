import {
  HeroSection,
  AboutSection,
  SkillsSection,
  ProjectsSection,
  ContactSection,
  TechStackSection,
  AIShowcaseSection,
} from "@/sections";
import FeaturesSection from "@/sections/FeaturesSection";
import BrandStrip from "@/components/BrandStrip";
import BrandStripReverse from "@/components/BrandStripReverse";

export default function Home() {
  return (
    <>
      <HeroSection />
      <AboutSection />
      <AIShowcaseSection />
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
