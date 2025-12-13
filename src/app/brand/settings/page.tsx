"use client";

import { useEffect, useState } from "react";
import { FaFloppyDisk, FaPlus, FaStore, FaTrash, FaLink } from "react-icons/fa6";
import { brandApi, type BrandProfile, type StorefrontLink, type StorefrontPlatform } from "@/lib/backend-api";

const STOREFRONT_OPTIONS: { label: string; value: StorefrontPlatform }[] = [
  { label: "Amazon", value: "AMAZON" },
  { label: "Flipkart", value: "FLIPKART" },
  { label: "Nykaa", value: "NYKAA" },
  { label: "Meesho", value: "MEESHO" },
  { label: "Shopify", value: "SHOPIFY" },
  { label: "Other", value: "OTHER" },
];

export default function BrandSettingsPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [profile, setProfile] = useState<BrandProfile | null>(null);
  const [storefronts, setStorefronts] = useState<StorefrontLink[]>([]);
  const [profileForm, setProfileForm] = useState({
    brand_name: "",
    description: "",
    website: "",
    contact_email: "",
    contact_phone: "",
    gst_number: "",
  });
  const [storefrontForm, setStorefrontForm] = useState({
    marketplace: "AMAZON" as StorefrontPlatform,
    country: "",
    url: "",
    notes: "",
  });
  const [savingProfile, setSavingProfile] = useState(false);
  const [savingStorefront, setSavingStorefront] = useState(false);
  const [feedback, setFeedback] = useState<string | null>(null);

  useEffect(() => {
    const loadProfile = async () => {
      try {
        setIsLoading(true);
        const response = await brandApi.getProfile();
        const data = response.profile;
        setProfile(data);
        setStorefronts(data.storefronts || []);
        setProfileForm({
          brand_name: data.brand_name || "",
          description: data.description || "",
          website: data.website || "",
          contact_email: data.contact_email || "",
          contact_phone: data.contact_phone || "",
          gst_number: data.gst_number || "",
        });
      } catch (error: any) {
        setFeedback(error.message || "Failed to load brand profile.");
      } finally {
        setIsLoading(false);
      }
    };

    loadProfile();
  }, []);

  const handleProfileChange = (field: keyof typeof profileForm, value: string) => {
    setProfileForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSaveProfile = async () => {
    try {
      setSavingProfile(true);
      await brandApi.updateProfile(profileForm);
      setFeedback("Profile updated successfully.");
    } catch (error: any) {
      setFeedback(error.message || "Failed to save profile.");
    } finally {
      setSavingProfile(false);
    }
  };

  const handleAddStorefront = async () => {
    if (!storefrontForm.url) {
      setFeedback("Storefront URL is required.");
      return;
    }

    try {
      setSavingStorefront(true);
      await brandApi.createStorefront({
        marketplace: storefrontForm.marketplace,
        url: storefrontForm.url,
        country: storefrontForm.country.toUpperCase(),
        notes: storefrontForm.notes,
      });
      const updated = await brandApi.getStorefronts();
      setStorefronts(updated.storefronts);
      setStorefrontForm({
        marketplace: "AMAZON",
        country: "",
        url: "",
        notes: "",
      });
      setFeedback("Storefront added successfully.");
    } catch (error: any) {
      setFeedback(error.message || "Failed to add storefront.");
    } finally {
      setSavingStorefront(false);
    }
  };

  const handleDeleteStorefront = async (id: number) => {
    if (!window.confirm("Remove this storefront link?")) return;
    try {
      await brandApi.deleteStorefront(id);
      setStorefronts((prev) => prev.filter((storefront) => storefront.id !== id));
      setFeedback("Storefront removed.");
    } catch (error: any) {
      setFeedback(error.message || "Failed to remove storefront.");
    }
  };

  if (isLoading) {
    return (
      <div className="page-wrapper bg-slate-50">
        <div className="container-responsive py-20 text-center text-slate-500">Loading brand settings…</div>
      </div>
    );
  }

  return (
    <div className="page-wrapper bg-slate-50">
      <div className="container-responsive space-y-6 py-10">
        <div>
          <p className="section-title">Settings</p>
          <h1 className="text-4xl font-bold text-slate-900">Brand Profile & Storefronts</h1>
          <p className="text-slate-600 max-w-2xl">
            Keep your brand information in sync and share storefront links so we can track every marketplace you care about.
          </p>
        </div>

        {feedback && (
          <div className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700">
            {feedback}
          </div>
        )}

        <div className="rounded-3xl border border-slate-100 bg-white p-6 shadow-sm">
          <h2 className="text-xl font-semibold text-slate-900 mb-6">Brand Profile</h2>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700">Brand Name *</label>
              <input
                type="text"
                value={profileForm.brand_name}
                onChange={(e) => handleProfileChange("brand_name", e.target.value)}
                className="w-full rounded-xl border border-slate-200 px-4 py-3 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-100"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700">Website</label>
              <input
                type="url"
                value={profileForm.website}
                onChange={(e) => handleProfileChange("website", e.target.value)}
                className="w-full rounded-xl border border-slate-200 px-4 py-3 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-100"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700">Contact Email</label>
              <input
                type="email"
                value={profileForm.contact_email}
                onChange={(e) => handleProfileChange("contact_email", e.target.value)}
                className="w-full rounded-xl border border-slate-200 px-4 py-3 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-100"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700">Phone Number</label>
              <input
                type="tel"
                value={profileForm.contact_phone}
                onChange={(e) => handleProfileChange("contact_phone", e.target.value)}
                className="w-full rounded-xl border border-slate-200 px-4 py-3 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-100"
              />
            </div>
            <div className="md:col-span-2 space-y-2">
              <label className="text-sm font-semibold text-slate-700">Brand Description</label>
              <textarea
                value={profileForm.description}
                onChange={(e) => handleProfileChange("description", e.target.value)}
                rows={4}
                className="w-full rounded-xl border border-slate-200 px-4 py-3 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-100"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700">GST / Tax ID</label>
              <input
                type="text"
                value={profileForm.gst_number}
                onChange={(e) => handleProfileChange("gst_number", e.target.value)}
                className="w-full rounded-xl border border-slate-200 px-4 py-3 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-100"
              />
            </div>
          </div>

          <div className="flex justify-end mt-6">
            <button
              onClick={handleSaveProfile}
              disabled={savingProfile}
              className="inline-flex items-center gap-2 rounded-full bg-indigo-600 px-6 py-3 font-semibold text-white shadow-lg shadow-indigo-200 transition hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <FaFloppyDisk className="h-4 w-4" />
              {savingProfile ? "Saving..." : "Save Profile"}
            </button>
          </div>
        </div>

        <div className="rounded-3xl border border-slate-100 bg-white p-6 shadow-sm space-y-6">
          <div className="flex flex-wrap items-center gap-2">
            <FaStore className="h-5 w-5 text-slate-600" />
            <h2 className="text-xl font-semibold text-slate-900">Marketplace Storefronts</h2>
          </div>
          <p className="text-sm text-slate-500">
            Add the storefront URLs where you want us to monitor and drive reviews. You can add multiple per brand.
          </p>

          {storefronts.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-slate-200 p-6 text-center text-slate-500">
              No storefronts added yet.
            </div>
          ) : (
            <div className="overflow-hidden rounded-2xl border border-slate-100">
              <table className="w-full text-left text-sm">
                <thead className="bg-slate-50">
                  <tr className="text-xs uppercase tracking-wide text-slate-500">
                    <th className="px-4 py-3">Marketplace</th>
                    <th className="px-4 py-3">Country</th>
                    <th className="px-4 py-3">URL</th>
                    <th className="px-4 py-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {storefronts.map((storefront) => (
                    <tr key={storefront.id} className="border-t border-slate-100">
                      <td className="px-4 py-3 font-semibold text-slate-900">
                        {STOREFRONT_OPTIONS.find((opt) => opt.value === storefront.marketplace)?.label || storefront.marketplace}
                      </td>
                      <td className="px-4 py-3 text-slate-600">
                        {storefront.country ? storefront.country.toUpperCase() : "—"}
                      </td>
                      <td className="px-4 py-3 text-slate-600">
                        <a
                          href={storefront.url}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-2 text-indigo-600 hover:underline"
                        >
                          <FaLink className="h-3.5 w-3.5" />
                          {storefront.url}
                        </a>
                      </td>
                      <td className="px-4 py-3 text-right">
                        <button
                          onClick={() => handleDeleteStorefront(storefront.id)}
                          className="inline-flex items-center gap-1 rounded-full border border-slate-200 px-3 py-1.5 text-xs font-semibold text-slate-600 hover:bg-slate-50"
                        >
                          <FaTrash className="h-3.5 w-3.5" />
                          Remove
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          <div className="rounded-2xl border border-dashed border-slate-200 p-6 space-y-4">
            <h3 className="text-lg font-semibold text-slate-900">Add Storefront</h3>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700">Marketplace *</label>
                <select
                  value={storefrontForm.marketplace}
                  onChange={(e) =>
                    setStorefrontForm((prev) => ({ ...prev, marketplace: e.target.value as StorefrontPlatform }))
                  }
                  className="w-full rounded-xl border border-slate-200 px-4 py-3 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-100"
                >
                  {STOREFRONT_OPTIONS.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700">
                  Country (ISO code)
                </label>
                <input
                  type="text"
                  value={storefrontForm.country}
                  onChange={(e) => setStorefrontForm((prev) => ({ ...prev, country: e.target.value.toUpperCase() }))}
                  placeholder="IN"
                  maxLength={2}
                  className="w-full rounded-xl border border-slate-200 px-4 py-3 uppercase focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-100"
                />
              </div>
              <div className="md:col-span-2 space-y-2">
                <label className="text-sm font-semibold text-slate-700">Storefront URL *</label>
                <input
                  type="url"
                  value={storefrontForm.url}
                  onChange={(e) => setStorefrontForm((prev) => ({ ...prev, url: e.target.value }))}
                  placeholder="https://www.amazon.in/stores/your-brand"
                  className="w-full rounded-xl border border-slate-200 px-4 py-3 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-100"
                />
              </div>
              <div className="md:col-span-2 space-y-2">
                <label className="text-sm font-semibold text-slate-700">Notes (optional)</label>
                <textarea
                  value={storefrontForm.notes}
                  onChange={(e) => setStorefrontForm((prev) => ({ ...prev, notes: e.target.value }))}
                  rows={2}
                  className="w-full rounded-xl border border-slate-200 px-4 py-3 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-100"
                />
              </div>
            </div>
            <div className="flex justify-end">
              <button
                onClick={handleAddStorefront}
                disabled={savingStorefront}
                className="inline-flex items-center gap-2 rounded-full bg-slate-900 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-slate-300 transition hover:bg-slate-800 disabled:opacity-50"
              >
                <FaPlus className="h-4 w-4" />
                {savingStorefront ? "Adding..." : "Add Storefront"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

