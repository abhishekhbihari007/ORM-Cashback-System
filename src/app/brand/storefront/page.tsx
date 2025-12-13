"use client";

import { useState, useEffect } from "react";
import { brandApi, type StorefrontLink, type StorefrontPlatform } from "@/lib/backend-api";
import { Icons } from "@/lib/icons";

const MARKETPLACE_LABELS: Record<string, string> = {
  AMAZON: "Amazon",
  FLIPKART: "Flipkart",
  SHOPIFY: "Shopify",
  NYKAA: "Nykaa",
  MEESHO: "Meesho",
  OTHER: "Other",
};

interface StorefrontDisplay {
  id: string;
  name: string;
  url: string;
  marketplace: string;
  addedAt: string;
}

function mapStorefrontLink(link: StorefrontLink): StorefrontDisplay {
  const marketplaceLabel = MARKETPLACE_LABELS[link.marketplace] || link.marketplace;
  const name = link.country 
    ? `${marketplaceLabel} ${link.country} Store`
    : `${marketplaceLabel} Store`;
  
  return {
    id: link.id.toString(),
    name,
    url: link.url,
    marketplace: marketplaceLabel,
    addedAt: link.created_at,
  };
}

export default function BrandStorefrontPage() {
  const [storefronts, setStorefronts] = useState<StorefrontDisplay[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    url: "",
    marketplace: "AMAZON" as StorefrontPlatform,
    country: "",
    notes: "",
  });

  useEffect(() => {
    const loadStorefronts = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const response = await brandApi.getStorefronts();
        const mapped = response.storefronts.map(mapStorefrontLink);
        setStorefronts(mapped);
      } catch (err: any) {
        setError(err.message || "Unable to load storefronts. Please try again.");
      } finally {
        setIsLoading(false);
      }
    };
    loadStorefronts();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setIsSubmitting(true);
      setError(null);
      await brandApi.createStorefront({
        url: formData.url,
        marketplace: formData.marketplace,
        country: formData.country || undefined,
        notes: formData.notes || undefined,
      });
      
      // Reload storefronts
      const response = await brandApi.getStorefronts();
      const mapped = response.storefronts.map(mapStorefrontLink);
      setStorefronts(mapped);
      
      setFormData({ url: "", marketplace: "AMAZON", country: "", notes: "" });
      setShowForm(false);
    } catch (err: any) {
      setError(err.message || "Failed to add storefront. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this storefront?")) return;
    
    try {
      setError(null);
      await brandApi.deleteStorefront(parseInt(id));
      
      // Reload storefronts
      const response = await brandApi.getStorefronts();
      const mapped = response.storefronts.map(mapStorefrontLink);
      setStorefronts(mapped);
    } catch (err: any) {
      setError(err.message || "Failed to delete storefront. Please try again.");
    }
  };

  return (
    <div className="page-wrapper bg-slate-50">
      <div className="container-responsive space-y-6 py-10">
        <div className="flex items-center justify-between">
          <div>
            <p className="section-title">Storefront</p>
            <h1 className="text-4xl font-bold text-slate-900">Manage Your Storefront Links</h1>
            <p className="text-slate-600">
              Add and manage links to your storefronts on different marketplaces.
            </p>
          </div>
          <button
            onClick={() => setShowForm(!showForm)}
            className="flex items-center gap-2 rounded-full bg-blue-600 px-6 py-3 font-semibold text-white shadow-lg transition hover:bg-blue-700"
          >
            <Icons.Plus className="h-4 w-4" /> Add Storefront
          </button>
        </div>

        {showForm && (
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="mb-4 text-xl font-bold text-slate-900">Add New Storefront Link</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700">
                  Storefront URL
                </label>
                <input
                  type="url"
                  value={formData.url}
                  onChange={(e) => setFormData({ ...formData, url: e.target.value })}
                  placeholder="https://amazon.in/shops/your-store"
                  className="w-full rounded-xl border border-slate-200 px-4 py-3 focus:border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-100"
                  required
                />
              </div>
              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700">
                  Marketplace
                </label>
                <select
                  value={formData.marketplace}
                  onChange={(e) => setFormData({ ...formData, marketplace: e.target.value as StorefrontPlatform })}
                  className="w-full rounded-xl border border-slate-200 px-4 py-3 focus:border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-100"
                >
                  <option value="AMAZON">Amazon</option>
                  <option value="FLIPKART">Flipkart</option>
                  <option value="NYKAA">Nykaa</option>
                  <option value="MEESHO">Meesho</option>
                  <option value="SHOPIFY">Shopify</option>
                  <option value="OTHER">Other</option>
                </select>
              </div>
              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700">
                  Country (optional)
                </label>
                <input
                  type="text"
                  value={formData.country}
                  onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                  placeholder="e.g., India"
                  className="w-full rounded-xl border border-slate-200 px-4 py-3 focus:border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-100"
                />
              </div>
              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700">
                  Notes (optional)
                </label>
                <textarea
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  placeholder="Internal notes about this storefront"
                  className="w-full rounded-xl border border-slate-200 px-4 py-3 focus:border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-100"
                  rows={3}
                />
              </div>
              {error && (
                <div className="rounded-lg border border-rose-200 bg-rose-50 px-4 py-2 text-sm text-rose-700">
                  {error}
                </div>
              )}
              <div className="flex gap-3">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="rounded-full bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700 disabled:opacity-50"
                >
                  {isSubmitting ? "Adding..." : "Add Storefront"}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowForm(false);
                    setFormData({ url: "", marketplace: "AMAZON", country: "", notes: "" });
                    setError(null);
                  }}
                  className="rounded-full border border-slate-200 px-6 py-3 font-semibold text-slate-600 transition hover:bg-slate-50"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}

        {error && !showForm && (
          <div className="rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">
            Error: {error}
          </div>
        )}

        {isLoading ? (
          <div className="rounded-2xl border border-slate-200 bg-white p-12 text-center text-slate-500">
            Loading storefronts...
          </div>
        ) : (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {storefronts.map((storefront) => (
              <div
                key={storefront.id}
                className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="mb-2 flex items-center gap-2">
                      <Icons.Link className="text-blue-600 h-4 w-4" />
                      <h3 className="text-lg font-semibold text-slate-900">{storefront.name}</h3>
                    </div>
                    <p className="mb-2 text-sm text-slate-600">{storefront.marketplace}</p>
                    <a
                      href={storefront.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-blue-600 hover:underline break-all"
                    >
                      {storefront.url}
                    </a>
                    <p className="mt-3 text-xs text-slate-500">
                      Added {new Date(storefront.addedAt).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Icons.CircleCheck className="text-green-500 h-4 w-4" />
                    <button
                      onClick={() => handleDelete(storefront.id)}
                      className="text-red-500 hover:text-red-700 transition"
                      title="Delete storefront"
                    >
                      <Icons.Trash className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {!isLoading && storefronts.length === 0 && !showForm && (
          <div className="rounded-2xl border border-slate-200 bg-white p-12 text-center">
            <Icons.Link className="mx-auto mb-4 text-4xl text-slate-400" />
            <h3 className="mb-2 text-lg font-semibold text-slate-900">No Storefronts Added</h3>
            <p className="mb-4 text-slate-600">Add your first storefront link to get started.</p>
            <button
              onClick={() => setShowForm(true)}
              className="rounded-full bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700"
            >
              Add Storefront
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

