import { orderItems, products, reviewRequests, sentimentInsights } from "./mock-data";
import { OrderItem, Product, ReviewRequest, SentimentInsight } from "./types";

export const productMap: Map<string, Product> = new Map(
  products.map((product) => [product.id, product])
);

export const reviewRequestQueue: Map<string, ReviewRequest[]> = reviewRequests.reduce(
  (queue, request) => {
    const existing = queue.get(request.productId) ?? [];
    queue.set(request.productId, [...existing, request]);
    return queue;
  },
  new Map<string, ReviewRequest[]>()
);

export function calculateUtilization(productId: string) {
  const product = productMap.get(productId);
  if (!product) return 0;
  return Math.min((product.reviews / product.targetReviews) * 100, 100);
}

export function groupOrdersByStatus(items: OrderItem[]) {
  return items.reduce<Record<string, number>>((acc, item) => {
    acc[item.status] = (acc[item.status] ?? 0) + 1;
    return acc;
  }, {});
}

export function sentimentTotals(data: SentimentInsight[] = sentimentInsights) {
  return data.reduce(
    (totals, insight) => {
      totals.positive += insight.positive;
      totals.neutral += insight.neutral;
      totals.negative += insight.negative;
      return totals;
    },
    { positive: 0, neutral: 0, negative: 0 }
  );
}

export function velocityIndex(items: OrderItem[] = orderItems) {
  const recent = items.filter((item) => {
    const diff = Date.now() - new Date(item.submittedAt).getTime();
    return diff < 1000 * 60 * 60 * 24 * 7;
  });
  return recent.length / Math.max(products.length, 1);
}

