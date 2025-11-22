import { api } from "@/lib/api";
import { UserOverview } from "@/components/sections/user/user-overview";
import { PurchaseTimeline } from "@/components/sections/user/purchase-timeline";
import { PaymentStatus } from "@/components/sections/user/payment-status";
import Link from "next/link";

export default async function UserPage() {
  const [purchases, payments] = await Promise.all([
    api.fetchPurchaseHistory(),
    api.fetchPayments(),
  ]);

  return (
    <div className="page-wrapper bg-slate-50">
      <div className="container-responsive space-y-8 py-10">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">User Dashboard</h1>
            <p className="mt-2 text-slate-600">Manage your purchases, reviews, and cashback</p>
          </div>
          <Link
            href="/feed"
            className="rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-3 font-semibold text-white shadow-lg shadow-blue-200 transition hover:from-blue-700 hover:to-indigo-700"
          >
            Browse Deals →
          </Link>
        </div>
        <UserOverview purchases={purchases} payments={payments} />
        <div className="grid gap-6 lg:grid-cols-[1.4fr,0.6fr]">
          <PurchaseTimeline purchases={purchases} />
          <PaymentStatus payments={payments} />
        </div>
      </div>
    </div>
  );
}

