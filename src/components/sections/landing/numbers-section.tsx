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
    <section className="relative bg-gradient-to-b from-pink-50/30 via-white to-cyan-50 py-20 overflow-hidden" id="numbers">
      {/* Background Image - Glowing Green Orb */}
      <div 
        className="absolute inset-0 opacity-40 pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(circle at 70% 50%, rgba(34, 197, 94, 0.7) 0%, rgba(22, 163, 74, 0.6) 20%, rgba(16, 185, 129, 0.5) 35%, rgba(20, 184, 166, 0.4) 50%, rgba(6, 182, 212, 0.3) 65%, transparent 80%)',
          backgroundSize: '110% 110%',
          backgroundPosition: 'right center',
          backgroundRepeat: 'no-repeat',
          filter: 'blur(85px)'
        }}
      />
      
      {/* Abstract Glowing Orb - Center Right */}
      <div className="absolute top-1/2 right-0 w-[550px] h-[550px] -translate-y-1/2 translate-x-1/3 pointer-events-none opacity-35">
        <div className="absolute inset-0 rounded-full bg-gradient-to-br from-green-400 via-emerald-500 to-teal-500 blur-3xl" />
        <div className="absolute inset-0 rounded-full bg-gradient-to-tl from-lime-300/50 via-transparent to-cyan-300/50 blur-2xl" />
        <div className="absolute inset-0" style={{ 
          background: 'radial-gradient(circle at 40% 40%, rgba(34, 197, 94, 0.4) 0%, transparent 60%), radial-gradient(circle at 60% 60%, rgba(16, 185, 129, 0.3) 0%, transparent 50%)',
          filter: 'blur(50px)'
        }} />
      </div>
      
      <div className="container-responsive space-y-10 relative z-10">
        <div className="space-y-3 text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.35em] text-slate-500">
            Numbers matter
          </p>
          <h2 className="text-3xl font-bold md:text-4xl text-slate-900">Data-backed trust from day one</h2>
          <p className="text-base md:text-lg text-slate-600">
            Our influencer agency funnel and cashback user base deliver predictable inputs for your reputation goals.
          </p>
        </div>
        <div className="grid grid-auto-fit gap-6">
          {numbers.map((item) => (
            <div
              key={item.label}
              className="rounded-3xl border border-green-300 bg-green-100/80 backdrop-blur-sm p-6 text-center shadow-xl shadow-green-200/50"
            >
              <p className="text-sm uppercase tracking-[0.4em] text-slate-700">
                {item.label}
              </p>
              <p className="mt-3 text-3xl font-bold bg-gradient-to-r from-green-700 to-green-600 bg-clip-text text-transparent">{item.value}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

