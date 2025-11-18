import { StatCard } from "@/components/ui/stat-card";
import { PurchaseHistory, PaymentRecord } from "@/lib/types";

type Props = {
  purchases: PurchaseHistory[];
  payments: PaymentRecord[];
};

export function UserOverview({ purchases, payments }: Props) {
  const completed = purchases.filter((purchase) => purchase.status === "reviewed").length;
  const totalRewards = payments.reduce((sum, payment) => sum + payment.amount, 0);

  const cards = [
    { label: "Purchases", value: `${purchases.length}`, helper: "Tracked orders" },
    { label: "Reviews Submitted", value: `${completed}`, helper: "Verified" },
    {
      label: "Rewards Earned",
      value: `₹${totalRewards.toFixed(0)}`,
      helper: "Including pending payouts",
    },
  ];

  return (
    <section className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="section-title">User Dashboard</p>
          <h1 className="text-3xl font-bold text-slate-900">Cashback reviewer cockpit</h1>
          <p className="text-slate-600">Track purchases, reviews, and reimbursements.</p>
        </div>
        <button className="rounded-full bg-slate-900 px-4 py-2 text-sm font-semibold text-white">
          Shop new campaigns
        </button>
      </div>
      <div className="grid gap-4 md:grid-cols-3">
        {cards.map((card) => (
          <StatCard key={card.label} {...card} />
        ))}
      </div>
    </section>
  );
}

