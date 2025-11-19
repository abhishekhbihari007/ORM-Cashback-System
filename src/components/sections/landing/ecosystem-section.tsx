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
    <section className="bg-gradient-to-b from-orange-50 to-white py-20" id="ecosystem">
      <div className="container-responsive space-y-10">
        <SectionHeading
          eyebrow="Influencer Agency Synergy"
          title="Shared teams, CRM, and analytics accelerate ORM launches"
          description="Our ORM arm starts with zero cold start thanks to influencer marketing demand, creator sourcing, and shared support systems."
          align="center"
        />
        <div className="grid gap-6 md:grid-cols-2">
          {ecosystemPillars.map((pillar) => (
            <div
              key={pillar.title}
              className="rounded-3xl border border-orange-100 bg-white/80 p-6 shadow-sm shadow-orange-100 hover:border-orange-300 hover:bg-orange-50 hover:shadow-lg"
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

