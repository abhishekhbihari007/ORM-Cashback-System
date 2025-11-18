"use client";

import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function LoginPage() {
  const [activeTab, setActiveTab] = useState<"shoppers" | "brands">("shoppers");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Secret admin logic - check email before processing
    // Works regardless of which tab is active
    if (email === "admin@kudos.com" || email.endsWith("@kudos-admin.com")) {
      login("admin");
      setIsLoading(false);
      router.push("/admin/dashboard");
      return;
    }

    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 800));

    if (activeTab === "shoppers") {
      login("user");
      router.push("/feed");
    } else {
      login("brand");
      router.push("/dashboard");
    }

    setIsLoading(false);
  };

  return (
    <div className="flex min-h-screen">
      {/* Left Column - Desktop Only */}
      <div className="hidden lg:flex lg:w-1/2 items-center justify-center bg-slate-900 px-12">
        <div className="text-center">
          <h2 className="text-4xl font-bold text-white mb-4">
            Boost your reputation with verified reviews
          </h2>
          <p className="text-slate-300 text-lg">
            Trusted by brands and shoppers worldwide
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
            <h1 className="text-3xl font-bold text-slate-900">Welcome back</h1>
            <p className="text-slate-600 mt-2">Sign in to your account</p>
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
              <div>
                <label htmlFor="email" className="block text-sm font-semibold text-slate-700 mb-2">
                  Email address
                </label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="you@example.com"
                  className="w-full rounded-lg border border-slate-300 px-4 py-3 text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100 transition"
                />
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-semibold text-slate-700 mb-2">
                  Password
                </label>
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  placeholder="••••••••"
                  className="w-full rounded-lg border border-slate-300 px-4 py-3 text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100 transition"
                />
              </div>

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
                    Signing in...
                  </>
                ) : (
                  "Sign In"
                )}
              </button>
            </form>

            {/* Footer Links */}
            <div className="mt-6 space-y-3 text-center">
              <p className="text-sm text-slate-600">
                Don't have an account?{" "}
                <Link href="/signup" className="font-semibold text-slate-900 hover:text-slate-700">
                  Sign up
                </Link>
              </p>
              <Link
                href="/forgot-password"
                className="block text-sm font-semibold text-slate-600 hover:text-slate-900"
              >
                Forgot password?
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

