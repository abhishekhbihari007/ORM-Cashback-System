"use client";

import { useEffect, useState } from "react";
import { brandApi, type BrandReview } from "@/lib/backend-api";
import { ReviewReportList } from "./review-report-list";
import { ReviewReport } from "@/lib/types";

function mapBrandReviewToReviewReport(review: BrandReview): ReviewReport {
  return {
    id: review.id.toString(),
    campaignId: review.order?.toString() || "",
    productName: review.product_name || "Unknown Product",
    reviewLink: review.review_url || "#",
    reviewerName: "User", // Backend doesn't provide reviewer name, using placeholder
    rating: review.rating,
    postedAt: review.review_url ? new Date().toISOString() : new Date().toISOString(), // Backend doesn't provide posted date
    verified: review.status === "APPROVED",
  };
}

export function ReviewReportsClient() {
  const [reports, setReports] = useState<ReviewReport[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadReports = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const response = await brandApi.getReviews();
        const mappedReports = response.reviews
          .filter((review) => review.review_url) // Only show reviews with URLs
          .map(mapBrandReviewToReviewReport);
        setReports(mappedReports);
      } catch (err: any) {
        setError(err.message || "Unable to load review reports. Please try again.");
      } finally {
        setIsLoading(false);
      }
    };

    loadReports();
  }, []);

  if (isLoading) {
    return (
      <div className="rounded-3xl border border-slate-100 bg-white p-10 text-center text-slate-500">
        Loading review reports...
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

  return <ReviewReportList reports={reports} />;
}

