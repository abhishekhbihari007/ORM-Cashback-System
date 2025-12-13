"use client";

import { useCallback, useEffect, useState } from "react";
import { adminApi, type AdminReview } from "@/lib/backend-api";
import { ReviewPipeline } from "@/components/sections/brand/review-pipeline";
import { ReviewRequest } from "@/lib/types";

function mapAdminReviewToReviewRequest(adminReview: AdminReview): ReviewRequest {
  return {
    id: adminReview.id.toString(),
    productId: adminReview.product.toString(),
    reviewerName: adminReview.user_name || "Unknown",
    dueDate: adminReview.submitted_at || adminReview.created_at,
    sentiment: "positive", // Default, not available in backend
    status: adminReview.status.toLowerCase() as "pending" | "submitted" | "flagged",
  };
}

export function AdminReviewPipelineClient() {
  const [requests, setRequests] = useState<ReviewRequest[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadReviews = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      const response = await adminApi.getSubmissions();
      setRequests(response.pending_reviews.data.map(mapAdminReviewToReviewRequest));
    } catch (err: any) {
      setError(err.message || "Failed to load reviews");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadReviews();
  }, [loadReviews]);

  if (isLoading) {
    return (
      <div className="rounded-3xl border border-slate-100 bg-white p-12 text-center shadow-sm">
        <p className="text-slate-600">Loading review pipeline...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-3xl border border-red-100 bg-red-50 p-6 text-center shadow-sm">
        <p className="text-red-600">{error}</p>
        <button
          onClick={loadReviews}
          className="mt-4 rounded-full bg-red-600 px-4 py-2 text-sm font-semibold text-white hover:bg-red-700"
        >
          Retry
        </button>
      </div>
    );
  }

  return <ReviewPipeline requests={requests} />;
}


