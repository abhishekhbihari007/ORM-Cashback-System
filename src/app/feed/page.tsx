"use client";

import { MobileLayout } from "@/components/layouts/MobileLayout";
import Image from "next/image";

// Mock product data with marketplace links
const mockProducts = [
  {
    id: "1",
    productName: "Wireless Earbuds Pro",
    price: 2999,
    cashbackPercent: 100,
    cashbackAmount: 2999,
    productImage: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=1000&auto=format&fit=crop",
    marketplace: "Amazon",
    productLink: "https://www.amazon.in/dp/B0B1234567",
  },
  {
    id: "2",
    productName: "Vitamin C Face Serum",
    price: 1299,
    cashbackPercent: 100,
    cashbackAmount: 1299,
    productImage: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?q=80&w=1000&auto=format&fit=crop",
    marketplace: "Nykaa",
    productLink: "https://www.nykaa.com/vitamin-c-face-serum/p/123456",
  },
  {
    id: "3",
    productName: "Smart Watch Series 8",
    price: 15999,
    cashbackPercent: 100,
    cashbackAmount: 15999,
    productImage: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=1000&auto=format&fit=crop",
    marketplace: "Flipkart",
    productLink: "https://www.flipkart.com/smart-watch-series-8/p/itm123456",
  },
  {
    id: "4",
    productName: "Wireless Charging Pad",
    price: 899,
    cashbackPercent: 100,
    cashbackAmount: 899,
    productImage: "https://images.unsplash.com/photo-1586953208448-b95a79798f07?q=80&w=1000&auto=format&fit=crop",
    marketplace: "Amazon",
    productLink: "https://www.amazon.in/dp/B0B7654321",
  },
  {
    id: "5",
    productName: "Organic Green Tea",
    price: 499,
    cashbackPercent: 100,
    cashbackAmount: 499,
    productImage: "https://images.unsplash.com/photo-1556679343-c7306c1976bc?q=80&w=1000&auto=format&fit=crop",
    marketplace: "Myntra",
    productLink: "https://www.myntra.com/organic-green-tea/123456",
  },
  {
    id: "6",
    productName: "Yoga Mat Premium",
    price: 1299,
    cashbackPercent: 100,
    cashbackAmount: 1299,
    productImage: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=1000&auto=format&fit=crop",
    marketplace: "Amazon",
    productLink: "https://www.amazon.in/dp/B0B9876543",
  },
  {
    id: "7",
    productName: "Luxury Perfume Set",
    price: 3499,
    cashbackPercent: 100,
    cashbackAmount: 3499,
    productImage: "https://images.unsplash.com/photo-1541643600914-78b084683601?q=80&w=1000&auto=format&fit=crop",
    marketplace: "Sephora",
    productLink: "https://www.sephora.in/product/luxury-perfume-set/123456",
  },
  {
    id: "8",
    productName: "Skincare Bundle",
    price: 2499,
    cashbackPercent: 100,
    cashbackAmount: 2499,
    productImage: "https://images.unsplash.com/photo-1556228578-0d85b1a4d571?q=80&w=1000&auto=format&fit=crop",
    marketplace: "Nykaa",
    productLink: "https://www.nykaa.com/skincare-bundle/p/789012",
  },
  {
    id: "9",
    productName: "Fashion T-Shirt",
    price: 799,
    cashbackPercent: 100,
    cashbackAmount: 799,
    productImage: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=1000&auto=format&fit=crop",
    marketplace: "Myntra",
    productLink: "https://www.myntra.com/fashion-t-shirt/456789",
  },
];

export default function FeedPage() {
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
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {mockProducts.map((product) => (
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
                    className="block w-full rounded-lg bg-gradient-to-r from-orange-500 to-red-600 px-3 py-2 text-xs font-semibold text-white shadow-lg shadow-orange-500/30 transition-all hover:from-orange-600 hover:to-red-700 hover:shadow-xl hover:shadow-orange-500/40 hover:scale-105 text-center"
                  >
                    Get Deal
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </MobileLayout>
  );
}

