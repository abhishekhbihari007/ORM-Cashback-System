import { http, HttpResponse } from "msw";
import {
  products,
  reviewRequests,
  orderItems,
  budgetSnapshot,
  storefronts,
} from "@/lib/mock-data";

export const handlers = [
  http.get("/api/mock/products", () => HttpResponse.json(products)),
  http.get("/api/mock/reviews", () => HttpResponse.json(reviewRequests)),
  http.get("/api/mock/orders", () => HttpResponse.json(orderItems)),
  http.get("/api/mock/budget", () => HttpResponse.json(budgetSnapshot)),
  http.get("/api/mock/storefronts", () => HttpResponse.json(storefronts)),
];

