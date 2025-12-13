import { ShopProductsClient } from "@/components/sections/user/shop-products-client";

export const metadata = {
  title: "Shop Now • ORM Dashboard",
};

export default async function UserShopPage() {
  return (
    <div className="page-wrapper bg-slate-50">
      <div className="container-responsive space-y-6 py-10">
        <ShopProductsClient />
      </div>
    </div>
  );
}

