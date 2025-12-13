"use client";

import { useEffect, useState } from "react";
import { PaymentStatus } from "@/components/sections/user/payment-status";
import { PaymentRecord } from "@/lib/types";
import { userApi, type UserWalletResponse } from "@/lib/backend-api";

const mapPayments = (wallet: UserWalletResponse): PaymentRecord[] =>
  wallet.wallet.transactions.map((transaction) => ({
    id: String(transaction.id),
    amount: Number(transaction.amount ?? 0),
    status: transaction.status === "COMPLETED" ? "paid" : "processing",
    reference: transaction.reference_id || transaction.description || `TXN-${transaction.id}`,
    paidAt: transaction.completed_at || transaction.created_at,
  }));

export function PaymentsClient() {
  const [payments, setPayments] = useState<PaymentRecord[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const load = async () => {
      try {
        setIsLoading(true);
        const response = await userApi.getWallet();
        setPayments(mapPayments(response));
      } catch (err: any) {
        setError(err.message || "Unable to load payments.");
      } finally {
        setIsLoading(false);
      }
    };

    load();
  }, []);

  if (isLoading && payments.length === 0) {
    return <p className="text-sm text-slate-500">Loading payments…</p>;
  }

  if (error) {
    return <p className="text-sm text-rose-600">{error}</p>;
  }

  return <PaymentStatus payments={payments} />;
}


