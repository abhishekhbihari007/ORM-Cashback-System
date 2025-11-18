import {
  adminActivities,
  budgetSnapshot,
  complianceAlerts,
  orderItems,
  paymentRecords,
  products,
  purchaseHistory,
  reviewRequests,
  sentimentInsights,
  storefronts,
  pendingReviews,
  users,
  payoutRequests,
  campaigns,
  reviewReports,
  deals,
  wallet,
} from "./mock-data";
import { groupOrdersByStatus, sentimentTotals, velocityIndex } from "./analytics";

const simulateLatency = async <T,>(payload: T, wait = 300): Promise<T> =>
  new Promise((resolve) => {
    setTimeout(() => resolve(payload), wait);
  });

export const api = {
  fetchProducts: () => simulateLatency(products),
  fetchReviewRequests: () => simulateLatency(reviewRequests),
  fetchOrders: () => simulateLatency(orderItems),
  fetchBudget: () => simulateLatency(budgetSnapshot),
  fetchPurchaseHistory: () => simulateLatency(purchaseHistory),
  fetchPayments: () => simulateLatency(paymentRecords),
  fetchStorefronts: () => simulateLatency(storefronts),
  fetchSentiments: () => simulateLatency(sentimentInsights),
  fetchAdminActivities: () => simulateLatency(adminActivities),
  fetchComplianceAlerts: () => simulateLatency(complianceAlerts),
  fetchOrderStatusSummary: () =>
    simulateLatency(groupOrdersByStatus(orderItems)),
  fetchVelocityIndex: () => simulateLatency(velocityIndex()),
  fetchSentimentTotals: () => simulateLatency(sentimentTotals()),
  // Admin Panel APIs
  fetchPendingReviews: () => simulateLatency(pendingReviews),
  fetchUsers: () => simulateLatency(users),
  fetchPayoutRequests: () => simulateLatency(payoutRequests),
  // Brand Portal APIs
  fetchCampaigns: () => simulateLatency(campaigns),
  fetchReviewReports: () => simulateLatency(reviewReports),
  // User Portal APIs
  fetchDeals: () => simulateLatency(deals),
  fetchWallet: () => simulateLatency(wallet),
};

