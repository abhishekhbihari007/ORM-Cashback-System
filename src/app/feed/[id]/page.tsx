import { api } from "@/lib/api";
import { ProductDetail } from "@/components/sections/user/product-detail";
import { MobileLayout } from "@/components/layouts/MobileLayout";
import { notFound } from "next/navigation";

export const metadata = {
  title: "Product Details • 100% Cashback",
};

export default async function ProductDetailPage({ params }: { params: { id: string } }) {
  const deals = await api.fetchDeals();
  const deal = deals.find((d) => d.id === params.id);

  if (!deal) {
    notFound();
  }

  return (
    <MobileLayout>
      <div className="bg-slate-50">
        <div className="container-responsive space-y-6 py-6">
          <ProductDetail deal={deal} />
        </div>
      </div>
    </MobileLayout>
  );
}

