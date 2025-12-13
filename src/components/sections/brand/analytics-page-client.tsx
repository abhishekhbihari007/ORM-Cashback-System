"use client";

import { useEffect, useState } from "react";
import { brandApi, type ReviewSlot, type BrandProduct } from "@/lib/backend-api";
import { Campaign } from "@/lib/types";

function mapToCampaign(slot: ReviewSlot, product: BrandProduct | undefined): Campaign {
  return {
    id: slot.id.toString(),
    productLink: product?.product_url || "#",
    productName: slot.product_name || product?.name || "Unknown Product",
    productImage: product?.main_image || "/placeholder-product.png",
    quantity: slot.total_slots,
    budgetPerReview: parseFloat(slot.cashback_amount),
    totalBudget: parseFloat(slot.cashback_amount) * slot.total_slots,
    reviewsReceived: slot.total_slots - slot.available_slots,
    averageRating: 0, // Not available, would need to calculate from reviews
    slotsRemaining: slot.available_slots,
    status: slot.status === "OPEN" ? "active" : slot.status === "COMPLETED" ? "completed" : "paused",
    createdAt: slot.created_at,
  };
}

export function AnalyticsPageClient() {
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadAnalytics = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const [reviewSlotsResponse, productsResponse] = await Promise.all([
          brandApi.getReviewSlots(),
          brandApi.getProducts(),
        ]);

        const mappedCampaigns = reviewSlotsResponse.slots.map((slot) => {
          const product = productsResponse.products.find((p) => p.id === slot.product);
          return mapToCampaign(slot, product);
        });

        setCampaigns(mappedCampaigns);
      } catch (err: any) {
        setError(err.message || "Unable to load analytics. Please try again.");
      } finally {
        setIsLoading(false);
      }
    };

    loadAnalytics();
  }, []);

  if (isLoading) {
    return (
      <div className="rounded-3xl border border-slate-100 bg-white p-10 text-center text-slate-500">
        Loading analytics...
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
    <>
      {/* Placeholder for Bar Chart */}
      <div className="rounded-3xl border border-slate-100 bg-white p-8 shadow-sm">
        <h3 className="mb-6 text-lg font-semibold text-slate-900">Reviews Acquired Over Time</h3>
        <div className="flex h-64 items-end justify-between gap-2">
          {[65, 80, 45, 90, 70, 85, 95].map((height, idx) => (
            <div key={idx} className="flex-1">
              <div
                className="w-full rounded-t-lg bg-gradient-to-t from-blue-600 to-blue-400"
                style={{ height: `${height}%` }}
              />
              <p className="mt-2 text-center text-xs text-slate-500">Day {idx + 1}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Active Products Table */}
      <div className="rounded-3xl border border-slate-100 bg-white shadow-sm">
        <div className="border-b border-slate-100 p-6">
          <h3 className="text-lg font-semibold text-slate-900">Active Products & Slots Remaining</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50 text-xs uppercase tracking-wider text-slate-500">
              <tr>
                <th className="px-6 py-4">Product</th>
                <th className="px-6 py-4">Total Slots</th>
                <th className="px-6 py-4">Filled</th>
                <th className="px-6 py-4">Remaining</th>
                <th className="px-6 py-4">Status</th>
              </tr>
            </thead>
            <tbody>
              {campaigns.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-8 text-center text-slate-500">
                    No campaigns found
                  </td>
                </tr>
              ) : (
                campaigns.map((campaign) => (
                  <tr key={campaign.id} className="border-t border-slate-100">
                    <td className="px-6 py-4 font-semibold text-slate-900">{campaign.productName}</td>
                    <td className="px-6 py-4 text-slate-600">{campaign.quantity}</td>
                    <td className="px-6 py-4 text-slate-600">{campaign.reviewsReceived}</td>
                    <td className="px-6 py-4 font-semibold text-green-600">{campaign.slotsRemaining}</td>
                    <td className="px-6 py-4">
                      <span
                        className={`rounded-full px-3 py-1 text-xs font-semibold ${
                          campaign.status === "active"
                            ? "bg-green-100 text-green-700"
                            : campaign.status === "paused"
                            ? "bg-yellow-100 text-yellow-700"
                            : "bg-slate-100 text-slate-700"
                        }`}
                      >
                        {campaign.status}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

