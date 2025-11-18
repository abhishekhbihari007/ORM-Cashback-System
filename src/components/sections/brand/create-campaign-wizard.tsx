"use client";

import { useState } from "react";
import Image from "next/image";

type Step = 1 | 2 | 3;

export function CreateCampaignWizard() {
  const [step, setStep] = useState<Step>(1);
  const [productLink, setProductLink] = useState("");
  const [quantity, setQuantity] = useState("");
  const [budgetPerReview, setBudgetPerReview] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const totalBudget = quantity && budgetPerReview 
    ? (parseInt(quantity) * parseFloat(budgetPerReview)).toFixed(2)
    : "0";

  const handleNext = () => {
    if (step < 3) {
      setStep((prev) => (prev + 1) as Step);
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep((prev) => (prev - 1) as Step);
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    // In real app, this would create the campaign via API
    setTimeout(() => {
      alert("Campaign created successfully!");
      setIsSubmitting(false);
      // Reset form
      setProductLink("");
      setQuantity("");
      setBudgetPerReview("");
      setStep(1);
    }, 1500);
  };

  return (
    <div className="mx-auto max-w-3xl">
      {/* Progress Steps */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          {[1, 2, 3].map((stepNum) => (
            <div key={stepNum} className="flex flex-1 items-center">
              <div className="flex flex-col items-center">
                <div
                  className={`flex h-12 w-12 items-center justify-center rounded-full border-2 font-semibold transition ${
                    step >= stepNum
                      ? "border-blue-600 bg-blue-600 text-white"
                      : "border-slate-300 bg-white text-slate-400"
                  }`}
                >
                  {stepNum}
                </div>
                <p
                  className={`mt-2 text-xs font-semibold ${
                    step >= stepNum ? "text-slate-900" : "text-slate-400"
                  }`}
                >
                  {stepNum === 1 ? "Product Link" : stepNum === 2 ? "Quantity" : "Budget"}
                </p>
              </div>
              {stepNum < 3 && (
                <div
                  className={`mx-2 h-1 flex-1 rounded ${
                    step > stepNum ? "bg-blue-600" : "bg-slate-200"
                  }`}
                />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Step Content */}
      <div className="rounded-3xl border border-slate-100 bg-white p-8 shadow-sm">
        {step === 1 && (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-slate-900">Step 1: Product Link</h2>
              <p className="mt-2 text-slate-600">
                Paste the Amazon, Flipkart, or Nykaa product URL you want reviews for.
              </p>
            </div>
            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700">
                Product URL
              </label>
              <input
                type="url"
                value={productLink}
                onChange={(e) => setProductLink(e.target.value)}
                placeholder="https://amazon.in/dp/..."
                className="w-full rounded-xl border border-slate-200 px-4 py-3 focus:border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-100"
              />
              {productLink && (
                <div className="mt-4 rounded-xl border border-slate-200 bg-slate-50 p-4">
                  <p className="text-sm font-semibold text-slate-900">Preview</p>
                  <p className="mt-1 text-sm text-slate-600">{productLink}</p>
                </div>
              )}
            </div>
            <div className="flex justify-end">
              <button
                onClick={handleNext}
                disabled={!productLink}
                className="rounded-full bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Next →
              </button>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-slate-900">Step 2: Add Slots</h2>
              <p className="mt-2 text-slate-600">
                How many reviews do you need? This sets the number of slots (reviews required) for this campaign.
              </p>
            </div>
            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700">
                Number of Slots (Reviews Required)
              </label>
              <input
                type="number"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                placeholder="50"
                min="1"
                className="w-full rounded-xl border border-slate-200 px-4 py-3 text-lg focus:border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-100"
              />
              <p className="mt-2 text-xs text-slate-500">
                Each slot represents one review. Users will fill these slots by purchasing and reviewing your product.
              </p>
            </div>
            <div className="flex justify-between">
              <button
                onClick={handleBack}
                className="rounded-full border border-slate-200 px-6 py-3 font-semibold text-slate-600 transition hover:bg-slate-50"
              >
                ← Back
              </button>
              <button
                onClick={handleNext}
                disabled={!quantity || parseInt(quantity) <= 0}
                className="rounded-full bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Next →
              </button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-slate-900">Step 3: Budget</h2>
              <p className="mt-2 text-slate-600">
                Set the cost per review. This is the amount you'll pay for each approved review.
              </p>
            </div>
            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700">
                Cost per Review (₹)
              </label>
              <input
                type="number"
                value={budgetPerReview}
                onChange={(e) => setBudgetPerReview(e.target.value)}
                placeholder="100"
                min="1"
                step="0.01"
                className="w-full rounded-xl border border-slate-200 px-4 py-3 text-lg focus:border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-100"
              />
            </div>
            <div className="rounded-xl bg-blue-50 p-6">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-slate-600">Quantity</span>
                  <span className="font-semibold text-slate-900">{quantity || 0} reviews</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-600">Cost per Review</span>
                  <span className="font-semibold text-slate-900">
                    ₹{budgetPerReview || "0"}
                  </span>
                </div>
                <div className="border-t border-blue-200 pt-2">
                  <div className="flex justify-between">
                    <span className="font-semibold text-slate-900">Total Budget</span>
                    <span className="text-xl font-bold text-blue-700">₹{totalBudget}</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex justify-between">
              <button
                onClick={handleBack}
                className="rounded-full border border-slate-200 px-6 py-3 font-semibold text-slate-600 transition hover:bg-slate-50"
              >
                ← Back
              </button>
              <button
                onClick={handleSubmit}
                disabled={isSubmitting || !budgetPerReview || parseFloat(budgetPerReview) <= 0}
                className="rounded-full bg-gradient-to-r from-green-600 to-emerald-600 px-6 py-3 font-semibold text-white shadow-lg shadow-green-200 transition hover:from-green-700 hover:to-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? "Creating..." : "Create Campaign"}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

