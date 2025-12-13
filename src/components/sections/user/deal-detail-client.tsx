"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { userApi, type ShopProduct } from "@/lib/backend-api";

type Props = {
  productId: string;
};

export function DealDetailClient({ productId }: Props) {
  const [products, setProducts] = useState<ShopProduct[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [trackingId, setTrackingId] = useState<number | null>(null);
  const numericId = Number(productId);

  useEffect(() => {
    const load = async () => {
      try {
        setIsLoading(true);
        const response = await userApi.getShopProducts();
        setProducts(response.products);
      } catch (err: any) {
        setError(err.message || "Unable to load deal details.");
      } finally {
        setIsLoading(false);
      }
    };

    load();
  }, []);

  const product = useMemo(() => products.find((item) => item.id === numericId), [products, numericId]);

  const handleTrack = async () => {
    if (!product) return;
    try {
      setTrackingId(product.id);
      await userApi.trackClick(product.id);
      window.open(product.product_url, "_blank", "noopener,noreferrer");
    } catch (err: any) {
      setError(err.message || "Unable to track deal. Please try again.");
    } finally {
      setTrackingId(null);
    }
  };

  if (isLoading) {
    return <p className="text-sm text-slate-500">Loading deal…</p>;
  }

  if (error) {
    return <p className="text-sm text-rose-600">{error}</p>;
  }

  if (!product) {
    return <p className="text-sm text-slate-500">Deal not found.</p>;
  }

  return (
    <div className="space-y-6">
      <div className="grid gap-6 lg:grid-cols-2">
        <div className="relative aspect-square w-full overflow-hidden rounded-3xl border border-slate-100 bg-slate-50">
          {product.main_image ? (
            <Image
              src={product.main_image}
              alt={product.name}
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center text-slate-400">No image</div>
          )}
        </div>
        <div className="space-y-6">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-slate-500">
              {product.brand_name}
            </p>
            <h1 className="text-3xl font-bold text-slate-900 md:text-4xl">{product.name}</h1>
            <p className="mt-2 text-slate-600">
              Marketplace: {product.review_platform} • Slots available: {product.available_slots}
            </p>
          </div>
          <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-slate-600">Product Price</span>
                <span className="text-2xl font-bold text-slate-900">
                  {product.currency} {Number(product.price).toFixed(2)}
                </span>
              </div>
              <p className="text-sm text-slate-500">
                Complete the purchase and submit your review to receive full cashback.
              </p>
            </div>
          </div>
          <button
            onClick={handleTrack}
            disabled={trackingId === product.id}
            className="w-full rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-4 text-lg font-semibold text-white shadow-lg shadow-blue-200 transition hover:from-blue-700 hover:to-indigo-700 disabled:opacity-50"
          >
            {trackingId === product.id ? "Tracking…" : `Shop now on ${product.review_platform}`}
          </button>
        </div>
      </div>
      <div className="rounded-3xl border border-slate-100 bg-white p-6 shadow-sm">
        <h2 className="mb-3 text-xl font-bold text-slate-900">How it works</h2>
        <ol className="space-y-3 text-sm text-slate-700">
          <li>1. Click “Shop now” to create a draft order and buy the product.</li>
          <li>2. Upload your purchase proof from the Purchases tab.</li>
          <li>3. Submit your marketplace review link to release cashback.</li>
        </ol>
      </div>
    </div>
  );
}


