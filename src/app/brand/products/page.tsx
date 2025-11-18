import { api } from "@/lib/api";
import { StatusBadge } from "@/components/ui/status-badge";
import { ProgressBar } from "@/components/ui/progress-bar";

export const metadata = {
  title: "Brand Products • ORM Dashboard",
};

export default async function BrandProductsPage() {
  const data = await api.fetchProducts();

  return (
    <div className="page-wrapper bg-white">
      <div className="container-responsive space-y-6 py-10">
        <div>
          <p className="section-title">Products</p>
          <h1 className="text-4xl font-bold text-slate-900">SKU level reputation controls</h1>
          <p className="text-slate-600">
            Allocate review slots, monitor sentiment, and track progress across every marketplace.
          </p>
        </div>

        <div className="overflow-hidden rounded-3xl border border-slate-100 shadow-sm">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50 text-xs uppercase tracking-wider text-slate-500">
              <tr>
                <th className="px-6 py-4">Product</th>
                <th className="px-6 py-4">Marketplace</th>
                <th className="px-6 py-4">Rating</th>
                <th className="px-6 py-4">Review Goal</th>
                <th className="px-6 py-4">Status</th>
              </tr>
            </thead>
            <tbody>
              {data.map((product) => {
                const progress = Math.round((product.reviews / product.targetReviews) * 100);
                return (
                  <tr key={product.id} className="border-t border-slate-100">
                    <td className="px-6 py-4">
                      <p className="font-semibold text-slate-900">{product.name}</p>
                      <p className="text-xs text-slate-500">SKU: {product.sku}</p>
                    </td>
                    <td className="px-6 py-4 text-slate-600">{product.marketplace}</td>
                    <td className="px-6 py-4 font-semibold text-slate-900">{product.rating.toFixed(1)}★</td>
                    <td className="px-6 py-4">
                      <div className="flex flex-col gap-2">
                        <ProgressBar value={progress} />
                        <p className="text-xs text-slate-500">
                          {product.reviews} / {product.targetReviews} reviews
                        </p>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <StatusBadge
                        label={product.status}
                        variant={
                          product.status === "growing"
                            ? "success"
                            : product.status === "attention"
                            ? "warning"
                            : "neutral"
                        }
                      />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

