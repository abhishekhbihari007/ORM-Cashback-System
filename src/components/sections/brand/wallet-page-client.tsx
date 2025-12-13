"use client";

import { useEffect, useState } from "react";
import { brandApi, type BrandStatsResponse } from "@/lib/backend-api";
import { AddFundsWallet } from "./add-funds-wallet";
import { BudgetSnapshot } from "@/lib/types";

function mapStatsToBudgetSnapshot(stats: BrandStatsResponse["stats"]): BudgetSnapshot {
  return {
    allocated: parseFloat(stats.locked_balance) + parseFloat(stats.available_balance),
    utilized: parseFloat(stats.locked_balance),
    available: parseFloat(stats.available_balance),
    currency: stats.currency,
  };
}

export function WalletPageClient() {
  const [budget, setBudget] = useState<BudgetSnapshot | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadBudget = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const response = await brandApi.getStats();
        setBudget(mapStatsToBudgetSnapshot(response.stats));
      } catch (err: any) {
        setError(err.message || "Unable to load wallet. Please try again.");
      } finally {
        setIsLoading(false);
      }
    };

    loadBudget();
  }, []);

  if (isLoading) {
    return (
      <div className="rounded-3xl border border-slate-100 bg-white p-10 text-center text-slate-500">
        Loading wallet...
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">
        Error: {error}
      </div>
    );
  }

  if (!budget) {
    return (
      <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-600">
        No wallet data available.
      </div>
    );
  }

  return <AddFundsWallet budget={budget} />;
}

