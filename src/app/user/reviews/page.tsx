import { api } from "@/lib/api";
import { ReviewHistory } from "@/components/sections/user/review-history";

export const metadata = {
  title: "User Reviews • ORM Dashboard",
};

export default async function UserReviewsPage() {
  const reviews = await api.fetchReviewRequests();
  return (
    <div className="page-wrapper bg-slate-50">
      <div className="container-responsive space-y-6 py-10">
        <div>
          <p className="section-title">Reviews</p>
          <h1 className="text-4xl font-bold text-slate-900">Share authentic product feedback</h1>
          <p className="text-slate-600">
            Instructions, timelines, and proof uploads all managed inside the app.
          </p>
        </div>
        <ReviewHistory reviews={reviews} />
      </div>
    </div>
  );
}

