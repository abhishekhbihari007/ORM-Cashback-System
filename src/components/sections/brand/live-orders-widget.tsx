"use client";

import { useQuery } from "@tanstack/react-query";
import { brandApi, type BrandOrder } from "@/lib/backend-api";
import { StatusBadge } from "@/components/ui/status-badge";

const statusVariantMap: Record<string, "primary" | "success" | "warning" | "neutral"> = {
  PENDING: "primary",
  APPROVED: "success",
  REJECTED: "warning",
  CANCELLED: "neutral",
};

function mapBrandOrderToDisplay(order: BrandOrder) {
  return {
    id: order.id.toString(),
    reviewerName: order.user_name || "User",
    status: order.status === "PENDING" ? "awaiting" : order.status === "APPROVED" ? "verified" : "reimbursed",
    country: "N/A", // Backend doesn't provide country
    submittedAt: order.created_at,
  };
}

export function LiveOrdersWidget() {
  const { data: ordersResponse, isLoading } = useQuery({
    queryKey: ["brand-orders"],
    queryFn: brandApi.getOrders,
  });

  const orders = ordersResponse?.orders.map(mapBrandOrderToDisplay) || [];

  return (
    <div className="rounded-3xl border border-slate-100 bg-white p-6 shadow-sm">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-semibold text-slate-900">Live Orders</h3>
        <span className="text-sm text-slate-500">auto-refreshing</span>
      </div>
      {isLoading ? (
        <div className="mt-4 text-center text-sm text-slate-500">Loading orders...</div>
      ) : orders.length === 0 ? (
        <div className="mt-4 text-center text-sm text-slate-500">No orders found</div>
      ) : (
        <div className="mt-4 space-y-4">
          {orders.map((order) => (
            <div key={order.id} className="rounded-2xl bg-slate-50 p-4">
              <div className="flex flex-wrap items-center gap-3">
                <p className="font-semibold text-slate-900">{order.reviewerName}</p>
                <StatusBadge
                  label={order.status}
                  variant={statusVariantMap[order.status] ?? "neutral"}
                />
              </div>
              <p className="text-sm text-slate-500">
                {order.country} • Submitted {new Date(order.submittedAt).toLocaleDateString()}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

