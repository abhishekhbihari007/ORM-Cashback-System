import { SectionHeading } from "@/components/ui/section-heading";

const numbers = [
  { label: "Experience", value: "12+ yrs" },
  { label: "Team Size", value: "80+" },
  { label: "Affiliates", value: "100K+" },
  { label: "Monthly Global Traffic", value: "18M" },
  { label: "Monthly Conversions", value: "450K" },
  { label: "Monthly GMV Influenced", value: "$34M" },
];

export function NumbersSection() {
  return (
    <section className="relative min-h-[600px] bg-cover bg-center bg-no-repeat py-20 flex items-center overflow-hidden" style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1557683316-973673baf926?q=80&w=2129&auto=format&fit=crop)' }} id="numbers">
      {/* Dark overlay for text readability */}
      <div className="absolute inset-0 bg-gradient-to-br from-black/75 via-slate-900/65 to-black/75 pointer-events-none" />
      
      {/* Animated gradient orbs */}
      <div className="absolute top-1/4 left-1/4 w-[450px] h-[450px] bg-cyan-500/25 rounded-full blur-3xl animate-pulse pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-blue-500/25 rounded-full blur-3xl animate-pulse pointer-events-none" style={{ animationDelay: '1.5s' }} />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-indigo-500/20 rounded-full blur-3xl animate-pulse pointer-events-none" style={{ animationDelay: '0.75s' }} />
      
      <div className="container-responsive space-y-12 relative z-10">
        <div className="space-y-4 text-center">
          <p className="text-sm font-bold uppercase tracking-[0.4em] text-blue-300/90">
            Numbers matter
          </p>
          <h2 className="text-4xl font-black md:text-5xl lg:text-6xl text-white leading-tight">
            <span className="bg-gradient-to-r from-white via-blue-100 to-white bg-clip-text text-transparent">
              Data-backed trust
            </span>
            <br />
            <span className="bg-gradient-to-r from-blue-200 via-white to-blue-200 bg-clip-text text-transparent">
              from day one
            </span>
          </h2>
          <p className="mx-auto max-w-2xl text-lg md:text-xl text-blue-100/90 leading-relaxed">
            Our influencer agency funnel and cashback user base deliver predictable inputs for your reputation goals.
          </p>
        </div>
        <div className="grid grid-auto-fit gap-6 md:gap-8">
          {numbers.map((item, index) => (
            <div
              key={item.label}
              className="group relative rounded-3xl border border-white/20 bg-gradient-to-br from-white/10 via-white/5 to-white/10 backdrop-blur-xl p-8 text-center shadow-2xl transition-all duration-500 hover:scale-105 hover:border-white/40 hover:shadow-blue-500/20"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Glowing effect on hover */}
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-blue-500/0 via-purple-500/0 to-blue-500/0 group-hover:from-blue-500/10 group-hover:via-purple-500/10 group-hover:to-blue-500/10 transition-all duration-500 blur-xl" />
              
              <div className="relative z-10">
                <p className="text-xs font-bold uppercase tracking-[0.5em] text-blue-200/80 mb-4">
                  {item.label}
                </p>
                <p className="text-5xl md:text-6xl font-black bg-gradient-to-r from-blue-300 via-white to-blue-300 bg-clip-text text-transparent leading-none">
                  {item.value}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

