"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { RefreshCw } from "lucide-react";
import { StatusBadge } from "@/components/ui/status-badge";
import { brandApi, type BrandOrder } from "@/lib/backend-api";

const STATUS_COPY: Record<
  NonNullable<BrandOrder["status"]>,
  { label: string; variant: "primary" | "success" | "warning" | "danger" | "neutral" }
> = {
  PENDING: { label: "Pending", variant: "warning" },
  APPROVED: { label: "Approved", variant: "success" },
  REJECTED: { label: "Rejected", variant: "danger" },
  CANCELLED: { label: "Cancelled", variant: "neutral" },
};

export function BrandOrdersScreen() {
  const [orders, setOrders] = useState<BrandOrder[]>([]);
  const [summary, setSummary] = useState({
    total: 0,
    pending: 0,
    approved: 0,
    rejected: 0,
    cancelled: 0,
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState("");

  const loadOrders = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      const response = await brandApi.getOrders();
      setOrders(response.orders);
      setSummary(response.summary);
    } catch (err: any) {
      setError(err.message || "Failed to load orders.");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadOrders();
  }, [loadOrders]);

  const filteredOrders = useMemo(() => {
    if (!search.trim()) {
      return orders;
    }
    const query = search.toLowerCase();
    return orders.filter((order) => {
      return (
        order.product_name.toLowerCase().includes(query) ||
        (order.user_name || "").toLowerCase().includes(query) ||
        (order.user_email || "").toLowerCase().includes(query) ||
        order.order_id.toLowerCase().includes(query)
      );
    });
  }, [orders, search]);

  return (
    <div className="page-wrapper bg-white">
      <div className="container-responsive space-y-6 py-10">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="section-title">Orders</p>
            <h1 className="text-4xl font-bold text-slate-900">Track reviewer purchases</h1>
            <p className="text-slate-600">
              Every submitted purchase request for your products, with real-time status.
            </p>
          </div>
          <button
            onClick={loadOrders}
            className="inline-flex items-center gap-2 rounded-full border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-600 hover:bg-slate-50 disabled:opacity-50"
            disabled={isLoading}
          >
            <RefreshCw className={`h-4 w-4 ${isLoading ? "animate-spin" : ""}`} />
            Refresh
          </button>
        </div>

        {error && (
          <div className="rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">
            {error}
          </div>
        )}

        <div className="grid gap-4 md:grid-cols-4">
          {[
            { label: "Total Orders", value: summary.total },
            { label: "Pending", value: summary.pending },
            { label: "Approved", value: summary.approved },
            { label: "Rejected", value: summary.rejected },
          ].map((card) => (
            <div key={card.label} className="rounded-3xl border border-slate-100 bg-slate-50 p-4">
              <p className="text-sm font-semibold uppercase text-slate-500">{card.label}</p>
              <p className="mt-2 text-3xl font-bold text-slate-900">{card.value}</p>
            </div>
          ))}
        </div>

        <div className="rounded-3xl border border-slate-100 bg-white p-4 shadow-sm">
          <div className="mb-4 flex items-center justify-between gap-4">
            <div className="flex-1">
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search orders by product, shopper, or order ID"
                className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-100"
              />
            </div>
            <span className="text-sm text-slate-500">
              Showing {filteredOrders.length} of {orders.length}
            </span>
          </div>

          {isLoading ? (
            <div className="py-10 text-center text-sm text-slate-500">Loading orders…</div>
          ) : filteredOrders.length === 0 ? (
            <div className="py-10 text-center text-sm text-slate-500">No orders found.</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
                  <tr>
                    <th className="px-4 py-3">Product</th>
                    <th className="px-4 py-3">Shopper</th>
                    <th className="px-4 py-3">Amount</th>
                    <th className="px-4 py-3">Status</th>
                    <th className="px-4 py-3">Submitted</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredOrders.map((order) => {
                    const status = STATUS_COPY[order.status] || STATUS_COPY.PENDING;
                    return (
                      <tr key={order.id} className="border-t border-slate-100">
                        <td className="px-4 py-4">
                          <p className="font-semibold text-slate-900">{order.product_name}</p>
                          <p className="text-xs text-slate-500">#{order.order_id}</p>
                        </td>
                        <td className="px-4 py-4">
                          <p className="font-semibold text-slate-900">{order.user_name || "—"}</p>
                          <p className="text-xs text-slate-500">{order.user_email || "—"}</p>
                        </td>
                        <td className="px-4 py-4 text-sm text-slate-600">
                          {order.currency} {order.order_amount}
                        </td>
                        <td className="px-4 py-4">
                          <StatusBadge label={status.label} variant={status.variant} />
                        </td>
                        <td className="px-4 py-4 text-sm text-slate-600">
                          {new Date(order.created_at).toLocaleDateString()}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}


