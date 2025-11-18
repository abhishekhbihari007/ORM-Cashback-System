"use client";

import { ReviewReport } from "@/lib/types";
import { StatusBadge } from "@/components/ui/status-badge";

type Props = {
  reports: ReviewReport[];
};

export function ReviewReportList({ reports }: Props) {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between rounded-2xl border border-slate-100 bg-white px-6 py-4 shadow-sm">
        <div>
          <p className="text-sm font-semibold text-slate-900">Total Reviews</p>
          <p className="text-2xl font-bold text-slate-900">{reports.length}</p>
        </div>
        <div>
          <p className="text-sm font-semibold text-slate-900">Verified</p>
          <p className="text-2xl font-bold text-green-600">
            {reports.filter((r) => r.verified).length}
          </p>
        </div>
      </div>

      <div className="overflow-hidden rounded-3xl border border-slate-100 bg-white shadow-sm">
        <table className="w-full text-left text-sm">
          <thead className="bg-slate-50 text-xs uppercase tracking-wider text-slate-500">
            <tr>
              <th className="px-6 py-4">Product</th>
              <th className="px-6 py-4">Reviewer</th>
              <th className="px-6 py-4">Rating</th>
              <th className="px-6 py-4">Posted</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4">Review Link</th>
            </tr>
          </thead>
          <tbody>
            {reports.map((report) => (
              <tr key={report.id} className="border-t border-slate-100 hover:bg-slate-50">
                <td className="px-6 py-4">
                  <p className="font-semibold text-slate-900">{report.productName}</p>
                </td>
                <td className="px-6 py-4 text-slate-600">{report.reviewerName}</td>
                <td className="px-6 py-4">
                  <span className="text-lg font-bold text-yellow-600">
                    {report.rating} ⭐
                  </span>
                </td>
                <td className="px-6 py-4 text-slate-600">
                  {new Date(report.postedAt).toLocaleDateString()}
                </td>
                <td className="px-6 py-4">
                  <StatusBadge
                    label={report.verified ? "Verified" : "Pending"}
                    variant={report.verified ? "success" : "primary"}
                  />
                </td>
                <td className="px-6 py-4">
                  <a
                    href={report.reviewLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 rounded-lg bg-blue-50 px-3 py-1 text-sm font-semibold text-blue-600 transition hover:bg-blue-100"
                  >
                    View Review →
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

