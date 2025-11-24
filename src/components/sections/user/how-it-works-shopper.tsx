"use client";

import { useState } from "react";
import {
  FaCartShopping,
  FaCircleCheck,
  FaChevronDown,
  FaChartBar,
  FaUserCheck,
} from "react-icons/fa6";

export function HowItWorksShopper() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const shopperSteps = [
    {
      icon: FaCartShopping,
      title: "Browse Deals",
      description: "Explore products with 100% cashback offers. Each deal shows product details, marketplace link, and cashback amount. Click 'Get Deal' to visit the marketplace.",
      color: "orange",
    },
    {
      icon: FaUserCheck,
      title: "Purchase & Review",
      description: "Buy the product at full price from Amazon, Flipkart, Myntra, or other marketplaces. Wait for delivery, then post an authentic review with your honest feedback.",
      color: "green",
    },
    {
      icon: FaCircleCheck,
      title: "Upload Proof",
      description: "Submit your order screenshot, review screenshot, and review link through our upload portal. Our verification team will review your submission.",
      color: "yellow",
    },
    {
      icon: FaChartBar,
      title: "Get Cashback",
      description: "Once approved, receive 100% cashback directly to your wallet. Withdraw anytime via UPI or bank transfer. Track all your earnings in your dashboard.",
      color: "red",
    },
  ];

  const colorClasses = {
    orange: "bg-gradient-to-br from-orange-100 to-orange-200 text-orange-700 border-orange-300",
    green: "bg-gradient-to-br from-green-100 to-green-200 text-green-700 border-green-300",
    yellow: "bg-gradient-to-br from-yellow-100 to-yellow-200 text-yellow-700 border-yellow-300",
    red: "bg-gradient-to-br from-red-100 to-red-200 text-red-700 border-red-300",
  };

  const faqs = [
    {
      question: "How do I get 100% cashback?",
      answer:
        "After purchasing a product at full price and posting a verified review, you'll receive 100% cashback once your submission is approved. The cashback is credited directly to your wallet, which you can withdraw anytime.",
    },
    {
      question: "How long does verification take?",
      answer:
        "Our verification team typically reviews submissions within 24-48 hours. Once approved, your cashback is immediately credited to your wallet. You'll receive notifications at each step.",
    },
    {
      question: "What if my review is rejected?",
      answer:
        "If your review doesn't meet the requirements (e.g., too short, doesn't include required keywords, or violates marketplace policies), our team will notify you with feedback. You can submit a revised review for re-verification.",
    },
    {
      question: "How do I withdraw my cashback?",
      answer:
        "Go to your Wallet page, enter your UPI ID or bank account details, and click withdraw. Funds are typically transferred within 24-48 hours. You can track all transactions in your wallet history.",
    },
  ];

  return (
    <section className="bg-white rounded-2xl border border-slate-200 p-6 md:p-8 shadow-sm">
      <div className="mb-8">
        <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-2">How It Works</h2>
        <p className="text-slate-600">Learn how to earn 100% cashback on your purchases</p>
      </div>

      {/* Steps */}
      <div className="mb-12 space-y-8">
        {shopperSteps.map((step, index) => {
          const Icon = step.icon;
          return (
            <div key={index} className="flex gap-4">
              {/* Icon Circle */}
              <div
                className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-full border-2 ${
                  colorClasses[step.color as keyof typeof colorClasses]
                }`}
              >
                <Icon className="h-6 w-6" />
              </div>

              {/* Content */}
              <div className="flex-1">
                <div className="mb-2 flex items-center gap-3">
                  <span className="rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 px-3 py-1 text-xs font-bold text-white">
                    Step {index + 1}
                  </span>
                  <h3 className="text-lg font-bold text-slate-900">{step.title}</h3>
                </div>
                <p className="text-sm text-slate-600 leading-relaxed">{step.description}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* FAQ Section */}
      <div className="border-t border-slate-200 pt-8">
        <h3 className="text-xl font-bold text-slate-900 mb-6">Frequently Asked Questions</h3>
        <div className="space-y-3">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="overflow-hidden rounded-xl border border-slate-200 bg-slate-50 transition hover:shadow-md"
            >
              <button
                onClick={() => toggleFaq(index)}
                className="flex w-full items-center justify-between p-4 text-left"
              >
                <h4 className="text-sm font-semibold text-slate-900 pr-4">{faq.question}</h4>
                <FaChevronDown
                  className={`h-4 w-4 text-slate-400 transition-transform flex-shrink-0 ${
                    openFaq === index ? "rotate-180" : ""
                  }`}
                />
              </button>
              <div
                className={`overflow-hidden transition-all ${
                  openFaq === index ? "max-h-96" : "max-h-0"
                }`}
              >
                <div className="border-t border-slate-200 p-4 text-sm text-slate-600 leading-relaxed">
                  {faq.answer}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

