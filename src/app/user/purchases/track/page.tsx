"use client";

import { useState, useEffect } from "react";
import { FaCircleCheck, FaClock, FaBagShopping } from "react-icons/fa6";

interface TrackedPurchase {
  productId: string;
  productName: string;
  storeId: string;
  productLink: string;
  timestamp: string;
  status?: "tracking" | "reviewed" | "paid";
}

export default function TrackPurchasesPage() {
  const [trackedPurchases, setTrackedPurchases] = useState<TrackedPurchase[]>([]);

  useEffect(() => {
    // Load tracked purchases from localStorage
    const stored = localStorage.getItem("trackedPurchases");
    if (stored) {
      setTrackedPurchases(JSON.parse(stored));
    }
  }, []);

  const getStatusBadge = (status?: string) => {
    switch (status) {
      case "paid":
        return (
          <span className="flex items-center gap-1 rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700">
            <FaCircleCheck /> Paid
          </span>
        );
      case "reviewed":
        return (
          <span className="flex items-center gap-1 rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-700">
            <FaClock /> Review Submitted
          </span>
        );
      default:
        return (
          <span className="flex items-center gap-1 rounded-full bg-yellow-100 px-3 py-1 text-xs font-semibold text-yellow-700">
            <FaBagShopping /> Tracking
          </span>
        );
    }
  };

  return (
    <div className="page-wrapper bg-slate-50">
      <div className="container-responsive space-y-6 py-10">
        <div>
          <p className="section-title">Purchase Tracking</p>
          <h1 className="text-4xl font-bold text-slate-900">Track Your Purchases</h1>
          <p className="text-slate-600">
            Monitor all purchases made through our platform. Upload proof to claim your cashback.
          </p>
        </div>

        {trackedPurchases.length === 0 ? (
          <div className="rounded-2xl border border-slate-200 bg-white p-12 text-center">
            <FaBagShopping className="mx-auto mb-4 text-4xl text-slate-400" />
            <h3 className="mb-2 text-lg font-semibold text-slate-900">No Purchases Tracked</h3>
            <p className="mb-4 text-slate-600">
              Start shopping from the deals page and your purchases will be tracked here.
            </p>
            <a
              href="/user/shop"
              className="inline-block rounded-full bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700"
            >
              Browse Deals
            </a>
          </div>
        ) : (
          <div className="space-y-4">
            {trackedPurchases.map((purchase, index) => (
              <div
                key={index}
                className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
              >
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <h3 className="mb-1 text-lg font-semibold text-slate-900">
                      {purchase.productName}
                    </h3>
                    <p className="mb-2 text-sm text-slate-600">
                      Purchased on {new Date(purchase.timestamp).toLocaleString()}
                    </p>
                    <a
                      href={purchase.productLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-blue-600 hover:underline"
                    >
                      View Product →
                    </a>
                  </div>
                  <div className="flex flex-col items-end gap-3">
                    {getStatusBadge(purchase.status)}
                    <a
                      href="/user/upload-proof"
                      className="rounded-full bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-700"
                    >
                      Upload Proof
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

