import { ReviewReportsClient } from "@/components/sections/brand/review-reports-client";

export const metadata = {
  title: "Brand • Review Reports",
};

export default function BrandReportsPage() {
  return (
    <div className="page-wrapper bg-slate-50">
      <div className="container-responsive space-y-6 py-10">
        <div>
          <p className="section-title">Reports</p>
          <h1 className="text-4xl font-bold text-slate-900">Review Reports</h1>
          <p className="text-slate-600">
            View all actual reviews posted on Amazon/Flipkart. Click links to verify them.
          </p>
        </div>
        <ReviewReportsClient />
      </div>
    </div>
  );
}

