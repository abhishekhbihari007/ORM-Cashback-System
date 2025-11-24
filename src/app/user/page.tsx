import { api } from "@/lib/api";
import { UserOverview } from "@/components/sections/user/user-overview";
import { PurchaseTimeline } from "@/components/sections/user/purchase-timeline";
import { PaymentStatus } from "@/components/sections/user/payment-status";
import { HowItWorksShopper } from "@/components/sections/user/how-it-works-shopper";
import { MobileLayout } from "@/components/layouts/MobileLayout";
import Link from "next/link";

export default async function UserPage() {
  const [purchases, payments] = await Promise.all([
    api.fetchPurchaseHistory(),
    api.fetchPayments(),
  ]);

  return (
    <MobileLayout>
      <div className="page-wrapper bg-gradient-to-br from-slate-50 via-white to-indigo-50/30 relative overflow-hidden">
        {/* Background Orbs */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="container-responsive space-y-8 py-10 relative z-10">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-slate-900 via-indigo-900 to-slate-900 bg-clip-text text-transparent">User Dashboard</h1>
              <p className="mt-2 text-slate-700 font-medium">Manage your purchases, reviews, and cashback</p>
            </div>
            <Link
              href="/feed"
              className="rounded-full bg-gradient-to-r from-orange-500 to-red-600 px-6 py-3 font-semibold text-white shadow-lg shadow-orange-500/25 transition-all hover:from-orange-600 hover:to-red-700 hover:shadow-xl hover:shadow-orange-500/40 hover:scale-105"
            >
              Browse Deals →
            </Link>
          </div>
          <UserOverview purchases={purchases} payments={payments} />
          <div className="grid gap-6 lg:grid-cols-[1.4fr,0.6fr]">
            <PurchaseTimeline purchases={purchases} />
            <PaymentStatus payments={payments} />
          </div>
          <HowItWorksShopper />
        </div>
      </div>
    </MobileLayout>
  );
}

