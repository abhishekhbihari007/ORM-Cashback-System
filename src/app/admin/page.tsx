"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { StatCard } from "@/components/ui/stat-card";
import {
  TrendingUp,
  ShoppingBag,
  Star,
  RefreshCw,
  Search,
  AlertCircle,
  CheckCircle2,
  XCircle,
} from "lucide-react";
import {
  adminApi,
  type AdminOverviewResponse,
  type AdminSubmissionsResponse,
  type AdminOrder,
  type AdminReview,
} from "@/lib/backend-api";

type TabType = "overview" | "orders" | "reviews";

const EMPTY_OVERVIEW: AdminOverviewResponse = {
  status: "pending",
  summary: {
    total_users: 0,
    shoppers: 0,
    brands: 0,
    admins: 0,
  },
  orders: {
    total: 0,
    pending: 0,
    approved: 0,
    rejected: 0,
  },
  reviews: {
    total: 0,
    pending: 0,
    approved: 0,
    rejected: 0,
  },
  brands: {
    total: 0,
    wallet_balance: "0",
    locked_balance: "0",
  },
  wallets: {
    total_balance: "0",
    total_earned: "0",
    total_withdrawn: "0",
  },
  recent_orders: [],
  recent_reviews: [],
};

export default function AdminPage() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<TabType>("overview");
  const [searchQuery, setSearchQuery] = useState("");
  const [overview, setOverview] = useState<AdminOverviewResponse>(EMPTY_OVERVIEW);
  const [submissions, setSubmissions] = useState<AdminSubmissionsResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [actionLoadingId, setActionLoadingId] = useState<number | null>(null);
  const [showRejectOrderModal, setShowRejectOrderModal] = useState(false);
  const [showRejectReviewModal, setShowRejectReviewModal] = useState(false);
  const [rejectReason, setRejectReason] = useState("");
  const [pendingRejectItem, setPendingRejectItem] = useState<{ type: 'order' | 'review'; id: number } | null>(null);

  const loadData = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      const [overviewData, submissionData] = await Promise.all([
        adminApi.getOverview(),
        adminApi.getSubmissions(),
      ]);
      setOverview(overviewData);
      setSubmissions(submissionData);
    } catch (err: any) {
      setError(err.message || "Failed to load admin data.");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const stats = useMemo(() => ({
    totalUsers: overview.summary.total_users,
    shoppers: overview.summary.shoppers,
    brands: overview.summary.brands,
    admins: overview.summary.admins,
    totalOrders: overview.orders.total,
    pendingOrders: overview.orders.pending,
    approvedOrders: overview.orders.approved,
    totalReviews: overview.reviews.total,
    pendingReviews: overview.reviews.pending,
    walletBalance: Number(overview.wallets.total_balance || "0"),
    walletEarned: Number(overview.wallets.total_earned || "0"),
    walletWithdrawn: Number(overview.wallets.total_withdrawn || "0"),
  }), [overview]);

  const filteredPendingOrders = useMemo(() => {
    const orders = submissions?.pending_orders.data ?? [];
    if (!searchQuery) return orders;
    const query = searchQuery.toLowerCase();
    return orders.filter(
      (order) =>
        order.product_name.toLowerCase().includes(query) ||
        (order.user_email ?? "").toLowerCase().includes(query) ||
        (order.user_name ?? "").toLowerCase().includes(query),
    );
  }, [submissions, searchQuery]);

  const filteredPendingReviews = useMemo(() => {
    const reviews = submissions?.pending_reviews.data ?? [];
    if (!searchQuery) return reviews;
    const query = searchQuery.toLowerCase();
    return reviews.filter(
      (review) =>
        review.product_name.toLowerCase().includes(query) ||
        (review.user_email ?? "").toLowerCase().includes(query) ||
        (review.user_name ?? "").toLowerCase().includes(query),
    );
  }, [submissions, searchQuery]);

  const handleApproveOrder = async (order: AdminOrder) => {
    try {
      setActionLoadingId(order.id);
      await adminApi.approveOrder(order.id);
      await loadData();
    } catch (err: any) {
      setError(err.message || "Failed to approve order.");
    } finally {
      setActionLoadingId(null);
    }
  };

  const [showRejectOrderModal, setShowRejectOrderModal] = useState(false);
  const [showRejectReviewModal, setShowRejectReviewModal] = useState(false);
  const [rejectReason, setRejectReason] = useState("");
  const [pendingRejectItem, setPendingRejectItem] = useState<{ type: 'order' | 'review'; id: number } | null>(null);

  const handleRejectOrder = async (order: AdminOrder) => {
    setPendingRejectItem({ type: 'order', id: order.id });
    setRejectReason("");
    setShowRejectOrderModal(true);
  };

  const confirmRejectOrder = async () => {
    if (!pendingRejectItem || pendingRejectItem.type !== 'order') return;
    try {
      setActionLoadingId(pendingRejectItem.id);
      await adminApi.rejectOrder(pendingRejectItem.id, rejectReason.trim() || "");
      await loadData();
      setShowRejectOrderModal(false);
      setRejectReason("");
      setPendingRejectItem(null);
    } catch (err: any) {
      setError(err.message || "Failed to reject order.");
    } finally {
      setActionLoadingId(null);
    }
  };

  const handleApproveReview = async (review: AdminReview) => {
    try {
      setActionLoadingId(review.id);
      await adminApi.approveReview(review.id);
      await loadData();
    } catch (err: any) {
      setError(err.message || "Failed to approve review.");
    } finally {
      setActionLoadingId(null);
    }
  };

  const handleRejectReview = async (review: AdminReview) => {
    setPendingRejectItem({ type: 'review', id: review.id });
    setRejectReason("");
    setShowRejectReviewModal(true);
  };

  const confirmRejectReview = async () => {
    if (!pendingRejectItem || pendingRejectItem.type !== 'review') return;
    try {
      setActionLoadingId(pendingRejectItem.id);
      await adminApi.rejectReview(pendingRejectItem.id, rejectReason.trim() || "");
      await loadData();
      setShowRejectReviewModal(false);
      setRejectReason("");
      setPendingRejectItem(null);
    } catch (err: any) {
      setError(err.message || "Failed to reject review.");
    } finally {
      setActionLoadingId(null);
    }
  };

  if (!user || user.role !== "admin") {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <AlertCircle className="h-12 w-12 text-rose-500 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-slate-900 mb-2">Access Denied</h2>
          <p className="text-slate-600">You do not have permission to view the admin panel.</p>
        </div>
      </div>
    );
  }

  const searchPlaceholder =
    activeTab === "reviews"
      ? "Search reviews by product or shopper"
      : activeTab === "orders"
      ? "Search orders by product or shopper"
      : "Search submissions";

  return (
    <div className="bg-slate-50 min-h-screen">
      <div className="container-responsive py-10 space-y-8">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="section-title text-sm font-semibold text-indigo-600 uppercase tracking-wide">
              Admin Console
            </p>
            <h1 className="text-3xl font-bold text-slate-900">Live Platform Overview</h1>
            <p className="text-slate-600">
              Moderate submissions, release cashback, and keep the marketplace queue moving.
            </p>
          </div>
          <button
            onClick={loadData}
            className="inline-flex items-center gap-2 rounded-full border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-600 hover:bg-white"
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

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          <StatCard
            label="Total Users"
            value={stats.totalUsers.toString()}
            helper={`${stats.shoppers} shoppers · ${stats.brands} brands · ${stats.admins} admins`}
          />
          <StatCard
            label="Orders in Queue"
            value={overview.orders.total.toString()}
            helper={`${stats.pendingOrders} pending · ${stats.approvedOrders} approved`}
          />
          <StatCard
            label="Reviews Submitted"
            value={stats.totalReviews.toString()}
            helper={`${stats.pendingReviews} awaiting verification`}
          />
          <StatCard
            label="Wallet Balance"
            value={`₹${stats.walletBalance.toLocaleString("en-IN")}`}
            helper={`₹${stats.walletEarned.toLocaleString("en-IN")} earned · ₹${stats.walletWithdrawn.toLocaleString("en-IN")} withdrawn`}
          />
        </div>

        <div className="flex gap-2 p-1 bg-slate-100 rounded-lg">
          {[
            { id: "overview", label: "Overview", icon: TrendingUp },
            { id: "orders", label: "Pending Orders", icon: ShoppingBag },
            { id: "reviews", label: "Pending Reviews", icon: Star },
          ].map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => setActiveTab(id as TabType)}
              className={`flex-1 flex items-center justify-center gap-2 rounded-lg px-4 py-2.5 text-sm font-semibold transition-all ${
                activeTab === id ? "bg-white text-indigo-600 shadow-sm" : "text-slate-600 hover:text-slate-900"
              }`}
            >
              <Icon className="h-4 w-4" />
              {label}
            </button>
          ))}
        </div>

        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
          <input
            type="text"
            placeholder={searchPlaceholder}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 bg-white text-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-100"
          />
        </div>

        {isLoading ? (
          <div className="rounded-3xl border border-slate-100 bg-white p-10 text-center text-slate-500">
            Fetching live submissions…
          </div>
        ) : (
          <>
            {activeTab === "overview" && (
              <div className="grid gap-6 lg:grid-cols-2">
                <section className="rounded-3xl border border-slate-100 bg-white p-6 shadow-sm">
                  <h2 className="text-xl font-semibold text-slate-900 mb-4">Recent Orders</h2>
                  <div className="space-y-3">
                    {overview.recent_orders.length === 0 && (
                      <p className="text-sm text-slate-500">No orders yet.</p>
                    )}
                    {overview.recent_orders.map((order) => (
                      <div key={order.id} className="rounded-2xl border border-slate-100 p-4 flex items-center justify-between gap-4">
                        <div>
                          <p className="text-sm font-semibold text-slate-900">{order.product_name}</p>
                          <p className="text-xs text-slate-500">
                            {order.user_name ?? "Unknown user"} · {order.order_amount} {order.currency}
                          </p>
                        </div>
                        <span
                          className={`pill text-xs ${
                            order.status === "APPROVED"
                              ? "bg-emerald-50 text-emerald-700"
                              : order.status === "REJECTED"
                              ? "bg-rose-50 text-rose-700"
                              : "bg-amber-50 text-amber-700"
                          }`}
                        >
                          {order.status}
                        </span>
                      </div>
                    ))}
                  </div>
                </section>

                <section className="rounded-3xl border border-slate-100 bg-white p-6 shadow-sm">
                  <h2 className="text-xl font-semibold text-slate-900 mb-4">Recent Reviews</h2>
                  <div className="space-y-3">
                    {overview.recent_reviews.length === 0 && (
                      <p className="text-sm text-slate-500">No reviews yet.</p>
                    )}
                    {overview.recent_reviews.map((review) => (
                      <div key={review.id} className="rounded-2xl border border-slate-100 p-4 flex items-center justify-between gap-4">
                        <div>
                          <p className="text-sm font-semibold text-slate-900">{review.product_name}</p>
                          <p className="text-xs text-slate-500">
                            {review.user_name ?? "Unknown user"} · Rating {review.rating}⭐
                          </p>
                        </div>
                        <span
                          className={`pill text-xs ${
                            review.status === "APPROVED"
                              ? "bg-emerald-50 text-emerald-700"
                              : review.status === "REJECTED"
                              ? "bg-rose-50 text-rose-700"
                              : "bg-amber-50 text-amber-700"
                          }`}
                        >
                          {review.status}
                        </span>
                      </div>
                    ))}
                  </div>
                </section>
              </div>
            )}

            {activeTab === "orders" && (
              <section className="rounded-3xl border border-slate-100 bg-white p-6 shadow-sm">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h2 className="text-xl font-semibold text-slate-900">
                      Pending Orders ({filteredPendingOrders.length})
                    </h2>
                    <p className="text-sm text-slate-500">
                      Verify purchase proofs to move shoppers into the review pipeline.
                    </p>
                  </div>
                </div>

                <div className="space-y-4">
                  {filteredPendingOrders.length === 0 && (
                    <p className="text-sm text-slate-500">No pending orders match your search.</p>
                  )}
                  {filteredPendingOrders.map((order) => (
                    <div key={order.id} className="rounded-2xl border border-slate-100 p-4">
                      <div className="grid gap-4 md:grid-cols-4">
                        <div>
                          <p className="text-sm font-semibold text-slate-900">{order.product_name}</p>
                          <p className="text-xs text-slate-500">
                            {order.user_name ?? "Unknown user"} · {order.user_email ?? "No email"}
                          </p>
                        </div>
                        <div>
                          <p className="text-xs text-slate-500">Amount</p>
                          <p className="text-sm font-semibold text-slate-900">
                            {order.order_amount} {order.currency}
                          </p>
                        </div>
                        <div>
                          <p className="text-xs text-slate-500">Submitted</p>
                          <p className="text-sm font-semibold text-slate-900">
                            {new Date(order.created_at).toLocaleDateString()}
                          </p>
                        </div>
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => handleRejectOrder(order)}
                            disabled={actionLoadingId === order.id}
                            className="inline-flex items-center gap-1 rounded-full border border-rose-200 px-4 py-2 text-sm font-semibold text-rose-600 hover:bg-rose-50 disabled:opacity-50"
                          >
                            <XCircle className="h-4 w-4" />
                            Reject
                          </button>
                          <button
                            onClick={() => handleApproveOrder(order)}
                            disabled={actionLoadingId === order.id}
                            className="inline-flex items-center gap-1 rounded-full border border-emerald-200 px-4 py-2 text-sm font-semibold text-emerald-600 hover:bg-emerald-50 disabled:opacity-50"
                          >
                            <CheckCircle2 className="h-4 w-4" />
                            Approve
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {activeTab === "reviews" && (
              <section className="rounded-3xl border border-slate-100 bg-white p-6 shadow-sm">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h2 className="text-xl font-semibold text-slate-900">
                      Pending Reviews ({filteredPendingReviews.length})
                    </h2>
                    <p className="text-sm text-slate-500">
                      Approve authentic reviews to release cashback automatically.
                    </p>
                  </div>
                </div>

                <div className="space-y-4">
                  {filteredPendingReviews.length === 0 && (
                    <p className="text-sm text-slate-500">No pending reviews match your search.</p>
                  )}
                  {filteredPendingReviews.map((review) => (
                    <div key={review.id} className="rounded-2xl border border-slate-100 p-4">
                      <div className="grid gap-4 md:grid-cols-4">
                        <div>
                          <p className="text-sm font-semibold text-slate-900">{review.product_name}</p>
                          <p className="text-xs text-slate-500">
                            {review.user_name ?? "Unknown user"} · {review.user_email ?? "No email"}
                          </p>
                        </div>
                        <div>
                          <p className="text-xs text-slate-500">Rating</p>
                          <p className="text-sm font-semibold text-slate-900">{review.rating} ⭐</p>
                        </div>
                        <div>
                          <p className="text-xs text-slate-500">Submitted</p>
                          <p className="text-sm font-semibold text-slate-900">
                            {new Date(review.created_at).toLocaleDateString()}
                          </p>
                        </div>
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => handleRejectReview(review)}
                            disabled={actionLoadingId === review.id}
                            className="inline-flex items-center gap-1 rounded-full border border-rose-200 px-4 py-2 text-sm font-semibold text-rose-600 hover:bg-rose-50 disabled:opacity-50"
                          >
                            <XCircle className="h-4 w-4" />
                            Reject
                          </button>
                          <button
                            onClick={() => handleApproveReview(review)}
                            disabled={actionLoadingId === review.id}
                            className="inline-flex items-center gap-1 rounded-full border border-emerald-200 px-4 py-2 text-sm font-semibold text-emerald-600 hover:bg-emerald-50 disabled:opacity-50"
                          >
                            <CheckCircle2 className="h-4 w-4" />
                            Approve
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}
          </>
        )}

        {/* Reject Order Modal */}
        {showRejectOrderModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-6">
              <h2 className="mb-4 text-xl font-semibold text-slate-900">Reject Order</h2>
              <p className="mb-4 text-sm text-slate-600">
                Please provide a reason for rejecting this order (optional).
              </p>
              <textarea
                value={rejectReason}
                onChange={(e) => setRejectReason(e.target.value)}
                placeholder="Enter rejection reason (optional)..."
                className="w-full rounded-lg border border-slate-300 p-3 text-sm"
                rows={4}
              />
              <div className="mt-4 flex justify-end gap-3">
                <button
                  onClick={() => {
                    setShowRejectOrderModal(false);
                    setRejectReason("");
                    setPendingRejectItem(null);
                  }}
                  className="rounded-lg border border-slate-300 px-4 py-2 text-slate-700 hover:bg-slate-50"
                >
                  Cancel
                </button>
                <button
                  onClick={confirmRejectOrder}
                  disabled={actionLoadingId !== null}
                  className="rounded-lg bg-red-600 px-4 py-2 text-white hover:bg-red-700 disabled:opacity-50"
                >
                  {actionLoadingId !== null ? "Rejecting..." : "Reject"}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Reject Review Modal */}
        {showRejectReviewModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-6">
              <h2 className="mb-4 text-xl font-semibold text-slate-900">Reject Review</h2>
              <p className="mb-4 text-sm text-slate-600">
                Please provide a reason for rejecting this review (optional).
              </p>
              <textarea
                value={rejectReason}
                onChange={(e) => setRejectReason(e.target.value)}
                placeholder="Enter rejection reason (optional)..."
                className="w-full rounded-lg border border-slate-300 p-3 text-sm"
                rows={4}
              />
              <div className="mt-4 flex justify-end gap-3">
                <button
                  onClick={() => {
                    setShowRejectReviewModal(false);
                    setRejectReason("");
                    setPendingRejectItem(null);
                  }}
                  className="rounded-lg border border-slate-300 px-4 py-2 text-slate-700 hover:bg-slate-50"
                >
                  Cancel
                </button>
                <button
                  onClick={confirmRejectReview}
                  disabled={actionLoadingId !== null}
                  className="rounded-lg bg-red-600 px-4 py-2 text-white hover:bg-red-700 disabled:opacity-50"
                >
                  {actionLoadingId !== null ? "Rejecting..." : "Reject"}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
