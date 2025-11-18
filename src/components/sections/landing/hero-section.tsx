import Image from "next/image";
import { StatCard } from "@/components/ui/stat-card";
import StarRatingGraphCard from "@/components/ui/star-rating-graph-card";

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
            Get authentic reviews on Amazon & Flipkart using our network of verified shoppers.
          </p>
          <div className="flex flex-wrap gap-3">
            <button className="rounded-full bg-white px-6 py-3 text-slate-900 shadow-lg shadow-slate-900/20 font-semibold hover:bg-slate-100 transition">
              Start Free Campaign
            </button>
            <button className="rounded-full border border-white/30 px-6 py-3 text-white font-semibold hover:bg-white/10 transition">
              How it Works
            </button>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            {heroMetrics.map((metric) => (
              <StatCard key={metric.label} {...metric} />
            ))}
          </div>
        </div>
        <div className="relative flex justify-center">
          <StarRatingGraphCard />
        </div>
      </div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(14,165,233,0.3),_transparent_45%)]" />
    </section>
  );
}

