import { StatCard } from "@/components/ui/stat-card";
import { AdminActivity, ComplianceAlert } from "@/lib/types";

type Props = {
  activities: AdminActivity[];
  alerts: ComplianceAlert[];
};

// Props are passed but not used in this component (for future use)
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function AdminOverview(_props: Props) {
  // Calculate stats (in real app, these would come from API)
  const totalRevenue = 125000; // Total revenue in currency
  const pendingApprovals = 8; // Pending reviews to approve
  const activeUsers = 1240; // Active users count

  const cards = [
    { label: "Total Revenue", value: `₹${totalRevenue.toLocaleString()}`, helper: "All time" },
    { label: "Pending Approvals", value: `${pendingApprovals}`, helper: "Awaiting review" },
    { label: "Active Users", value: `${activeUsers.toLocaleString()}`, helper: "Registered users" },
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

