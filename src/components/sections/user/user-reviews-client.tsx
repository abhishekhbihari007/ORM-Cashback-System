"use client";

import { useEffect, useState } from "react";
import { userApi, type BrandReview } from "@/lib/backend-api";
import { ReviewRequest } from "@/lib/types";
import { ReviewHistory } from "@/components/sections/user/review-history";

const mapReview = (review: BrandReview): ReviewRequest => {
  let status: ReviewRequest["status"] = "pending";
  if (review.status === "APPROVED") {
    status = "submitted";
  } else if (review.status === "REJECTED") {
    status = "flagged";
  }

  return {
    id: String(review.id),
    productId: String(review.product),
    reviewerName: review.user_name || "You",
    dueDate: review.created_at,
    sentiment: review.rating >= 4 ? "positive" : "neutral",
    status,
  };
};

export function UserReviewsClient() {
  const [reviews, setReviews] = useState<ReviewRequest[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        setIsLoading(true);
        const response = await userApi.getReviews();
        setReviews(response.reviews.map(mapReview));
      } finally {
        setIsLoading(false);
      }
    };

    load();
  }, []);

  if (isLoading && reviews.length === 0) {
    return <p className="text-sm text-slate-500">Loading reviews…</p>;
  }

  return <ReviewHistory reviews={reviews} />;
}


