"use client";

import { useState, useEffect } from "react";
import { api } from "@/lib/api";
import { Product } from "@/lib/types";
import { FaCircleCheck, FaCircle, FaStar } from "react-icons/fa6";
import { useRouter } from "next/navigation";

export default function SelectProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedProducts, setSelectedProducts] = useState<Set<string>>(new Set());
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  // Fetch products on mount
  useEffect(() => {
    api.fetchProducts().then((data) => {
      setProducts(data);
      setLoading(false);
    });
  }, []);

  const toggleSelection = (productId: string) => {
    const newSelected = new Set(selectedProducts);
    if (newSelected.has(productId)) {
      newSelected.delete(productId);
    } else {
      newSelected.add(productId);
    }
    setSelectedProducts(newSelected);
  };

  const handleContinue = () => {
    if (selectedProducts.size === 0) {
      alert("Please select at least one product to improve reputation.");
      return;
    }
    // In real app, this would save selected products and redirect to campaign creation
    alert(`Selected ${selectedProducts.size} product(s) for reputation improvement.`);
    router.push("/brand/campaigns/create");
  };

  if (loading) {
    return (
      <div className="page-wrapper bg-slate-50">
        <div className="container-responsive py-10">
          <div className="text-center">Loading products...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="page-wrapper bg-slate-50">
      <div className="container-responsive space-y-6 py-10">
        <div>
          <p className="section-title">Product Selection</p>
          <h1 className="text-4xl font-bold text-slate-900">Select Products to Improve Reputation</h1>
          <p className="text-slate-600">
            Choose products that need reputation improvement. You can create campaigns for selected products.
          </p>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="mb-4 flex items-center justify-between">
            <p className="text-sm font-semibold text-slate-700">
              {selectedProducts.size} product(s) selected
            </p>
            <button
              onClick={handleContinue}
              disabled={selectedProducts.size === 0}
              className="rounded-full bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Continue to Create Campaign →
            </button>
          </div>

          <div className="space-y-3">
            {products.map((product) => {
              const isSelected = selectedProducts.has(product.id);
              return (
                <div
                  key={product.id}
                  onClick={() => toggleSelection(product.id)}
                  className={`flex cursor-pointer items-center justify-between rounded-xl border-2 p-4 transition ${
                    isSelected
                      ? "border-blue-600 bg-blue-50"
                      : "border-slate-200 bg-white hover:border-slate-300"
                  }`}
                >
                  <div className="flex items-center gap-4">
                    {isSelected ? (
                      <FaCircleCheck className="text-blue-600" size={24} />
                    ) : (
                      <FaCircle className="text-slate-300" size={24} />
                    )}
                    <div>
                      <h3 className="font-semibold text-slate-900">{product.name}</h3>
                      <p className="text-sm text-slate-600">
                        {product.marketplace} • SKU: {product.sku}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <div className="flex items-center gap-1">
                        <FaStar className="text-yellow-400" />
                        <span className="font-semibold text-slate-900">{product.rating.toFixed(1)}</span>
                      </div>
                      <p className="text-xs text-slate-500">{product.reviews} reviews</p>
                    </div>
                    <div
                      className={`rounded-full px-3 py-1 text-xs font-semibold ${
                        product.status === "growing"
                          ? "bg-green-100 text-green-700"
                          : product.status === "attention"
                          ? "bg-yellow-100 text-yellow-700"
                          : "bg-slate-100 text-slate-700"
                      }`}
                    >
                      {product.status}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

