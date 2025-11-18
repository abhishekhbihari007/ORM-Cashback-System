"use client";

import { useState } from "react";
import { PayoutRequest } from "@/lib/types";
import { StatusBadge } from "@/components/ui/status-badge";

type Props = {
  payouts: PayoutRequest[];
};

export function PayoutManager({ payouts }: Props) {
  const [payoutList, setPayoutList] = useState(payouts);

  const handleMarkAsDone = (payoutId: string) => {
    setPayoutList((prev) =>
      prev.map((payout) =>
        payout.id === payoutId
          ? {
              ...payout,
              status: "completed" as const,
              completedAt: new Date().toISOString(),
            }
          : payout
      )
    );
  };

  const pendingPayouts = payoutList.filter((p) => p.status === "pending" || p.status === "processing");
  const completedPayouts = payoutList.filter((p) => p.status === "completed");

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-3">
        <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
          <p className="text-sm font-semibold text-slate-500">Pending Requests</p>
          <p className="mt-2 text-3xl font-bold text-slate-900">{pendingPayouts.length}</p>
        </div>
        <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
          <p className="text-sm font-semibold text-slate-500">Total Amount (Pending)</p>
          <p className="mt-2 text-3xl font-bold text-slate-900">
            ₹{pendingPayouts.reduce((sum, p) => sum + p.amount, 0).toFixed(2)}
          </p>
        </div>
        <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
          <p className="text-sm font-semibold text-slate-500">Completed Today</p>
          <p className="mt-2 text-3xl font-bold text-slate-900">{completedPayouts.length}</p>
        </div>
      </div>

      <div className="overflow-hidden rounded-3xl border border-slate-100 bg-white shadow-sm">
        <table className="w-full text-left text-sm">
          <thead className="bg-slate-50 text-xs uppercase tracking-wider text-slate-500">
            <tr>
              <th className="px-6 py-4">User</th>
              <th className="px-6 py-4">Amount</th>
              <th className="px-6 py-4">Payment Method</th>
              <th className="px-6 py-4">Account Details</th>
              <th className="px-6 py-4">Requested</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {payoutList.map((payout) => (
              <tr key={payout.id} className="border-t border-slate-100 hover:bg-slate-50">
                <td className="px-6 py-4">
                  <p className="font-semibold text-slate-900">{payout.userName}</p>
                </td>
                <td className="px-6 py-4">
                  <p className="font-semibold text-slate-900">₹{payout.amount.toFixed(2)}</p>
                </td>
                <td className="px-6 py-4 text-slate-600 uppercase">{payout.paymentMethod}</td>
                <td className="px-6 py-4">
                  <p className="text-sm text-slate-600">{payout.accountDetails}</p>
                </td>
                <td className="px-6 py-4 text-slate-600">
                  {new Date(payout.requestedAt).toLocaleDateString()}
                </td>
                <td className="px-6 py-4">
                  <StatusBadge
                    label={payout.status}
                    variant={
                      payout.status === "completed"
                        ? "success"
                        : payout.status === "rejected"
                        ? "danger"
                        : "primary"
                    }
                  />
                </td>
                <td className="px-6 py-4">
                  {payout.status === "pending" || payout.status === "processing" ? (
                    <button
                      onClick={() => handleMarkAsDone(payout.id)}
                      className="rounded-lg bg-green-600 px-4 py-2 text-xs font-semibold text-white hover:bg-green-700"
                    >
                      Mark as Done
                    </button>
                  ) : payout.status === "completed" && payout.completedAt ? (
                    <p className="text-xs text-slate-500">
                      Done {new Date(payout.completedAt).toLocaleDateString()}
                    </p>
                  ) : null}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

