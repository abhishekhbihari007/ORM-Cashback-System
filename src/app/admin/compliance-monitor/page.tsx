import { AdminComplianceClient } from "@/components/sections/admin/admin-compliance-client";

export const metadata = {
  title: "Admin • Compliance Monitor",
};

export default function AdminComplianceMonitorPage() {
  return (
    <div className="page-wrapper bg-white">
      <div className="container-responsive space-y-6 py-10">
        <div>
          <p className="section-title">Admin</p>
          <h1 className="text-4xl font-bold text-slate-900">Compliance Monitor</h1>
          <p className="text-slate-600">
            Stay ahead of policy changes, review velocity spikes, and suspicious activities.
          </p>
        </div>
        <AdminComplianceClient />
      </div>
    </div>
  );
}

