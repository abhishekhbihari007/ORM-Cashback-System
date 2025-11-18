import { api } from "@/lib/api";
import { BudgetWidget } from "@/components/sections/brand/budget-widget";

export const metadata = {
  title: "Brand Budget • ORM Dashboard",
};

export default async function BrandBudgetPage() {
  const snapshot = await api.fetchBudget();

  return (
    <div className="page-wrapper bg-white">
      <div className="container-responsive space-y-6 py-10">
        <div>
          <p className="section-title">Budget</p>
          <h1 className="text-4xl font-bold text-slate-900">Centralized budget controls</h1>
          <p className="text-slate-600">
            Allocate funds per marketplace, automate reviewer reimbursements, and keep CAC predictable.
          </p>
        </div>
        <BudgetWidget snapshot={snapshot} />
        <div className="rounded-3xl border border-slate-100 bg-slate-50 p-6 text-sm text-slate-600">
          <p className="font-semibold text-slate-900">Cashback leverage tips</p>
          <p className="mt-2">
            Split budgets 60/30/10 across hero SKUs, new launches, and experiments. Our system enforces
            compliance thresholds per marketplace.
          </p>
        </div>
      </div>
    </div>
  );
}

