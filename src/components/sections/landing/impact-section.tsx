import { SectionHeading } from "@/components/ui/section-heading";
import { StatCard } from "@/components/ui/stat-card";

const impactStats = [
  {
    label: "SKU Coverage",
    value: "140+",
    helper: "Active marketplace listings",
    trend: { value: "+22 this month", isPositive: true },
  },
  {
    label: "Review Velocity",
    value: "4.2x",
    helper: "Faster than organic benchmark",
    trend: { value: "+0.4x WoW", isPositive: true },
  },
  {
    label: "Storefront Reputation",
    value: "4.7★",
    helper: "Weighted across marketplaces",
  },
];

const verticals = [
  { title: "Beauty & Personal Care", detail: "Nykaa, Amazon Beauty, Sephora SEA" },
  { title: "Fashion & Athleisure", detail: "Myntra, Ajio, international storefronts" },
  { title: "Electronics & Appliances", detail: "Amazon, Flipkart, Noon" },
  { title: "Home & Lifestyle", detail: "Meesho, Pepperfry, Amazon Global" },
];

export function ImpactSection() {
  return (
    <section className="relative min-h-[600px] bg-cover bg-center bg-no-repeat py-20 flex items-center overflow-hidden" style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1605810230434-7631ac76ec81?q=80&w=2070&auto=format&fit=crop)' }} id="impact">
      {/* Dark overlay for text readability */}
      <div className="absolute inset-0 bg-black/60 pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-6 space-y-12 relative z-10 w-full">
        <SectionHeading
          eyebrow="Impacting the transformation of digitisation"
          title="Unified reputation playbooks across every marketplace"
          description="Command storefront visibility with verified reviews, sentiment alerts, and SKU-level heatmaps powered by cashback shoppers."
          theme="light"
        />

        <div className="grid gap-6 md:grid-cols-3">
          {impactStats.map((stat) => (
            <div key={stat.label} className="backdrop-blur-sm">
              <StatCard {...stat} />
            </div>
          ))}
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {verticals.map((vertical) => (
            <div key={vertical.title} className="space-y-2 rounded-3xl bg-white/95 backdrop-blur-sm border border-slate-200 shadow-lg p-6">
              <p className="text-lg font-semibold text-slate-900">{vertical.title}</p>
              <p className="text-sm text-slate-600">{vertical.detail}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

