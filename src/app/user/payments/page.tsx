import { api } from "@/lib/api";
import { PaymentStatus } from "@/components/sections/user/payment-status";

export const metadata = {
  title: "User Payments • ORM Dashboard",
};

export default async function UserPaymentsPage() {
  const payments = await api.fetchPayments();
  return (
    <div className="page-wrapper bg-white">
      <div className="container-responsive space-y-6 py-10">
        <div>
          <p className="section-title">Payments</p>
          <h1 className="text-4xl font-bold text-slate-900">Instant reimbursement transparency</h1>
          <p className="text-slate-600">
            Every payout is linked to a purchase ID and timestamped for policy compliance.
          </p>
        </div>
        <PaymentStatus payments={payments} />
      </div>
    </div>
  );
}

