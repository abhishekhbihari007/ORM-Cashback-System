import { api } from "@/lib/api";
import { groupOrdersByStatus } from "@/lib/analytics";
import { StatusBadge } from "@/components/ui/status-badge";

export const metadata = {
  title: "Brand Orders • ORM Dashboard",
};

export default async function BrandOrdersPage() {
  const orders = await api.fetchOrders();
  const summary = groupOrdersByStatus(orders);

  return (
    <div className="page-wrapper bg-white">
      <div className="container-responsive space-y-6 py-10">
        <div>
          <p className="section-title">Orders</p>
          <h1 className="text-4xl font-bold text-slate-900">Track reviewer purchases in real-time</h1>
          <p className="text-slate-600">From tracking IDs to reimbursements, keep every slot compliant.</p>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {Object.entries(summary).map(([status, value]) => (
            <div key={status} className="rounded-3xl border border-slate-100 bg-slate-50 p-4">
              <p className="text-sm font-semibold uppercase text-slate-500">{status}</p>
              <p className="mt-2 text-3xl font-bold text-slate-900">{value}</p>
            </div>
          ))}
        </div>

        <div className="overflow-hidden rounded-3xl border border-slate-100 shadow-sm">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50 text-xs uppercase tracking-wider text-slate-500">
              <tr>
                <th className="px-6 py-4">Reviewer</th>
                <th className="px-6 py-4">Country</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Submitted</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order.id} className="border-t border-slate-100">
                  <td className="px-6 py-4 font-semibold text-slate-900">{order.reviewerName}</td>
                  <td className="px-6 py-4 text-slate-600">{order.country}</td>
                  <td className="px-6 py-4">
                    <StatusBadge
                      label={order.status}
                      variant={
                        order.status === "verified"
                          ? "success"
                          : order.status === "reimbursed"
                          ? "warning"
                          : "primary"
                      }
                    />
                  </td>
                  <td className="px-6 py-4 text-slate-600">
                    {new Date(order.submittedAt).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

