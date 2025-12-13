import { AdminPayoutsClient } from "@/components/sections/admin/admin-payouts-client";

export const metadata = {
  title: "Admin • Payout Manager",
};

export default function AdminPayoutsPage() {
  return (
    <div className="page-wrapper bg-slate-50">
      <div className="container-responsive space-y-6 py-10">
        <div>
          <p className="section-title">Admin</p>
          <h1 className="text-4xl font-bold text-slate-900">Payout Manager</h1>
          <p className="text-slate-600">
            Manage withdrawal requests. Mark payments as done after processing.
          </p>
        </div>
        <AdminPayoutsClient />
      </div>
    </div>
  );
}

