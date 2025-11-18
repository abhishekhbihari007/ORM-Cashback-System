import { ReviewRequest } from "@/lib/types";
import { StatusBadge } from "@/components/ui/status-badge";

type Props = {
  requests: ReviewRequest[];
};

export function ReviewPipeline({ requests }: Props) {
  return (
    <div className="rounded-3xl border border-slate-100 bg-white p-6 shadow-sm">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-semibold text-slate-900">Review Pipeline</h3>
        <button className="text-sm font-semibold text-blue-600">Automate slots</button>
      </div>
      <div className="mt-4 space-y-4">
        {requests.map((request) => (
          <div key={request.id} className="rounded-2xl border border-slate-100 p-4">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <p className="text-sm font-semibold text-slate-900">
                  {request.reviewerName} • {request.sentiment} focus
                </p>
                <p className="text-xs text-slate-500">
                  Due {new Date(request.dueDate).toLocaleDateString()}
                </p>
              </div>
              <StatusBadge
                label={request.status}
                variant={
                  request.status === "submitted"
                    ? "success"
                    : request.status === "flagged"
                    ? "danger"
                    : "primary"
                }
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

