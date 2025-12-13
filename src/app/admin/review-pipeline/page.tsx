import { AdminReviewPipelineClient } from "@/components/sections/admin/admin-review-pipeline-client";

export const metadata = {
  title: "Admin • Review Pipeline",
};

export default function AdminReviewPipelinePage() {
  return (
    <div className="page-wrapper bg-slate-50">
      <div className="container-responsive space-y-6 py-10">
        <div>
          <p className="section-title">Admin</p>
          <h1 className="text-4xl font-bold text-slate-900">Review Pipeline</h1>
          <p className="text-slate-600">
            Admins can reassign slots, pause campaigns, or trigger compliance pings.
          </p>
        </div>
        <AdminReviewPipelineClient />
      </div>
    </div>
  );
}

