import { ShopProductsClient } from "@/components/sections/user/shop-products-client";

export const metadata = {
  title: "Deals • 100% Cashback",
};

export default async function UserDealsPage() {
  return (
    <div className="page-wrapper bg-slate-50">
      <div className="container-responsive space-y-6 py-6 md:py-10">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 md:text-4xl">Deals Feed</h1>
          <p className="mt-2 text-slate-600">
            Get 100% cashback on these products. Buy, review, and get your money back!
          </p>
        </div>
        <ShopProductsClient heading="Deals Feed" />
      </div>
    </div>
  );
}

