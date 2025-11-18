import { StatCard } from "@/components/ui/stat-card";
import { AdminActivity, ComplianceAlert } from "@/lib/types";

type Props = {
  activities: AdminActivity[];
  alerts: ComplianceAlert[];
};

export function AdminOverview({ activities, alerts }: Props) {
  const cards = [
    { label: "Active Alerts", value: `${alerts.length}`, helper: "Need review" },
    { label: "User Actions (24h)", value: `${activities.length}`, helper: "Audited" },
    { label: "Policy Compliance", value: "98%", helper: "Across marketplaces" },
  ];

  return (
    <section className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="section-title">Admin Panel</p>
          <h1 className="text-3xl font-bold text-slate-900">Unified command center</h1>
          <p className="text-slate-600">
            Monitor reviewer health, automate reimbursements, and enforce policy guardrails.
          </p>
        </div>
        <button className="rounded-full border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-600">
          Download audit log
        </button>
      </div>
      <div className="grid gap-4 md:grid-cols-3">
        {cards.map((card) => (
          <StatCard key={card.label} {...card} />
        ))}
      </div>
    </section>
  );
}

