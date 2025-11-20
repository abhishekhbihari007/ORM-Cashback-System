"use client";

import { FeedHeader } from "@/components/layout/feed-header";
import { MobileLayout } from "@/components/layouts/MobileLayout";
import Link from "next/link";

// Mock product data
const mockProducts = [
  {
    id: "1",
    productName: "Wireless Earbuds Pro",
    price: 2999,
    cashbackPercent: 100,
    cashbackAmount: 2999,
    productImage: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=1000&auto=format&fit=crop",
  },
  {
    id: "2",
    productName: "Vitamin C Face Serum",
    price: 1299,
    cashbackPercent: 100,
    cashbackAmount: 1299,
    productImage: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?q=80&w=1000&auto=format&fit=crop",
  },
  {
    id: "3",
    productName: "Smart Watch Series 8",
    price: 15999,
    cashbackPercent: 100,
    cashbackAmount: 15999,
    productImage: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=1000&auto=format&fit=crop",
  },
  {
    id: "4",
    productName: "Wireless Charging Pad",
    price: 899,
    cashbackPercent: 100,
    cashbackAmount: 899,
    productImage: "https://images.unsplash.com/photo-1586953208448-b95a79798f07?q=80&w=1000&auto=format&fit=crop",
  },
  {
    id: "5",
    productName: "Organic Green Tea",
    price: 499,
    cashbackPercent: 100,
    cashbackAmount: 499,
    productImage: "https://images.unsplash.com/photo-1556679343-c7306c1976bc?q=80&w=1000&auto=format&fit=crop",
  },
  {
    id: "6",
    productName: "Yoga Mat Premium",
    price: 1299,
    cashbackPercent: 100,
    cashbackAmount: 1299,
    productImage: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=1000&auto=format&fit=crop",
  },
];

export default function FeedPage() {
  return (
    <MobileLayout>
      <div className="min-h-screen bg-slate-50">
        <FeedHeader />
        <div className="px-6 py-6">
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-slate-900">Deals Feed</h1>
            <p className="mt-1 text-sm text-slate-600">
              Get 100% cashback on these products
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mockProducts.map((product) => (
              <Link
                key={product.id}
                href={`/feed/${product.id}`}
                className="group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:shadow-lg"
              >
                {/* Product Image */}
                <div className="relative aspect-square w-full overflow-hidden bg-slate-100">
                  <div 
                    className="w-full h-full bg-gradient-to-br from-slate-200 to-slate-300"
                    style={{
                      backgroundImage: `url(${product.productImage})`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                    }}
                  />
                  <div className="absolute top-3 right-3 rounded-full bg-green-600 px-3 py-1 text-xs font-bold text-white shadow-lg">
                    {product.cashbackPercent}% Cashback
                  </div>
                </div>
                
                {/* Product Info */}
                <div className="p-4">
                  <p className="line-clamp-2 text-base font-bold text-slate-900 mb-3">
                    {product.productName}
                  </p>
                  <button className="w-full rounded-full bg-gradient-to-r from-orange-500 to-red-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-orange-500/25 transition hover:from-orange-600 hover:to-red-700">
                    Get Deal
                  </button>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </MobileLayout>
  );
}

