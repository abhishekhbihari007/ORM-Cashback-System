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
    <section className="relative overflow-hidden min-h-[500px] sm:min-h-[600px] bg-white py-12 sm:py-16 md:py-20 flex items-center">
      {/* Optional subtle texture pattern - very light */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{
        backgroundImage: `radial-gradient(circle at 2px 2px, rgb(15, 23, 42) 1px, transparent 0)`,
        backgroundSize: '40px 40px'
      }} />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 grid gap-6 sm:gap-8 lg:gap-12 grid-cols-1 lg:grid-cols-12 lg:items-center relative z-10 w-full">
        <div className="space-y-3 sm:space-y-4 lg:col-span-7 relative z-10 text-left">
          <p className="section-title text-slate-500 text-xs sm:text-sm md:text-base mb-2">ORM - Global Marketplace - Cashback Ecosystem</p>
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-extrabold leading-[1.1] text-slate-900 max-w-4xl text-left">
            Give away products. Earn verified reviews.
          </h1>
          <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-slate-700 max-w-2xl mt-3 sm:mt-4 mb-4 sm:mb-6 text-left">
            Get authentic reviews on Amazon & Flipkart using our network of verified shoppers.
          </p>
          <div className="flex flex-wrap gap-2 sm:gap-3 relative z-10 mb-6 sm:mb-8">
            <Link
              href="/signup"
              className="rounded-full bg-gradient-to-r from-orange-500 to-red-600 px-5 py-2.5 sm:px-6 sm:py-3 md:px-8 md:py-4 text-sm sm:text-base md:text-lg text-white shadow-lg shadow-orange-500/25 font-semibold hover:from-orange-600 hover:to-red-700 transition"
            >
              Sign Up
            </Link>
            <Link 
              href="/login" 
              className="rounded-full bg-white border border-slate-300 text-slate-700 px-5 py-2.5 sm:px-6 sm:py-3 md:px-8 md:py-4 text-sm sm:text-base md:text-lg font-semibold hover:bg-slate-50 transition relative z-10 cursor-pointer inline-block"
            >
              Login
            </Link>
          </div>
          <div className="flex flex-wrap gap-3 sm:gap-4">
            {heroMetrics.map((metric) => (
              <div key={metric.label} className="min-w-[120px] sm:min-w-[150px] flex-1 sm:flex-none sm:w-auto">
                <StatCard {...metric} />
              </div>
            ))}
          </div>
        </div>
        <div className="relative flex justify-center items-center lg:col-span-5 pt-6 sm:pt-8 lg:pt-0">
          <StarRatingGraphCard />
        </div>
      </div>
      
      {/* Arrow Bottom Decoration - PNG Image on Right Side */}
      <div className="absolute bottom-0 right-0 z-20 pointer-events-none overflow-hidden hidden sm:block">
        <div className="relative" style={{ width: '100%', maxWidth: '900px', height: 'auto', aspectRatio: '2/1' }}>
          <Image 
            src="/arrow-bottom1.png" 
            alt="" 
            fill
            className="object-contain object-bottom-right"
            priority={false}
            unoptimized
            sizes="(max-width: 640px) 0px, (max-width: 1024px) 400px, 900px"
          />
        </div>
      </div>
    </section>
  );
}

