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
  PendingReview,
  User,
  PayoutRequest,
  Campaign,
  ReviewReport,
  Deal,
  Wallet,
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
  currency: "INR",
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
    reward: "₹800 Cashback",
    link: "https://amazon.in",
    image: "https://images.unsplash.com/photo-1518444028785-8fbcd101ebb9",
  },
  {
    id: "store-4",
    name: "Verve Active",
    category: "Athleisure",
    reward: "₹1000 Cashback",
    link: "https://meesho.com",
    image: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f",
  },
];

export const sentimentInsights: SentimentInsight[] = [
  { marketplace: "Amazon", positive: 78, neutral: 12, negative: 10 },
  { marketplace: "Flipkart", positive: 65, neutral: 20, negative: 15 },
  { marketplace: "Nykaa", positive: 82, neutral: 10, negative: 8 },
];

export const adminActivities: AdminActivity[] = Array.from({ length: 20 }, () => ({
  id: faker.string.uuid(),
  actor: faker.person.fullName(),
  activity: faker.helpers.arrayElement([
    "made a purchase",
    "submitted a review",
    "requested payout",
    "uploaded proof",
    "approved reimbursement",
    "flagged suspicious review",
    "updated marketplace strategy",
    "banned user account",
    "verified review submission",
    "created new campaign",
    "added storefront link",
    "selected products for reputation",
    "added slots to campaign",
    "withdrew cashback",
    "completed purchase tracking",
  ]),
  timestamp: faker.date.recent({ days: 7 }).toISOString(),
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

// Admin Panel Mock Data
export const pendingReviews: PendingReview[] = Array.from({ length: 8 }, () => ({
  id: faker.string.uuid(),
  userId: faker.string.uuid(),
  userName: faker.person.fullName(),
  productName: faker.commerce.productName(),
  productImage: `https://images.unsplash.com/photo-${faker.number.int({ min: 1500000000000, max: 1600000000000 })}?w=400`,
  orderId: `ORD-${faker.string.alphanumeric(8).toUpperCase()}`,
  orderScreenshot: `https://images.unsplash.com/photo-${faker.number.int({ min: 1500000000000, max: 1600000000000 })}?w=600`,
  reviewScreenshot: `https://images.unsplash.com/photo-${faker.number.int({ min: 1500000000000, max: 1600000000000 })}?w=600`,
  reviewLink: `https://amazon.in/reviews/${faker.string.alphanumeric(10)}`,
  brandRequirements: {
    rating: 5,
    mustInclude: ["Great product", "Fast delivery"],
    mustNotInclude: ["Refund", "Return"],
  },
  submittedAt: faker.date.recent({ days: 2 }).toISOString(),
  status: "pending",
}));

export const users: User[] = Array.from({ length: 15 }, () => ({
  id: faker.string.uuid(),
  name: faker.person.fullName(),
  email: faker.internet.email(),
  phone: faker.phone.number(),
  balance: Number(faker.commerce.price({ min: 100, max: 5000 })),
  pendingCashback: Number(faker.commerce.price({ min: 0, max: 500 })),
  totalEarned: Number(faker.commerce.price({ min: 500, max: 10000 })),
  status: faker.helpers.arrayElement(["active", "banned"]),
  joinedAt: faker.date.past({ years: 1 }).toISOString(),
  lastActivity: faker.date.recent({ days: 7 }).toISOString(),
}));

export const payoutRequests: PayoutRequest[] = Array.from({ length: 6 }, () => ({
  id: faker.string.uuid(),
  userId: faker.string.uuid(),
  userName: faker.person.fullName(),
  amount: Number(faker.commerce.price({ min: 200, max: 2000 })),
  paymentMethod: faker.helpers.arrayElement(["bank", "upi"]),
  accountDetails: faker.helpers.arrayElement([
    `UPI: ${faker.person.firstName().toLowerCase()}@paytm`,
    `Bank: ${faker.finance.accountNumber()}`,
  ]),
  requestedAt: faker.date.recent({ days: 5 }).toISOString(),
  status: faker.helpers.arrayElement(["pending", "processing", "completed", "rejected"]),
  completedAt: faker.helpers.maybe(() => faker.date.recent({ days: 1 }).toISOString()),
}));

// Brand Portal Mock Data
export const campaigns: Campaign[] = Array.from({ length: 5 }, () => {
  const quantity = faker.number.int({ min: 20, max: 100 });
  const reviewsReceived = faker.number.int({ min: 5, max: quantity - 5 });
  return {
    id: faker.string.uuid(),
    productLink: `https://amazon.in/dp/${faker.string.alphanumeric(10)}`,
    productName: faker.commerce.productName(),
    productImage: `https://images.unsplash.com/photo-${faker.number.int({ min: 1500000000000, max: 1600000000000 })}?w=400`,
    quantity,
    budgetPerReview: Number(faker.commerce.price({ min: 50, max: 200 })),
    totalBudget: quantity * Number(faker.commerce.price({ min: 50, max: 200 })),
    reviewsReceived,
    averageRating: Number((Math.random() * 1.5 + 3.5).toFixed(1)),
    slotsRemaining: quantity - reviewsReceived,
    status: faker.helpers.arrayElement(["active", "paused", "completed"]),
    createdAt: faker.date.recent({ days: 30 }).toISOString(),
  };
});

export const reviewReports: ReviewReport[] = (() => {
  const campaignIds = campaigns.map((c) => c.id);
  return Array.from({ length: 20 }, () => ({
    id: faker.string.uuid(),
    campaignId: faker.helpers.arrayElement(campaignIds),
    productName: faker.commerce.productName(),
    reviewLink: `https://amazon.in/reviews/${faker.string.alphanumeric(10)}`,
    reviewerName: faker.person.fullName(),
    rating: faker.number.int({ min: 4, max: 5 }),
    postedAt: faker.date.recent({ days: 10 }).toISOString(),
    verified: faker.datatype.boolean(),
  }));
})();

// User Portal Mock Data
export const deals: Deal[] = Array.from({ length: 12 }, () => {
  const price = Number(faker.commerce.price({ min: 200, max: 2000 }));
  const cashbackPercent = 100;
  const cashbackAmount = price;
  return {
    id: faker.string.uuid(),
    productName: faker.commerce.productName(),
    productImage: `https://images.unsplash.com/photo-${faker.number.int({ min: 1500000000000, max: 1600000000000 })}?w=400`,
    price,
    cashbackAmount,
    cashbackPercent,
    marketplace: faker.helpers.arrayElement(["Amazon", "Flipkart", "Nykaa"]),
    productLink: `https://amazon.in/dp/${faker.string.alphanumeric(10)}`,
    instructions: [
      "Buy this product on Amazon",
      "Wait for delivery (usually 2-3 days)",
      "Rate 5 stars and write a review",
      "Upload proof to get 100% cashback",
    ],
    requirements: {
      rating: 5,
      mustInclude: ["Great product", "Fast delivery"],
    },
  };
});

export const wallet: Wallet = {
  pendingCashback: 1250,
  withdrawableCash: 3450,
  totalEarned: 8750,
  totalWithdrawn: 3050,
};

