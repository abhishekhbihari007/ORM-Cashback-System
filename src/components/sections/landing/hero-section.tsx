import Image from "next/image";
import Link from "next/link";
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
      <div className="container-responsive grid gap-10 py-20 md:grid-cols-2 md:items-center relative z-10">
        <div className="space-y-6 relative z-10">
          <p className="section-title text-orange-200">ORM - Global Marketplace - Cashback Ecosystem</p>
          <h1 className="text-4xl font-black leading-tight text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-red-600 md:text-5xl">
            Give away products. Earn verified reviews. Dominate marketplace reputation.
          </h1>
          <p className="text-lg text-slate-200">
            Get authentic reviews on Amazon & Flipkart using our network of verified shoppers.
          </p>
          <div className="flex flex-wrap gap-3 relative z-10">
            <button className="rounded-full bg-gradient-to-r from-orange-500 to-red-600 px-6 py-3 text-white shadow-lg shadow-orange-500/30 font-semibold hover:from-orange-600 hover:to-red-700 transition">
              Start Free Campaign
            </button>
            <Link 
              href="/how-it-works" 
              className="rounded-full border border-white/30 px-6 py-3 text-white font-semibold hover:bg-white/10 transition relative z-10 cursor-pointer inline-block"
            >
              How it Works
            </Link>
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
      {/* Orange Glow */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-orange-500 rounded-full blur-3xl opacity-30 pointer-events-none" />
      {/* Red Glow */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-red-500 rounded-full blur-3xl opacity-30 pointer-events-none" />
    </section>
  );
}

