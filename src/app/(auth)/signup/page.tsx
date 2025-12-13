"use client";

import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import Link from "next/link";
import { ArrowLeft, Mail, Lock, Eye, EyeOff, User, Phone } from "lucide-react";
import { LogoIcon } from "@/components/ui/logo-icon";
import { ParticleBackground } from "@/components/ui/particle-background";
import { authApi } from "@/lib/backend-api";

export default function SignUpPage() {
  const [activeTab, setActiveTab] = useState<"shoppers" | "brands">("shoppers");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { login } = useAuth();

  // Shopper form fields
  const [shopperName, setShopperName] = useState("");
  const [shopperEmail, setShopperEmail] = useState("");
  const [shopperPhone, setShopperPhone] = useState("");
  const [shopperPassword, setShopperPassword] = useState("");
  const [showShopperPassword, setShowShopperPassword] = useState(false);

  // Brand form fields
  const [brandName, setBrandName] = useState("");
  const [brandCompanyName, setBrandCompanyName] = useState("");
  const [brandEmail, setBrandEmail] = useState("");
  const [brandPhone, setBrandPhone] = useState("");
  const [brandPassword, setBrandPassword] = useState("");
  const [showBrandPassword, setShowBrandPassword] = useState(false);

  const handleSubmit = async (e?: React.FormEvent) => {
    if (e) {
      e.preventDefault();
    }
    
    if (isLoading) {
      return;
    }
    
    const splitName = (fullName: string) => {
      const parts = fullName.trim().split(/\s+/);
      const firstName = parts[0] || "";
      const lastName = parts.slice(1).join(" ") || "";
      return {
        firstName: firstName || "User",
        lastName: lastName || firstName || "User",
      };
    };

    try {
      setError(null);
      setIsLoading(true);

      // Validate form fields based on active tab
      if (activeTab === "shoppers") {
        if (!shopperName || !shopperEmail || !shopperPhone || !shopperPassword) {
          setError("Please fill in all shopper fields.");
          setIsLoading(false);
          return;
        }
      } else {
        if (!brandName || !brandEmail || !brandPhone || !brandPassword) {
          setError("Please fill in all brand fields.");
          setIsLoading(false);
          return;
        }
      }

      if (activeTab === "shoppers") {
        const { firstName, lastName } = splitName(shopperName);
        await authApi.register(
          shopperEmail,
          shopperPassword,
          shopperPassword,
          firstName,
          lastName,
          shopperPhone,
          "USER"
        );
        await login(shopperEmail, shopperPassword, "user");
      } else {
        const { firstName, lastName } = splitName(brandName);
        await authApi.register(
          brandEmail,
          brandPassword,
          brandPassword,
          firstName,
          lastName,
          brandPhone,
          "BRAND"
        );
        await login(brandEmail, brandPassword, "brand");
      }
    } catch (err: any) {
      setError(err.message || "An error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full min-h-screen bg-slate-50 flex flex-col">
      {/* Back to Home Link */}
      <div className="container-responsive pt-8 pb-4 px-4 relative z-50">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-slate-600 hover:text-slate-900 transition text-sm font-medium relative z-50 cursor-pointer"
          style={{ pointerEvents: 'auto' }}
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Home
        </Link>
      </div>

      {/* Main Card Container - Centered */}
      <div className="flex-1 flex items-center justify-center px-4 pb-8">
        <div className="max-w-6xl w-full bg-white rounded-3xl shadow-2xl overflow-hidden grid md:grid-cols-2 min-h-[650px]">
          {/* Left Column - Branding & Vibes (Hidden on Mobile) */}
            <div className="hidden md:flex relative bg-gradient-to-br from-indigo-50 via-white to-cyan-50 p-8 md:p-12 flex-col justify-between overflow-hidden">
            {/* Particle Background Animation */}
            <ParticleBackground />
            
            {/* Decorative Blobs */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-300 rounded-full blur-3xl opacity-30 -translate-y-1/2 translate-x-1/2 z-10" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-blue-300 rounded-full blur-3xl opacity-30 translate-y-1/2 -translate-x-1/2 z-10" />
            <div className="absolute top-1/2 left-1/2 w-32 h-32 bg-purple-300 rounded-full blur-3xl opacity-30 -translate-x-1/2 -translate-y-1/2 z-10" />

            {/* Content */}
            <div className="relative z-10">
              {/* Logo */}
              <div className="flex items-center justify-center mb-8">
                <LogoIcon className="h-12 w-12" />
                <span className="ml-3 text-2xl font-bold text-slate-900">
                  <span className="font-bold">ORM</span> <span className="font-light">Ecosystem</span>
                </span>
              </div>

              {/* Headline */}
              <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
                Join ORM Ecosystem
              </h1>

              {/* Subhead */}
              <p className="text-lg text-slate-600">
                Start your journey with verified reviews and reputation management.
              </p>
            </div>

            {/* Social Proof Pill */}
            <div className="relative z-10 flex items-center justify-center">
              <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full shadow-sm border border-indigo-200">
                <div className="w-2 h-2 bg-indigo-500 rounded-full animate-pulse" />
                <span className="text-sm font-medium text-slate-700">
                  Trusted by 10,000+ brands worldwide
                </span>
              </div>
            </div>
          </div>

          {/* Right Column - Form */}
          <div className="p-12 md:p-16 flex flex-col justify-center bg-white">
            {/* Header */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-slate-900 mb-2">Create your account</h2>
              <p className="text-slate-600">Get started with ORM today</p>
            </div>

            {/* Card */}
            <div className="w-full relative z-10">
              {/* Tabs */}
              <div className="flex gap-2 mb-6 p-1 bg-slate-100 rounded-lg relative z-10">
                <button
                  type="button"
                  onClick={() => {
                    setActiveTab("shoppers");
                  }}
                  className={`flex-1 rounded-lg px-4 py-2.5 text-sm font-semibold transition-all cursor-pointer relative z-10 ${
                    activeTab === "shoppers"
                      ? "bg-white text-indigo-600 shadow-sm"
                      : "text-slate-600 hover:text-slate-900"
                  }`}
                  style={{ pointerEvents: 'auto' }}
                >
                  For Shoppers
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setActiveTab("brands");
                  }}
                  className={`flex-1 rounded-lg px-4 py-2.5 text-sm font-semibold transition-all cursor-pointer relative z-10 ${
                    activeTab === "brands"
                      ? "bg-white text-indigo-600 shadow-sm"
                      : "text-slate-600 hover:text-slate-900"
                  }`}
                  style={{ pointerEvents: 'auto' }}
                >
                  For Brands
                </button>
              </div>

              {/* Error */}
              {error && (
                <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-700">
                  {error}
                </div>
              )}

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-5 relative z-10">
                {activeTab === "shoppers" ? (
                  <>
                    <div>
                      <label htmlFor="shopper-name" className="block text-slate-700 font-medium mb-2 text-sm">
                        Full Name
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <User className="h-5 w-5 text-slate-400" />
                        </div>
                        <input
                          id="shopper-name"
                          type="text"
                          value={shopperName}
                          onChange={(e) => setShopperName(e.target.value)}
                          required
                          placeholder="Rahul Sharma"
                          className="w-full rounded-xl border border-slate-200 bg-white pl-10 pr-4 py-3 text-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-100 transition"
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="shopper-phone" className="block text-slate-700 font-medium mb-2 text-sm">
                        Phone Number
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <Phone className="h-5 w-5 text-slate-400" />
                        </div>
                        <input
                          id="shopper-phone"
                          type="tel"
                          value={shopperPhone}
                          onChange={(e) => setShopperPhone(e.target.value)}
                          required
                          placeholder="+1 (555) 987-6543"
                          className="w-full rounded-xl border border-slate-200 bg-white pl-10 pr-4 py-3 text-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-100 transition"
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="shopper-email" className="block text-slate-700 font-medium mb-2 text-sm">
                        Email Address
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <Mail className="h-5 w-5 text-slate-400" />
                        </div>
                        <input
                          id="shopper-email"
                          type="email"
                          value={shopperEmail}
                          onChange={(e) => setShopperEmail(e.target.value)}
                          required
                          placeholder="you@example.com"
                          className="w-full rounded-xl border border-slate-200 bg-white pl-10 pr-4 py-3 text-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-100 transition"
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="shopper-password" className="block text-slate-700 font-medium mb-2 text-sm">
                        Password
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <Lock className="h-5 w-5 text-slate-400" />
                        </div>
                        <input
                          id="shopper-password"
                          type={showShopperPassword ? "text" : "password"}
                          value={shopperPassword}
                          onChange={(e) => setShopperPassword(e.target.value)}
                          required
                          placeholder="••••••••"
                          className="w-full rounded-xl border border-slate-200 bg-white pl-10 pr-10 py-3 text-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-100 transition"
                        />
                        <button
                          type="button"
                          onClick={() => setShowShopperPassword(!showShopperPassword)}
                          className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600 transition"
                        >
                          {showShopperPassword ? (
                            <EyeOff className="h-5 w-5" />
                          ) : (
                            <Eye className="h-5 w-5" />
                          )}
                        </button>
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    <div>
                      <label htmlFor="brand-name" className="block text-slate-700 font-medium mb-2 text-sm">
                        Full Name
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <User className="h-5 w-5 text-slate-400" />
                        </div>
                        <input
                          id="brand-name"
                          type="text"
                          value={brandName}
                          onChange={(e) => setBrandName(e.target.value)}
                          required
                          placeholder="Priya Malhotra"
                          className="w-full rounded-xl border border-slate-200 bg-white pl-10 pr-4 py-3 text-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-100 transition"
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="brand-company" className="block text-slate-700 font-medium mb-2 text-sm">
                        Company / Brand Name
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <User className="h-5 w-5 text-slate-400" />
                        </div>
                        <input
                          id="brand-company"
                          type="text"
                          value={brandCompanyName}
                          onChange={(e) => setBrandCompanyName(e.target.value)}
                          placeholder="Acme Corporation"
                          className="w-full rounded-xl border border-slate-200 bg-white pl-10 pr-4 py-3 text-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-100 transition"
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="brand-email" className="block text-slate-700 font-medium mb-2 text-sm">
                        Work Email Address
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <Mail className="h-5 w-5 text-slate-400" />
                        </div>
                        <input
                          id="brand-email"
                          type="email"
                          value={brandEmail}
                          onChange={(e) => setBrandEmail(e.target.value)}
                          required
                          placeholder="contact@company.com"
                          className="w-full rounded-xl border border-slate-200 bg-white pl-10 pr-4 py-3 text-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-100 transition"
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="brand-phone" className="block text-slate-700 font-medium mb-2 text-sm">
                        Phone Number
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <Phone className="h-5 w-5 text-slate-400" />
                        </div>
                        <input
                          id="brand-phone"
                          type="tel"
                          value={brandPhone}
                          onChange={(e) => setBrandPhone(e.target.value)}
                          required
                          placeholder="+1 (555) 123-4567"
                          className="w-full rounded-xl border border-slate-200 bg-white pl-10 pr-4 py-3 text-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-100 transition"
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="brand-password" className="block text-slate-700 font-medium mb-2 text-sm">
                        Password
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <Lock className="h-5 w-5 text-slate-400" />
                        </div>
                        <input
                          id="brand-password"
                          type={showBrandPassword ? "text" : "password"}
                          value={brandPassword}
                          onChange={(e) => setBrandPassword(e.target.value)}
                          required
                          placeholder="••••••••"
                          className="w-full rounded-xl border border-slate-200 bg-white pl-10 pr-10 py-3 text-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-100 transition"
                        />
                        <button
                          type="button"
                          onClick={() => setShowBrandPassword(!showBrandPassword)}
                          className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600 transition"
                        >
                          {showBrandPassword ? (
                            <EyeOff className="h-5 w-5" />
                          ) : (
                            <Eye className="h-5 w-5" />
                          )}
                        </button>
                      </div>
                    </div>
                  </>
                )}

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full rounded-xl bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 hover:opacity-90 hover:shadow-lg hover:shadow-indigo-500/25 px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-indigo-500/25 transition focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 relative z-10 cursor-pointer"
                  style={{ pointerEvents: isLoading ? 'none' : 'auto' }}
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

                {/* Footer */}
                <div className="mt-6 text-center">
                  <p className="text-sm text-slate-600">
                    Already have an account?{" "}
                    <Link href="/login?tab=brands" className="font-semibold text-indigo-600 hover:text-indigo-700">
                      Login
                    </Link>
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

