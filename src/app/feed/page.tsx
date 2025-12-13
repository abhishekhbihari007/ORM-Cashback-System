"use client";

import { MobileLayout } from "@/components/layouts/MobileLayout";
import Image from "next/image";
import { MouseEvent, useCallback, useState, useMemo, useEffect } from "react";
import { userApi, type ShopProduct } from "@/lib/backend-api";
import { Icons } from "@/lib/icons";

type TrackedPurchase = {
  id: string;
  store: string;
  product: string;
  amount: number;
  status: "tracking";
  purchasedAt: string;
  productLink: string;
};

const MARKETPLACE_LABELS: Record<string, string> = {
  AMAZON: "Amazon",
  FLIPKART: "Flipkart",
  SHOPIFY: "Shopify",
  NYKAA: "Nykaa",
  MEESHO: "Meesho",
  OTHER: "Other",
};

type ProductDisplay = {
  id: string;
  productName: string;
  price: number;
  cashbackPercent: number;
  cashbackAmount: number;
  productImage: string;
  marketplace: string;
  productLink: string;
};

export default function FeedPage() {
  const [products, setProducts] = useState<ShopProduct[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedMarketplace, setSelectedMarketplace] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [trackingId, setTrackingId] = useState<number | null>(null);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const response = await userApi.getShopProducts();
        setProducts(response.products);
      } catch (err: any) {
        setError(err.message || "Unable to load products. Please try again.");
      } finally {
        setIsLoading(false);
      }
    };

    loadProducts();
  }, []);

  const marketplaces = useMemo(() => {
    const unique = Array.from(new Set(products.map(p => MARKETPLACE_LABELS[p.review_platform] || p.review_platform)));
    return unique.sort();
  }, [products]);

  const displayProducts: ProductDisplay[] = useMemo(() => {
    return products.map((product) => ({
      id: product.id.toString(),
      productName: product.name,
      price: parseFloat(product.price),
      cashbackPercent: 100, // All products offer 100% cashback
      cashbackAmount: parseFloat(product.price),
      productImage: (product as any).product_image || product.main_image || "/placeholder-product.png",
      marketplace: MARKETPLACE_LABELS[product.review_platform] || product.review_platform,
      productLink: product.product_url,
    }));
  }, [products]);

  const filteredProducts = useMemo(() => {
    let filtered = displayProducts;

    // Filter by marketplace
    if (selectedMarketplace) {
      filtered = filtered.filter(p => p.marketplace === selectedMarketplace);
    }

    // Filter by search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(p => 
        p.productName.toLowerCase().includes(query) ||
        p.marketplace.toLowerCase().includes(query)
      );
    }

    return filtered;
  }, [searchQuery, selectedMarketplace, displayProducts]);

  const handleGetDealClick = useCallback(async (product: ProductDisplay, shopProduct: ShopProduct) => {
    if (typeof window === "undefined") return;

    // Track click via API
    try {
      setTrackingId(shopProduct.id);
      await userApi.trackClick(shopProduct.id);
    } catch (err: any) {
      // Silently fail click tracking, only log in development
      if (process.env.NODE_ENV === 'development') {
        console.error("Failed to track click:", err);
      }
    } finally {
      setTrackingId(null);
    }

    // Store in localStorage for tracking
    const newEntry: TrackedPurchase = {
      id: typeof crypto !== "undefined" && "randomUUID" in crypto ? crypto.randomUUID() : `${product.id}-${Date.now()}`,
      store: product.marketplace,
      product: product.productName,
      amount: product.price,
      status: "tracking",
      purchasedAt: new Date().toISOString(),
      productLink: product.productLink,
    };

    try {
      const stored = window.localStorage.getItem("trackedPurchases");
      const parsed: TrackedPurchase[] = stored ? JSON.parse(stored) : [];
      const updated = [newEntry, ...parsed].slice(0, 50); // cap history
      window.localStorage.setItem("trackedPurchases", JSON.stringify(updated));
      window.dispatchEvent(new Event("tracked-purchases:updated"));
    } catch (error) {
      // Silently fail purchase tracking, only log in development
      if (process.env.NODE_ENV === 'development') {
        console.error("Unable to store tracked purchase", error);
      }
    }

    window.open(product.productLink, "_blank", "noopener,noreferrer");
  }, []);

  const handleLinkClick = useCallback(
    (event: MouseEvent<HTMLAnchorElement>, product: ProductDisplay) => {
      event.preventDefault();
      const shopProduct = products.find(p => p.id.toString() === product.id);
      if (shopProduct) {
        handleGetDealClick(product, shopProduct);
      }
    },
    [handleGetDealClick, products]
  );

  return (
    <MobileLayout>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-indigo-50/30 relative overflow-hidden">
        {/* Background Orbs */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="px-6 py-6 relative z-10">
          <div className="mb-6">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-slate-900 via-indigo-900 to-slate-900 bg-clip-text text-transparent">Deals Feed</h1>
            <p className="mt-1 text-sm text-slate-700 font-medium">
              Get 100% cashback on these products
            </p>
          </div>

          {/* Search and Filters */}
          <div className="mb-6 space-y-4">
            {/* Search Bar */}
            <div className="relative">
              <Icons.Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
              <input
                type="text"
                placeholder="Search products or marketplace..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-10 py-3 rounded-xl border border-slate-200 bg-white text-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-100"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                >
                  <Icons.X className="h-4 w-4" />
                </button>
              )}
            </div>

            {/* Marketplace Filters */}
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setSelectedMarketplace(null)}
                className={`px-4 py-2 rounded-full text-xs font-semibold transition ${
                  selectedMarketplace === null
                    ? "bg-indigo-600 text-white"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
              >
                All
              </button>
              {marketplaces.map((marketplace) => (
                <button
                  key={marketplace}
                  onClick={() => setSelectedMarketplace(marketplace)}
                  className={`px-4 py-2 rounded-full text-xs font-semibold transition ${
                    selectedMarketplace === marketplace
                      ? "bg-indigo-600 text-white"
                      : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                  }`}
                >
                  {marketplace}
                </button>
              ))}
            </div>
          </div>

          {/* Results Count */}
          {!isLoading && filteredProducts.length !== displayProducts.length && (
            <div className="mb-4 text-sm text-slate-600">
              Showing {filteredProducts.length} of {displayProducts.length} products
            </div>
          )}

          {/* Error State */}
          {error && (
            <div className="rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">
              {error}
            </div>
          )}

          {/* Loading State */}
          {isLoading ? (
            <div className="text-center py-12">
              <p className="text-slate-500 mb-2">Loading products...</p>
            </div>
          ) : filteredProducts.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-slate-500 mb-2">No products found</p>
              <p className="text-sm text-slate-400">Try adjusting your search or filters</p>
            </div>
          ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {filteredProducts.map((product) => {
                const isTracking = trackingId === parseInt(product.id);
                return (
              <div
                key={product.id}
                className="group overflow-hidden rounded-xl border border-slate-200/50 bg-gradient-to-br from-white to-slate-50/50 shadow-md shadow-slate-200/40 transition-all hover:shadow-xl hover:shadow-orange-500/20 hover:scale-[1.02] backdrop-blur-sm"
              >
                {/* Product Image */}
                <div className="relative aspect-square w-full overflow-hidden bg-slate-100">
                  <Image
                    src={product.productImage}
                    alt={product.productName}
                    fill
                    className="object-cover transition group-hover:scale-105"
                    sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, (max-width: 1024px) 25vw, 20vw"
                    unoptimized
                  />
                  <div className="absolute top-2 right-2 rounded-full bg-green-600 px-2 py-0.5 text-[10px] font-bold text-white shadow-md">
                    {product.cashbackPercent}%
                  </div>
                  {/* Marketplace Badge */}
                  <div 
                    className={`absolute top-2 left-2 rounded-full px-2 py-0.5 text-[10px] font-semibold text-white shadow-md ${
                      product.marketplace === "Amazon" ? "bg-orange-500" :
                      product.marketplace === "Flipkart" ? "bg-blue-500" :
                      product.marketplace === "Myntra" ? "bg-pink-500" :
                      product.marketplace === "Nykaa" ? "bg-purple-500" :
                      product.marketplace === "Sephora" ? "bg-black" :
                      "bg-slate-600"
                    }`}
                  >
                    {product.marketplace}
                  </div>
                </div>
                
                {/* Product Info */}
                <div className="p-3">
                  <p className="line-clamp-2 text-sm font-semibold text-slate-900 mb-1.5">
                    {product.productName}
                  </p>
                  <p className="text-xs text-slate-600 mb-2">
                    ₹{product.price.toLocaleString()}
                  </p>
                  <a
                    href={product.productLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(event) => handleLinkClick(event, product)}
                    className={`block w-full rounded-lg bg-gradient-to-r from-orange-500 to-red-600 px-3 py-2 text-xs font-semibold text-white shadow-lg shadow-orange-500/30 transition-all hover:from-orange-600 hover:to-red-700 hover:shadow-xl hover:shadow-orange-500/40 hover:scale-105 text-center ${
                      isTracking ? "opacity-50 cursor-not-allowed pointer-events-none" : ""
                    }`}
                  >
                    {isTracking ? "Tracking..." : "Get Deal"}
                  </a>
                </div>
              </div>
            );
              })}
          </div>
          )}
        </div>
      </div>
    </MobileLayout>
  );
}

