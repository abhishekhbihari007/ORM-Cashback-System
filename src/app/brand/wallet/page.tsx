import { AddFundsWallet } from "@/components/sections/brand/add-funds-wallet";
import { api } from "@/lib/api";

export const metadata = {
  title: "Brand • Add Funds",
};

export default async function BrandWalletPage() {
  const budget = await api.fetchBudget();

  return (
    <div className="page-wrapper bg-slate-50">
      <div className="container-responsive space-y-6 py-10">
        <div>
          <p className="section-title">Wallet</p>
          <h1 className="text-4xl font-bold text-slate-900">Add Funds</h1>
          <p className="text-slate-600">
            Load money into your wallet to pay for reviews. Secure payment via Razorpay or Stripe.
          </p>
        </div>
        <AddFundsWallet budget={budget} />
      </div>
    </div>
  );
}

