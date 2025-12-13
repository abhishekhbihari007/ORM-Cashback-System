"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { brandApi, type CampaignProductOrder } from "@/lib/backend-api";
import { FaSpinner, FaTriangleExclamation, FaArrowLeft, FaCircleCheck, FaImage, FaLink, FaXmark, FaChevronLeft, FaChevronRight } from "react-icons/fa6";

export default function CampaignProductOrdersPage() {
  const params = useParams();
  const router = useRouter();
  const campaignId = parseInt(params.id as string, 10);
  const productId = parseInt(params.productId as string, 10);
  
  const [orders, setOrders] = useState<CampaignProductOrder[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [rejectingOrderId, setRejectingOrderId] = useState<number | null>(null);
  const [approvingOrderId, setApprovingOrderId] = useState<number | null>(null);
  const [rejectReason, setRejectReason] = useState("");
  const [showRejectModal, setShowRejectModal] = useState(false);
  const [showApproveConfirm, setShowApproveConfirm] = useState(false);
  const [pendingApproveOrderId, setPendingApproveOrderId] = useState<number | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const pageSize = 20;

  const loadOrders = async (page: number = 1) => {
    try {
      setIsLoading(true);
      setError(null);
      setSuccess(null);
      const response = await brandApi.getCampaignProductOrders(campaignId, productId, page, pageSize);
      const ordersList = response.results || response.orders || [];
      setOrders(ordersList);
      setTotalCount(response.count || ordersList.length);
      if (response.count) {
        setTotalPages(Math.ceil(response.count / pageSize));
      } else {
        setTotalPages(1);
      }
    } catch (err: any) {
      setError(err.message || "Failed to load orders");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (campaignId && productId) {
      loadOrders(currentPage);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [campaignId, productId, currentPage]);

  const handleApprove = async (orderId: number) => {
    setPendingApproveOrderId(orderId);
    setShowApproveConfirm(true);
  };

  const confirmApprove = async () => {
    if (!pendingApproveOrderId) return;

    try {
      setError(null);
      setSuccess(null);
      setApprovingOrderId(pendingApproveOrderId);
      await brandApi.approveOrder(pendingApproveOrderId);
      // Reload orders
      await loadOrders(currentPage);
      setSuccess("Order approved successfully!");
      setTimeout(() => setSuccess(null), 3000);
    } catch (err: any) {
      setError(err.message || "Failed to approve order");
    } finally {
      setApprovingOrderId(null);
      setShowApproveConfirm(false);
      setPendingApproveOrderId(null);
    }
  };

  const handleReject = async (orderId: number) => {
    if (!rejectReason.trim()) {
      setError("Please provide a rejection reason");
      return;
    }

    try {
      setError(null);
      setSuccess(null);
      setRejectingOrderId(orderId);
      await brandApi.rejectOrder(orderId, { rejection_reason: rejectReason });
      // Reload orders
      await loadOrders(currentPage);
      setShowRejectModal(false);
      setRejectReason("");
      setSuccess("Order rejected successfully!");
      setTimeout(() => setSuccess(null), 3000);
    } catch (err: any) {
      setError(err.message || "Failed to reject order");
    } finally {
      setRejectingOrderId(null);
    }
  };

  const formatCurrency = (amount: string, currency: string) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: currency || 'INR',
    }).format(parseFloat(amount));
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'APPROVED':
        return 'bg-green-100 text-green-800';
      case 'REJECTED':
        return 'bg-red-100 text-red-800';
      case 'PENDING':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  if (isLoading) {
    return (
      <div className="page-wrapper bg-slate-50">
        <div className="container-responsive py-10">
          <div className="flex items-center justify-center py-20">
            <FaSpinner className="h-8 w-8 animate-spin text-blue-600" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="page-wrapper bg-slate-50">
      <div className="container-responsive space-y-6 py-10">
        <button
          onClick={() => router.push(`/brand/campaigns/${campaignId}`)}
          className="flex items-center gap-2 text-slate-600 hover:text-slate-900"
        >
          <FaArrowLeft className="h-4 w-4" />
          Back to Campaign
        </button>

        <div>
          <h1 className="text-4xl font-bold text-slate-900">Product Orders</h1>
          <p className="mt-2 text-slate-600">
            Review and manage all orders for this product
          </p>
        </div>

        {error && (
          <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-red-800">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <FaTriangleExclamation className="h-5 w-5" />
                <span>{error}</span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={loadOrders}
                  className="rounded-lg bg-red-600 px-3 py-1 text-sm text-white hover:bg-red-700"
                >
                  Retry
                </button>
                <button
                  onClick={() => setError(null)}
                  className="text-red-600 hover:text-red-800"
                >
                  <FaXmark className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        )}

        {success && (
          <div className="rounded-lg border border-green-200 bg-green-50 p-4 text-green-800">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <FaCircleCheck className="h-5 w-5" />
                <span>{success}</span>
              </div>
              <button
                onClick={() => setSuccess(null)}
                className="text-green-600 hover:text-green-800"
              >
                <FaXmark className="h-4 w-4" />
              </button>
            </div>
          </div>
        )}

        {orders.length === 0 ? (
          <div className="rounded-2xl border border-slate-200 bg-white p-12 text-center">
            <p className="text-lg font-semibold text-slate-900">No orders yet</p>
            <p className="mt-2 text-slate-600">
              Orders will appear here once users submit purchase proofs
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {orders.map((order) => (
              <div
                key={order.id}
                className="rounded-2xl border border-slate-200 bg-white p-6"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3">
                      <h3 className="text-lg font-semibold text-slate-900">
                        Order #{order.order_id}
                      </h3>
                      <span className={`rounded-full px-3 py-1 text-xs font-semibold ${getStatusColor(order.status)}`}>
                        {order.status}
                      </span>
                    </div>
                    <div className="mt-2 grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="text-slate-600">Order Date</p>
                        <p className="font-semibold text-slate-900">
                          {new Date(order.order_date).toLocaleDateString()}
                        </p>
                      </div>
                      <div>
                        <p className="text-slate-600">Order Amount</p>
                        <p className="font-semibold text-slate-900">
                          {formatCurrency(order.order_amount, order.currency)}
                        </p>
                      </div>
                      <div>
                        <p className="text-slate-600">User</p>
                        <p className="font-semibold text-slate-900">
                          {order.user_name || order.user_email || "N/A"}
                        </p>
                      </div>
                      <div>
                        <p className="text-slate-600">Submitted</p>
                        <p className="font-semibold text-slate-900">
                          {new Date(order.created_at).toLocaleDateString()}
                        </p>
                      </div>
                    </div>

                    {order.rejection_reason && (
                      <div className="mt-4 rounded-lg border border-red-200 bg-red-50 p-3">
                        <p className="text-sm font-semibold text-red-800">Rejection Reason:</p>
                        <p className="mt-1 text-sm text-red-700">{order.rejection_reason}</p>
                      </div>
                    )}

                    {order.review && (
                      <div className="mt-4 rounded-lg border border-green-200 bg-green-50 p-3">
                        <div className="flex items-center gap-2">
                          <FaCircleCheck className="h-4 w-4 text-green-600" />
                          <p className="text-sm font-semibold text-green-800">Review Submitted</p>
                        </div>
                        <div className="mt-2 text-sm text-green-700">
                          <p>Rating: {order.review.rating} stars</p>
                          {order.review.review_url && (
                            <a
                              href={order.review.review_url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="mt-1 flex items-center gap-1 text-blue-600 hover:underline"
                            >
                              <FaLink className="h-3 w-3" />
                              View Review
                            </a>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                <div className="mt-4 grid grid-cols-2 gap-4">
                  <div>
                    <p className="mb-2 text-sm font-semibold text-slate-700">Order Proof</p>
                    {order.purchase_proof ? (
                      <a
                        href={order.purchase_proof}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-blue-600 hover:underline"
                      >
                        <FaImage className="h-4 w-4" />
                        View Screenshot
                      </a>
                    ) : (
                      <p className="text-sm text-slate-500">No proof uploaded</p>
                    )}
                  </div>
                  {order.review && (
                    <div>
                      <p className="mb-2 text-sm font-semibold text-slate-700">Review Screenshot</p>
                      {order.review.review_url ? (
                        <a
                          href={order.review.review_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 text-blue-600 hover:underline"
                        >
                          <FaImage className="h-4 w-4" />
                          View Review
                        </a>
                      ) : (
                        <p className="text-sm text-slate-500">No screenshot</p>
                      )}
                    </div>
                  )}
                </div>

                {order.status === 'PENDING' && (
                  <div className="mt-4 flex justify-end gap-3">
                    <button
                      onClick={() => handleApprove(order.id)}
                      disabled={approvingOrderId === order.id}
                      className="rounded-lg border border-green-300 bg-green-50 px-4 py-2 text-green-700 hover:bg-green-100 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                    >
                      {approvingOrderId === order.id ? (
                        <>
                          <FaSpinner className="h-4 w-4 animate-spin" />
                          Approving...
                        </>
                      ) : (
                        <>
                          <FaCircleCheck className="h-4 w-4" />
                          Approve Order
                        </>
                      )}
                    </button>
                    <button
                      onClick={() => {
                        setRejectingOrderId(order.id);
                        setShowRejectModal(true);
                      }}
                      className="rounded-lg border border-red-300 bg-red-50 px-4 py-2 text-red-700 hover:bg-red-100"
                    >
                      Reject Order
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-between rounded-lg border border-slate-200 bg-white px-4 py-3">
            <div className="text-sm text-slate-600">
              Showing {((currentPage - 1) * pageSize) + 1} to {Math.min(currentPage * pageSize, totalCount)} of {totalCount} orders
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                disabled={currentPage === 1}
                className="rounded-lg border border-slate-300 px-3 py-1 text-sm disabled:opacity-50 hover:bg-slate-50"
              >
                <FaChevronLeft className="h-4 w-4" />
              </button>
              <span className="text-sm text-slate-700">
                Page {currentPage} of {totalPages}
              </span>
              <button
                onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                disabled={currentPage === totalPages}
                className="rounded-lg border border-slate-300 px-3 py-1 text-sm disabled:opacity-50 hover:bg-slate-50"
              >
                <FaChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        )}

        {/* Approve Confirmation Modal */}
        {showApproveConfirm && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-6">
              <h2 className="mb-4 text-xl font-semibold text-slate-900">Approve Order</h2>
              <p className="mb-4 text-sm text-slate-600">
                Are you sure you want to approve this order? This action cannot be undone.
              </p>
              <div className="mt-4 flex justify-end gap-3">
                <button
                  onClick={() => {
                    setShowApproveConfirm(false);
                    setPendingApproveOrderId(null);
                  }}
                  className="rounded-lg border border-slate-300 px-4 py-2 text-slate-700 hover:bg-slate-50"
                >
                  Cancel
                </button>
                <button
                  onClick={confirmApprove}
                  disabled={approvingOrderId !== null}
                  className="rounded-lg bg-green-600 px-4 py-2 text-white hover:bg-green-700 disabled:opacity-50 flex items-center gap-2"
                >
                  {approvingOrderId !== null ? (
                    <>
                      <FaSpinner className="h-4 w-4 animate-spin" />
                      Approving...
                    </>
                  ) : (
                    <>
                      <FaCircleCheck className="h-4 w-4" />
                      Approve
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Reject Modal */}
        {showRejectModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-6">
              <h2 className="mb-4 text-xl font-semibold text-slate-900">Reject Order</h2>
              <p className="mb-4 text-sm text-slate-600">
                Please provide a reason for rejecting this order. This reason will be shown to the buyer.
              </p>
              <textarea
                value={rejectReason}
                onChange={(e) => setRejectReason(e.target.value)}
                placeholder="Enter rejection reason..."
                className="w-full rounded-lg border border-slate-300 p-3 text-sm"
                rows={4}
              />
              <div className="mt-4 flex justify-end gap-3">
                <button
                  onClick={() => {
                    setShowRejectModal(false);
                    setRejectReason("");
                    setRejectingOrderId(null);
                  }}
                  className="rounded-lg border border-slate-300 px-4 py-2 text-slate-700 hover:bg-slate-50"
                >
                  Cancel
                </button>
                <button
                  onClick={() => handleReject(rejectingOrderId!)}
                  disabled={!rejectReason.trim() || rejectingOrderId === null}
                  className="rounded-lg bg-red-600 px-4 py-2 text-white hover:bg-red-700 disabled:opacity-50 flex items-center gap-2"
                >
                  {rejectingOrderId !== null ? (
                    <>
                      <FaSpinner className="h-4 w-4 animate-spin" />
                      Rejecting...
                    </>
                  ) : (
                    "Reject"
                  )}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

