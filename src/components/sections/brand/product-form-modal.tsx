"use client";

import { useEffect, useState } from "react";
import { Icons } from "@/lib/icons";

export interface ProductFormData {
  name: string;
  sku: string;
  marketplace: "AMAZON" | "FLIPKART" | "SHOPIFY" | "OTHER";
  productLink: string;
  description: string;
  price: string;
  currency: string;
  asin?: string;
}

type Props = {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: ProductFormData) => void;
  initialData?: Partial<ProductFormData>;
  isSubmitting?: boolean;
};

const MARKETPLACE_OPTIONS = [
  { value: "AMAZON", label: "Amazon" },
  { value: "FLIPKART", label: "Flipkart" },
  { value: "SHOPIFY", label: "Shopify" },
  { value: "OTHER", label: "Other" },
] as const;

const CURRENCY_OPTIONS = ["INR", "USD", "EUR"];

export function ProductFormModal({
  isOpen,
  onClose,
  onSubmit,
  initialData,
  isSubmitting = false,
}: Props) {
  const [formData, setFormData] = useState<ProductFormData>({
    name: initialData?.name || "",
    sku: initialData?.sku || "",
    marketplace: initialData?.marketplace || "AMAZON",
    productLink: initialData?.productLink || "",
    description: initialData?.description || "",
    price: initialData?.price || "0",
    currency: initialData?.currency || "INR",
    asin: initialData?.asin,
  });

  useEffect(() => {
    if (isOpen) {
      setFormData({
        name: initialData?.name || "",
        sku: initialData?.sku || "",
        marketplace: initialData?.marketplace || "AMAZON",
        productLink: initialData?.productLink || "",
        description: initialData?.description || "",
        price: initialData?.price || "0",
        currency: initialData?.currency || "INR",
        asin: initialData?.asin,
      });
    }
  }, [
    isOpen,
    initialData?.name,
    initialData?.sku,
    initialData?.marketplace,
    initialData?.productLink,
    initialData?.description,
    initialData?.price,
    initialData?.currency,
    initialData?.asin,
  ]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="relative w-full max-w-2xl rounded-3xl border border-slate-100 bg-white p-6 shadow-xl">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-slate-400 hover:text-slate-600"
          type="button"
          aria-label="Close product modal"
        >
          <Icons.X className="h-5 w-5" />
        </button>

        <div className="mb-6 space-y-2">
          <h2 className="text-2xl font-bold text-slate-900">
            {initialData ? "Edit Product" : "Add New Product"}
          </h2>
          <p className="text-sm text-slate-500">
            Provide the SKU details exactly as they appear on your marketplace listing. You can edit these anytime.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-700">
              Product Name *
            </label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full rounded-xl border border-slate-200 px-4 py-3 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-100"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700">
                SKU *
              </label>
              <input
                type="text"
                required
                value={formData.sku}
                onChange={(e) => setFormData({ ...formData, sku: e.target.value })}
                className="w-full rounded-xl border border-slate-200 px-4 py-3 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-100"
              />
            </div>
            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700">
                Marketplace *
              </label>
              <select
                required
                value={formData.marketplace}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    marketplace: e.target.value as ProductFormData["marketplace"],
                  })
                }
                className="w-full rounded-xl border border-slate-200 px-4 py-3 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-100"
              >
                {MARKETPLACE_OPTIONS.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-700">
              Product URL *
            </label>
            <input
              type="url"
              required
              value={formData.productLink}
              onChange={(e) => setFormData({ ...formData, productLink: e.target.value })}
              placeholder="https://amazon.in/dp/..."
              className="w-full rounded-xl border border-slate-200 px-4 py-3 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-100"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-700">
              Description *
            </label>
            <textarea
              required
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full rounded-xl border border-slate-200 px-4 py-3 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-100"
              rows={3}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700">
                Price *
              </label>
              <input
                type="number"
                min="0"
                step="0.01"
                required
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                className="w-full rounded-xl border border-slate-200 px-4 py-3 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-100"
              />
            </div>
            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700">
                Currency *
              </label>
              <select
                required
                value={formData.currency}
                onChange={(e) => setFormData({ ...formData, currency: e.target.value })}
                className="w-full rounded-xl border border-slate-200 px-4 py-3 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-100"
              >
                {CURRENCY_OPTIONS.map((currency) => (
                  <option key={currency} value={currency}>
                    {currency}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-700">
              ASIN / Product Code (optional)
            </label>
            <input
              type="text"
              value={formData.asin || ""}
              onChange={(e) => setFormData({ ...formData, asin: e.target.value || undefined })}
              className="w-full rounded-xl border border-slate-200 px-4 py-3 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-100"
            />
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="rounded-full border border-slate-200 px-6 py-3 font-semibold text-slate-600 hover:bg-slate-50 transition"
              disabled={isSubmitting}
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="rounded-full bg-indigo-600 px-6 py-3 font-semibold text-white shadow-lg shadow-indigo-200 transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isSubmitting ? "Saving..." : initialData ? "Update Product" : "Add Product"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
