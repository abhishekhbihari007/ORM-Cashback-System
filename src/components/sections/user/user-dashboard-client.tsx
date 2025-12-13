"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { UserOverview } from "@/components/sections/user/user-overview";
import { PurchaseTimeline } from "@/components/sections/user/purchase-timeline";
import { PaymentStatus } from "@/components/sections/user/payment-status";
import { HowItWorksShopper } from "@/components/sections/user/how-it-works-shopper";
import { PurchaseHistory, PaymentRecord } from "@/lib/types";
import { userApi, type BrandOrder, type UserWalletResponse } from "@/lib/backend-api";

const mapOrder = (order: BrandOrder): PurchaseHistory => {
  let status: PurchaseHistory["status"] = "tracking";
  if (order.status === "APPROVED") {
    status = "reviewed";
  } else if (order.status === "REJECTED") {
    status = "rejected";
  }

  return {
    id: String(order.id),
    store: order.brand_name,
    product: order.product_name,
    amount: Number(order.order_amount ?? 0),
    status,
    purchasedAt: order.created_at,
    productLink: order.product_url ?? undefined,
    rejectionReason: order.rejection_reason ?? undefined,
  };
};

const mapPayments = (walletResponse: UserWalletResponse): PaymentRecord[] => {
  return walletResponse.wallet.transactions.map((transaction) => ({
    id: String(transaction.id),
    amount: Number(transaction.amount ?? 0),
    status: transaction.status === "COMPLETED" ? "paid" : "processing",
    reference: transaction.reference_id || transaction.description || `TXN-${transaction.id}`,
    paidAt: transaction.completed_at || transaction.created_at,
  }));
};

export function UserDashboardClient() {
  const [purchases, setPurchases] = useState<PurchaseHistory[]>([]);
  const [payments, setPayments] = useState<PaymentRecord[]>([]);
  const [loadingPurchases, setLoadingPurchases] = useState(true);
  const [loadingPayments, setLoadingPayments] = useState(true);

  useEffect(() => {
    const loadOrders = async () => {
      try {
        setLoadingPurchases(true);
        const response = await userApi.getOrders();
        setPurchases(response.orders.map(mapOrder));
      } finally {
        setLoadingPurchases(false);
      }
    };

    const loadWallet = async () => {
      try {
        setLoadingPayments(true);
        const wallet = await userApi.getWallet();
        setPayments(mapPayments(wallet));
      } finally {
        setLoadingPayments(false);
      }
    };

    loadOrders();
    loadWallet();
  }, []);

  return (
    <div className="relative space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-slate-900 via-indigo-900 to-slate-900 bg-clip-text text-transparent">
            User Dashboard
          </h1>
          <p className="mt-2 text-slate-700 font-medium">Manage your purchases, reviews, and cashback</p>
        </div>
        <Link
          href="/feed"
          className="rounded-full bg-gradient-to-r from-orange-500 to-red-600 px-6 py-3 font-semibold text-white shadow-lg shadow-orange-500/25 transition-all hover:from-orange-600 hover:to-red-700 hover:shadow-xl hover:shadow-orange-500/40 hover:scale-105"
        >
          Browse Deals →
        </Link>
      </div>
      <UserOverview purchases={purchases} payments={payments} />
      <div className="grid gap-6 lg:grid-cols-[1.4fr,0.6fr]">
        <PurchaseTimeline purchases={purchases} loading={loadingPurchases && !purchases.length} />
        <PaymentStatus payments={payments} />
      </div>
      <HowItWorksShopper />
    </div>
  );
}


