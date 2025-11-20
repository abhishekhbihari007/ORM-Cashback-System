"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import {
  FaChartBar,
  FaCircleCheck,
  FaChevronDown,
  FaCartShopping,
  FaStar,
  FaUserCheck,
} from "react-icons/fa6";

export default function HowItWorksPage() {
  const { user } = useAuth();
  const isShopper = user?.role === "user";
  const [activeTab, setActiveTab] = useState<"brands" | "shoppers">("brands");
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  useEffect(() => {
    if (!isShopper && activeTab === "shoppers") {
      setActiveTab("brands");
    }
  }, [isShopper, activeTab]);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const brandSteps = [
    {
      icon: FaCartShopping,
      title: "Campaign Setup",
      description: "Create your campaign, select products, set budget, and define review requirements. Our platform handles the rest.",
      color: "orange",
    },
    {
      icon: FaUserCheck,
      title: "Real Purchase",
      description: "Verified shoppers from our network purchase your products at full price from Amazon, Flipkart, or other marketplaces.",
      color: "green",
    },
    {
      icon: FaStar,
      title: "Verified Review",
      description: "Shoppers post authentic reviews after receiving products. Our AI verifies compliance before reviews go live.",
      color: "yellow",
    },
    {
      icon: FaChartBar,
      title: "Data Insights",
      description: "Track performance, sentiment analysis, and reputation metrics in real-time through your dashboard.",
      color: "red",
    },
  ];

  const shopperSteps = [
    {
      icon: FaCartShopping,
      title: "Browse Deals",
      description: "Explore products with 100% cashback offers. Each deal shows product details, marketplace, and cashback amount.",
      color: "orange",
    },
    {
      icon: FaUserCheck,
      title: "Purchase & Review",
      description: "Buy the product at full price from the marketplace, wait for delivery, then post a verified review.",
      color: "green",
    },
    {
      icon: FaCircleCheck,
      title: "Upload Proof",
      description: "Submit order screenshot, review screenshot, and review link. Our team verifies your submission.",
      color: "yellow",
    },
    {
      icon: FaChartBar,
      title: "Get Cashback",
      description: "Once approved, receive 100% cashback directly to your wallet. Withdraw anytime via UPI or bank transfer.",
      color: "red",
    },
  ];

  const faqs = [
    {
      question: "Is this legal?",
      answer:
        "Yes, absolutely. All reviews come from real customers who purchased products at full price. We comply with all marketplace Terms of Service (TOS) and never use bots or fake accounts. Every review is authentic and verified.",
    },
    {
      question: "How long does it take?",
      answer:
        "Typically, reviews start appearing within 7-14 days after campaign launch. The timeline depends on product delivery time, shopper review submission, and our verification process. Most campaigns see 80% completion within 30 days.",
    },
    {
      question: "What if I get a bad review?",
      answer:
        "We only work with verified shoppers who follow brand requirements. However, if a review doesn't meet your criteria, our admin team can reject it before it goes live. You only pay for approved reviews that meet your standards.",
    },
  ];

  const colorClasses = {
    orange: "bg-indigo-100 text-indigo-700 border-indigo-300",
    green: "bg-indigo-100 text-indigo-700 border-indigo-300",
    yellow: "bg-indigo-100 text-indigo-700 border-indigo-300",
    red: "bg-indigo-100 text-indigo-700 border-indigo-300",
  };

  const steps = activeTab === "brands" ? brandSteps : shopperSteps;

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Hero Section */}
      <section className="relative overflow-hidden border-b border-slate-200 bg-white">
        {/* Soft Blurry Blobs */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-indigo-300 rounded-full blur-3xl opacity-30 pointer-events-none" />
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-blue-300 rounded-full blur-3xl opacity-30 pointer-events-none" />
        <div className="absolute bottom-0 left-1/2 w-96 h-96 bg-purple-300 rounded-full blur-3xl opacity-30 pointer-events-none -translate-x-1/2" />
        
        <div className="container-responsive py-20 md:py-28 relative z-10">
          <div className="mx-auto max-w-4xl text-center">
            <h1 className="text-5xl font-black leading-tight text-slate-900 md:text-7xl">How It Works</h1>
            <p className="mt-6 text-xl text-slate-600 md:text-2xl">
              Simple, transparent process. From setup to results in days, not months.
            </p>
          </div>
        </div>
      </section>

      {/* Tabs */}
      <section className="border-b border-slate-200 bg-white">
        <div className="container-responsive py-8">
          <div className="mx-auto flex max-w-md gap-2 rounded-xl border border-slate-200 bg-slate-50 p-1">
            <button
              onClick={() => setActiveTab("brands")}
              className={`flex-1 rounded-lg px-6 py-3 font-semibold transition ${
                activeTab === "brands"
                  ? "bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white shadow-sm"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              For Brands
            </button>
            {isShopper && (
              <button
                onClick={() => setActiveTab("shoppers")}
                className={`flex-1 rounded-lg px-6 py-3 font-semibold transition ${
                  activeTab === "shoppers"
                    ? "bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white shadow-sm"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                For Shoppers
              </button>
            )}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="bg-slate-50 py-20">
        <div className="container-responsive">
          <div className="mx-auto max-w-4xl">
            <div className="relative">
              {/* Vertical Line */}
              <div className="absolute left-8 top-0 hidden h-full w-0.5 bg-gradient-to-b from-indigo-300 via-purple-300 to-pink-300 md:block md:left-1/2 md:-translate-x-0.5" />

              {/* Steps */}
              <div className="space-y-16">
                {steps.map((step, index) => {
                  const Icon = step.icon;
                  const isEven = index % 2 === 0;
                  return (
                    <div
                      key={index}
                      className={`relative flex flex-col items-start gap-6 md:flex-row md:items-center ${
                        isEven ? "md:flex-row" : "md:flex-row-reverse"
                      }`}
                    >
                      {/* Icon Circle */}
                      <div
                        className={`relative z-10 flex h-16 w-16 shrink-0 items-center justify-center rounded-full border-2 ${
                          colorClasses[step.color as keyof typeof colorClasses]
                        } md:absolute md:left-1/2 md:-translate-x-1/2`}
                      >
                        <Icon className="h-8 w-8 text-indigo-600" />
                      </div>

                      {/* Content Card */}
                      <div
                        className={`flex-1 rounded-2xl border border-slate-100 bg-white p-6 shadow-xl shadow-slate-200/60 transition hover:shadow-2xl md:w-[45%] md:p-8 ${
                          isEven ? "md:ml-auto md:mr-0" : "md:mr-auto md:ml-0"
                        }`}
                      >
                        <div className="mb-2 flex items-center gap-2">
                          <span className="rounded-full bg-gray-200 px-3 py-1 text-xs font-semibold text-gray-800">
                            Step {index + 1}
                          </span>
                        </div>
                        <h3 className="mb-3 text-xl font-bold text-gray-800 md:text-2xl">{step.title}</h3>
                        <p className="text-sm text-gray-600 md:text-base">{step.description}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="border-t border-slate-200 bg-white">
        <div className="container-responsive py-20">
          <div className="mx-auto max-w-3xl">
            <div className="mb-12 text-center">
              <h2 className="text-4xl font-bold text-slate-900">Frequently Asked Questions</h2>
              <p className="mt-4 text-xl text-slate-600">Everything you need to know</p>
            </div>

            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <div
                  key={index}
                  className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xl shadow-slate-200/60 transition hover:shadow-2xl"
                >
                  <button
                    onClick={() => toggleFaq(index)}
                    className="flex w-full items-center justify-between p-6 text-left"
                  >
                    <h3 className="text-xl font-semibold text-slate-900">{faq.question}</h3>
                    <FaChevronDown
                      className={`h-5 w-5 text-slate-400 transition-transform ${
                        openFaq === index ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                  <div
                    className={`overflow-hidden transition-all ${
                      openFaq === index ? "max-h-96" : "max-h-0"
                    }`}
                  >
                    <div className="border-t border-slate-200 p-6 text-slate-600">{faq.answer}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

