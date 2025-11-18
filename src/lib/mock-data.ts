import { faker } from "@faker-js/faker";
import {
  AdminActivity,
  BudgetSnapshot,
  ComplianceAlert,
  OrderItem,
  PaymentRecord,
  Product,
  PurchaseHistory,
  ReviewRequest,
  SentimentInsight,
  Storefront,
} from "./types";

faker.seed(42);

export const products: Product[] = [
  {
    id: "prod-1",
    name: "Radiant Glow Serum",
    marketplace: "Amazon India",
    sku: "RG-001",
    rating: 3.9,
    reviews: 124,
    targetReviews: 200,
    status: "growing",
  },
  {
    id: "prod-2",
    name: "Pure Fibre Yoga Mat",
    marketplace: "Flipkart",
    sku: "PF-778",
    rating: 4.4,
    reviews: 342,
    targetReviews: 400,
    status: "stable",
  },
  {
    id: "prod-3",
    name: "Minimal Matte Lip Kit",
    marketplace: "Nykaa",
    sku: "ML-903",
    rating: 3.4,
    reviews: 88,
    targetReviews: 250,
    status: "attention",
  },
  {
    id: "prod-4",
    name: "Silk Sleep System",
    marketplace: "Amazon UAE",
    sku: "SS-556",
    rating: 4.8,
    reviews: 512,
    targetReviews: 650,
    status: "growing",
  },
];

export const reviewRequests: ReviewRequest[] = Array.from({ length: 6 }, () => ({
  id: faker.string.uuid(),
  productId: faker.helpers.arrayElement(products).id,
  reviewerName: faker.person.fullName(),
  dueDate: faker.date.soon({ days: 10 }).toISOString(),
  sentiment: faker.helpers.arrayElement(["positive", "neutral", "negative"]),
  status: faker.helpers.arrayElement(["pending", "submitted", "flagged"]),
}));

export const orderItems: OrderItem[] = Array.from({ length: 5 }, () => ({
  id: faker.string.uuid(),
  productId: faker.helpers.arrayElement(products).id,
  reviewerName: faker.person.fullName(),
  country: faker.location.country(),
  status: faker.helpers.arrayElement(["awaiting", "verified", "reimbursed"]),
  submittedAt: faker.date.recent({ days: 7 }).toISOString(),
}));

export const budgetSnapshot: BudgetSnapshot = {
  allocated: 12000,
  utilized: 8900,
  available: 3100,
  currency: "USD",
};

export const purchaseHistory: PurchaseHistory[] = Array.from({ length: 4 }, () => ({
  id: faker.string.uuid(),
  store: faker.company.name(),
  product: faker.commerce.productName(),
  amount: Number(faker.commerce.price({ min: 25, max: 120 })),
  status: faker.helpers.arrayElement(["tracking", "reviewed", "paid"]),
  purchasedAt: faker.date.recent({ days: 15 }).toISOString(),
}));

export const paymentRecords: PaymentRecord[] = [
  {
    id: faker.string.uuid(),
    amount: 45,
    status: "paid",
    reference: "TXN-2391",
    paidAt: faker.date.recent({ days: 2 }).toISOString(),
  },
  {
    id: faker.string.uuid(),
    amount: 62,
    status: "processing",
    reference: "TXN-2455",
    paidAt: faker.date.recent({ days: 1 }).toISOString(),
  },
];

export const storefronts: Storefront[] = [
  {
    id: "store-1",
    name: "Aster Beauty Lab",
    category: "Beauty & Wellness",
    reward: "₹250 Cashback",
    link: "https://amazon.in",
    image: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9",
  },
  {
    id: "store-2",
    name: "Northwind Living",
    category: "Home & Lifestyle",
    reward: "₹180 Cashback",
    link: "https://flipkart.com",
    image: "https://images.unsplash.com/photo-1489515217757-5fd1be406fef",
  },
  {
    id: "store-3",
    name: "Pulse Mobility",
    category: "Electronics",
    reward: "$10 Cashback",
    link: "https://amazon.com",
    image: "https://images.unsplash.com/photo-1518444028785-8fbcd101ebb9",
  },
  {
    id: "store-4",
    name: "Verve Active",
    category: "Athleisure",
    reward: "$12 Cashback",
    link: "https://meesho.com",
    image: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f",
  },
];

export const sentimentInsights: SentimentInsight[] = [
  { marketplace: "Amazon", positive: 78, neutral: 12, negative: 10 },
  { marketplace: "Flipkart", positive: 65, neutral: 20, negative: 15 },
  { marketplace: "Nykaa", positive: 82, neutral: 10, negative: 8 },
];

export const adminActivities: AdminActivity[] = Array.from({ length: 5 }, () => ({
  id: faker.string.uuid(),
  actor: faker.person.fullName(),
  activity: faker.helpers.arrayElement([
    "approved reimbursement",
    "flagged suspicious review",
    "updated marketplace strategy",
  ]),
  timestamp: faker.date.recent({ days: 3 }).toISOString(),
  severity: faker.helpers.arrayElement(["low", "medium", "high"]),
}));

export const complianceAlerts: ComplianceAlert[] = [
  {
    id: "alert-1",
    title: "Review velocity spike on Amazon India",
    description: "Your slots filled 3x faster than benchmark. Verify shipments.",
    risk: "medium",
    marketplace: "Amazon India",
    updatedAt: faker.date.recent({ days: 1 }).toISOString(),
  },
  {
    id: "alert-2",
    title: "Image policy change on Nykaa",
    description: "New swatch compliance rules for makeup SKUs.",
    risk: "low",
    marketplace: "Nykaa",
    updatedAt: faker.date.recent({ days: 4 }).toISOString(),
  },
];

