import { EnterpriseBrandTable } from "@/components/sections/enterprise/enterprise-brand-table";

const rules = [
  {
    title: "Payout governance",
    description: "Require dual approval for payouts exceeding ₹1L to avoid overspend.",
  },
  {
    title: "Marketplace coverage",
    description: "Each brand must maintain at least three active campaigns across top marketplaces.",
  },
  {
    title: "Content compliance",
    description: "Auto-flag reviews missing mandatory keywords before submission.",
  },
];

export const metadata = {
  title: "Enterprise Brands",
};

export default function EnterpriseBrandsPage() {
  return (
    <div className="space-y-10 bg-slate-50 p-6 lg:p-10">
      <EnterpriseBrandTable />

      <section className="grid gap-4 lg:grid-cols-3">
        {rules.map((rule) => (
          <div key={rule.title} className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
              Governance rule
            </p>
            <h4 className="mt-2 text-lg font-semibold text-slate-900">{rule.title}</h4>
            <p className="mt-2 text-sm text-slate-600">{rule.description}</p>
            <button className="mt-4 text-sm font-semibold text-slate-900 hover:underline">
              Edit policy →
            </button>
          </div>
        ))}
      </section>
    </div>
  );
}


