"use client";

import { useState } from "react";
import Image from "next/image";
import { PendingReview } from "@/lib/types";
import { StatusBadge } from "@/components/ui/status-badge";

type Props = {
  reviews: PendingReview[];
};

export function VerifierScreen({ reviews }: Props) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [processedReviews, setProcessedReviews] = useState<Set<string>>(new Set());

  const currentReview = reviews[currentIndex];
  const pendingCount = reviews.filter((r) => !processedReviews.has(r.id)).length;

  if (!currentReview || processedReviews.has(currentReview.id)) {
    return (
      <div className="rounded-3xl border border-slate-100 bg-white p-12 text-center shadow-sm">
        <p className="text-xl font-semibold text-slate-900">All reviews processed!</p>
        <p className="mt-2 text-slate-600">No pending reviews to verify.</p>
      </div>
    );
  }

  const handleApprove = () => {
    setProcessedReviews((prev) => new Set([...prev, currentReview.id]));
    if (currentIndex < reviews.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    }
  };

  const handleReject = () => {
    setProcessedReviews((prev) => new Set([...prev, currentReview.id]));
    if (currentIndex < reviews.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between rounded-2xl border border-slate-100 bg-white px-6 py-4 shadow-sm">
        <div>
          <p className="text-sm font-semibold text-slate-900">
            Review {currentIndex + 1} of {reviews.length}
          </p>
          <p className="text-xs text-slate-500">{pendingCount} pending reviews</p>
        </div>
        <StatusBadge label={currentReview.status} variant="primary" />
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Left Side - User Uploads */}
        <div className="space-y-4 rounded-3xl border border-slate-100 bg-white p-6 shadow-sm">
          <h3 className="text-lg font-semibold text-slate-900">User Submissions</h3>
          
          <div className="space-y-4">
            <div>
              <p className="mb-2 text-sm font-semibold text-slate-700">User Information</p>
              <div className="rounded-xl bg-slate-50 p-4">
                <p className="font-semibold text-slate-900">{currentReview.userName}</p>
                <p className="text-sm text-slate-600">Order ID: {currentReview.orderId}</p>
                <p className="text-xs text-slate-500">
                  Submitted: {new Date(currentReview.submittedAt).toLocaleDateString()}
                </p>
              </div>
            </div>

            <div>
              <p className="mb-2 text-sm font-semibold text-slate-700">Order Screenshot</p>
              <div className="relative h-64 w-full overflow-hidden rounded-xl border border-slate-200 bg-slate-50">
                <Image
                  src={currentReview.orderScreenshot}
                  alt="Order screenshot"
                  fill
                  className="object-contain"
                />
                <div className="absolute bottom-2 right-2 flex gap-2">
                  <button className="rounded-lg bg-white px-3 py-1 text-xs font-semibold text-slate-700 shadow-md hover:bg-slate-50">
                    Zoom In
                  </button>
                  <button className="rounded-lg bg-white px-3 py-1 text-xs font-semibold text-slate-700 shadow-md hover:bg-slate-50">
                    Zoom Out
                  </button>
                </div>
              </div>
            </div>

            <div>
              <p className="mb-2 text-sm font-semibold text-slate-700">Review Screenshot</p>
              <div className="relative h-64 w-full overflow-hidden rounded-xl border border-slate-200 bg-slate-50">
                <Image
                  src={currentReview.reviewScreenshot}
                  alt="Review screenshot"
                  fill
                  className="object-contain"
                />
              </div>
            </div>

            <div>
              <p className="mb-2 text-sm font-semibold text-slate-700">Review Link</p>
              <a
                href={currentReview.reviewLink}
                target="_blank"
                rel="noopener noreferrer"
                className="block truncate rounded-lg bg-blue-50 px-4 py-2 text-sm text-blue-600 hover:bg-blue-100"
              >
                {currentReview.reviewLink} →
              </a>
            </div>
          </div>
        </div>

        {/* Right Side - Brand Requirements */}
        <div className="space-y-4 rounded-3xl border border-slate-100 bg-white p-6 shadow-sm">
          <h3 className="text-lg font-semibold text-slate-900">Brand Requirements</h3>
          
          <div className="space-y-4">
            <div>
              <p className="mb-2 text-sm font-semibold text-slate-700">Product</p>
              <div className="flex items-center gap-4 rounded-xl bg-slate-50 p-4">
                <div className="relative h-16 w-16 overflow-hidden rounded-lg">
                  <Image
                    src={currentReview.productImage}
                    alt={currentReview.productName}
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <p className="font-semibold text-slate-900">{currentReview.productName}</p>
                </div>
              </div>
            </div>

            <div>
              <p className="mb-2 text-sm font-semibold text-slate-700">Required Rating</p>
              <div className="rounded-xl bg-yellow-50 p-4">
                <p className="text-2xl font-bold text-yellow-700">
                  {currentReview.brandRequirements.rating} ⭐ Required
                </p>
              </div>
            </div>

            <div>
              <p className="mb-2 text-sm font-semibold text-slate-700">Must Include</p>
              <div className="space-y-2">
                {currentReview.brandRequirements.mustInclude.map((item, idx) => (
                  <div key={idx} className="rounded-lg bg-green-50 px-4 py-2 text-sm text-green-700">
                    ✓ {item}
                  </div>
                ))}
              </div>
            </div>

            <div>
              <p className="mb-2 text-sm font-semibold text-slate-700">Must Not Include</p>
              <div className="space-y-2">
                {currentReview.brandRequirements.mustNotInclude.map((item, idx) => (
                  <div key={idx} className="rounded-lg bg-red-50 px-4 py-2 text-sm text-red-700">
                    ✗ {item}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-4">
        <button
          onClick={handleReject}
          className="flex-1 rounded-full border-2 border-red-200 bg-white px-6 py-4 text-lg font-semibold text-red-600 transition hover:bg-red-50"
        >
          Reject
        </button>
        <button
          onClick={handleApprove}
          className="flex-1 rounded-full bg-gradient-to-r from-green-600 to-emerald-600 px-6 py-4 text-lg font-semibold text-white shadow-lg shadow-green-200 transition hover:from-green-700 hover:to-emerald-700"
        >
          Approve & Release Money
        </button>
      </div>
    </div>
  );
}

