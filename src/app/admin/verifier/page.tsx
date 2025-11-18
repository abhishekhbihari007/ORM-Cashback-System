import { api } from "@/lib/api";
import { VerifierScreen } from "@/components/sections/admin/verifier-screen";

export const metadata = {
  title: "Admin • Verifier",
};

export default async function AdminVerifierPage() {
  const pendingReviews = await api.fetchPendingReviews();

  return (
    <div className="bg-slate-50">
      <div className="container-responsive space-y-6 py-10">
        <div>
          <p className="section-title">Admin</p>
          <h1 className="text-4xl font-bold text-slate-900">Review Verifier</h1>
          <p className="text-slate-600">
            Approve or reject reviews quickly. Left side shows user uploads, right side shows brand requirements.
          </p>
        </div>
        <VerifierScreen reviews={pendingReviews} />
      </div>
    </div>
  );
}

