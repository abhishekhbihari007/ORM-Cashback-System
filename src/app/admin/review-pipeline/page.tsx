import { api } from "@/lib/api";
import { ReviewPipeline } from "@/components/sections/brand/review-pipeline";

export const metadata = {
  title: "Admin • Review Pipeline",
};

export default async function AdminReviewPipelinePage() {
  const requests = await api.fetchReviewRequests();
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
        <ReviewPipeline requests={requests} />
      </div>
    </div>
  );
}

