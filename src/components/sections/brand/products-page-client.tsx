"use client";

import { useEffect, useState } from "react";
import { brandApi, type BrandProduct } from "@/lib/backend-api";
import { StatusBadge } from "@/components/ui/status-badge";
import { ProgressBar } from "@/components/ui/progress-bar";
import { Product } from "@/lib/types";

function mapBrandProductToProduct(bp: BrandProduct): Product {
  return {
    id: bp.id.toString(),
    name: bp.name,
    marketplace: bp.review_platform,
    sku: bp.sku || "N/A",
    rating: 0, // Not available in product data, would need to calculate from reviews
    reviews: 0, // Not available, would need to count
    targetReviews: 100, // Default
    status: bp.is_active ? "growing" : "stable",
  };
}

export function ProductsPageClient() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const response = await brandApi.getProducts();
        const mappedProducts = response.products.map(mapBrandProductToProduct);
        setProducts(mappedProducts);
      } catch (err: any) {
        setError(err.message || "Unable to load products. Please try again.");
      } finally {
        setIsLoading(false);
      }
    };

    loadProducts();
  }, []);

  if (isLoading) {
    return (
      <div className="rounded-3xl border border-slate-100 bg-white p-10 text-center text-slate-500">
        Loading products...
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">
        Error: {error}
      </div>
    );
  }

  return (
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
          {products.length === 0 ? (
            <tr>
              <td colSpan={5} className="px-6 py-8 text-center text-slate-500">
                No products found
              </td>
            </tr>
          ) : (
            products.map((product) => {
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
            })
          )}
        </tbody>
      </table>
    </div>
  );
}

