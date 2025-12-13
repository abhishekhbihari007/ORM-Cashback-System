import { WalletPageClient } from "@/components/sections/user/wallet-page-client";
import { MobileLayout } from "@/components/layouts/MobileLayout";

export const metadata = {
  title: "My Wallet • Cashback Balance",
};

export default function WalletPage() {
  return (
    <MobileLayout>
      <div className="bg-slate-50">
        <div className="container-responsive space-y-6 py-6">
          <div className="px-4">
            <h1 className="text-2xl font-bold text-slate-900">My Wallet</h1>
            <p className="mt-1 text-sm text-slate-600">
              View your balance and withdraw money
            </p>
          </div>
          <WalletPageClient />
        </div>
      </div>
    </MobileLayout>
  );
}

