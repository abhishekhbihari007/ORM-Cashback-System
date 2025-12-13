import React from "react";
import { PurchaseHistory } from "@/lib/types";
import Link from "next/link";
import { FaCircleCheck, FaClock, FaTag, FaCircleXmark } from "react-icons/fa6";

type PurchaseWithMeta = PurchaseHistory & {
  isLocal?: boolean;
};

type PurchaseTimelineProps = {
  purchases: PurchaseWithMeta[];
  loading?: boolean;
  onRemoveLocal?: (id: string) => void;
};

const statusStyles: Record<
  PurchaseHistory["status"],
  { badge: string; icon: React.ReactElement }
> = {
  tracking: {
    badge: "bg-amber-50 text-amber-700 border border-amber-100",
    icon: <FaClock className="h-3.5 w-3.5" />,
  },
  reviewed: {
    badge: "bg-blue-50 text-blue-700 border border-blue-100",
    icon: <FaTag className="h-3.5 w-3.5" />,
  },
  paid: {
    badge: "bg-emerald-50 text-emerald-700 border border-emerald-100",
    icon: <FaCircleCheck className="h-3.5 w-3.5" />,
  },
  rejected: {
    badge: "bg-red-50 text-red-700 border border-red-100",
    icon: <FaCircleXmark className="h-3.5 w-3.5" />,
  },
};

const currencyFormatter = new Intl.NumberFormat("en-IN", {
  style: "currency",
  currency: "INR",
  maximumFractionDigits: 0,
});

const formatDateTime = (value: string) => {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return value;
  }
  return date.toLocaleString(undefined, {
    dateStyle: "medium",
    timeStyle: "short",
  });
};

export function PurchaseTimeline({
  purchases,
  loading,
  onRemoveLocal,
}: PurchaseTimelineProps) {
  if (loading && !purchases.length) {
    return (
      <div className="rounded-3xl border border-slate-100 bg-white p-6 shadow-sm">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-semibold text-slate-900">Purchase History</h3>
          <span className="text-sm text-slate-500">Loading…</span>
        </div>
        <div className="mt-4 space-y-4">
          {Array.from({ length: 3 }).map((_, index) => (
            <div
              key={index}
              className="animate-pulse rounded-2xl bg-slate-50 p-4 space-y-3"
            >
              <div className="h-4 w-1/2 rounded bg-slate-200" />
              <div className="h-3 w-32 rounded bg-slate-200" />
              <div className="h-3 w-40 rounded bg-slate-200" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (!purchases.length) {
    return (
      <div className="rounded-3xl border border-dashed border-slate-200 bg-white p-6 text-center shadow-sm">
        <p className="text-lg font-semibold text-slate-900">No purchases yet</p>
        <p className="mt-2 text-sm text-slate-500">
          Track a product from the deals feed to see it appear here.
        </p>
        <Link
          href="/feed"
          className="mt-4 inline-flex items-center rounded-full bg-slate-900 px-5 py-2 text-sm font-semibold text-white transition hover:bg-slate-800"
        >
          Browse deals
        </Link>
      </div>
    );
  }

  return (
    <div className="rounded-3xl border border-slate-100 bg-white p-6 shadow-sm">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-semibold text-slate-900">Purchase History</h3>
        <span className="text-sm text-slate-500">
          {purchases.length} item{purchases.length > 1 ? "s" : ""}
        </span>
      </div>

      <div className="mt-6 space-y-6">
        {purchases.map((purchase) => {
          const status = statusStyles[purchase.status] ?? statusStyles.tracking;
          const amount =
            typeof purchase.amount === "number" && !Number.isNaN(purchase.amount)
              ? currencyFormatter.format(purchase.amount)
              : "—";

          return (
            <div
              key={purchase.id}
              className="relative rounded-2xl border border-slate-100 bg-slate-50/70 p-4 pl-6"
            >
              <span className="absolute left-3 top-5 h-2.5 w-2.5 rounded-full bg-slate-300" />
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <p className="text-sm font-semibold text-slate-900">
                    {purchase.product}
                  </p>
                  <p className="text-xs text-slate-500">
                    {purchase.store ?? "Unknown store"}
                  </p>
                </div>
                <span
                  className={`inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-semibold ${status.badge}`}
                >
                  {status.icon}
                  {purchase.status.charAt(0).toUpperCase() +
                    purchase.status.slice(1)}
                </span>
              </div>

              <div className="mt-3 flex flex-wrap items-center gap-3 text-sm text-slate-600">
                <span>{amount}</span>
                <span className="text-slate-400">•</span>
                <span>{formatDateTime(purchase.purchasedAt)}</span>
              </div>

              {purchase.productLink && (
                <div className="mt-2">
                  <a
                    href={purchase.productLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs font-semibold text-indigo-600 hover:underline"
                  >
                    View purchase details →
                  </a>
                </div>
              )}

              {purchase.status === "rejected" && purchase.rejectionReason && (
                <div className="mt-3 rounded-lg border border-red-200 bg-red-50 p-3">
                  <p className="text-xs font-semibold text-red-800">Order Rejected</p>
                  <p className="mt-1 text-xs text-red-700">{purchase.rejectionReason}</p>
                </div>
              )}

              {purchase.isLocal && (
                <div className="mt-4 flex items-center justify-between rounded-xl border border-amber-100 bg-amber-50 px-3 py-2 text-xs text-amber-800">
                  <p>Automatically tracked from the deals feed.</p>
                  {onRemoveLocal && (
                    <button
                      type="button"
                      onClick={() => onRemoveLocal(purchase.id)}
                      className="inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-semibold text-amber-800 transition hover:text-rose-600"
                    >
                      <FaCircleXmark className="h-3 w-3" />
                      Dismiss
                    </button>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

