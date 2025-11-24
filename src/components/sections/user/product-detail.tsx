"use client";

import Image from "next/image";
import { Deal } from "@/lib/types";

type Props = {
  deal: Deal;
};

export function ProductDetail({ deal }: Props) {
  const handleShopNow = () => {
    // In real app, this would track the click and redirect
    window.open(deal.productLink, "_blank");
  };

  return (
    <div className="space-y-6">
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Product Image */}
        <div className="relative aspect-square w-full overflow-hidden rounded-3xl border border-slate-100 bg-slate-50">
          <Image
            src={deal.productImage}
            alt={deal.productName}
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover"
          />
          <div className="absolute top-4 right-4 rounded-full bg-green-600 px-4 py-2 text-sm font-bold text-white shadow-lg">
            {deal.cashbackPercent}% Cashback
          </div>
        </div>

        {/* Product Info */}
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold text-slate-900 md:text-4xl">{deal.productName}</h1>
            <p className="mt-2 text-slate-600">Available on {deal.marketplace}</p>
          </div>

          <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-slate-600">Product Price</span>
                <span className="text-2xl font-bold text-slate-900">₹{deal.price.toFixed(2)}</span>
              </div>
              <div className="flex items-center justify-between border-t border-slate-100 pt-3">
                <span className="font-semibold text-green-600">Cashback Amount</span>
                <span className="text-2xl font-bold text-green-600">
                  ₹{deal.cashbackAmount.toFixed(2)}
                </span>
              </div>
              <p className="text-sm text-slate-500">
                You&apos;ll get 100% of your money back after review approval!
              </p>
            </div>
          </div>

          <button
            onClick={handleShopNow}
            className="w-full rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-4 text-lg font-semibold text-white shadow-lg shadow-blue-200 transition hover:from-blue-700 hover:to-indigo-700"
          >
            Shop Now on {deal.marketplace} →
          </button>
        </div>
      </div>

      {/* Instructions */}
      <div className="rounded-3xl border border-slate-100 bg-white p-6 shadow-sm">
        <h2 className="mb-4 text-xl font-bold text-slate-900">How to Get Cashback</h2>
        <div className="space-y-3">
          {deal.instructions.map((instruction, idx) => (
            <div key={idx} className="flex items-start gap-4">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-blue-100 text-sm font-bold text-blue-600">
                {idx + 1}
              </div>
              <p className="pt-1 text-slate-700">{instruction}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Requirements */}
      <div className="rounded-3xl border border-slate-100 bg-white p-6 shadow-sm">
        <h2 className="mb-4 text-xl font-bold text-slate-900">Review Requirements</h2>
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <span className="text-lg font-bold text-yellow-600">{deal.requirements.rating} ⭐</span>
            <span className="text-slate-700">Rating Required</span>
          </div>
          {deal.requirements.mustInclude.length > 0 && (
            <div>
              <p className="mb-2 text-sm font-semibold text-slate-700">Must Include:</p>
              <div className="space-y-1">
                {deal.requirements.mustInclude.map((item, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-sm text-slate-600">
                    <span className="text-green-600">✓</span>
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

