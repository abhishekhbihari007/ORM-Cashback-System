import { EnterpriseAnalytics } from "@/components/sections/enterprise/enterprise-analytics";

const signals = [
  { label: "Review authenticity alerts", value: 3, trend: "down" },
  { label: "Ahead-of-plan campaigns", value: 9, trend: "up" },
  { label: "Delayed reimbursements", value: 2, trend: "flat" },
];

export const metadata = {
  title: "Enterprise Analytics",
};

export default function EnterpriseAnalyticsPage() {
  return (
    <div className="space-y-10 bg-slate-50 p-6 lg:p-10">
      <EnterpriseAnalytics />

      <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-200 pb-4">
          <div>
            <p className="text-sm font-semibold text-slate-500 uppercase tracking-wide">
              Signal center
            </p>
            <h3 className="text-xl font-bold text-slate-900">Automation & policy alerts</h3>
          </div>
          <button className="rounded-lg border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50">
            Configure alerts
          </button>
        </div>
        <div className="grid gap-4 pt-4 md:grid-cols-3">
          {signals.map((signal) => (
            <div
              key={signal.label}
              className="rounded-2xl border border-slate-100 bg-slate-50 p-4 text-slate-800"
            >
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                {signal.label}
              </p>
              <p className="mt-2 text-3xl font-bold">{signal.value}</p>
              <p className="text-xs text-slate-500">Last 7 days</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}


