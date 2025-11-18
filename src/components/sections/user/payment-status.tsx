import { PaymentRecord } from "@/lib/types";
import { StatusBadge } from "@/components/ui/status-badge";

type Props = {
  payments: PaymentRecord[];
};

export function PaymentStatus({ payments }: Props) {
  return (
    <div className="rounded-3xl border border-slate-100 bg-white p-6 shadow-sm">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-semibold text-slate-900">Reimbursements</h3>
        <button className="text-sm font-semibold text-blue-600">Download statement</button>
      </div>
      <div className="mt-4 divide-y divide-slate-100">
        {payments.map((payment) => (
          <div key={payment.id} className="flex flex-wrap items-center justify-between gap-4 py-3">
            <div>
              <p className="text-sm font-semibold text-slate-900">{payment.reference}</p>
              <p className="text-xs text-slate-500">{new Date(payment.paidAt).toLocaleString()}</p>
            </div>
            <p className="text-lg font-bold text-slate-900">₹{payment.amount.toFixed(0)}</p>
            <StatusBadge
              label={payment.status}
              variant={payment.status === "paid" ? "success" : "warning"}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

