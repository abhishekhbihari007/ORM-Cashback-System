import { AdminActivity } from "@/lib/types";
import { StatusBadge } from "@/components/ui/status-badge";
import { FaUser, FaCartShopping, FaStar, FaMoneyBill, FaBan, FaCircleCheck } from "react-icons/fa6";

type Props = {
  activities: AdminActivity[];
};

const severityVariant: Record<string, "success" | "warning" | "danger"> = {
  low: "success",
  medium: "warning",
  high: "danger",
};

const getActivityIcon = (activity: string) => {
  if (activity.toLowerCase().includes("purchase") || activity.toLowerCase().includes("buy")) {
    return <FaCartShopping className="text-blue-600" />;
  }
  if (activity.toLowerCase().includes("review")) {
    return <FaStar className="text-yellow-500" />;
  }
  if (activity.toLowerCase().includes("payment") || activity.toLowerCase().includes("payout")) {
    return <FaMoneyBill className="text-green-600" />;
  }
  if (activity.toLowerCase().includes("ban") || activity.toLowerCase().includes("block")) {
    return <FaBan className="text-red-600" />;
  }
  if (activity.toLowerCase().includes("approve") || activity.toLowerCase().includes("verified")) {
    return <FaCircleCheck className="text-green-600" />;
  }
  return <FaUser className="text-slate-600" />;
};

export function ActivityFeed({ activities }: Props) {
  return (
    <div className="rounded-3xl border border-slate-100 bg-white p-6 shadow-sm">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-xl font-semibold text-slate-900">All User Activities</h3>
          <p className="text-sm text-slate-600 mt-1">Real-time tracking of all user actions</p>
        </div>
        <button className="text-sm font-semibold text-blue-600 hover:text-blue-700">View all</button>
      </div>
      <div className="mt-4 space-y-3 max-h-[600px] overflow-y-auto">
        {activities.length === 0 ? (
          <p className="text-center text-slate-500 py-8">No activities to display</p>
        ) : (
          activities.map((activity) => (
            <div key={activity.id} className="rounded-xl border border-slate-100 p-4 hover:bg-slate-50 transition">
              <div className="flex items-start gap-4">
                <div className="mt-1">
                  {getActivityIcon(activity.activity)}
                </div>
                <div className="flex-1">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div>
                      <p className="font-semibold text-slate-900">{activity.actor}</p>
                      <p className="text-sm text-slate-600 mt-1">{activity.activity}</p>
                    </div>
                    <StatusBadge
                      label={activity.severity}
                      variant={severityVariant[activity.severity] ?? "neutral"}
                    />
                  </div>
                  <p className="mt-2 text-xs text-slate-500">
                    {new Date(activity.timestamp).toLocaleString()}
                  </p>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

