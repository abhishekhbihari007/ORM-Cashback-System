import Image from "next/image";
import { StatCard } from "@/components/ui/stat-card";

const heroMetrics = [
  { label: "Verified Reviewers", value: "120K+", helper: "Cashback power users" },
  { label: "Marketplaces", value: "25+", helper: "Amazon, Flipkart, Nykaa & more" },
  { label: "Average Uplift", value: "38%", helper: "Search rank improvement" },
];

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-slate-900 text-white">
      <div className="container-responsive grid gap-10 py-20 md:grid-cols-2 md:items-center">
        <div className="space-y-6">
          <p className="section-title text-indigo-200">✅ ORM APP - Global Marketplace ORM - Cashback Ecosystem</p>
          <h1 className="text-4xl font-black leading-tight text-white md:text-5xl">
            Give away products. Earn verified reviews. Dominate marketplace reputation.
          </h1>
          <p className="text-lg text-slate-200">
            Our ORM arm rides on the cashback ecosystem + influencer marketing agency to deliver
            compliant, high-quality review velocity across Amazon, Flipkart, Meesho, Nykaa, and 20+
            other marketplaces.
          </p>
          <div className="flex flex-wrap gap-3">
            <button className="rounded-full bg-white px-6 py-3 text-slate-900 shadow-lg shadow-slate-900/20">
              Explore Brand Dashboard
            </button>
            <button className="rounded-full border border-white/30 px-6 py-3 text-white">
              View User Journey
            </button>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            {heroMetrics.map((metric) => (
              <StatCard key={metric.label} {...metric} />
            ))}
          </div>
        </div>
        <div className="relative flex justify-center">
          <div className="glass-panel relative z-10 w-full max-w-md rounded-[32px] border border-white/20 bg-white/10 p-6">
            <p className="text-sm uppercase tracking-[0.3em] text-slate-200">Live Monitoring</p>
            <h3 className="mt-3 text-2xl font-semibold text-white">
              Reputation pulse across 120+ SKUs
            </h3>
            <ul className="mt-6 space-y-4">
              {["Real-time review ingestion", "Sentiment AI alerts", "SKU level prioritization"].map(
                (item) => (
                  <li key={item} className="flex items-center gap-3 text-slate-200">
                    <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-white/15 text-lg font-semibold">
                      ✓
                    </span>
                    {item}
                  </li>
                )
              )}
            </ul>
            <div className="mt-6 rounded-2xl bg-white/20 p-4 text-center">
              <p className="text-sm text-white/70">Marketplace policy compliance score</p>
              <p className="text-4xl font-black text-white">98.4%</p>
              <p className="text-xs uppercase tracking-[0.4em] text-white/70">Auto-tracked</p>
            </div>
          </div>
          <Image
            src="https://images.unsplash.com/photo-1529333166437-7750a6dd5a70"
            alt="Global markets"
            width={420}
            height={520}
            className="absolute inset-y-10 -right-12 hidden rounded-[36px] border border-white/20 object-cover shadow-2xl shadow-black/30 md:block"
          />
        </div>
      </div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(14,165,233,0.3),_transparent_45%)]" />
    </section>
  );
}

