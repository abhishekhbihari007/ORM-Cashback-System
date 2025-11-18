"use client";

import { useState } from "react";

export function UploadProofForm() {
  const [orderScreenshot, setOrderScreenshot] = useState<File | null>(null);
  const [reviewScreenshot, setReviewScreenshot] = useState<File | null>(null);
  const [reviewLink, setReviewLink] = useState("");
  const [orderId, setOrderId] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleOrderUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setOrderScreenshot(file);
    }
  };

  const handleReviewUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setReviewScreenshot(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // In real app, this would upload files and submit to API
    setTimeout(() => {
      alert("Proof uploaded successfully! Your cashback is pending approval.");
      setIsSubmitting(false);
      setOrderScreenshot(null);
      setReviewScreenshot(null);
      setReviewLink("");
      setOrderId("");
    }, 1500);
  };

  return (
    <form onSubmit={handleSubmit} className="mx-auto max-w-2xl space-y-6">
      <div className="rounded-3xl border border-slate-100 bg-white p-6 shadow-sm">
        <h2 className="mb-6 text-xl font-bold text-slate-900">Upload Your Proof</h2>

        <div className="space-y-6">
          {/* Order ID */}
          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-700">
              Order ID <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={orderId}
              onChange={(e) => setOrderId(e.target.value)}
              placeholder="Enter your order ID"
              required
              className="w-full rounded-xl border border-slate-200 px-4 py-3 focus:border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-100"
            />
          </div>

          {/* Order Screenshot */}
          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-700">
              Order Screenshot <span className="text-red-500">*</span>
            </label>
            <div className="space-y-3">
              <input
                type="file"
                accept="image/*"
                onChange={handleOrderUpload}
                required
                className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm focus:border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-100"
              />
              {orderScreenshot && (
                <div className="rounded-lg bg-green-50 p-3 text-sm text-green-700">
                  ✓ {orderScreenshot.name} selected
                </div>
              )}
            </div>
            <p className="mt-1 text-xs text-slate-500">
              Upload a screenshot of your order confirmation from Amazon/Flipkart
            </p>
          </div>

          {/* Review Screenshot */}
          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-700">
              Review Screenshot <span className="text-red-500">*</span>
            </label>
            <div className="space-y-3">
              <input
                type="file"
                accept="image/*"
                onChange={handleReviewUpload}
                required
                className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm focus:border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-100"
              />
              {reviewScreenshot && (
                <div className="rounded-lg bg-green-50 p-3 text-sm text-green-700">
                  ✓ {reviewScreenshot.name} selected
                </div>
              )}
            </div>
            <p className="mt-1 text-xs text-slate-500">
              Upload a screenshot of your posted review on the marketplace
            </p>
          </div>

          {/* Review Link */}
          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-700">
              Review Link <span className="text-red-500">*</span>
            </label>
            <input
              type="url"
              value={reviewLink}
              onChange={(e) => setReviewLink(e.target.value)}
              placeholder="https://amazon.in/reviews/..."
              required
              className="w-full rounded-xl border border-slate-200 px-4 py-3 focus:border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-100"
            />
            <p className="mt-1 text-xs text-slate-500">
              Paste the direct link to your review on Amazon/Flipkart
            </p>
          </div>
        </div>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full rounded-full bg-gradient-to-r from-green-600 to-emerald-600 px-6 py-4 text-lg font-semibold text-white shadow-lg shadow-green-200 transition hover:from-green-700 hover:to-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isSubmitting ? "Uploading..." : "Submit Proof & Request Cashback"}
      </button>

      <p className="text-center text-xs text-slate-500">
        Your cashback will be approved within 24-48 hours after verification.
      </p>
    </form>
  );
}

