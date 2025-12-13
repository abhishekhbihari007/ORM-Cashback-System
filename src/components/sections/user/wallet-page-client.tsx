"use client";

import { useEffect, useState } from "react";
import { WalletView } from "@/components/sections/user/wallet-view";
import { Wallet } from "@/lib/types";
import { userApi, type UserWalletResponse } from "@/lib/backend-api";

const mapWallet = (response: UserWalletResponse): Wallet => {
  const wallet = response.wallet;
  const pending = Number(wallet.balance ?? 0);
  return {
    pendingCashback: pending,
    withdrawableCash: pending,
    totalEarned: Number(wallet.total_earned ?? 0),
    totalWithdrawn: Number(wallet.total_withdrawn ?? 0),
  };
};

export function WalletPageClient() {
  const [wallet, setWallet] = useState<Wallet | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadWallet = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const response = await userApi.getWallet();
      setWallet(mapWallet(response));
    } catch (err: any) {
      setError(err.message || "Unable to load wallet data.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadWallet();
  }, []);

  if (isLoading) {
    return <p className="text-sm text-slate-500">Loading wallet…</p>;
  }

  if (error) {
    return <p className="text-sm text-rose-600">{error}</p>;
  }

  if (!wallet) {
    return <p className="text-sm text-slate-500">Wallet not found.</p>;
  }

  return <WalletView wallet={wallet} onRefresh={loadWallet} />;
}


