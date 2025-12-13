"use client";

import { useEffect, useState } from "react";
import { adminApi, type AdminActivity, type AdminComplianceAlert, type AdminUser, type AdminPayout, type AdminReview } from "@/lib/backend-api";
import { AdminOverview } from "./admin-overview";
import { ActivityFeed } from "./activity-feed";
import { CompliancePanel } from "./compliance-panel";

export function AdminDashboardClient() {
  const [activities, setActivities] = useState<AdminActivity[]>([]);
  const [alerts, setAlerts] = useState<AdminComplianceAlert[]>([]);
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [pendingReviews, setPendingReviews] = useState<AdminReview[]>([]);
  const [payouts, setPayouts] = useState<AdminPayout[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const [activitiesResponse, alertsResponse, usersResponse, submissionsResponse, payoutsResponse] = await Promise.all([
          adminApi.getActivities(),
          adminApi.getComplianceAlerts(),
          adminApi.getUsers(),
          adminApi.getSubmissions(),
          adminApi.getPayouts(),
        ]);

        setActivities(activitiesResponse.activities);
        setAlerts(alertsResponse.alerts);
        setUsers(usersResponse.users);
        setPendingReviews(submissionsResponse.pending_reviews.data);
        setPayouts(payoutsResponse.payouts);
      } catch (err: any) {
        setError(err.message || "Unable to load dashboard data. Please try again.");
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, []);

  if (isLoading) {
    return (
      <div className="rounded-3xl border border-slate-100 bg-white p-10 text-center text-slate-500">
        Loading dashboard data...
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">
        Error: {error}
      </div>
    );
  }

  const totalPayouts = payouts.reduce((sum, p) => sum + parseFloat(p.amount), 0);

  return (
    <>
      <AdminOverview activities={activities} alerts={alerts} />
      <div className="grid gap-4 md:grid-cols-3">
        <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
          <p className="text-sm font-semibold text-slate-500">Total Users</p>
          <p className="mt-2 text-3xl font-bold text-slate-900">{users.length}</p>
        </div>
        <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
          <p className="text-sm font-semibold text-slate-500">Pending Reviews</p>
          <p className="mt-2 text-3xl font-bold text-slate-900">{pendingReviews.length}</p>
        </div>
        <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
          <p className="text-sm font-semibold text-slate-500">Total Payouts</p>
          <p className="mt-2 text-3xl font-bold text-slate-900">
            ₹{totalPayouts.toFixed(2)}
          </p>
        </div>
      </div>
      <div className="grid gap-6 lg:grid-cols-[1.1fr,0.9fr]">
        <ActivityFeed activities={activities} />
        <CompliancePanel alerts={alerts} />
      </div>
    </>
  );
}

