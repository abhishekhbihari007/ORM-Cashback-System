"use client";

import { StatCard } from "@/components/ui/stat-card";

const overviewStats = [
  {
    label: "Active Brands",
    value: "12",
    helper: "Brands connected to the network",
  },
  {
    label: "Monthly Spend",
    value: "₹14.2L",
    helper: "Combined incentive budget",
  },
  {
    label: "Live Campaigns",
    value: "38",
    helper: "Running across all marketplaces",
  },
  {
    label: "Verified Reviews / Week",
    value: "1,280",
    helper: "Cross-brand average output",
  },
];

export function EnterpriseOverview() {
  return (
    <section className="space-y-4">
      <div>
        <p className="text-sm font-semibold text-slate-500 uppercase tracking-wide">
          Enterprise Snapshot
        </p>
        <h2 className="text-2xl font-bold text-slate-900">
          Unified visibility across every brand
        </h2>
      </div>
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {overviewStats.map((stat) => (
          <StatCard key={stat.label} {...stat} />
        ))}
      </div>
    </section>
  );
}


