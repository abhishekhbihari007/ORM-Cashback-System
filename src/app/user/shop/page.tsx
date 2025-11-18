import { api } from "@/lib/api";
import { StorefrontGrid } from "@/components/sections/user/storefront-grid";

export const metadata = {
  title: "Shop Now • ORM Dashboard",
};

export default async function UserShopPage() {
  const storefronts = await api.fetchStorefronts();
  return (
    <div className="page-wrapper bg-slate-50">
      <div className="container-responsive space-y-6 py-10">
        <div>
          <p className="section-title">Shop Now</p>
          <h1 className="text-4xl font-bold text-slate-900">Choose a marketplace experience</h1>
          <p className="text-slate-600">
            Follow transparent steps, submit receipts, and get reimbursed via the Cashback app.
          </p>
        </div>
        <StorefrontGrid storefronts={storefronts} />
      </div>
    </div>
  );
}

