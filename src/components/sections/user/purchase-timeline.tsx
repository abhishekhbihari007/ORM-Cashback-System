import { PurchaseHistory } from "@/lib/types";
import { StatusBadge } from "@/components/ui/status-badge";

type Props = {
  purchases: PurchaseHistory[];
};

const statusVariant: Record<string, "primary" | "success" | "warning"> = {
  tracking: "primary",
  reviewed: "success",
  paid: "warning",
};

export function PurchaseTimeline({ purchases }: Props) {
  return (
    <div className="rounded-3xl border border-slate-100 bg-white p-6 shadow-sm">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-semibold text-slate-900">Purchase History</h3>
        <span className="text-sm text-slate-500">Auto-tracked</span>
      </div>
      <div className="mt-4 space-y-4">
        {purchases.map((purchase) => (
          <div key={purchase.id} className="rounded-2xl bg-slate-50 p-4">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <p className="font-semibold text-slate-900">{purchase.product}</p>
                <p className="text-sm text-slate-500">{purchase.store}</p>
              </div>
              <StatusBadge
                label={purchase.status}
                variant={statusVariant[purchase.status] ?? "neutral"}
              />
            </div>
            <div className="mt-2 flex flex-wrap justify-between text-sm text-slate-500">
              <span>₹{purchase.amount.toFixed(0)}</span>
              <span>{new Date(purchase.purchasedAt).toLocaleDateString()}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

