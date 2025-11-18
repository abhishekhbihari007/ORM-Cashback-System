import { ComplianceAlert } from "@/lib/types";
import { StatusBadge } from "@/components/ui/status-badge";

type Props = {
  alerts: ComplianceAlert[];
};

export function CompliancePanel({ alerts }: Props) {
  return (
    <div className="rounded-3xl border border-slate-100 bg-white p-6 shadow-sm">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-semibold text-slate-900">Compliance Monitor</h3>
        <button className="text-sm font-semibold text-blue-600">Update policies</button>
      </div>
      <div className="mt-4 space-y-4">
        {alerts.map((alert) => (
          <div key={alert.id} className="rounded-2xl border border-slate-100 p-4">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <p className="font-semibold text-slate-900">{alert.title}</p>
                <p className="text-sm text-slate-500">{alert.marketplace}</p>
              </div>
              <StatusBadge
                label={alert.risk}
                variant={
                  alert.risk === "high"
                    ? "danger"
                    : alert.risk === "medium"
                    ? "warning"
                    : "neutral"
                }
              />
            </div>
            <p className="mt-2 text-sm text-slate-600">{alert.description}</p>
            <p className="mt-1 text-xs text-slate-500">
              Updated {new Date(alert.updatedAt).toLocaleString()}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

