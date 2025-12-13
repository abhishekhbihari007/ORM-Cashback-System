import { WalletPageClient } from "@/components/sections/user/wallet-page-client";

export const metadata = {
  title: "My Wallet • Cashback Balance",
};

export default function UserWalletPage() {
  return (
    <div className="page-wrapper bg-slate-50">
      <div className="container-responsive space-y-6 py-6 md:py-10">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 md:text-4xl">My Wallet</h1>
          <p className="mt-2 text-slate-600">
            View your cashback balance and withdraw money to your bank/UPI.
          </p>
        </div>
        <WalletPageClient />
      </div>
    </div>
  );
}

