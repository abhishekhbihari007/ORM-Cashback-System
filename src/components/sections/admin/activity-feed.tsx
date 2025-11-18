import { AdminActivity } from "@/lib/types";
import { StatusBadge } from "@/components/ui/status-badge";

type Props = {
  activities: AdminActivity[];
};

const severityVariant: Record<string, "success" | "warning" | "danger"> = {
  low: "success",
  medium: "warning",
  high: "danger",
};

export function ActivityFeed({ activities }: Props) {
  return (
    <div className="rounded-3xl border border-slate-100 bg-white p-6 shadow-sm">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-semibold text-slate-900">User Activities</h3>
        <button className="text-sm font-semibold text-blue-600">View all</button>
      </div>
      <div className="mt-4 space-y-4">
        {activities.map((activity) => (
          <div key={activity.id} className="rounded-2xl border border-slate-100 p-4">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <p className="font-semibold text-slate-900">{activity.actor}</p>
                <p className="text-sm text-slate-500">{activity.activity}</p>
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
        ))}
      </div>
    </div>
  );
}

