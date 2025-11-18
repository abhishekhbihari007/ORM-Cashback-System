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

