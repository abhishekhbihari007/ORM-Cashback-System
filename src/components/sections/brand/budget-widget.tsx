import { BudgetSnapshot } from "@/lib/types";
import { ProgressBar } from "@/components/ui/progress-bar";

type Props = {
  snapshot: BudgetSnapshot;
};

export function BudgetWidget({ snapshot }: Props) {
  const usedPercent = Math.round((snapshot.utilized / snapshot.allocated) * 100);
  return (
    <div className="rounded-3xl border border-slate-100 bg-white p-6 shadow-sm">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-slate-500">
            Budget
          </p>
          <p className="text-3xl font-bold text-slate-900">
            {snapshot.currency} {snapshot.available.toLocaleString()}
          </p>
          <p className="text-sm text-slate-500">Available balance</p>
        </div>
        <button className="rounded-full border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-600">
          Add funds
        </button>
      </div>
      <div className="mt-6 space-y-2">
        <p className="text-sm font-semibold text-slate-600">Utilization</p>
        <ProgressBar value={usedPercent} />
        <div className="flex items-center justify-between text-sm text-slate-500">
          <span>Used: {snapshot.currency} {snapshot.utilized.toLocaleString()}</span>
          <span>Allocated: {snapshot.currency} {snapshot.allocated.toLocaleString()}</span>
        </div>
      </div>
    </div>
  );
}

