import { StatCard } from "@/components/ui/stat-card";
import { ProgressBar } from "@/components/ui/progress-bar";
import { StatusBadge } from "@/components/ui/status-badge";
import { Product, SentimentInsight } from "@/lib/types";

type Props = {
  products: Product[];
  sentimentTotals: { positive: number; neutral: number; negative: number };
  velocityIndex: number;
  sentiments: SentimentInsight[];
};

export function BrandOverview({ products, sentimentTotals, velocityIndex, sentiments }: Props) {
  const avgRating =
    products.reduce((sum, product) => sum + product.rating, 0) / Math.max(products.length, 1);

  const metrics = [
    {
      label: "Average Rating",
      value: `${avgRating.toFixed(1)}★`,
      helper: "Weighted across marketplaces",
    },
    {
      label: "Velocity Index",
      value: `${velocityIndex.toFixed(1)}x`,
      helper: "Vs organic benchmark",
      trend: { value: "+0.3 this week", isPositive: true },
    },
    {
      label: "Positive Sentiment",
      value: `${sentimentTotals.positive}%`,
      helper: "Across 4 marketplaces",
    },
  ];

  return (
    <section className="space-y-8 py-10">
      <div className="space-y-4">
        <p className="section-title">Brand Dashboard</p>
        <div className="flex flex-wrap items-center justify-between gap-4">
          <h1 className="text-4xl font-bold text-slate-900">
            Reputation cockpit for every SKU and storefront
          </h1>
          <button className="rounded-full border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-600 hover:text-slate-900">
            Export weekly report
          </button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {metrics.map((metric) => (
          <StatCard key={metric.label} {...metric} />
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.4fr,1fr]">
        <div className="rounded-3xl border border-slate-100 bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-semibold text-slate-900">Tracked Products</h3>
            <span className="text-sm text-slate-500">{products.length} live SKUs</span>
          </div>
          <div className="mt-4 space-y-4">
            {products.map((product) => {
              const utilization = Math.round((product.reviews / product.targetReviews) * 100);
              const statusVariant =
                product.status === "growing"
                  ? "success"
                  : product.status === "stable"
                  ? "neutral"
                  : "warning";
              return (
                <div
                  key={product.id}
                  className="rounded-2xl border border-slate-100 bg-slate-50 p-4 md:flex md:items-center md:justify-between md:gap-6"
                >
                  <div>
                    <p className="text-base font-semibold text-slate-900">{product.name}</p>
                    <p className="text-sm text-slate-500">
                      {product.marketplace} • SKU {product.sku}
                    </p>
                  </div>
                  <div className="flex flex-1 flex-col gap-3">
                    <ProgressBar value={utilization} />
                    <p className="text-sm text-slate-500">
                      {product.reviews} / {product.targetReviews} verified reviews
                    </p>
                  </div>
                  <StatusBadge label={product.status} variant={statusVariant} />
                </div>
              );
            })}
          </div>
        </div>

        <div className="rounded-3xl border border-slate-100 bg-white p-6 shadow-sm">
          <h3 className="mb-4 text-xl font-semibold text-slate-900">Sentiment by marketplace</h3>
          <div className="space-y-4">
            {sentiments.map((sentiment) => (
              <div key={sentiment.marketplace}>
                <div className="flex items-center justify-between text-sm text-slate-600">
                  <span className="font-semibold text-slate-900">{sentiment.marketplace}</span>
                  <span>{sentiment.positive}% positive</span>
                </div>
                <div className="mt-2 flex h-3 overflow-hidden rounded-full bg-slate-100">
                  <div
                    className="bg-emerald-500"
                    style={{ width: `${sentiment.positive}%` }}
                  />
                  <div className="bg-amber-400" style={{ width: `${sentiment.neutral}%` }} />
                  <div className="bg-rose-500" style={{ width: `${sentiment.negative}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

