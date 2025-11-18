import { api } from "@/lib/api";
import { ActivityFeed } from "@/components/sections/admin/activity-feed";

export const metadata = {
  title: "Admin • User Activities",
};

export default async function AdminUserActivitiesPage() {
  const activities = await api.fetchAdminActivities();
  return (
    <div className="page-wrapper bg-white">
      <div className="container-responsive space-y-6 py-10">
        <div>
          <p className="section-title">Admin</p>
          <h1 className="text-4xl font-bold text-slate-900">User Activities</h1>
          <p className="text-slate-600">All reviewer actions centralized for compliance audits.</p>
        </div>
        <ActivityFeed activities={activities} />
      </div>
    </div>
  );
}

