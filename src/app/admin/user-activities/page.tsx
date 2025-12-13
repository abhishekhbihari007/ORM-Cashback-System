import { AdminActivitiesClient } from "@/components/sections/admin/admin-activities-client";

export const metadata = {
  title: "Admin • User Activities",
};

export default function AdminUserActivitiesPage() {
  return (
    <div className="page-wrapper bg-white">
      <div className="container-responsive space-y-6 py-10">
        <div>
          <p className="section-title">Admin</p>
          <h1 className="text-4xl font-bold text-slate-900">User Activities</h1>
          <p className="text-slate-600">All reviewer actions centralized for compliance audits.</p>
        </div>
        <AdminActivitiesClient />
      </div>
    </div>
  );
}

