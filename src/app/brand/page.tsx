import { BrandOverview } from "@/components/sections/brand/brand-overview";
import { LiveOrdersWidget } from "@/components/sections/brand/live-orders-widget";
import { ReviewPipeline } from "@/components/sections/brand/review-pipeline";
import { BudgetWidget } from "@/components/sections/brand/budget-widget";
import { api } from "@/lib/api";

export default async function BrandPage() {
  const [productData, sentiments, sentimentTotals, velocityIndex, reviewData, budget] =
    await Promise.all([
      api.fetchProducts(),
      api.fetchSentiments(),
      api.fetchSentimentTotals(),
      api.fetchVelocityIndex(),
      api.fetchReviewRequests(),
      api.fetchBudget(),
    ]);

  return (
    <div className="page-wrapper bg-slate-50">
      <div className="container-responsive space-y-10 py-10">
        <BrandOverview
          products={productData}
          sentimentTotals={sentimentTotals}
          velocityIndex={velocityIndex}
          sentiments={sentiments}
        />
        <div className="grid gap-6 lg:grid-cols-[1.3fr,0.7fr]">
          <LiveOrdersWidget />
          <BudgetWidget snapshot={budget} />
        </div>
        <ReviewPipeline requests={reviewData} />
      </div>
    </div>
  );
}

