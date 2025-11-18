import { api } from "@/lib/api";
import { WalletView } from "@/components/sections/user/wallet-view";

export const metadata = {
  title: "My Wallet • Cashback Balance",
};

export default async function UserWalletPage() {
  const wallet = await api.fetchWallet();

  return (
    <div className="page-wrapper bg-slate-50">
      <div className="container-responsive space-y-6 py-6 md:py-10">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 md:text-4xl">My Wallet</h1>
          <p className="mt-2 text-slate-600">
            View your cashback balance and withdraw money to your bank/UPI.
          </p>
        </div>
        <WalletView wallet={wallet} />
      </div>
    </div>
  );
}

