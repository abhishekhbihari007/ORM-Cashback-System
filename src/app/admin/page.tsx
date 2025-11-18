import { api } from "@/lib/api";
import { AdminOverview } from "@/components/sections/admin/admin-overview";
import { ActivityFeed } from "@/components/sections/admin/activity-feed";
import { CompliancePanel } from "@/components/sections/admin/compliance-panel";

export default async function AdminPage() {
  const [activities, alerts] = await Promise.all([
    api.fetchAdminActivities(),
    api.fetchComplianceAlerts(),
  ]);

  return (
    <div className="page-wrapper bg-slate-50">
      <div className="container-responsive space-y-8 py-10">
        <AdminOverview activities={activities} alerts={alerts} />
        <div className="grid gap-6 lg:grid-cols-[1.1fr,0.9fr]">
          <ActivityFeed activities={activities} />
          <CompliancePanel alerts={alerts} />
        </div>
      </div>
    </div>
  );
}

