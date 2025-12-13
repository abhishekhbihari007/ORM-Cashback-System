"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { RefreshCw, Star } from "lucide-react";
import { StatusBadge } from "@/components/ui/status-badge";
import { brandApi, type BrandReview } from "@/lib/backend-api";

const STATUS_COPY: Record<
  NonNullable<BrandReview["status"]>,
  { label: string; variant: "primary" | "success" | "warning" | "danger" | "neutral" }
> = {
  PENDING: { label: "Pending", variant: "warning" },
  APPROVED: { label: "Approved", variant: "success" },
  REJECTED: { label: "Rejected", variant: "danger" },
};

export function BrandReviewsScreen() {
  const [reviews, setReviews] = useState<BrandReview[]>([]);
  const [summary, setSummary] = useState({
    total: 0,
    pending: 0,
    approved: 0,
    rejected: 0,
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<BrandReview["status"] | "ALL">("ALL");

  const loadReviews = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      const response = await brandApi.getReviews();
      setReviews(response.reviews);
      setSummary(response.summary);
    } catch (err: any) {
      setError(err.message || "Failed to load reviews.");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadReviews();
  }, [loadReviews]);

  const filteredReviews = useMemo(() => {
    let filtered = reviews;
    if (statusFilter !== "ALL") {
      filtered = filtered.filter((review) => review.status === statusFilter);
    }
    if (search.trim()) {
      const query = search.toLowerCase();
      filtered = filtered.filter(
        (review) =>
          review.product_name.toLowerCase().includes(query) ||
          (review.user_name || "").toLowerCase().includes(query) ||
          (review.review_url || "").toLowerCase().includes(query)
      );
    }
    return filtered;
  }, [reviews, search, statusFilter]);

  return (
    <div className="page-wrapper bg-slate-50">
      <div className="container-responsive space-y-6 py-10">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="section-title">Reviews</p>
            <h1 className="text-4xl font-bold text-slate-900">Monitor review submissions</h1>
            <p className="text-slate-600">
              Track every shopper submission, verify ratings, and jump to the live listing.
            </p>
          </div>
          <button
            onClick={loadReviews}
            className="inline-flex items-center gap-2 rounded-full border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-600 hover:bg-white disabled:opacity-50"
            disabled={isLoading}
          >
            <RefreshCw className={`h-4 w-4 ${isLoading ? "animate-spin" : ""}`} />
            Refresh
          </button>
        </div>

        {error && (
          <div className="rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">
            {error}
          </div>
        )}

        <div className="grid gap-4 md:grid-cols-4">
          {[
            { label: "Total Reviews", value: summary.total },
            { label: "Pending", value: summary.pending },
            { label: "Approved", value: summary.approved },
            { label: "Rejected", value: summary.rejected },
          ].map((card) => (
            <div key={card.label} className="rounded-3xl border border-slate-100 bg-white p-4 shadow-sm">
              <p className="text-sm font-semibold uppercase text-slate-500">{card.label}</p>
              <p className="mt-2 text-3xl font-bold text-slate-900">{card.value}</p>
            </div>
          ))}
        </div>

        <div className="rounded-3xl border border-slate-100 bg-white p-4 shadow-sm">
          <div className="mb-4 flex flex-wrap items-center gap-4">
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search reviews by product, shopper, or link"
              className="flex-1 rounded-2xl border border-slate-200 px-4 py-3 text-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-100"
            />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value as BrandReview["status"] | "ALL")}
              className="rounded-2xl border border-slate-200 px-4 py-3 text-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-100"
            >
              <option value="ALL">All statuses</option>
              <option value="PENDING">Pending</option>
              <option value="APPROVED">Approved</option>
              <option value="REJECTED">Rejected</option>
            </select>
            <span className="text-sm text-slate-500">
              Showing {filteredReviews.length} of {reviews.length}
            </span>
          </div>

          {isLoading ? (
            <div className="py-10 text-center text-sm text-slate-500">Loading reviews…</div>
          ) : filteredReviews.length === 0 ? (
            <div className="py-10 text-center text-sm text-slate-500">No reviews match your filters.</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
                  <tr>
                    <th className="px-4 py-3">Product</th>
                    <th className="px-4 py-3">Shopper</th>
                    <th className="px-4 py-3">Rating</th>
                    <th className="px-4 py-3">Status</th>
                    <th className="px-4 py-3">Review</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredReviews.map((review) => {
                    const status = STATUS_COPY[review.status] || STATUS_COPY.PENDING;
                    return (
                      <tr key={review.id} className="border-t border-slate-100">
                        <td className="px-4 py-4">
                          <p className="font-semibold text-slate-900">{review.product_name}</p>
                          <p className="text-xs text-slate-500">Order #{review.order_id}</p>
                        </td>
                        <td className="px-4 py-4">
                          <p className="font-semibold text-slate-900">{review.user_name || "—"}</p>
                          <p className="text-xs text-slate-500">{review.user_email || "—"}</p>
                        </td>
                        <td className="px-4 py-4">
                          <span className="inline-flex items-center gap-1 font-semibold text-slate-900">
                            <Star className="h-4 w-4 text-amber-500" />
                            {review.rating?.toFixed(1) ?? "—"}
                          </span>
                        </td>
                        <td className="px-4 py-4">
                          <StatusBadge label={status.label} variant={status.variant} />
                        </td>
                        <td className="px-4 py-4 text-sm">
                          {review.review_url ? (
                            <a
                              href={review.review_url}
                              target="_blank"
                              rel="noreferrer"
                              className="text-indigo-600 hover:underline"
                            >
                              View link
                            </a>
                          ) : (
                            <span className="text-slate-400">Not provided</span>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}


