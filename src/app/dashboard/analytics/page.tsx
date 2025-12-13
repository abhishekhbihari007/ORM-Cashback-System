import { AnalyticsPageClient } from "@/components/sections/brand/analytics-page-client";

export const metadata = {
  title: "Brand • Analytics",
};

export default function AnalyticsPage() {
  return (
    <div className="bg-slate-50">
      <div className="container-responsive space-y-6 py-10">
        <div>
          <p className="section-title">Analytics</p>
          <h1 className="text-4xl font-bold text-slate-900">Campaign Analytics</h1>
          <p className="text-slate-600">
            Track reviews acquired over time and monitor active products.
          </p>
        </div>
        <AnalyticsPageClient />
      </div>
    </div>
  );
}

