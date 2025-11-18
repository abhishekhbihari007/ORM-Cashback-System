import { api } from "@/lib/api";
import { AdminOverview } from "@/components/sections/admin/admin-overview";
import { ActivityFeed } from "@/components/sections/admin/activity-feed";
import { CompliancePanel } from "@/components/sections/admin/compliance-panel";

export default async function AdminPage() {
  const [activities, alerts, users, pendingReviews, payouts] = await Promise.all([
    api.fetchAdminActivities(),
    api.fetchComplianceAlerts(),
    api.fetchUsers(),
    api.fetchPendingReviews(),
    api.fetchPayoutRequests(),
  ]);

  return (
    <div className="bg-slate-50">
      <div className="container-responsive space-y-8 py-10">
        <AdminOverview activities={activities} alerts={alerts} />
        <div className="grid gap-4 md:grid-cols-3">
          <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
            <p className="text-sm font-semibold text-slate-500">Total Users</p>
            <p className="mt-2 text-3xl font-bold text-slate-900">{users.length}</p>
          </div>
          <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
            <p className="text-sm font-semibold text-slate-500">Pending Reviews</p>
            <p className="mt-2 text-3xl font-bold text-slate-900">
              {pendingReviews.filter((r) => r.status === "pending").length}
            </p>
          </div>
          <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
            <p className="text-sm font-semibold text-slate-500">Total Payouts</p>
            <p className="mt-2 text-3xl font-bold text-slate-900">
              ₹{payouts.reduce((sum, p) => sum + p.amount, 0).toFixed(2)}
            </p>
          </div>
        </div>
        <div className="grid gap-6 lg:grid-cols-[1.1fr,0.9fr]">
          <ActivityFeed activities={activities} />
          <CompliancePanel alerts={alerts} />
        </div>
      </div>
    </div>
  );
}

