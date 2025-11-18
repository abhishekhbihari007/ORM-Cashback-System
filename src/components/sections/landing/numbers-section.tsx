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
    <section className="bg-slate-900 py-20 text-white" id="numbers">
      <div className="container-responsive space-y-10">
        <div className="space-y-3 text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.35em] text-gray-400">
            Numbers matter
          </p>
          <h2 className="text-3xl font-bold md:text-4xl text-white">Data-backed trust from day one</h2>
          <p className="text-base md:text-lg text-gray-300">
            Our influencer agency funnel and cashback user base deliver predictable inputs for your reputation goals.
          </p>
        </div>
        <div className="grid grid-auto-fit gap-6">
          {numbers.map((item) => (
            <div
              key={item.label}
              className="rounded-3xl border border-white/15 bg-white/5 p-6 text-center"
            >
              <p className="text-sm uppercase tracking-[0.4em] text-white/70">
                {item.label}
              </p>
              <p className="mt-3 text-3xl font-bold text-white">{item.value}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

