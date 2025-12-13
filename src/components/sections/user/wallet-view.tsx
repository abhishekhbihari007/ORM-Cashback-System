"use client";

import { useState } from "react";
import { Wallet } from "@/lib/types";
import { StatCard } from "@/components/ui/stat-card";
import { userApi } from "@/lib/backend-api";
import { Icons } from "@/lib/icons";

type Props = {
  wallet: Wallet;
  onRefresh?: () => void;
};

export function WalletView({ wallet, onRefresh }: Props) {
  const [showWithdrawForm, setShowWithdrawForm] = useState(false);
  const [withdrawAmount, setWithdrawAmount] = useState("");
  const [paymentMethod, setPaymentMethod] = useState<"bank" | "upi">("upi");
  const [accountDetails, setAccountDetails] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleWithdraw = async () => {
    const amount = parseFloat(withdrawAmount);
    if (isNaN(amount) || amount <= 0 || amount > wallet.withdrawableCash) {
      setError("Please enter a valid amount");
      return;
    }

    if (!accountDetails.trim()) {
      setError("Please enter your account details");
      return;
    }

    setIsProcessing(true);
    setError(null);
    setSuccess(null);

    try {
      await userApi.requestWithdrawal(
        amount.toString(),
        paymentMethod,
        accountDetails.trim()
      );
      
      setSuccess(`Withdrawal request of ₹${amount.toFixed(2)} submitted successfully! It will be processed by admin.`);
      setShowWithdrawForm(false);
      setWithdrawAmount("");
      setAccountDetails("");
      
      // Refresh wallet data
      if (onRefresh) {
        setTimeout(() => {
          onRefresh();
        }, 1000);
      }
    } catch (err: any) {
      setError(err.message || "Failed to submit withdrawal request. Please try again.");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Balance Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard
          label="Pending Cashback"
          value={`₹${wallet.pendingCashback.toFixed(2)}`}
          helper="Awaiting approval"
        />
        <StatCard
          label="Withdrawable Cash"
          value={`₹${wallet.withdrawableCash.toFixed(2)}`}
          helper="Ready to withdraw"
        />
        <StatCard
          label="Total Earned"
          value={`₹${wallet.totalEarned.toFixed(2)}`}
          helper="All time"
        />
        <StatCard
          label="Total Withdrawn"
          value={`₹${wallet.totalWithdrawn.toFixed(2)}`}
          helper="History"
        />
      </div>

      {/* Withdraw Section */}
      <div className="rounded-3xl border border-slate-100 bg-white p-6 shadow-sm">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-slate-900">Withdraw Money</h2>
            <p className="mt-1 text-sm text-slate-600">
              Transfer your cashback to your bank account or UPI
            </p>
          </div>
          {!showWithdrawForm && (
            <button
              onClick={() => setShowWithdrawForm(true)}
              disabled={wallet.withdrawableCash <= 0}
              className="rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-3 font-semibold text-white shadow-lg shadow-blue-200 transition hover:from-blue-700 hover:to-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Withdraw Now
            </button>
          )}
        </div>

        {showWithdrawForm && (
          <div className="mt-6 space-y-4 border-t border-slate-100 pt-6">
            {error && (
              <div className="rounded-lg bg-red-50 border border-red-200 p-3 text-sm text-red-700">
                {error}
              </div>
            )}
            {success && (
              <div className="rounded-lg bg-green-50 border border-green-200 p-3 text-sm text-green-700">
                {success}
              </div>
            )}
            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700">
                Amount to Withdraw
              </label>
              <input
                type="number"
                value={withdrawAmount}
                onChange={(e) => setWithdrawAmount(e.target.value)}
                placeholder={`Max: ₹${wallet.withdrawableCash.toFixed(2)}`}
                max={wallet.withdrawableCash}
                className="w-full rounded-xl border border-slate-200 px-4 py-3 focus:border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-100"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700">
                Payment Method
              </label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setPaymentMethod("upi")}
                  className={`rounded-xl border-2 p-4 text-left transition ${
                    paymentMethod === "upi"
                      ? "border-blue-600 bg-blue-50"
                      : "border-slate-200 bg-white hover:border-slate-300"
                  }`}
                >
                  <p className="font-semibold text-slate-900">UPI</p>
                  <p className="text-xs text-slate-600">Instant transfer</p>
                </button>
                <button
                  type="button"
                  onClick={() => setPaymentMethod("bank")}
                  className={`rounded-xl border-2 p-4 text-left transition ${
                    paymentMethod === "bank"
                      ? "border-blue-600 bg-blue-50"
                      : "border-slate-200 bg-white hover:border-slate-300"
                  }`}
                >
                  <p className="font-semibold text-slate-900">Bank Transfer</p>
                  <p className="text-xs text-slate-600">1-2 business days</p>
                </button>
              </div>
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700">
                {paymentMethod === "upi" ? "UPI ID" : "Bank Account Details"}
              </label>
              <input
                type="text"
                value={accountDetails}
                onChange={(e) => setAccountDetails(e.target.value)}
                placeholder={paymentMethod === "upi" ? "yourname@paytm" : "Account number, IFSC"}
                className="w-full rounded-xl border border-slate-200 px-4 py-3 focus:border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-100"
              />
            </div>

            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => {
                  setShowWithdrawForm(false);
                  setWithdrawAmount("");
                  setAccountDetails("");
                }}
                className="flex-1 rounded-full border border-slate-200 px-6 py-3 font-semibold text-slate-600 transition hover:bg-slate-50"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleWithdraw}
                disabled={isProcessing || !withdrawAmount || !accountDetails}
                className="flex-1 rounded-full bg-gradient-to-r from-green-600 to-emerald-600 px-6 py-3 font-semibold text-white shadow-lg shadow-green-200 transition hover:from-green-700 hover:to-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
              {isProcessing && <Icons.Spinner className="h-4 w-4" />}
                {isProcessing ? "Processing..." : "Request Withdrawal"}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

