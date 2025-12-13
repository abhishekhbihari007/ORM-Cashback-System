import { PurchasesClient } from "@/components/sections/user/purchases-client";

export const metadata = {
  title: "User Purchases • ORM Dashboard",
};

export default function UserPurchasesPage() {
  return (
    <div className="page-wrapper bg-white">
      <div className="container-responsive space-y-6 py-10">
        <div>
          <p className="section-title">Purchases</p>
          <h1 className="text-4xl font-bold text-slate-900">
            Track every marketplace order
          </h1>
          <p className="text-slate-600">
            Automated verification ensures your reimbursements stay compliant.
          </p>
        </div>
        <PurchasesClient />
      </div>
    </div>
  );
}

