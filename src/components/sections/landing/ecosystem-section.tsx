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
    <section className="relative bg-gradient-to-b from-yellow-100/70 via-yellow-50/50 to-yellow-100/60 py-20 overflow-hidden" id="ecosystem">
      {/* Background Image - Organic Leaf Pattern */}
      <div 
        className="absolute bottom-0 right-0 w-full h-full opacity-25 pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(ellipse 70% 90% at 85% 85%, rgba(34, 197, 94, 0.7) 0%, rgba(74, 222, 128, 0.6) 25%, rgba(163, 230, 53, 0.5) 45%, rgba(250, 204, 21, 0.4) 60%, transparent 75%)',
          backgroundSize: '90% 90%',
          backgroundPosition: 'bottom right',
          backgroundRepeat: 'no-repeat',
          filter: 'blur(90px)',
          transform: 'rotate(-20deg)'
        }}
      />
      
      {/* Abstract Organic Leaf/Shape - Bottom Right */}
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] translate-x-1/4 translate-y-1/4 pointer-events-none opacity-20">
        <div className="absolute inset-0" style={{
          background: 'radial-gradient(ellipse 80% 100% at 60% 80%, rgba(34, 197, 94, 0.4) 0%, transparent 70%)',
          filter: 'blur(60px)',
          transform: 'rotate(-45deg)'
        }} />
        <div className="absolute inset-0" style={{
          background: 'radial-gradient(ellipse 60% 80% at 40% 60%, rgba(74, 222, 128, 0.3) 0%, transparent 60%)',
          filter: 'blur(50px)',
          transform: 'rotate(30deg)'
        }} />
      </div>
      
      <div className="container-responsive space-y-10 relative z-10">
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

