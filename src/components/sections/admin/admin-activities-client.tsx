"use client";

import { useCallback, useEffect, useState } from "react";
import { adminApi, type AdminActivity as BackendAdminActivity } from "@/lib/backend-api";
import { ActivityFeed } from "@/components/sections/admin/activity-feed";
import { AdminActivity } from "@/lib/types";

function mapBackendActivity(backendActivity: BackendAdminActivity): AdminActivity {
  return {
    id: backendActivity.id,
    actor: backendActivity.actor,
    activity: backendActivity.activity,
    timestamp: backendActivity.timestamp,
    severity: backendActivity.severity,
  };
}

export function AdminActivitiesClient() {
  const [activities, setActivities] = useState<AdminActivity[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadActivities = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      const response = await adminApi.getActivities();
      setActivities(response.activities.map(mapBackendActivity));
    } catch (err: any) {
      setError(err.message || "Failed to load activities");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadActivities();
  }, [loadActivities]);

  if (isLoading) {
    return (
      <div className="rounded-3xl border border-slate-100 bg-white p-12 text-center shadow-sm">
        <p className="text-slate-600">Loading activities...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-3xl border border-red-100 bg-red-50 p-6 text-center shadow-sm">
        <p className="text-red-600">{error}</p>
        <button
          onClick={loadActivities}
          className="mt-4 rounded-full bg-red-600 px-4 py-2 text-sm font-semibold text-white hover:bg-red-700"
        >
          Retry
        </button>
      </div>
    );
  }

  return <ActivityFeed activities={activities} />;
}


