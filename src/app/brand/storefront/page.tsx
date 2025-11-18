"use client";

import { useState } from "react";
import { FaLink, FaCheckCircle, FaPlus } from "react-icons/fa6";

interface StorefrontLink {
  id: string;
  name: string;
  url: string;
  marketplace: string;
  addedAt: string;
}

// Mock data - in real app, this would come from API
const mockStorefronts: StorefrontLink[] = [
  {
    id: "1",
    name: "Amazon India Store",
    url: "https://amazon.in/shops/your-store",
    marketplace: "Amazon",
    addedAt: new Date().toISOString(),
  },
];

export default function BrandStorefrontPage() {
  const [storefronts, setStorefronts] = useState<StorefrontLink[]>(mockStorefronts);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    url: "",
    marketplace: "Amazon",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newStorefront: StorefrontLink = {
      id: Date.now().toString(),
      name: formData.name,
      url: formData.url,
      marketplace: formData.marketplace,
      addedAt: new Date().toISOString(),
    };
    setStorefronts([...storefronts, newStorefront]);
    setFormData({ name: "", url: "", marketplace: "Amazon" });
    setShowForm(false);
    alert("Storefront link added successfully!");
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
            <FaPlus /> Add Storefront
          </button>
        </div>

        {showForm && (
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="mb-4 text-xl font-bold text-slate-900">Add New Storefront Link</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700">
                  Storefront Name
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g., Amazon India Store"
                  className="w-full rounded-xl border border-slate-200 px-4 py-3 focus:border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-100"
                  required
                />
              </div>
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
                  onChange={(e) => setFormData({ ...formData, marketplace: e.target.value })}
                  className="w-full rounded-xl border border-slate-200 px-4 py-3 focus:border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-100"
                >
                  <option value="Amazon">Amazon</option>
                  <option value="Flipkart">Flipkart</option>
                  <option value="Nykaa">Nykaa</option>
                  <option value="Meesho">Meesho</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              <div className="flex gap-3">
                <button
                  type="submit"
                  className="rounded-full bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700"
                >
                  Add Storefront
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowForm(false);
                    setFormData({ name: "", url: "", marketplace: "Amazon" });
                  }}
                  className="rounded-full border border-slate-200 px-6 py-3 font-semibold text-slate-600 transition hover:bg-slate-50"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {storefronts.map((storefront) => (
            <div
              key={storefront.id}
              className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="mb-2 flex items-center gap-2">
                    <FaLink className="text-blue-600" />
                    <h3 className="text-lg font-semibold text-slate-900">{storefront.name}</h3>
                  </div>
                  <p className="mb-2 text-sm text-slate-600">{storefront.marketplace}</p>
                  <a
                    href={storefront.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-blue-600 hover:underline"
                  >
                    {storefront.url}
                  </a>
                  <p className="mt-3 text-xs text-slate-500">
                    Added {new Date(storefront.addedAt).toLocaleDateString()}
                  </p>
                </div>
                <FaCheckCircle className="text-green-500" />
              </div>
            </div>
          ))}
        </div>

        {storefronts.length === 0 && !showForm && (
          <div className="rounded-2xl border border-slate-200 bg-white p-12 text-center">
            <FaLink className="mx-auto mb-4 text-4xl text-slate-400" />
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

