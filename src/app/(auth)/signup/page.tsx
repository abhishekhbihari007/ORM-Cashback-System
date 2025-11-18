"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function SignUpPage() {
  const [activeTab, setActiveTab] = useState<"shoppers" | "brands">("shoppers");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  // Shopper form fields
  const [shopperName, setShopperName] = useState("");
  const [shopperEmail, setShopperEmail] = useState("");
  const [shopperPassword, setShopperPassword] = useState("");

  // Brand form fields
  const [brandName, setBrandName] = useState("");
  const [brandEmail, setBrandEmail] = useState("");
  const [brandPhone, setBrandPhone] = useState("");
  const [brandPassword, setBrandPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 1000));

    setIsLoading(false);

    // Show browser alert
    alert("Account Created Successfully!");

    // Redirect to login page
    router.push("/login");
  };

  return (
    <div className="flex min-h-screen">
      {/* Left Column - Desktop Only */}
      <div className="hidden lg:flex lg:w-1/2 items-center justify-center bg-slate-900 px-12">
        <div className="text-center">
          <h2 className="text-4xl font-bold text-white mb-4">
            Join thousands of shoppers earning rewards today.
          </h2>
          <p className="text-slate-300 text-lg">
            Start earning cashback on every purchase
          </p>
        </div>
      </div>

      {/* Right Column - Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center bg-white px-4 py-12">
        <div className="w-full max-w-md">
          {/* Logo */}
          <div className="text-center mb-8">
            <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-slate-900 text-white text-2xl font-black mb-4">
              ORM
            </div>
            <h1 className="text-3xl font-bold text-slate-900">Create your account</h1>
            <p className="text-slate-600 mt-2">Get started with ORM today</p>
          </div>

          {/* Card */}
          <div className="rounded-2xl border border-slate-200 bg-white shadow-lg p-8">
            {/* Tabs */}
            <div className="flex gap-2 mb-6 p-1 bg-slate-100 rounded-lg">
              <button
                type="button"
                onClick={() => setActiveTab("shoppers")}
                className={`flex-1 rounded-lg px-4 py-2.5 text-sm font-semibold transition ${
                  activeTab === "shoppers"
                    ? "bg-white text-slate-900 shadow-sm"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                For Shoppers
              </button>
              <button
                type="button"
                onClick={() => setActiveTab("brands")}
                className={`flex-1 rounded-lg px-4 py-2.5 text-sm font-semibold transition ${
                  activeTab === "brands"
                    ? "bg-white text-slate-900 shadow-sm"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                For Brands
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-5">
              {activeTab === "shoppers" ? (
                <>
                  <div>
                    <label htmlFor="shopper-name" className="block text-sm font-semibold text-slate-700 mb-2">
                      Full Name
                    </label>
                    <input
                      id="shopper-name"
                      type="text"
                      value={shopperName}
                      onChange={(e) => setShopperName(e.target.value)}
                      required
                      placeholder="John Doe"
                      className="w-full rounded-lg border border-slate-300 px-4 py-3 text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100 transition"
                    />
                  </div>

                  <div>
                    <label htmlFor="shopper-email" className="block text-sm font-semibold text-slate-700 mb-2">
                      Email Address
                    </label>
                    <input
                      id="shopper-email"
                      type="email"
                      value={shopperEmail}
                      onChange={(e) => setShopperEmail(e.target.value)}
                      required
                      placeholder="you@example.com"
                      className="w-full rounded-lg border border-slate-300 px-4 py-3 text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100 transition"
                    />
                  </div>

                  <div>
                    <label htmlFor="shopper-password" className="block text-sm font-semibold text-slate-700 mb-2">
                      Password
                    </label>
                    <input
                      id="shopper-password"
                      type="password"
                      value={shopperPassword}
                      onChange={(e) => setShopperPassword(e.target.value)}
                      required
                      placeholder="••••••••"
                      className="w-full rounded-lg border border-slate-300 px-4 py-3 text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100 transition"
                    />
                  </div>
                </>
              ) : (
                <>
                  <div>
                    <label htmlFor="brand-name" className="block text-sm font-semibold text-slate-700 mb-2">
                      Company/Brand Name
                    </label>
                    <input
                      id="brand-name"
                      type="text"
                      value={brandName}
                      onChange={(e) => setBrandName(e.target.value)}
                      required
                      placeholder="Acme Corporation"
                      className="w-full rounded-lg border border-slate-300 px-4 py-3 text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100 transition"
                    />
                  </div>

                  <div>
                    <label htmlFor="brand-email" className="block text-sm font-semibold text-slate-700 mb-2">
                      Work Email Address
                    </label>
                    <input
                      id="brand-email"
                      type="email"
                      value={brandEmail}
                      onChange={(e) => setBrandEmail(e.target.value)}
                      required
                      placeholder="contact@company.com"
                      className="w-full rounded-lg border border-slate-300 px-4 py-3 text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100 transition"
                    />
                  </div>

                  <div>
                    <label htmlFor="brand-phone" className="block text-sm font-semibold text-slate-700 mb-2">
                      Phone Number
                    </label>
                    <input
                      id="brand-phone"
                      type="tel"
                      value={brandPhone}
                      onChange={(e) => setBrandPhone(e.target.value)}
                      required
                      placeholder="+1 (555) 123-4567"
                      className="w-full rounded-lg border border-slate-300 px-4 py-3 text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100 transition"
                    />
                  </div>

                  <div>
                    <label htmlFor="brand-password" className="block text-sm font-semibold text-slate-700 mb-2">
                      Password
                    </label>
                    <input
                      id="brand-password"
                      type="password"
                      value={brandPassword}
                      onChange={(e) => setBrandPassword(e.target.value)}
                      required
                      placeholder="••••••••"
                      className="w-full rounded-lg border border-slate-300 px-4 py-3 text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100 transition"
                    />
                  </div>
                </>
              )}

              <button
                type="submit"
                disabled={isLoading}
                className="w-full rounded-lg bg-slate-900 px-4 py-3 text-sm font-semibold text-white transition hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-900 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isLoading ? (
                  <>
                    <svg
                      className="animate-spin h-4 w-4 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Creating account...
                  </>
                ) : activeTab === "shoppers" ? (
                  "Create Shopper Account"
                ) : (
                  "Register Brand"
                )}
              </button>
            </form>

            {/* Footer Links */}
            <div className="mt-6 text-center">
              <p className="text-sm text-slate-600">
                Already have an account?{" "}
                <Link href="/login" className="font-semibold text-slate-900 hover:text-slate-700">
                  Login
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

