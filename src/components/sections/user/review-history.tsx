import { ReviewRequest } from "@/lib/types";
import { StatusBadge } from "@/components/ui/status-badge";

type Props = {
  reviews: ReviewRequest[];
};

export function ReviewHistory({ reviews }: Props) {
  return (
    <div className="rounded-3xl border border-slate-100 bg-white p-6 shadow-sm">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-semibold text-slate-900">Review History</h3>
        <button className="text-sm font-semibold text-blue-600">View guidelines</button>
      </div>
      <div className="mt-4 space-y-4">
        {reviews.map((review) => (
          <div key={review.id} className="rounded-2xl border border-slate-100 p-4">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <p className="font-semibold text-slate-900">{review.reviewerName}</p>
                <p className="text-sm text-slate-500">
                  Due {new Date(review.dueDate).toLocaleDateString()}
                </p>
              </div>
              <StatusBadge
                label={review.status}
                variant={
                  review.status === "submitted"
                    ? "success"
                    : review.status === "flagged"
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

