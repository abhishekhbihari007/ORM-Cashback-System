"use client";

import { useCallback, useEffect, useState } from "react";
import { adminApi, type AdminPayout } from "@/lib/backend-api";
import { PayoutManager } from "@/components/sections/admin/payout-manager";
import { PayoutRequest } from "@/lib/types";

function mapAdminPayoutToPayoutRequest(adminPayout: AdminPayout): PayoutRequest {
  return {
    id: adminPayout.id.toString(),
    userName: adminPayout.user_name,
    amount: parseFloat(adminPayout.amount),
    paymentMethod: "upi", // Not available in backend, defaulting
    accountDetails: adminPayout.reference_id || "N/A",
    requestedAt: adminPayout.created_at,
    status: adminPayout.status.toLowerCase() as "pending" | "processing" | "completed" | "rejected",
    completedAt: adminPayout.completed_at || undefined,
  };
}

export function AdminPayoutsClient() {
  const [payouts, setPayouts] = useState<PayoutRequest[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [success, setSuccess] = useState<string | null>(null);

  const loadPayouts = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      const response = await adminApi.getPayouts();
      setPayouts(response.payouts.map(mapAdminPayoutToPayoutRequest));
    } catch (err: any) {
      setError(err.message || "Failed to load payouts");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadPayouts();
  }, [loadPayouts]);

  const handleMarkAsDone = async (payoutId: string) => {
    const payout = payouts.find((p) => p.id === payoutId);
    if (!payout) return;

    setIsProcessing(true);
    setError(null);
    setSuccess(null);
    try {
      await adminApi.processPayout(parseInt(payoutId));
      await loadPayouts(); // Refresh list
      setSuccess("Payout processed successfully");
      setTimeout(() => setSuccess(null), 3000);
    } catch (err: any) {
      setError(err.message || "Failed to process payout");
    } finally {
      setIsProcessing(false);
    }
  };

  if (isLoading) {
    return (
      <div className="rounded-3xl border border-slate-100 bg-white p-12 text-center shadow-sm">
        <p className="text-slate-600">Loading payouts...</p>
      </div>
    );
  }

  return (
    <>
      {error && (
        <div className="mb-4 rounded-lg border border-red-200 bg-red-50 p-4 text-red-800">
          {error}
        </div>
      )}
      {success && (
        <div className="mb-4 rounded-lg border border-green-200 bg-green-50 p-4 text-green-800">
          {success}
        </div>
      )}
      {error && !isLoading && (
        <div className="mb-4 text-center">
          <button
            onClick={loadPayouts}
            className="rounded-full bg-red-600 px-4 py-2 text-sm font-semibold text-white hover:bg-red-700"
          >
            Retry
          </button>
        </div>
      )}
      {!error && <PayoutManager payouts={payouts} onMarkAsDone={handleMarkAsDone} />}
    </>
  );
}

