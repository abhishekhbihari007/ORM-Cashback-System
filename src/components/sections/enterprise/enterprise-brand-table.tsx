"use client";

import Link from "next/link";
import { StatusBadge } from "@/components/ui/status-badge";

type Brand = {
  name: string;
  vertical: string;
  marketplaceCount: number;
  activeCampaigns: number;
  monthlySpend: string;
  health: "excellent" | "stable" | "attention";
};

const brands: Brand[] = [
  {
    name: "Nova Beauty Co.",
    vertical: "Beauty & Personal Care",
    marketplaceCount: 6,
    activeCampaigns: 8,
    monthlySpend: "₹2.1L",
    health: "excellent",
  },
  {
    name: "Stride Athletics",
    vertical: "Sportswear",
    marketplaceCount: 4,
    activeCampaigns: 5,
    monthlySpend: "₹1.3L",
    health: "stable",
  },
  {
    name: "Haus Living",
    vertical: "Home & Kitchen",
    marketplaceCount: 7,
    activeCampaigns: 10,
    monthlySpend: "₹2.8L",
    health: "excellent",
  },
  {
    name: "Bloom Foods",
    vertical: "Grocery",
    marketplaceCount: 5,
    activeCampaigns: 6,
    monthlySpend: "₹1.1L",
    health: "attention",
  },
];

const healthMap: Record<Brand["health"], { label: string; tone: "success" | "warning" | "danger" }> = {
  excellent: { label: "Healthy", tone: "success" },
  stable: { label: "Stable", tone: "warning" },
  attention: { label: "Needs Attention", tone: "danger" },
};

export function EnterpriseBrandTable() {
  return (
    <section className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="text-sm font-semibold text-slate-500 uppercase tracking-wide">
            Brand Portfolio
          </p>
          <h3 className="text-xl font-semibold text-slate-900">Manage multi-brand operations</h3>
        </div>
        <div className="flex gap-3">
          <button className="rounded-lg border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50">
            Export report
          </button>
          <button className="rounded-lg bg-slate-900 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-800">
            + Add brand
          </button>
        </div>
      </div>

      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <table className="min-w-full divide-y divide-slate-200 text-sm">
          <thead className="bg-slate-50 text-left font-semibold text-slate-500 uppercase tracking-wide">
            <tr>
              <th className="px 6 py-3">Brand</th>
              <th className="px 6 py-3">Vertical</th>
              <th className="px 6 py-3">Marketplaces</th>
              <th className="px 6 py-3">Active Campaigns</th>
              <th className="px 6 py-3">Monthly Spend</th>
              <th className="px 6 py-3">Health</th>
              <th className="px 6 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 bg-white text-slate-700">
            {brands.map((brand) => {
              const health = healthMap[brand.health];
              return (
                <tr key={brand.name}>
                  <td className="px-6 py-4">
                    <p className="text-sm font-semibold text-slate-900">{brand.name}</p>
                    <p className="text-xs text-slate-500">ID: #{brand.name.toLowerCase().replace(/\s/g, "")}</p>
                  </td>
                  <td className="px-6 py-4">{brand.vertical}</td>
                  <td className="px-6 py-4">{brand.marketplaceCount}</td>
                  <td className="px-6 py-4">{brand.activeCampaigns}</td>
                  <td className="px-6 py-4 font-semibold text-slate-900">{brand.monthlySpend}</td>
                  <td className="px-6 py-4">
                    <StatusBadge label={health.label} variant={health.tone} />
                  </td>
                  <td className="px-6 py-4 text-right space-x-2">
                    <Link
                      href="/enterprise/brands"
                      className="text-sm font-medium text-slate-600 hover:text-slate-900"
                    >
                      Manage
                    </Link>
                    <button className="rounded-lg border border-slate-200 px-3 py-1 text-sm font-semibold text-slate-600 hover:bg-slate-50">
                      Switch
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </section>
  );
}


