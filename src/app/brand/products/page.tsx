"use client";

import { useCallback, useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa6";
import { ProductFormModal, ProductFormData } from "@/components/sections/brand/product-form-modal";
import { brandApi, type BrandProduct } from "@/lib/backend-api";

function formatCurrency(amount: string, currency: string) {
  const value = Number(amount);
  if (Number.isNaN(value)) return `${currency} ${amount}`;
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency,
    maximumFractionDigits: 0,
  }).format(value);
}

export default function BrandProductsPage() {
  const [products, setProducts] = useState<BrandProduct[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const loadProducts = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      const response = await brandApi.getProducts();
      setProducts(response.products);
    } catch (err: any) {
      setError(err.message || "Failed to load products");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadProducts();
  }, [loadProducts]);

  const handleSubmitProduct = async (formData: ProductFormData) => {
    try {
      setIsSubmitting(true);
      setError(null);
      await brandApi.createProduct({
        name: formData.name,
        description: formData.description,
        sku: formData.sku,
        asin: formData.asin,
        price: formData.price,
        currency: formData.currency,
        product_url: formData.productLink,
        review_platform: formData.marketplace,
      });
      setIsModalOpen(false);
      await loadProducts();
    } catch (err: any) {
      setError(err.message || "Failed to create product");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="page-wrapper bg-white">
      <div className="container-responsive space-y-6 py-10">
        <div className="flex items-center justify-between gap-4 flex-wrap">
          <div>
            <p className="section-title">Products</p>
            <h1 className="text-4xl font-bold text-slate-900">SKU-level reputation controls</h1>
            <p className="text-slate-600 max-w-2xl">
              Connect your live listings, track available review slots, and add products that need an
              extra reputation push.
            </p>
          </div>
          <button
            onClick={() => setIsModalOpen(true)}
            className="inline-flex items-center gap-2 rounded-full bg-indigo-600 px-6 py-3 font-semibold text-white shadow-lg shadow-indigo-200 transition hover:bg-indigo-700"
          >
            <FaPlus className="h-4 w-4" />
            Add Product
          </button>
        </div>

        {error && (
          <div className="rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">
            {error}
          </div>
        )}

        {isLoading ? (
          <div className="rounded-3xl border border-slate-100 bg-white p-10 text-center text-slate-500">
            Loading your products...
          </div>
        ) : products.length === 0 ? (
          <div className="rounded-3xl border border-dashed border-slate-200 bg-white p-12 text-center">
            <h3 className="text-lg font-semibold text-slate-900 mb-2">No products yet</h3>
            <p className="text-sm text-slate-500 mb-6">
              Import your first SKU to start creating review campaigns and allocating cashback budgets.
            </p>
            <button
              onClick={() => setIsModalOpen(true)}
              className="rounded-full bg-indigo-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-indigo-200 transition hover:bg-indigo-700"
            >
              Add Product
            </button>
          </div>
        ) : (
          <div className="overflow-hidden rounded-3xl border border-slate-100 shadow-sm">
            <table className="w-full text-left text-sm">
              <thead className="bg-slate-50 text-xs uppercase tracking-wider text-slate-500">
                <tr>
                  <th className="px-6 py-4">Product</th>
                  <th className="px-6 py-4">Platform</th>
                  <th className="px-6 py-4">Price</th>
                  <th className="px-6 py-4">Slots</th>
                  <th className="px-6 py-4">Added</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product) => (
                  <tr key={product.id} className="border-t border-slate-100">
                    <td className="px-6 py-4">
                      <p className="font-semibold text-slate-900">{product.name}</p>
                      <p className="text-xs text-slate-500">SKU: {product.sku || "—"}</p>
                    </td>
                    <td className="px-6 py-4 text-slate-600">{product.review_platform}</td>
                    <td className="px-6 py-4 font-semibold text-slate-900">
                      {formatCurrency(product.price, product.currency)}
                    </td>
                    <td className="px-6 py-4 text-slate-600">
                      {product.available_slots ?? 0} slots open
                    </td>
                    <td className="px-6 py-4 text-slate-500">
                      {new Date(product.created_at).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        <ProductFormModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSubmit={handleSubmitProduct}
          isSubmitting={isSubmitting}
        />
      </div>
    </div>
  );
}

