export type Sentiment = "positive" | "neutral" | "negative";

export interface Product {
  id: string;
  name: string;
  marketplace: string;
  sku: string;
  rating: number;
  reviews: number;
  targetReviews: number;
  status: "growing" | "stable" | "attention";
}

export interface ReviewRequest {
  id: string;
  productId: string;
  reviewerName: string;
  dueDate: string;
  sentiment: Sentiment;
  status: "pending" | "submitted" | "flagged";
}

export interface OrderItem {
  id: string;
  productId: string;
  reviewerName: string;
  country: string;
  status: "awaiting" | "verified" | "reimbursed";
  submittedAt: string;
}

export interface BudgetSnapshot {
  allocated: number;
  utilized: number;
  available: number;
  currency: string;
}

export interface PurchaseHistory {
  id: string;
  store: string;
  product: string;
  amount: number;
  status: "tracking" | "reviewed" | "paid";
  purchasedAt: string;
}

export interface PaymentRecord {
  id: string;
  amount: number;
  status: "processing" | "paid";
  reference: string;
  paidAt: string;
}

export interface Storefront {
  id: string;
  name: string;
  category: string;
  reward: string;
  link: string;
  image: string;
}

export interface AdminActivity {
  id: string;
  actor: string;
  activity: string;
  timestamp: string;
  severity: "low" | "medium" | "high";
}

export interface SentimentInsight {
  marketplace: string;
  positive: number;
  neutral: number;
  negative: number;
}

export interface ComplianceAlert {
  id: string;
  title: string;
  description: string;
  risk: "low" | "medium" | "high";
  marketplace: string;
  updatedAt: string;
}

// Admin Panel Types
export interface PendingReview {
  id: string;
  userId: string;
  userName: string;
  productName: string;
  productImage: string;
  orderId: string;
  orderScreenshot: string;
  reviewScreenshot: string;
  reviewLink: string;
  brandRequirements: {
    rating: number;
    mustInclude: string[];
    mustNotInclude: string[];
  };
  submittedAt: string;
  status: "pending" | "approved" | "rejected";
}

export type UserRole = "user" | "brand" | "admin" | "enterprise";

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  balance: number;
}

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  balance: number;
  pendingCashback: number;
  totalEarned: number;
  status: "active" | "banned";
  joinedAt: string;
  lastActivity: string;
}

export interface PayoutRequest {
  id: string;
  userId: string;
  userName: string;
  amount: number;
  paymentMethod: "bank" | "upi";
  accountDetails: string;
  requestedAt: string;
  status: "pending" | "processing" | "completed" | "rejected";
  completedAt?: string;
}

// Brand Portal Types
export interface Campaign {
  id: string;
  productLink: string;
  productName: string;
  productImage: string;
  quantity: number;
  budgetPerReview: number;
  totalBudget: number;
  reviewsReceived: number;
  averageRating: number;
  slotsRemaining: number;
  status: "active" | "paused" | "completed";
  createdAt: string;
}

export interface ReviewReport {
  id: string;
  campaignId: string;
  productName: string;
  reviewLink: string;
  reviewerName: string;
  rating: number;
  postedAt: string;
  verified: boolean;
}

// User Portal Types
export interface Deal {
  id: string;
  productName: string;
  productImage: string;
  price: number;
  cashbackAmount: number;
  cashbackPercent: number;
  marketplace: string;
  productLink: string;
  instructions: string[];
  requirements: {
    rating: number;
    mustInclude: string[];
  };
}

export interface Wallet {
  pendingCashback: number;
  withdrawableCash: number;
  totalEarned: number;
  totalWithdrawn: number;
}

