"use client";

import { useCallback, useEffect, useState } from "react";
import { adminApi, type AdminReview, type AdminOrder } from "@/lib/backend-api";
import { VerifierScreen } from "@/components/sections/admin/verifier-screen";
import { PendingReview } from "@/lib/types";

function mapToPendingReview(review: AdminReview, order?: AdminOrder): PendingReview {
  // Purchase proof is not provided in admin order data; use placeholder
  const orderScreenshot = '/placeholder-order.png';
  // Use review URL as proof if available; otherwise placeholder
  const reviewScreenshot = review.review_url || '/placeholder-review.png';

  return {
    id: review.id.toString(),
    userId: review.user_email || "",
    userName: review.user_name || "Unknown",
    productName: review.product_name,
    productImage: "/placeholder-product.png",
    orderId: review.order_id,
    orderScreenshot,
    reviewScreenshot,
    reviewLink: review.review_url || "#",
    brandRequirements: {
      rating: review.rating || 5,
      mustInclude: [],
      mustNotInclude: [],
    },
    submittedAt: review.created_at,
    status: review.status.toLowerCase() as "pending" | "approved" | "rejected",
  };
}

export function AdminVerifierClient() {
  const [reviews, setReviews] = useState<PendingReview[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [showRejectModal, setShowRejectModal] = useState(false);
  const [rejectReason, setRejectReason] = useState("");
  const [pendingRejectId, setPendingRejectId] = useState<string | null>(null);

  const loadReviews = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      const response = await adminApi.getSubmissions();
      
      // Map reviews to pending reviews
      // Note: We'd need order data for purchase_proof, but for now we'll use what we have
      const pendingReviews = response.pending_reviews.data.map((review) => 
        mapToPendingReview(review)
      );
      
      setReviews(pendingReviews);
    } catch (err: any) {
      setError(err.message || "Failed to load pending reviews");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadReviews();
  }, [loadReviews]);

  const handleApprove = async (reviewId: string) => {
    setIsProcessing(true);
    setError(null);
    setSuccess(null);
    try {
      await adminApi.approveReview(parseInt(reviewId));
      await loadReviews(); // Refresh list
      setSuccess("Review approved successfully!");
      setTimeout(() => setSuccess(null), 3000);
    } catch (err: any) {
      setError(err.message || "Failed to approve review");
    } finally {
      setIsProcessing(false);
    }
  };

  const handleRejectClick = (reviewId: string) => {
    setPendingRejectId(reviewId);
    setRejectReason("");
    setShowRejectModal(true);
  };

  const confirmReject = async () => {
    if (!pendingRejectId) return;
    
    setIsProcessing(true);
    setError(null);
    setSuccess(null);
    try {
      await adminApi.rejectReview(parseInt(pendingRejectId), rejectReason.trim() || undefined);
      await loadReviews(); // Refresh list
      setShowRejectModal(false);
      setRejectReason("");
      setPendingRejectId(null);
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
      <div className="rounded-3xl border border-slate-100 bg-white p-12 text-center shadow-sm">
        <p className="text-slate-600">Loading pending reviews...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="space-y-4">
        <div className="rounded-3xl border border-red-100 bg-red-50 p-6 text-center shadow-sm">
          <p className="text-red-600">{error}</p>
          <button
            onClick={loadReviews}
            className="mt-4 rounded-full bg-red-600 px-4 py-2 text-sm font-semibold text-white hover:bg-red-700"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  if (reviews.length === 0) {
    return (
      <div className="rounded-3xl border border-slate-100 bg-white p-12 text-center shadow-sm">
        <p className="text-xl font-semibold text-slate-900">No pending reviews</p>
        <p className="mt-2 text-slate-600">All reviews have been processed.</p>
      </div>
    );
  }

  return (
    <>
      {error && (
        <div className="mb-4 rounded-lg border border-red-200 bg-red-50 p-4 text-red-800">
          <div className="flex items-center justify-between">
            <span>{error}</span>
            <button
              onClick={() => setError(null)}
              className="text-red-600 hover:text-red-800"
            >
              ×
            </button>
          </div>
        </div>
      )}

      {success && (
        <div className="mb-4 rounded-lg border border-green-200 bg-green-50 p-4 text-green-800">
          <div className="flex items-center justify-between">
            <span>{success}</span>
            <button
              onClick={() => setSuccess(null)}
              className="text-green-600 hover:text-green-800"
            >
              ×
            </button>
          </div>
        </div>
      )}

      <VerifierScreen 
        reviews={reviews} 
        onApprove={handleApprove}
        onReject={handleRejectClick}
      />

      {/* Reject Modal */}
      {showRejectModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-6">
            <h2 className="mb-4 text-xl font-semibold text-slate-900">Reject Review</h2>
            <p className="mb-4 text-sm text-slate-600">
              Please provide a reason for rejecting this review (optional).
            </p>
            <textarea
              value={rejectReason}
              onChange={(e) => setRejectReason(e.target.value)}
              placeholder="Enter rejection reason (optional)..."
              className="w-full rounded-lg border border-slate-300 p-3 text-sm"
              rows={4}
            />
            <div className="mt-4 flex justify-end gap-3">
              <button
                onClick={() => {
                  setShowRejectModal(false);
                  setRejectReason("");
                  setPendingRejectId(null);
                }}
                className="rounded-lg border border-slate-300 px-4 py-2 text-slate-700 hover:bg-slate-50"
              >
                Cancel
              </button>
              <button
                onClick={confirmReject}
                disabled={isProcessing}
                className="rounded-lg bg-red-600 px-4 py-2 text-white hover:bg-red-700 disabled:opacity-50"
              >
                {isProcessing ? "Rejecting..." : "Reject"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

