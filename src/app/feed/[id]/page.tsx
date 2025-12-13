import { DealDetailClient } from "@/components/sections/user/deal-detail-client";
import { MobileLayout } from "@/components/layouts/MobileLayout";

export const metadata = {
  title: "Product Details • 100% Cashback",
};

export default function ProductDetailPage({ params }: { params: { id: string } }) {
  return (
    <MobileLayout>
      <div className="bg-slate-50">
        <div className="container-responsive space-y-6 py-6">
          <DealDetailClient productId={params.id} />
        </div>
      </div>
    </MobileLayout>
  );
}

