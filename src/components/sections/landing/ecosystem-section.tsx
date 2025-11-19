import { SectionHeading } from "@/components/ui/section-heading";

const ecosystemPillars = [
  {
    title: "Dedicated Account Management",
    description: "Our team handles logistics and reviewer onboarding so you don't have to.",
  },
  {
    title: "Creator Intelligence",
    description: "100K+ reviewers pre-vetted with purchase proof & sentiment scoring.",
  },
  {
    title: "Unified Analytics",
    description: "Cross-marketplace insights, CRM, and alerting stitched into one screen.",
  },
  {
    title: "Compliance Guardrails",
    description: "Marketplace policies embedded directly into reviewer instructions.",
  },
];

export function EcosystemSection() {
  return (
    <section className="relative min-h-[600px] bg-cover bg-center bg-no-repeat py-20 flex items-center overflow-hidden" style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2070&auto=format&fit=crop)' }} id="ecosystem">
      {/* Dark overlay for text readability */}
      <div className="absolute inset-0 bg-black/60 pointer-events-none" />
      
      <div className="container-responsive space-y-10 relative z-10">
        <SectionHeading
          eyebrow="Influencer Agency Synergy"
          title="Shared teams, CRM, and analytics accelerate ORM launches"
          description="Our ORM arm starts with zero cold start thanks to influencer marketing demand, creator sourcing, and shared support systems."
          align="center"
          theme="light"
        />
        <div className="grid gap-6 md:grid-cols-2">
          {ecosystemPillars.map((pillar) => (
            <div
              key={pillar.title}
              className="rounded-3xl border border-slate-100 bg-white p-6 shadow-xl shadow-slate-200/60 hover:shadow-2xl"
            >
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">
                {pillar.title}
              </p>
              <p className="mt-3 text-base text-slate-600">{pillar.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

