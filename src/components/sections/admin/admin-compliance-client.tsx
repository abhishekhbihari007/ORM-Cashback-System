"use client";

import { useCallback, useEffect, useState } from "react";
import { adminApi, type AdminComplianceAlert } from "@/lib/backend-api";
import { CompliancePanel } from "@/components/sections/admin/compliance-panel";
import { ComplianceAlert } from "@/lib/types";

function mapBackendAlert(backendAlert: AdminComplianceAlert): ComplianceAlert {
  return {
    id: backendAlert.id,
    title: backendAlert.title,
    description: backendAlert.description,
    risk: backendAlert.risk,
    marketplace: backendAlert.marketplace,
    updatedAt: backendAlert.updated_at,
  };
}

export function AdminComplianceClient() {
  const [alerts, setAlerts] = useState<ComplianceAlert[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadAlerts = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      const response = await adminApi.getComplianceAlerts();
      setAlerts(response.alerts.map(mapBackendAlert));
    } catch (err: any) {
      setError(err.message || "Failed to load compliance alerts");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadAlerts();
  }, [loadAlerts]);

  if (isLoading) {
    return (
      <div className="rounded-3xl border border-slate-100 bg-white p-12 text-center shadow-sm">
        <p className="text-slate-600">Loading compliance alerts...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-3xl border border-red-100 bg-red-50 p-6 text-center shadow-sm">
        <p className="text-red-600">{error}</p>
        <button
          onClick={loadAlerts}
          className="mt-4 rounded-full bg-red-600 px-4 py-2 text-sm font-semibold text-white hover:bg-red-700"
        >
          Retry
        </button>
      </div>
    );
  }

  return <CompliancePanel alerts={alerts} />;
}


