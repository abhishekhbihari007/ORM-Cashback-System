import { api } from "@/lib/api";
import { ReviewPipeline } from "@/components/sections/brand/review-pipeline";
import { sentimentTotals } from "@/lib/analytics";

export const metadata = {
  title: "Brand Reviews • ORM Dashboard",
};

export default async function BrandReviewsPage() {
  const [requests, sentiments] = await Promise.all([api.fetchReviewRequests(), api.fetchSentiments()]);
  const totals = sentimentTotals(sentiments);

  return (
    <div className="page-wrapper bg-slate-50">
      <div className="container-responsive space-y-8 py-10">
        <div>
          <p className="section-title">Reviews</p>
          <h1 className="text-4xl font-bold text-slate-900">Automated review sourcing</h1>
          <p className="text-slate-600">
            Trigger slots to cashback users, monitor submissions, and step in before a policy breach.
          </p>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {[
            { label: "Positive", value: `${totals.positive}%` },
            { label: "Neutral", value: `${totals.neutral}%` },
            { label: "Negative", value: `${totals.negative}%` },
          ].map((stat) => (
            <div key={stat.label} className="rounded-3xl border border-slate-100 bg-white p-6 text-center">
              <p className="text-sm font-semibold uppercase text-slate-500">{stat.label}</p>
              <p className="mt-3 text-3xl font-bold text-slate-900">{stat.value}</p>
            </div>
          ))}
        </div>
        <ReviewPipeline requests={requests} />
      </div>
    </div>
  );
}

