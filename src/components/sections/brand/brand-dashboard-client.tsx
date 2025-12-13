"use client";

import { useCallback, useEffect, useState } from "react";
import { brandApi, type BrandAnalyticsResponse, type BrandProduct, type ReviewSlot } from "@/lib/backend-api";
import { BrandOverview } from "@/components/sections/brand/brand-overview";
import { LiveAnalyticsBoard } from "@/components/sections/brand/live-analytics-board";
import { ReviewPipeline } from "@/components/sections/brand/review-pipeline";
import { BudgetWidget } from "@/components/sections/brand/budget-widget";
import { Product, SentimentInsight, ReviewRequest, BudgetSnapshot, Campaign } from "@/lib/types";

function mapBrandProductToProduct(bp: BrandProduct): Product {
  return {
    id: bp.id.toString(),
    name: bp.name,
    marketplace: bp.review_platform,
    sku: bp.sku || "N/A",
    rating: 0, // Not available in product data, would need to calculate from reviews
    reviews: 0, // Not available, would need to count
    targetReviews: 100, // Default
    status: (bp as any).is_active !== false ? "growing" : "stable",
  };
}

function mapSentimentToInsight(sentiment: { marketplace: string; positive: number; neutral: number; negative: number }): SentimentInsight {
  return {
    marketplace: sentiment.marketplace,
    positive: sentiment.positive,
    neutral: sentiment.neutral,
    negative: sentiment.negative,
  };
}

function mapReviewSlotToReviewRequest(slot: ReviewSlot): ReviewRequest {
  const deadlineDays = slot.review_deadline_days || 7; // Default to 7 days if not specified
  return {
    id: slot.id.toString(),
    productId: slot.product.toString(),
    reviewerName: "Pending",
    dueDate: new Date(Date.now() + (deadlineDays * 24 * 60 * 60 * 1000)).toISOString(),
    sentiment: "positive",
    status: slot.status === "OPEN" ? "pending" : "submitted",
  };
}

function mapToCampaign(slot: ReviewSlot, product: BrandProduct): Campaign {
  return {
    id: slot.id.toString(),
    productLink: product.product_url || "#",
    productName: slot.product_name || product.name || "Unknown Product",
    productImage: product.main_image || "/placeholder-product.png",
    quantity: slot.total_slots || 0,
    budgetPerReview: parseFloat(slot.cashback_amount || "0"),
    totalBudget: (slot.total_slots || 0) * parseFloat(slot.cashback_amount || "0"),
    reviewsReceived: Math.max(0, (slot.total_slots || 0) - (slot.available_slots || 0)),
    slotsRemaining: slot.available_slots || 0,
    averageRating: 4.5, // Would need to calculate from reviews
    status: slot.status === "OPEN" ? "active" : "completed",
    createdAt: slot.created_at || new Date().toISOString(),
  };
}

export function BrandDashboardClient() {
  const [analytics, setAnalytics] = useState<BrandAnalyticsResponse | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [brandProducts, setBrandProducts] = useState<BrandProduct[]>([]);
  const [reviewSlots, setReviewSlots] = useState<ReviewSlot[]>([]);
  const [budget, setBudget] = useState<BudgetSnapshot>({
    allocated: 0,
    utilized: 0,
    available: 0,
    currency: "INR",
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadData = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      const [analyticsResponse, productsResponse, reviewSlotsResponse, statsResponse] = await Promise.all([
        brandApi.getAnalytics(),
        brandApi.getProducts(),
        brandApi.getReviewSlots(),
        brandApi.getStats(),
      ]);
      
      setAnalytics(analyticsResponse);
      setBrandProducts(productsResponse.products || []);
      setProducts((productsResponse.products || []).map(mapBrandProductToProduct));
      setReviewSlots(reviewSlotsResponse.slots || []);
      
      // Set budget from stats
      if (statsResponse?.stats) {
        setBudget({
          allocated: parseFloat(statsResponse.stats.total_spent || "0"),
          utilized: parseFloat(statsResponse.stats.total_spent || "0"),
          available: parseFloat(statsResponse.stats.available_balance || "0"),
          currency: statsResponse.stats.currency || "INR",
        });
      }
    } catch (err: any) {
      // Error is already handled by setError, only log in development
      if (process.env.NODE_ENV === 'development') {
        console.error("Error loading brand dashboard data:", err);
      }
      let errorMessage = err.message || "Failed to load dashboard data. Please try again.";
      
      // Provide helpful message for network errors
      if (err.message && err.message.includes('Cannot connect to backend server')) {
        errorMessage = err.message;
      } else if (err.message && err.message.includes('Failed to fetch')) {
        errorMessage = `Cannot connect to backend server. Please ensure the Django server is running at http://127.0.0.1:8000`;
      } else if (err.message && err.message.includes('Authentication required')) {
        errorMessage = "Please login to access the brand dashboard.";
      } else if (err.message && (err.message.includes('brand profile') || err.message.includes('Brand profile not found'))) {
        errorMessage = "Brand profile not found. Please create a brand profile first or contact support.";
      } else if (err.message && err.message.includes('Internal server error')) {
        errorMessage = "Server error occurred. This might be because you don't have a brand profile set up. Please contact support or try logging in again.";
      }
      
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  if (isLoading) {
    return (
      <div className="page-wrapper bg-slate-50">
        <div className="container-responsive py-10">
          <div className="text-center text-slate-600">Loading dashboard...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="page-wrapper bg-slate-50">
        <div className="container-responsive py-10">
          <div className="rounded-3xl border border-red-100 bg-red-50 p-6 text-center">
            <p className="text-red-600">{error}</p>
            <button
              onClick={loadData}
              className="mt-4 rounded-full bg-red-600 px-4 py-2 text-sm font-semibold text-white hover:bg-red-700"
            >
              Retry
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (!analytics) {
    return null;
  }

  // Map analytics data to component props
  const sentimentTotals = analytics.sentiment_totals || { positive: 0, neutral: 0, negative: 0 };
  const sentiments: SentimentInsight[] = (analytics.sentiment_by_marketplace || []).map(mapSentimentToInsight);
  const velocityIndex = analytics.velocity_index || 0;
  
  // Get review requests from review slots
  const reviewRequests: ReviewRequest[] = (reviewSlots || []).map(mapReviewSlotToReviewRequest);
  
  // Get campaigns from review slots
  const campaigns: Campaign[] = (reviewSlots || [])
    .filter(slot => slot.status === "OPEN")
    .map(slot => {
      const product = brandProducts.find(p => Number(p.id) === Number(slot.product));
      return mapToCampaign(slot, product || {
        id: slot.product,
        name: slot.product_name || "Unknown Product",
        main_image: null,
        review_platform: "AMAZON",
      } as BrandProduct);
    });

  return (
    <div className="page-wrapper bg-slate-50">
      <div className="container-responsive space-y-10 py-10">
        <BrandOverview
          products={products}
          sentimentTotals={sentimentTotals}
          velocityIndex={velocityIndex}
          sentiments={sentiments}
        />
        {analytics && (
          <LiveAnalyticsBoard 
            campaigns={campaigns}
            analytics={analytics.campaign_analytics}
          />
        )}
        <div className="grid gap-6 lg:grid-cols-[1.3fr,0.7fr]">
          <ReviewPipeline requests={reviewRequests} />
          <BudgetWidget snapshot={budget} />
        </div>
      </div>
    </div>
  );
}

