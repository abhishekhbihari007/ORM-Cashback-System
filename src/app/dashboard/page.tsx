import { BrandOverview } from "@/components/sections/brand/brand-overview";
import { LiveAnalyticsBoard } from "@/components/sections/brand/live-analytics-board";
import { ReviewPipeline } from "@/components/sections/brand/review-pipeline";
import { BudgetWidget } from "@/components/sections/brand/budget-widget";
import { api } from "@/lib/api";

export default async function BrandDashboardPage() {
  const [productData, sentiments, sentimentTotals, velocityIndex, reviewData, budget, campaigns] =
    await Promise.all([
      api.fetchProducts(),
      api.fetchSentiments(),
      api.fetchSentimentTotals(),
      api.fetchVelocityIndex(),
      api.fetchReviewRequests(),
      api.fetchBudget(),
      api.fetchCampaigns(),
    ]);

  return (
    <div className="bg-slate-50">
      <div className="container-responsive space-y-10 py-10">
        <BrandOverview
          products={productData}
          sentimentTotals={sentimentTotals}
          velocityIndex={velocityIndex}
          sentiments={sentiments}
        />
        <LiveAnalyticsBoard campaigns={campaigns} />
        <div className="grid gap-6 lg:grid-cols-[1.3fr,0.7fr]">
          <ReviewPipeline requests={reviewData} />
          <BudgetWidget snapshot={budget} />
        </div>
      </div>
    </div>
  );
}

