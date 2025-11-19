"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import { api } from "@/lib/api";
import { Deal, Storefront } from "@/lib/types";
import { FaCartShopping, FaArrowUpRightFromSquare, FaArrowLeft } from "react-icons/fa6";

export default function StoreProductsPage() {
  const params = useParams();
  const router = useRouter();
  const storeId = params.storeId as string;
  const [storefront, setStorefront] = useState<Storefront | null>(null);
  const [products, setProducts] = useState<Deal[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch storefront and products
    Promise.all([api.fetchStorefronts(), api.fetchDeals()]).then(([storefronts, deals]) => {
      const foundStore = storefronts.find((s) => s.id === storeId);
      setStorefront(foundStore || null);
      // Filter products for this store (in real app, this would be based on storeId)
      setProducts(deals.slice(0, 6)); // Show first 6 products
      setLoading(false);
    });
  }, [storeId]);

  const handleBuyNow = (product: Deal) => {
    // Track the purchase
    const purchaseData = {
      productId: product.id,
      productName: product.productName,
      storeId: storeId,
      productLink: product.productLink,
      timestamp: new Date().toISOString(),
    };
    
    // Store in localStorage for tracking
    const trackedPurchases = JSON.parse(localStorage.getItem("trackedPurchases") || "[]");
    trackedPurchases.push(purchaseData);
    localStorage.setItem("trackedPurchases", JSON.stringify(trackedPurchases));
    
    // Open product link in new tab
    window.open(product.productLink, "_blank");
    
    // Show confirmation
    alert(`Purchase tracked! You'll be redirected to ${product.marketplace}. Don't forget to upload proof after purchase.`);
  };

  if (loading) {
    return (
      <div className="page-wrapper bg-slate-50">
        <div className="container-responsive py-10">
          <div className="text-center">Loading...</div>
        </div>
      </div>
    );
  }

  if (!storefront) {
    return (
      <div className="page-wrapper bg-slate-50">
        <div className="container-responsive py-10">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-slate-900">Store not found</h2>
            <button
              onClick={() => router.push("/user/shop")}
              className="mt-4 rounded-full bg-blue-600 px-6 py-3 font-semibold text-white"
            >
              Back to Stores
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="page-wrapper bg-slate-50">
      <div className="container-responsive space-y-6 py-10">
        <button
          onClick={() => router.push("/user/shop")}
          className="flex items-center gap-2 text-slate-600 hover:text-slate-900"
        >
          <FaArrowLeft /> Back to Stores
        </button>

        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="mb-6 flex items-center gap-4">
            <div className="relative h-20 w-20 overflow-hidden rounded-xl">
              <Image
                src={`${storefront.image}?auto=format&fit=crop&w=200&q=80`}
                alt={storefront.name}
                fill
                className="object-cover"
              />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-slate-900">{storefront.name}</h1>
              <p className="text-slate-600">{storefront.category}</p>
              <p className="text-sm font-semibold text-green-600">{storefront.reward}</p>
            </div>
          </div>
        </div>

        <div>
          <h2 className="mb-4 text-2xl font-bold text-slate-900">Available Products</h2>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {products.map((product) => (
              <div
                key={product.id}
                className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:shadow-md"
              >
                <div className="relative h-48 w-full">
                  <Image
                    src={product.productImage}
                    alt={product.productName}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute right-2 top-2 rounded-full bg-green-500 px-3 py-1 text-xs font-bold text-white">
                    100% Cashback
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="mb-2 font-semibold text-slate-900">{product.productName}</h3>
                  <p className="mb-2 text-sm text-slate-600">{product.marketplace}</p>
                  <div className="mb-3 flex items-center justify-between">
                    <span className="text-lg font-bold text-slate-900">₹{product.price}</span>
                    <span className="text-sm font-semibold text-green-600">
                      ₹{product.cashbackAmount} cashback
                    </span>
                  </div>
                  <button
                    onClick={() => handleBuyNow(product)}
                    className="flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-3 font-semibold text-white transition hover:bg-blue-700"
                  >
                    <FaCartShopping /> Buy Now
                    <FaArrowUpRightFromSquare className="text-xs" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

