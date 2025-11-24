"use client";

import { useState, useEffect, Suspense } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Mail, Lock, Eye, EyeOff } from "lucide-react";
import { LogoIcon } from "@/components/ui/logo-icon";
import { ParticleBackground } from "@/components/ui/particle-background";

function LoginForm() {
  // Enterprise feature hidden for now - will be enabled after launch
  const searchParams = useSearchParams();
  const tabParam = searchParams.get("tab");
  const defaultTab = tabParam === "brands" ? "brands" : "shoppers";
  const [activeTab, setActiveTab] = useState<"shoppers" | "brands">(defaultTab);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();

  // Update active tab when query parameter changes
  useEffect(() => {
    const tab = searchParams.get("tab");
    if (tab === "brands") {
      setActiveTab("brands");
    } else if (tab === "shoppers") {
      setActiveTab("shoppers");
    }
  }, [searchParams]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (isLoading) {
      return;
    }
    
    const requiresPassword = activeTab === "brands";

    try {
      setIsLoading(true);

      if (requiresPassword && !password) {
        alert("Please enter your password to continue.");
        setIsLoading(false);
        return;
      }

      // TODO: TEMPORARY - Replace with real authentication API call
      // For now, allowing direct login without credentials for development/testing
      // When real auth is implemented, validate email/password here and call API
      
      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 500));

      // TODO: Replace this with actual authentication logic
      // Example: const response = await api.login(email, password, activeTab);
      // if (response.success) { login(response.role); }

      if (activeTab === "shoppers") {
        login("user");
      } else if (activeTab === "brands") {
        login("brand");
      }

      setIsLoading(false);
    } catch (error) {
      alert("An error occurred. Please try again.");
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
                Welcome to ORM Ecosystem
              </h1>

              {/* Subhead */}
              <p className="text-lg text-slate-600">
                Join thousands of brands advancing their reputation with verified reviews.
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
          <div className="p-12 md:p-16 flex flex-col justify-center relative z-10 bg-white">
            {/* Header */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-slate-900 mb-2">Sign In</h2>
              <p className="text-slate-600">Enter your credentials to access your account.</p>
            </div>

            {/* Tabs */}
            {/* Enterprise feature hidden for now - will be enabled after launch */}
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

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-5 relative z-10">
              {/* Email Field */}
              <div>
                <label htmlFor="email" className="block text-slate-700 font-medium mb-2 text-sm">
                  Email address
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-slate-400" />
                  </div>
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    className="w-full rounded-xl border border-slate-200 bg-white pl-10 pr-4 py-3 text-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-100 transition"
                  />
                </div>
              </div>

              {/* Password Field */}
              {activeTab === "brands" ? (
                <div>
                  <label htmlFor="password" className="block text-slate-700 font-medium mb-2 text-sm">
                    Password
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Lock className="h-5 w-5 text-slate-400" />
                    </div>
                    <input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full rounded-xl border border-slate-200 bg-white pl-10 pr-10 py-3 text-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-100 transition"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600 transition"
                    >
                      {showPassword ? (
                        <EyeOff className="h-5 w-5" />
                      ) : (
                        <Eye className="h-5 w-5" />
                      )}
                    </button>
                  </div>
                </div>
              ) : null}

              {/* Remember Me & Forgot Password */}
              <div className="flex items-center justify-between">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="w-4 h-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500"
                  />
                  <span className="text-sm text-slate-600">Remember me</span>
                </label>
                <Link
                  href="/forgot-password"
                  className="text-sm font-medium text-indigo-600 hover:text-indigo-700"
                >
                  Forgot password?
                </Link>
              </div>

              {/* Submit Button */}
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
                    Signing in...
                  </>
                ) : (
                  "Sign In"
                )}
              </button>
            </form>

            {/* Footer */}
            <div className="mt-6 text-center">
              <p className="text-sm text-slate-600">
                Don't have an account?{" "}
                <Link href="/signup" className="font-semibold text-orange-600 hover:text-orange-700">
                  Sign up here
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={
      <div className="w-full min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-slate-600">Loading...</div>
      </div>
    }>
      <LoginForm />
    </Suspense>
  );
}

