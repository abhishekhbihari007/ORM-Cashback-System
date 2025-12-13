"use client";

import { useState, useEffect } from "react";
import { brandApi, type BrandReview, type BrandOrder } from "@/lib/backend-api";
import { PendingReview } from "@/lib/types";
import Image from "next/image";
import { Icons } from "@/lib/icons";

function mapToPendingReview(review: BrandReview, order?: BrandOrder): PendingReview {
  return {
    id: review.id.toString(),
    userId: review.order?.toString() || "",
    userName: "User", // Backend doesn't provide user name
    productName: review.product_name || "Unknown Product",
    productImage: "/placeholder-product.png", // Backend doesn't provide product image in review
    orderId: review.order_id || "",
    orderScreenshot: order?.purchase_proof || "/placeholder-order.png",
    reviewScreenshot: "/placeholder-review.png", // Backend doesn't provide review screenshot
    reviewLink: review.review_url || "#",
    brandRequirements: {
      rating: review.rating || 5, // Use the rating from review
      mustInclude: [], // Not available in backend
      mustNotInclude: [], // Not available in backend
    },
    submittedAt: review.created_at,
    status:
      review.status?.toLowerCase() === "approved"
        ? "approved"
        : review.status?.toLowerCase() === "rejected"
        ? "rejected"
        : "pending",
  };
}

export default function BrandReviewModerationPage() {
  const [reviews, setReviews] = useState<PendingReview[]>([]);
  const [orders, setOrders] = useState<BrandOrder[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [processedIds, setProcessedIds] = useState<Set<string>>(new Set());
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [showRejectModal, setShowRejectModal] = useState(false);
  const [rejectReason, setRejectReason] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    const loadData = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const [reviewsResponse, ordersResponse] = await Promise.all([
          brandApi.getReviews(),
          brandApi.getOrders(),
        ]);

        // Filter to only show pending reviews
        const pendingReviews = reviewsResponse.reviews.filter(r => r.status === "PENDING");
        
        // Create a map of order ID to order for quick lookup
        const orderMap = new Map(ordersResponse.orders.map(o => [o.id, o]));
        
        // Map reviews to PendingReview format
        const mappedReviews = pendingReviews.map(review => {
          const order = orderMap.get(review.order);
          return mapToPendingReview(review, order);
        });

        setReviews(mappedReviews);
        setOrders(ordersResponse.orders);
      } catch (err: any) {
        setError(err.message || "Unable to load reviews. Please try again.");
      } finally {
        setIsLoading(false);
      }
    };
    loadData();
  }, []);

  const currentReview = reviews[currentIndex];
  const pendingCount = reviews.filter(r => !processedIds.has(r.id)).length;

  const handleApprove = async () => {
    if (!currentReview) return;
    setIsProcessing(true);
    setError(null);
    setSuccess(null);
    try {
      // In real app, this would call brandApi to approve review
      // For now, we'll just mark it as processed
      setProcessedIds(prev => new Set([...prev, currentReview.id]));
      if (currentIndex < reviews.length - 1) {
        setCurrentIndex(prev => prev + 1);
      }
      setSuccess("Review approved successfully!");
      setTimeout(() => setSuccess(null), 3000);
    } catch (err: any) {
      setError(err.message || "Failed to approve review");
    } finally {
      setIsProcessing(false);
    }
  };

  const handleRejectClick = () => {
    if (!currentReview) return;
    setRejectReason("Does not meet brand requirements");
    setShowRejectModal(true);
  };

  const confirmReject = async () => {
    if (!currentReview) return;
    setIsProcessing(true);
    setError(null);
    setSuccess(null);
    try {
      // In real app, this would call brandApi to reject review
      // For now, we'll just mark it as processed
      setProcessedIds(prev => new Set([...prev, currentReview.id]));
      if (currentIndex < reviews.length - 1) {
        setCurrentIndex(prev => prev + 1);
      }
      setShowRejectModal(false);
      setRejectReason("");
      setSuccess("Review rejected successfully!");
      setTimeout(() => setSuccess(null), 3000);
    } catch (err: any) {
      setError(err.message || "Failed to reject review");
    } finally {
      setIsProcessing(false);
    }
  };

  if (isLoading) {
    return (
      <div className="page-wrapper bg-slate-50">
        <div className="container-responsive py-10">
          <div className="rounded-3xl border border-slate-100 bg-white p-12 text-center shadow-sm">
            <p className="text-xl font-semibold text-slate-900">Loading reviews...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="page-wrapper bg-slate-50">
        <div className="container-responsive py-10">
          <div className="rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">
            <div className="flex items-center justify-between">
              <span>Error: {error}</span>
              <button
                onClick={() => setError(null)}
                className="text-rose-600 hover:text-rose-800"
              >
                <Icons.X className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (reviews.length === 0) {
    return (
      <div className="page-wrapper bg-slate-50">
        <div className="container-responsive py-10">
          <div className="rounded-3xl border border-slate-100 bg-white p-12 text-center shadow-sm">
            <p className="text-xl font-semibold text-slate-900">No pending reviews</p>
            <p className="mt-2 text-slate-600">All reviews have been processed.</p>
          </div>
        </div>
      </div>
    );
  }

  if (!currentReview || processedIds.has(currentReview.id)) {
    return (
      <div className="page-wrapper bg-slate-50">
        <div className="container-responsive py-10">
          <div className="rounded-3xl border border-slate-100 bg-white p-12 text-center shadow-sm">
            <p className="text-xl font-semibold text-slate-900">All reviews processed!</p>
            <p className="mt-2 text-slate-600">No pending reviews to moderate.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
      <div className="page-wrapper bg-slate-50">
        <div className="container-responsive space-y-6 py-10">
          {error && (
            <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-red-800">
              <div className="flex items-center justify-between">
                <span>{error}</span>
                <button
                  onClick={() => setError(null)}
                  className="text-red-600 hover:text-red-800"
                >
                  <Icons.X className="h-4 w-4" />
                </button>
              </div>
            </div>
          )}

          {success && (
            <div className="rounded-lg border border-green-200 bg-green-50 p-4 text-green-800">
              <div className="flex items-center justify-between">
                <span>{success}</span>
                <button
                  onClick={() => setSuccess(null)}
                  className="text-green-600 hover:text-green-800"
                >
                  <Icons.X className="h-4 w-4" />
                </button>
              </div>
            </div>
          )}

          <div>
            <p className="section-title">Review Moderation</p>
            <h1 className="text-4xl font-bold text-slate-900">Approve or Reject Reviews</h1>
            <p className="text-slate-600">
              Review submissions from shoppers and ensure they meet your brand requirements.
            </p>
          </div>

        <div className="flex items-center justify-between rounded-2xl border border-slate-100 bg-white px-6 py-4 shadow-sm">
          <div>
            <p className="text-sm font-semibold text-slate-900">
              Review {currentIndex + 1} of {reviews.length}
            </p>
            <p className="text-xs text-slate-500">{pendingCount} pending reviews</p>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          {/* Left: User Submission */}
          <div className="space-y-4 rounded-3xl border border-slate-100 bg-white p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-slate-900">Shopper Submission</h3>
            
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
                className="inline-flex items-center gap-2 truncate rounded-lg bg-blue-50 px-4 py-2 text-sm text-blue-600 hover:bg-blue-100"
              >
                <Icons.ArrowUpRight className="h-4 w-4" />
                {currentReview.reviewLink}
              </a>
            </div>
          </div>

          {/* Right: Brand Requirements */}
          <div className="space-y-4 rounded-3xl border border-slate-100 bg-white p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-slate-900">Your Requirements</h3>
            
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

            {currentReview.brandRequirements.mustInclude.length > 0 && (
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
            )}

            {currentReview.brandRequirements.mustNotInclude.length > 0 && (
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
            )}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4">
          <button
            onClick={handleRejectClick}
            disabled={isProcessing}
            className="flex-1 rounded-full border-2 border-red-200 bg-white px-6 py-4 text-lg font-semibold text-red-600 transition hover:bg-red-50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Icons.CircleX className="inline h-5 w-5 mr-2" />
            Reject
          </button>
          <button
            onClick={handleApprove}
            disabled={isProcessing}
            className="flex-1 rounded-full bg-gradient-to-r from-green-600 to-emerald-600 px-6 py-4 text-lg font-semibold text-white shadow-lg shadow-green-200 transition hover:from-green-700 hover:to-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {isProcessing ? (
              <>
                <Icons.Spinner className="h-5 w-5" />
                Processing...
              </>
            ) : (
              <>
                <Icons.CircleCheck className="h-5 w-5" />
                Approve & Release Payment
              </>
            )}
          </button>
        </div>

        {/* Reject Modal */}
        {showRejectModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-6">
              <h2 className="mb-4 text-xl font-semibold text-slate-900">Reject Review</h2>
              <p className="mb-4 text-sm text-slate-600">
                Please provide a reason for rejecting this review. This reason will be shown to the user.
              </p>
              <textarea
                value={rejectReason}
                onChange={(e) => setRejectReason(e.target.value)}
                placeholder="Enter rejection reason..."
                className="w-full rounded-lg border border-slate-300 p-3 text-sm"
                rows={4}
              />
              <div className="mt-4 flex justify-end gap-3">
                <button
                  onClick={() => {
                    setShowRejectModal(false);
                    setRejectReason("");
                  }}
                  className="rounded-lg border border-slate-300 px-4 py-2 text-slate-700 hover:bg-slate-50"
                >
                  Cancel
                </button>
                <button
                  onClick={confirmReject}
                  disabled={isProcessing}
                  className="rounded-lg bg-red-600 px-4 py-2 text-white hover:bg-red-700 disabled:opacity-50 flex items-center gap-2"
                >
                  {isProcessing ? (
                    <>
                      <Icons.Spinner className="h-4 w-4" />
                      Rejecting...
                    </>
                  ) : (
                    "Reject"
                  )}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

