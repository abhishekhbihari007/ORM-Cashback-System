"use client";

import { useEffect, useState } from "react";
import { PurchaseTimeline } from "@/components/sections/user/purchase-timeline";
import { PurchaseHistory } from "@/lib/types";
import { userApi, type BrandOrder } from "@/lib/backend-api";

const mapOrderToPurchase = (order: BrandOrder): PurchaseHistory => {
  let status: PurchaseHistory["status"] = "tracking";
  if (order.status === "APPROVED") {
    status = "reviewed";
  } else if (order.status === "REJECTED") {
    status = "rejected";
  } else if (order.status === "CANCELLED") {
    status = "tracking";
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

export function PurchasesClient() {
  const [purchases, setPurchases] = useState<PurchaseHistory[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadOrders = async () => {
      try {
        setIsLoading(true);
        const response = await userApi.getOrders();
        setPurchases(response.orders.map(mapOrderToPurchase));
      } catch (error) {
        // Error is already handled by setError, only log in development
        if (process.env.NODE_ENV === 'development') {
          console.error("Unable to load purchase history", error);
        }
      } finally {
        setIsLoading(false);
      }
    };

    loadOrders();
  }, []);

  return <PurchaseTimeline purchases={purchases} loading={isLoading && !purchases.length} />;
}

