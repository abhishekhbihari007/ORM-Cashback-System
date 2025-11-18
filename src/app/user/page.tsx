import { api } from "@/lib/api";
import { UserOverview } from "@/components/sections/user/user-overview";
import { PurchaseTimeline } from "@/components/sections/user/purchase-timeline";
import { PaymentStatus } from "@/components/sections/user/payment-status";

export default async function UserPage() {
  const [purchases, payments] = await Promise.all([
    api.fetchPurchaseHistory(),
    api.fetchPayments(),
  ]);

  return (
    <div className="page-wrapper bg-slate-50">
      <div className="container-responsive space-y-8 py-10">
        <UserOverview purchases={purchases} payments={payments} />
        <div className="grid gap-6 lg:grid-cols-[1.4fr,0.6fr]">
          <PurchaseTimeline purchases={purchases} />
          <PaymentStatus payments={payments} />
        </div>
      </div>
    </div>
  );
}

