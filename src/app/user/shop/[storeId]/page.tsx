import Link from "next/link";
import { ShopProductsClient } from "@/components/sections/user/shop-products-client";

type Props = {
  params: { storeId: string };
};

export default function StoreProductsPage({ params }: Props) {
  const marketplace = params.storeId?.toUpperCase();

  return (
    <div className="page-wrapper bg-slate-50">
      <div className="container-responsive space-y-6 py-10">
        <Link
          href="/user/shop"
          className="inline-flex items-center text-sm font-semibold text-slate-600 transition hover:text-slate-900"
        >
          ← Back to shop
        </Link>
        <ShopProductsClient initialMarketplace={marketplace} heading={`Marketplace • ${marketplace}`} />
      </div>
    </div>
  );
}

