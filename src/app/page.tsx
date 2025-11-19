import { HeroSection } from "@/components/sections/landing/hero-section";
import { ImpactSection } from "@/components/sections/landing/impact-section";
import { PartnersSection } from "@/components/sections/landing/partners-section";
import { WorkflowSection } from "@/components/sections/landing/workflow-section";
import { EcosystemSection } from "@/components/sections/landing/ecosystem-section";
import { NumbersSection } from "@/components/sections/landing/numbers-section";
import { CtaSection } from "@/components/sections/landing/cta-section";

export default function Home() {
  return (
    <div className="page-wrapper bg-slate-950">
      <HeroSection />
      <PartnersSection />
      <ImpactSection />
      <WorkflowSection />
      <EcosystemSection />
      <NumbersSection />
      <CtaSection />
    </div>
  );
}
