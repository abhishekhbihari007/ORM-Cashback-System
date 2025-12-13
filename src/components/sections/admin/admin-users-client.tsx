"use client";

import { useCallback, useEffect, useState } from "react";
import { adminApi, type AdminUser } from "@/lib/backend-api";
import { UserManager } from "@/components/sections/admin/user-manager";
import { User } from "@/lib/types";

function mapAdminUserToUser(adminUser: AdminUser): User {
  return {
    id: adminUser.id.toString(),
    name: `${adminUser.first_name} ${adminUser.last_name}`.trim() || adminUser.email,
    email: adminUser.email,
    phone: adminUser.phone_number || "",
    balance: parseFloat(adminUser.balance),
    pendingCashback: 0, // Not available in admin API
    totalEarned: parseFloat(adminUser.total_earned),
    status: adminUser.is_active ? "active" : "banned",
    joinedAt: adminUser.date_joined,
    lastActivity: adminUser.last_login || adminUser.date_joined,
  };
}

export function AdminUsersClient() {
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadUsers = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      const response = await adminApi.getUsers();
      setUsers(response.users.map(mapAdminUserToUser));
    } catch (err: any) {
      setError(err.message || "Failed to load users");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadUsers();
  }, [loadUsers]);

  if (isLoading) {
    return (
      <div className="rounded-3xl border border-slate-100 bg-white p-12 text-center shadow-sm">
        <p className="text-slate-600">Loading users...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-3xl border border-red-100 bg-red-50 p-6 text-center shadow-sm">
        <p className="text-red-600">{error}</p>
        <button
          onClick={loadUsers}
          className="mt-4 rounded-full bg-red-600 px-4 py-2 text-sm font-semibold text-white hover:bg-red-700"
        >
          Retry
        </button>
      </div>
    );
  }

  return <UserManager users={users} />;
}


