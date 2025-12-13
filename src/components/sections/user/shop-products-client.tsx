"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { userApi, type ShopProduct } from "@/lib/backend-api";

type Props = {
  initialMarketplace?: string;
  heading?: string;
};

const MARKETPLACE_LABELS: Record<string, string> = {
  AMAZON: "Amazon",
  FLIPKART: "Flipkart",
  SHOPIFY: "Shopify",
  NYKAA: "Nykaa",
  MEESHO: "Meesho",
  OTHER: "Other",
};

export function ShopProductsClient({ initialMarketplace, heading }: Props) {
  const [products, setProducts] = useState<ShopProduct[]>([]);
  const [search, setSearch] = useState("");
  const [marketplace, setMarketplace] = useState(initialMarketplace ?? "ALL");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [trackingId, setTrackingId] = useState<number | null>(null);
  const [toast, setToast] = useState<string | null>(null);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        setIsLoading(true);
        const response = await userApi.getShopProducts();
        setProducts(response.products);
      } catch (err: any) {
        setError(err.message || "Unable to load products. Please try again.");
      } finally {
        setIsLoading(false);
      }
    };

    loadProducts();
  }, []);

  useEffect(() => {
    if (!toast) return;
    const timer = setTimeout(() => setToast(null), 3000);
    return () => clearTimeout(timer);
  }, [toast]);

  const marketplaces = useMemo(() => {
    const unique = Array.from(new Set(products.map((product) => product.review_platform)));
    return unique.sort((a, b) => a.localeCompare(b));
  }, [products]);

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      if (marketplace !== "ALL" && product.review_platform !== marketplace) {
        return false;
      }
      if (!search.trim()) {
        return true;
      }
      const query = search.toLowerCase();
      return (
        product.name.toLowerCase().includes(query) ||
        product.brand_name.toLowerCase().includes(query) ||
        product.review_platform.toLowerCase().includes(query)
      );
    });
  }, [marketplace, products, search]);

  const handleTrack = async (product: ShopProduct) => {
    try {
      setTrackingId(product.id);
      await userApi.trackClick(product.id);
      setToast("Deal tracked! You can now purchase and upload proof.");
      window.open(product.product_url, "_blank", "noopener,noreferrer");
    } catch (err: any) {
      setError(err.message || "Unable to track this product. Please try again.");
    } finally {
      setTrackingId(null);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="max-w-xl space-y-2">
          <p className="section-title">{heading ?? "Live Campaigns"}</p>
          <h2 className="text-3xl font-bold text-slate-900">
            Shop products. Share honest reviews. Earn instant cashback.
          </h2>
          <p className="text-sm text-slate-600">
            Every campaign is 100% reimbursed once your purchase and review are approved by the brand.
          </p>
        </div>
        <div className="flex gap-2">
          <Link
            href="/user/purchases"
            className="rounded-full border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-white"
          >
            View purchases
          </Link>
          <Link
            href="/user/upload-proof"
            className="rounded-full bg-slate-900 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-800"
          >
            Upload proof
          </Link>
        </div>
      </div>

      {toast && (
        <div className="rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
          {toast}
        </div>
      )}

      {error && (
        <div className="rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">
          {error}
        </div>
      )}

      <div className="flex flex-wrap items-center gap-3">
          <button
            type="button"
            onClick={() => setMarketplace("ALL")}
            className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
              marketplace === "ALL"
                ? "bg-slate-900 text-white"
                : "border border-slate-200 text-slate-700 hover:bg-white"
            }`}
          >
            All marketplaces
          </button>
        {marketplaces.map((value) => (
          <button
            key={value}
            type="button"
            onClick={() => setMarketplace(value)}
            className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
              marketplace === value
                ? "bg-slate-900 text-white"
                : "border border-slate-200 text-slate-700 hover:bg-white"
            }`}
          >
            {MARKETPLACE_LABELS[value] ?? value}
          </button>
        ))}
        <div className="ml-auto flex-1 min-w-[200px]">
          <input
            type="text"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search by product or brand"
            className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-100"
          />
        </div>
      </div>

      {isLoading ? (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, index) => (
            <div key={index} className="animate-pulse rounded-3xl border border-slate-100 bg-white p-6 shadow-sm">
              <div className="h-40 rounded-2xl bg-slate-100" />
              <div className="mt-4 h-4 w-3/4 rounded bg-slate-100" />
              <div className="mt-2 h-3 w-1/2 rounded bg-slate-100" />
            </div>
          ))}
        </div>
      ) : filteredProducts.length === 0 ? (
        <div className="rounded-3xl border border-dashed border-slate-200 bg-white p-12 text-center">
          <p className="text-lg font-semibold text-slate-900">No campaigns found</p>
          <p className="mt-2 text-sm text-slate-500">
            Try clearing your search or switching to a different marketplace.
          </p>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className="flex h-full flex-col overflow-hidden rounded-3xl border border-slate-100 bg-white shadow-sm transition hover:shadow-lg"
            >
              <div className="relative h-48 w-full overflow-hidden bg-slate-100">
                {product.main_image ? (
                  <Image
                    src={product.main_image}
                    alt={product.name}
                    fill
                    sizes="(min-width: 1024px) 33vw, 100vw"
                    className="object-cover"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center text-slate-400">
                    No image
                  </div>
                )}
                <div className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-slate-700 shadow">
                  {MARKETPLACE_LABELS[product.review_platform] ?? product.review_platform}
                </div>
                <div className="absolute right-4 top-4 rounded-full bg-emerald-600 px-3 py-1 text-xs font-semibold text-white shadow">
                  {product.available_slots} slots
                </div>
              </div>
              <div className="flex flex-1 flex-col space-y-3 p-5">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500">
                    {product.brand_name}
                  </p>
                  <h3 className="mt-1 text-lg font-semibold text-slate-900 line-clamp-2">{product.name}</h3>
                </div>
                <p className="text-sm text-slate-500 line-clamp-2">{product.description}</p>
                <div className="mt-auto flex items-center justify-between">
                  <div>
                    <p className="text-2xl font-bold text-slate-900">
                      {product.currency} {Number(product.price).toFixed(0)}
                    </p>
                    <p className="text-xs text-slate-500">Instant cashback after approval</p>
                  </div>
                  <button
                    onClick={() => handleTrack(product)}
                    disabled={trackingId === product.id}
                    className="rounded-full bg-slate-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-800 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {trackingId === product.id ? "Tracking..." : "Get deal"}
                  </button>
                </div>
                <Link href={`/user/deals/${product.id}`} className="text-sm font-semibold text-indigo-600 hover:underline">
                  View details →
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}


