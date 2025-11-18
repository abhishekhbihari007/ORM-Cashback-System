import { api } from "@/lib/api";
import { DealsFeed } from "@/components/sections/user/deals-feed";
import { MobileLayout } from "@/components/layouts/MobileLayout";

export const metadata = {
  title: "Deals Feed • 100% Cashback",
};

export default async function FeedPage() {
  const deals = await api.fetchDeals();

  return (
    <MobileLayout>
      <div className="bg-slate-50">
        <div className="container-responsive space-y-6 py-6">
          <div className="px-4">
            <h1 className="text-2xl font-bold text-slate-900">Deals Feed</h1>
            <p className="mt-1 text-sm text-slate-600">
              Get 100% cashback on these products
            </p>
          </div>
          <DealsFeed deals={deals} />
        </div>
      </div>
    </MobileLayout>
  );
}

