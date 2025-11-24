"use client";

import { useState } from "react";
import {
  FaChartBar,
  FaChevronDown,
  FaCartShopping,
  FaStar,
  FaUserCheck,
  FaShield,
  FaRocket,
  FaCircleCheck,
} from "react-icons/fa6";

export default function HowItWorksPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const brandSteps = [
    {
      icon: FaRocket,
      title: "Campaign Setup",
      description: "Create your campaign in minutes. Select products, set budget, define review requirements, and launch. Our intuitive dashboard makes it effortless.",
      color: "orange",
    },
    {
      icon: FaCartShopping,
      title: "Real Purchase Network",
      description: "Our verified network of shoppers purchases your products at full price from Amazon, Flipkart, Myntra, Nykaa, and more. Every purchase is authentic.",
      color: "green",
    },
    {
      icon: FaShield,
      title: "Verification",
      description: "Every review is verified for compliance before it goes live. Our system ensures quality and authenticity at scale.",
      color: "yellow",
    },
    {
      icon: FaChartBar,
      title: "Data & Analytics",
      description: "Track performance in real-time with comprehensive analytics. Monitor sentiment, reputation metrics, and ROI through your dashboard.",
      color: "red",
    },
  ];

  const faqs = [
    {
      question: "Is this legal and compliant?",
      answer:
        "Yes, absolutely. All reviews come from real customers who purchased products at full price. We strictly comply with all marketplace Terms of Service (TOS) including Amazon, Flipkart, and others. We never use bots, fake accounts, or incentivized reviews that violate policies. Every review is authentic, verified, and posted by genuine customers.",
    },
    {
      question: "How long does the process take?",
      answer:
        "Typically, reviews start appearing within 7-14 days after campaign launch. The timeline depends on product delivery time (usually 2-5 days), shopper review submission, and our verification process. Most campaigns see 80% completion within 30 days, with full completion typically within 45-60 days depending on campaign size.",
    },
    {
      question: "What if a review doesn't meet my requirements?",
      answer:
        "We work exclusively with verified shoppers who follow brand requirements. Our verification system checks every review before it goes live. If a review doesn't meet your criteria, our admin team can reject it before publication. You only pay for approved reviews that meet your standards, ensuring quality and compliance.",
    },
    {
      question: "Which marketplaces do you support?",
      answer:
        "We support all major Indian marketplaces including Amazon India, Flipkart, Myntra, Nykaa, Sephora, and more. Our network of verified shoppers can purchase from any marketplace you specify, ensuring comprehensive coverage for your products.",
    },
    {
      question: "How do you ensure review quality?",
      answer:
        "We use a multi-layer verification system: (1) Pre-screening of shoppers, (2) Automated content analysis, (3) Manual review by our admin team, and (4) Post-publication monitoring. This ensures every review is authentic, detailed, and compliant with marketplace guidelines.",
    },
    {
      question: "What kind of analytics do you provide?",
      answer:
        "Our dashboard provides comprehensive analytics including: review count and growth trends, sentiment analysis (positive/neutral/negative), reputation score tracking, search rank improvements, ROI metrics, and campaign performance comparisons. All data is updated in real-time.",
    },
  ];

  const colorClasses = {
    orange: "bg-gradient-to-br from-orange-400 to-orange-600 text-white border-orange-500 shadow-lg shadow-orange-500/30",
    green: "bg-gradient-to-br from-green-400 to-green-600 text-white border-green-500 shadow-lg shadow-green-500/30",
    yellow: "bg-gradient-to-br from-yellow-400 to-yellow-600 text-white border-yellow-500 shadow-lg shadow-yellow-500/30",
    red: "bg-gradient-to-br from-red-400 to-red-600 text-white border-red-500 shadow-lg shadow-red-500/30",
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-indigo-50">
      {/* Hero Section */}
      <section className="relative overflow-hidden border-b border-slate-200 bg-gradient-to-br from-white via-indigo-50/30 to-orange-50/30">
        {/* Animated Gradient Orbs */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-orange-500/20 rounded-full blur-3xl animate-pulse pointer-events-none" />
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-red-500/20 rounded-full blur-3xl animate-pulse pointer-events-none" style={{ animationDelay: '1s' }} />
        <div className="absolute bottom-0 left-1/2 w-96 h-96 bg-indigo-500/20 rounded-full blur-3xl animate-pulse pointer-events-none -translate-x-1/2" style={{ animationDelay: '0.5s' }} />
        <div className="absolute top-1/2 right-1/3 w-80 h-80 bg-cyan-500/15 rounded-full blur-3xl animate-pulse pointer-events-none" style={{ animationDelay: '1.5s' }} />
        
        <div className="container-responsive py-12 md:py-16 relative z-10">
          <div className="mx-auto max-w-4xl text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-orange-100 to-red-100 border border-orange-200/50 text-orange-700 text-sm font-semibold mb-4 shadow-md shadow-orange-500/10">
              <FaCircleCheck className="h-4 w-4 text-orange-600" />
              Trusted by 10,000+ Brands
            </div>
            <h1 className="text-5xl font-black leading-tight bg-gradient-to-r from-slate-900 via-indigo-900 to-slate-900 bg-clip-text text-transparent md:text-7xl">
              How It Works
            </h1>
            <p className="mt-4 text-xl text-slate-700 md:text-2xl max-w-2xl mx-auto font-medium">
              Get authentic, verified reviews from real customers. Simple, transparent, and compliant.
            </p>
            <div className="mt-5 flex flex-wrap items-center justify-center gap-4 text-sm">
              <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-green-50 border border-green-200/50 text-green-700 shadow-sm">
                <FaCircleCheck className="h-5 w-5 text-green-600" />
                <span className="font-medium">100% Authentic Reviews</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 border border-blue-200/50 text-blue-700 shadow-sm">
                <FaCircleCheck className="h-5 w-5 text-blue-600" />
                <span className="font-medium">Marketplace Compliant</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-purple-50 border border-purple-200/50 text-purple-700 shadow-sm">
                <FaCircleCheck className="h-5 w-5 text-purple-600" />
                <span className="font-medium">Real-Time Analytics</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="relative py-12 md:py-16 bg-gradient-to-b from-slate-50 via-white to-indigo-50/20 overflow-hidden">
        {/* Background Orbs */}
        <div className="absolute top-1/4 left-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="container-responsive relative z-10">
          <div className="mx-auto max-w-5xl">
            <div className="relative">
              {/* Vertical Line - Only on desktop */}
              <div className="absolute left-1/2 top-0 hidden h-full w-0.5 -translate-x-0.5 bg-gradient-to-b from-orange-400 via-red-500 via-indigo-500 to-purple-400 lg:block shadow-lg" />

              {/* Steps */}
              <div className="space-y-8 lg:space-y-12">
                {brandSteps.map((step, index) => {
                  const Icon = step.icon;
                  const isEven = index % 2 === 0;
                  return (
                    <div
                      key={index}
                      className="relative flex flex-col lg:flex-row lg:items-center"
                    >
                      {/* Left Side Card (Even steps) or Right Side Card (Odd steps) */}
                      <div
                        className={`w-full lg:w-[45%] ${
                          isEven ? "lg:mr-auto lg:pr-8" : "lg:ml-auto lg:pl-8 lg:order-2"
                        }`}
                      >
                        <div className="group rounded-2xl border border-slate-200/50 bg-gradient-to-br from-white to-slate-50/50 p-5 shadow-xl shadow-slate-200/60 transition-all hover:shadow-2xl hover:shadow-orange-500/20 hover:scale-[1.02] lg:p-6 backdrop-blur-sm">
                          {/* Glow effect on hover */}
                          <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-orange-500/0 via-red-500/0 to-indigo-500/0 group-hover:from-orange-500/5 group-hover:via-red-500/5 group-hover:to-indigo-500/5 transition-all duration-500 blur-xl -z-10" />
                          
                          <div className="mb-3 flex items-center gap-3 relative z-10">
                            <span className="rounded-full bg-gradient-to-r from-orange-500 via-red-600 to-orange-500 px-4 py-1.5 text-xs font-bold text-white shadow-lg shadow-orange-500/30">
                              Step {index + 1}
                            </span>
                          </div>
                          <h3 className="mb-2 text-xl font-bold bg-gradient-to-r from-slate-900 to-indigo-900 bg-clip-text text-transparent lg:text-2xl relative z-10">{step.title}</h3>
                          <p className="text-sm text-slate-700 lg:text-base leading-relaxed relative z-10">{step.description}</p>
                        </div>
                      </div>

                      {/* Icon Circle - Centered on desktop */}
                      <div
                        className={`relative z-10 mx-auto my-4 flex h-16 w-16 shrink-0 items-center justify-center rounded-full border-2 ${
                          colorClasses[step.color as keyof typeof colorClasses]
                        } lg:absolute lg:left-1/2 lg:-translate-x-1/2 lg:my-0 ${
                          isEven ? "lg:order-2" : "lg:order-1"
                        }`}
                      >
                        <Icon className="h-8 w-8" />
                      </div>

                      {/* Right Side Card (Even steps) or Left Side Card (Odd steps) - Empty spacer on desktop */}
                      <div className={`hidden lg:block lg:w-[45%] ${isEven ? "lg:order-3" : "lg:order-1"}`} />
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="relative border-t border-slate-200 bg-gradient-to-br from-white via-indigo-50/30 to-orange-50/20 overflow-hidden">
        {/* Background Orbs */}
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="container-responsive py-12 md:py-16 relative z-10">
          <div className="mx-auto max-w-6xl">
            <div className="mb-8 text-center">
              <h2 className="text-4xl font-bold bg-gradient-to-r from-slate-900 via-indigo-900 to-slate-900 bg-clip-text text-transparent">Frequently Asked Questions</h2>
              <p className="mt-3 text-xl text-slate-700 font-medium">Everything you need to know</p>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              {/* Left Column - First 3 FAQs */}
              <div className="space-y-3">
                {faqs.slice(0, 3).map((faq, index) => (
                  <div
                    key={index}
                    className="group overflow-hidden rounded-2xl border border-slate-200/50 bg-gradient-to-br from-white to-slate-50/50 shadow-xl shadow-slate-200/60 transition-all hover:shadow-2xl hover:shadow-orange-500/20 hover:scale-[1.01] backdrop-blur-sm"
                  >
                    <button
                      onClick={() => toggleFaq(index)}
                      className="flex w-full items-center justify-between p-5 text-left"
                    >
                      <h3 className="text-lg font-semibold text-slate-900 pr-4 group-hover:text-orange-700 transition-colors">{faq.question}</h3>
                      <FaChevronDown
                        className={`h-5 w-5 text-slate-400 transition-transform flex-shrink-0 group-hover:text-orange-600 ${
                          openFaq === index ? "rotate-180" : ""
                        }`}
                      />
                    </button>
                    <div
                      className={`overflow-hidden transition-all ${
                        openFaq === index ? "max-h-96" : "max-h-0"
                      }`}
                    >
                      <div className="border-t border-slate-200/50 bg-gradient-to-br from-slate-50/50 to-white p-5 text-slate-700 leading-relaxed">{faq.answer}</div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Right Column - Last 3 FAQs */}
              <div className="space-y-3">
                {faqs.slice(3, 6).map((faq, index) => {
                  const actualIndex = index + 3;
                  return (
                    <div
                      key={actualIndex}
                      className="group overflow-hidden rounded-2xl border border-slate-200/50 bg-gradient-to-br from-white to-slate-50/50 shadow-xl shadow-slate-200/60 transition-all hover:shadow-2xl hover:shadow-indigo-500/20 hover:scale-[1.01] backdrop-blur-sm"
                    >
                      <button
                        onClick={() => toggleFaq(actualIndex)}
                        className="flex w-full items-center justify-between p-5 text-left"
                      >
                        <h3 className="text-lg font-semibold text-slate-900 pr-4 group-hover:text-indigo-700 transition-colors">{faq.question}</h3>
                        <FaChevronDown
                          className={`h-5 w-5 text-slate-400 transition-transform flex-shrink-0 group-hover:text-indigo-600 ${
                            openFaq === actualIndex ? "rotate-180" : ""
                          }`}
                        />
                      </button>
                      <div
                        className={`overflow-hidden transition-all ${
                          openFaq === actualIndex ? "max-h-96" : "max-h-0"
                        }`}
                      >
                        <div className="border-t border-slate-200/50 bg-gradient-to-br from-slate-50/50 to-white p-5 text-slate-700 leading-relaxed">{faq.answer}</div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}


