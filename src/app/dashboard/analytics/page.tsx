import { api } from "@/lib/api";

export const metadata = {
  title: "Brand • Analytics",
};

export default async function AnalyticsPage() {
  const campaigns = await api.fetchCampaigns();

  return (
    <div className="bg-slate-50">
      <div className="container-responsive space-y-6 py-10">
        <div>
          <p className="section-title">Analytics</p>
          <h1 className="text-4xl font-bold text-slate-900">Campaign Analytics</h1>
          <p className="text-slate-600">
            Track reviews acquired over time and monitor active products.
          </p>
        </div>

        {/* Placeholder for Bar Chart */}
        <div className="rounded-3xl border border-slate-100 bg-white p-8 shadow-sm">
          <h3 className="mb-6 text-lg font-semibold text-slate-900">Reviews Acquired Over Time</h3>
          <div className="flex h-64 items-end justify-between gap-2">
            {[65, 80, 45, 90, 70, 85, 95].map((height, idx) => (
              <div key={idx} className="flex-1">
                <div
                  className="w-full rounded-t-lg bg-gradient-to-t from-blue-600 to-blue-400"
                  style={{ height: `${height}%` }}
                />
                <p className="mt-2 text-center text-xs text-slate-500">Day {idx + 1}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Active Products Table */}
        <div className="rounded-3xl border border-slate-100 bg-white shadow-sm">
          <div className="border-b border-slate-100 p-6">
            <h3 className="text-lg font-semibold text-slate-900">Active Products & Slots Remaining</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-slate-50 text-xs uppercase tracking-wider text-slate-500">
                <tr>
                  <th className="px-6 py-4">Product</th>
                  <th className="px-6 py-4">Total Slots</th>
                  <th className="px-6 py-4">Filled</th>
                  <th className="px-6 py-4">Remaining</th>
                  <th className="px-6 py-4">Status</th>
                </tr>
              </thead>
              <tbody>
                {campaigns.map((campaign) => (
                  <tr key={campaign.id} className="border-t border-slate-100">
                    <td className="px-6 py-4 font-semibold text-slate-900">{campaign.productName}</td>
                    <td className="px-6 py-4 text-slate-600">{campaign.quantity}</td>
                    <td className="px-6 py-4 text-slate-600">{campaign.reviewsReceived}</td>
                    <td className="px-6 py-4 font-semibold text-green-600">{campaign.slotsRemaining}</td>
                    <td className="px-6 py-4">
                      <span
                        className={`rounded-full px-3 py-1 text-xs font-semibold ${
                          campaign.status === "active"
                            ? "bg-green-100 text-green-700"
                            : campaign.status === "paused"
                            ? "bg-yellow-100 text-yellow-700"
                            : "bg-slate-100 text-slate-700"
                        }`}
                      >
                        {campaign.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

