import { Campaign } from "@/lib/types";
import { StatCard } from "@/components/ui/stat-card";
import { StatusBadge } from "@/components/ui/status-badge";
import Image from "next/image";

type Props = {
  campaigns: Campaign[];
};

export function LiveAnalyticsBoard({ campaigns }: Props) {
  const activeCampaigns = campaigns.filter((c) => c.status === "active");
  const totalToday = campaigns.reduce((sum, c) => {
    // Simulate today's reviews (in real app, this would come from API)
    return sum + Math.floor(c.reviewsReceived * 0.1);
  }, 0);
  const averageRating =
    campaigns.length > 0
      ? (
          campaigns.reduce((sum, c) => sum + c.averageRating, 0) / campaigns.length
        ).toFixed(1)
      : "0.0";

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-slate-900">Live Analytics Board</h2>
        <p className="text-slate-600">Real-time campaign performance metrics</p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <StatCard
          label="Reviews Received Today"
          value={`${totalToday}`}
          helper="Last 24 hours"
        />
        <StatCard
          label="Average Rating"
          value={`${averageRating} ⭐`}
          helper="Across all campaigns"
        />
        <StatCard
          label="Total Slots Remaining"
          value={`${campaigns.reduce((sum, c) => sum + c.slotsRemaining, 0)}`}
          helper="Active campaigns"
        />
      </div>

      <div className="rounded-3xl border border-slate-100 bg-white p-6 shadow-sm">
        <h3 className="mb-4 text-lg font-semibold text-slate-900">Active Campaigns</h3>
        <div className="space-y-4">
          {activeCampaigns.length === 0 ? (
            <p className="text-center text-slate-500">No active campaigns</p>
          ) : (
            activeCampaigns.map((campaign) => (
              <div
                key={campaign.id}
                className="flex items-center gap-4 rounded-xl border border-slate-100 p-4"
              >
                <div className="relative h-16 w-16 overflow-hidden rounded-lg">
                  <Image
                    src={campaign.productImage}
                    alt={campaign.productName}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-slate-900">{campaign.productName}</p>
                  <p className="text-sm text-slate-600">
                    {campaign.reviewsReceived} reviews received • {campaign.slotsRemaining} slots
                    remaining
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-lg font-bold text-slate-900">
                    {campaign.averageRating} ⭐
                  </p>
                  <StatusBadge label={campaign.status} variant="success" />
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

