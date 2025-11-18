"use client";

import { useState } from "react";
import { BudgetSnapshot } from "@/lib/types";
import { StatCard } from "@/components/ui/stat-card";

type Props = {
  budget: BudgetSnapshot;
};

export function AddFundsWallet({ budget }: Props) {
  const [amount, setAmount] = useState("");
  const [paymentMethod, setPaymentMethod] = useState<"razorpay" | "stripe">("razorpay");
  const [isProcessing, setIsProcessing] = useState(false);

  const handleAddFunds = async () => {
    const amountNum = parseFloat(amount);
    if (isNaN(amountNum) || amountNum <= 0) {
      alert("Please enter a valid amount");
      return;
    }

    setIsProcessing(true);
    // In real app, this would integrate with Razorpay/Stripe
    setTimeout(() => {
      alert(`Payment of ₹${amountNum} would be processed via ${paymentMethod}`);
      setIsProcessing(false);
      setAmount("");
    }, 1500);
  };

  const quickAmounts = [1000, 5000, 10000, 25000, 50000];

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr,1.2fr]">
      {/* Current Balance */}
      <div className="space-y-6">
        <div className="rounded-3xl border border-slate-100 bg-white p-6 shadow-sm">
          <h3 className="text-lg font-semibold text-slate-900">Current Balance</h3>
          <div className="mt-4 space-y-4">
            <StatCard
              label="Available"
              value={`${budget.currency} ${budget.available.toLocaleString()}`}
              helper="Ready to use"
            />
            <StatCard
              label="Utilized"
              value={`${budget.currency} ${budget.utilized.toLocaleString()}`}
              helper="Spent this month"
            />
            <StatCard
              label="Total Allocated"
              value={`${budget.currency} ${budget.allocated.toLocaleString()}`}
              helper="All time"
            />
          </div>
        </div>

        <div className="rounded-3xl border border-slate-100 bg-white p-6 shadow-sm">
          <h3 className="mb-4 text-lg font-semibold text-slate-900">Payment Methods</h3>
          <div className="space-y-3">
            <button
              onClick={() => setPaymentMethod("razorpay")}
              className={`w-full rounded-xl border-2 p-4 text-left transition ${
                paymentMethod === "razorpay"
                  ? "border-blue-600 bg-blue-50"
                  : "border-slate-200 bg-white hover:border-slate-300"
              }`}
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-semibold text-slate-900">Razorpay</p>
                  <p className="text-sm text-slate-600">UPI, Cards, Net Banking</p>
                </div>
                {paymentMethod === "razorpay" && (
                  <div className="h-5 w-5 rounded-full bg-blue-600"></div>
                )}
              </div>
            </button>
            <button
              onClick={() => setPaymentMethod("stripe")}
              className={`w-full rounded-xl border-2 p-4 text-left transition ${
                paymentMethod === "stripe"
                  ? "border-blue-600 bg-blue-50"
                  : "border-slate-200 bg-white hover:border-slate-300"
              }`}
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-semibold text-slate-900">Stripe</p>
                  <p className="text-sm text-slate-600">International Cards</p>
                </div>
                {paymentMethod === "stripe" && (
                  <div className="h-5 w-5 rounded-full bg-blue-600"></div>
                )}
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Add Funds Form */}
      <div className="rounded-3xl border border-slate-100 bg-white p-6 shadow-sm">
        <h3 className="mb-6 text-lg font-semibold text-slate-900">Add Funds</h3>

        <div className="space-y-6">
          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-700">Amount</label>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="Enter amount"
              className="w-full rounded-xl border border-slate-200 px-4 py-3 text-lg font-semibold focus:border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-100"
            />
          </div>

          <div>
            <p className="mb-3 text-sm font-semibold text-slate-700">Quick Amounts</p>
            <div className="grid grid-cols-5 gap-2">
              {quickAmounts.map((quickAmount) => (
                <button
                  key={quickAmount}
                  onClick={() => setAmount(quickAmount.toString())}
                  className="rounded-lg border border-slate-200 px-3 py-2 text-sm font-semibold text-slate-600 transition hover:border-blue-600 hover:text-blue-600"
                >
                  ₹{quickAmount.toLocaleString()}
                </button>
              ))}
            </div>
          </div>

          <div className="rounded-xl bg-slate-50 p-4">
            <div className="flex items-center justify-between text-sm">
              <span className="text-slate-600">Amount to add</span>
              <span className="font-semibold text-slate-900">
                ₹{amount ? parseFloat(amount).toLocaleString() : "0"}
              </span>
            </div>
            <div className="mt-2 flex items-center justify-between text-sm">
              <span className="text-slate-600">Processing fee (0%)</span>
              <span className="font-semibold text-slate-900">₹0</span>
            </div>
            <div className="mt-3 border-t border-slate-200 pt-3">
              <div className="flex items-center justify-between">
                <span className="font-semibold text-slate-900">Total</span>
                <span className="text-lg font-bold text-slate-900">
                  ₹{amount ? parseFloat(amount).toLocaleString() : "0"}
                </span>
              </div>
            </div>
          </div>

          <button
            onClick={handleAddFunds}
            disabled={isProcessing || !amount || parseFloat(amount) <= 0}
            className="w-full rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-4 text-lg font-semibold text-white shadow-lg shadow-blue-200 transition hover:from-blue-700 hover:to-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isProcessing ? "Processing..." : `Pay via ${paymentMethod === "razorpay" ? "Razorpay" : "Stripe"}`}
          </button>

          <p className="text-center text-xs text-slate-500">
            Secure payment processing. Your funds will be available immediately after payment.
          </p>
        </div>
      </div>
    </div>
  );
}

