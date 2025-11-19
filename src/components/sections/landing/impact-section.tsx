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
    <section className="bg-orange-50 py-20" id="impact">
      <div className="container-responsive space-y-12">
        <SectionHeading
          eyebrow="Impacting the transformation of digitisation"
          title="Unified reputation playbooks across every marketplace"
          description="Command storefront visibility with verified reviews, sentiment alerts, and SKU-level heatmaps powered by cashback shoppers."
        />

        <div className="grid gap-6 md:grid-cols-3">
          {impactStats.map((stat) => (
            <StatCard key={stat.label} {...stat} />
          ))}
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {verticals.map((vertical) => (
            <div key={vertical.title} className="glass-panel space-y-2 rounded-3xl">
              <p className="text-lg font-semibold text-slate-900">{vertical.title}</p>
              <p className="text-sm text-slate-500">{vertical.detail}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

