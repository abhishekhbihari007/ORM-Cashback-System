import Link from "next/link";
import { PurchasesClient } from "@/components/sections/user/purchases-client";

export default function TrackPurchasesPage() {
  return (
    <div className="page-wrapper bg-slate-50">
      <div className="container-responsive space-y-6 py-10">
        <div>
          <p className="section-title">Purchase Tracking</p>
          <h1 className="text-4xl font-bold text-slate-900">Track Your Purchases</h1>
          <p className="text-slate-600">
            Monitor every tracked order and upload proof once your marketplace review is live.
          </p>
        </div>
        <PurchasesClient />
        <div className="rounded-2xl border border-slate-100 bg-white p-6 text-sm text-slate-600">
          Need to submit proof?{" "}
          <Link href="/user/upload-proof" className="font-semibold text-indigo-600 hover:underline">
            Go to the upload page →
          </Link>
        </div>
      </div>
    </div>
  );
}

