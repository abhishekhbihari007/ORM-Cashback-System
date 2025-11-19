"use client";

import { FaCircleCheck, FaComments, FaGlobe, FaShield, FaStar } from "react-icons/fa6";

export default function ForSellersPage() {
  return (
    <div className="min-h-screen bg-slate-900 text-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden border-b border-slate-800">
        <div className="container-responsive py-24 md:py-32">
          <div className="mx-auto max-w-4xl text-center">
            <h1 className="text-5xl font-black leading-tight md:text-7xl">
              The Operating System
              <br />
              <span className="bg-gradient-to-r from-orange-400 via-red-500 to-yellow-500 bg-clip-text text-transparent">
                for Reviews
              </span>
            </h1>
            <p className="mt-6 text-xl text-slate-300 md:text-2xl">
              Scale authentic reviews across Amazon, Flipkart, and 25+ marketplaces.
              <br />
              Built for brands that take compliance seriously.
            </p>
          </div>
        </div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(249,115,22,0.15),_transparent_70%)]" />
      </section>

      {/* Compliance Block */}
      <section className="border-b border-slate-800 bg-emerald-50/50">
        <div className="container-responsive py-12">
          <div className="mx-auto max-w-4xl rounded-2xl border-2 border-emerald-400 bg-white/80 p-8 shadow-sm shadow-emerald-100">
            <div className="flex flex-col items-center gap-4 md:flex-row md:justify-center">
              <FaShield className="h-12 w-12 text-emerald-600" />
              <div className="text-center md:text-left">
                <h2 className="text-2xl font-bold text-emerald-900">100% TOS Compliant / No Bots</h2>
                <p className="mt-2 text-emerald-700">
                  Every review comes from verified, real shoppers. We guarantee marketplace policy compliance.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features - Bento Grid */}
      <section className="bg-gradient-to-b from-white to-purple-50/50 py-20">
        <div className="container-responsive">
          <div className="mb-12 text-center">
            <h2 className="text-4xl font-bold text-gray-800">Everything You Need</h2>
            <p className="mt-4 text-xl text-gray-600">Powerful tools to manage your reputation at scale</p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {/* Review Generation */}
            <div className="group relative overflow-hidden rounded-2xl border border-purple-100 bg-white/80 p-8 shadow-sm shadow-purple-100 transition hover:border-purple-400 hover:bg-purple-50/50 hover:shadow-md">
              <div className="relative">
                <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-xl bg-purple-100">
                  <FaStar className="h-8 w-8 text-purple-600" />
                </div>
                <h3 className="mb-3 text-2xl font-bold text-gray-800">Review Generation</h3>
                <span className="inline-block mb-2 rounded-full bg-purple-100 px-3 py-1 text-xs font-semibold text-purple-600">Automated</span>
                <p className="text-gray-600">
                  Automated campaign creation, slot management, and real-time tracking of review submissions across all
                  marketplaces.
                </p>
              </div>
            </div>

            {/* Sentiment AI */}
            <div className="group relative overflow-hidden rounded-2xl border border-purple-100 bg-white/80 p-8 shadow-sm shadow-purple-100 transition hover:border-purple-400 hover:bg-purple-50/50 hover:shadow-md">
              <div className="relative">
                <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-xl bg-purple-100">
                  <FaComments className="h-8 w-8 text-purple-600" />
                </div>
                <h3 className="mb-3 text-2xl font-bold text-gray-800">Sentiment AI</h3>
                <span className="inline-block mb-2 rounded-full bg-purple-100 px-3 py-1 text-xs font-semibold text-purple-600">AI-Powered</span>
                <p className="text-gray-600">
                  Advanced AI analyzes review sentiment, detects policy violations, and ensures brand safety before
                  reviews go live.
                </p>
              </div>
            </div>

            {/* Multi-Channel Tracking */}
            <div className="group relative overflow-hidden rounded-2xl border border-purple-100 bg-white/80 p-8 shadow-sm shadow-purple-100 transition hover:border-purple-400 hover:bg-purple-50/50 hover:shadow-md">
              <div className="relative">
                <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-xl bg-purple-100">
                  <FaGlobe className="h-8 w-8 text-purple-600" />
                </div>
                <h3 className="mb-3 text-2xl font-bold text-gray-800">Multi-Channel Tracking</h3>
                <span className="inline-block mb-2 rounded-full bg-purple-100 px-3 py-1 text-xs font-semibold text-purple-600">Unified</span>
                <p className="text-gray-600">
                  Unified dashboard for Amazon, Flipkart, Nykaa, Meesho, and 25+ marketplaces. One platform, complete
                  control.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="border-t border-slate-800 bg-slate-950">
        <div className="container-responsive py-20">
          <div className="mb-12 text-center">
            <h2 className="text-4xl font-bold">Simple, Transparent Pricing</h2>
            <p className="mt-4 text-xl text-slate-400">Choose the plan that fits your scale</p>
          </div>

          <div className="grid gap-8 md:grid-cols-3 md:items-center">
            {/* Starter */}
            <div className="rounded-2xl border border-slate-800 bg-gradient-to-br from-slate-800/50 to-slate-900/50 p-8 backdrop-blur-sm">
              <h3 className="mb-2 text-2xl font-bold">Starter</h3>
              <div className="mb-6">
                <span className="text-4xl font-black">₹50K</span>
                <span className="text-slate-400">/month</span>
              </div>
              <ul className="space-y-3">
                <li className="flex items-center gap-2 text-slate-300">
                  <FaCircleCheck className="h-5 w-5 text-green-400" />
                  <span>Up to 100 reviews/month</span>
                </li>
                <li className="flex items-center gap-2 text-slate-300">
                  <FaCircleCheck className="h-5 w-5 text-green-400" />
                  <span>2 Marketplaces</span>
                </li>
                <li className="flex items-center gap-2 text-slate-300">
                  <FaCircleCheck className="h-5 w-5 text-green-400" />
                  <span>Basic Analytics</span>
                </li>
                <li className="flex items-center gap-2 text-slate-300">
                  <FaCircleCheck className="h-5 w-5 text-green-400" />
                  <span>Email Support</span>
                </li>
              </ul>
              <button className="mt-8 w-full rounded-xl border border-slate-700 bg-slate-800/50 px-6 py-3 font-semibold text-white transition hover:bg-slate-700/50">
                Get Started
              </button>
            </div>

            {/* Pro - Highlighted */}
            <div className="relative md:scale-110">
              {/* Gradient Border Wrapper */}
              <div className="rounded-2xl bg-gradient-to-r from-orange-500 to-red-600 p-[2px]">
                <div className="relative rounded-2xl bg-gradient-to-b from-slate-900 to-orange-950 p-8 backdrop-blur-sm">
                  {/* Most Popular Badge */}
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 rounded-full bg-gradient-to-r from-orange-500 to-red-600 px-4 py-1 text-sm font-semibold text-white shadow-lg">
                    Most Popular
                  </div>
                  <h3 className="mb-2 text-2xl font-bold">Pro</h3>
                  <div className="mb-6">
                    <span className="text-4xl font-black">₹2L</span>
                    <span className="text-slate-400">/month</span>
                  </div>
                  <ul className="space-y-3">
                    <li className="flex items-center gap-2 text-slate-300">
                      <FaCircleCheck className="h-5 w-5 text-green-400" />
                      <span>Up to 500 reviews/month</span>
                    </li>
                    <li className="flex items-center gap-2 text-slate-300">
                      <FaCircleCheck className="h-5 w-5 text-green-400" />
                      <span>5 Marketplaces</span>
                    </li>
                    <li className="flex items-center gap-2 text-slate-300">
                      <FaCircleCheck className="h-5 w-5 text-green-400" />
                      <span>Advanced Analytics</span>
                    </li>
                    <li className="flex items-center gap-2 text-slate-300">
                      <FaCircleCheck className="h-5 w-5 text-green-400" />
                      <span>Priority Support</span>
                    </li>
                    <li className="flex items-center gap-2 text-slate-300">
                      <FaCircleCheck className="h-5 w-5 text-green-400" />
                      <span>Sentiment AI</span>
                    </li>
                  </ul>
                  <button className="mt-8 w-full rounded-xl bg-gradient-to-r from-orange-500 to-red-600 px-6 py-3 font-semibold text-white transition hover:from-orange-600 hover:to-red-700">
                    Get Started
                  </button>
                </div>
              </div>
            </div>

            {/* Enterprise */}
            <div className="rounded-2xl border border-slate-800 bg-gradient-to-br from-slate-800/50 to-slate-900/50 p-8 backdrop-blur-sm">
              <h3 className="mb-2 text-2xl font-bold">Enterprise</h3>
              <div className="mb-6">
                <span className="text-4xl font-black">Custom</span>
              </div>
              <ul className="space-y-3">
                <li className="flex items-center gap-2 text-slate-300">
                  <FaCircleCheck className="h-5 w-5 text-green-400" />
                  <span>Unlimited reviews</span>
                </li>
                <li className="flex items-center gap-2 text-slate-300">
                  <FaCircleCheck className="h-5 w-5 text-green-400" />
                  <span>All Marketplaces</span>
                </li>
                <li className="flex items-center gap-2 text-slate-300">
                  <FaCircleCheck className="h-5 w-5 text-green-400" />
                  <span>Custom Analytics</span>
                </li>
                <li className="flex items-center gap-2 text-slate-300">
                  <FaCircleCheck className="h-5 w-5 text-green-400" />
                  <span>Dedicated Account Manager</span>
                </li>
                <li className="flex items-center gap-2 text-slate-300">
                  <FaCircleCheck className="h-5 w-5 text-green-400" />
                  <span>API Access</span>
                </li>
              </ul>
              <button className="mt-8 w-full rounded-xl border border-slate-700 bg-slate-800/50 px-6 py-3 font-semibold text-white transition hover:bg-slate-700/50">
                Contact Sales
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

