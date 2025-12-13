import { UserReviewsClient } from "@/components/sections/user/user-reviews-client";

export const metadata = {
  title: "User Reviews • ORM Dashboard",
};

export default function UserReviewsPage() {
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
        <UserReviewsClient />
      </div>
    </div>
  );
}

