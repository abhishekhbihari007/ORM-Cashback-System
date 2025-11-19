"use client";

import { useState } from "react";
import {
  FaChartBar,
  FaCircleCheck,
  FaChevronDown,
  FaCartShopping,
  FaStar,
  FaUserCheck,
} from "react-icons/fa6";

export default function HowItWorksPage() {
  const [activeTab, setActiveTab] = useState<"brands" | "shoppers">("brands");
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const brandSteps = [
    {
      icon: FaCartShopping,
      title: "Campaign Setup",
      description: "Create your campaign, select products, set budget, and define review requirements. Our platform handles the rest.",
      color: "blue",
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
      color: "purple",
    },
  ];

  const shopperSteps = [
    {
      icon: FaCartShopping,
      title: "Browse Deals",
      description: "Explore products with 100% cashback offers. Each deal shows product details, marketplace, and cashback amount.",
      color: "blue",
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
      color: "purple",
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
    blue: "bg-blue-100 text-blue-600 border-blue-500",
    green: "bg-green-100 text-green-600 border-green-500",
    yellow: "bg-yellow-100 text-yellow-600 border-yellow-500",
    purple: "bg-purple-100 text-purple-600 border-purple-500",
  };

  const steps = activeTab === "brands" ? brandSteps : shopperSteps;

  return (
    <div className="min-h-screen bg-slate-900 text-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden border-b border-slate-800">
        <div className="container-responsive py-20 md:py-28">
          <div className="mx-auto max-w-4xl text-center">
            <h1 className="text-5xl font-black leading-tight md:text-7xl">How It Works</h1>
            <p className="mt-6 text-xl text-slate-300 md:text-2xl">
              Simple, transparent process. From setup to results in days, not months.
            </p>
          </div>
        </div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(59,130,246,0.15),_transparent_70%)]" />
      </section>

      {/* Tabs */}
      <section className="border-b border-slate-800 bg-slate-950/50">
        <div className="container-responsive py-8">
          <div className="mx-auto flex max-w-md gap-2 rounded-xl border border-slate-800 bg-slate-900/50 p-1 backdrop-blur-sm">
            <button
              onClick={() => setActiveTab("brands")}
              className={`flex-1 rounded-lg px-6 py-3 font-semibold transition ${
                activeTab === "brands"
                  ? "bg-gradient-to-r from-blue-600 to-cyan-600 text-white"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              For Brands
            </button>
            <button
              onClick={() => setActiveTab("shoppers")}
              className={`flex-1 rounded-lg px-6 py-3 font-semibold transition ${
                activeTab === "shoppers"
                  ? "bg-gradient-to-r from-blue-600 to-cyan-600 text-white"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              For Shoppers
            </button>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="bg-gray-50 py-20">
        <div className="container-responsive">
          <div className="mx-auto max-w-4xl">
            <div className="relative">
              {/* Vertical Line */}
              <div className="absolute left-8 top-0 hidden h-full w-0.5 bg-gradient-to-b from-blue-500 via-green-500 via-yellow-500 to-purple-500 md:block md:left-1/2 md:-translate-x-0.5" />

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
                        <Icon className="h-8 w-8" />
                      </div>

                      {/* Content Card */}
                      <div
                        className={`flex-1 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm md:w-[45%] md:p-8 ${
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
      <section className="border-t border-slate-800 bg-slate-950/50">
        <div className="container-responsive py-20">
          <div className="mx-auto max-w-3xl">
            <div className="mb-12 text-center">
              <h2 className="text-4xl font-bold">Frequently Asked Questions</h2>
              <p className="mt-4 text-xl text-slate-400">Everything you need to know</p>
            </div>

            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <div
                  key={index}
                  className="overflow-hidden rounded-2xl border border-slate-800 bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-sm transition"
                >
                  <button
                    onClick={() => toggleFaq(index)}
                    className="flex w-full items-center justify-between p-6 text-left"
                  >
                    <h3 className="text-xl font-semibold">{faq.question}</h3>
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
                    <div className="border-t border-slate-800 p-6 text-slate-300">{faq.answer}</div>
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

